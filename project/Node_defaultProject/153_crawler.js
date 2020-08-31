const http = require("http");
const cheerio = require("cheerio");
const { crawl } = require("./crawler");
const fs = require("fs");

const app = http.createServer((req, res) => {
  crawl((decodedResult) => {
    res.end(decodedResult);
    const $ = cheerio.load(decodedResult);
    const titles = $("h3.zBAuLc").find("div");
    titles.each((index, element) => {
      const title = $(element).text();
      console.log(title);
      fs.appendFile("./titles.txt", `${title}\n`, () => {});
    });
  })({ q: "샤로수길 맛집" });
});

app.listen(3000);
