# Cloud Media Hosting

Website hosting untuk gambar dan video menggunakan Cloudinary. Mendukung mode terang/gelap, preview media, dan menghasilkan tautan publik & embed.

## 🚀 Fitur
- Upload gambar & video ke Cloudinary
- Dapatkan tautan embed HTML
- Tampilan modern, dukungan light/dark mode
- Maksimal ukuran file: 10 GB

## 📦 Install

```bash
npm install
```

## 🔧 Konfigurasi

Buat file `.env.local` di root proyek:

```
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset_here
```

## 🧪 Jalankan secara lokal

```bash
npm run dev
```

## ☁️ Deploy ke Vercel

1. Push ke GitHub
2. Import repo ke [Vercel](https://vercel.com/import/git)
3. Tambahkan variabel environment jika perlu:
   - `VITE_CLOUDINARY_CLOUD_NAME`
   - `VITE_CLOUDINARY_UPLOAD_PRESET`

## 🛠 Dibuat dengan:
- React + Vite
- Tailwind CSS
- Framer Motion
- Cloudinary

