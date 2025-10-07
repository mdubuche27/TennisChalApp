import  express from  "express" ;
import  cors from  "cors";
import  dotenv from "dotenv";

import tournamentsRoutes from "./routes/tournaments.js";
import  usersRouter from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import authenticateToken from "./middleware/auth.js";
import playersRouter from './routes/player.js';


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Pour parser les JSON envoyés en POST

// Routes
app.use("/api/auth", authRoutes);


app.use("/api/tournaments", tournamentsRoutes);
app.use("/api/users", authenticateToken, usersRouter);
app.use('/api/players', playersRouter);

// Health check
app.get("/", (req, res) => {
  res.send("API Tennis en ligne ✅");
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});