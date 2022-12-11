export function solve(input: Array<string>): [number, number] {
  return [part1(input), part2(input)];
}

export function part1(input: Array<string>): number {
  let monkeys = parse(input);

  for (let i = 0; i < 20; i++) {
    monkeys = round(monkeys);
  }

  monkeys.sort((a, b) => b.inspectedAmount - a.inspectedAmount);
  return monkeys[0].inspectedAmount * monkeys[1].inspectedAmount;
}

export function part2(input: Array<string>): number {
  return 0;
}

function round(monkeys: Array<Monkey>): Array<Monkey> {
  for (const monkey of monkeys) {
    while (monkey.items.length > 0) {
      let item = monkey.items.shift();

      if (!!item) {
        monkey.inspectedAmount += 1;
        item = monkey.operation(item);
        item = Math.floor(item / 3);
        if (item % monkey.test.divisibleBy === 0) {
          monkeys[monkey.test.trueTarget].items.push(item);
        } else {
          monkeys[monkey.test.falseTarget].items.push(item);
        }
      }
    }
  }
  return monkeys;
}

export function parse(input: Array<string>): Array<Monkey> {
  const monkeys: Array<Monkey> = [];
  for (let i = 0; i < input.length; i += 7) {
    if (input[i] == "") {
      continue;
    }

    const id = parseInt(input[i].split(" ")[1].slice(0, -1));
    const items = input[i + 1].match(/\d+/g)?.map((x) => parseInt(x)) ?? [];
    const operation = extractOperation(input[i + 2]);
    const divisibleBy = parseInt(input[i + 3].split(" by ")[1]);
    const trueTarget = parseInt(input[i + 4].split(" monkey ")[1]);
    const falseTarget = parseInt(input[i + 5].split(" monkey ")[1]);
    monkeys.push({
      id,
      items: items,
      operation,
      test: {
        divisibleBy,
        trueTarget,
        falseTarget,
      },
      inspectedAmount: 0,
    });
  }
  return monkeys;
}

function extractOperation(input: string): (x: number) => number {
  const op = input.split("= ")[1];

  // javascript darkness here. Don´t use it at home
  return (old: Item): Item => {
    return eval(op);
  };
}

type Monkey = {
  id: number;
  items: Array<Item>;
  operation: (item: Item) => Item;
  test: Test;
  inspectedAmount: number;
};

type Item = number;

type Test = {
  divisibleBy: number;
  trueTarget: number;
  falseTarget: number;
};
