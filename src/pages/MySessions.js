import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import '../style.css';

export default function MySessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    api.get('/my-sessions').then(res => {
      setSessions(res.data);
    }).catch(err => {
      console.error(err);
      alert('Failed to load your sessions. Are you logged in?');
    });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this session?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/my-sessions/${id}`);
      // Remove from local state
      setSessions(prev => prev.filter(s => s._id !== id));
      alert('Session deleted.');
    } catch (err) {
      console.error(err);
      alert('Failed to delete.');
    }
  };

  return (
    <div className="container">
      <h2>My Sessions</h2>

      <Link to="/editor" className="create-session-btn">+ Create New Session</Link>

      {sessions.length === 0 ? (
        <p>You have no sessions yet. Click "Create New Session" to get started!</p>
      ) : (
        <table className="session-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Tags</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(s => (
              <tr key={s._id}>
                <td>{s.title}</td>
                <td>{s.tags.join(', ')}</td>
                <td>{s.published ? 'Published' : 'Draft'}</td>
                <td>
                  <Link to={`/editor/${s._id}`} className="edit-link">Edit</Link>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
