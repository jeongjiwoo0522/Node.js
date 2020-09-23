const { User } = require("../models/index");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const { name, nick, password } = req.body;
  console.log(name, nick, password);
  const hash = bcrypt.hashSync(password, 12);
  const user = await User.create({
    name,
    nick,
    password: hash,
  });
  res.json(user);
}