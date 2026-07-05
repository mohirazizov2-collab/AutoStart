const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  userType: {
    type: String,
    enum: ['individual', 'dealer', 'admin'],
    default: 'individual'
  },
  dealerInfo: {
    companyName: String,
    taxId: String,
    verified: { type: Boolean, default: false }
  },
  avatar: {
    type: String
  },
  bio: {
    type: String,
    default: ''
  },
  address: {
    type: String
  },
  region: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationCode: {
    type: String
  },
  carsListed: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  }],
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  }],
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
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

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
