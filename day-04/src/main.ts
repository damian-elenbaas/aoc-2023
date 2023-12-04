import * as fs from 'fs';

interface Card {
  winningNumbers: number[];
  givenNumbers: number[];
  copies: number;
}

function main() {
  const input = fs.readFileSync('./input.txt', 'utf8');
  part1(input);
  part2(input);
}

function part1(input: string) {
  let sum = 0;
  input.split('\r\n').forEach((card) => {
    if(card === '') return;

    const cardSplit = card.split(':');
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

  console.log(`Part 1: ${sum}`);
}

function part2(input: string) {
  let cards: Card[] = [];
  input.split('\r\n').forEach((card) => {
    if(card === '') return;

    const cardSplit = card.split(':');
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

    cards.push({
      winningNumbers,
      givenNumbers,
      copies: 1
    });
  });

  cards.forEach((card, i) => {
    let count = 0;

    card.givenNumbers.forEach((n) => {
      if(card.winningNumbers.includes(n)) count++;
    });

    for(let x = 1; x <= count; x++) {
      let nextCard = cards[i + x];
      if(!nextCard) break;

      nextCard.copies += card.copies;
    }
  });

  let totalCopies = 0;
  cards.forEach((card) => {
    totalCopies += card.copies;
  });

  console.log(`Part 1: ${totalCopies}`);
}

main();
