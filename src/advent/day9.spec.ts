import { describe, expect, test } from "@jest/globals";
import { move, distanceBetween, part1, part2 } from "./day9";

describe("Day 9", () => {
  describe("move", () => {
    test("U", () => {
      expect(move([0, 0], "U", 1)).toEqual([0, 1]);
    });
    test("D", () => {
      expect(move([0, 0], "D", 1)).toEqual([0, -1]);
    });
    test("L", () => {
      expect(move([0, 0], "L", 1)).toEqual([-1, 0]);
    });
    test("R", () => {
      expect(move([0, 0], "R", 1)).toEqual([1, 0]);
    });
  });

  describe("distanceBetween", () => {
    test("0,0 to 0,0", () => {
      expect(distanceBetween([0, 0], [0, 0])).toBe(0);
    });
    test("0,0 to 0,1", () => {
      expect(distanceBetween([0, 0], [0, 1])).toBe(1);
    });
    test("0,0 to 1,0", () => {
      expect(distanceBetween([0, 0], [1, 0])).toBe(1);
    });
    test("0,0 to 1,1", () => {
      expect(distanceBetween([0, 0], [1, 1])).toBe(1);
    });
    test("0,0 to 2,2", () => {
      expect(distanceBetween([0, 0], [2, 2])).toBe(2);
    });
  });

  const testInput = ["R 4", "U 4", "L 3", "D 1", "R 4", "D 1", "L 5", "R 2"];

  test("part1", () => {
    expect(part1(testInput)).toBe(13);
  });

  test("part2", () => {
    expect(part2(testInput)).toBe(0);
  });
});
