export function solve(input: Array<string>): [number, number] {
  return [part1(input), part2(input)];
}

export function part1(input: Array<string>): number {
  const rucksacks = new Array<number>();
  let group = new Array<number>();
  for (const item of input) {
    if (item == "") {
      rucksacks.push(calculateCalories(group));
      group = new Array<number>();
    } else {
      group.push(parseInt(item));
    }
  }

  return max(rucksacks);
}

export function part2(input: Array<string>): number {
  const rucksacks = new Array<number>();
  let group = new Array<number>();
  for (const item of input) {
    if (item == "") {
      rucksacks.push(calculateCalories(group));
      group = new Array<number>();
    } else {
      group.push(parseInt(item));
    }
  }
  rucksacks.push(calculateCalories(group));

  const result = rucksacks.sort((a, b) => b - a).slice(0, 3);

  return result.reduce((acc, curr) => acc + curr, 0);
}

export function max(rucksacks: Array<number>): number {
  return rucksacks.reduce((max, current) => (current > max ? current : max), 0);
}

export function calculateCalories(rucksack: Array<number>): number {
  return rucksack.reduce((acc, curr) => acc + curr, 0);
}
