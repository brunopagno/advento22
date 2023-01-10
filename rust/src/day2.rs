pub fn run() -> (Option<u32>, Option<u32>) {
    let input = include_str!("../data/day2.txt");
    return (part1(input), part2(input));
}

const ROCK: u32 = 0;
const PAPER: u32 = 1;
const SCISSORS: u32 = 2;

const CHAR_X: u32 = 'X' as u32;
const CHAR_A: u32 = 'A' as u32;

fn part1(input: &str) -> Option<u32> {
    let mut total_score = 0;

    for line in input.split('\n') {
        let chars = line.chars().collect::<Vec<char>>();
        total_score += score((chars[2] as u32) - CHAR_X, (chars[0] as u32) - CHAR_A);
    }

    return Some(total_score);
}

fn part2(input: &str) -> Option<u32> {
    let mut total_score = 0;

    for line in input.split('\n') {
        let chars = line.chars().collect::<Vec<char>>();

        let op = (chars[0] as u32) - CHAR_A;
        let result = chars[2];

        let me = match result {
            'X' => (op + 3 - 1) % 3,
            'Z' => (op + 1) % 3,
            _ => op,
        };

        total_score += score(me, op);
    }

    return Some(total_score);
}

fn score(me: u32, op: u32) -> u32 {
    let mut score = 0;

    if op == me {
        score += 3;
    } else if (op + 1) % 3 == me {
        score += 6;
    }

    score += match me {
        ROCK => 1,
        PAPER => 2,
        SCISSORS => 3,
        _ => 0,
    };

    return score;
}

#[cfg(test)]
mod t {
    use super::*;

    const TEST_INPUT: &'static str = "A Y
B X
C Z";

    #[test]
    fn test_part1() {
        assert_eq!(15, part1(TEST_INPUT).unwrap());
    }

    #[test]
    fn test_part2() {
        assert_eq!(12, part2(TEST_INPUT).unwrap());
    }

    #[test]
    fn test_score_rock_rock() {
        assert_eq!(4, score(ROCK, ROCK));
    }
    #[test]
    fn test_score_rock_paper() {
        assert_eq!(1, score(ROCK, PAPER));
    }
    #[test]
    fn test_score_rock_scissors() {
        assert_eq!(7, score(ROCK, SCISSORS));
    }
    #[test]
    fn test_score_paper_rock() {
        assert_eq!(8, score(PAPER, ROCK));
    }
    #[test]
    fn test_score_paper_paper() {
        assert_eq!(5, score(PAPER, PAPER));
    }
    #[test]
    fn test_score_paper_scissors() {
        assert_eq!(2, score(PAPER, SCISSORS));
    }
    #[test]
    fn test_score_scissors_rock() {
        assert_eq!(3, score(SCISSORS, ROCK));
    }
    #[test]
    fn test_score_scissors_paper() {
        assert_eq!(9, score(SCISSORS, PAPER));
    }
    #[test]
    fn test_score_scissors_scissors() {
        assert_eq!(6, score(SCISSORS, SCISSORS));
    }
}
