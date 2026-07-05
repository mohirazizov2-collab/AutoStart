const express = require('express');
const Car = require('../models/Car');
const router = express.Router();

// Advanced search and filter
router.get('/', async (req, res) => {
  try {
    const { 
      query, 
      brand, 
      paymentType, 
      minPrice, 
      maxPrice, 
      region,
      year,
      transmission,
      page = 1,
      limit = 12
    } = req.query;

    // Build filter object
    const filter = { verified: true };

    if (query) {
      filter.$text = { $search: query };
    }

    if (brand) {
      filter.brand = brand;
    }

    if (paymentType) {
      filter.paymentType = paymentType;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    if (region) {
      filter.region = region;
    }

    if (year) {
      filter.year = parseInt(year);
    }

    if (transmission) {
      filter.transmission = transmission;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const cars = await Car.find(filter)
      .populate('owner', 'name phone rating avatar')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Car.countDocuments(filter);

    res.json({
      success: true,
      data: cars,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Search by text
router.get('/text', async (req, res) => {
  try {
    const { q, page = 1, limit = 12 } = req.query;

    if (!q) {
      return res.status(400).json({ success: false, error: 'Qidiruv so\'zi kerak' });
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const cars = await Car.find(
      { $text: { $search: q }, verified: true },
      { score: { $meta: 'textScore' } }
    )
      .populate('owner', 'name phone rating')
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Car.countDocuments({ $text: { $search: q }, verified: true });

    res.json({
      success: true,
      data: cars,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get filter options
router.get('/options/filters', async (req, res) => {
  try {
    const brands = await Car.distinct('brand', { verified: true });
    const regions = await Car.distinct('region', { verified: true });
    const transmissions = await Car.distinct('transmission', { verified: true });

    const priceStats = await Car.aggregate([
      { $match: { verified: true } },
      {
        $group: {
          _id: null,
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        brands: brands.sort(),
        regions: regions.sort(),
        transmissions,
        priceRange: priceStats[0] || { minPrice: 0, maxPrice: 0 }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
