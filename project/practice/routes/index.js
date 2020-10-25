const express = require("express");
const router = express.Router();
const md = require("md-directory");
const axios = require("axios");

const postIndex = require("../controller/postIndex");
const e = require("express");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/", postIndex);

router.get("/md", async (req, res) => {
  res.send(`
  <html>
    <body>
    <script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.2.10/webcomponents-loader.min.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@1/src/zero-md.min.js"></script>
    <zero-md src="http://localhost/md/blueberry.md"></zero-md>
    </body>
  </html>
  `);
});

module.exports = router;
