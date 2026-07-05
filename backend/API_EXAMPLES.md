# AVTO24 API Testing Examples

## Base URL
```
http://localhost:5000/api
```

## 1. FOYDALANUVCHI REGISTRATSIYASI

### Request
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ali Valiyev",
    "email": "ali@example.com",
    "phone": "+998901234567",
    "password": "password123",
    "userType": "individual"
  }'
```

### Response
```json
{
  "success": true,
  "message": "Ro'yxatdan o'tish muvaffaqiyatli",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Ali Valiyev",
    "email": "ali@example.com",
    "userType": "individual"
  }
}
```

---

## 2. FOYDALANUVCHI KIRISHI

### Request
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ali@example.com",
    "password": "password123"
  }'
```

### Response
```json
{
  "success": true,
  "message": "Tizimga kirish muvaffaqiyatli",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Ali Valiyev",
    "email": "ali@example.com",
    "rating": 5
  }
}
```

---

## 3. AVTOMOBILLLARNI OLISH (Pagination bilan)

### Request
```bash
curl -X GET "http://localhost:5000/api/cars?page=1&limit=12"
```

### Response
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Chevrolet Onix LT",
      "brand": "Chevrolet",
      "model": "Onix",
      "year": 2023,
      "price": 1890000,
      "paymentType": "rent0",
      "region": "Toshkent",
      "views": 1250,
      "likes": 245,
      "owner": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Achmad",
        "rating": 4.8
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 124,
    "pages": 11
  }
}
```

---

## 4. TAVSIYA ETILGAN AVTOMOBILLLAR

### Request
```bash
curl -X GET "http://localhost:5000/api/cars/featured"
```

### Response
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Toyota Camry 70",
      "brand": "Toyota",
      "year": 2021,
      "price": 398000000,
      "paymentType": "cash",
      "views": 3421,
      "likes": 523
    }
  ]
}
```

---

## 5. AVTOMOBILDNI QIDIRISH VA FILTRLASH

### Request
```bash
curl -X GET "http://localhost:5000/api/search?brand=Chevrolet&paymentType=rent0&minPrice=1000000&maxPrice=3000000&region=Toshkent&page=1&limit=12"
```

### Response
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Chevrolet Onix LT",
      "brand": "Chevrolet",
      "price": 1890000,
      "region": "Toshkent"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 5,
    "pages": 1
  }
}
```

---

## 6. MATN QIDIRISHI

### Request
```bash
curl -X GET "http://localhost:5000/api/search/text?q=Camry&page=1&limit=12"
```

### Response
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Toyota Camry 70",
      "description": "Premium Camry, butun xizmat ko'rish tarihli.",
      "score": 15.7
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 2,
    "pages": 1
  }
}
```

---

## 7. FILTER VARIANTLARINI OLISH

### Request
```bash
curl -X GET "http://localhost:5000/api/search/options/filters"
```

### Response
```json
{
  "success": true,
  "data": {
    "brands": [
      "BYD",
      "Chevrolet",
      "Hyundai",
      "Kia",
      "Toyota"
    ],
    "regions": [
      "Buxoro",
      "Farg'ona",
      "Samarqand",
      "Toshkent"
    ],
    "transmissions": [
      "Avtomat",
      "Avtomat (EV)",
      "Mexanika"
    ],
    "priceRange": {
      "minPrice": 1890000,
      "maxPrice": 398000000
    }
  }
}
```

---

## 8. YANGI AVTOMOBIL E'LONI JOYLASH

### Request
```bash
curl -X POST http://localhost:5000/api/cars \
  -H "Content-Type: application/json" \
  -d '{
    "title": "BMW X5 2024",
    "brand": "BMW",
    "model": "X5",
    "year": 2024,
    "price": 450000000,
    "paymentType": "cash",
    "mileage": 500,
    "transmission": "Avtomat",
    "region": "Toshkent",
    "category": "SUV",
    "condition": "Yangi",
    "description": "Yangi BMW X5, barcha gadjetlari bilan"
  }'
```

### Response
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439999",
    "title": "BMW X5 2024",
    "brand": "BMW",
    "verified": false
  },
  "message": "E'lon muvaffaqiyatli joylashtirildi"
}
```

---

## 9. KATEGORIYALARNI OLISH

### Request
```bash
curl -X GET "http://localhost:5000/api/categories"
```

### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "rent0",
      "name": "Boshlang'ich to'lovsiz ijara",
      "count": 1250,
      "description": "0 so'm boshlang'ich to'lov"
    },
    {
      "id": "rent1",
      "name": "Boshlang'ich to'lov bilan ijara",
      "count": 5810,
      "description": "Kichik boshlang'ich to'lov"
    },
    {
      "id": "cash",
      "name": "Naqd sotib olish",
      "count": 3380,
      "description": "To'liq to'lov"
    }
  ]
}
```

---

## 10. STATISTIKA OLISH

### Request
```bash
curl -X GET "http://localhost:5000/api/stats"
```

### Response
```json
{
  "success": true,
  "data": {
    "totalListings": 12430,
    "verifiedDealers": 860,
    "totalTransactions": 41200,
    "avgSatisfaction": 98
  }
}
```

---

## 11. HUDUDLAR BO'YICHA STATISTIKA

### Request
```bash
curl -X GET "http://localhost:5000/api/stats/regions"
```

### Response
```json
{
  "success": true,
  "data": [
    {
      "_id": "Toshkent",
      "count": 8950,
      "avgPrice": 185000000
    },
    {
      "_id": "Samarqand",
      "count": 1240,
      "avgPrice": 120000000
    }
  ]
}
```

---

## 12. PROFIL MA'LUMOTLARINI OLISH

### Request
```bash
curl -X GET "http://localhost:5000/api/users/507f1f77bcf86cd799439011"
```

### Response
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Achmad",
    "email": "achmad@avto24.uz",
    "phone": "+998901234567",
    "userType": "dealer",
    "rating": 4.8,
    "reviews": 125,
    "carsListed": [...]
  }
}
```

---

## 13. SEVIMLILAR RO'YXATIGA QO'SHISH

### Request
```bash
curl -X POST "http://localhost:5000/api/users/507f1f77bcf86cd799439011/favorites/507f1f77bcf86cd799439012"
```

### Response
```json
{
  "success": true,
  "message": "Sevimlilar ro'yxatiga qo'shildi"
}
```

---

## Postman Collection

Hamma endpoint'larni Postman'da test qilish uchun, quyidagi JSON'ni `Environment` sifatida import qiling:

```json
{
  "variables": [
    {
      "key": "BASE_URL",
      "value": "http://localhost:5000/api",
      "type": "default"
    },
    {
      "key": "TOKEN",
      "value": "",
      "type": "default"
    },
    {
      "key": "USER_ID",
      "value": "",
      "type": "default"
    },
    {
      "key": "CAR_ID",
      "value": "",
      "type": "default"
    }
  ]
}
```

---

## Xatolar va Javoblar

### Muvaffaqiyatli Response
```json
{
  "success": true,
  "data": {},
  "message": "Amaliyot muvaffaqiyatli"
}
```

### Xato Response
```json
{
  "success": false,
  "error": "Xatoning tavsifi"
}
```

### HTTP Status Kodlari
- `200` - Muvaffaqiyatli
- `201` - Yaratildi
- `400` - Noto'g'ri so'rov
- `401` - Avtentifikatsiya talab qilinadi
- `404` - Topilmadi
- `500` - Server xatosi
