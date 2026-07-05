# 📑 AVTO24 Loyiha Index — Barcha Fayllar

Backend va Frontend uchun to'liq fayllar ro'yxati va ularning tavsifi.

## 🏠 Loyiha Root

| Fayl | Tavsifi |
|------|---------|
| [README.md](./README.md) | **Asosiy dokumentatsiya** - Loyiha haqida umumiy ma'lumot |
| [QUICKSTART.md](./QUICKSTART.md) | **Tez boshlash** - 5 minutada ishga tushirish |
| [INTEGRATION.md](./INTEGRATION.md) | **Frontend-Backend ulanishi** - HTML va API'ni bog'lash |
| [STRUCTURE.md](./STRUCTURE.md) | **Loyiha strukturi** - Papkalar va fayllar tafsiloti |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | **Cloud'ga joylash** - Heroku, Railway, AWS'ga deploy |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | **Kontribüsyon qo'llanmasi** - Hissa qo'shish uchun |
| [avto24-home.html](./avto24-home.html) | **Frontend** - Asosiy HTML sahifasi, CSS va JavaScript |

---

## 📁 Backend Katalogi (`/backend`)

### Asosiy Fayllar

| Fayl | Tavsifi |
|------|---------|
| [server.js](./backend/server.js) | **Express server** - Loyihaning bosh fayli |
| [package.json](./backend/package.json) | **Dependencies** - npm paketlari va scripts |
| [.env](./backend/.env) | **Environment variables** - Database, JWT, Port |
| [.gitignore](./backend/.gitignore) | **Git ignore** - Qaysi fayllar Git'da saqlmas |
| [Dockerfile](./backend/Dockerfile) | **Docker image** - Container uchun konfiguratsiya |
| [docker-compose.yml](./backend/docker-compose.yml) | **Docker Compose** - MongoDB + Backend'ni birga ishga tushirish |

### Dokumentatsiya

| Fayl | Tavsifi |
|------|---------|
| [README.md](./backend/README.md) | **Backend haqida** - API va konfiguratsiya |
| [API_EXAMPLES.md](./backend/API_EXAMPLES.md) | **API misolları** - cURL va Postman misolları |

### Models (`/models`) - Database Sxemalar

| Fayl | Tavsifi |
|------|---------|
| [Car.js](./backend/models/Car.js) | **Avtomobil modeli** - Avtomobilllarning ma'lumot strukturi |
| [User.js](./backend/models/User.js) | **Foydalanuvchi modeli** - Foydalanuvchilar uchun |

**Fields:**
- **Car**: title, brand, model, year, price, paymentType, region, images, owner...
- **User**: name, email, phone, password, userType, carsListed, favorites...

### Routes (`/routes`) - API Endpoints

| Fayl | Endpoints | Tavsifi |
|------|-----------|---------|
| [cars.js](./backend/routes/cars.js) | `GET/POST/PUT/DELETE /api/cars` | Avtomobilllar bilan ishlash |
| [users.js](./backend/routes/users.js) | `POST /api/users/register`, `POST /api/users/login` | Ro'yxatdan o'tish va kirish |
| [search.js](./backend/routes/search.js) | `GET /api/search` | Qidiruv va filtrlash |
| [categories.js](./backend/routes/categories.js) | `GET /api/categories` | To'lov turlari |
| [stats.js](./backend/routes/stats.js) | `GET /api/stats` | Statistika |

### Middleware (`/middleware`) - Intermediate Logic

| Fayl | Tavsifi |
|------|---------|
| [auth.js](./backend/middleware/auth.js) | **JWT avtentifikatsiya** - Token tekshiruvi |

### Utils (`/utils`) - Yordamchi Funktsiyalar

| Fayl | Tavsifi |
|------|---------|
| [validation.js](./backend/utils/validation.js) | **Input validatsiya** - Ma'lumot tekshiruvi |

**Funktsiyalar:**
- `validateEmail()` - Email'ni tekshirish
- `validatePhone()` - Telefon raqamini tekshirish
- `validateCarData()` - Avtomobil ma'lumotini tekshirish

### Scripts (`/scripts`) - Utility Skriptlar

| Fayl | Tavsifi |
|------|---------|
| [seed.js](./backend/scripts/seed.js) | **Database seeding** - Test ma'lumotlari qo'shish |

**Ishlatish:**
```bash
node scripts/seed.js
```

---

## 📊 Loyiha Architecture

```
Frontend (HTML/CSS/JS)
        ↓ (API Calls)
Express Server
        ↓
Models (Mongoose)
        ↓
MongoDB Database
```

## 🔄 Request Flow

```
1. Frontend: User formasini to'ldiradi
   ↓
2. JavaScript: apiCall() orqali Backend'ga yuboradi
   ↓
3. Backend: routes'da request'ni qabul qiladi
   ↓
4. Models: Mongoose database'ga yozadi
   ↓
5. Response: Frontend'ga JSON'ni qaytaradi
   ↓
6. Frontend: HTML'ni yangilaydi
```

---

## 🗂️ File Organization Best Practices

### Backend
```
backend/
├── models/          # Database schemas
├── routes/          # API endpoints
├── middleware/      # Request/response processing
├── utils/           # Helper functions
├── scripts/         # Utility scripts
├── server.js        # Main entry point
├── package.json
└── .env
```

### Model File (example)
```javascript
// models/Car.js
const schema = new mongoose.Schema({
  // Fields
});
module.exports = mongoose.model('Car', schema);
```

### Route File (example)
```javascript
// routes/cars.js
router.get('/', async (req, res) => {
  // GET /api/cars
});
router.post('/', async (req, res) => {
  // POST /api/cars
});
module.exports = router;
```

---

## 📚 Fayllarni Ko'rish Ordre

### Yangi Loyihani Boshlagandan:
1. [README.md](./README.md) - Loyiha haqida o'qish
2. [QUICKSTART.md](./QUICKSTART.md) - Tez ishga tushirish
3. [backend/README.md](./backend/README.md) - Backend ma'lumoti
4. [backend/API_EXAMPLES.md](./backend/API_EXAMPLES.md) - API misolları

### Backend'ni O'zlashtir:
1. [backend/models/Car.js](./backend/models/Car.js) - Database strukturi
2. [backend/server.js](./backend/server.js) - Server konfiguratsiyasi
3. [backend/routes/cars.js](./backend/routes/cars.js) - API endpoints

### Frontend'ni Ulanish:
1. [INTEGRATION.md](./INTEGRATION.md) - Frontend-Backend ulanishi
2. [avto24-home.html](./avto24-home.html) - Frontend kod

### Deploy'lash:
1. [DEPLOYMENT.md](./DEPLOYMENT.md) - Cloud'ga joylash

### Hissa Qo'shish:
1. [CONTRIBUTING.md](./CONTRIBUTING.md) - Kontribüsyon qo'llanmasi

---

## 🔍 Fayllarni Izlash

### Terminal'da
```bash
# Barcha fayllarni ko'rish
find . -type f

# Faqat JavaScript fayllarini ko'rish
find . -name "*.js"

# Faqat JSON fayllarini ko'rish
find . -name "*.json"

# Dokumentatsiya fayllarini ko'rish
find . -name "*.md"
```

### VS Code'da
```
Ctrl+P (macOS: Cmd+P)
-> Fayl nomini yozing
-> Enter'ni bosing
```

---

## 📈 Loyiha Size

| Kategoriya | Fayllar | Satrlar | Tavsif |
|-----------|---------|---------|--------|
| Backend | 10 | ~800 | API server |
| Frontend | 1 | ~500 | HTML+CSS+JS |
| Docs | 7 | ~1500 | Dokumentatsiya |
| **Jami** | **18** | **~2800** | **Project total** |

---

## 🚀 Keyingi Qadamlar

1. ✅ [QUICKSTART.md](./QUICKSTART.md) bilan boshlang
2. ✅ Backend'ni ishga tushiring (`npm run dev`)
3. ✅ Frontend'ni ochib ko'ring (`avto24-home.html`)
4. ✅ API'ni test qiling (cURL yoki Postman)
5. ✅ Frontend va Backend'ni ulang ([INTEGRATION.md](./INTEGRATION.md))
6. ✅ Production'ga deploy qiling ([DEPLOYMENT.md](./DEPLOYMENT.md))

---

## 📞 Yordam va Savol

**Shuning uchun:**
- Issues: GitHub Issues'da
- Questions: Discussions'da
- Bugs: Bug template'i bilan
- Features: Feature request template'i bilan

---

## 📄 Litsenziya

MIT License - [LICENSE](./LICENSE)

---

**Har bir faylni o'qiy boshqlang va kodingni yozing! 🚀**
