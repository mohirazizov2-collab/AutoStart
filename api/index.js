const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../backend/.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve static files from the project root
app.use(express.static(path.join(__dirname, '..')));
app.use(express.static(path.join(__dirname, '../components')));
app.use(express.static(path.join(__dirname, '../backend')));

// MongoDB connection (optional for Vercel)
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI && MONGODB_URI !== 'mongodb://localhost:27017/avto24') {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));
}

// Routes - Import only if MongoDB is connected
try {
  const carRoutes = require('../backend/routes/cars');
  const userRoutes = require('../backend/routes/users');
  const categoryRoutes = require('../backend/routes/categories');
  const statsRoutes = require('../backend/routes/stats');
  const searchRoutes = require('../backend/routes/search');

  // API Routes
  app.use('/api/cars', carRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/stats', statsRoutes);
  app.use('/api/search', searchRoutes);
} catch (err) {
  console.log('API routes not available:', err.message);
}

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../avto24-home.html'));
});

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/avto24';
if (MONGODB_URI && MONGODB_URI !== 'mongodb://localhost:27017/avto24') {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Serverda xato yuz berdi' });
});

// 404 handler - Serve homepage for SPA routing
app.use((req, res) => {
  // If it's an API request, return 404
  if (req.path.startsWith('/api')) {
    res.status(404).json({ error: 'API endpoint topilmadi' });
  } else {
    // For other requests, serve the homepage
    res.sendFile(path.join(__dirname, '../avto24-home.html'));
  }
});

module.exports = app;
