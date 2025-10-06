import fs from "fs";
import path from "path";
import pool from "../db.js";

const __dirname = path.resolve();

async function runMigrations() {
  const modelsDir = path.join(__dirname, "models");
  const files = fs.readdirSync(modelsDir);

  console.log("🚀 Initialisation de la base de données...");

  for (const file of files) {
    if (file.endsWith(".sql")) {
      const filePath = path.join(modelsDir, file);
      const sql = fs.readFileSync(filePath, "utf8");
      console.log(`📄 Exécution de : ${file}`);
      try {
        await pool.query(sql);
      } catch (err) {
        console.error(`❌ Erreur dans ${file}:`, err.message);
      }
    }
  }

  console.log("✅ Base de données initialisée avec succès !");
  await pool.end();
}

runMigrations().catch((err) => {
  console.error("❌ Erreur d'initialisation :", err.message);
  process.exit(1);
});
