const socket = io("localhost:3000");

socket.on("connect", () => {
    console.log("Socket is successfully loaded, good job. You can play so.");
});

socket.on("receive_left_hand", (data) => {
    socketHandPosition.left.x = 0.5 - data.x  +0.5
    socketHandPosition.left.y = data.y
})

socket.on("receive_right_hand", (data) => {
    socketHandPosition.right.x = 0.5 - data.x +0.5
    socketHandPosition.right.y = data.y
})