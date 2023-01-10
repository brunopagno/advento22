import { describe, expect, test } from "@jest/globals";
import { op, tick, part1, part2 } from "./day10";

describe("Day 10", () => {
  describe("op", () => {
    test("addx", () => {
      expect(op({ cycle: 0, X: 0 }, "addx 2")).toEqual({ cycle: 2, X: 2 });
    });
    test("noop", () => {
      expect(op({ cycle: 0, X: 0 }, "noop")).toEqual({ cycle: 1, X: 0 });
    });
  });

  describe("tick", () => {
    test("when sprite is in range", () => {
      expect(tick({ screen: [[".", "#"]], width: 10, cycle: 2, x: 1 })).toEqual(
        expect.objectContaining({
          screen: [[".", "#", "#"]],
          cycle: 3,
        })
      );
    });
    test("when sprite is out of range", () => {
      expect(
        tick({ screen: [[".", "#"]], width: 10, cycle: 2, x: 12 })
      ).toEqual(
        expect.objectContaining({
          screen: [[".", "#", "."]],
          cycle: 3,
        })
      );
    });

    test("when printing on the second row", () => {
      expect(
        tick({
          screen: [[".", "#", "."], ["."]],
          width: 3,
          cycle: 4,
          x: 1,
        })
      ).toEqual(
        expect.objectContaining({
          screen: [
            [".", "#", "."],
            [".", "#"],
          ],
          cycle: 5,
        })
      );
    });
  });

  const testInput = [
    "addx 15",
    "addx -11",
    "addx 6",
    "addx -3",
    "addx 5",
    "addx -1",
    "addx -8",
    "addx 13",
    "addx 4",
    "noop",
    "addx -1",
    "addx 5",
    "addx -1",
    "addx 5",
    "addx -1",
    "addx 5",
    "addx -1",
    "addx 5",
    "addx -1",
    "addx -35",
    "addx 1",
    "addx 24",
    "addx -19",
    "addx 1",
    "addx 16",
    "addx -11",
    "noop",
    "noop",
    "addx 21",
    "addx -15",
    "noop",
    "noop",
    "addx -3",
    "addx 9",
    "addx 1",
    "addx -3",
    "addx 8",
    "addx 1",
    "addx 5",
    "noop",
    "noop",
    "noop",
    "noop",
    "noop",
    "addx -36",
    "noop",
    "addx 1",
    "addx 7",
    "noop",
    "noop",
    "noop",
    "addx 2",
    "addx 6",
    "noop",
    "noop",
    "noop",
    "noop",
    "noop",
    "addx 1",
    "noop",
    "noop",
    "addx 7",
    "addx 1",
    "noop",
    "addx -13",
    "addx 13",
    "addx 7",
    "noop",
    "addx 1",
    "addx -33",
    "noop",
    "noop",
    "noop",
    "addx 2",
    "noop",
    "noop",
    "noop",
    "addx 8",
    "noop",
    "addx -1",
    "addx 2",
    "addx 1",
    "noop",
    "addx 17",
    "addx -9",
    "addx 1",
    "addx 1",
    "addx -3",
    "addx 11",
    "noop",
    "noop",
    "addx 1",
    "noop",
    "addx 1",
    "noop",
    "noop",
    "addx -13",
    "addx -19",
    "addx 1",
    "addx 3",
    "addx 26",
    "addx -30",
    "addx 12",
    "addx -1",
    "addx 3",
    "addx 1",
    "noop",
    "noop",
    "noop",
    "addx -9",
    "addx 18",
    "addx 1",
    "addx 2",
    "noop",
    "noop",
    "addx 9",
    "noop",
    "noop",
    "noop",
    "addx -1",
    "addx 2",
    "addx -37",
    "addx 1",
    "addx 3",
    "noop",
    "addx 15",
    "addx -21",
    "addx 22",
    "addx -6",
    "addx 1",
    "noop",
    "addx 2",
    "addx 1",
    "noop",
    "addx -10",
    "noop",
    "noop",
    "addx 20",
    "addx 1",
    "addx 2",
    "addx 2",
    "addx -6",
    "addx -11",
    "noop",
    "noop",
    "noop",
  ];

  test("part1", () => {
    expect(part1(testInput)).toBe(13140);
  });

  test("part2", () => {
    const result = `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`;
    expect(part2(testInput)).toBe(result);
  });
});
