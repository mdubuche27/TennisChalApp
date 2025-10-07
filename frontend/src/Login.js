import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin, onRegisterClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Use the existing logo file from the public folder */}
        <img
          src={`${process.env.PUBLIC_URL}/logo512.png`}
          alt="ATP Logo"
          className="auth-logo"
        />
        <h2 className="auth-title">Connexion</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Adresse email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            required
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
          />
          <button type="submit" className="auth-button">
            Se connecter
          </button>
        </form>
        <p className="auth-switch">
          Pas encore de compte ?{' '}
          <button type="button" onClick={onRegisterClick} className="link-button">
            Inscription
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;