const fs = require("fs");

fs.readFile("./async.js", (err, data) => {
    console.log("first one");
});

fs.readFile("./async.js", (err, data) => {
    console.log("second one");
});

fs.readFile("./async.js", (err, data) => {
    console.log("third one");
});