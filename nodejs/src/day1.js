const fs = require("fs");

module.exports = function () {
  part1();
  part2();
};

function part1() {
  const input = fs.readFileSync("../data/day1.txt", "utf8");

  const elves = [];
  let group = [];
  input.split("\n").forEach((entry) => {
    if (entry.length != 0) {
      group.push(entry);
    } else {
      let sum = 0;
      group.forEach((item) => (sum += parseInt(item)));
      elves.push(sum);
      group = [];
    }
  });

  let max = -1;
  elves.forEach((item) => {
    if (item > max) {
      max = item;
    }
  });
  console.log(max);
}

function part2() {
  const input = fs.readFileSync("../data/day1.txt", "utf8");

  const elves = [];
  let group = [];
  input.split("\n").forEach((entry) => {
    if (entry.length != 0) {
      group.push(entry);
    } else {
      let sum = 0;
      group.forEach((item) => (sum += parseInt(item)));
      elves.push(sum);
      group = [];
    }
  });

  elves.sort((a, b) => a - b);
  console.log(elves.slice(elves.length - 5, elves.length));
}
