var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var session = require("expess-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

app.use(cookieParser("secret code"));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "secret code",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
/* 쿠키 */

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
/* morgan modules midleware 
  콘솔에 나오는 로그는 모두 morgan 미들웨어에서 나온다.
  요청에 대한 정보를 콘솔에 기록해준다
  인자: dev short common combined 
*/
app.use(express.static(path.join(__dirname, "public")));
/* 
  static 미들웨어는 정적인 파일들을 제공한다
  파일 요청
  
*/
app.use(express.json()); // JSON 형식의 데이터 전달 방식
app.use(express.urlencoded({ extended: false })); // 주소형식의 데이터 전달 방식 ex 폼 전송
/* 
  body-parser 요청의 본문을 해석해주는 미들웨어 
  위 두개는 express에 내장된 기능
  내부적으로 본문을 해석해 req.body에 추가한다.
*/
app.use(cookieParser());
/*
  cookie-parser는 요청에 동봉된 쿠키를 해석
  req.cookies 객체에 쿠키가 들어감
*/
app.use("/", indexRouter);
app.use("/index", usersRouter);
/* 라우팅 미들웨어
  첫 번째 인자로 주소를 받는다
  use 대신 http 요청 메서드를 사용 가능
*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
