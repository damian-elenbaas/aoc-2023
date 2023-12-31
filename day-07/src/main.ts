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

function getValueOfHand(hand: string): number {
  let score = 0;
  for(let i = 0; i < hand.length; i++) {
    const card = hand[i];
    score += getValueOfCard(card) * Math.pow(100, (hand.length - i));
  }

  return score;
}

function isFiveOfAKind(hand: string): boolean {
  const first = hand[0];

  for(let i = 1; i < hand.length; i++) {
    if(hand[i] != first) return false;
  }

  return true;
}

function isFourOfAKind(hand: string): boolean {
  return false;
}

function isFullHouse(hand: string): boolean {
  return false;
}

function isThreeOfAKind(hand: string): boolean {
  return false;
}

function isTwoPair(hand: string): boolean {
  return false;
}

function isOnePair(hand: string): boolean {
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

  bids.forEach((bid) => {
    const hand = bid[0];
    const score = getValueOfHand(hand);
    bid.push(score.toString());
  });
}

function main() {
  // const input = fs.readFileSync('./input_test.txt', 'utf8');
  // part1(input);
  part1("AAQQA 2");
}

main();
