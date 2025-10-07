// frontend/src/Duel.js
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BracketContext } from './BracketContext';

function Duel() {
  const { roundIndex, matchIndex } = useParams();
  const { rounds, setWinner } = useContext(BracketContext);
  const navigate = useNavigate();

  const r = parseInt(roundIndex, 10);
  const m = parseInt(matchIndex, 10);

  const match = rounds[r]?.[m];
  if (!match) {
    return <p>Match introuvable</p>;
  }

  const selectWinner = (player) => {
    setWinner(r, m, player);
    navigate('/game'); // revenir au tableau principal
  };

  return (
    <div>
      <h2>Duel – Ronde {r + 1}</h2>
      <p>Sélectionnez le gagnant :</p>
      {match.players.map((p) => (
        <button
          key={p.id}
          onClick={() => selectWinner(p)}
          style={{ marginRight: '10px' }}
        >
          {p.first_name} {p.last_name}
        </button>
      ))}
    </div>
  );
}

export default Duel;
