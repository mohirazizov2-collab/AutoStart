# 📦 AVTO24 Backend — To'liq Struktura

## 🗂️ Fayllar Va Papkalar

```
backend/
│
├── 📄 server.js                    # Asosiy Express server
├── 📄 package.json                 # Dependencies va scripts
├── 📄 .env                         # Environment variables
├── 📄 .gitignore                   # Git ignore rules
│
├── 📄 Dockerfile                   # Docker container uchun
├── 📄 docker-compose.yml           # Docker-Compose konfiguratsiyasi
│
├── 📄 README.md                    # Backend dokumentatsiyasi
├── 📄 API_EXAMPLES.md              # API chaqiruv misolları
│
├── 📁 models/                      # MongoDB Schemas
│   ├── 📄 Car.js                   # Avtomobil modeli
│   └── 📄 User.js                  # Foydalanuvchi modeli
│
├── 📁 routes/                      # API Endpoints
│   ├── 📄 cars.js                  # Avtomobil endpoints
│   ├── 📄 users.js                 # Foydalanuvchi endpoints
│   ├── 📄 categories.js            # Kategoriya endpoints
│   ├── 📄 stats.js                 # Statistika endpoints
│   └── 📄 search.js                # Qidiruv endpoints
│
├── 📁 middleware/                  # Express Middleware
│   └── 📄 auth.js                  # JWT Avtentifikatsiya
│
├── 📁 utils/                       # Yordamchi Funktsiyalar
│   └── 📄 validation.js            # Input Validatsiyasi
│
└── 📁 scripts/                     # Tizim Skriptlari
    └── 📄 seed.js                  # Database Seeding
```

## 🚀 Ishga Tushirish

### Tez Boshlash (Quick Start)

```bash
# 1. Dependencies'ni o'rnatish
npm install

# 2. .env faylini konfiguratsiya qilish
# MongoDB URL, JWT Secret'ni o'rnatish

# 3. Development rejimida ishga tushirish
npm run dev

# 4. Database'ni ma'lumotlar bilan to'ldirish (ixtiyoriy)
node scripts/seed.js
```

### Docker bilan

```bash
# Barcha kerakli service'larni ishga tushirish
docker-compose up

# Background'da
docker-compose up -d

# To'xtatish
docker-compose down
```

## 📊 Database Sxemalar

### Car (Avtomobil)
```javascript
{
  _id: ObjectId,
  title: String,              // "Chevrolet Onix LT"
  brand: String,              // "Chevrolet"
  model: String,              // "Onix"
  year: Number,               // 2023
  price: Number,              // 1890000
  paymentType: String,        // "rent0" | "rent1" | "cash"
  monthlyPayment: Number,     // Oylik to'lov (ijara bo'lsa)
  paymentUnit: String,        // "so'm/oy" | "so'm"
  mileage: Number,            // 12000 km
  transmission: String,       // "Avtomat" | "Mexanika" | "Avtomat (EV)"
  region: String,             // "Toshkent"
  category: String,           // "Sedan" | "SUV" | "Truck"
  condition: String,          // "Yangi" | "Foydalanilgan"
  description: String,        // Batafsil tavsifi
  images: [String],           // Rasm URL'lari
  owner: ObjectId,            // User reference
  verified: Boolean,          // Admin tasdiqladi mi
  likes: Number,              // Like'lar soni
  views: Number,              // Ko'rishlar soni
  vinNumber: String,          // VIN raqami
  createdAt: Date,            // Yaratilgan vaqt
  updatedAt: Date             // O'zgartirilgan vaqt
}
```

### User (Foydalanuvchi)
```javascript
{
  _id: ObjectId,
  name: String,               // "Achmad Valiyev"
  email: String,              // "achmad@avto24.uz"
  phone: String,              // "+998901234567"
  password: String,           // Hifshtirilgan parol
  userType: String,           // "individual" | "dealer" | "admin"
  dealerInfo: {
    companyName: String,      // "AVTO PLUS"
    taxId: String,            // "1234567890"
    verified: Boolean         // Admin tasdiqladi
  },
  avatar: String,             // Avatar rasm URL'i
  bio: String,                // Qisqa biografiya
  address: String,            // Manzili
  region: String,             // "Toshkent"
  isVerified: Boolean,        // Email tekshirildi
  carsListed: [ObjectId],     // Joylashtirilgan avtomobilllar
  favorites: [ObjectId],      // Sevimli avtomobilllar
  rating: Number,             // 1-5 yulduz
  reviews: Number,            // Sharhlar soni
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Avtomobilllar
```
GET    /api/cars                   - Barcha avtomobilllar (pagination)
GET    /api/cars/featured          - Tavsiya etilgan (top 6)
GET    /api/cars/:id               - Avtomobil tafsiloti
POST   /api/cars                   - Yangi e'lon joylash
PUT    /api/cars/:id               - E'lonni yangilash
DELETE /api/cars/:id               - E'lonni o'chirish
POST   /api/cars/:id/like          - Avtomobilni yoqish
```

### Qidiruv
```
GET    /api/search                 - Advanced filter va qidiruv
GET    /api/search/text            - Matn bo'yicha qidiruv
GET    /api/search/options/filters - Filter variantlari
```

### Foydalanuvchilar
```
POST   /api/users/register         - Ro'yxatdan o'tish
POST   /api/users/login            - Tizimga kirish
GET    /api/users/:id              - Profil ma'lumotlari
PUT    /api/users/:id              - Profilni yangilash
POST   /api/users/:id/favorites/:carId    - Sevimlilar qo'shish
DELETE /api/users/:id/favorites/:carId    - Sevimlilardan o'chirish
```

### Kategoriyalar
```
GET    /api/categories             - Barcha kategoriyalar
GET    /api/categories/:id         - Kategoriya bo'yicha avtomobilllar
```

### Statistika
```
GET    /api/stats                  - Umumiy statistika
GET    /api/stats/regions          - Hududlar bo'yicha
GET    /api/stats/payment-types    - To'lov turlari bo'yicha
GET    /api/stats/brands           - Brendlar bo'yicha
```

## 🔐 Avtentifikatsiya

JWT (JSON Web Token) bilan autentifikatsiya:

```javascript
// Login'dan so'ng
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Ali Valiyev",
    "email": "ali@avto24.uz"
  }
}

// API chaqiruvlarida
Authorization: Bearer <token>
```

## 🛡️ Xavfsizlik

- ✅ Parollar bcryptjs bilan hiflashtiriladi
- ✅ JWT tokenlari bilan avtentifikatsiya
- ✅ CORS himoyasi
- ✅ Input validatsiyasi
- ✅ MongoDB injection zamanati

## 📈 To'lov Turlari

| Turi | ID | Tavsifi |
|------|----|---------:|
| Boshlang'ich to'lovsiz ijara | `rent0` | 0% down, oylik to'lov |
| Boshlang'ich to'lov bilan ijara | `rent1` | Kichik down, oylik to'lov |
| Naqd sotib olish | `cash` | 100% to'lov |

## 🌍 Hududlar (Regions)

- Toshkent
- Samarqand
- Buxoro
- Farg'ona
- Andijon
- Navoi
- Surxondarya
- Qashqadarya
- Xorezm
- Karakalpakistan

## 📦 Dependencies

| Package | Versiya | Maqsad |
|---------|---------|--------|
| express | 4.18.2 | Web framework |
| mongoose | 7.0.0 | MongoDB ODM |
| cors | 2.8.5 | CORS middleware |
| jsonwebtoken | 9.0.0 | JWT tokens |
| bcryptjs | 2.4.3 | Password hashing |
| dotenv | 16.0.3 | Environment variables |
| multer | 1.4.5 | File upload |

## 🧪 Testing

```bash
# Backend testing (Postman, cURL, yoki Thunder Client bilan)
npm run dev

# Console'da API test
# -> avto24-home.html'ni ochib, Developer Tools'da test qilish
```

[API_EXAMPLES.md](./API_EXAMPLES.md) faylida barcha test misolları bor.

## 📚 Dokumentatsiya

- [README.md](./README.md) - Backend asosiy dokumentatsiyasi
- [API_EXAMPLES.md](./API_EXAMPLES.md) - API chaqiruv misolları
- [../QUICKSTART.md](../QUICKSTART.md) - Tez boshlash qo'llanmasi
- [../INTEGRATION.md](../INTEGRATION.md) - Frontend-Backend integratsiyasi

## ⚙️ Environment Variables

```env
# .env faylidagi o'zgaruvchilar

MONGODB_URI=mongodb://localhost:27017/avto24
# MongoDB ulanish stringi

PORT=5000
# Server porti

JWT_SECRET=your_secret_key_here
# JWT tokenlari uchun secret key

NODE_ENV=development
# Node.js muhiti (development | production)
```

## 🚀 Production Ready

Loyiha production'ga joylash uchun tayyor:

- [ ] Environment variables o'rnatildi
- [ ] SSL/HTTPS sertifikati
- [ ] Rate limiting qo'shildi
- [ ] Logging konfiguratsiyasi
- [ ] Error monitoring (Sentry, New Relic)
- [ ] Database backups
- [ ] CI/CD pipeline

## 📝 Litsenziya

MIT License

---

**Tayyor! Backend to'liq va production-ready. 🎉**
