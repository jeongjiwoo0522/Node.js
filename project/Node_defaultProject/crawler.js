const request = require("request");
const iconv = require("iconv-lite");
const charset = require("charset");

const crawl = callback => queryString => request({
  url: "http://search.11st.co.kr/Search.tmall?kwd=ssd",
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