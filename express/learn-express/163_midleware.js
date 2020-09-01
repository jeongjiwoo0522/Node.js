const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("first midleware");
  req.user1 = "first";
  next();
});

app.use((req, res, next) => {
  console.log("second midleware");
  req.user2 = "second";
  next();
});

app.use((req, res, next) => {
  console.log("third midleware");
  res.writeHead("200", {
    "Content-Type": "text/html;charset=utf8"
  });
  res.write(`<div><p>${req.user1}</p></div>`);
  res.write(`<div><p>${req.user2}</p></div>`);
  res.end(`<h1>express 서버에서 응답한 결과</h1>`);
});

app.listen(3000, () => {
  console.log("server on 3000");
});