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
  const tailVisited = new Array<Position>([0, 0]);
  const knots = 10;

  let snake = Array<Position>();
  for (let i = 0; i < knots; i++) {
    snake.push([0, 0]);
  }

  for (const line of input) {
    const [direction, distance] = line.split(" ");
    for (let i = 0; i < parseInt(distance); i++) {
      snake[0] = move(snake[0], direction, 1);

      for (let j = 1; j < knots; j++) {
        snake[j] = follow(snake[j], snake[j - 1]);
      }

      const tail = snake[knots - 1];
      const found = tailVisited.find(
        (position) => position[0] == tail[0] && position[1] == tail[1]
      );
      if (!found) {
        tailVisited.push(tail);
      }
    }
  }

  return tailVisited.length;
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

export function follow(current: Position, target: Position): Position {
  if (distanceBetween(target, current) <= 1) {
    return current;
  }

  if (target[0] == current[0]) {
    return [current[0], current[1] + Math.sign(target[1] - current[1])];
  } else if (target[1] == current[1]) {
    return [current[0] + Math.sign(target[0] - current[0]), current[1]];
  } else {
    return [
      current[0] + Math.sign(target[0] - current[0]),
      current[1] + Math.sign(target[1] - current[1]),
    ];
  }
}

export function distanceBetween(position: Position, other: Position): number {
  return Math.max(
    Math.abs(position[0] - other[0]),
    Math.abs(position[1] - other[1])
  );
}
