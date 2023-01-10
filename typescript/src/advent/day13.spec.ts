import { describe, expect, test } from "@jest/globals";
import { parse, compare, part1, part2 } from "./day13";

describe("Day 13", () => {
  describe("parse", () => {
    test("should parse the input", () => {
      expect(parse("[[1],[[1,2]]]")).toEqual([[1], [[1, 2]]]);
    });
  });

  describe("compare", () => {
    describe("when comparing two numbers", () => {
      test("should return the difference", () => {
        expect(compare(1, 2)).toBe(-1);
        expect(compare(2, 1)).toBe(1);
      });
    });

    describe("when comparing two packets", () => {
      test("and the first element is different, returns the difference between the numbers", () => {
        expect(compare([1], [2])).toBe(-1);
      });

      test("and the first element is the same, returns the difference between the second elements", () => {
        expect(compare([1, 2], [1, 3])).toBe(-1);
      });

      test("and the size of the packets is different, returns (-)1", () => {
        expect(compare([1, 2], [1])).toBe(1);
      });
    });

    describe("when comparing a number and a packet", () => {
      test("converts the number to a packet and compares", () => {
        expect(compare(1, [2])).toBe(-1);
      });
    });
  });

  const testInput = [
    "[1,1,3,1,1]",
    "[1,1,5,1,1]",
    "",
    "[[1],[2,3,4]]",
    "[[1],4]",
    "",
    "[9]",
    "[[8,7,6]]",
    "",
    "[[4,4],4,4]",
    "[[4,4],4,4,4]",
    "",
    "[7,7,7,7]",
    "[7,7,7]",
    "",
    "[]",
    "[3]",
    "",
    "[[[]]]",
    "[[]]",
    "",
    "[1,[2,[3,[4,[5,6,7]]]],8,9]",
    "[1,[2,[3,[4,[5,6,0]]]],8,9]",
  ];

  describe("part1", () => {
    test("should solve for test input", () => {
      expect(part1(testInput)).toBe(13);
    });
  });

  describe("part2", () => {
    test("should solve for test input", () => {
      expect(part2(testInput)).toBe(140);
    });
  });
});
