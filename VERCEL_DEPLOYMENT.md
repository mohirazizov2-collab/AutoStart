# ✨ Vercel'da Deploy Qilish — Qo'llanma

AVTO24 loyihasini Vercel'da joylashtirish uchun qadamlarni bajaring.

## 📋 Deploy'dan Oldin

- [ ] GitHub'da push qiling
- [ ] `.env` fayli `.gitignore`'da bor
- [ ] MongoDB URI tayyor
- [ ] JWT Secret Key tayyor

## 🚀 Deploy Qilish Qadamlari

### 1️⃣ GitHub Bilan Vercel'ni Ulanish

```bash
1. https://vercel.com/ ga o'ting
2. GitHub bilan login qiling (yoki ro'yxatdan o'ting)
3. "Import Project" tugmasini bosing
```

### 2️⃣ Repository'ni Tanlang

```
- GitHub'da "mohirazizov2-collab/AutoStart" repository'ni tanlang
- Vercel avtomatik joylashtiradi
```

### 3️⃣ Environment Variables Qo'shing

Vercel dashboard'da **Settings → Environment Variables** ga o'ting va quyidagilarni qo'shing:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/avto24
JWT_SECRET=your_very_secure_secret_key_here_12345
NODE_ENV=production
```

### 4️⃣ Deploy Qiling

```
- "Deploy" tugmasini bosing
- Vercel loyihani avtomatik build qiladi va joylashtiradi
- URL siz oldingizga chiqadi (masalan: https://avto24.vercel.app)
```

## 📦 MongoDB Sozlash (Agar yangi bo'lsa)

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) ga o'ting
2. Free cluster yarating
3. Connection string nusxalang va Vercel'da `MONGODB_URI` o'rnatang

## 🔑 JWT Secret Key Yarating

```bash
# Terminal'da:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Bu chiqgan qiymatni Vercel'da `JWT_SECRET` sifatida o'rnatang.

## ✅ Test Qilish

Deploy bo'lgandan so'ng:

```bash
1. https://avto24.vercel.app ga o'ting
2. API test qilish: https://avto24.vercel.app/api/cars
3. Barcha routes ishlayapti yo'qligini tekshiring
```

## 🆘 Muammo bo'lsa

### 1. 404 Xatosi
- `vercel.json` faylini tekshiring
- `api/index.js` mavjudligini tekshiring

### 2. Database ulanmaydi
- `MONGODB_URI` to'g'ri o'rnatilganini tekshiring
- MongoDB IP allowlist'ga Vercel IP'ni qo'shing:
  - MongoDB Atlas → Network Access → 0.0.0.0/0 qo'shing

### 3. CORS Xatosi
- Backend'da `cors` o'rnatilganini tekshiring
- `vercel.json`'da CORS headers qo'shish kerak bo'lishi mumkin

## 📝 Deployment History

Vercel dashboard'da barcha deploy bo'lgan versiyalarni ko'rishingiz mumkin va kerak bo'lsa eski versiyalarga qaytishingiz mumkin.

---

**Tavsiya:** Vercel Hobby plan'i bepul va production'da ishlatish mumkin!
