enum Rank {
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Ten = "10",
  Jack = "jack",
  Queen = "queen",
  King = "king",
  Ace = "ace",
}

enum Suit {
  Clubs = "clubs",
  Diamonds = "diamonds",
  Hearts = "hearts",
  Spades = "spades",
}

const VALUES: { [key in Rank]: number[] } = {
  [Rank.Two]: [2],
  [Rank.Three]: [3],
  [Rank.Four]: [4],
  [Rank.Five]: [5],
  [Rank.Six]: [6],
  [Rank.Seven]: [7],
  [Rank.Eight]: [8],
  [Rank.Nine]: [9],
  [Rank.Ten]: [10],
  [Rank.Jack]: [10],
  [Rank.Queen]: [10],
  [Rank.King]: [10],
  [Rank.Ace]: [1, 11],
};

type Card = {
  rank: Rank;
  suit: Suit;
};

type Hand = {
  cards: Card[];
  value: number;
};

const getHandValue = (cards: Card[]) => {
  let value = cards.reduce((acc, card) => {
    const values = VALUES[card.rank];
    return acc + values[0];
  }, 0);
  cards
    .filter((card) => card.rank === Rank.Ace)
    .forEach(() => {
      if (value + 10 <= 21) {
        value += 10;
      }
    });
  return value;
};

const computerDecision = (
  value: number,
  playerValue: number,
  playerBehavior: "aggressive" | "cautious",
) => {
  const aggressiveThreshold = 15;
  const cautiousThreshold = 17;
  const randomChance = Math.random();

  if (playerBehavior === "aggressive") {
    if (value < aggressiveThreshold) {
      return true;
    } else if (value >= aggressiveThreshold && value < playerValue) {
      return randomChance < 0.6;
    } else {
      return false;
    }
  } else {
    if (value < cautiousThreshold) {
      return true;
    } else if (value >= cautiousThreshold && value < playerValue) {
      return randomChance < 0.4;
    } else {
      return false;
    }
  }
};

export { Rank, Suit, getHandValue, computerDecision };
export type { Card, Hand };
