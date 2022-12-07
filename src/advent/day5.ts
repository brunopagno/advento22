export function solve(input: Array<string>) {
  return [part1(input), part2(input)];
}

export function part1(input: Array<string>) {
  const split = input.indexOf("");
  const crates = setupCrates(input.slice(0, split));

  for (const instruction of input.slice(split + 1)) {
    const found = instruction.match(/move (\d+) from (\d+) to (\d+)/);
    if (!found) {
      continue;
    }

    let [, amount, from, to] = found.map((n) => parseInt(n, 10));
    from -= 1;
    to -= 1;

    for (let i = 0; i < amount; i++) {
      crates[to].push(crates[from].slice(-1)[0]);
      crates[from].pop();
    }
  }

  return crates.map((crate) => crate[crate.length - 1]).join("");
}

export function part2(input: Array<string>) {
  const split = input.indexOf("");
  const crates = setupCrates(input.slice(0, split));

  for (const instruction of input.slice(split + 1)) {
    const found = instruction.match(/move (\d+) from (\d+) to (\d+)/);
    if (!found) {
      continue;
    }

    let [, amount, from, to] = found.map((n) => parseInt(n, 10));
    from -= 1;
    to -= 1;

    crates[from].slice(-amount).forEach((item) => crates[to].push(item));
    crates[from].splice(-amount);
  }

  return crates.map((crate) => crate[crate.length - 1]).join("");
}

export function setupCrates(input: Array<string>): Array<string[]> {
  return input.map((crate) => Array.from(crate));
}
