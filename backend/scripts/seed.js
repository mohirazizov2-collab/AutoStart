const Car = require('../models/Car');
const User = require('../models/User');

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Car.deleteMany({});
    await User.deleteMany({});

    // Create sample users
    const users = await User.insertMany([
      {
        name: 'Achmad',
        email: 'achmad@avto24.uz',
        phone: '+998901234567',
        password: 'password123',
        userType: 'dealer',
        dealerInfo: {
          companyName: 'AVTO PLUS',
          taxId: '1234567890',
          verified: true
        },
        isVerified: true,
        rating: 4.8,
        reviews: 125
      },
      {
        name: 'Alijon',
        email: 'alijon@avto24.uz',
        phone: '+998902345678',
        password: 'password123',
        userType: 'dealer',
        dealerInfo: {
          companyName: 'CARS EXPRESS',
          taxId: '9876543210',
          verified: true
        },
        isVerified: true,
        rating: 4.9,
        reviews: 98
      }
    ]);

    // Create sample cars
    const cars = await Car.insertMany([
      {
        title: 'Chevrolet Onix LT',
        brand: 'Chevrolet',
        model: 'Onix',
        year: 2023,
        price: 1890000,
        paymentType: 'rent0',
        monthlyPayment: 1890000,
        paymentUnit: 'so\'m/oy',
        mileage: 12000,
        transmission: 'Avtomat',
        region: 'Toshkent',
        category: 'Sedan',
        condition: 'Yangi',
        description: 'Yangi Chevrolet Onix, hamma shnurki bilan.',
        owner: users[0]._id,
        verified: true,
        likes: 245,
        views: 1250
      },
      {
        title: 'Hyundai Elantra 2.0',
        brand: 'Hyundai',
        model: 'Elantra',
        year: 2022,
        price: 2340000,
        paymentType: 'rent1',
        monthlyPayment: 2340000,
        paymentUnit: 'so\'m/oy',
        mileage: 28400,
        transmission: 'Avtomat',
        region: 'Samarqand',
        category: 'Sedan',
        condition: 'Yangi',
        description: 'Salondan chiqib turgan Hyundai Elantra.',
        owner: users[0]._id,
        verified: true,
        likes: 189,
        views: 956
      },
      {
        title: 'Kia K5 GT-Line',
        brand: 'Kia',
        model: 'K5',
        year: 2024,
        price: 312000000,
        paymentType: 'cash',
        paymentUnit: 'so\'m',
        mileage: 3200,
        transmission: 'Avtomat',
        region: 'Toshkent',
        category: 'Sedan',
        condition: 'Yangi',
        description: 'Premium Kia K5, barcha opsiyalar.',
        owner: users[1]._id,
        verified: true,
        likes: 412,
        views: 2340
      },
      {
        title: 'BYD Song Plus',
        brand: 'BYD',
        model: 'Song Plus',
        year: 2023,
        price: 2980000,
        paymentType: 'rent1',
        monthlyPayment: 2980000,
        paymentUnit: 'so\'m/oy',
        mileage: 9800,
        transmission: 'Avtomat (EV)',
        region: 'Buxoro',
        category: 'SUV',
        condition: 'Yangi',
        description: 'Elektromobil, 5ta o\'rindiq.',
        owner: users[1]._id,
        verified: true,
        likes: 156,
        views: 834
      },
      {
        title: 'Chevrolet Tracker',
        brand: 'Chevrolet',
        model: 'Tracker',
        year: 2022,
        price: 2120000,
        paymentType: 'rent0',
        monthlyPayment: 2120000,
        paymentUnit: 'so\'m/oy',
        mileage: 31500,
        transmission: 'Mexanika',
        region: 'Farg\'ona',
        category: 'SUV',
        condition: 'Foydalanilgan',
        description: 'Ishonchli Tracker, xizmat ko\'rgan emasmi.',
        owner: users[0]._id,
        verified: true,
        likes: 98,
        views: 567
      },
      {
        title: 'Toyota Camry 70',
        brand: 'Toyota',
        model: 'Camry',
        year: 2021,
        price: 398000000,
        paymentType: 'cash',
        paymentUnit: 'so\'m',
        mileage: 41000,
        transmission: 'Avtomat',
        region: 'Toshkent',
        category: 'Sedan',
        condition: 'Foydalanilgan',
        description: 'Premium Camry, butun xizmat ko\'rish tarihli.',
        owner: users[1]._id,
        verified: true,
        likes: 523,
        views: 3421
      }
    ]);

    // Update users with cars listed
    users[0].carsListed = [cars[0]._id, cars[1]._id, cars[4]._id];
    users[1].carsListed = [cars[2]._id, cars[3]._id, cars[5]._id];
    await User.updateMany({}, (doc) => {
      if (doc._id.toString() === users[0]._id.toString()) {
        doc.carsListed = [cars[0]._id, cars[1]._id, cars[4]._id];
      } else if (doc._id.toString() === users[1]._id.toString()) {
        doc.carsListed = [cars[2]._id, cars[3]._id, cars[5]._id];
      }
    });

    console.log('✅ Baza ma\'lumotlari muvaffaqiyatli to\'ldirildi');
    console.log(`Foydalanuvchilar: ${users.length}`);
    console.log(`Avtomobilllar: ${cars.length}`);
  } catch (error) {
    console.error('❌ Baza ma\'lumotlari to\'ldirishda xato:', error.message);
  }
};

module.exports = seedDatabase;
