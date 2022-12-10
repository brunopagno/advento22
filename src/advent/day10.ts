export function solve(input: Array<string>): [number, string] {
  return [part1(input), part2(input)];
}

export function part1(input: Array<string>): number {
  let device: Proto = { cycle: 0, X: 1, signal: 0 };

  let sum = 0;
  let last = -1;
  for (const instruction of input) {
    device = op(device, instruction);
    if (device.signal !== last) {
      sum += device.signal || 0;
      last = device.signal || 0;
    }
  }

  return sum;
}

export function op(device: Proto, input: string): Proto {
  if (input.startsWith("addx")) {
    const value = parseInt(input.split(" ")[1]);
    return addX(device, value);
  } else if (input.startsWith("noop")) {
    return noop(device);
  }

  return device;
}

function addX(device: Proto, value: number): Proto {
  const nextCycle = device.cycle + 2;
  updateSignal(device, nextCycle);
  return { ...device, cycle: nextCycle, X: device.X + value };
}

function noop(device: Proto): Proto {
  const nextCycle = device.cycle + 1;
  updateSignal(device, nextCycle);
  return { ...device, cycle: nextCycle };
}

function updateSignal(device: Proto, nextCycle: number) {
  const overLastCycleAmount = (nextCycle - 20) % 40;
  if (
    (nextCycle >= 20 && !device.signal) ||
    overLastCycleAmount < (device.cycle - 20) % 40
  ) {
    device.signal = (nextCycle - overLastCycleAmount) * device.X;
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
