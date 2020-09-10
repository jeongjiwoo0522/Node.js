const express = require("express");
const User = require("../schemas/user");
const Comment = require("../schemas/comments");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch(err) {
    console.error(err);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      age: req.body.age,
      married: req.body.married,
    });
    console.log(user);
    res.status(201).json(user);
  } catch(err) {
    console.error(err);
    next(err);
  }
});

router.get("/:id/comments", async (req, res, next) => {
  try {
    const comments = await Comment.find({
      commenter: req.params.id
    })
    .populate("commenter");
    console.log(comments);
    res.json(comments);
  } catch(err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;