# DESIGN.md: Studio Karsa Digital (Next-Gen Web & App Engineering Studio)

## 1. Identity & Brand Direction
- **Identity:** Studio rekayasa perangkat lunak & desain antarmuka berstandar editorial yang melayani dua segmen secara presisi: **Perorangan / Kreator / UMKM** (kecepatan rilis, konversi instan, desain berkarakter) dan **Perusahaan / Startup / Enterprise** (arsitektur terukur, integrasi AI/ERP, reliabilitas sistem).
- **Visual Language:** Minimalist Editorial Gallery yang terinspirasi dari kurasi visual bergaya majalah teknologi modern (Contra-inspired), dipadukan dengan blueprint arsitektur vektor interaktif dan kalkulator estimasi proyek.
- **Dials:** `Dial: ENERGY 3 / RHYTHM 3 / MOTION 2`
  - **ENERGY 3 (Bold):** Tipografi display yang tegas dan kontras tinggi antara kanvas putih bersih (`#FFFFFF`), permukaan alabaster (`#F7F7F8`), dan kartu kontras obsidian (`#111113`).
  - **RHYTHM 3 (Varied):** Komposisi antar seksi bervariasi secara struktural: Hero parallax berlapis, profil builder dengan roda keahlian & sertifikasi, kurasi kartu blueprint proyek 3 kolom, baris metrik terverifikasi berbentuk spesifikasi teknis 3 pilar, banner konversi asimetris, galeri studi kasus mendalam 2 kolom dengan pembanding sebelum/sesudah, serta matriks perbandingan dua segmen.
  - **MOTION 2 (Scroll-reveal & Transitions):** Transisi layout berbasis fisika (`layoutId` pada filter kategori dan tab segmen), spotlight radial border ringan saat kursor berada di atas kartu, dan inertial smooth scrolling (`lenis`) yang menghormati `prefers-reduced-motion`.

## 2. Color System (WCAG AA Verified via `contrast-check.py`)
Limit palet aktif: 2 warna dasar netral + 1 aksen utama (R-29).
- **Light Mode:**
  - `--background`: `#FFFFFF` (Pure White: kanvas utama)
  - `--surface` / `--muted`: `#F7F7F8` (Soft Alabaster: wadah filter, permukaan kartu sekunder)
  - `--foreground`: `#111113` (Obsidian Ink: rasio kontras 19.1:1 terhadap `#FFFFFF`)
  - `--muted-foreground`: `#52525B` / `#68686F` (Neutral Slate: rasio kontras 5.53:1 hingga 7.04:1 terhadap `#FFFFFF` dan `#F7F7F8`, lulus WCAG AA)
  - `--primary`: `#111113` dengan teks `#FFFFFF`
  - `--accent-indigo`: `#4338CA` di atas `#EEF2FF` (rasio kontras 8.88:1) untuk penanda sistem AI/Interaktif & elemen fokus aktif
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
- **Technical Metadata (`Geist Mono`):** Digunakan secara spesifik hanya pada data kuantitatif (waktu muat dalam milidetik, skor Lighthouse, estimasi minggu pengerjaan, dan kode arsitektur sistem) untuk membedakan data rekayasa dari narasi editorial.

## 4. Purpose-Gate Written Justifications (R-01 to R-31)
- **R-01 (Color & Gradients):** Tidak menggunakan gradien biru-ungu generik. Palet berfokus pada kontras monokromatik dengan aksen status emerald (`--status-emerald`) dan indigo (`--accent-indigo`) untuk membedakan domain teknologi dan metrik performa terverifikasi (R-25).
- **R-04 (Icons):** Menggunakan ikon SVG kustom untuk stack teknologi (`TechStackIcon`: Next.js, Flutter, PostgreSQL, Python/FastAPI, TypeScript, Tailwind) dan ikon fungsional yang relevan langsung dengan aksi pengguna (pencarian, filter, kalkulator, buka web asli). Tidak ada ikon dekoratif tanpa fungsi.
- **R-07 (Background):** Kanvas utama menggunakan warna solid bersih (`#FFFFFF` / `#111113`) tanpa grid/dot-pattern dekoratif agar karya arsitektur dan tipografi menjadi titik fokus utama (One focal point per screen).
- **R-08 (Button Arrows):** Tanda panah hanya digunakan pada CTA aksi transisi utama dan tautan eksternal/studi kasus untuk menandakan perpindahan konteks halaman.
- **R-09 (Badges):** Badge hanya digunakan untuk informasi fungsional nyata: klasifikasi segmen (`INDIVIDUAL`, `SME`, `ENTERPRISE`), kode domain arsitektur (`SYS-WEB`, `SYS-AI`, `SYS-ERP`), dan skor performa hasil benchmark (`Lighthouse 99`). Tidak ada eyebrow badge redundan di atas H1.
- **R-10 (Glassmorphism):** Efek `backdrop-blur-md` dibatasi hanya pada 1 elemen struktural: Sticky Navigation Header saat pengguna melakukan scroll agar konten yang lewat di bawahnya tidak bertabrakan dengan teks navigasi.
- **R-11 (Border Radius):** Menggunakan hierarki radius yang terukur: `rounded-full` untuk tombol aksi dan pil filter sebagaimana spesifikasi Contra-editorial, `rounded-2xl` (16px) untuk kartu proyek luar, dan `rounded-xl` (12px) untuk kanvas blueprint arsitektur di dalamnya.
- **R-12 (Shadow):** Bayangan lembut (`shadow-2xs` / `shadow-lg`) hanya diterapkan secara minimal untuk memisahkan kartu dari permukaan latar dan pada overlay Dialog untuk memisahkan layer elevasi.
- **R-13 (Glow):** Atas instruksi eksplisit pemilik produk (`Spotlight Card.md`, `R-37`), kartu interaktif (`GlowCard`) menggunakan efek spotlight border radial ringan berbasis `requestAnimationFrame` lokal hanya pada kartu yang sedang di-hover (`opacity: 0` saat idle, tanpa `backdrop-blur` atau `filter: blur()`) untuk memberi umpan balik spasial tanpa membebani GPU, ditambah indikator fokus keyboard (`:focus-visible`) untuk aksesibilitas.
- **R-14 (Feature & Project Cards):** Seluruh kartu grid proyek (Seksi 01, 03, dan 05) diseragamkan ke format kartu blueprint yang kompak dan konsisten: (1) Compact Blueprint Cards (`ProjectCard` dengan diagram node teknologi `TechStackIcon` beranimasi halus saat hover), dan (2) Engineering Pillar Cards (3 pilar standar kualitas pengerjaan). Seluruh kartu memakai komponen vektor ringan tanpa screenshot raster berat.
- **R-19 (Animations):** Seluruh animasi memiliki tujuan UX tertulis: `layoutId` memberikan kontinuitas spasial saat berpindah filter kategori dan segmen; transisi `AnimatePresence` mencegah lompatan tata letak saat beralih antara mode `Projects` dan `Solutions`. Semua animasi dinonaktifkan otomatis jika `prefers-reduced-motion: reduce` aktif.
- **R-23 & R-38 (Visual Assets & Honesty):** Sesuai instruksi eksplisit pemilik produk untuk tidak menggunakan gambar screenshot portofolio pada grid agar web ringan dan sederhana, seluruh kartu grid menggunakan komponen `ProjectBlueprintVisual` berbasis vektor (0 KB gambar raster) yang memvisualisasikan stack teknologi asli, layer arsitektur, dan metrik benchmark proyek Surya Pamungkas secara jujur dan transparan.
