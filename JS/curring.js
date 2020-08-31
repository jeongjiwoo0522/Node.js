const add1 = (x) => (y) => x + y;
const fs = require("fs");

const add2 = function (x) {
  return function (y) {
    return x + y;
  };
};

const add10 = add2(10);
console.log(add10(20));
console.log(add2(10));
console.log(add2(10)(20));

const openFileAndPrint = (path) => (fileName) =>
  fs.readFile(path + fileName, (err, data) => {
    if (err) throw err;
    console.log(data.toString());
  });

const thisDirOpenFileAndPrint = openFileAndPrint("./");
const otherDirOpenFileAndPrint = openFileAndPrint("../");

thisDirOpenFileAndPrint("closer.js");
otherDirOpenFileAndPrint("package.json");
