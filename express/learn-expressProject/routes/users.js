var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  console.log("index");
  res.send("index page");
});

router.get('/:id', function(req, res, next) {
  console.log(req.params, req.query);
  res.send("params and query");
});

/* res에 응답을 보내는 메소드:
  send 버퍼 또는 문자열 또는 HTML JSON
  sendFile 파일 경로 리다이렉션 302
  json JSON 데이터
  redirect 주소
  render  ('템플릿 파일 경로', { 변수 });
*/
module.exports = router;
