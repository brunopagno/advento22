export function solve(input: Array<string>): [number, number] {
  return [part1(input, 2000000), part2(input, 4000000)];
}

export function part1(input: Array<string>, row: number): number {
  const result = new Set<number>();

  const parsed = parse(input);
  for (let [sensor, beacon] of parsed) {
    const intersection = findIntersection(sensor, beacon, row);
    for (const index of intersection) {
      result.add(index);
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

export function part2(input: Array<string>, maxSize: number): number {
  const parsed = parse(input);

  for (let y = 0; y < maxSize; y++) {
    console.log("row", y);
    const rowResult = new Set<number>();
    for (const [sensor, beacon] of parsed) {
      const intersection = findIntersection(sensor, beacon, y);
      for (const index of intersection) {
        if (index >= 0 && index <= maxSize) {
          rowResult.add(index);
        }
      }
    }

    if (rowResult.size < maxSize + 1) {
      for (let x = 0; x < maxSize; x++) {
        if (!rowResult.has(x)) {
          return x * 4000000 + y;
        }
      }
    }
  }

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

export function distanceBetween(a: Position, b: Position): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function findIntersection(
  sensor: Position,
  beacon: Position,
  row: number
): Array<number> {
  const result: Array<number> = [];
  const yDist = Math.abs(row - sensor.y);
  const sensorRadius = distanceBetween(sensor, beacon);

  if (yDist > sensorRadius) {
    return result;
  }
  const span = sensorRadius - yDist;
  const from = sensor.x - span;
  const to = sensor.x + span;

  for (let i = from; i <= to; i++) {
    result.push(i);
  }
  return result;
}
