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

  const seedPairs: SeedRange[] = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seedPairs.push([seeds[i], seeds[i + 1]]);
  }

  let min = Number.POSITIVE_INFINITY;
  seedPairs.forEach(seedRange => {
    let seedStart = seedRange[0];
    let seedEnd = seedRange[0] + seedRange[1];
    let seedRanges: SeedRange[] = [];
    seedRanges.push([seedStart, seedEnd]);

    console.log(`----------------`);
    console.log(`Testing seed range ${seedStart} - ${seedEnd}`);
    let currentMap = 0;
    let currentMapLine = 0;
    let tempSeedRanges: SeedRange[] = [];
    lines.forEach(line => {
      currentMapLine++;
      if (line === '') {
        currentMap++;
        currentMapLine = 0;
        seedRanges.push(...tempSeedRanges);
        tempSeedRanges = [];
        return;
      }

      console.log();
      console.log(`Testing map ${currentMap} line ${currentMapLine}`);
      const ranges = line.split(' ').map((c) => parseInt(c));
      const sourceStart = ranges[1];
      const sourceEnd = ranges[1] + ranges[2];

      seedRanges.forEach((seedRange, index) => {
        const seedStart = seedRange[0];
        const seedEnd = seedRange[1];
        console.log(`#${index}: Testing seed range ${seedStart} - ${seedEnd} against source range ${sourceStart} - ${sourceEnd}`);

        if(seedStart <= sourceEnd && seedEnd >= sourceStart) {
          const newSeedStart = Math.max(seedStart, sourceStart);
          const newSeedEnd = Math.min(seedEnd, sourceEnd);
          console.log(`| Overlapping range ${newSeedStart} - ${newSeedEnd}`);
        
          const startOffset = Math.max(seedStart, sourceStart) - sourceStart;
          const endOffset = Math.min(seedEnd, sourceEnd) - sourceStart;

          const destStart = ranges[0] + startOffset;
          const destEnd = ranges[0] + endOffset;
          console.log(`| Destination range ${destStart} - ${destEnd}`);
          tempSeedRanges.push([destStart, destEnd]);

          if (seedStart < sourceStart) {
            console.log(`| Adding old seed range part ${seedStart} - ${sourceStart - 1}`);
            tempSeedRanges.push([seedStart, sourceStart - 1]);
          }

          if (seedEnd > sourceEnd) {
            console.log(`| Adding old seed range part ${sourceEnd + 1} - ${seedEnd}`);
            tempSeedRanges.push([sourceEnd + 1, seedEnd]);
          }

          seedRanges.splice(index, 1);
        }
      })
    });

    console.log(`After mapping`);
    console.log(seedRanges);

    seedRanges.forEach(seedRange => {
      min = Math.min(min, seedRange[0]);
    });
    console.log(`Min: ${min}`);
  });
  console.log(`Part 2: ${min}`);
}

function main() {
  const input = fs.readFileSync('./input_test.txt', 'utf8');
  part2(input);
}

main();
