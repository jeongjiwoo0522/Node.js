const { User } = require("../models");

module.exports = async (req, res) => {
  const users = await User.findAll({});
  res.json(users);
};