# DESIGN.md — Studio Karsa Digital (Next-Gen Web & App Engineering Studio)

## 1. Identity & Brand Direction
- **Identity:** Studio rekayasa perangkat lunak & desain antarmuka berstandar editorial yang melayani dua segmen secara presisi: **Perorangan / Kreator / UMKM** (kecepatan rilis, konversi instan, desain berkarakter) dan **Perusahaan / Startup / Enterprise** (arsitektur terukur, integrasi AI/ERP, reliabilitas sistem).
- **Visual Language:** Minimalist Editorial Gallery yang terinspirasi dari kurasi visual bergaya majalah teknologi modern (Contra-inspired), dipadukan dengan showcase interaktif, kalkulator arsitektur real-time, dan AI Project Architect.
- **Dials:** `Dial: ENERGY 3 / RHYTHM 3 / MOTION 2`
  - **ENERGY 3 (Bold):** Tipografi display yang tegas dan kontras tinggi antara kanvas putih bersih (`#FFFFFF`), permukaan alabaster (`#F7F7F8`), dan kartu kontras obsidian (`#111113`).
  - **RHYTHM 3 (Varied):** Komposisi antar seksi bervariasi secara struktural: Hero konversasional berpusat pada input interaktif, baris metrik terverifikasi berbentuk spesifikasi teknis 3 pilar, kurasi kartu showcase 3 kolom dengan video hover, banner konversi asimetris di tengah halaman, galeri editorial mendalam 2 kolom dengan pembanding interaktif, serta matriks perbandingan dua segmen.
  - **MOTION 2 (Scroll-reveal & Transitions):** Transisi layout berbasis fisika (`layoutId` pada filter kategori dan tab segmen), crossfade gambar-ke-video saat hover/tap pada kartu proyek, animasi drawer arsitektur AI, dan inertial smooth scrolling (`lenis`) yang menghormati `prefers-reduced-motion`.

## 2. Color System (WCAG AA Verified via `contrast-check.py`)
Limit palet aktif: 2 warna dasar netral + 1 aksen utama (R-29).
- **Light Mode:**
  - `--background`: `#FFFFFF` (Pure White — kanvas utama)
  - `--surface` / `--muted`: `#F7F7F8` (Soft Alabaster — wadah filter, permukaan kartu sekunder)
  - `--foreground`: `#111113` (Obsidian Ink — rasio kontras 19.1:1 terhadap `#FFFFFF`)
  - `--muted-foreground`: `#52525B` / `#68686F` (Neutral Slate — rasio kontras 5.53:1 hingga 7.04:1 terhadap `#FFFFFF` dan `#F7F7F8`, lulus WCAG AA)
  - `--primary`: `#111113` dengan teks `#FFFFFF`
  - `--accent-indigo`: `#4338CA` di atas `#EEF2FF` (rasio kontras 8.88:1) untuk penanda fitur AI Architect & elemen fokus aktif
  - `--status-emerald`: `#065F46` di atas `#ECFDF5` (rasio kontras 7.29:1) khusus untuk indikator skor benchmark Lighthouse terukur
  - `--border`: `#E6E6EA` (`1px solid` pembagi struktural)
- **Dark Mode:**
  - `--background`: `#111113` (Obsidian Charcoal)
  - `--surface` / `--muted`: `#18181B` (Elevated Zinc Surface)
  - `--foreground`: `#FAFAFA` (Crisp Alabaster)
  - `--muted-foreground`: `#A1A1AA` (rasio kontras 7.36:1 terhadap `#111113`, lulus WCAG AA)
  - `--primary`: `#FAFAFA` dengan teks `#111113`
  - `--accent-indigo`: `#818CF8` (rasio kontras 6.32:1 terhadap `#111113`)
  - `--status-emerald`: `#34D399` (rasio kontras 9.81:1 terhadap `#111113`)
  - `--border`: `#27272A`

## 3. Typography & Hierarchy Justification (R-06, R-31)
- **Display & Headings (`Plus Jakarta Sans`):** Dipilih karena geometri humanis modern karya desainer Indonesia yang memiliki keterbacaan tinggi pada ukuran besar (`tracking: -0.03em`, `line-height: 1.08`, `text-wrap: balance`) dan memberi karakter editorial yang hangat sekaligus presisi.
- **Body & UI (`Inter`):** Dipilih untuk kepadatan informasi UI, tabel matriks perbandingan, dan deskripsi teknis panjang (`text-wrap: pretty`) agar nyaman dibaca di layar mobile maupun desktop.
- **Technical Metadata (`Geist Mono`):** Digunakan secara spesifik hanya pada data kuantitatif (waktu muat dalam milidetik, skor Lighthouse, estimasi minggu pengerjaan, dan badge versi stack teknologi) untuk membedakan data rekayasa dari narasi editorial.

## 4. Purpose-Gate Written Justifications (R-01 to R-31)
- **R-01 (Color & Gradients):** Tidak menggunakan gradien biru-ungu generik. Scrim gradien gelap (`from-black/75 via-black/30 to-transparent`) hanya digunakan pada bagian bawah thumbnail kartu proyek agar teks dan tombol aksi di atas media memiliki rasio kontras > 7:1 (R-25).
- **R-04 (Icons):** Menggunakan ikon SVG kustom untuk stack teknologi (Next.js, Flutter, PostgreSQL, Python/FastAPI, TypeScript, Tailwind) dan ikon fungsional yang relevan langsung dengan aksi pengguna (pencarian, filter, kalkulator, ekspor brief, buka pratinjau). Tidak ada ikon dekoratif tanpa fungsi.
- **R-07 (Background):** Kanvas utama menggunakan warna solid bersih (`#FFFFFF` / `#111113`) tanpa grid/dot-pattern dekoratif agar karya visual dan tipografi menjadi titik fokus utama (One focal point per screen).
- **R-08 (Button Arrows):** Tanda panah hanya digunakan pada CTA aksi transisi utama (`Rancang Sekarang` dan tautan eksternal/studi kasus) untuk menandakan perpindahan konteks halaman atau pembukaan drawer arsitektur.
- **R-09 (Badges):** Badge hanya digunakan untuk informasi fungsional nyata: klasifikasi segmen (`INDIVIDUAL`, `SME`, `ENTERPRISE`), kategori arsitektur, skor performa hasil benchmark (`Lighthouse 99`), dan penanda transparansi data (`[Blueprint Referensi]`). Tidak ada eyebrow badge redundan di atas H1.
- **R-10 (Glassmorphism):** Efek `backdrop-blur-md` dibatasi hanya pada 1 elemen struktural: Sticky Navigation Header saat pengguna melakukan scroll agar konten yang lewat di bawahnya tidak bertabrakan dengan teks navigasi.
- **R-11 (Border Radius):** Menggunakan hierarki radius yang terukur: `rounded-full` untuk tombol aksi dan pil filter sebagaimana spesifikasi Contra-editorial, `rounded-2xl` (16px) untuk kartu proyek luar, dan `rounded-xl` (12px) untuk viewport media di dalamnya.
- **R-12 (Shadow):** Bayangan lembut (`shadow-sm` / `shadow-lg`) hanya diterapkan pada kotak prompt AI Architect di Hero sebagai titik fokus utama layar dan pada overlay Drawer/Dialog untuk memisahkan layer elevasi.
- **R-13 (Glow):** Atas instruksi eksplisit pemilik produk (`Spotlight Card.md`, `R-37`), kartu interaktif (`GlowCard` pada kartu proyek, kartu studi kasus unggulan, kartu pilar standar kualitas, dan indikator before/after) menggunakan efek spotlight border radial berbasis posisi kursor (`--x`, `--y`, `--xp`, `--yp`) untuk memberi umpan balik spasial saat pengguna menjelajahi kartu, ditambah indikator fokus keyboard (`:focus-visible`) untuk aksesibilitas.
- **R-14 (Feature & Project Cards):** Kartu dibagi ke dalam tiga format berbeda sesuai bobot konten: (1) Featured Showcase Cards (3 kolom dengan video loop interaktif), (2) Categorized Feed Cards (ringkas per domain teknologi), dan (3) Standout Deep-Dive Cards (2 kolom masonry editorial dengan tab Bedah Arsitektur, Metrik Lab, dan Simulasi Interaktif Sebelum/Sesudah).
- **R-19 (Animations):** Seluruh animasi memiliki tujuan UX tertulis: `layoutId` memberikan kontinuitas spasial saat berpindah filter kategori dan segmen; crossfade video pada kartu mendemonstrasikan interaksi produk tanpa meninggalkan halaman; transisi `AnimatePresence` mencegah lompatan tata letak saat beralih antara mode `Projects` dan `Solutions`. Semua animasi dinonaktifkan otomatis jika `prefers-reduced-motion: reduce` aktif.
- **R-23 & R-38 (Visual Assets & Honesty):** Seluruh gambar sampul dan video pratinjau proyek di-generate secara khusus untuk merepresentasikan 9 blueprint studi kasus di `SPEC.md`, dan setiap metrik pada studi kasus diberi penanda konteks transparan (`Benchmark Blueprint Lab`) sehingga pengunjung memahami mana contoh arsitektur referensi dan mana kalkulasi estimasi proyek mereka.
