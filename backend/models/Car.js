const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  paymentType: {
    type: String,
    enum: ['rent0', 'rent1', 'cash'],
    required: true
  },
  monthlyPayment: {
    type: Number
  },
  paymentUnit: {
    type: String,
    enum: ['so\'m/oy', 'so\'m'],
    default: 'so\'m'
  },
  mileage: {
    type: Number,
    default: 0
  },
  transmission: {
    type: String,
    enum: ['Avtomat', 'Mexanika', 'Avtomat (EV)'],
    default: 'Avtomat'
  },
  region: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    enum: ['Yangi', 'Foydalanilgan', 'Shovqi'],
    default: 'Foydalanilgan'
  },
  description: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verified: {
    type: Boolean,
    default: false
  },
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  vinNumber: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Text index for search
carSchema.index({ title: 'text', brand: 'text', model: 'text', description: 'text' });
carSchema.index({ region: 1, paymentType: 1, price: 1, year: 1 });

module.exports = mongoose.model('Car', carSchema);
