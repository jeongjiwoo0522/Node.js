const express = require("express");
const request = require("request");
const iconv = require("iconv-lite");

const app = express();

app.get("/", (req, res) => {
  request(
    {
      url: "https://www.twitter.com",
      method: "GET",
      encoding: null,
    },
    (err, response, body) => {
      const decodedResult = iconv.decode(body, "euc-kr");
      console.log(decodedResult);
      res.end(decodedResult);
    }
  );
});

app.listen(3000);