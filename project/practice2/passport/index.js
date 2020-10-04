const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcrypt");

const { User } = require("../models/index");

module.exports = function() {
  // 패스포트 초기화 설정
  // 세션을 위해 user 직렬화 
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // user 역질렬화
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({
        where: { id }
      });
      done(null, user);
    } catch(err) {
      done(err);
    }
  });

  // local strategy 사용
  passport.use("local-login", new LocalStrategy({
    // 사용자명과 패스워드의 기본값을 "email"과 "password"로 변경 
    usernameField: "email",
    passwordField: "password",
    passReqtoCallback: true
  }, async (email, password, done) => {
    try {
      const exUser = await User.findOne({ where: { email }});
      if(exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if(result) {
          done(null, exUser);
        } else {
          done(null, false, { message: "비밀번호가 일치하지 않습니다. "});
        }
      } else {
        done(null, false, { message: "가입되지 않은 회원입니다. "});
      }
    } catch(err) {
      console.error(err);
    }
  }
  ))
}