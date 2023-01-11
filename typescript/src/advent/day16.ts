export function solve(input: Array<string>): [number, number] {
  return [part1(input), part2(input)];
}

export function part1(input: Array<string>): number {
  const valves = parse(input);

  let time = 1;
  let pressureReleased = 0;
  let current = valves[0];
  while (time < 30) {
    const next = findNext(current, valves);
    console.log({
      from: current.name,
      to: next[next.length - 1].name,
    });
    for (let i = 0; i < next.length; i++) {
      time += 1;
      pressureReleased += releasePressure(valves);
    }

    current = next[next.length - 1];
    current.open = true;
    time += 1;
    pressureReleased += releasePressure(valves);
  }

  return pressureReleased;
}

export function part2(input: Array<string>): number {
  return 0;
}

type Valve = {
  name: string;
  rate: number;
  tunnels: Array<Valve>;
  open: boolean;
};

export function parse(input: Array<string>): Array<Valve> {
  const entries: Array<Valve> = [];

  const matcher = /([A-Z][A-Z])|(\d+)/g;
  for (const line of input) {
    const [name, rate, _] = line.match(matcher) as Array<string>;
    entries.push({
      name,
      rate: parseInt(rate),
      tunnels: [],
      open: false,
    });
  }
  for (const line of input) {
    const [name, _, ...tunnels] = line.match(matcher) as Array<string>;

    const entry = entries.find((entry) => entry.name === name);
    if (entry) {
      for (const tunnel of tunnels) {
        const tunnelEntry = entries.find((entry) => entry.name === tunnel);
        if (tunnelEntry) {
          entry.tunnels.push(tunnelEntry);
        }
      }
    }
  }

  return entries;
}

export function releasePressure(valves: Array<Valve>): number {
  return valves
    .filter((v) => v.open)
    .map((v) => v.rate)
    .reduce((acc, rate) => acc + rate, 0);
}

function findNext(origin: Valve, valves: Array<Valve>): Array<Valve> {
  const available = valves.filter((v) => !v.open && v.rate > 0);

  let selectedPath: Array<Valve> = [];
  let selectedValue = Number.MIN_SAFE_INTEGER;
  available.forEach((v) => {
    const path = findPath(origin, v);
    const value = v.rate - path.length - 1;
    if (value > selectedValue) {
      selectedValue = value;
      selectedPath = path;
    }
  });

  return selectedPath;
}

function findPath(
  origin: Valve,
  destination: Valve,
  visited?: Array<Valve>
): Array<Valve> {
  for (const valve of origin.tunnels) {
    if (valve.name === destination.name) {
      return [origin, valve];
    }
  }

  for (const valve of origin.tunnels.filter((v) => !visited?.includes(v))) {
    const auxVisited = visited ? [...visited, valve] : [valve];
    const path = findPath(valve, destination, auxVisited);
    if (path.length > 0) {
      return [origin, ...path];
    }
  }

  return [];
}
