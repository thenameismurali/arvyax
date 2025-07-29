import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import '../style.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { email, password });
      alert('Registered successfully! Now login.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Register failed.');
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            maxLength="40"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            maxLength="20"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
