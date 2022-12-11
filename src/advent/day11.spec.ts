import { describe, expect, test } from "@jest/globals";
import { parse, extractOperation, part1, part2 } from "./day11";

describe("Day 11", () => {
  describe("parse", () => {
    const input = [
      "Monkey 0:",
      "  Starting items: 10, 20",
      "  Operation: new = old + 1",
      "  Test: divisible by 2",
      "    If true: throw to monkey 2",
      "    If false: throw to monkey 1",
      "",
    ];

    test("should return a Monkey given a valid input", () => {
      expect(parse(input)).toEqual([
        {
          id: 0,
          items: [10n, 20n],
          operation: expect.any(Function),
          test: {
            divisibleBy: 2n,
            trueTarget: 2n,
            falseTarget: 1n,
          },
          inspectedAmount: 0,
        },
      ]);
    });
  });

  describe("extractOperation", () => {
    test("should return a function that adds 1 to the input", () => {
      const op = "  Operation: new = old + 1";
      expect(extractOperation(op)(10n)).toEqual(11n);
    });
    test("should return a function that multiplies the input by 2", () => {
      const op = "  Operation: new = old * 2";
      expect(extractOperation(op)(10n)).toEqual(20n);
    });
    test("should return a function that uses old as the second argument", () => {
      const op = "  Operation: new = old * old";
      expect(extractOperation(op)(10n)).toEqual(100n);
    });
  });

  const testInput = [
    "Monkey 0:",
    "  Starting items: 79, 98",
    "  Operation: new = old * 19",
    "  Test: divisible by 23",
    "    If true: throw to monkey 2",
    "    If false: throw to monkey 3",
    "",
    "Monkey 1:",
    "  Starting items: 54, 65, 75, 74",
    "  Operation: new = old + 6",
    "  Test: divisible by 19",
    "    If true: throw to monkey 2",
    "    If false: throw to monkey 0",
    "",
    "Monkey 2:",
    "  Starting items: 79, 60, 97",
    "  Operation: new = old * old",
    "  Test: divisible by 13",
    "    If true: throw to monkey 1",
    "    If false: throw to monkey 3",
    "",
    "Monkey 3:",
    "  Starting items: 74",
    "  Operation: new = old + 3",
    "  Test: divisible by 17",
    "    If true: throw to monkey 0",
    "    If false: throw to monkey 1",
    "",
  ];

  describe("part1", () => {
    test("should solve for the test input", () => {
      expect(part1(testInput)).toBe(10605);
    });
  });

  describe("part2", () => {
    test("should solve for the test input", () => {
      expect(part2(testInput)).toBe(2713310158);
    });
  });
});
