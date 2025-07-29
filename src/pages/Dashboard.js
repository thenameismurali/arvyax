import { useEffect, useState } from 'react';
import api from '../api';
import '../style.css';

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    api.get('/sessions').then(res => {
      setSessions(res.data);
    });
  }, []);

  return (
    <div className="container">
      <h2>Public Sessions</h2>
      <div className="card-grid">
        {sessions.length === 0 && <p>No public sessions found yet.</p>}
        {sessions.map(s => (
          <div key={s._id} className="session-card">
            <h3>{s.title}</h3>
            <div className="tag-list">
              {s.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
            <p className="status">Status: Published</p>
          </div>
        ))}
      </div>
    </div>
  );
}
