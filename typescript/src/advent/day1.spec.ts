import { describe, expect, test } from "@jest/globals";
import { calculateCalories, max, part1, part2 } from "./day1";

describe("Day 1", () => {
  describe("calculateCalories", () => {
    test("when given an empty list, returns 0", () => {
      expect(calculateCalories([])).toBe(0);
    });

    test("when given a list with a single item, returns the item", () => {
      expect(calculateCalories([1])).toBe(1);
    });

    test("when given a list with multiple items, returns the sum of the items", () => {
      expect(calculateCalories([1, 2, 3])).toBe(6);
    });
  });

  describe("max", () => {
    test("when given an empty list, returns 0", () => {
      expect(max([])).toBe(0);
    });

    test("when given a list with a single item, returns the item", () => {
      expect(max([1])).toBe(1);
    });

    test("when given a list with multiple items, returns the maximum item", () => {
      expect(max([1, 2, 3])).toBe(3);
    });
  });

  const testInput = [
    "1000",
    "2000",
    "3000",
    "",
    "4000",
    "",
    "5000",
    "6000",
    "",
    "7000",
    "8000",
    "9000",
    "",
    "10000",
  ];

  describe("part1", () => {
    test("when given the test input, returns the maximum calories", () => {
      expect(part1(testInput)).toBe(24000);
    });
  });

  describe("part2", () => {
    test("when given the test input, returns the maximum calories", () => {
      expect(part2(testInput)).toBe(45000);
    });
  });
});
