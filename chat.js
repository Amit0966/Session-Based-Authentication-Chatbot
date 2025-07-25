const express = require('express');
const router = express.Router();
const ChatSession = require('../models/ChatSession');
const ChatMessage = require('../models/ChatMessage');

// ✅ Create a session and store sessionId in cookie
router.post('/session', async (req, res) => {
  try {
    const session = new ChatSession({ name: req.body.name });
    await session.save();

    res.cookie('sessionId', session._id.toString(), {
      httpOnly: true,
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json(session);
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// ✅ Get all sessions
router.get('/sessions', async (req, res) => {
  try {
    const sessions = await ChatSession.find();
    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// ✅ Get messages by sessionId
router.get('/messages/:sessionId', async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const messages = await ChatMessage.find({ sessionId });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// ✅ Send message + basic bot reply
router.post('/message', async (req, res) => {
  try {
    const { sessionId, role, content } = req.body;
    if (!sessionId || !content) return res.status(400).json({ error: 'Invalid input' });

    const userMessage = new ChatMessage({ sessionId, role, content });
    await userMessage.save();

    // Generate a basic bot reply
    let reply = 'Sorry, I didn’t understand that.';
    const lower = content.toLowerCase();
    if (lower.includes('hello')) reply = 'Hi there! How can I help you today?';
    else if (lower.includes('how are you')) reply = 'I’m just a bot, but I’m doing great!';
    else if (lower.includes('bye')) reply = 'Goodbye! Have a nice day!';
    else if (lower.includes('help')) reply = 'You can ask me basic questions like greetings or status.';

    const botMessage = new ChatMessage({
      sessionId,
      role: 'bot',
      content: reply
    });
    await botMessage.save();

    // ⏳ Delay of 1.5 seconds
    setTimeout(() => {
      res.status(200).json(botMessage);
    }, 1500);

  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// ✅ Delete session
router.delete('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    await ChatMessage.deleteMany({ sessionId });
    await ChatSession.findByIdAndDelete(sessionId);
    res.json({ message: 'Session and messages deleted' });
  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({ error: 'Failed to delete session' });
  }
});

module.exports = router;
