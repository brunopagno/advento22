const fs = require("fs");
const path = require("path");

const targetDay = process.argv[2];

if (!targetDay) {
  console.log("Please provide a day number");
  process.exit(1);
}

const targetFile = `../src/advent/day${targetDay}.ts`;
const targetSpecFile = `../src/advent/day${targetDay}.spec.ts`;
if (fs.existsSync(path.join(__dirname, targetFile))) {
  console.log(`Day ${targetDay} already exists`);
  process.exit(1);
}

const dayTemplate = fs.readFileSync(
  path.join(__dirname, "templates/dayTemplate.ts"),
  "utf8"
);
const specTemplate = fs.readFileSync(
  path.join(__dirname, "templates/dayTemplate.spec.ts"),
  "utf8"
);

fs.writeFileSync(
  path.join(__dirname, targetFile),
  dayTemplate.replace("{{dayNumber}}", targetDay)
);
fs.writeFileSync(
  path.join(__dirname, targetSpecFile),
  specTemplate.replace("{{dayNumber}}", targetDay)
);

console.log("Check if I haven't messed up, please.");
