import { describe, expect, test } from "@jest/globals";
import { parse, findBoundaries, part1, part2 } from "./day14";

describe("Day 14", () => {
  describe("parse", () => {
    test("should parse the input", () => {
      const input = [
        "498,4 -> 498,6 -> 496,6",
        "503,4 -> 502,4 -> 502,9 -> 494,9",
      ];
      const expected = {
        494: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        495: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        496: [0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        497: [0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        498: [0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
        499: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        500: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        501: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        502: [0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        503: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      };
      expect(parse(input)).toEqual(expected);
    });
  });

  describe("findBoundaries", () => {
    test("should find the boundaries", () => {
      const input = [
        "498,4 -> 498,6 -> 496,6",
        "503,4 -> 502,4 -> 502,9 -> 494,9",
      ];
      expect(findBoundaries(input)).toEqual([494, 503, 9]);
    });
  });

  const testInput = [
    "498,4 -> 498,6 -> 496,6",
    "503,4 -> 502,4 -> 502,9 -> 494,9",
  ];

  describe("part1", () => {
    test("should solve for test input", () => {
      expect(part1(testInput)).toBe(24);
    });
  });

  describe("part2", () => {
    test("should solve for test input", () => {
      expect(part2(testInput)).toBe(0);
    });
  });
});
