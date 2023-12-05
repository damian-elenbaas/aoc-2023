import * as fs from 'fs';

function part1(input: string) {
  const lines = input.split('\r\n');
  const seeds: number[] = lines[0].split(' ').map((c) => parseInt(c));
  lines.shift();
  lines.shift();

  let max = Number.MAX_VALUE;
  seeds.forEach(seed => {
    let currentMap = 0;
    let foundRange = false;
    lines.forEach((line) => {
      if (line === '') {
        currentMap++;
        foundRange = false;
        return;
      }

      const ranges = line.split(' ').map((c) => parseInt(c));
      if(foundRange === false && ranges[1] <= seed && seed <= ranges[1] + ranges[2]) {
        const index = seed - ranges[1];
        const newSeed = ranges[0] + index;
        seed = newSeed;
        foundRange = true;
      }
    })
    max = Math.min(max, seed);
  });

  console.log(`Part 1: ${max}`);
}

function main() {
  const input = fs.readFileSync('./input.txt', 'utf8');
  part1(input);
}

main();
