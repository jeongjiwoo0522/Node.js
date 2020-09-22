const express = require('express');
const request = require("request");
const iconv = require("iconv-lite");
const fs = require("fs");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  request(
    {
      url: "https://www.twitter.com",
      method: "GET",
      encoding: null,
    },
    (err, response, body) => {
      const decodedResult = iconv.decode(body, "euc-kr");
      fs.writeFile("twitter.html", decodedResult, (err) => {  
        if(err) {
          console.log("error crawler");
        } else {
          console.log("file write ok");
        }
      });
      res.end(decodedResult);
    }
  );
});

module.exports = router;
