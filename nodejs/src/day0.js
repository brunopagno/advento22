const fs = require("fs");

module.exports = function () {
  for (let i = 0; i < 1000; i++) {
    p1();
    p2();
  }
};

function p1() {
  const data = fs.readFileSync("../data/day0.txt", "utf8");

  let prev = -1;
  let count = 0;
  data.split("\n").forEach((el) => {
    el = parseInt(el);
    if (prev >= 0 && prev < el) {
      count += 1;
    }
    prev = el;
  });

  // console.log("Part 1: " + count);
}

function p2() {
  const data = fs.readFileSync("../data/day0.txt", "utf8");

  const ee = [];
  data.split("\n").forEach((el, i) => {
    ee[i] = parseInt(el);
  });

  let count = 0;
  for (let i = 0; i < ee.length - 4; i++) {
    if (ee[i] + ee[i + 1] + ee[i + 2] < ee[i + 1] + ee[i + 2] + ee[i + 3]) {
      count += 1;
    }
  }

  // console.log("Part 2: " + count);
}
