import { Card } from "../lib/blackjack.ts";
import { motion } from "framer-motion";

export default function Cards({
  cards,
  hidden = false,
}: {
  cards: Card[];
  hidden?: boolean;
}) {
  return cards.map((card, i) =>
    hidden && i === cards.length - 1 ? (
      <motion.div
        key={i}
        className="h-72 w-48 rounded-lg bg-white shadow-lg"
        animate={{
          x: i * 20,
          rotate: i * 5,
          zIndex: i,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-neutral-content">
          <div className="text-5xl font-bold">?</div>
        </div>
      </motion.div>
    ) : (
      <motion.img
        key={i}
        src={`/cards/${card.rank}_of_${card.suit}.svg`}
        alt={`${card.rank} of ${card.suit}`}
        className="h-72 transform-gpu"
        animate={{
          x: i * 20,
          rotate: i * 5,
          zIndex: i,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      />
    ),
  );
}
