pub fn run() -> (Option<u32>, Option<u32>) {
    let input = include_str!("../data/day1.txt");
    (part1(input), part2(input))
}

fn part1(input: &str) -> Option<u32> {
    let mut rucksacks = Vec::<u32>::new();
    let mut rucksack = Vec::<u32>::new();
    input.split('\n').for_each(|item| {
        if item.is_empty() {
            rucksacks.push(rucksack.iter().sum());
            rucksack.clear();
        } else {
            let calorie_value = item.parse().unwrap_or_default();
            rucksack.push(calorie_value);
        }
    });
    rucksacks.push(rucksack.iter().sum());

    match rucksacks.iter().max() {
        Some(max) => Some(*max),
        None => None,
    }
}

fn part2(input: &str) -> Option<u32> {
    let mut rucksacks = Vec::<u32>::new();
    let mut rucksack = Vec::<u32>::new();
    input.split('\n').for_each(|item| {
        if item.is_empty() {
            rucksacks.push(rucksack.iter().sum());
            rucksack.clear();
        } else {
            let calorie_value = item.parse().unwrap_or_default();
            rucksack.push(calorie_value);
        }
    });
    rucksacks.push(rucksack.iter().sum());

    rucksacks.sort_by(|a, b| b.cmp(a));
    return Some(rucksacks[0..3].iter().sum());
}

#[cfg(test)]
mod t {
    use super::*;

    const TEST_INPUT: &'static str = "1000,
2000
3000

4000

5000
6000

7000
8000
9000

10000";

    #[test]
    fn test_part1() {
        assert_eq!(24000, part1(TEST_INPUT).unwrap());
    }

    #[test]
    fn test_part2() {
        assert_eq!(45000, part2(TEST_INPUT).unwrap());
    }
}
