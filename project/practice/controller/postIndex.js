const { User } = require("../models/index");
const { Circle } = require("../models");

module.exports = async (req, res) => {
  const { name, nick, classNumber, password, circleId } = req.body;

  let user = await User.create({
    name,
    nick,
    classNumber,
    password,
    circleId,
  });

  user = await User.findOne({
    where: {
      id: user.id,
    },
    include: [{
      model: Circle,
    }],
  });

  res.json(user);
  
};