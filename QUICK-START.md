# 🚀 QUICK START GUIDE

## Step 1: Start Local Server

Buka terminal dan jalankan salah satu command:

### Option A: Python (Recommended)
```bash
cd /Users/diarfirmansyah/Documents/portofolio-new
python -m http.server 8000
```

### Option B: PHP
```bash
cd /Users/diarfirmansyah/Documents/portofolio-new
php -S localhost:8000
```

### Option C: Node.js
```bash
cd /Users/diarfirmansyah/Documents/portofolio-new
npx http-server -p 8000
```

### Option D: VS Code Live Server
1. Install extension "Live Server"
2. Right-click `index.html`
3. Select "Open with Live Server"

---

## Step 2: Open in Browser

Visit: **http://localhost:8000**

---

## Step 3: Test Setup (Optional)

Visit: **http://localhost:8000/test.html**

Halaman ini akan:
- ✅ Check all files
- ✅ Verify setup
- ✅ Show next steps

---

## 📝 Quick Edit Guide

### Update Your Info

Edit file: `assets/data/portfolio.json`

**Change Name:**
```json
"profile": {
  "name": "Your Name Here",
  ...
}
```

**Change Email:**
```json
"profile": {
  "email": "your@email.com",
  ...
}
```

**Add Skill:**
```json
"programmingLanguages": [
  {
    "name": "New Language",
    "level": 90,
    "icon": "devicon-language-plain"
  }
]
```

**Save → Refresh Browser → Done!**

---

## 🎨 Add Your Photo

1. Place photo in: `assets/img/avatar.jpg`
2. Recommended size: 400x400px
3. Refresh browser

---

## 🌙 Toggle Dark Mode

Click sun/moon icon in navigation bar

---

## 📱 Test Responsive

- Desktop: Default view
- Tablet: Resize browser to ~768px
- Mobile: Resize browser to ~400px

Or use browser DevTools (F12) → Toggle device toolbar

---

## ✅ Checklist Before Deploy

- [ ] Update all personal info in portfolio.json
- [ ] Add your photo (optional)
- [ ] Test all sections
- [ ] Test dark mode
- [ ] Test on mobile
- [ ] Check all links work
- [ ] Verify email/phone numbers

---

## 🚀 Deploy

### GitHub Pages (FREE)
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

Then enable GitHub Pages in repository settings.

### Netlify (FREE)
Just drag & drop the entire folder to netlify.com

### cPanel/FTP
Upload all files to public_html folder

---

## 📞 Need Help?

Read the full documentation: **README.md**

Or contact:
- Email: firmansyahdiar@gmail.com
- Phone: +62 812-9032-8569

---

**That's it! Enjoy your portfolio! 🎉**





python3 -m http.server 8000