const express = require('express');
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const app = express();

try {
    fs.readFileSync("uploads");
} catch(err) {
    console.error("폴더를 생성합니다");
    fs.mkdirSync("uploads");
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, "uploads/");
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

app.use(express.static(path.join(__dirname, "../HTML")));

app.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.file, req.body);
    res.send("ok");
});

app.get("/", (req, res) => {
    res.render("multipart");
});

app.listen(8000);