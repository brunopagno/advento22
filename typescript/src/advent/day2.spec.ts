import { describe, expect, test } from "@jest/globals";
import { score, Play, part1, part2 } from "./day2";

describe("Day 2", () => {
  describe("score", () => {
    test("when I play rock and opponent plays rock", () => {
      expect(score(Play.Rock, Play.Rock)).toBe(1 + 3);
    });
    test("when I play rock and opponent plays paper", () => {
      expect(score(Play.Rock, Play.Paper)).toBe(1);
    });
    test("when I play rock and opponent plays scissors", () => {
      expect(score(Play.Rock, Play.Scissors)).toBe(1 + 6);
    });

    test("when I play paper and opponent plays rock", () => {
      expect(score(Play.Paper, Play.Rock)).toBe(2 + 6);
    });
    test("when I play paper and opponent plays paper", () => {
      expect(score(Play.Paper, Play.Paper)).toBe(2 + 3);
    });
    test("when I play paper and opponent plays scissors", () => {
      expect(score(Play.Paper, Play.Scissors)).toBe(2);
    });

    test("when I play scissors and opponent plays rock", () => {
      expect(score(Play.Scissors, Play.Rock)).toBe(3);
    });
    test("when I play scissors and opponent plays paper", () => {
      expect(score(Play.Scissors, Play.Paper)).toBe(3 + 6);
    });
    test("when I play scissors and opponent plays scissors", () => {
      expect(score(Play.Scissors, Play.Scissors)).toBe(3 + 3);
    });
  });

  const testInput = ["A Y", "B X", "C Z"];

  describe("Part 1", () => {
    test("should return 3", () => {
      expect(part1(testInput)).toBe(15);
    });
  });

  describe("Part 2", () => {
    test("should return 3", () => {
      expect(part2(testInput)).toBe(12);
    });
  });
});
