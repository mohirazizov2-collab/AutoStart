# 🤝 Kontribüsyon Qo'llanmasi

AVTO24 loyihasiga hissa qo'shishga xush kelibsiz! Bu qo'llanmada loyihaga qanday qilib hissa qo'shish mumkinligini o'rgatiladi.

## 📋 Boshlashdan Oldin

1. **GitHub akkauntingiz bo'lsin**
2. **Git o'rnatilgan bo'lsin**
3. **Node.js 18+**
4. **Code editor** (VS Code tavsiya etiladi)

## 🍴 Fork va Clone

### 1. Loyihani Fork Qilish
```bash
# GitHub'da "Fork" tugmasini bosing
```

### 2. Repository'ni Clone Qilish
```bash
git clone https://github.com/YOUR-USERNAME/AutoStart.git
cd AutoStart
```

### 3. Upstream Remote'ni Qo'shish
```bash
git remote add upstream https://github.com/mohirazizov2-collab/AutoStart.git
git remote -v
```

## 🌿 Feature Branch Yaratish

```bash
# Main branch'dan update qilish
git fetch upstream
git checkout main
git merge upstream/main

# Feature branch'ni yaratish
git checkout -b feature/yangi-xususiyat

# Masalan:
git checkout -b feature/add-email-verification
git checkout -b fix/search-filter-bug
```

## 💻 Kod Yozish

### Code Style

```javascript
// ✅ Good
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'Foydalanuvchi topilmadi' });
    }
    return user;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// ❌ Bad
const getUserById = userId => {
  var user = User.findById(userId);
  if (user == null) return null;
  return user;
};
```

### Naming Conventions

```javascript
// Constants
const API_BASE_URL = 'http://localhost:5000/api';
const PAYMENT_TYPES = ['rent0', 'rent1', 'cash'];

// Functions
const validateEmail = (email) => {};
const getUserById = async (id) => {};
const isUserVerified = (user) => {};

// Variables
const userName = 'Ali';
const isActive = true;
const carsList = [];

// Classes/Models
class UserService {}
const User = mongoose.model('User', userSchema);
```

### Comments

```javascript
// ✅ Good - meaningful comments
// Check if user has admin privileges before deleting
if (user.role === 'admin') {
  await deleteUser(userId);
}

// ❌ Bad - obvious comments
// Loop through users
users.forEach((user) => {});

// TODO: Implement email verification in the future
// FIXME: This has a memory leak issue
// HACK: Temporary fix, should be refactored
```

## 🧪 Test Qilish

### Backend Testing

```bash
cd backend

# Startni tekshirish
npm run dev

# API'ni test qilish (Postman yoki cURL)
curl http://localhost:5000/api/cars

# Database connection'ni tekshirish
mongo
```

### Validation

```bash
# Code linting (agar configurdsa)
npm run lint

# Tests (agar mavjudsa)
npm test
```

## 📝 Commits

### Commit Message Format

```bash
# Format: <type>: <subject>

# Examples:
git commit -m "feat: add email verification for users"
git commit -m "fix: correct search filter by price range"
git commit -m "docs: update API documentation"
git commit -m "refactor: simplify car validation logic"
git commit -m "style: fix code formatting in auth middleware"
git commit -m "test: add tests for search functionality"

# Types:
# feat:     - yangi xususiyat
# fix:      - xatoni to'g'rilash
# docs:     - dokumentatsiya o'zgarishi
# refactor: - kod rekonstruksiyasi
# style:    - formatting yoki indentation
# test:     - test qo'shish
# chore:    - boshqa o'zgarishlar
```

### Commit Best Practices

```bash
# ✅ Good commits
git commit -m "feat: add pagination to cars list"
git commit -m "fix: resolve CORS issue with frontend"

# ❌ Bad commits
git commit -m "fixed stuff"
git commit -m "updated"
git commit -m "more changes"

# Commit'ni sozlash
git commit --amend --no-edit

# Oxirgi commit'ni o'zgartirish
git rebase -i HEAD~1
```

## 🔄 Pull Request Yaratish

### Step 1: Push Changes
```bash
git push origin feature/yangi-xususiyat
```

### Step 2: GitHub'da PR Ochish
1. GitHub'da repository'ni oching
2. "Pull requests" tabiga o'ting
3. "New pull request" bosing
4. Base: `main`, Compare: `feature/yangi-xususiyat`

### Step 3: PR Description Yozish

```markdown
## 📝 Tavsifi
Bu PR qaysini o'zgartiradi...

## 🔗 Bog'langan Issues
Fixes #123

## 🔄 O'zgarishlari
- [ ] Xususiyat 1
- [ ] Xususiyat 2
- [ ] Bug fix 1

## 🧪 Testing
- [ ] Local'da test qilindi
- [ ] API endpoints ishlaydi
- [ ] Database migration ko'z qoraydi yoki hechqaysiligi

## 📸 Screenshots (agar UI bo'lsa)
[Screenshot'larni qo'shish]

## ✅ Checklist
- [ ] Code style qoidalari bajarildi
- [ ] Yeni dependency'lar `package.json`'ga qo'shildi
- [ ] Environment variables `.env.example`'ga qo'shildi
- [ ] Dokumentatsiya yangilandi
- [ ] Tests yozildi/o'tkazildi
```

## 🔍 Code Review Process

### Maintainers Tekshiradi
- Code quality
- Security issues
- Performance implications
- API design
- Documentation

### O'zingizning Kodi Sharhini Talab Qiling
```markdown
@mohirazizov2-collab Bu PR'ga nazar solishni iloji bor?
```

## 🐛 Bug Reports

Agar bug topilsa:

1. **Check Existing Issues** - allaqachon reportda bormi
2. **Create New Issue**
3. **Tavsif Yozing**:
   - Nima bo'ydi?
   - Qanday takrorlanadi?
   - Kutilgan qanday?

Template:
```markdown
## 🐛 Bug Tavsifi
Qisqa bug tavsiri

## 🔁 Takrorlanish Qadamlari
1. Birinchi qadami
2. Ikkinchi qadami
3. Xato ko'rinadi

## ❌ Kutilgan Behavior
Nima bo'lishi kerakidi

## ✅ Hozirgi Behavior
Hozir nima bo'lyapti

## 📋 Muhit
- OS: [e.g., macOS, Linux, Windows]
- Node: [e.g., 18.0.0]
- Browser: [e.g., Chrome 100]
```

## ✨ Feature Requests

Yangi xususiyat taklif qilish:

```markdown
## ✨ Feature Request
Qisqa tavsif

## 📝 Tafsili
Qanday ishlashi kerak va nima beradi

## 🤔 Alternativlar
Boshqa yechimlar bo'ldimi?

## 📋 Alohida Ma'lumotlar
Boshqa ma'lumotlar
```

## 📚 Dokumentatsiya Hissa

### README'ni Yangilash
```bash
# Main README
nano README.md

# Backend dokumentatsiyasi
nano backend/README.md

# API misollar
nano backend/API_EXAMPLES.md
```

### Dokumentatsiya Style
```markdown
# Sarlavha

Qisqa tavsif

## Subsection

Batafsil tavsif

### Code Example

\`\`\`javascript
const example = () => {};
\`\`\`

### Table

| Column | Description |
|--------|-------------|
| Item   | Value       |
```

## 🎓 Loyiha Strukturasi

```
AutoStart/
├── avto24-home.html       # Frontend
├── backend/               # Node.js API
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── ...
├── README.md             # Main docs
├── QUICKSTART.md         # Quick start
├── INTEGRATION.md        # Frontend-Backend
├── DEPLOYMENT.md         # Deploy guide
└── CONTRIBUTING.md       # This file
```

## 🚀 Qanday Taqdim Etiladi

1. Kod yoziladi
2. Local'da test qilinadi
3. Git'ga push qilinadi
4. Pull request yaratiladi
5. Code review'dan o'tadi
6. Merge qilinadi
7. Main branch'ga chiqadi

## 📌 Qoidalar

1. **Respectful** - Barcha hadisalarni respectful bo'ling
2. **Helpful** - Bir-birini qo'llab-quvvatlang
3. **Honest** - Halol va to'g'ri bo'ling
4. **Testing** - Har doim test qiling
5. **Documentation** - Hamma narsani hujjatlang

## 🎖️ Contributors

Sizning hissa-qo'shishashniz tariexi:

```bash
git log --oneline
git shortlog -sn
```

Barcha kontributorlar [CONTRIBUTORS.md](./CONTRIBUTORS.md)'da qiyd etiladi!

## ❓ Savollar?

- 💬 GitHub Discussions'da so'ring
- 📧 Email: info@avto24.uz
- 🐦 Twitter: @avto24_uz

---

**Hissa qo'shish uchun rahmat! 🙏**

*Har bir hissa muhim. Katta yoki kichik, hamma hissa qabul qilinadi.*
