const express = require("express");
const router = express.Router();

const getCircles = require("../controller/getCircles");
const getCirclesRecruitment = require("../controller/getCirclesRecritment");

router.get("/", getCircles);
router.get("/recruitmenting", getCirclesRecruitment);

module.exports = router;