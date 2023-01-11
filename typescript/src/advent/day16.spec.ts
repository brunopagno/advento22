import { describe, expect, test } from "@jest/globals";
import { releasePressure, nextValveGreedy, parse, part1, part2 } from "./day16";

describe("Day 16", () => {
  describe("parse", () => {
    test("should parse the input", () => {
      const input = [
        "Valve AA has flow rate=1; tunnels lead to valves BB, CC",
        "Valve BB has flow rate=40; tunnels lead to valves AA",
        "Valve CC has flow rate=2; tunnels lead to valves BB",
      ];
      expect(parse(input)).toEqual([
        {
          name: "AA",
          rate: 1,
          open: false,
          tunnels: [
            expect.objectContaining({
              name: "BB",
            }),
            expect.objectContaining({
              name: "CC",
            }),
          ],
        },
        {
          name: "BB",
          rate: 40,
          open: false,
          tunnels: [
            expect.objectContaining({
              name: "AA",
            }),
          ],
        },
        {
          name: "CC",
          rate: 2,
          open: false,
          tunnels: [
            expect.objectContaining({
              name: "BB",
            }),
          ],
        },
      ]);
    });
  });

  describe("releasePressure", () => {
    test("should return the total value of the open valves", () => {
      const valves = [
        {
          name: "AA",
          rate: 1,
          open: false,
          tunnels: [],
        },
        {
          name: "BB",
          rate: 40,
          open: true,
          tunnels: [],
        },
        {
          name: "CC",
          rate: 2,
          open: true,
          tunnels: [],
        },
      ];
      expect(releasePressure(valves)).toEqual(42);
    });
  });

  const testInput = [
    "Valve AA has flow rate=0; tunnels lead to valves DD, II, BB",
    "Valve BB has flow rate=13; tunnels lead to valves CC, AA",
    "Valve CC has flow rate=2; tunnels lead to valves DD, BB",
    "Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE",
    "Valve EE has flow rate=3; tunnels lead to valves FF, DD",
    "Valve FF has flow rate=0; tunnels lead to valves EE, GG",
    "Valve GG has flow rate=0; tunnels lead to valves FF, HH",
    "Valve HH has flow rate=22; tunnel leads to valve GG",
    "Valve II has flow rate=0; tunnels lead to valves AA, JJ",
    "Valve JJ has flow rate=21; tunnel leads to valve II",
  ];

  describe("part1", () => {
    test("should solve for test input", () => {
      expect(part1(testInput)).toBe(1651);
    });
  });

  describe("part2", () => {
    test("should solve for test input", () => {
      expect(part2(testInput)).toBe(0);
    });
  });
});
