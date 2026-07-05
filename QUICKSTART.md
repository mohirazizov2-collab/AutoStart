# 🚀 Tez Boshlash (Quick Start)

AVTO24 loyihasini tez boshlash uchun quyidagi qadam-qadam ko'rsatmalarni bajaring.

## 📋 Talablar

- Node.js 18.x yoki yuqori
- MongoDB (lokal yoki MongoDB Atlas bulutli)
- npm yoki yarn
- Postman (API test qilish uchun ixtiyoriy)

## 1️⃣ Backend'ni O'rnatish

### Step 1: Backend direktoriyasiga o'ting
```bash
cd backend
```

### Step 2: Dependencies o'rnating
```bash
npm install
```

### Step 3: Environment file yaratish
```bash
cp .env.example .env
```

Yoki `.env` faylini qo'lda yaratib quyidagilarni kiriting:
```env
MONGODB_URI=mongodb://localhost:27017/avto24
PORT=5000
JWT_SECRET=your_secret_key_here_change_later
NODE_ENV=development
```

### Step 4: MongoDB ni ishga tushiring (agar lokal bo'lsa)
```bash
# macOS bilan
brew services start mongodb-community

# Linux bilan
sudo systemctl start mongod

# Yoki Docker bilan
docker run -d -p 27017:27017 --name mongodb mongo:6.0
```

### Step 5: Database'ni sample ma'lumotlar bilan to'ldirish
```bash
node scripts/seed.js
```

### Step 6: Backend'ni ishga tushiring
```bash
npm run dev
```

✅ Server `http://localhost:5000` da ishga tushadi

---

## 2️⃣ Frontend'ni Ochish

Shunchaki `avto24-home.html` faylini brauzerde ochib shu:

```bash
# Yo'l 1: Faylni bevosita ochish
open avto24-home.html

# Yo'l 2: Live server'da (VS Code'da)
# Extensions'dan Live Server'ni o'rnating
# Keyin avto24-home.html'da o'ng-click → "Open with Live Server"
```

---

## 3️⃣ API ni Test Qilish

### cURL bilan

```bash
# Barcha avtomobilllarni olish
curl http://localhost:5000/api/cars

# Statistika olish
curl http://localhost:5000/api/stats

# Registratsiya
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"+998901234567","password":"password123"}'
```

### Postman bilan

1. Postman'ni oching
2. `+ New Request` bosing
3. URL: `http://localhost:5000/api/cars`
4. Method: `GET`
5. Send'ni bosing

[API Examples](./API_EXAMPLES.md) faylida ko'proq misollar mavjud.

---

## 🐳 Docker bilan Ishga Tushirish

Agar Docker o'rnatilgan bo'lsa:

```bash
cd backend
docker-compose up
```

Bu quyidagilarni avtomatik ishga tushiradi:
- MongoDB container
- Backend server
- Barcha bog'lanishlar

---

## 🔍 Tekshirish va Debug

### 1. Server ko'z qoraydi yoki vaqt belgi beradi?
```bash
# Loglarni ko'ring
npm run dev

# Agar "Cannot find module" xato'i bolsa
npm install
```

### 2. MongoDB'ga ulana oladimi?
```bash
# MongoDB'ni tekshiring
mongo
# yoki
mongosh
```

Agar ulana olmasa:
- MongoDB'ni o'rnatganingizni tekshiring
- `.env`'da MONGODB_URI to'g'ri ekanligini tekshiring

### 3. Port 5000 band ekanmi?
```bash
# Port'ni o'zgartiring .env'da
PORT=5001
```

---

## 📁 Loyiha Strukturi

```
backend/
├── models/           # Database models
├── routes/           # API endpoints
├── middleware/       # Express middleware
├── utils/            # Helper functions
├── scripts/          # Utility scripts (seed, migration)
├── server.js         # Main server file
├── package.json
└── .env              # Environment variables
```

---

## 📚 Keyingi Qadamlar

### 1. Frontend va Backend'ni Ulanish
[integration.md](./integration.md) faylni ko'ring

### 2. API Reference
[API_EXAMPLES.md](./API_EXAMPLES.md) faylda barcha endpoint'lar bor

### 3. Deployment
[DEPLOYMENT.md](./DEPLOYMENT.md) faylda cloud'ga joylash ko'rsatmalari bor

---

## 🆘 Muammolar va Yechimlar

| Muammo | Yechim |
|--------|--------|
| "Cannot find module 'express'" | `npm install` ni qayta bosing |
| "MongoDB connection failed" | MongoDB'ni ishga tushiring yoki `.env`'ni tekshiring |
| "Port 5000 already in use" | `.env`'da boshqa port belgilang |
| "JWT error" | `.env`'da JWT_SECRET to'g'ri ekanligini tekshiring |

---

## 📞 Yordam

Qo'shimcha yordam uchun:
- [README.md](./README.md) - Loyiha haqida
- [backend/README.md](./README.md) - Backend tafsiloti
- Issues: GitHub'da issue ochib aytib bering

---

**Tayyor bo'lasiz! 🎉 Backend va Frontend'ni ishga tushirish uchun tayyor.**
