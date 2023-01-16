use std::env;

mod day1;
mod day2;
mod day3;
mod day4;

fn main() {
    let target = env::args().nth(1).unwrap_or_default();

    let result = match target.as_str() {
        "1" => day1::run(),
        "2" => day2::run(),
        "3" => day3::run(),
        "4" => day4::run(),
        _ => panic!("please add the day as parameter"),
    };

    println!("{:?}", result);
}
