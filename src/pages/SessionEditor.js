import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function SessionEditor() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [url, setUrl] = useState('');
  const [timer, setTimer] = useState(null);

  // ✅ Load session if editing existing
  useEffect(() => {
    if (id) {
      api.get(`/my-sessions/${id}`).then(res => {
        setTitle(res.data.title);
        setTags(res.data.tags.join(','));
        setUrl(res.data.json_file_url);
      });
    }
  }, [id]);

  // ✅ Better: wrap saveDraft in useCallback so effect has stable deps
  const saveDraft = useCallback(async () => {
    const res = await api.post('/my-sessions/save-draft', {
      _id: id,
      title,
      tags: tags.split(',').map(t => t.trim()),
      json_file_url: url,
    });
    console.log('Auto-saved', res.data);
  }, [id, title, tags, url]);

  // ✅ Auto-save after 5s of inactivity
  useEffect(() => {
    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        saveDraft();
      }, 5000)
    );
    return () => clearTimeout(timer);
  }, [title, tags, url, saveDraft, timer]);

  // ✅ Consistent publish handler
  const handlePublish = async () => {
    await api.post('/my-sessions/publish', { _id: id });
    alert('Published!');
  };

  return (
    <div>
      <h2>Session Editor</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
      />
      <input
        placeholder="JSON URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <button onClick={saveDraft}>Save Draft Now</button>
      <button onClick={handlePublish}>Publish</button>
    </div>
  );
}
