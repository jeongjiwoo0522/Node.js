const { User } = require("../models/index");
const { Circle } = require("../models/index");

module.exports = async (req, res) => {
  const users = await User.findAll({
    include: [{
      model: Circle,
    }],
    //attributes: ["name", "classNumber", "nick", "circleId"],
  });
  res.json(users);
};