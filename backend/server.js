const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const tournamentsRoutes = require("./routes/tournaments");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Pour parser les JSON envoyés en POST

// Routes
app.use("/api/tournaments", tournamentsRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API Tennis en ligne ✅");
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});