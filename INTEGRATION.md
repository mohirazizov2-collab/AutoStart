# 🔗 Frontend va Backend Integratsiyasi

Frontend (HTML/JS) va Backend (Node.js/Express) larni birlashtirish uchun qo'llanma.

## 📝 Hozirgi HTML Holati

Frontend hozirda:
- ✅ Mock ma'lumotlar bilan static HTML
- ✅ Beautiful UI/UX
- ✅ Responsive design
- ❌ Real API bilan bog'langan emas

## 🔄 Integrasiya Qadamlari

### 1. API Base URL'ni O'rnatish

HTML faylning `<script>` bo'limida, barcha API chaqiruvlarining oldin qo'shish:

```javascript
// API configuration
const API_BASE_URL = 'http://localhost:5000/api';
const API_TIMEOUT = 5000;

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const token = localStorage.getItem('authToken');
  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...defaultOptions,
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
```

### 2. Search Formasi Integratsiyasi

Hozirgi kod:
```javascript
// Mock data (hozirgi)
const cars = [
  {name:"Chevrolet Onix LT", year:2023, type:"rent0", ...}
];
```

Yangi kod:
```javascript
// Backend'dan avtomobilllarni olish
async function loadFeaturedCars() {
  try {
    const response = await apiCall('/cars/featured');
    
    if (response.success) {
      const cars = response.data;
      renderCarCards(cars);
    }
  } catch (error) {
    console.error('Error loading cars:', error);
    // Fallback: mock data yoki error message
  }
}

// Qidiruv formasini ishga tushirish
async function performSearch(formData) {
  try {
    const query = new URLSearchParams({
      brand: formData.brand,
      paymentType: formData.paymentType,
      minPrice: formData.minPrice,
      maxPrice: formData.maxPrice,
      region: formData.region,
      page: 1,
      limit: 12
    });

    const response = await apiCall(`/search?${query}`);
    
    if (response.success) {
      displaySearchResults(response.data);
    }
  } catch (error) {
    console.error('Search error:', error);
  }
}

// Search tugmasi event listener'i
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
  searchBtn.addEventListener('click', async () => {
    const form = document.querySelector('.search-card');
    const formData = {
      brand: form.querySelector('[name="brand"]')?.value,
      paymentType: form.querySelector('[name="paymentType"]')?.value,
      minPrice: form.querySelector('[name="minPrice"]')?.value,
      maxPrice: form.querySelector('[name="maxPrice"]')?.value,
      region: form.querySelector('[name="region"]')?.value
    };
    
    await performSearch(formData);
  });
}
```

### 3. Kategoriyalarni Yuklash

```javascript
// Kategoriyalarni backend'dan olish
async function loadCategories() {
  try {
    const response = await apiCall('/categories');
    
    if (response.success) {
      const categories = response.data;
      
      // Kategoriya grid'ni yangilash
      const catGrid = document.querySelector('.cat-grid');
      catGrid.innerHTML = categories.map((cat, i) => `
        <div class="cat-card ${['amber', 'blue', 'green'][i]} reveal">
          <div class="gauge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <!-- SVG content -->
            </svg>
          </div>
          <h3>${cat.name}</h3>
          <p>${cat.description}</p>
          <span class="tag">${cat.count} ta e'lon →</span>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}
```

### 4. Statistika'ni Yuklash

```javascript
// Statistika backend'dan olish
async function loadStats() {
  try {
    const response = await apiCall('/stats');
    
    if (response.success) {
      const stats = response.data;
      
      // Statistika raqamlarini yangilash
      const statNums = {
        totalListings: stats.totalListings,
        verifiedDealers: stats.verifiedDealers,
        totalTransactions: stats.totalTransactions,
        avgSatisfaction: stats.avgSatisfaction
      };

      document.querySelectorAll('.stat-num').forEach((el, i) => {
        const keys = Object.keys(statNums);
        el.dataset.count = statNums[keys[i]];
        el.textContent = statNums[keys[i]].toLocaleString('en-US');
      });
    }
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}
```

### 5. Avtentifikatsiya (Login/Register)

```javascript
// Ro'yxatdan o'tish
async function register(formData) {
  try {
    const response = await apiCall('/users/register', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      })
    });

    if (response.success) {
      // Token'ni saqlash
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Foydalanuvchini profil sahifasiga yo'naltirish
      window.location.href = '/profile.html';
    }
  } catch (error) {
    console.error('Register error:', error);
  }
}

// Kirish
async function login(email, password) {
  try {
    const response = await apiCall('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (response.success) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Login'dan keyin dashboard'ga o'tish
      window.location.href = '/dashboard.html';
    }
  } catch (error) {
    console.error('Login error:', error);
  }
}

// Log out
function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  window.location.href = '/index.html';
}
```

### 6. Yoqish/Sevimli Funksiyasi

```javascript
// Avtomobilni yoqish
async function likeCAr(carId) {
  try {
    const response = await apiCall(`/cars/${carId}/like`, {
      method: 'POST'
    });

    if (response.success) {
      // Like tugmasini yangilash
      const likeBtn = document.querySelector(`[data-car-id="${carId}"] .fav-btn`);
      if (likeBtn) {
        likeBtn.classList.add('active');
      }
    }
  } catch (error) {
    console.error('Like error:', error);
  }
}

// Sevimlilar ro'yxatiga qo'shish
async function addToFavorites(userId, carId) {
  try {
    const response = await apiCall(`/users/${userId}/favorites/${carId}`, {
      method: 'POST'
    });

    if (response.success) {
      console.log('Added to favorites');
    }
  } catch (error) {
    console.error('Favorites error:', error);
  }
}
```

## 🎯 Integrasiya Checklist

- [ ] API Base URL o'rnatildi
- [ ] `apiCall()` helper function yaratildi
- [ ] Search formasini integrasiya qildi
- [ ] Kategoriyalarni backend'dan yukladi
- [ ] Statistika'ni backend'dan yukladi
- [ ] Avtomobilllar ro'yxatini backend'dan yukladi
- [ ] Avtentifikatsiya (login/register) ishlaydi
- [ ] Yoqish/Sevimli funksiyasi ishlaydi
- [ ] Error handling qo'shildi
- [ ] Loading indicators qo'shildi

## 🚨 CORS Muammosini Hal Qilish

Agar Frontend va Backend boshqa portlarda bo'lsa, CORS xatosi bo'lishi mumkin.

### Backend'da (server.js):
```javascript
const cors = require('cors');

// CORS'ni qo'shish
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8000'],
  credentials: true
}));
```

### Frontend'da (HTML):
```javascript
// API chaqiruvlarida
const response = await fetch(url, {
  method: 'GET',
  credentials: 'include', // Cookies'ni yuborish
  headers: {
    'Content-Type': 'application/json'
  }
});
```

## 📱 Progressive Enhancement

1. **Boshlang'ich**: Static mock data bilan ishga tushadi
2. **Integratsiya**: Real API'ga ulanadi
3. **Optimization**: Caching, loading states va'zb.

## 📊 Testing

```javascript
// Console'da test qilish
async function testAPI() {
  try {
    // Test 1: Statistika
    const stats = await apiCall('/stats');
    console.log('Stats:', stats);

    // Test 2: Avtomobilllar
    const cars = await apiCall('/cars?page=1&limit=6');
    console.log('Cars:', cars);

    // Test 3: Search
    const search = await apiCall('/search?brand=Toyota');
    console.log('Search:', search);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Ishga tushirish
testAPI();
```

## 🎨 UI/UX Improvements

### Loading State:
```html
<div class="loading-spinner">
  <div class="spinner"></div>
  <p>Yuklanmoqda...</p>
</div>
```

### Error Messages:
```html
<div class="error-message" style="display: none;">
  <p id="error-text"></p>
</div>
```

### CSS:
```css
.loading-spinner {
  text-align: center;
  padding: 40px 20px;
}

.spinner {
  border: 3px solid rgba(255, 176, 32, 0.2);
  border-top: 3px solid var(--headlight-500);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  background: rgba(255, 0, 0, 0.1);
  border-left: 4px solid red;
  padding: 15px;
  margin: 20px 0;
  border-radius: 4px;
}
```

## ✅ Tayyor!

Endi Frontend va Backend to'liq integrasiyalashgan. Hammasi ishlaydi! 🎉
