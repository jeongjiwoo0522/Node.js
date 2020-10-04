const express = require("express");
const { User } = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", isNotLoggedIn, (req, res) => {
  res.render("login", { title: "Login Page" });
});

router.get("/signup", isNotLoggedIn, (req, res) => {
  res.render("signup", { title: "Please signup" });
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", { title: "Profile Page", user: req.user });
});

router.post("/signup", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if(exUser) {
      return res.redirect("/signup?error=exist");
    } 
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      name,
      email,
      password: hash,
    });
    res.redirect("/");
  } catch(err) {
    console.error(err);
    next(err);
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local-login", (authError, user, info) => {
    if(authError) {
      console.error(authError);
      return next(authError);
    } if(!user) {
      return res.redirect(`/?loginError=${info.message}`);
    } return req.login(user, (loginError) => {
      if(loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
})

router.get("/logout", (req, res) => {
  req.logout(); // req.user 객체를 없앤다, req.isAutheticate()를 false로 바꾼다
  req.session.destroy(); // session 자체를 없앤다 connection 자체를 없앤다
  res.redirect("/");
});

module.exports = router;
