const express = require("express");
const { User } = require("../models/index");
const { Recruitment } = require("../models");

const getIndex = require("../controller/getIndex");
const getUsers = require("../controller/getUsers");
const postUsers = require("../controller/postUsers");
const getUsersRecruitmentId = require("../controller/getUsresid");

const router = express.Router();

router.get("/", getIndex);
router.get("/users", getUsers);
router.post("/users", postUsers);
router.get("/user/recruitment/:id", getUsersRecruitmentId);

module.exports = router;
