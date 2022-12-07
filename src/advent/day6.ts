export function solve(input: Array<string>) {
  return [part1(input), part2(input)];
}

export function part1(input: Array<string>) {
  return indexOfUniquePatch(Array.from(input[0]), 4);
}

export function part2(input: Array<string>) {
  return indexOfUniquePatch(Array.from(input[0]), 14);
}

export function indexOfUniquePatch(input: Array<string>, size: number) {
  let packet = input.slice(0, size);
  let index = -1;

  for (let i = size; i <= input.length; i++) {
    if (allUnique(packet)) {
      index = i;
      break;
    }

    packet.shift();
    packet.push(input[i]);
  }

  return index;
}

export function allUnique(input: Array<string>): boolean {
  return new Set(input).size === input.length;
}
