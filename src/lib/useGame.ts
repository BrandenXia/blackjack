import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
  computerDecision,
  getHandValue,
  Hand,
  Rank,
  Suit,
} from "./blackjack.ts";
import type { Card } from "./blackjack.ts";

const initialDeck = () => {
  const deck: Card[] = [];
  for (const suit of Object.values(Suit)) {
    for (const rank of Object.values(Rank)) {
      deck.push({
        rank: rank,
        suit: suit,
      });
    }
  }
  for (let i = 0; i < deck.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export default function useGame() {
  const [deck, setDeck] = useState<Card[]>([]);
  const [player, setPlayer] = useState<Hand>({ cards: [], value: 0 });
  const [computer, setComputer] = useState<Hand>({ cards: [], value: 0 });
  const [playerTurn, setPlayerTurn] = useState(true);
  const [bust, setBust] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [restart, setRestart] = useState(false);

  const hit = useCallback(() => {
    const card = deck.pop();
    if (card) {
      setPlayer((prev) => {
        const cards = [...prev.cards, card];
        return { cards, value: getHandValue(cards) };
      });
    }
  }, [deck]);
  const stand = useCallback(() => {
    setPlayerTurn(false);
  }, []);

  useLayoutEffect(() => {
    setRestart(false);
    const deck = initialDeck();
    const playerCards = [deck.pop(), deck.pop()].filter(Boolean) as Card[];
    const computerCards = [deck.pop(), deck.pop()].filter(Boolean) as Card[];
    setPlayer({ cards: playerCards, value: getHandValue(playerCards) });
    setComputer({ cards: computerCards, value: getHandValue(computerCards) });
    setDeck(deck);
    setPlayerTurn(true);
    setBust(false);
    setGameOver(false);
    setWinner("");
  }, [restart]);

  useEffect(() => {
    if (player.value > 21) {
      setBust(true);
      setPlayerTurn(false);
      setGameOver(true);
    }
  }, [player.value]);

  const computerTurn = useCallback(async () => {
    if (!playerTurn && !gameOver) {
      let value = computer.value;
      const playerValue = player.value;
      const computerCards = computer.cards;
      while (computerDecision(value, playerValue, "aggressive")) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const card = deck.pop();
        if (card) {
          computerCards.push(card);
          value = getHandValue(computerCards);
          setComputer({
            cards: computerCards,
            value: getHandValue(computerCards),
          });
        }
      }
      setGameOver(true);
    }
  }, [
    playerTurn,
    gameOver,
    computer.value,
    computer.cards,
    player.value,
    deck,
  ]);

  useEffect(() => {
    computerTurn().then();
  }, [computerTurn]);

  useEffect(() => {
    if (gameOver) {
      if (player.value > 21) {
        setWinner("Computer");
      } else if (computer.value > 21) {
        setWinner("Player");
      } else if (player.value > computer.value) {
        setWinner("Player");
      } else if (player.value < computer.value) {
        setWinner("Computer");
      } else {
        setWinner("Tie");
      }
    }
  }, [computer.value, gameOver, player.value]);

  return {
    player,
    computer,
    playerTurn,
    hit,
    stand,
    bust,
    winner,
    restart: () => setRestart(true),
  };
}
