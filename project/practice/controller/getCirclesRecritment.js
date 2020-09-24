const { Circle } = require("../models");

module.exports = async (req, res) => {
  const circles = await Circle.findAll({
    where: {
      recruitment: true,
    },
  });
  res.json(circles);
};