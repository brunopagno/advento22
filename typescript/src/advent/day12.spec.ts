import { describe, expect, test } from "@jest/globals";
import {
  ME,
  TARGET,
  findPath,
  findPossibleSuccessors,
  findPositionOf,
  canMove,
  part1,
  part2,
} from "./day12";

describe("Day 12", () => {
  describe("findPath", () => {
    const grid = [
      [100, 99, 98, 97, 114, 113],
      [101, 120, 119, ME, 115, 112],
      [102, 121, 118, 117, 116, 111],
      [103, 122, TARGET, 120, 120, 110],
      [104, 105, 106, 107, 108, 109],
    ];

    test("should find path", () => {
      expect(findPath(grid)).toEqual([
        [0, 3],
        [0, 2],
        [0, 1],
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
        [4, 5],
        [3, 5],
        [2, 5],
        [1, 5],
        [0, 5],
        [0, 4],
        [1, 4],
        [2, 4],
        [2, 3],
        [2, 2],
        [1, 2],
        [1, 1],
        [2, 1],
        [3, 1],
        [3, 2],
      ]);
    });
  });

  describe("findPossibleSuccessors", () => {
    const grid = [
      [99, 110, 110],
      [ME, 97, 97],
      [97, TARGET, 110],
    ];

    test("should find possible successors", () => {
      expect(findPossibleSuccessors([1, 1], grid)).toEqual([
        [1, 0],
        [1, 2],
      ]);
    });
  });

  describe("findMyPosition", () => {
    const grid = [
      [100, 99, 98, 97, 114, 113],
      [101, 121, 120, ME, 115, 112],
      [102, 122, 119, 117, 116, 111],
      [103, 123, TARGET, 120, 120, 110],
      [104, 105, 106, 107, 108, 109],
    ];

    test("should find my position", () => {
      expect(findPositionOf(ME, grid)).toEqual([1, 3]);
    });

    test("should find target position", () => {
      expect(findPositionOf(TARGET, grid)).toEqual([3, 2]);
    });
  });

  describe("canMove", () => {
    test("should return true if can move", () => {
      expect(canMove("a".charCodeAt(0), "b".charCodeAt(0))).toBe(true);
    });

    test("should return false if cannot move", () => {
      expect(canMove("b".charCodeAt(0), "d".charCodeAt(0))).toBe(false);
    });

    test("should return true if try to move to TARGET", () => {
      expect(canMove("y".charCodeAt(0), TARGET)).toBe(true);
    });

    test("should return false if not high and try to move to TARGET", () => {
      expect(canMove("f".charCodeAt(0), TARGET)).toBe(false);
    });

    test("should return true if try to move to ME", () => {
      expect(canMove("a".charCodeAt(0), ME)).toBe(true);
    });

    test("should return true if try to move from ME", () => {
      expect(canMove(ME, "a".charCodeAt(0))).toBe(true);
    });
  });

  const testInput = [
    "Sabqponm",
    "abcryxxl",
    "accszExk",
    "acctuvwj",
    "abdefghi",
  ];

  describe("part1", () => {
    test("should solve for test input", () => {
      expect(part1(testInput)).toBe(31);
    });
  });

  describe("part2", () => {
    test("should solve for test input", () => {
      expect(part2(testInput)).toBe(29);
    });
  });
});
