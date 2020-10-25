const SocketIO = require("socket.io");
const axios = require("axios");

// module.exports = (server) => {
//   const io = SocketIO(server, { path: "/socket.io" });
// 
//   io.on("connection", (socket) => { // 웹 소켓 연결시 
//     const req = socket.request;
//     const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
//     console.log("새로운 클라이언트 접속", ip, socket.id, req.ip);
//     socket.on("disconnect", () => {// 연결 종료시
//       console.log("클라이언트 접속 해제", ip, socket.id);
//       clearInterval(socket.interval);
//     });
//     socket.on("error", (err) => {
//       console.error(err);
//     });
//     socket.on("reply", (data) => { // 클라이언크로부터 메시지 수신 시
//       console.log(data);
//     });
//     socket.interval = setInterval(() => {
//       socket.emit("news", "Hello Socket.IO");
//     }, 3000);
//   });
// };

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: "/socket.io" });
  app.set("io", io);
  const room = io.of("/room");
  const chat = io.of("/chat");

  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  room.on("connection", (socket) => {
    console.log("room 네임스페이스에 접속");
    socket.on("disconnect", () => {
      console.log("room 네임스페이스 접속 해제");
    });
  });

  chat.on("connection", (socket) => {
    console.log("chat 네임스페이스에 접속");
    const req = socket.request;
    const { headers: { referer } } = req;
    const roomId = referer
      .split("/")[referer.split("/").length - 1]
      .replace("/\?.+/", "");
    socket.join(roomId);
    socket.to(roomId).emit("join", {
      user: "system",
      chat: `${req.session.color}님이 입장하셨습니다.`,
    });

    socket.on("disconnect", () => {
      console.log("chat 네임스페이스 접속 해제");
      socket.leave(roomId);
      const currentRoom = socket.adapter.rooms[roomId];
      const userCount = currentRoom ? currentRoom.length : 0;
      if(userCount === 0) {
        axios.delete(`http://localhost:8005/room/${roomId}`)
          .then(() => {
            console.log("방 제거 요청 성공");
          })
          .catch(console.error);
      } else {
        socket.to(roomId).emit("exit", {
          user: "system",
          chat: `${req.session.color}님이 퇴장하셨습니다.`,
        });
      }
    });
  });
};

