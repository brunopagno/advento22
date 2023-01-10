import { describe, expect, test } from "@jest/globals";
import {
  splitIntoCompartments,
  findCommonItem,
  calculatePriority,
  part1,
  part2,
} from "./day3";

describe("day3", () => {
  describe("splitIntoCompartments", () => {
    test("when an even string is given it splits in half", () => {
      expect(splitIntoCompartments("abcd")).toEqual([
        ["a", "b"],
        ["c", "d"],
      ]);
    });

    test("when an odd string is given it splits in half", () => {
      expect(splitIntoCompartments("abcde")).toEqual([
        ["a", "b"],
        ["c", "d", "e"],
      ]);
    });
  });

  describe("findCommonItem", () => {
    test("when given two sorted arrays it finds the common item", () => {
      expect(findCommonItem(["a", "b", "c"], ["b", "c", "d"])).toBe("b");
    });

    test("when given two without common items returns empty", () => {
      expect(findCommonItem(["a", "b", "c"], ["f", "g", "z"])).toBe("");
    });

    test("when given three sorted arrays it finds the common item", () => {
      expect(
        findCommonItem(["a", "b", "c"], ["c", "f", "o"], ["b", "c", "e"])
      ).toBe("c");
    });
  });

  describe("calculatePriority", () => {
    test("when given a it returns the priority", () => {
      expect(calculatePriority("a")).toBe(1);
    });
    test("when given z it returns the priority", () => {
      expect(calculatePriority("z")).toBe(26);
    });
    test("when given A it returns the priority", () => {
      expect(calculatePriority("A")).toBe(27);
    });
    test("when given Z it returns the priority", () => {
      expect(calculatePriority("Z")).toBe(52);
    });
  });

  const testInput = [
    "vJrwpWtwJgWrhcsFMMfFFhFp",
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
    "PmmdzqPrVvPwwTWBwg",
    "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
    "ttgJtRGJQctTZtZT",
    "CrZsJsPPZsGzwwsLwLmpwMDw",
  ];

  describe("part1", () => {
    test("when given the test input it solves it", () => {
      expect(part1(testInput)).toBe(157);
    });
  });

  describe("part2", () => {
    test("when given the test input it solves it", () => {
      expect(part2(testInput)).toBe(70);
    });
  });
});
