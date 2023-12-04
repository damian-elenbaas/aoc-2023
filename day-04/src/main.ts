import * as fs from 'fs';

interface Card {
  winningNumbers: number[];
  givenNumbers: number[];
}

function main() {
  const input = fs.readFileSync('./input.txt', 'utf8');
  part1(input);
}

function part1(input: string) {
  let sum = 0;
  input.split('\r\n').forEach((card) => {
    if(card === '') return;

    const cardSplit = card.split(':');
    const game = cardSplit[0];
    const cardNumbers = cardSplit[1].split('|');
    const winningNumbers = cardNumbers[0]
      .trim()
      .split(' ')
      .map((n) => parseInt(n))
      .filter((n) => !isNaN(n));
    const givenNumbers = cardNumbers[1]
      .trim()
      .split(' ')
      .map((n) => parseInt(n))
      .filter((n) => !isNaN(n));

    let count = 0;
    givenNumbers.forEach((n) => {
      if(winningNumbers.includes(n)) count++;
    });

    let score = (count == 0) ? 0 : 1;
    score = score * Math.pow(2, count - 1);
    sum += score;
  });

  console.log(sum);
}

main();
