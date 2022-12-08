import { describe, expect, test } from "@jest/globals";
import { buildTreeFrom, sizeOf, part1, part2 } from "./day7";

describe("day7", () => {
  describe("buildTreeFrom", () => {
    test("should build a tree from a list of commands", () => {
      const input = [
        "$ cd /",
        "$ ls",
        "dir a",
        "dir aa",
        "1234 b.txt",
        "$ cd a",
        "$ ls",
        "4321 c.txt",
        "$ cd ..",
        "$ cd aa",
        "$ ls",
        "91824 d.txt",
      ];
      const tree = buildTreeFrom(input);
      expect(tree).toEqual(
        expect.objectContaining({
          name: "/",
          type: "folder",
          children: [
            {
              name: "a",
              type: "folder",
              children: [
                {
                  name: "c.txt",
                  type: "file",
                  size: 4321,
                  children: [],
                  parent: expect.any(Object),
                },
              ],
              size: 0,
              parent: expect.any(Object),
            },
            {
              name: "aa",
              type: "folder",
              children: [
                {
                  name: "d.txt",
                  type: "file",
                  size: 91824,
                  children: [],
                  parent: expect.any(Object),
                },
              ],
              size: 0,
              parent: expect.any(Object),
            },
            {
              name: "b.txt",
              type: "file",
              size: 1234,
              children: [],
              parent: expect.any(Object),
            },
          ],
        })
      );
    });
  });

  describe("sizeOf", () => {
    test("should return the size of a node", () => {
      const input = {
        name: "a",
        type: "folder" as const,
        children: [
          {
            name: "d",
            type: "folder" as const,
            children: [
              {
                name: "e.txt",
                type: "file" as const,
                children: [],
                size: 100,
              },
            ],
            size: 0,
          },
          {
            name: "b.txt",
            type: "file" as const,
            size: 1000,
            children: [],
          },
          {
            name: "c.txt",
            type: "file" as const,
            size: 10000,
            children: [],
          },
        ],
        size: 0,
      };

      expect(sizeOf(input)).toBe(11100);
    });
  });

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
