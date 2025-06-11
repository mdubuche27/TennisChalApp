const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = 5000;

app.get("/api/matches", async (req, res) => {
  try {
    const response = await axios.get("https://tennisapi.dev/api/v2/matches", {
      headers: {
        "X-Auth-Token": process.env.TENNIS_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Erreur TennisAPI :", error.message);
    res.status(500).json({ error: "Erreur TennisAPI" });
  }
});

app.listen(PORT, () => console.log(`Serveur backend sur http://localhost:${PORT}`));
