const day = process.argv[2];

if (!day) {
  console.error("Please provide a number as an argument");
  process.exit(1);
}

const adventFunction = require(`./day${day}.js`);

const before = Date.now();
adventFunction();
const after = Date.now();

// time in seconds
const inSeconds = (after - before) / 1000;
console.log(`${inSeconds}s [JavaScript]`);
