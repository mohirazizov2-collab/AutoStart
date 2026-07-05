# AVTO24 Backend API

O'zbekistondagi avtomobil bozori uchun backend REST API

## O'rnatish

```bash
npm install
```

## Konfiguratsiya

`.env` faylini yaratib, quyidagilarni o'rnating:

```
MONGODB_URI=mongodb://localhost:27017/avto24
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Ishga tushirish

Rivojlanish rejimida:
```bash
npm run dev
```

Ishlab chiqarish rejimida:
```bash
npm start
```

## API Endpoints

### Avtomobilllar
- `GET /api/cars` - Barcha avtomobilllarni olish (pagination bilan)
- `GET /api/cars/featured` - Tavsiya etilgan avtomobilllar
- `GET /api/cars/:id` - Avtomobil tafsiloti
- `POST /api/cars` - Yangi e'lon joylash
- `PUT /api/cars/:id` - E'lonni yangilash
- `DELETE /api/cars/:id` - E'lonni o'chirish
- `POST /api/cars/:id/like` - Avtomobilni yoqish

### Qidiruv va Filter
- `GET /api/search` - Qidiruv va filtrlash
- `GET /api/search/text` - Matn orqali qidiruv
- `GET /api/search/options/filters` - Filter variantlari

### Foydalanuvchilar
- `POST /api/users/register` - Ro'yxatdan o'tish
- `POST /api/users/login` - Tizimga kirish
- `GET /api/users/:id` - Profil ma'lumotlari
- `PUT /api/users/:id` - Profilni yangilash
- `POST /api/users/:id/favorites/:carId` - Sevimlilar ro'yxatiga qo'shish
- `DELETE /api/users/:id/favorites/:carId` - Sevimlilardan o'chirish

### Kategoriyalar
- `GET /api/categories` - Barcha kategoriyalar
- `GET /api/categories/:categoryId` - Kategoriya bo'yicha avtomobilllar

### Statistika
- `GET /api/stats` - Umumiy statistika
- `GET /api/stats/regions` - Hududlar bo'yicha statistika
- `GET /api/stats/payment-types` - To'lov turlari bo'yicha statistika
- `GET /api/stats/brands` - Brendlar bo'yicha statistika

## Database Sxemalar

### Car (Avtomobil)
```javascript
{
  title: String,
  brand: String,
  model: String,
  year: Number,
  price: Number,
  paymentType: String, // rent0, rent1, cash
  monthlyPayment: Number,
  mileage: Number,
  transmission: String,
  region: String,
  category: String,
  description: String,
  images: [String],
  owner: ObjectId,
  verified: Boolean,
  likes: Number,
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### User (Foydalanuvchi)
```javascript
{
  name: String,
  email: String,
  phone: String,
  password: String,
  userType: String, // individual, dealer, admin
  dealerInfo: {
    companyName: String,
    taxId: String,
    verified: Boolean
  },
  carsListed: [ObjectId],
  favorites: [ObjectId],
  rating: Number,
  reviews: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Kafolat Sxemasi (To'lov Turlari)

- **rent0**: Boshlang'ich to'lovsiz ijara (0% down payment)
- **rent1**: Boshlang'ich to'lov bilan ijara (with down payment)
- **cash**: Naqd sotib olish (full payment)

## Xatolik Javoblar

```json
{
  "success": false,
  "error": "Xato tavsifi"
}
```

## Muvaffaqiyatli Javoblar

```json
{
  "success": true,
  "data": {...},
  "message": "Tavsifi"
}
```

## Lisenziya

MIT
