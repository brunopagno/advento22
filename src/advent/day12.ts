export function solve(input: Array<string>): [number, number] {
  return [part1(input), part2(input)];
}

export const ME = "S".charCodeAt(0);
export const TARGET = "E".charCodeAt(0);

export function part1(input: Array<string>): number {
  const grid = buildGrid(input);

  const path = findPath(grid);

  return path.length;
}

export function part2(input: Array<string>): number {
  const grid = buildGrid(input);

  const originalOrigin = findPositionOf(ME, grid);
  const a = "a".charCodeAt(0);
  grid[originalOrigin[0]][originalOrigin[1]] = a;
  const allGrids = Array<Grid>();
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === a) {
        const newGrid = grid.map((row) => row.slice());
        newGrid[i][j] = ME;
        allGrids.push(newGrid);
      }
    }
  }

  const paths: Array<Array<Position>> = [];
  for (const grid of allGrids) {
    process.stdout.write(".");
    paths.push(findPath(grid));
  }

  const pathLengths = paths
    .filter((path) => path.length > 0)
    .map((path) => path.length);
  return Math.min(...pathLengths);
}

type Position = [number, number];
type Node = {
  position: Position;
  parent: Node | null;
  g: number;
};

type Grid = Array<Array<number>>;

export function findPath(grid: Grid): Array<Position> {
  const start = findPositionOf(ME, grid);
  const end = findPositionOf(TARGET, grid);

  const open: Array<Node> = [
    {
      position: start,
      parent: null,
      g: 0,
    },
  ];
  const closed: Array<Node> = [];

  while (open.length > 0) {
    const current = open.shift()!;

    for (const neighbor of findPossibleSuccessors(current.position, grid)) {
      if (neighbor[0] === end[0] && neighbor[1] === end[1]) {
        const path: Array<Position> = [neighbor];
        let node = current;
        while (node.parent) {
          path.push(node.position);
          node = node.parent;
        }
        path.reverse();
        return path;
      } else {
        const g = current.g + 1;
        const node = {
          position: neighbor,
          parent: current,
          g,
        };

        const other = open.find(
          (n) => n.position[0] === neighbor[0] && n.position[1] === neighbor[1]
        );
        if (other && other.g <= g) {
          continue;
        }

        const other2 = closed.find(
          (n) => n.position[0] === neighbor[0] && n.position[1] === neighbor[1]
        );
        if (other2 && other2.g <= g) {
          continue;
        }

        open.push(node);
      }
    }

    closed.push(current);
    open.sort((a, b) => a.g - b.g);
  }

  return [];
}

export function findPossibleSuccessors(
  position: Position,
  grid: Grid
): Array<Position> {
  const [x, y] = position;
  const current = grid[x][y];
  const possible: Array<Position> = [];
  if (x > 0 && canMove(current, grid[x - 1][y])) {
    possible.push([x - 1, y]);
  }
  if (x < grid.length - 1 && canMove(current, grid[x + 1][y])) {
    possible.push([x + 1, y]);
  }
  if (y > 0 && canMove(current, grid[x][y - 1])) {
    possible.push([x, y - 1]);
  }
  if (y < grid[x].length - 1 && canMove(current, grid[x][y + 1])) {
    possible.push([x, y + 1]);
  }
  return possible;
}

export function findPositionOf(target: number, grid: Grid): Position {
  for (let x = 0; x < grid.length; x++) {
    const row = grid[x];
    for (let y = 0; y < row.length; y++) {
      if (row[y] === target) {
        return [x, y];
      }
    }
  }
  return [-1, -1];
}

export function canMove(from: number, to: number) {
  if (from === TARGET) {
    from = "z".charCodeAt(0);
  } else if (from === ME) {
    from = "a".charCodeAt(0);
  }
  if (to === TARGET) {
    to = "z".charCodeAt(0);
  } else if (to === ME) {
    to = "a".charCodeAt(0);
  }
  return from + 1 >= to;
}

function buildGrid(input: Array<string>): Grid {
  return input.map((row) => row.split("").map((c) => c.charCodeAt(0)));
}
