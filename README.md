# MERN Chatbot App

A session-based chatbot built with the MERN stack.

## 📦 Tech Stack
- **Frontend:** React, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose

## 🚀 How to Run
### 0. first change both package_frontend and backend files name to package.json and put them in their respective folders according to the file structure which is provided at the end of the readme file
### 1. Backend
```bash
cd backend
npm install cookie-parser
npm run dev

## 2. frontend
```bash
cd frontend
npm install js-cookie
npm start

## 3. folder structure
chatbot-mern/
├── backend/
│   ├── models/
│   │   ├── Message.js          # Mongoose schema for chat messages
│   │   └── Session.js          # Mongoose schema for chat sessions
│   ├── routes/
│   │   └── chat.js             # API routes for sessions and messages
│   ├── server.js               # Express server setup
│   └── .env                    # Environment variables (PORT, MONGO_URI)
│
├── frontend/
│   ├── public/
│   │   └── index.html          # Main HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.jsx  # Chat interface for messages
│   │   │   └── SessionList.jsx # Sidebar to manage sessions
│   │   ├── App.jsx             # Main React app combining components
│   │   ├── index.js            # Entry point for React DOM rendering
│   │   └── index.css           # Global styles (optional)
│   └── package.json            # Frontend dependencies and scripts
│
├── package.json                # Backend dependencies and scripts
├── README.md                   # Project documentation
└── README.pdf                  # (Optional) PDF version of README
