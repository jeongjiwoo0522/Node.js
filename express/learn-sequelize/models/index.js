const Sequelize = require('sequelize');
const User = require("./user");
const Comment = require("./user");

const env = process.env.NODE_ENV || 'development';
// development: 개발용, test: 테스트용, production: 베포용 conpig.json 확인 필수
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// Sequelize 시퀄라이스 패키지이자 생성자
// config/config.json에서 데이터베이스 설정을 불러오고 
// new Sequelize를 통해 MySQL 연결 객체를 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;
