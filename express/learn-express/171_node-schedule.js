const schedule = require("node-schedule");

const date = new Date(2020, 8, 2, 22, 42, 0);

console.log(date);

const j = schedule.scheduleJob(date, () => {
  console.log("here");
});