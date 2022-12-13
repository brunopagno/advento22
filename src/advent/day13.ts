export function solve(input: Array<string>): [number, number] {
  return [part1(input), part2(input)];
}

export function part1(input: Array<string>): number {
  let count = 0;
  let round = 1;
  for (let i = 0; i < input.length; i += 3) {
    const left = parse(input[i]);
    const right = parse(input[i + 1]);

    const result = compare(left, right);

    if (result < 0) {
      count += round;
    }

    round += 1;
  }

  return count;
}

export function part2(input: Array<string>): number {
  const packets = [];

  for (const line of input) {
    if (line === "") {
      continue;
    }

    packets.push(parse(line));
  }
  packets.push([[2]]);
  packets.push([[6]]);

  packets.sort(compare);

  const indexOfTwo = packets.findIndex((packet) => compare(packet, [[2]]) === 0);
  const indexOfSix = packets.findIndex((packet) => compare(packet, [[6]]) === 0);

  return (indexOfTwo + 1) * (indexOfSix + 1);
}

export function parse(input: string): Array<Packet> {
  // eval magic parses the input straightforwardly
  return eval(`${input};`);
}

type Packet = number | Array<Packet>;

export function compare(left: Packet, right: Packet): number {
  if (typeof left === "number" && typeof right === "number") {
    return left - right;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    if (left.length === 0 && right.length === 0) {
      return 0;
    }

    if (left.length === 0) {
      return -1;
    }

    if (right.length === 0) {
      return 1;
    }

    const first = compare(left[0], right[0]);
    if (first !== 0) {
      return first;
    }

    return compare(left.slice(1), right.slice(1));
  }

  if (typeof left === "number") {
    return compare([left], right);
  }

  if (typeof right === "number") {
    return compare(left, [right]);
  }

  throw new Error("This should not be happening");
}
