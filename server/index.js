const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  // ...
});

io.on("connection", (socket) => {
    console.log("there is a connection")

    socket.on("send_right_hand_position", (data) => {
      // Send data of the right hand position to the client
      io.emit("receive_right_hand", JSON.parse(data))
    })

    socket.on("send_left_hand_position", (data) => {
      // Send data of the left hand position to the client
      io.emit("receive_left_hand", JSON.parse(data))
    })

    socket.on("disconnect", (socket) => {
        console.log("there is a disconnection")
    })
});


httpServer.listen(3000);