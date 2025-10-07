import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import UserList from './UserList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  );
}

export default App;
