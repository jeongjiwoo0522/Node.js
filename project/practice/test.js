const {  User, Circle, Recruitment } = require("./models");

Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";
  const d = this;
  return f.replace(/(yyyy|yy|MM|dd|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
      switch ($1) {
          case "yyyy": return d.getFullYear(); // 년 (4자리)
          case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
          case "dd": return d.getDate().zf(2); // 일 (2자리)
          case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
          case "mm": return d.getMinutes().zf(2); // 분 (2자리)
          case "ss": return d.getSeconds().zf(2); // 초 (2자리)
          default: return $1;
      }
  });
};

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };

const day = new Date();
console.log(day.format("yyyy-MM-dd HH:mm:ss"));

async function test() {
  try {
    const user = await User.findOne({
      where: { id: 1 },
      include: {
        model: Circle,
      },
    });
    console.log(user.Circles);
  } catch(err) {
    console.error(err);
  }
}
test();

