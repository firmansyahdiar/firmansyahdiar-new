# Portfolio Website - Diar Firmansyah

Portfolio website profesional untuk Senior Fullstack Developer dengan konsep single-page application (SPA) yang modern, clean, dan mudah di-maintain.

## 🎯 Fitur Utama

- ✅ **Single Page Application** - Semua konten dalam satu halaman yang smooth
- ✅ **Data-Driven** - Semua konten diambil dari JSON, mudah diupdate
- ✅ **Dark Mode** - Support dark/light mode dengan auto-detection system preference
- ✅ **Fully Responsive** - Optimal di semua device (mobile, tablet, desktop)
- ✅ **SEO Optimized** - Meta tags lengkap untuk search engine
- ✅ **Fast Loading** - Minimal dependencies, optimal performance
- ✅ **Modern Design** - Clean, professional, dengan subtle animations

## 📁 Struktur Project

```
portfolio/
├── index.html                 # Main HTML file
├── assets/
│   ├── css/                   # (Reserved untuk custom CSS jika diperlukan)
│   ├── js/
│   │   ├── main.js           # Main application logic
│   │   ├── theme.js          # Dark mode management
│   │   └── render.js         # Data rendering dari JSON
│   ├── data/
│   │   └── portfolio.json    # Data portfolio (SINGLE SOURCE OF TRUTH)
│   └── img/                  # Images & assets
├── plan.md                    # Project planning document
└── README.md                  # Documentation (this file)
```

## 🚀 Quick Start

### 1. Setup

Clone atau download project ini:

```bash
cd portofolio-new
```

### 2. Development

Untuk development, gunakan local server. Pilih salah satu:

**Menggunakan Python:**
```bash
python -m http.server 8000
```

**Menggunakan PHP:**
```bash
php -S localhost:8000
```

**Menggunakan Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Menggunakan VS Code Live Server:**
- Install extension "Live Server"
- Right-click pada `index.html`
- Pilih "Open with Live Server"

### 3. Akses Website

Buka browser dan akses:
```
http://localhost:8000
```

## 📝 Cara Update Konten

Semua konten website ada di file `assets/data/portfolio.json`. Untuk mengupdate:

### Update Profile Information

Edit bagian `profile`:

```json
{
  "profile": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "your@email.com",
    ...
  }
}
```

### Tambah/Edit Skills

Edit bagian `skills`:

```json
{
  "skills": {
    "programmingLanguages": [
      {
        "name": "PHP",
        "level": 95,
        "icon": "devicon-php-plain"
      }
    ],
    ...
  }
}
```

### Tambah Work Experience

Tambahkan item baru di array `experiences`:

```json
{
  "experiences": [
    {
      "company": "Company Name",
      "position": "Your Position",
      "period": "2023 - Present",
      "description": "Job description",
      "technologies": ["Laravel", "React"]
    }
  ]
}
```

### Tambah Projects

Tambahkan item di array `projects`:

```json
{
  "projects": [
    {
      "year": 2025,
      "items": [
        "Project Name 1",
        "Project Name 2"
      ]
    }
  ]
}
```

**Setelah edit JSON, refresh browser untuk melihat perubahan.**

## 🎨 Customization

### Ubah Warna Tema

Edit `tailwind.config` di `index.html`:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: {
                    500: '#your-color',
                    600: '#your-color',
                    // ...
                }
            }
        }
    }
}
```

### Tambah Custom CSS

Buat file `assets/css/custom.css` dan link di `index.html`:

```html
<link rel="stylesheet" href="/assets/css/custom.css">
```

## 🌙 Dark Mode

Dark mode otomatis detect system preference dan menyimpan pilihan user di localStorage.

**Toggle Dark Mode:**
- Klik icon sun/moon di navigation bar
- Auto-sync dengan system preference

**Disable Dark Mode:**
Edit `theme.js` untuk menghapus fitur dark mode jika tidak diperlukan.

## 🔍 SEO Optimization

### Meta Tags

Edit di `portfolio.json` bagian `seo`:

```json
{
  "seo": {
    "title": "Your Title",
    "description": "Your Description",
    "keywords": "keyword1, keyword2",
    "ogImage": "/path/to/image.jpg"
  }
}
```

### Sitemap & robots.txt

Untuk production, tambahkan:

**robots.txt:**
```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

**sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com</loc>
    <lastmod>2025-01-13</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

## 📱 Responsive Design

Website ini fully responsive dengan breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Menggunakan Tailwind CSS responsive utilities (`sm:`, `md:`, `lg:`).

## ⚡ Performance

### Optimization Tips:

1. **Compress Images**
   - Gunakan WebP format
   - Optimize dengan tools seperti TinyPNG
   - Lazy loading untuk images

2. **Minify Files** (untuk production)
   ```bash
   # Minify JS
   npx terser assets/js/main.js -o assets/js/main.min.js
   
   # Minify HTML
   npx html-minifier index.html -o index.min.html
   ```

3. **Enable Caching**
   - Setup cache headers di server
   - Gunakan service worker untuk offline support

4. **CDN**
   - Tailwind CSS sudah dari CDN
   - Font Awesome dari CDN
   - Consider self-hosting untuk production

## 🚀 Deployment

### GitHub Pages

1. Push ke GitHub repository
2. Settings → Pages
3. Source: main branch
4. Save

### Netlify

1. Drag & drop folder ke Netlify
2. Atau connect GitHub repo
3. Deploy otomatis

### Vercel

```bash
npm i -g vercel
vercel
```

### Manual (cPanel, FTP)

1. Upload semua files ke public_html
2. Pastikan index.html di root
3. Set file permissions (644 untuk files, 755 untuk folders)

## 🔧 Troubleshooting

### Data tidak muncul

- Check browser console untuk error
- Pastikan `portfolio.json` valid (gunakan JSONLint)
- Pastikan menggunakan local server (bukan file://)

### Dark mode tidak berfungsi

- Clear browser cache
- Check localStorage di DevTools
- Pastikan `theme.js` loaded

### Layout rusak

- Check browser compatibility
- Clear cache dan hard reload (Ctrl+Shift+R)
- Check console untuk CSS errors

## 📦 Dependencies

Website ini menggunakan CDN untuk semua dependencies:

- **Tailwind CSS**: v3.x (Styling framework)
- **Font Awesome**: v6.4.0 (Icons)
- **Devicon**: Latest (Technology icons)
- **Google Fonts**: Inter (Typography)

Tidak ada build process atau package manager required!

## 🎓 Browser Support

- Chrome/Edge: ✅ Latest 2 versions
- Firefox: ✅ Latest 2 versions
- Safari: ✅ Latest 2 versions
- Mobile browsers: ✅ iOS Safari, Chrome Mobile

## 📈 Lighthouse Scores (Target)

- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

## 🔐 Security

- No backend = No server-side vulnerabilities
- All data static JSON
- No user input forms
- Safe to host on any static hosting

## 📄 License

Personal portfolio project. Feel free to use as template for your own portfolio.

## 👤 Author

**Diar Firmansyah**
- Website: [www.firmansyahdiar.my.id](https://www.firmansyahdiar.my.id)
- Email: firmansyahdiar@gmail.com
- Phone: +62 812-9032-8569

## 🤝 Contributing

Ini adalah portfolio pribadi, tapi saran dan feedback sangat diterima!

## 📞 Support

Jika ada pertanyaan atau butuh bantuan:
- Email: firmansyahdiar@gmail.com
- WhatsApp: +62 812-9032-8569

---

**Built with ❤️ using HTML, Tailwind CSS, and Vanilla JavaScript**

Last Updated: January 2025
