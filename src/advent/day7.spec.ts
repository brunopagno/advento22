import { describe, expect, test } from "@jest/globals";
import { part1, part2 } from "./day7";

describe("day7", () => {
  const testInput = [
    "$ cd /",
    "$ ls",
    "dir a",
    "14848514 b.txt",
    "8504156 c.dat",
    "dir d",
    "$ cd a",
    "$ ls",
    "dir e",
    "29116 f",
    "2557 g",
    "62596 h.lst",
    "$ cd e",
    "$ ls",
    "584 i",
    "$ cd ..",
    "$ cd ..",
    "$ cd d",
    "$ ls",
    "4060174 j",
    "8033020 d.log",
    "5626152 d.ext",
    "7214296 k",
  ];

  describe("part1", () => {
    test("solves for test input", () => {
      expect(part1(testInput)).toBe(95437);
    });
  });

  describe("part2", () => {
    test("solves for test input", () => {
      expect(part2(testInput)).toBe(24933642);
    });
  });
});
