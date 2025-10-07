import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import UserList from './UserList';
import { BracketProvider } from './BracketContext';
import Game from './Game';
import Duel from './Duel';

function App() {
  return (
    <BracketProvider>
      <div className="App">
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/login" style={{ marginRight: '10px' }}>Se connecter</Link>
          <Link to="/register" style={{ marginRight: '10px' }}>S’inscrire</Link>
          <Link to="/game">Jeu</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/game" replace />} />
          <Route path="/game" element={<Game />} />
          <Route path="/duel/:roundIndex/:matchIndex" element={<Duel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </BracketProvider>
  );
}

export default App;
