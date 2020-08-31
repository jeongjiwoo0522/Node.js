const cheerio = require("cheerio");
const { crawl } = require("./crawler");
const http = require("http");

// const parse = (decodedResult) => {
//   // console.log(decodedResult);
//   const $ = cheerio.load(decodedResult);
//   const titles = $("h3.r").find("a");
//   console.log(titles.length);
//   for (let i = 0; i < titles.length; i++) {
//     const title = $(titles[1]).text();
//     console.log(title);
//   }
//   console.log("ok");
// };

const app = http.createServer((req, res) => {
  crawl((decodedResult) => {
    res.end(decodedResult);
    const $ = cheerio.load(decodedResult);
    const titles = $("h3.zBAuLc").find("div");
    console.log(titles.length);
    for (let i = 0; i < titles.length; i++) {
      const title = $(titles[i]).text();
      console.log(title);
    }
    console.log("ok");
  })({ q: "대덕소프트웨어마이스터고등학교" });
});

app.listen(3000);
