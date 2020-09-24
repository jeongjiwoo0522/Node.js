const express = require("express");
const router = express.Router();

const postIndex = require("../controller/postIndex");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/", postIndex);

module.exports = router;
