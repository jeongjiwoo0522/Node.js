const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      commenter: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: "Comment",
      tableName: "comments",
      paranoid: false,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    });
  }

  static associate(db) {
    db.Comment.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
  }
};