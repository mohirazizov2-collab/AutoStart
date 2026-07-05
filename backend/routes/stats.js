const express = require('express');
const Car = require('../models/Car');
const User = require('../models/User');
const router = express.Router();

// Get general statistics
router.get('/', async (req, res) => {
  try {
    const totalListings = await Car.countDocuments({ verified: true });
    const verifiedDealers = await User.countDocuments({ userType: 'dealer', isVerified: true });
    const totalTransactions = await Car.countDocuments({ verified: true });
    
    // Calculate average satisfaction (mock data, replace with real reviews)
    const avgSatisfaction = 98;

    const stats = {
      totalListings,
      verifiedDealers,
      totalTransactions,
      avgSatisfaction
    };

    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get regional statistics
router.get('/regions', async (req, res) => {
  try {
    const stats = await Car.aggregate([
      { $match: { verified: true } },
      {
        $group: {
          _id: '$region',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get payment type statistics
router.get('/payment-types', async (req, res) => {
  try {
    const stats = await Car.aggregate([
      { $match: { verified: true } },
      {
        $group: {
          _id: '$paymentType',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' }
        }
      }
    ]);

    const formatted = stats.map(stat => ({
      type: stat._id,
      count: stat.count,
      avgPrice: Math.round(stat.avgPrice)
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get brand statistics
router.get('/brands', async (req, res) => {
  try {
    const stats = await Car.aggregate([
      { $match: { verified: true } },
      {
        $group: {
          _id: '$brand',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);

    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
