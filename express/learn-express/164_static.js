const express = require("express");
const { response } = require("express");

const app = express();

app.use(express.static(`D:\\learning Node.js`));
app.use((req, res) => {
  res.writeHead("200", {
    "Content-Type": "text/html;charset=utf8"
  });
  res.end(`<img src="/IMG/unnamed.png" width="100%" />`);
});

app.listen(3000);