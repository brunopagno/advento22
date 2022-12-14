export function solve(input: Array<string>): [number, number] {
  return [part1(input), part2(input)];
}

export function part1(input: Array<string>): number {
  const boundaries = findBoundaries(input);
  const slice = parse(input, boundaries);

  let dropped = dropGrainOfSand(slice, 500, 0, boundaries);

  let count = 0;
  while (dropped) {
    dropped = dropGrainOfSand(slice, 500, 0, boundaries);
    count++;
  }

  return count;
}

export function part2(input: Array<string>): number {
  let boundaries = findBoundaries(input);
  const x1 = boundaries[0] - 1000;
  const x2 = boundaries[1] + 1000;

  const y = boundaries[2] + 2;
  input.push(`${x1},${y} -> ${x2},${y}`);
  boundaries = findBoundaries(input);
  const slice = parse(input, boundaries);

  let dropped = dropGrainOfSand(slice, 500, 0, boundaries);
  let count = 0;
  while (dropped) {
    dropped = dropGrainOfSand(slice, 500, 0, boundaries);
    count++;
  }

  return count;
}

const AIR = 0;
const ROCK = 1;
const SAND = 2;

type VerticalSlice = { [key: number]: Array<number> };
type Boundaries = [number, number, number];

export function dropGrainOfSand(
  vs: VerticalSlice,
  x: number,
  y: number,
  bounds: Boundaries
): boolean {
  const target = vs[x].findIndex((v, i) => i >= y && v > AIR);
  if (target === 0) {
    return false;
  }

  if (target > -1) {
    if (x - 1 < bounds[0] || x + 1 > bounds[1]) {
      return false;
    }

    if (vs[x - 1][target] === AIR) {
      return dropGrainOfSand(vs, x - 1, target, bounds);
    } else if (vs[x + 1][target] === AIR) {
      return dropGrainOfSand(vs, x + 1, target, bounds);
    } else if (vs[x][target - 1] === AIR) {
      vs[x][target - 1] = SAND;
      return true;
    }
  }

  return false;
}

export function parse(
  input: Array<string>,
  boundaries: Boundaries
): VerticalSlice {
  const slice: VerticalSlice = {
    500: [],
  };

  for (let x = boundaries[0]; x <= boundaries[1]; x++) {
    slice[x] = [];
    for (let y = 0; y <= boundaries[2]; y++) {
      slice[x][y] = AIR;
    }
  }

  for (const line of input) {
    const steps = line.split(" -> ");

    for (let i = 0; i < steps.length - 1; i += 1) {
      const [x1, y1] = steps[i].split(",").map(Number);
      const [x2, y2] = steps[i + 1].split(",").map(Number);

      if (x1 === x2) {
        const [from, to] = y1 < y2 ? [y1, y2] : [y2, y1];
        for (let y = from; y <= to; y++) {
          slice[x1][y] = ROCK;
        }
      }
      if (y1 === y2) {
        const [from, to] = x1 < x2 ? [x1, x2] : [x2, x1];
        for (let x = from; x <= to; x++) {
          slice[x][y1] = ROCK;
        }
      }
    }
  }

  return slice;
}

export function findBoundaries(input: Array<string>): Boundaries {
  let [minX, maxX, maxY] = [Number.MAX_SAFE_INTEGER, 0, 0];
  for (const line of input) {
    const steps = line.split(" -> ");
    for (const step of steps) {
      const [x, y] = step.split(",").map(Number);
      if (x < minX) {
        minX = x;
      }
      if (x > maxX) {
        maxX = x;
      }
      if (y > maxY) {
        maxY = y;
      }
    }
  }
  return [minX, maxX, maxY];
}
