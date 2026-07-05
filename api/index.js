const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve static files from root and components directories
const staticDirs = [
  path.join(__dirname, '..'),
  path.join(__dirname, '../components'),
  path.join(__dirname, '../public')
];

staticDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    app.use(express.static(dir, { 
      index: false,
      dotfiles: 'allow'
    }));
  }
});

// Explicit route for homepage
app.get('/', (req, res) => {
  const homePath = path.join(__dirname, '../index.html');
  if (fs.existsSync(homePath)) {
    res.sendFile(homePath);
  } else {
    res.status(404).send('Homepage not found');
  }
});

// Route for HTML files without extension
app.get('/:page', (req, res) => {
  const filePath = path.join(__dirname, '..', `${req.params.page}.html`);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    // Serve homepage as fallback
    const homePath = path.join(__dirname, '../index.html');
    if (fs.existsSync(homePath)) {
      res.sendFile(homePath);
    } else {
      res.status(404).send('Page not found');
    }
  }
});

// 404 handler - Serve homepage
app.use((req, res) => {
  const homePath = path.join(__dirname, '../index.html');
  if (fs.existsSync(homePath)) {
    res.sendFile(homePath);
  } else {
    res.status(404).json({ error: 'Homepage not found' });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

module.exports = app;
