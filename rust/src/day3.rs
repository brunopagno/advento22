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

        comp_a.sort();
        comp_b.sort();

        let mut backpack_a = Backpack {
            items: comp_a.to_vec(),
            index: 0,
        };
        let mut backpack_b = Backpack {
            items: comp_b.to_vec(),
            index: 0,
        };

        while backpack_a.index <= backpack_a.items.len() || backpack_b.index <= backpack_b.items.len()
        {
            let comparison =
                (backpack_a.items[backpack_a.index]).cmp(&(backpack_b.items[backpack_b.index]));

            match comparison {
                Ordering::Equal => {
                    total += calculate_priority(backpack_a.items[backpack_a.index]);
                    break;
                }
                Ordering::Less => backpack_a.index += 1,
                Ordering::Greater => backpack_b.index += 1,
            }
        }
    }

    return Some(total);
}

fn part2(_input: &str) -> Option<u32> {
    return Some(0);
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
}
