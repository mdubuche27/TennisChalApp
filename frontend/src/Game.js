// frontend/src/Game.js
import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BracketContext } from './BracketContext';

function Game() {
  const { rounds, setRounds, setWinner } = useContext(BracketContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // charge les 128 joueurs et initialise la première ronde
  useEffect(() => {
    if (rounds.length > 0) return; // éviter de recharger si le context contient déjà des données
    const fetchPlayers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/players');
        const data = await res.json();
        if (data.length >= 128) {
          const firstRound = [];
          for (let i = 0; i < 128; i += 2) {
            firstRound.push({
              players: [data[i], data[i + 1]],
              winner: null,
            });
          }
          setRounds([firstRound]);
        } else {
          setError('Il manque des joueurs (128 requis)');
        }
      } catch {
        setError('Erreur lors du chargement des joueurs');
      }
    };
    fetchPlayers();
  }, [rounds, setRounds]);

  if (error) return <p>{error}</p>;
  if (rounds.length === 0) return <p>Chargement…</p>;

  return (
    <div>
      <h2>Tableau de 128 joueurs</h2>
      {rounds.map((round, rIndex) => (
        <div key={rIndex} style={{ marginBottom: '20px' }}>
          <h3>Ronde {rIndex + 1}</h3>
          {round.map((match, mIndex) => (
            <div key={mIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              {/* boutons de sélection rapide */}
              {match.players.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setWinner(rIndex, mIndex, p)}
                  disabled={match.winner !== null}
                  style={{
                    marginRight: '10px',
                    backgroundColor:
                      match.winner && match.winner.id === p.id ? '#8fbc8f' : '',
                  }}
                >
                  {p.first_name} {p.last_name}
                </button>
              ))}
              {/* bouton pour accéder à la page de duel */}
              <button
                onClick={() => navigate(`/duel/${rIndex}/${mIndex}`)}
                style={{ marginLeft: '10px' }}
              >
                Duel
              </button>
              {match.winner && (
                <span style={{ marginLeft: '10px' }}>
                  Vainqueur : {match.winner.first_name} {match.winner.last_name}
                </span>
              )}
            </div>
          ))}
        </div>
      ))}
      {/* champion final */}
      {rounds.length === 7 &&
        rounds[6][0].winner && (
          <h2>
            Champion : {rounds[6][0].winner.first_name} {rounds[6][0].winner.last_name}
          </h2>
        )}
    </div>
  );
}

export default Game;
