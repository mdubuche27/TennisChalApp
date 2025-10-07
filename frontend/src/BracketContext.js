// frontend/src/BracketContext.js
import React, { createContext, useState } from 'react';

export const BracketContext = createContext();

export function BracketProvider({ children }) {
  const [rounds, setRounds] = useState([]);

  // Met à jour un vainqueur et prépare la ronde suivante si besoin
  const setWinner = (roundIndex, matchIndex, player) => {
    setRounds((prev) => {
      const newRounds = prev.map((r) => r.map((m) => ({ ...m })));
      newRounds[roundIndex][matchIndex].winner = player;

      // créer la prochaine ronde quand toutes les paires ont un vainqueur
      if (
        newRounds[roundIndex].every((m) => m.winner) &&
        !newRounds[roundIndex + 1]
      ) {
        const winners = newRounds[roundIndex].map((m) => m.winner);
        const nextRound = [];
        for (let i = 0; i < winners.length; i += 2) {
          nextRound.push({ players: [winners[i], winners[i + 1]], winner: null });
        }
        newRounds.push(nextRound);
      }
      return newRounds;
    });
  };

  return (
    <BracketContext.Provider value={{ rounds, setRounds, setWinner }}>
      {children}
    </BracketContext.Provider>
  );
}
