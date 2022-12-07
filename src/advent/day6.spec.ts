import { describe, expect, test } from "@jest/globals";
import { indexOfUniquePatch, allUnique, part1, part2 } from "./day6";

describe("day6", () => {
  describe("indexOfUniquePatch", () => {
    test("should find the index when there is one available", () => {
      expect(indexOfUniquePatch(["a", "b", "a", "c"], 3)).toEqual(4);
    });

    test("should return -1 when there is not one", () => {
      expect(indexOfUniquePatch(["a", "b", "a", "b"], 3)).toEqual(-1);
    });
  });

  describe("allUnique", () => {
    test("should return true when all elements are unique", () => {
      expect(allUnique(["a", "b", "c"])).toEqual(true);
    });

    test("should return false when there are duplicates", () => {
      expect(allUnique(["a", "b", "a"])).toEqual(false);
    });
  });

  const testInput = ["mjqjpqmgbljsphdztnvjfqwrcgsmlb"];

  describe("part1", () => {
    test("should work for test input", () => {
      expect(part1(testInput)).toEqual(7);
    });
  });

  describe("part2", () => {
    test("should work for test input", () => {
      expect(part2(testInput)).toEqual(19);
    });
  });
});
