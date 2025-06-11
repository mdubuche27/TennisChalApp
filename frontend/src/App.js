import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/matches")
      .then(res => setMatches(res.data.matches || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Résultats Tennis</h1>
      {matches.length === 0 ? <p>Chargement...</p> :
        <ul>
          {matches.map((match, index) => (
            <li key={index}>{match.player1} vs {match.player2} - {match.status}</li>
          ))}
        </ul>
      }
    </div>
  );
}

export default App;
