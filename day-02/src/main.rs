use std::{
    fs::File,
    io::{BufRead, BufReader},
};

fn part1() {
    let file = File::open("input.txt").unwrap();
    let reader = BufReader::new(file);

    let mut sum = 0;
    for line in reader.lines() {
        let line = line.unwrap();

        let game_split = line.split(":").collect::<Vec<&str>>();
        let game_number = game_split[0].split(" ").collect::<Vec<&str>>()[1];
        let sets = game_split[1].split(";").collect::<Vec<&str>>();

        let mut possible = true;
        for set in sets {
            if !is_set_possible(set) {
                possible = false;
                break;
            }
        }

        if possible {
            sum += game_number.parse::<i32>().unwrap();
        }
    }

    println!("Part 1: {}", sum);
}

fn is_set_possible(set: &str) -> bool {
    // 12 red cubes, 13 green cubes, and 14 blue cubes max

    let cubes = set.split(",").collect::<Vec<&str>>();

    for cube in cubes {
        let cube_split = cube.split(" ").collect::<Vec<&str>>();
        let amount = cube_split[1].parse::<i32>().unwrap();
        let color = cube_split[2];

        if (color == "red" && amount > 12)
            || (color == "green" && amount > 13)
            || (color == "blue" && amount > 14)
        {
            return false;
        }
    }

    true
}

fn part2() {
    let file = File::open("input.txt").unwrap();
    let reader = BufReader::new(file);

    let mut sum = 0;
    for line in reader.lines() {
        let line = line.unwrap();

        let game_split = line.split(":").collect::<Vec<&str>>();
        let sets = game_split[1].split(";").collect::<Vec<&str>>();
        let cubes = get_most_amount_of_cubes(sets);
        let power = cubes.red * cubes.green * cubes.blue;
        sum += power;
    }

    println!("Part 2: {}", sum);
}

#[derive(Debug)]
struct Cubes {
    red: u32,
    green: u32,
    blue: u32,
}

fn get_most_amount_of_cubes(sets: Vec<&str>) -> Cubes {
    let mut red = 1;
    let mut green = 1;
    let mut blue = 1;

    for set in sets {
        let cubes;
        if set.contains(",") {
            cubes = set.split(",").collect::<Vec<&str>>();
        } else {
            cubes = vec![set];
        }

        for cube in cubes {
            let cube_split = cube.split(" ").collect::<Vec<&str>>();
            let amount = cube_split[1].parse::<i32>().unwrap();
            let color = cube_split[2];

            if color == "red" && amount > red {
                red = amount;
            } else if color == "green" && amount > green {
                green = amount;
            } else if color == "blue" && amount > blue {
                blue = amount;
            }
        }
    }

    return Cubes {
        red: red as u32,
        green: green as u32,
        blue: blue as u32,
    };
}

fn main() {
    part1();
    part2();
}
