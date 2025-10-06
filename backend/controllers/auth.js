import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

// Inscription d’un nouvel utilisateur
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Champs manquants" });
  }
  try {
    // Vérifier l’unicité du nom d’utilisateur et de l’e‑mail
    const existing = await pool.query(
      "SELECT id FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );
    if (existing.rowCount > 0) {
      return res.status(409).json({ error: "Email ou nom d’utilisateur déjà utilisé" });
    }
    // Hachage du mot de passe
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const result = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, passwordHash]
    );
    const user = result.rows[0];
    // Génération du token JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION || "1d" }
    );
    res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de l’inscription" });
  }
};

// Connexion d’un utilisateur existant
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email et mot de passe requis" });
  }
  try {
    // Récupérer l’utilisateur via l’email
    const result = await pool.query(
      "SELECT id, username, email, password_hash FROM users WHERE email = $1",
      [email]
    );
    if (result.rowCount === 0) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }
    const user = result.rows[0];
    // Vérifier le mot de passe
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION || "1d" }
    );
    delete user.password_hash;
    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
};
