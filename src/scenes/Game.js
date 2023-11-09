/**
 * This is the Game scene played when we launch a game
 */
function Game()
{
    let poseNet;
    let video;
    let poses;
    let sceneIsLoaded = false;
    
    let poseNetOptions = {
        imageScaleFactor: 0.3,
        minConfidence: 0.5,
        maxPoseDetections: 1,
        flipHorizontal: true,
        outputStride: 16,
        multiplier: 0.5,
        inputResolution: 321,
        nmsRadius: 30
    }

    // enter() will be executed each time the SceneManager switches
    // to this Scene
    this.enter = () => {
        initializeCenterOfWindow()

        video = createCapture(VIDEO);
        video.size(width, height);

        background("teal");
        textAlign(CENTER);
        text("Welcome in the Game scene", width / 2, height / 2);

        poseNet = ml5.poseNet(video, poseNetOptions, this.modelLoaded);

        poseNet.on('pose', this.setPose);

        video.hide();
    }

    // draw() is the normal draw function, this function work like a scene
    this.draw = () => {
        if(DEBUGMODE === true && sceneIsLoaded === true){
            this.debugScene();
            showKeyOnMap()
            mooveKeyOnMap()
        }
    }

    // Function called if DEBUGMODE const is true
    this.debugScene = () => {
        
        // Flip video horizontaly
        scale(-1,1);
        image(video, -width, 0, width, height)
        scale(-1,1);
        if(poses){
            this.drawDebugPose(poses[0])
        }
    }

    // Function called when we need to show the pose
    this.drawDebugPose = (pose) => {
        if(!pose)
            return
        
        const positionArray = [
            pose.pose.leftShoulder,
            pose.pose.leftElbow,
            pose.pose.leftWrist,
            pose.pose.leftEye,
            pose.pose.leftAnkle,
            pose.pose.rightShoulder,
            pose.pose.rightElbow,
            pose.pose.rightWrist,
            pose.pose.rightEye,
            pose.pose.rightAnkle,
        ]

        // For the debug, i boucle on the array of position and then draw every parts of the body
        // And for the color, i just check if we here in the second half of the array or not
        // Fill the color of the circle with the confidence
        for (let i = 0; i < positionArray.length; i++) {
            const elementPosition = positionArray[i];
            
            if(i > (positionArray.length-1)/2){
                fill(255, 0, 0, elementPosition.confidence*255)
            }else{
                fill(0, 255, 0, elementPosition.confidence*255)
            }
            circle(elementPosition.x, elementPosition.y, 30) 
        }
    }

    // Function called on every pose
    this.setPose = (results) => {
        poses = results;
    }

    // Function called once model is loaded
    this.modelLoaded = () => {
        sceneIsLoaded = true
        if(DEBUGMODE === true)
            console.log('/-Model Loaded, you can play-/');
    }
}