const http = require("http");
const cheerio = require("cheerio");
const { crawl } = require("./crawler");
const fs = require("fs");

const app = http.createServer((req, res) => {
  crawl((decodedResult) => {
    res.write(decodedResult);
    const $ = cheerio.load(decodedResult);
    const titles = $(".search_section").html();
    console.log(titles);
  })();
});

app.listen(3000);
