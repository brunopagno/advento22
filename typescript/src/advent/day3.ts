export function solve(input: Array<string>): [number, number] {
  return [part1(input), part2(input)];
}

export function part1(input: Array<string>): number {
  let total = 0;

  for (const item of input) {
    const [compA, compB] = splitIntoCompartments(item);
    const commonItem = findCommonItem(compA.sort(), compB.sort());

    if (commonItem.length > 0) {
      total += calculatePriority(commonItem);
    }
  }

  return total;
}

export function part2(input: Array<string>): number {
  let total = 0;

  for (let i = 0; i < input.length; i += 3) {
    const group = [
      Array.from(input[i]).sort(),
      Array.from(input[i + 1]).sort(),
      Array.from(input[i + 2]).sort(),
    ];

    const commonItem = findCommonItem(...group);
    if (commonItem.length > 0) {
      total += calculatePriority(commonItem);
    }
  }

  return total;
}

export function splitIntoCompartments(input: string): [string[], string[]] {
  const half = input.length / 2;
  return [Array.from(input.slice(0, half)), Array.from(input.slice(half))];
}

export function findCommonItem(...groups: string[][]): string {
  while (groups.every((g) => g.length > 0)) {
    const firsts = groups.map((g) => g[0]);

    if (firsts.every((f) => f === firsts[0])) {
      return firsts[0];
    }

    const min = Math.min(...firsts.map((f) => f.charCodeAt(0)));
    groups.forEach((g) => {
      if (g[0].charCodeAt(0) === min) {
        g.shift();
      }
    });
  }

  return "";
}

export function calculatePriority(input: string): number {
  const value = input.charCodeAt(0);
  if (value >= 97 && value <= 122) {
    // a-z
    return value - "a".charCodeAt(0) + 1;
  } else {
    // A-Z
    return value - "A".charCodeAt(0) + 27;
  }
}
