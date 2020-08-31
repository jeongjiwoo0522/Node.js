const request = require("request");
const http = require("http");
const iconv = require("iconv-lite");

const app = http.createServer((req, res) => {
  request(
    {
      url: "https://www.google.com/search",
      method: "GET",
      qs: { q: "신사역 맛집" },
      encoding: null,
    },
    (err, response, body) => {
      const decodedResult = iconv.decode(body, "euc-kr");
      console.log(decodedResult);
      res.end(decodedResult);
    }
  );
});

app.listen(3000, () => {
  console.log("server on 3000");
});
