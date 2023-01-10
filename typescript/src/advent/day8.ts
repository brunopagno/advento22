export function solve(input: Array<string>): [number, number] {
  return [part1(input), part2(input)];
}

export function part1(input: Array<string>): number {
  const grid = buildGrid(input);

  let visibleTrees = 0;
  for (let row = 1; row < grid.length - 1; row++) {
    for (let col = 1; col < grid[row].length - 1; col++) {
      if (isVisible(grid, row, col)) {
        visibleTrees++;
      }
    }
  }

  visibleTrees += (grid.length - 1) * 4;

  return visibleTrees;
}

export function part2(input: Array<string>): number {
  const grid = buildGrid(input);

  let max = -1;
  for (let row = 1; row < grid.length - 1; row++) {
    for (let col = 1; col < grid[row].length - 1; col++) {
      const score = scenicScore(grid, row, col);
      if (score > max) {
        max = score;
      }
    }
  }

  return max;
}

export function buildGrid(input: Array<string>): Array<Array<number>> {
  return input.map((line) => Array.from(line).map((c) => parseInt(c, 10)));
}

export function isVisible(
  grid: Array<Array<number>>,
  row: number,
  col: number
): boolean {
  const height = grid[row][col];
  const line = grid[row];

  let visibleFromTheLeft = true;
  for (let i = 0; i < col; i++) {
    if (line[i] >= height) {
      visibleFromTheLeft = false;
      break;
    }
  }

  let visibleFromTheRight = true;
  for (let i = line.length - 1; i > col; i--) {
    if (line[i] >= height) {
      visibleFromTheRight = false;
      break;
    }
  }

  let visibleFromTheTop = true;
  for (let i = 0; i < row; i++) {
    if (grid[i][col] >= height) {
      visibleFromTheTop = false;
      break;
    }
  }

  let visibleFromTheBottom = true;
  for (let i = grid.length - 1; i > row; i--) {
    if (grid[i][col] >= height) {
      visibleFromTheBottom = false;
      break;
    }
  }

  return (
    visibleFromTheLeft ||
    visibleFromTheRight ||
    visibleFromTheTop ||
    visibleFromTheBottom
  );
}

export function scenicScore(
  grid: Array<Array<number>>,
  row: number,
  col: number
): number {
  const height = grid[row][col];
  const line = grid[row];

  let l = 0;
  for (let i = col - 1; i >= 0; i--) {
    l += 1;
    if (line[i] >= height) {
      break;
    }
  }

  let r = 0;
  for (let i = col + 1; i < line.length; i++) {
    r += 1;
    if (line[i] >= height) {
      break;
    }
  }

  let u = 0;
  for (let i = row - 1; i >= 0; i--) {
    u += 1;
    if (grid[i][col] >= height) {
      break;
    }
  }

  let d = 0;
  for (let i = row + 1; i < grid.length; i++) {
    d += 1;
    if (grid[i][col] >= height) {
      break;
    }
  }

  return l * r * u * d;
}
