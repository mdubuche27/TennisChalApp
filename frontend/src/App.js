import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import UserList from './UserList';

function App() {
  return (
    <div className="App">
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/login" style={{ marginRight: '10px' }}>Se connecter</Link>
        <Link to="/register">S’inscrire</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  );
}

export default App;
