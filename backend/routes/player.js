// backend/routes/players.js
import express from 'express';
import pool from '../db.js';

const router = express.Router();

// renvoie jusqu’à 128 joueurs classés par rang
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, first_name, last_name, nationality, ranking FROM players ORDER BY ranking LIMIT 128'
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des joueurs' });
  }
});

export default router;
