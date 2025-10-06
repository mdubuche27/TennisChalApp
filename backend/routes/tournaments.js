import express from "express";
import { getTournamentsByMonth } from "../controllers/tournaments.js";

const router = express.Router();

router.get("/tournaments", getTournamentsByMonth);

// ✅ Export compatible ES modules
export default router;
