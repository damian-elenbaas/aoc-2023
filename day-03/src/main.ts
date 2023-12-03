import * as fs from 'fs';

interface Number {
  value: number;
  start: number;
  end: number;
  row: number;
}

interface Symbol {
  index: number;
  row: number;
  adjs?: Number[];
}

function main() {
  const input = fs.readFileSync('./input.txt', 'utf8');

  let numbers: Number[] = [];
  let symbols: Symbol[] = [];

  input.split('\r\n').forEach((line, i) => {
    let start = 0;
    let end = 0;
    let number = '';

    for (let j = 0; j < line.length; j++) {
      if (line[j] === '.' || isNaN(parseInt(line[j]))) {
        end = j - 1;
        if (number.length > 0) {
          numbers.push({
            value: parseInt(number),
            start: start,
            end: end,
            row: i
          });
          number = '';
        }
        start = j + 1;
        if (line[j] !== '.') {
          symbols.push({
            index: j,
            row: i
          });
        }
      } else {
        number += line[j];
      }
    }

    if (number.length > 0) {
      numbers.push({
        value: parseInt(number),
        start: start,
        end: end,
        row: i
      });
    }
  });

  part1(numbers, symbols);
  part2(symbols);
}

function part1(numbers: Number[], symbols: Symbol[]) {
  let sum = 0;
  numbers.forEach(number => {
    if (hasAdjacentSymbol(number, symbols)) {
      sum += number.value;
    }
  })
  console.log(`Part 1: ${sum}`);
}

function part2(symbols: Symbol[]) {
  let sum = 0;
  symbols.forEach(symbol => {
    if (symbol.adjs && symbol.adjs.length > 1) {
      let gearRatio = 1;
      for (let i = 0; i < symbol.adjs.length; i++) {
        gearRatio *= symbol.adjs[i].value;
      }
      sum += gearRatio;
    }
  });
  console.log(`Part 2: ${sum}`);
}

function hasAdjacentSymbol(number: Number, symbols: Symbol[]): boolean {
  let adjacentSymbol = false;

  for (let i = 0; i < symbols.length; i++) {
    if (
      symbols[i].row >= number.row - 1 &&
      symbols[i].row <= number.row + 1 &&
      symbols[i].index >= number.start - 1 &&
      symbols[i].index <= number.end + 1
    ) {
      adjacentSymbol = true;
      symbols[i].adjs = symbols[i].adjs || [];
      symbols[i].adjs?.push(number);
      break;
    }
  }

  return adjacentSymbol;
}

main();
