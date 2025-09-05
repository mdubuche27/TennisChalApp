const axios = require("axios");
const https = require("https");
const fs = require("fs");

const ca = fs.readFileSync(__dirname + '/../../certs/ZscalerRootCertificate-2048-SHA256.crt'); // 🔒 lecture du certificat

const httpsAgent = new https.Agent({
  ca,
  rejectUnauthorized: true // On garde la sécurité SSL active
});

exports.fetchAllTournaments = async (year) => {
  try {
    const response = await axios.get(`https://tennis-api-atp-wta-itf.p.rapidapi.com/tennis/v2/atp/tournament/calendar/${year}`, {
      headers: {
        "x-rapidapi-key": process.env.TENNIS_API_KEY,
        "x-rapidapi-host": "tennis-api-atp-wta-itf.p.rapidapi.com"
      },
      // httpsAgent // 👈 on applique notre agent HTTPS personnalisé
    });

    console.log(response.data)
    return response.data || [];
  } catch (error) {
    console.error("Erreur TennisAPI :", error.message);
    throw error;
  }
};