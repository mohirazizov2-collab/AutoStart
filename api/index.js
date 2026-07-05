const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve static files from root and components
app.use(express.static(path.join(__dirname, '..')));

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../avto24-home.html'));
});

// Serve HTML files without extension
app.get('/:page', (req, res) => {
  const filePath = path.join(__dirname, '..', `${req.params.page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, '../avto24-home.html'));
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../avto24-home.html'));
});

module.exports = app;
