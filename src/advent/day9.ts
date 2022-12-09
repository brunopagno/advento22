export function solve(input: Array<string>): [number, number] {
  return [part1(input), part2(input)];
}

export function part1(input: Array<string>): number {
  const visited = new Array<Position>([0, 0]);

  let head = [0, 0] as Position;
  let tail = [0, 0] as Position;
  for (const line of input) {
    const [direction, distance] = line.split(" ");
    for (let i = 0; i < parseInt(distance); i++) {
      const next = move(head, direction, 1);
      const distance = distanceBetween(next, tail);
      if (distance > 1) {
        tail = head;
        const found = visited.find(
          (position) => position[0] == tail[0] && position[1] == tail[1]
        );
        if (!found) {
          visited.push(tail);
        }
      }
      head = next;
    }
  }

  return visited.length;
}

export function part2(input: Array<string>): number {
  return 0;
}

type Position = [number, number];

export function move(
  position: Position,
  direction: string,
  distance: number
): Position {
  const [x, y] = position;
  switch (direction) {
    case "U":
      return [x, y + distance];
    case "D":
      return [x, y - distance];
    case "L":
      return [x - distance, y];
    case "R":
      return [x + distance, y];
  }
  throw new Error(`Unknown direction: ${direction}`);
}

export function distanceBetween(position: Position, other: Position): number {
  return Math.max(
    Math.abs(position[0] - other[0]),
    Math.abs(position[1] - other[1])
  );
}
