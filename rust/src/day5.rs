pub fn run() -> (Option<u32>, Option<u32>) {
    let input = include_str!("../data/day4.txt");
    (part1(input), part2(input))
}

fn part1(input: &str) -> Option<u32> {
    Some(0)
}

fn part2(input: &str) -> Option<u32> {
    Some(0)
}

#[cfg(test)]
mod t {
    use super::*;

    const TEST_INPUT: &'static str = "ZN
MCD
P

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2";

    #[test]
    fn test_part1() {
        assert_eq!(0, part1(TEST_INPUT).unwrap());
    }

    #[test]
    fn test_part2() {
        assert_eq!(0, part2(TEST_INPUT).unwrap());
    }
}
