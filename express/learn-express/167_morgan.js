const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("combined"));

// tokens
app.use(morgan(":method + :date"));
app.use(morgan(":status + :url"));

app.use((req, res) => {
  res.send("hello world");
});

app.listen(3000);