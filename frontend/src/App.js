import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTournaments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/tournaments?month=${month}&year=${year}`);
      console.log(res);
      setTournaments(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des tournois :", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTournaments();
  }, [month, year]);

  const nextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  };

  const prevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  };

  const formatMonth = () =>
    new Date(year, month - 1).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Tournois de {formatMonth()}</h1>
      <button onClick={prevMonth}>⬅ Mois précédent</button>
      <button onClick={nextMonth} style={{ marginLeft: "10px" }}>Mois suivant ➡</button>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul style={{ marginTop: "20px" }}>
          {tournaments.length === 0 ? (
            <li>Aucun tournoi pour ce mois.</li>
          ) : (
            tournaments.map((t, i) => (
              <li key={i}>
                <strong>{t.name.split('-')[0]}</strong> - {t.name} <br />
                📅 {t.date} → {t.date}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default App;
