# LENZ NONTON

Website streaming anime murni HTML + CSS + JavaScript (tanpa framework).

## Sumber API
- **ScripAPI** (utama): `https://scripapi.web.id/gateway.php/anime` → home, search, detail, watch, batch
- **Jikan API** (pelengkap metadata): top, genres, schedules, season, recommendations, characters, reviews

## Struktur File
- `index.html` — Beranda (ongoing & complete)
- `search.html` — Hasil pencarian
- `detail.html` — Detail anime + karakter + review
- `watch.html` — Player + pilih server + link download
- `batch.html` — Batch download
- `jadwal.html` — Jadwal mingguan
- `top.html` — Top Anime
- `genre.html` — Daftar genre
- `season.html` — Anime musim ini + rekomendasi
- `api.js` — Lapisan API
- `app.js` — Helper UI
- `styles.css` — Desain (dark, pink–cyan accent)

## Deploy ke Vercel
1. Upload folder ini ke GitHub
2. Import di [vercel.com](https://vercel.com) → deploy otomatis (static)
   atau jalankan `vercel --prod` di folder ini.
