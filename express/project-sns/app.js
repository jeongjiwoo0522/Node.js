const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
//passport
const passport = require("passport");
// .env
dotenv.config();
// router
const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
// db
const { sequelize } = require("./models");
// passport
const passportConfig = require("./passport");

const app = express();
//passport
passportConfig();

app.set("port", process.env.PORT || 8000);

// view engine
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

// db
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터 베이스 연결 성공");
  })
  .catch(console.error);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

// router
app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다. `);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
