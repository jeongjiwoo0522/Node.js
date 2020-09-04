const express = require("express");
const parseurl = require("parseurl");
const session = require("express-session");

const app = express();

app.use(session({
  secret: "keyborad dog",
  resave: false,
  saveUninitialized: true,
}));

app.use((req, res, next) => {
  if (!(req.session.views)) {
    req.session.views = {};
  }

  console.log(req.session);

  // get the URL
  const pathname = parseurl(req).pathname;
  console.log(pathname);

  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
  console.log(req.session.views[pathname]);

  next();
});

app.get("/puddle", (req, res) => {
  res.send(`Hello puddle you views this page ${req.session.views['/puddle']} time`);
});

app.get("/biggle", (req, res) => {
  res.send(`Hello you viewed this page ${req.session.views['/biggle']} time`);
});

app.listen(3000);