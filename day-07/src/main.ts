import fs from 'fs';

// strongest to weakest:
//
// Five of a kind (AAAAA) 7
// Four of a kind (AA8AA) 6
// Full house (AAABB) 5
// Three of a kind (TTT98) 4
// Two pair (AABB?) 3
// One pair (A??A?) 2
// High card (12345) 1

function getValueOfCard(card: string): number {
  switch(card) {
    case "A":
      return 14;
    case "K":
      return 13;
    case "Q":
      return 12;
    case "J":
      return 11;
    case "T":
      return 10;
  }

  return parseInt(card);
}

function isFiveOfAKind(hand: string): number | boolean {
  const first = hand[0];

  let score = getValueOfCard(first) * (length);

  for(let i = 1; i < hand.length; i++) {
    if(hand[i] != first) return false;
    score += getValueOfCard(hand[i]) * (length - i)
  }

  return score;
}

function isFourOfAKind(hand: string): number | boolean {
  let found = false;
  let score = 0;

  return found ? score : false;
}

function isFullHouse(hand: string): boolean {
  return false;
}

function isThreeOfAKind(hand: string): string | boolean {
  return false;
}

function isTwoPair(hand: string): string[] | boolean {
  return false;
}

function isOnePair(hand: string): string | boolean {
  return false;
}

function isHighCard(hand: string): boolean {
  return false;
}

function part1(input: string) {
  const bids = input
    .split("\n")
    .filter(line => line.length > 0)
    .map(line => line.split(" "));
  
  const scores: number[] = [];

  bids.forEach((bid) => {
    const hand = bid[0];
    console.log("Hand: ", hand);
    console.log("Five of a kind: ", isFiveOfAKind(hand));
  });
}

function main() {
  const input = fs.readFileSync('./input_test.txt', 'utf8');
  part1(input);
}

main();
