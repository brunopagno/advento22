export function solve(input: Array<string>): [number, number] {
  return [part1(input, 2000000), part2(input)];
}

export function part1(input: Array<string>, row: number): number {
  const parsed = parse(input);

  const targetRow: Array<Paint> = [];
  for (const [sensor, beacon] of parsed) {
    const dBeacon = distanceBetween(sensor, beacon);
    const dRow = distanceBetween(sensor, { x: sensor.x, y: 10 });

    targetRow.push({ x: sensor.x, width: dBeacon - dRow });
  }

  const result = new Set<number>();
  for (const paint of targetRow) {
    if (paint.width >= 0) {
      const from = paint.x - paint.width;
      const to = paint.x + paint.width;
      for (let i = from; i <= to; i++) {
        result.add(i);
      }
    }
  }

  for (const [sensor, beacon] of parsed) {
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
