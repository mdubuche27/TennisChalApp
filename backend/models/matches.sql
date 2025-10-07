CREATE TABLE IF NOT EXISTS matches (
    id SERIAL PRIMARY KEY,
    tournament_id INT REFERENCES tournaments(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id),       -- utilisateur ayant créé le match
    player1_id INT REFERENCES players(id),  -- joueur n°1
    player2_id INT REFERENCES players(id),  -- joueur n°2
    score VARCHAR(50),
    winner_id INT REFERENCES players(id),   -- vainqueur du match
    next_match_id INT REFERENCES matches(id), -- lien vers le match suivant
    position_in_next_match INT,             -- 1 ou 2 (place du vainqueur dans le match suivant)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);