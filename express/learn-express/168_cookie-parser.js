const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

app.get("/set", (req, res) => {
  console.log("Set Cookie");
  res.cookie('user', {
    id: '0070',
    name: "jiwoo",
    authorized: true,
  });
  res.redirect("/get");
});

app.get("/get", (req, res) => {
  console.log("Get Cookie");
  res.send(req.cookies);
});

app.listen(3000);