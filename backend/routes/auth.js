import express from "express";
import { register, login } from "../controllers/auth.js";

const router = express.Router();

// `POST /api/auth/register` : inscription
router.post("/register", register);
// `POST /api/auth/login` : connexion
router.post("/login", login);

export default router;
