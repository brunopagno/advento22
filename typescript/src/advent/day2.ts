export function solve(input: Array<string>): [number, number] {
  return [part1(input), part2(input)];
}

const charA = "A".charCodeAt(0);
const charX = "X".charCodeAt(0);

export function part1(input: Array<string>): number {
  let totalScore = 0;
  for (const line of input) {
    totalScore += score(line.charCodeAt(2) - charX, line.charCodeAt(0) - charA);
  }
  return totalScore;
}

export function part2(input: Array<string>): number {
  let totalScore = 0;
  for (const line of input) {
    let oppo = line.charCodeAt(0) - charA;
    const result = line.charAt(2);

    let me = oppo;
    if (result == "X") {
      me = (oppo - 1 + 3) % 3;
    } else if (result == "Z") {
      me = (oppo + 1) % 3;
    }

    totalScore += score(me, oppo);
  }
  return totalScore;
}

export enum Play {
  Rock = 0,
  Paper = 1,
  Scissors = 2,
}

export function score(me: Play, oppo: Play): number {
  let score = 0;
  if (oppo == me) {
    score += 3;
  } else if ((oppo + 1) % 3 == me) {
    score += 6;
  }

  if (me == Play.Rock) {
    score += 1;
  } else if (me == Play.Paper) {
    score += 2;
  } else if (me == Play.Scissors) {
    score += 3;
  }

  return score;
}
