Saya adalah seorang Senior Fullstack Developer dengan pengalaman lebih dari 10 tahun.

Saya akan MELAMPIRKAN file PDF portfolio/CV saya pada prompt ini.
KAMU WAJIB:
- Membaca file PDF tersebut
- Mengekstrak data asli dari PDF
- Menggunakan PDF sebagai sumber data utama
- TIDAK membuat asumsi atau placeholder yang tidak ada di PDF

================================================================
TUJUAN UTAMA
================================================================
Saya ingin kamu membuatkan website portfolio pribadi berbasis HTML + Tailwind CSS
dengan konsep SINGLE PAGE (1 halaman).

Website harus:
- Profesional
- Modern
- Clean
- Mudah di-maintain
- Siap produksi

================================================================
SUMBER DATA (SANGAT PENTING)
================================================================
- File PDF portfolio yang saya upload adalah SINGLE SOURCE OF TRUTH
- Data berikut WAJIB diambil dari PDF:
  - Profile & biodata
  - About me
  - Skills & expertise
  - Work experience
  - Project & portfolio
  - Clients / institutions
  - Contact info
- Jika ada data yang tidak tersedia di PDF, kosongkan atau beri komentar TODO
- Jangan mengarang data baru

================================================================
TEKNOLOGI
================================================================
- HTML5 semantic
- Tailwind CSS
- Vanilla JavaScript
- Tanpa React / Vue
- Tanpa UI framework berat

================================================================
STRUKTUR PROJECT (WAJIB)
================================================================
/portfolio
 ├─ index.html
 ├─ /assets
 │   ├─ /css
 │   ├─ /js
 │   │   ├─ main.js
 │   │   ├─ theme.js        (dark mode toggle)
 │   │   └─ render.js       (render data dari JSON)
 │   ├─ /data
 │   │   └─ portfolio.json (DATA HASIL EKSTRAK PDF)
 │   └─ /img
 └─ README.md

================================================================
KONSEP DATA (WAJIB JSON-DRIVEN)
================================================================
- Semua konten diambil dari portfolio.json
- HTML hanya layout
- JavaScript render konten dari JSON
- Tujuannya: update portfolio cukup edit JSON

================================================================
STRUKTUR JSON (WAJIB LENGKAP)
================================================================
portfolio.json harus berisi:
- profile
- about
- skills (grouped)
- experiences (timeline)
- projects
- clients / institutions
- contacts
- socialLinks

================================================================
STRUKTUR HALAMAN (SINGLE PAGE)
================================================================
1. Hero
2. About
3. Skills
4. Experience
5. Projects
6. Clients / Institutions
7. Contact
8. Footer

================================================================
DARK MODE (WAJIB)
================================================================
- Mengikuti system preference
- Toggle manual (sun/moon)
- Simpan preference ke localStorage
- Tailwind dark mode
- Transisi halus

================================================================
SEO & LIGHTHOUSE OPTIMIZATION (WAJIB)
================================================================
SEO:
- Title & meta description berdasarkan isi PDF
- Open Graph meta
- Heading hierarchy rapi
- Alt text berdasarkan konteks PDF
- Canonical URL

Lighthouse:
- Semantic HTML
- Lazy loading image
- Minimal JS blocking
- Target score:
  - Performance > 90
  - Accessibility > 90
  - SEO > 90
  - Best Practices > 90

================================================================
DESIGN GUIDELINE
================================================================
- Modern & professional
- Cocok untuk Senior Developer / CTO
- Tailwind utility-first
- Responsive
- Clean spacing
- Subtle animation only

================================================================
KUALITAS KODE
================================================================
- Clean code
- Modular JS
- Mudah dikembangkan
- Siap di-migrate ke Next.js

================================================================
OUTPUT YANG SAYA INGINKAN
================================================================
- Kode lengkap
- portfolio.json TERISI data ASLI dari PDF
- Tidak ada placeholder berlebihan
- Struktur project jelas