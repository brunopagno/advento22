use std::env;

mod day1;

fn main() {
    let target = env::args().nth(1).unwrap_or_default();
    
    let result = match target.as_str() {
        "1" => day1::run(),
        _ => panic!("please add the day as parameter")
    };

    println!("{:?}", result);
}
