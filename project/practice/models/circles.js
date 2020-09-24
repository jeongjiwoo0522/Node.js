const Sequelize = require("sequelize");

module.exports = class Circle extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      tag: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      recruitment: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: "Circle",
      tableName: "circles",
      paranoid: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    });
  }

  static associate(db) {
    db.Circle.hasOne(db.Leader, { foreignKey: "circleId", sourceKey: "id" });
    db.Circle.hasMany(db.User, { foreignKey: "circleId", sourceKey: "id" });
    db.Circle.hasMany(db.Recruitment, { foreignKey: "circleId", sourceKey: "id"});
  }
};