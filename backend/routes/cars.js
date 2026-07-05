const express = require('express');
const Car = require('../models/Car');
const router = express.Router();

// Get all cars with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const cars = await Car.find({ verified: true })
      .populate('owner', 'name phone rating')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Car.countDocuments({ verified: true });

    res.json({
      success: true,
      data: cars,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get featured cars (recommended)
router.get('/featured', async (req, res) => {
  try {
    const cars = await Car.find({ verified: true })
      .populate('owner', 'name phone')
      .sort({ likes: -1, views: -1 })
      .limit(6);

    res.json({ success: true, data: cars });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single car by ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate('owner', 'name phone avatar rating reviews');

    if (!car) {
      return res.status(404).json({ success: false, error: 'Avtomobil topilmadi' });
    }

    // Increment views
    car.views += 1;
    await car.save();

    res.json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new car listing
router.post('/', async (req, res) => {
  try {
    const { title, brand, model, year, price, paymentType, region, category, images } = req.body;

    if (!title || !brand || !model || !year || !price || !paymentType || !region || !category) {
      return res.status(400).json({ success: false, error: 'Barcha maydonlar to\'ldirilishi kerak' });
    }

    const car = new Car({
      ...req.body,
      owner: req.user?._id || null
    });

    await car.save();
    res.status(201).json({ success: true, data: car, message: 'E\'lon muvaffaqiyatli joylashtirildi' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update car listing
router.put('/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!car) {
      return res.status(404).json({ success: false, error: 'Avtomobil topilmadi' });
    }

    res.json({ success: true, data: car, message: 'E\'lon yangilandi' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete car listing
router.delete('/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);

    if (!car) {
      return res.status(404).json({ success: false, error: 'Avtomobil topilmadi' });
    }

    res.json({ success: true, message: 'E\'lon o\'chirildi' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Like a car
router.post('/:id/like', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ success: false, error: 'Avtomobil topilmadi' });
    }

    car.likes += 1;
    await car.save();

    res.json({ success: true, data: car, message: 'Yoqdi!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
