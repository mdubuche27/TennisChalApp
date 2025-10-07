import React, { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          setError('Accès refusé');
          return;
        }
        const data = await res.json();
        setUsers(data);
      } catch {
        setError('Erreur réseau');
      }
    };
    fetchUsers();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.id} — {u.username} — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
