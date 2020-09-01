const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.end("Hello express module");
});

app.listen(3000, () => {
  console.log("Server on 3000");
});
