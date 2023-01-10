import { describe, expect, test } from "@jest/globals";
import { contain, overlap, part1, part2 } from "./day4";

describe("day4", () => {
  describe("contain", () => {
    test("when a contains b returns true", () => {
      expect(contain([2, 4], [3, 3])).toBe(true);
    });

    test("when b constains a returns true", () => {
      expect(contain([3, 3], [2, 4])).toBe(true);
    });

    test("when a and b are disjoint returns false", () => {
      expect(contain([2, 3], [4, 5])).toBe(false);
    });
  });

  describe("overlap", () => {
    test("when a overlaps b returns true", () => {
      expect(overlap([2, 4], [3, 5])).toBe(true);
    });

    test("when b overlaps a return true", () => {
      expect(overlap([3, 5], [2, 4])).toBe(true);
    });

    test("when a and b are disjoint returns false", () => {
      expect(overlap([2, 3], [4, 5])).toBe(false);
    });
  });

  const testInput = [
    "2-4,6-8",
    "2-3,4-5",
    "5-7,7-9",
    "2-8,3-7",
    "6-6,4-6",
    "2-6,4-8",
  ];

  describe("part1", () => {
    test("should solve for the test input", () => {
      expect(part1(testInput)).toBe(2);
    });
  });

  describe("part2", () => {
    test("should solve for the test input", () => {
      expect(part2(testInput)).toBe(4);
    });
  });
});
