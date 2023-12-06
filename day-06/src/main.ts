import * as fs from 'fs';


function calculateWaysToWin(time: number, distance: number) {
  let totalWins = 0;
  for(let i = 0; i < time; i++) {
    const speed = i; // units per time unit
    const timeToTravel = time - i; // time units
    const distanceTraveled = speed * timeToTravel; // units
    if(distanceTraveled > distance) {
      totalWins++;
    }
  }
  return totalWins;
}

function part1(input: string) {
  const lines = input.split('\r\n');
  const parsed = lines.map((line) => 
    line
      .split(' ')
      .map((num) => parseInt(num, 10))
      .filter(num => !isNaN(num))
  ).filter(line => line.length > 0);

  const timeArr = parsed[0];
  const distanceArr = parsed[1];
  let result = 1;
  timeArr.forEach((time, index) => {
    const distance = distanceArr[index];
    const waysToWin = calculateWaysToWin(time, distance);
    result *= waysToWin;
  });
  console.log(result);
}

function part2(input: string) {
  const lines = input.split('\r\n');
  const parsed = lines.map((line) => 
    line
      .split(' ')
      .map((num) => parseInt(num, 10))
      .filter(num => !isNaN(num))
  ).filter(line => line.length > 0);

  const time = parseInt(parsed[0].join(''));
  const distance = parseInt(parsed[1].join(''));
  const waysToWin = calculateWaysToWin(time, distance);
  console.log(waysToWin);
}

function main() {
  const input = fs.readFileSync('./input.txt', 'utf8');
  part2(input);
}

main();
