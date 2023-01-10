import { describe, expect, test } from "@jest/globals";
import { setupCrates, part1, part2 } from "./day5";

describe("day5", () => {
  describe("setupCrates", () => {
    const input = ["ZN", "MCD", "P"];
    test("should return an array of crates", () => {
      expect(setupCrates(input)).toEqual([["Z", "N"], ["M", "C", "D"], ["P"]]);
    });
  });

  const testInput = [
    "ZN",
    "MCD",
    "P",
    "",
    "move 1 from 2 to 1",
    "move 3 from 1 to 3",
    "move 2 from 2 to 1",
    "move 1 from 1 to 2",
  ];

  describe("part1", () => {
    test("should solve for the test input", () => {
      expect(part1(testInput)).toBe("CMZ");
    });
  });

  describe("part2", () => {
    test("should solve for the test input", () => {
      expect(part2(testInput)).toBe("MCD");
    });
  });
});
