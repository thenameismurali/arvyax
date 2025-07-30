// src/pages/Register.js
import { useState } from 'react';
import api from '../api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await api.post('/register', { email, password });
      alert('Registered successfully!');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Register failed!');
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
