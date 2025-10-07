import React, { useState } from 'react';
import './Register.css';

/**
 * Registration component following ATP branding.
 *
 * Props:
 * - onLogin: callback invoked to switch back to the login page after registration.
 */
function Register({ onLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation to check matching passwords
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    // TODO: integrate registration logic here
    // For now, switch back to login page
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img
          src={`${process.env.PUBLIC_URL}/logo512.png`}
          alt="ATP Logo"
          className="auth-logo"
        />
        <h2 className="auth-title">Créer un compte</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Votre nom"
            required
          />
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
          <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmer le mot de passe"
            required
          />
          <button type="submit" className="auth-button">
            S'inscrire
          </button>
        </form>
        <p className="auth-switch">
          Déjà un compte ?{' '}
          <button type="button" onClick={onLogin} className="link-button">
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;