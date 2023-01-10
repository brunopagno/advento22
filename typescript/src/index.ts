import fs from "fs";

function main() {
  const day = process.argv[2];

  if (!day) {
    console.error("Usage: npm run it <day>");
    process.exit(1);
  }

  import(`./advent/day${day}`).then(({ solve }) => {
    const fileLines = fs.readFileSync(`./data/day${day}.txt`, "utf8");
    const input = fileLines.split("\n");
    const result = solve(input);

    console.log(`NodeJS day ${day} result`);
    console.log(result);
  });
}

main();
