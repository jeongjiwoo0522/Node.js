const express = require('express');
const router = express.Router();

const multer = require("multer");
const path = require("path");

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

/* GET home page. */
router.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file, req.body);
  res.send("ok");
});

router.get("/", (req, res) => {
  res.render("multipart");
});

module.exports = router;
