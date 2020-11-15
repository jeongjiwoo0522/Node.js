const express = require("express");
const app = express();
const path = require("path");

const socketIO = require("socket.io");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../HTML/socket.html'));
});

const server = app.listen(3000, () => {
  console.log("server on 3000");
});

const io = socketIO(server, { path: "/socket.io" });

// connection event handler
// connection이 수립되면 event handler function의 인자로 socket인 들어온다
io.on('connection', (socket) => {
  socket.emit("message", "hello");
  socket.on("chat", (data) => {
    console.log(data.msg);
  });
  setInterval(() => {
    socket.emit("hello", "hello");
  }, 3000);
});

