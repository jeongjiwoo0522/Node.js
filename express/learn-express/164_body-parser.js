const express = require("express");

const app = express();

app.use(express.static(`D:\\learning Node.js/HTML`));

// application/x-www-form-urlencoded 파싱
app.use(express.urlencoded({ extended: false }));

// application/json 파싱
app.use(express.json());

app.get("/", (req, res) => {
  //const userId = req.body.userId || req.query.userId;
  //const userPassword = req.body.password || req.query.password;
//
  //console.log(userId);
  //console.log(userPassword); 

  res.writeHead("200", {
    "Content-Type": "text/html;charset=utf8"
  });
  res.write(`<h1>Login</h1>`);
  res.write(`<p>${userId}</p>`);
  res.write(`<p>${userPassword}</p>`);
  res.end(JSON.stringify(req.body, null, 2));
});

app.listen(3002);
