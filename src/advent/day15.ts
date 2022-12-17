export function solve(input: Array<string>): [number, number] {
  return [part1(input, 2000000), part2(input)];
}

export function part1(input: Array<string>, row: number): number {
  const result = new Set<number>();

  const parsed = parse(input);
  for (let [sensor, beacon] of parsed) {
    const yDist = Math.abs(row - sensor.y);
    const sensorRadius = distanceBetween(sensor, beacon);

    if (yDist > sensorRadius) {
      continue;
    }
    const span = sensorRadius - yDist;
    const from = sensor.x - span;
    const to = sensor.x + span;

    for (let i = from; i <= to; i++) {
      result.add(i);
    }
  }

  for (let [sensor, beacon] of parsed) {
    if (sensor.y === row) {
      result.delete(sensor.x);
    }
    if (beacon.y === row) {
      result.delete(beacon.x);
    }
  }

  return result.size;
}

export function part2(input: Array<string>): number {
  return 0;
}

export function parse(input: Array<string>): Array<Array<Position>> {
  const result: Array<Array<Position>> = [];
  const pattern = /-?\d+/g;
  for (const line of input) {
    if (line.length <= 0) {
      continue;
    }
    const matches = line.match(pattern) as [string, string, string, string];

    result.push([
      { x: parseInt(matches[0]), y: parseInt(matches[1]) },
      { x: parseInt(matches[2]), y: parseInt(matches[3]) },
    ]);
  }

  return result;
}

type Position = {
  x: number;
  y: number;
};
type Paint = {
  x: number;
  width: number;
};

export function distanceBetween(a: Position, b: Position): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
