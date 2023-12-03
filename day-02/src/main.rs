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

    println!("Sum: {}", sum);
}

fn is_set_possible(set: &str) -> bool {
    // 12 red cubes, 13 green cubes, and 14 blue cubes max
    
    let cubes = set.split(",").collect::<Vec<&str>>();

    for cube in cubes {
        let cube_split = cube.split(" ").collect::<Vec<&str>>();
        let amount = cube_split[1].parse::<i32>().unwrap();
        let color = cube_split[2];

        if (color == "red"   && amount > 12) || 
           (color == "green" && amount > 13) ||
           (color == "blue"  && amount > 14) {
            return false
        }     
    }

    true
}

fn main() {
    part1();
}
