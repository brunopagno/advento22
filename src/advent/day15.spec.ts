import { describe, expect, test } from "@jest/globals";
import { parse, distanceBetween, part1, part2 } from "./day15";

describe("Day 15", () => {
  describe("parse", () => {
    test("parses the input as expected", () => {
      expect(
        parse([
          "Sensor at x=2, y=18: closest beacon is at x=-2, y=15",
          "Sensor at x=9, y=16: closest beacon is at x=10, y=16",
        ])
      ).toEqual([
        [
          { x: 2, y: 18 },
          { x: -2, y: 15 },
        ],
        [
          { x: 9, y: 16 },
          { x: 10, y: 16 },
        ],
      ]);
    });
  });

  describe("distanceBetween", () => {
    test("calculates the distance between two points", () => {
      expect(distanceBetween({ x: 2, y: 18 }, { x: -2, y: 15 })).toBe(7);
    });
  });

  const testInput = [
    "Sensor at x=2, y=18: closest beacon is at x=-2, y=15",
    "Sensor at x=9, y=16: closest beacon is at x=10, y=16",
    "Sensor at x=13, y=2: closest beacon is at x=15, y=3",
    "Sensor at x=12, y=14: closest beacon is at x=10, y=16",
    "Sensor at x=10, y=20: closest beacon is at x=10, y=16",
    "Sensor at x=14, y=17: closest beacon is at x=10, y=16",
    "Sensor at x=8, y=7: closest beacon is at x=2, y=10",
    "Sensor at x=2, y=0: closest beacon is at x=2, y=10",
    "Sensor at x=0, y=11: closest beacon is at x=2, y=10",
    "Sensor at x=20, y=14: closest beacon is at x=25, y=17",
    "Sensor at x=17, y=20: closest beacon is at x=21, y=22",
    "Sensor at x=16, y=7: closest beacon is at x=15, y=3",
    "Sensor at x=14, y=3: closest beacon is at x=15, y=3",
    "Sensor at x=20, y=1: closest beacon is at x=15, y=3",
  ];

  describe("part1", () => {
    test("should solve for test input", () => {
      expect(part1(testInput, 10)).toBe(26);
    });
  });

  describe("part2", () => {
    test("should solve for test input", () => {
      expect(part2(testInput)).toBe(0);
    });
  });
});
