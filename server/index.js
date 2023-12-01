const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

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

  socket.on("join_room", (channel) => {
    socket.join(channel);
    console.log(`Server join room: ${channel}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING and LISTENING ON PORT 3001");
});
