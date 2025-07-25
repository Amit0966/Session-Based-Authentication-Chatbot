import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ChatWindow from './components/ChatWindow';
import './index.css';

const App = () => {
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await axios.get('http://localhost:6001/api/chat/sessions');
      setSessions(res.data);
    } catch (err) {
      console.error('Error fetching sessions:', err);
    }
  };

  const createSession = async () => {
    const name = prompt('Enter a session name:');
    if (!name) return;

    try {
      const res = await axios.post('http://localhost:6001/api/chat/session', { name }, { withCredentials: true });
      setSessions([...sessions, res.data]);
      setCurrentSession(res.data);
    } catch (err) {
      console.error('Error creating session:', err);
    }
  };

  const deleteSession = async (sessionId) => {
    try {
      await axios.delete(`http://localhost:6001/api/chat/session/${sessionId}`);
      setSessions(sessions.filter((s) => s._id !== sessionId));
      if (currentSession && currentSession._id === sessionId) {
        setCurrentSession(null);
      }
    } catch (err) {
      console.error('Error deleting session:', err);
    }
  };

  return (
    <div className="app-container">
      <div className="session-list">
        <h2>Chatbot</h2>
        <button onClick={createSession} className="new-session-btn">+ New Session</button>
        <ul>
          {sessions.map((s) => (
            <li
              key={s._id}
              className={`session-item ${currentSession?._id === s._id ? 'active' : ''}`}
              onClick={() => setCurrentSession(s)}
            >
              <span>{s.name}</span>
              <span className="delete" onClick={(e) => { e.stopPropagation(); deleteSession(s._id); }}>✖</span>
            </li>
          ))}
        </ul>
      </div>
      <ChatWindow session={currentSession} />
    </div>
  );
};

export default App;
