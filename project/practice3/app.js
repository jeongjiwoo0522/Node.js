const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucks = require("nunjucks");
const fs = require("fs");

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('view engine', 'html');

try {
  fs.readdirSync("uploads");
} catch(err) {
  console.error("폴더를 생성합니다");
  fs.mkdirSync("uploads");
}

nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
