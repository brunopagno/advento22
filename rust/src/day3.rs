use core::cmp::Ordering;

pub fn run() -> (Option<u32>, Option<u32>) {
    let input = include_str!("../data/day3.txt");
    return (part1(input), part2(input));
}

const TINY_A: u32 = 'a' as u32;
const BIG_A: u32 = 'A' as u32;

#[derive(Debug)]
struct Backpack {
    items: Vec<u32>,
    index: usize,
}

fn part1(input: &str) -> Option<u32> {
    let mut total = 0;

    for line in input.split('\n') {
        let mut chars: Vec<u32> = line.chars().map(|c| c as u32).collect();
        let half = chars.len() / 2;
        let (comp_a, comp_b) = chars.split_at_mut(half);

        match find_common_item(&vec![comp_a.to_vec(), comp_b.to_vec()]) {
            Some(value) => total += value,
            None => println!("did not find the common item!"),
        }
    }

    return Some(total);
}

fn part2(input: &str) -> Option<u32> {
    let mut total = 0;

    let all_lines: Vec<&str> = input.split('\n').into_iter().collect();
    let amount = 3;
    for i in (0..all_lines.len()).step_by(amount) {
        let group = all_lines
            .iter()
            .skip(i)
            .take(amount)
            .map(|line| line.chars().map(|c| c as u32).collect())
            .collect();

        match find_common_item(&group) {
            Some(value) => total += value,
            None => println!("did not find the common item!"),
        }
    }

    return Some(total);
}

fn find_common_item(compartments_param: &Vec<Vec<u32>>) -> Option<u32> {
    let mut compartments: Vec<Backpack> = compartments_param
        .iter()
        .map(|c| {
            let mut items = c.to_vec();
            items.sort();
            return Backpack { items, index: 0 };
        })
        .collect();

    while compartments.iter().all(|c| c.index < c.items.len()) {
        let current_items: Vec<u32> = compartments.iter().map(|c| c.items[c.index]).collect();

        let all_items_equal = current_items
            .iter()
            .all(|i| i.cmp(&current_items[0]) == Ordering::Equal);

        if all_items_equal {
            return Some(calculate_priority(current_items[0]));
        }

        let min_value = current_items.iter().min().unwrap();

        for mut compartment in &mut compartments {
            if compartment.items[compartment.index] == *min_value {
                compartment.index += 1;
            }
        }
    }

    return None;
}

fn calculate_priority(value: u32) -> u32 {
    if value >= 97 && value <= 122 {
        return value - TINY_A + 1;
    } else {
        return value - BIG_A + 27;
    }
}

#[cfg(test)]
mod t {
    use super::*;

    const TEST_INPUT: &'static str = "vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw";

    #[test]
    fn test_part1() {
        assert_eq!(157, part1(TEST_INPUT).unwrap());
    }

    #[test]
    fn test_part2() {
        assert_eq!(70, part2(TEST_INPUT).unwrap());
    }

    #[test]
    fn test_find_common_item() {
        let items = vec![vec![97, 101, 113, 100, 98], vec![125, 99, 100, 108, 103]];
        assert_eq!(4, find_common_item(&items).unwrap());
    }

    #[test]
    fn test_not_find_common_item() {
        let items = vec![vec![99], vec![103]];
        assert_eq!(None, find_common_item(&items));
    }
}
