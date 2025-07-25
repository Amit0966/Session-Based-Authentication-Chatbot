import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatWindow = ({ session }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?._id) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:6001/api/chat/messages/${session._id}`);
        setMessages(res.data || []);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      }
    };

    fetchMessages();
  }, [session]);

  const sendMessage = async () => {
    if (!input.trim() || !session?._id) return;

    setLoading(true);
    const userMessage = { role: 'user', content: input };

    try {
      await axios.post('http://localhost:6001/api/chat/message', {
        sessionId: session._id,
        ...userMessage
      });

      setInput('');
      // Refetch messages after short delay
      setTimeout(async () => {
        const res = await axios.get(`http://localhost:6001/api/chat/messages/${session._id}`);
        setMessages(res.data || []);
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error('Failed to send message:', err);
      setLoading(false);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      {session ? (
        <div className="input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button onClick={sendMessage} disabled={loading}>
            {loading ? '...' : 'Send'}
          </button>
        </div>
      ) : (
        <p>Please select or create a session</p>
      )}
    </div>
  );
};

export default ChatWindow;
