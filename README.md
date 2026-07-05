# AVTO24 — Yangi avlod avtomobil bozori

O'zbekistondagi eng shaffof avtomobil bozori. Ijara, boshlang'ich to'lov bilan ijara va naqd sotib olish bir joyda.

## 📁 Loyiha Strukturi

```
AutoStart/
├── avto24-home.html          # Frontend asosiy sahifasi
├── backend/                  # Node.js + Express backend
│   ├── models/              # MongoDB sxemalar
│   │   ├── Car.js
│   │   └── User.js
│   ├── routes/              # API yo'llar
│   │   ├── cars.js
│   │   ├── users.js
│   │   ├── categories.js
│   │   ├── stats.js
│   │   └── search.js
│   ├── middleware/          # Express middleware
│   │   └── auth.js
│   ├── utils/              # Yordamchi funktsiyalar
│   │   └── validation.js
│   ├── scripts/            # Tizim skriptlari
│   │   └── seed.js
│   ├── server.js           # Asosiy server fayli
│   ├── package.json
│   ├── .env
│   ├── .gitignore
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── README.md
└── README.md
```

## 🚀 Ishga Tushirish

### Frontend

Shunchaki `avto24-home.html` faylni brauzerni ochib shu faylni kiriting.

### Backend

#### Lokalni o'rnatish

1. Backend direktoriyasiga o'ting:
```bash
cd backend
```

2. Bog'lanishlarni o'rnating:
```bash
npm install
```

3. `.env` faylini yaratib konfiguratsiya qiling:
```
MONGODB_URI=mongodb://localhost:27017/avto24
PORT=5000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Lokalni MongoDB ishga tushiring (yoki cloud bo'lsa MongoDB Atlas foydalaning)

5. Serverni ishga tushiring:
```bash
npm run dev
```

Server `http://localhost:5000` da ishga tushadi.

#### Docker bilan

```bash
cd backend
docker-compose up
```

Bu MongoDB va backend'ni avtomatik ishga tushiradi.

## 📚 API Dokumentatsiya

### Avtomobilllar
- **GET** `/api/cars` - Barcha avtomobilllar
- **GET** `/api/cars/featured` - Tavsiya etilgan
- **GET** `/api/cars/:id` - Avtomobil tafsiloti
- **POST** `/api/cars` - Yangi e'lon
- **PUT** `/api/cars/:id` - E'lonni yangilash
- **DELETE** `/api/cars/:id` - E'lonni o'chirish

### Qidiruv
- **GET** `/api/search` - Advanced qidiruv
- **GET** `/api/search/text` - Matn qidirishi
- **GET** `/api/search/options/filters` - Filter variantlari

### Foydalanuvchilar
- **POST** `/api/users/register` - Ro'yxatdan o'tish
- **POST** `/api/users/login` - Kirish
- **GET** `/api/users/:id` - Profil
- **PUT** `/api/users/:id` - Profilni yangilash
- **POST** `/api/users/:id/favorites/:carId` - Sevimlilar

### Kategoriyalar
- **GET** `/api/categories` - Barcha kategoriyalar
- **GET** `/api/categories/:id` - Kategoriya avtomobilllar

### Statistika
- **GET** `/api/stats` - Umumiy statistika
- **GET** `/api/stats/regions` - Hududlar bo'yicha
- **GET** `/api/stats/payment-types` - To'lov turlari
- **GET** `/api/stats/brands` - Brendlar

## 🛠️ Texnologiyalar

### Frontend
- HTML5
- CSS3 (Modern design)
- JavaScript (Vanilla)
- Responsive design

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📝 To'lov Turlari

1. **Boshlang'ich to'lovsiz ijara (rent0)**
   - 0 so'm boshlang'ich to'lov
   - Oylik to'lov bilan to'lanadi
   - 3+ yil muddati

2. **Boshlang'ich to'lov bilan ijara (rent1)**
   - Kichik boshlang'ich to'lov
   - Oylik to'lov bilan sekin-asta to'lanadi
   - 2-3 yil muddati

3. **Naqd sotib olish (cash)**
   - To'liq to'lov
   - Avtomobil darhol sizniki
   - Hujjatlar shu kuni rasmiylashtiriladi

## 📊 Statistika

- 12,000+ tasdiqlangan e'lon
- 860+ tasdiqlangan dilerlar
- 41,000+ muvaffaqiyatli bitimlar
- 98% mijozlar mamnunlik

## 🔐 Xavfsizlik

- JWT tokenlar bilan autentifikatsiya
- Parollar bcrypt bilan hiflashtiriladi
- CORS himoyasi
- Input validatsiyasi

## 📦 Deployment

### Vercel (Frontend)
```bash
vercel deploy
```

### Heroku/Railway (Backend)
```bash
git push heroku main
```

## 🤝 Hissa Qo'shish

Loyihaga hissa qo'shishni taklif qilamiz. Qanday qilib:

1. Branchni yarating (`git checkout -b feature/yangi-xususiyat`)
2. O'zgarishlarga commit qiling (`git commit -m 'Yangi xususiyat qo'shildi'`)
3. Branchga push qiling (`git push origin feature/yangi-xususiyat`)
4. Pull Request ochish

## 📄 Litsenziya

MIT License - Tekshiring [LICENSE](LICENSE) faylini

## 📞 Aloqa

- Email: info@avto24.uz
- Phone: +998 (90) XXX-XX-XX
- Website: www.avto24.uz

---

**AVTO24** — Avtomobilga ega bo'lishning to'g'ri yo'li! 🚗