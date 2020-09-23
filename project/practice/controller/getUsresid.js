const { User } = require("../models")

module.exports = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
  });

  res.json(await user.getRecruitments());
};