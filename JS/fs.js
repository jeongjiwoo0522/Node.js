const fs = require("fs");

const contents = "hello\nbye\n안녕";

//fs.writeFile("./message.txt", contents, (err) => console.log(err));
// const data = fs.readFileSync("./message.txt");
// const string = data.toString();
// console.log("sync work01");
// console.log(string);

// appendFile

// const list = [1, 2, 3, 4, 5];
// list.forEach((item) => {
//   fs.appendFile("./chapters.txt", `chapter ${item}\n`, () => {
//     console.log(item, "ok");
//   });
// });

// mkdir async/sync

// const dirName = `${__dirname}/img`;
// fs.exists(dirName, (exist) => {
//   if (!exist) {
//     fs.mkdir(dirName, (err) => {
//       if (err) throw err;
//     });
//   }
// });

// pritnf filelist

// const testFolder = "./";
// const fileNameList = fs.readdirSync(testFolder);
// fileNameList.forEach((filename) => {
//   console.log(filename);
// });

const students1 = [
  { name: "jiwoo", age: 31, score: 85 },
  { name: "jiin", age: 31, score: 95 },
  { name: "this", age: 35, score: 76 },
];

// fs.writeFile("./list.json", JSON.stringify(students1), (err) => {
//   if (err) throw err;
// });
fs.readFile("./list.json", (err, data) => {
  console.log(typeof data, data, JSON.parse(data));
});
