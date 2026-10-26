# Surya Web Studio

> Portofolio interaktif dan platform showcase jasa pembuatan website personal, toko online UMKM, dan aplikasi web modern berbasis Next.js, React, dan integrasi AI oleh **Nur Hidayat Surya Pamungkas**.

---

## Tentang Proyek

**Surya Web Studio** adalah website portofolio interaktif berperforma tinggi yang memamerkan lebih dari 11 karya website siap pakai, 16 keahlian teknis teruji, serta 17 sertifikasi resmi. Dirancang dengan standar editorial modern, transisi kinetik berbasis fisika, serta integrasi pemesanan paket dan konsultasi email langsung.

- **Author & Owner:** Nur Hidayat Surya Pamungkas
- **Email:** inunghehe07@gmail.com
- **GitHub:** [https://github.com/suryapamungkas](https://github.com/suryapamungkas)
- **LinkedIn:** [Surya Pamungkas](https://linkedin.com/in/suryapamungkas)
- **Instagram:** [@lionelehe](https://instagram.com/lionelehe)
- **Lokasi:** Surabaya & Remote Seluruh Indonesia

---

## Fitur Utama

1. **Sterling Gate Kinetic Navigation**
   - Panel navigasi kinetik layar penuh berbasis GSAP dan CustomEase.
   - Efek transisi 3 lapis tirai (*staggered backdrop layers*) dengan animasi teks tautan bertingkat.
   - 5 bentuk latar geometris interaktif yang bereaksi dinamis saat kursor melintasi item menu.
   - Tombol toggle responsif yang menganimasikan teks Menu ke Tutup secara vertikal dan memutar ikon bintang geometris 16x16 sebesar 315 derajat.

2. **Multi-Layer Parallax Hero**
   - Animasi parallax halus berbasis GSAP ScrollTrigger dan Lenis smooth scrolling.
   - Memberikan kedalaman visual sinematik tanpa mengorbankan performa muat halaman.

3. **Spotlight Cards dengan Cursor Tracking**
   - Sorotan cahaya radial (*glow spotlight border*) yang mengikuti posisi pointer secara real-time pada seluruh kartu proyek, kartu studi kasus unggulan, dan pilar standar kualitas.
   - Warna spotlight adaptif berdasarkan kategori proyek (hijau untuk UMKM dan Personal, biru untuk Web App dan ERP, ungu untuk AI dan 3D Interaktif).

4. **3D Works Wheel (Keahlian & Sertifikasi)**
   - Roda interaktif 3D untuk menampilkan 16 keahlian teknis siap pakai dan 17 sertifikasi resmi yang tertaut langsung ke kredensial terverifikasi.

5. **Kalkulator Paket & Harga Transparan**
   - Pilihan paket fleksibel mulai dari Paket Personal (Rp 1,5 Jt), Paket UMKM & Toko Online (Rp 5 Jt), hingga Custom Web App & AI (mulai Rp 15 Jt).
   - Sakelar bundling tahunan (*save 20%*) dengan animasi angka halus via NumberFlow dan konfeti selebrasi.

6. **Formulir Konsultasi & Pemesanan Email Langsung (FormSubmit)**
   - Pengunjung dapat mengirimkan pesan langsung ke email pemilik (`inunghehe07@gmail.com`) tanpa memerlukan aplikasi email bawaan OS.
   - Dilengkapi deteksi status lengkap: Idle, Submitting, Success, dan Error.
   - Fitur salin email satu klik dan tombol alternatif *Buka di Gmail Web* yang membawa draf pesan otomatis.

---

## Teknologi yang Digunakan

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server-Side Generation)
- **Library UI:** [React 19](https://react.dev/)
- **Bahasa:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) dengan `@tailwindcss/postcss`
- **Animasi & Interaksi:**
  - [GSAP 3](https://greensock.com/gsap/) dan CustomEase
  - [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll)
  - [Motion / Framer Motion](https://motion.dev/)
  - [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
  - [@number-flow/react](https://number-flow.barvian.me/)
- **Komponen & Primitives:** [Radix UI](https://www.radix-ui.com/) dan [Lucide React](https://lucide.dev/)
- **Manajemen State:** [Zustand](https://zustand-demo.pmnd.rs/) dan [Nuqs](https://nuqs.47ng.com/) (URL query state)
- **Tema:** [Next-Themes](https://github.com/pacocoursey/next-themes) (Light Mode dan Dark Mode)
- **Notifikasi:** [Sonner](https://sonner.emilkowal.ski/)

---

## Menjalankan Proyek Secara Lokal

### Prasyarat

- Node.js versi 18.18 atau lebih baru
- npm, pnpm, atau yarn

### Langkah Instalasi

1. Clone repositori:
   ```bash
   git clone https://github.com/suryapamungkas/surya-web-studio.git
   cd surya-web-studio
   ```

2. Pasang dependensi:
   ```bash
   npm install
   ```

3. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```

4. Buka peramban Anda di [http://localhost:3000](http://localhost:3000).

---

## Build Produksi & Pemeriksaan Tipe

Untuk memastikan seluruh tipe data dan kode bebas kesalahan sebelum rilis:

```bash
# Pemeriksaan tipe TypeScript
npm run typecheck

# Build produksi teroptimasi
npm run build

# Menjalankan build produksi
npm run start
```

---

## Panduan Deploy ke GitHub & Vercel

### 1. Inisialisasi Git Lokal

```bash
git init
git add .
git commit -m "feat: initial commit Surya Web Studio"
```

### 2. Hubungkan ke Repositori GitHub

Buat repositori baru di GitHub (misalnya `surya-web-studio`), kemudian jalankan:

```bash
git branch -M main
git remote add origin https://github.com/<username-github-anda>/surya-web-studio.git
git push -u origin main
```

### 3. Deploy ke Vercel

1. Buka [Vercel Dashboard](https://vercel.com/new).
2. Impor repositori `surya-web-studio` dari GitHub Anda.
3. Next.js akan terdeteksi secara otomatis (Framework Preset: **Next.js**).
4. Klik **Deploy**. Selesai!

---

## Lisensi

Proyek ini dilisensikan di bawah lisensi **MIT License**. Hak Cipta (c) 2026 **Nur Hidayat Surya Pamungkas**. Silakan lihat file [LICENSE](LICENSE) untuk informasi lebih lanjut.
