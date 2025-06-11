const express = require("express");
const router = express.Router();
const { getTournamentsByMonth } = require("../controllers/tournaments");

router.get("/", getTournamentsByMonth);

module.exports = router;