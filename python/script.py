import cv2
import mediapipe as mp
import asyncio
import json
import time
import socketio

# This is really awful
# --------------------
# This is random code i found on Github and assembled with other
# The origin code was found on https://github.com/rushuuu/Hand-Gesture-and-Body-Pose-Recognition
# Thanks to him i have a real project lol

class Colors:
    RESET = '\033[0m'
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    MAGENTA = '\033[95m'
    CYAN = '\033[96m'

mpPose = mp.solutions.pose
pose = mpPose.Pose(static_image_mode=False, min_detection_confidence=0.5, min_tracking_confidence=0.5)
mpDraw = mp.solutions.drawing_utils

body_part_colors = {
    mpPose.PoseLandmark.NOSE: (255, 0, 0),      # Blue color 
    mpPose.PoseLandmark.LEFT_SHOULDER: (0, 255, 0),  # Green color 
    mpPose.PoseLandmark.RIGHT_SHOULDER: (0, 0, 255), # Red color
}


# God bless : https://python-socketio.readthedocs.io/en/latest/client.html#creating-a-client-instance

sio = socketio.Client()
isConnected = True

@sio.event
def connect():
    isConnected = True 
    print("Connected to the Socket.IO server")

@sio.event
def connect_error(data):
    isConnected = False 
    # This code will just retry to connect to the entire node js system in boucle
    retry_delay = 3
    try:
        sio.connect('http://localhost:3000')
    except Exception as e:
        print(Colors.RED + f"\n \n Connection failed again : \n {e} \n \n" + Colors.RESET)
        time.sleep(retry_delay)
    print("The connection failed to the socket failed!")

@sio.event
def disconnect():
    isConnected = False 
    print("Disconnected from the Socket.IO server")

@sio.on('*')
def catch_all(event, data):
    pass


try:
    sio.connect('http://localhost:3000')
except Exception as e:
    print(Colors.RED + f"\n \n Connection failed: {e} \n \n" + Colors.RESET)

cap = cv2.VideoCapture(1)
while True:
    success, img = cap.read()
    imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = pose.process(imgRGB)

    if results.pose_landmarks:    
        mpDraw.draw_landmarks(img, results.pose_landmarks, mpPose.POSE_CONNECTIONS,
                              landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255),
                                                                      thickness=2, circle_radius=2),
                              connection_drawing_spec=mpDraw.DrawingSpec(color=(255, 0, 0),
                                                                         thickness=2, circle_radius=2),
                              )               
        if results.pose_landmarks.landmark[15]:
            if isConnected == True :
                sio.emit('send_left_hand_position', json.dumps({"x" : results.pose_landmarks.landmark[15].x, "y": results.pose_landmarks.landmark[15].y}))
            lmx = int(results.pose_landmarks.landmark[15].x * img.shape[1])
            lmy = int(results.pose_landmarks.landmark[15].y * img.shape[0])
            cv2.circle(img, (lmx, lmy), 5, (0, 0, 255), -1)

        if results.pose_landmarks.landmark[16]:
            if isConnected == True :
                sio.emit('send_right_hand_position', json.dumps({"x" : results.pose_landmarks.landmark[16].x, "y": results.pose_landmarks.landmark[16].y}))
            lmx = int(results.pose_landmarks.landmark[16].x * img.shape[1])
            lmy = int(results.pose_landmarks.landmark[16].y * img.shape[0])
            cv2.circle(img, (lmx, lmy), 5, (0, 255, 0), -1)

    cv2.imshow("Pose Detection", img)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
