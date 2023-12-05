import * as fs from 'fs';

function part1(input: string) {
  const lines = input.split('\r\n');
  const seeds: number[] = lines[0].split(' ').map((c) => parseInt(c));
  lines.shift();
  lines.shift();

  let min = Number.MAX_VALUE;
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
      if (foundRange === false && ranges[1] <= seed && seed <= ranges[1] + ranges[2]) {
        const index = seed - ranges[1];
        const newSeed = ranges[0] + index;
        seed = newSeed;
        foundRange = true;
      }
    })
    min = Math.min(min, seed);
  });

  console.log(`Part 1: ${min}`);
}

type SeedRange = number[];

function part2(input: string) {
  const lines = input.split('\r\n');
  const seeds: SeedRange = lines[0].split(' ').map((c) => parseInt(c));
  lines.shift();
  lines.shift();

  const seedRanges: SeedRange[] = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push([seeds[i], seeds[i + 1]]);
  }

  let min = Number.POSITIVE_INFINITY;
  seedRanges.forEach(seedRange => {
    const seedStart = seedRange[0];
    const seedEnd = seedRange[0] + seedRange[1];
    let seedRanges: SeedRange[] = [[seedStart, seedEnd]];

    let tempRanges: SeedRange[] = [];
    console.log(`Start seed range: ${seedStart} - ${seedEnd}`);
    lines.forEach(line => {
      if(line === '') {
        seedRanges = seedRanges.concat(tempRanges);
        tempRanges = [];
        console.log('New map');
        return;
      }

      const ranges = line.split(' ').map((c) => parseInt(c));
      const sourceStart = ranges[1];
      const sourceEnd = ranges[1] + ranges[2];
      console.log('Current ranges');
      console.log(seedRanges);
      for(let i = 0; i < seedRanges.length; i++) {
        const seedRange = seedRanges[i];
        const seedStart = seedRange[0];
        const seedEnd = seedRange[1];
        console.log(`Seed range: ${seedStart} - ${seedEnd}`);
        console.log(`Source range: ${sourceStart} - ${sourceEnd}`);
        if(seedStart <= sourceEnd && seedEnd >= sourceStart) {
          const newStart = Math.max(seedStart, sourceStart);
          const newEnd = Math.min(seedEnd, sourceEnd);
          const startOffset = newStart - sourceStart;
          const endOffset = newEnd - sourceStart;
          const destStart = ranges[0] + startOffset;
          const destEnd = ranges[0] + endOffset;
          console.log(`New range: ${destStart} - ${destEnd}`);
          tempRanges.push([destStart, destEnd]);

          if(seedStart < newStart) {
            tempRanges.push([seedStart, newStart - 1]);
          }

          if(seedEnd > newEnd) {
            tempRanges.push([newEnd + 1, seedEnd]);
          }

          seedRanges.splice(i, 1);
        }
      };
    });
    seedRanges.forEach(seedRange => {
      min = Math.min(min, seedRange[0]);
    });
  });
  console.log(`Part 2: ${min}`);
}

function main() {
  const input = fs.readFileSync('./input_test.txt', 'utf8');
  part2(input);
}

main();
