const express = require('express');
const Car = require('../models/Car');
const router = express.Router();

// Get all categories with count
router.get('/', async (req, res) => {
  try {
    const categories = [
      {
        id: 'rent0',
        name: 'Boshlang\'ich to\'lovsiz ijara',
        icon: '☀️',
        description: '0 so\'m boshlang\'ich to\'lov bilan bugunoq avtomobilni haydab keting',
        tag: 'E\'lonlar'
      },
      {
        id: 'rent1',
        name: 'Boshlang\'ich to\'lov bilan ijara',
        icon: '💳',
        description: 'Kichik boshlang\'ich to\'lov orqali oylik to\'lovlarni pasaytiring',
        tag: 'E\'lonlar'
      },
      {
        id: 'cash',
        name: 'Naqd sotib olish',
        icon: '💵',
        description: 'To\'liq to\'lov qiling va avtomobil darhol sizniki bo\'ladi',
        tag: 'E\'lonlar'
      }
    ];

    // Get count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Car.countDocuments({ paymentType: cat.id, verified: true });
        return { ...cat, count };
      })
    );

    res.json({ success: true, data: categoriesWithCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get cars by category
router.get('/:categoryId', async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const cars = await Car.find({ paymentType: req.params.categoryId, verified: true })
      .populate('owner', 'name phone rating')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Car.countDocuments({ paymentType: req.params.categoryId, verified: true });

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

module.exports = router;
