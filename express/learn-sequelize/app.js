const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucks = require("nunjucks");
const { sequelize } = require("./models");
const { Op } = require("sequelize");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

const { User } = require("./models/index.js");
const { Comment } = require("./models/index.js");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
nunjucks.configure("views", {
  express: app,
  watch: true,
});

// sync 메소드를 사용해 서버 실행 시 mySQL과 연동되게 한다 
// force: false true로 설정하면 서버 실행 시마다 테이블을 재생성한다. 
// 테이블을 잘못 만든 경우에 true로 설정
const sequelizeSync = sequelize.sync({ force: false });

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

// create 
// insert into users (name, age, married, comment) values ("jiwoo", 17, 0, "자기소개1");
// User.create({
//   name: "jiwoo",
//   age: 17,
//   married: false,
//   comment: "자기소개1",
// })
//   .then(() => console.log("create ok"))
//   .catch(console.log);
// 
// User.create({
//   name: "jiin",
//   age: 17,
//   married: false,
//   commnet: "자기소개2",
// })
//   .then(() => console.log("create ok"))
//   .catch(console.log);
// 
// User.create({
//   name: "temp",
//   age: 123,
//   married: true,
//   comment: "자기소개3",
// })
//   .then(() => console.log("create ok"))
//   .catch(console.log);

// select * from users;
// User.findAll({})
//   .then((datas) => {
//     console.log("description\n");
//     datas.forEach(data => {
//       console.log(data.dataValues);
//     });
//   })
//   .catch(console.log);

// select * from users limit 1;
//User.findOne({});

// select name, married from users where married = 1 and age > 30;
// User.findAll({
//   attributes: ["name", "married"],
//   where: {
//     married: 1,
//     age: { [Op.gt]: 30 }, greater then // less then 
//     // Op.gt 초과 gte 이상 lt 미만 lte 이하 ne 같지 않음 
//     // or 또는 in 배열 요소 중 하나  notIn 배열요소와 모두 다름
//   },
// })
//   .then(() => console.log("select name, married from users where married = 1 and age > 30 ok"))
//   .catch(console.log);
// 
// // select * id, name from users where married = 0 or age > 30;
// User.findAll({
//   attributes: ["id", "name"],
//   where: {
//     [Op.or]: [{ married: 0 }, { age: { [Op.gt]: 30 } }],
//   },
// })
//   .then(() => console.log("select * id, name from users where married = 0 or age > 30 ok"))
//   .catch(console.log);
// 
// // select id, name from users oder by age desc limit 1 offset 1;\
// User.findAll({
//   attributes: ["id", "name"],
//   order: [["age", "DESC"]], 2차원 배열인 이유: [["age", "DESC"], ["create", ]]
//   limit: 1,
//   offset: 1,
// })
//   .then(() => console.log("select id, name from users oder by age desc limit 1 offset 1"))
//   .catch(console.log);

// update users set commet = comment = "바꿀 내용" where id = 2;
// User.update({
//   comment: "바꿀 내용",
// }, {
//   where: { id: 258 },
// })
//   .then(() => console.log("update ok"))
//   .catch(console.log);
// 
// User.destroy({
//   where: { id: 260 },
// })
//   .then(() => console.log("delete ok"))
//   .catch(console.log);

// MySQL 관계 쿼리
sequelizeSync
  .then(() => console.log("연결 성공"))
  .catch(console.log);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
