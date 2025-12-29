const express = require('express');
const app = express();
app.use(express.json());

let scripts = [];
let users = [];
let comments = [];

// Test route
app.get('/', (req, res) => {
  res.send('✅ Roblox Scripts Backend is LIVE!');
});

// Get all scripts
app.get('/api/scripts', (req, res) => {
  res.json({ success: true, scripts: scripts });
});

// Upload new script
app.post('/api/scripts', (req, res) => {
  const newScript = {
    id: 'script_' + Date.now(),
    ...req.body,
    date: new Date().toISOString(),
    downloads: 0,
    comments: 0
  };
  scripts.unshift(newScript);
  res.json({ success: true, message: 'Script uploaded', script: newScript });
});

// Register user
app.post('/api/users', (req, res) => {
  const { username, avatar } = req.body;
  const newUser = {
    username,
    avatar: avatar || `https://ui-avatars.com/api/?name=${username}`,
    joinedDate: new Date().toISOString()
  };
  users.push(newUser);
  res.json({ success: true, user: newUser });
});

// Add comment
app.post('/api/comments', (req, res) => {
  const { scriptId, author, text } = req.body;
  const newComment = {
    id: 'comment_' + Date.now(),
    scriptId,
    author,
    text,
    date: new Date().toISOString()
  };
  comments.push(newComment);
  res.json({ success: true, comment: newComment });
});

module.exports = app;
