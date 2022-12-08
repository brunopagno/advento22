import { describe, expect, test } from "@jest/globals";
import { isVisible, scenicScore, buildGrid, part1, part2 } from "./day8";

describe("Day 8", () => {
  describe("buildGrid", () => {
    test("should build a grid", () => {
      const input = ["12345", "67890"];
      const expected = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 0],
      ];
      expect(buildGrid(input)).toEqual(expected);
    });
  });

  describe("isVisible", () => {
    test("should return true when the cell is visible", () => {
      const grid = [
        [0, 5, 0],
        [3, 1, 0],
        [0, 0, 0],
      ];
      expect(isVisible(grid, 1, 1)).toEqual(true);
    });

    test("should return false when the cell is NOT visible", () => {
      const grid = [
        [3, 3, 3],
        [3, 1, 3],
        [3, 3, 3],
      ];
      expect(isVisible(grid, 1, 1)).toEqual(false);
    });
  });

  describe("scenicScore", () => {
    test("should return the scenic score", () => {
      const grid = [
        [0, 5, 0, 0],
        [3, 1, 0, 1],
        [0, 0, 0, 0],
        [0, 1, 0, 0],
      ];
      expect(scenicScore(grid, 1, 1)).toEqual(4);
    });
  });

  const testInput = ["30373", "25512", "65332", "33549", "35390"];

  describe("part1", () => {
    test("should solve for the test input", () => {
      expect(part1(testInput)).toEqual(21);
    });
  });

  describe("part2", () => {
    test("should solve for the test input", () => {
      expect(part2(testInput)).toEqual(8);
    });
  });
});
