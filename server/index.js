const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

let current_info = null;

const server = http.createServer(app);

const server_io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
console.log("SERVER is SETTING UP to ACCEPT messages from PORT 3000");

server_io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`Server join room: ${room}`);
    if (current_info) {
      socket.emit("receive_message", current_info);
    }
  });

  socket.on("send_message", (info_object) => {
    current_info = info_object;
    socket.to(info_object.room).emit("receive_message", info_object);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING and LISTENING ON PORT 3001");
});
