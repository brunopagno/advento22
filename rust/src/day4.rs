pub fn run() -> (Option<u32>, Option<u32>) {
    let input = include_str!("../data/day4.txt");
    (part1(input), part2(input))
}

fn part1(input: &str) -> Option<u32> {
    let mut total = 0;

    for line in input.split('\n') {
        let items: Vec<(i32, i32)> = line
            .split(',')
            .map(|set| {
                let pair: Vec<i32> = set
                    .split('-')
                    .collect::<Vec<&str>>()
                    .iter()
                    .map(|s| s.parse::<i32>().unwrap())
                    .collect();

                (pair[0], pair[1])
            })
            .collect();

        if contain(items[0], items[1]) {
            total += 1;
        }
    }

    return Some(total);
}

fn part2(input: &str) -> Option<u32> {
    let mut total = 0;

    for line in input.split('\n') {
        let items: Vec<(i32, i32)> = line
            .split(',')
            .map(|set| {
                let pair: Vec<i32> = set
                    .split('-')
                    .collect::<Vec<&str>>()
                    .iter()
                    .map(|s| s.parse::<i32>().unwrap())
                    .collect();

                (pair[0], pair[1])
            })
            .collect();

        if overlap(items[0], items[1]) {
            total += 1;
        }
    }

    return Some(total);
}

fn contain(a: (i32, i32), b: (i32, i32)) -> bool {
    return (a.0 <= b.0 && a.1 >= b.1) || (b.0 <= a.0 && b.1 >= a.1);
}

fn overlap(a: (i32, i32), b: (i32, i32)) -> bool {
    return (a.1 >= b.0 && a.0 <= b.1) || (b.1 <= a.0 && b.0 >= a.1);
}

#[cfg(test)]
mod t {
    use super::*;

    const TEST_INPUT: &'static str = "2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8";

    #[test]
    fn test_part1() {
        assert_eq!(2, part1(TEST_INPUT).unwrap());
    }

    #[test]
    fn test_part2() {
        assert_eq!(4, part2(TEST_INPUT).unwrap());
    }
}
