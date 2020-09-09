const express = require("express");
const { User, Comment } = require("../models");
const { renderString } = require("nunjucks");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const comment = await Comment.create({
      comment: req.body.comment,
      commenter: req.body.id,
    });
    console.log(comment);
    res.status(201).json(comment);
  } catch(err) {
    console.error(err);
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try{
    const result = await Comment.update({
      comment: req.body.comment,
    }, {
      where: { 
        id: req.params.id 
      },
    });
    res.json(result);
  } catch(err) {
    console.error(err);
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await Comment.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.json(result); 
  } catch(err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;