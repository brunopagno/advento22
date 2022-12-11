export function solve(input: Array<string>): [number, number] {
  return [part1(input), part2(input)];
}

export function part1(input: Array<string>): number {
  let monkeys = parse(input);

  for (let i = 0; i < 20; i++) {
    monkeys = round(monkeys);
  }

  monkeys.sort((a, b) => b.inspectedAmount - a.inspectedAmount);
  console.log(monkeys.map((m) => m.inspectedAmount));
  return monkeys[0].inspectedAmount * monkeys[1].inspectedAmount;
}

export function part2(input: Array<string>): number {
  let monkeys = parse(input);

  for (let i = 0; i < 10000; i++) {
    monkeys = round(monkeys, true);
    if (i % 1000 === 0) {
      console.log({
        i,
        monkeys: monkeys.map((m) => m.inspectedAmount),
      });
    }
  }

  monkeys.sort((a, b) => b.inspectedAmount - a.inspectedAmount);
  return monkeys[0].inspectedAmount * monkeys[1].inspectedAmount;
}

function round(monkeys: Array<Monkey>, worried?: boolean): Array<Monkey> {
  for (const monkey of monkeys) {
    while (monkey.items.length > 0) {
      let item = monkey.items.shift();

      if (!!item) {
        monkey.inspectedAmount += 1;
        item = monkey.operation(item);
        if (!worried) {
          item = BigInt(Math.floor(Number(item) / 3));
        }
        if (item % monkey.test.divisibleBy === 0n) {
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
    const items = input[i + 1].match(/\d+/g)?.map((x) => BigInt(x)) ?? [];
    const operation = extractOperation(input[i + 2]);
    const divisibleBy = BigInt(input[i + 3].split(" by ")[1]);
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

export function extractOperation(input: string): (x: bigint) => bigint {
  const opTextParts = input.split("= ")[1].split(" ");
  const operands = [parseInt(opTextParts[0]), parseInt(opTextParts[2])];
  const operation = opTextParts[1];

  // javascript darkness here. Don´t use it at home
  return (old: Item): Item => {
    let a: bigint = 0n;
    let b: bigint = 0n;
    if (isNaN(operands[0])) {
      a = old;
    } else {
      a = BigInt(operands[0]);
    }
    if (isNaN(operands[1])) {
      b = old;
    } else {
      b = BigInt(operands[1]);
    }

    if (operation == "+") {
      return a + b;
    } else if (operation == "*") {
      return a * b;
    }
    return 0n;
  };
}

type Monkey = {
  id: number;
  items: Array<Item>;
  operation: (item: Item) => Item;
  test: Test;
  inspectedAmount: number;
};

type Item = bigint;

type Test = {
  divisibleBy: bigint;
  trueTarget: number;
  falseTarget: number;
};
