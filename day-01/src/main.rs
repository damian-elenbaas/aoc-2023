use std::{
    fs::File,
    io::{BufRead, BufReader},
};
use strum::EnumIter;
use strum::{Display, IntoEnumIterator};

fn part_01() {
    let file = File::open("input.txt").unwrap();
    let reader = BufReader::new(file);

    let mut sum: i32 = 0;
    for line in reader.lines() {
        let line = line.unwrap();
        let mut number: String = "".to_owned();
        for c in line.chars() {
            if c.is_numeric() {
                if number.len() == 2 {
                    number.pop();
                } else {
                    number.push_str(c.to_string().as_str());
                }
                number.push_str(c.to_string().as_str());
            }
        }
        sum += number.parse::<i32>().unwrap();
    }
    println!("Part one: {}", sum);
}

#[derive(Debug, EnumIter, Display)]
enum Number {
    Zero,
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
}

fn part_02() {
    let file = File::open("input.txt").unwrap();
    let reader = BufReader::new(file);

    let mut sum: i32 = 0;
    for line in reader.lines() {
        let line = line.unwrap();

        let mut spelled: String = "".to_owned();
        let mut number: String = "".to_owned();

        for c in line.chars() {
            if c.is_numeric() {
                add_number(&mut number, c.to_digit(10).unwrap() as i32);
            } else {
                spelled.push_str(c.to_string().as_str());
                let i = get_last_spelled_number(spelled.as_str());
                if i.is_some() {
                    add_number(&mut number, i.unwrap() as i32);
                }
            }
        }
        sum += number.parse::<i32>().unwrap();
    }
    println!("Part two: {}", sum);
}

fn add_number(number: &mut String, n: i32) {
    if number.len() == 2 {
        number.pop();
    } else {
        number.push_str(n.to_string().as_str());
    }
    number.push_str(n.to_string().as_str());
}

fn get_last_spelled_number(line: &str) -> Option<i32> {
    let mut line = line.to_owned();
    line = line.chars().rev().collect::<String>();

    let mut spelled: String = "".to_owned();
    for c in line.chars() {
        if c.is_numeric() {
            break;
        } else {
            spelled = c.to_string() + spelled.as_str();
        }

        let mut i = 0;
        for n in Number::iter() {
            let string_number = n.to_string().to_lowercase();
            if spelled == string_number.as_str() {
                return Some(i);
            }
            i += 1;
        }
    }

    None
}

fn main() {
    part_01();
    part_02();
}
