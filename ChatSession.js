const mongoose = require('mongoose');

const ChatSessionSchema = new mongoose.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ChatSession', ChatSessionSchema);
