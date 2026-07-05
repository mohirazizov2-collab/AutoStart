# 🌐 Deployment — Cloud'ga Joylash

AVTO24 loyihasini Heroku, Railway, AWS, Vercel va boshqa platformalarda joylashtirish qo'llanmasi.

## 📋 Deploy'dan Oldin

- [ ] `node_modules` papkasi `.gitignore`'da bor
- [ ] `.env` faylidagi sensitive ma'lumotlar `.gitignore`'da bor
- [ ] Barcha testlar o'tkazildi
- [ ] Git repository'si elon etilgan

## 🚀 Option 1: Railway.app (Tavsiya Etiladi)

Railway — eng oson va eng arzon variant!

### Step 1: GitHub'da Login
1. [railway.app](https://railway.app) ga o'ting
2. GitHub bilan login qiling

### Step 2: Repository'ni Connect Qiling
1. "New Project" bosing
2. GitHub'dan repository'ni tanlang
3. `backend` folder'ni root sifatida belgilang

### Step 3: Environment Variables
1. "Variables" tabiga o'ting
2. Quyidagilarni qo'shing:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/avto24
JWT_SECRET=your_strong_secret_key_here_12345
NODE_ENV=production
PORT=3000
```

### Step 4: MongoDB Cloud Database
1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) ga o'ting
2. Free tier cluster yaratish
3. Connection string'ni copy qiling

### Step 5: Deploy
```bash
# Railway CLI o'rnatish (ixtiyoriy)
npm install -g @railway/cli

# Deploy
railway up
```

✅ Server shunchaki deploy'lanadi!

---

## 🚀 Option 2: Heroku

### Step 1: Heroku CLI O'rnatish
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh

# Windows
# https://devcenter.heroku.com/articles/heroku-cli#download-and-install
```

### Step 2: Login
```bash
heroku login
# Browser'da login qiling
```

### Step 3: App Yaratish
```bash
cd backend
heroku create avto24-api
```

### Step 4: Environment Variables
```bash
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production
```

### Step 5: Deploy
```bash
git push heroku main
```

### Monitor
```bash
# Loglarni ko'rish
heroku logs --tail

# Status
heroku status
```

---

## 🚀 Option 3: Vercel (Frontend)

Frontend'ni Vercel'da joylashtirish:

### Step 1: Vercel'ga Login
```bash
npm i -g vercel
vercel login
```

### Step 2: Deploy
```bash
cd ..  # Root directory
vercel --prod
```

### Step 3: Environment Variable
1. Vercel Dashboard'ga o'ting
2. Project Settings → Environment Variables
3. `REACT_APP_API_URL` qo'shish (agar React bo'lsa)

---

## 🚀 Option 4: AWS EC2

### Step 1: EC2 Instance Yaratish
1. AWS Console'ga login
2. EC2 Dashboard'ga o'ting
3. "Launch Instance" bosing
4. Ubuntu 22.04 LTS tanlang
5. t2.micro (free tier) tanlang

### Step 2: Security Groups
1. Port 80 (HTTP)
2. Port 443 (HTTPS)
3. Port 5000 (API) qo'shish

### Step 3: Instance'ga Connect
```bash
# Tayanch fayli'ni download qilish kerak
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@your-instance-ip
```

### Step 4: Server Konfiguratsiyasi
```bash
# Update
sudo apt update && sudo apt upgrade -y

# Node.js o'rnatish
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# MongoDB o'rnatish
sudo apt install -y mongodb

# MongoDB ishga tushirish
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Project'ni clone qilish
git clone https://github.com/your-username/AutoStart.git
cd AutoStart/backend

# Dependencies
npm install

# PM2 o'rnatish (server'ni background'da tutish)
sudo npm install -g pm2

# Server'ni ishga tushirish
pm2 start server.js --name "avto24"
pm2 save
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
```

### Step 5: Nginx konfiguratsiyasi
```bash
sudo apt install -y nginx

# Nginx config yaratish
sudo nano /etc/nginx/sites-available/avto24
```

Ichiga quyidagilarni yozing:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Nginx'ni qayta ishga tushirish
sudo systemctl restart nginx

# SSL sertifikati (Let's Encrypt)
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 🚀 Option 5: Docker Hub + Docker Compose

### Step 1: Docker Image Yaratish
```bash
cd backend

# Docker Hub'da login
docker login

# Image yaratish
docker build -t your-docker-username/avto24-backend:latest .

# Push qilish
docker push your-docker-username/avto24-backend:latest
```

### Step 2: Deploy Server'da
```bash
# Server'da Docker o'rnatilgan bo'lishi kerak
docker pull your-docker-username/avto24-backend:latest

# .env fayli yaratish
cat > .env << EOF
MONGODB_URI=mongodb://mongo:27017/avto24
JWT_SECRET=your_secret
NODE_ENV=production
EOF

# Docker Compose'ni yangilash
docker-compose up -d
```

---

## 📱 Frontend Deployment (Separate)

### Vercel bilan
```bash
npm install -g vercel
cd ..
vercel --prod
```

### Netlify bilan
```bash
npm install -g netlify-cli
netlify deploy --dir=. --prod
```

---

## 🔗 Domain va SSL

### 1. Domain Sotib Olish
- Godaddy.com
- Namecheap.com
- Domain.com

### 2. DNS Sozlash
API server'iga:
```
Type: A Record
Name: api
Value: your-server-ip
```

Frontend'ga:
```
Type: CNAME
Name: www
Value: your-vercel-domain.vercel.app
```

### 3. SSL Sertifikati
```bash
# Let's Encrypt (free)
sudo certbot --nginx -d api.avto24.uz

# AWS Certificate Manager (free)
# Heroku (automatic)
```

---

## 📊 Monitoring va Analytics

### Server Monitoring
```bash
# PM2 Plus (free tier)
pm2 plus
```

### Error Tracking
```bash
npm install @sentry/node
```

Backend'da:
```javascript
const Sentry = require("@sentry/node");
Sentry.init({ dsn: "your-sentry-dsn" });
app.use(Sentry.Handlers.errorHandler());
```

### Logging
```bash
npm install winston
```

---

## ✅ Post-Deployment Checklist

- [ ] Server to'liq ishga tushdi
- [ ] API endpoints ishlaydi (`/api/cars`, `/api/stats`)
- [ ] Database'ga ulanish muvaffaqiyatli
- [ ] JWT autentifikatsiyasi ishlaydi
- [ ] CORS qo'shilgan
- [ ] Environment variables o'rnatilgan
- [ ] SSL sertifikati o'rnatilgan
- [ ] Email notifications sozlandi
- [ ] Backup sistema o'rnatilgan
- [ ] Monitoring active

---

## 🐛 Troubleshooting

### "Cannot connect to database"
```bash
# MongoDB URI'ni tekshiring
# MongoDB Atlas'da IP address whitelist qilish
```

### "Port already in use"
```bash
# PORT environment variable'ni o'zgartiring
PORT=3000 npm start
```

### "CORS error"
```javascript
// server.js'da CORS'ni tekshiring
const cors = require('cors');
app.use(cors({
  origin: ['https://your-domain.com'],
  credentials: true
}));
```

### "Deployment timeout"
```bash
# Heroku timeout - build time'ni increase qilish
heroku config:set BUILDPACK_RETRY_TIMEOUT=600
```

---

## 📞 Support

- **Railway Support**: [docs.railway.app](https://docs.railway.app)
- **Heroku Support**: [devcenter.heroku.com](https://devcenter.heroku.com)
- **AWS Support**: [aws.amazon.com/support](https://aws.amazon.com/support)
- **MongoDB Support**: [docs.mongodb.com](https://docs.mongodb.com)

---

**Deploy'lash muvaffaqiyatli bo'ldi! 🎉**
