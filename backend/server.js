const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve frontend homepage from project root
const frontendRoot = path.join(__dirname, '..');
app.use(express.static(frontendRoot));
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendRoot, 'avto24-home.html'));
});

// Routes
const carRoutes = require('./routes/cars');
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');
const statsRoutes = require('./routes/stats');
const searchRoutes = require('./routes/search');

// API Routes
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/search', searchRoutes);

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/avto24';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Serverda xato yuz berdi' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Sahifa topilmadi' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishga tushdi`);
});
