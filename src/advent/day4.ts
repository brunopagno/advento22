export function solve(input: Array<string>): [number, number] {
  return [part1(input), part2(input)];
}

export function part1(input: Array<string>): number {
  let total = 0;
  for (const line of input) {
    const [a, b] = line
      .split(",")
      .map((s) => s.split("-").map((i) => parseInt(i)) as Pair);

    if (contain(a, b)) {
      total += 1;
    }
  }

  return total;
}

export function part2(input: Array<string>): number {
  let total = 0;
  for (const line of input) {
    const [a, b] = line
      .split(",")
      .map((s) => s.split("-").map((i) => parseInt(i)) as Pair);

    if (overlap(a, b)) {
      total += 1;
    }
  }

  return total;
}

type Pair = [number, number];

export function contain(a: Pair, b: Pair): boolean {
  return (a[0] <= b[0] && a[1] >= b[1]) || (b[0] <= a[0] && b[1] >= a[1]);
}

export function overlap(a: Pair, b: Pair): boolean {
  return (a[1] >= b[0] && a[0] <= b[1]) || (b[1] <= a[0] && b[0] >= a[1]);
}
