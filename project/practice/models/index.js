const Sequelize = require("sequelize");

const User = require("./users");
const Leader = require("./leaders");
const Recruitment = require("./recruitments");
const Circle = require("./circles");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + '/../config/config.json')[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Leader = Leader;
db.Recruitment = Recruitment;
db.Circle = Circle;

User.init(sequelize);
Leader.init(sequelize);
Recruitment.init(sequelize);
Circle.init(sequelize);

User.associate(db);
Leader.associate(db);
Recruitment.associate(db);
Circle.associate(db);

module.exports = db;

