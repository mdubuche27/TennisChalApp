import TennisService from "../services/tennis.js";

// ✅ On exporte une fonction nommée avec `export const`
export const getTournamentsByMonth = async (req, res) => {
  const { month, year } = req.query;

  if (!month || !year) {
    return res.status(400).json({ error: "Paramètres 'month' et 'year' requis." });
  }

  try {
    const tournaments = await TennisService.fetchAllTournaments(year);

    const result = [];

    if (Array.isArray(tournaments.data)) {
      for (const tournament of tournaments.data) {
        const date = new Date(tournament.date);
        const m = date.getMonth() + 1;
        const y = date.getFullYear();

        if (m === parseInt(month) && y === parseInt(year)) {
          result.push(tournament);
        }
      }
    } else {
      console.error("⚠️ La donnée retournée n'est pas un tableau :", tournaments.data);
      return res.status(500).json({ error: "Format inattendu de la réponse API." });
    }

    res.json(result);
  } catch (error) {
    console.error("Erreur TennisAPI :", error.message);
    res.status(500).json({ error: "Erreur lors de la récupération des tournois." });
  }
};
