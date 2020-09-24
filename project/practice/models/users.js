const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      classNumber: {
        type: Sequelize.STRING(7),
        allowNull: false,
      },
      nick: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: "User",
      tableName: "users",
      paranoid: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    });
  }

  static associate(db) {
    db.User.hasMany(db.Recruitment, { foreignKey: "userId", sourceKey: "id" });
    db.User.belongsTo(db.Circle, { foreignKey: "circleId", targetKey: "id" });
  }
};