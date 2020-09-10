const express = require("express");
const Comment = require("../schemas/comments");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    console.log("\n\n");
    console.log("here ok\n\n");
      
    const comment = await Comment.create({
      commenter: req.body.id,
      comment: req.body.comment,
    });

    console.log("\n\n", comment);
    console.log("\n\n");

    const result = await Comment.populate(comment, { path: "commenter" });
    res.status(201).json(result);
  } catch (err) {
    console.error("\n\n error \n\n", err);
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const result = await Comment.update(
      {
        _id: req.params.id,
      },
      {
        Comment: req.body.comment,
      }
    );
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await Comment.remove({ _id: req.params.id });
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
