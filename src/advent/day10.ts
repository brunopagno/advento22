export function solve(input: Array<string>): [number, string] {
  return [part1(input), part2(input)];
}

export function part1(input: Array<string>): number {
  let proto: Proto = { cycle: 0, X: 1, signal: 0 };

  let sum = 0;
  let last = -1;
  for (const instruction of input) {
    proto = op(proto, instruction);
    if (proto.signal !== last) {
      sum += proto.signal || 0;
      last = proto.signal || 0;
    }
  }

  return sum;
}

export function op(proto: Proto, input: string): Proto {
  if (input.startsWith("addx")) {
    const value = parseInt(input.split(" ")[1]);
    return addX(proto, value);
  } else if (input.startsWith("noop")) {
    return noop(proto);
  }

  return proto;
}

function addX(proto: Proto, value: number): Proto {
  const nextCycle = proto.cycle + 2;
  updateSignal(proto, nextCycle);
  return { ...proto, cycle: nextCycle, X: proto.X + value };
}

function noop(proto: Proto): Proto {
  const nextCycle = proto.cycle + 1;
  updateSignal(proto, nextCycle);
  return { ...proto, cycle: nextCycle };
}

function updateSignal(proto: Proto, nextCycle: number) {
  const overLastCycleAmount = (nextCycle - 20) % 40;
  if (
    (nextCycle >= 20 && !proto.signal) ||
    overLastCycleAmount < (proto.cycle - 20) % 40
  ) {
    proto.signal = (nextCycle - overLastCycleAmount) * proto.X;
  }
}

type Proto = {
  cycle: number;
  X: number;
  signal?: number;
};

// -------------------------------------------------------------

/*
 * '###..####.####.#..#.####.####.#..#..##..
 * '#..#....#.#....#.#..#....#....#..#.#..#.
 * '#..#...#..###..##...###..###..####.#..#.
 * '###...#...#....#.#..#....#....#..#.####.
 * '#.#..#....#....#.#..#....#....#..#.#..#.
 * '#..#.####.####.#..#.####.#....#..#.#..#.
 */

export function part2(input: Array<string>): string {
  let device = createDevice();

  for (const instruction of input) {
    device = render(device, instruction);
  }

  return device.screen.map((row) => row.join("")).join("\n");
}

type Device = {
  screen: Array<Array<string>>;
  width: number;
  cycle: number;
  x: number;
};

function render(device: Device, instruction: string): Device {
  if (instruction.startsWith("addx")) {
    [0, 1].forEach(() => {
      device = tick(device);
    });
    const value = parseInt(instruction.split(" ")[1]);
    device.x += value;
  } else if (instruction.startsWith("noop")) {
    device = tick(device);
  }

  return device;
}

export function tick(device: Device): Device {
  const row = Math.floor(device.cycle / device.width);
  const col = device.cycle % device.width;
  if (!device.screen[row]) {
    device.screen[row] = [];
  }

  device.screen[row].push(
    [device.x - 1, device.x, device.x + 1].includes(col) ? "#" : "."
  );
  device.cycle += 1;

  return device;
}

function createDevice(): Device {
  return {
    screen: [],
    width: 40,
    cycle: 0,
    x: 1,
  };
}
