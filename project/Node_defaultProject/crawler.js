const request = require("request");
const iconv = require("iconv-lite");
const charset = require("charset");
const { response } = require("express");

const crawl = callback => queryString => request({
  url: "https://www.google.com/search",
  encoding: null,
  method: "GET",
  qs: queryString,
  timeout: 10000,
  followRedirect: true,
  maxRedirects: 10,
},
(err, res, body) => {
  if(!err && res.statusCode === 200) {
    const enc = charset(res.headers, body);
    const decodedResult = iconv.decode(body, enc);
    callback(decodedResult);
  } else {
    console.log(`error ${res.statusCode}`);
  }
});

module.exports.crawl = crawl;