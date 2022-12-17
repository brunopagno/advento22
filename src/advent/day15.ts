export function solve(input: Array<string>): [number, number] {
  return [part1(input, 2000000), part2(input, 4000000)];
}

export function part1(input: Array<string>, row: number): number {
  const parsed = parse(input);
  const ranges = findRanges(parsed, row);
  const sorted = ranges.sort((a, b) => a[0] - b[0]);

  let count = 0;
  let [previousStart, previousEnd] = sorted[0];
  for (let i = 1; i < ranges.length; i++) {
    const [start, end] = sorted[i];
    if (start > previousEnd) {
      count += previousEnd - previousStart + 1;
      previousStart = start;
      previousEnd = end;
    } else if (end > previousEnd) {
      previousEnd = end;
    }
  }
  count += previousEnd - previousStart + 1;

  const beaconsInLine = new Set<number>();
  for (const sensor of parsed) {
    if (sensor.beacon.y === row) {
      beaconsInLine.add(sensor.beacon.x);
    }
  }

  return count - beaconsInLine.size;
}

export function part2(input: Array<string>, maxSize: number): number {
  const parsed = parse(input);

  //const startingRow = 2906101;
  const startingRow = 0;
  for (let row = startingRow; row < maxSize; row += 1) {
    const ranges = findRanges(parsed, row);
    const sorted = ranges.sort((a, b) => a[0] - b[0]);

    let gap = -1;
    let [_, previousEnd] = sorted[0];
    for (let i = 1; i < ranges.length; i++) {
        const [start, end] = ranges[i]; 
        if (start > previousEnd) {
            gap = start - 1;
            break;
        } else if (end > previousEnd) {
            previousEnd = end;
        }
    }

    if (gap > -1) {
      return gap * 4_000_000 + row
    }
  }

  return 0;
}

export function parse(input: Array<string>): Array<Sensor> {
  const result: Array<Sensor> = [];
  const pattern = /-?\d+/g;
  for (const line of input) {
    if (line.length <= 0) {
      continue;
    }
    const matches = line.match(pattern) as [string, string, string, string];

    const position = { x: parseInt(matches[0]), y: parseInt(matches[1]) };
    const beacon = { x: parseInt(matches[2]), y: parseInt(matches[3]) };

    result.push({
      position,
      beacon,
      distance: distanceBetween(position, beacon),
    });
  }

  return result;
}

type Position = {
  x: number;
  y: number;
};
type Sensor = {
  position: Position;
  beacon: Position;
  distance: number;
};
type Range = [number, number];

export function distanceBetween(a: Position, b: Position): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function findRanges(sensors: Array<Sensor>, row: number): Array<Range> {
  return sensors
    .filter((sensor) => Math.abs(row - sensor.position.y) <= sensor.distance)
    .map((sensor) => {
      let dy = Math.abs(row - sensor.position.y);
      return [
        sensor.position.x - (sensor.distance - dy),
        sensor.position.x + (sensor.distance - dy),
      ];
    });
}
