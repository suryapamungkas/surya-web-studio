import type {
  ClientSegment,
  ProjectCategory,
  ProjectMetrics,
  TechStackItem,
} from "@/db/schema";

export interface ArchitectureLayer {
  layer: string;
  choice: string;
  rationale: string;
}

export interface BeforeAfterComparison {
  metricLabel: string;
  beforeLabel: string;
  beforeValue: string;
  afterLabel: string;
  afterValue: string;
  improvementNote: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  clientTypeLabel: string;
  shortDescription: string;
  problemStatement: string;
  architectureExecution: string;
  engineeringStory: string;
  category: ProjectCategory;
  targetSegment: ClientSegment;
  coverImageUrl: string;
  previewVideoUrl?: string;
  liveDemoUrl: string;
  externalLiveUrl?: string;
  githubUrl?: string;
  techStack: TechStackItem[];
  metrics: ProjectMetrics;
  architectureLayers: ArchitectureLayer[];
  beforeAfter: BeforeAfterComparison[];
  deliverables: string[];
  timelineWeeks: string;
  likesCount: number;
  viewsCount: number;
  isFeatured: boolean;
  isStandout: boolean;
  createdAt: string;
}

export interface SuryaSkillItem {
  name: string;
  category: "Web & UI" | "AI & Data" | "Cloud & Backend";
  summary: string;
  iconKey: string;
  image: string;
  href: string;
}

export interface SuryaCertificateItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl?: string;
  image: string;
  iconKey?: string;
}

export const SURYA_PROFILE = {
  fullName: "Nur Hidayat Surya Pamungkas",
  shortName: "Surya Pamungkas",
  brandName: "Surya Web Studio",
  role: "Personal Website Builder, Full-Stack Developer & AI Engineer",
  education: "Informatika, UPN Veteran Jawa Timur",
  tagline:
    "Bantu personal, UMKM, dan perusahaan punya website cepat, rapi, dan siap pakai tanpa ribet teknis.",
  quote: "Leveraging AI as a professional tool, not a replacement.",
  avatarUrl: "/images/surya/formal-crop.jpg",
  cvUrl: "/CV_Nur_Hidayat_Surya_Pamungkas.pdf",
  email: "inunghehe07@gmail.com",
  githubUrl: "https://github.com/suryapamungkas",
  linkedinUrl: "https://www.linkedin.com/in/suryapamungkas",
  instagramUrl: "https://www.instagram.com/lionelehe",
  stats: [
    {
      label: "Proyek Live",
      value: "11+",
      note: "Bisa dicoba langsung",
    },
    {
      label: "Sertifikasi Resmi",
      value: "17",
      note: "LPPI DIGDAYA & Dicoding",
    },
    {
      label: "Pengalaman",
      value: "3+ Thn",
      note: "Full-Stack Web & AI",
    },
  ],
};

export const SURYA_SKILLS: SuryaSkillItem[] = [
  {
    name: "Python",
    category: "AI & Data",
    summary: "Pemrosesan data, automasi backend, dan integrasi model AI produksi.",
    iconKey: "python",
    image: "/images/projects/karsa-ai-vault.jpg",
    href: "/projects/llm-evaluation-dashboard",
  },
  {
    name: "Back-End Development",
    category: "Cloud & Backend",
    summary: "Arsitektur REST API, autentikasi aman, dan manajemen server stabil.",
    iconKey: "backend",
    image: "/images/surya/nusa-asset-management.png",
    href: "/projects/nusa-asset-management",
  },
  {
    name: "Web Development",
    category: "Web & UI",
    summary: "Website bisnis, toko online, dan web app cepat di semua perangkat.",
    iconKey: "webdev",
    image: "/images/surya/baru-lagi.png",
    href: "/projects/baru-lagi",
  },
  {
    name: "Artificial Intelligence",
    category: "AI & Data",
    summary: "Sistem cerdas untuk pencarian pintar, klasifikasi, dan asisten digital.",
    iconKey: "ai",
    image: "/images/surya/lexindonesia-legal-platform.png",
    href: "/projects/lexindonesia-legal-platform",
  },
  {
    name: "Machine Learning",
    category: "AI & Data",
    summary: "Model prediksi, deteksi visual di browser, dan rekomendasi otomatis.",
    iconKey: "ml",
    image: "/images/surya/smart-vegetable-detector.png",
    href: "/projects/smart-vegetable-detector",
  },
  {
    name: "Deep Learning",
    category: "AI & Data",
    summary: "Jaringan saraf tiruan untuk pengolahan citra dan analisis teks kompleks.",
    iconKey: "deeplearning",
    image: "/images/surya/smart-vegetable-detector.png",
    href: "/projects/smart-vegetable-detector",
  },
  {
    name: "Generative AI",
    category: "AI & Data",
    summary: "Integrasi LLM untuk tanya-jawab dokumen, ringkasan, dan chatbot.",
    iconKey: "genai",
    image: "/images/surya/lexindonesia-legal-platform.png",
    href: "/projects/lexindonesia-legal-platform",
  },
  {
    name: "Data Science",
    category: "AI & Data",
    summary: "Dashboard analitik, visualisasi metrik bisnis, dan pelaporan otomatis.",
    iconKey: "datascience",
    image: "/images/surya/nusa-decarb.png",
    href: "/projects/nusa-decarb",
  },
  {
    name: "Prompt Engineering",
    category: "AI & Data",
    summary: "Perancangan instruksi AI terstruktur dengan akurasi tinggi dan aman.",
    iconKey: "prompt",
    image: "/images/surya/llm-evaluation-dashboard.png",
    href: "/projects/llm-evaluation-dashboard",
  },
  {
    name: "Google Cloud",
    category: "Cloud & Backend",
    summary: "Infrastruktur cloud terukur, Cloud Run, dan penyimpanan objek aman.",
    iconKey: "googlecloud",
    image: "/images/surya/trustchain.png",
    href: "/projects/trustchain-umkm",
  },
  {
    name: "Cloud Computing",
    category: "Cloud & Backend",
    summary: "Deployment otomatis, SSL gratis, dan ketersediaan server 24 jam.",
    iconKey: "cloud",
    image: "/images/surya/resilio.id.png",
    href: "/projects/resilio-id",
  },
  {
    name: "UX Fundamentals",
    category: "Web & UI",
    summary: "Alur navigasi dan tata letak yang langsung mudah dipahami pengunjung.",
    iconKey: "ux",
    image: "/images/surya/traveloop.png",
    href: "/projects/traveloop",
  },
  {
    name: "Next.js 16 & React 19",
    category: "Web & UI",
    summary: "Framework web modern yang cepat dibuka dan optimal di mesin pencari.",
    iconKey: "nextjs",
    image: "/images/surya/baru-lagi.png",
    href: "/projects/baru-lagi",
  },
  {
    name: "TypeScript & Tailwind CSS",
    category: "Web & UI",
    summary: "Kode terstruktur minim bug dengan desain antarmuka presisi dan responsif.",
    iconKey: "tailwind",
    image: "/images/surya/adidas-pure-concept.png",
    href: "/projects/adidas-pure-concept",
  },
  {
    name: "Framer Motion & 3D Web",
    category: "Web & UI",
    summary: "Animasi interaktif 60fps yang meningkatkan kesan profesional brand.",
    iconKey: "motion",
    image: "/images/surya/adidas-pure-concept.png",
    href: "/projects/adidas-pure-concept",
  },
  {
    name: "PostgreSQL & Prisma ORM",
    category: "Cloud & Backend",
    summary: "Database relasional terstruktur untuk transaksi, produk, dan inventori.",
    iconKey: "postgres",
    image: "/images/surya/nusa-asset-management.png",
    href: "/projects/nusa-asset-management",
  },
];

export const SURYA_CERTIFICATES: SuryaCertificateItem[] = [
  {
    id: "cert-lppi-1",
    name: "DIGDAYA Practitioner Phase",
    issuer: "LPPI",
    date: "Aug 2026",
    credentialId: "f485d32a-cb6b-4fd2-b0ad-23917571c691",
    credentialUrl:
      "https://credsverse.com/credentials/f485d32a-cb6b-4fd2-b0ad-23917571c691?preview=1",
    image: "/images/projects/nusantara-erp.jpg",
    iconKey: "award",
  },
  {
    id: "cert-lppi-2",
    name: "DIGDAYA Essential Phase",
    issuer: "LPPI",
    date: "Aug 2026",
    credentialId: "3834df4f-91dd-449a-af9d-c9cfa6f16b3a",
    credentialUrl:
      "https://credsverse.com/credentials/3834df4f-91dd-449a-af9d-c9cfa6f16b3a?preview=1",
    image: "/images/surya/resilio.id.png",
    iconKey: "award",
  },
  {
    id: "cert-1",
    name: "Belajar Fundamental Generative AI",
    issuer: "Dicoding Indonesia",
    date: "Jul 2026",
    credentialId: "ERZRLQK7QZYV",
    credentialUrl: "https://www.dicoding.com/certificates/ERZRLQK7QZYV",
    image: "/images/projects/karsa-ai-vault.jpg",
    iconKey: "genai",
  },
  {
    id: "cert-2",
    name: "Membangun Sistem Machine Learning",
    issuer: "Dicoding Indonesia",
    date: "Jul 2026",
    credentialId: "JMZVO6JEQXN9",
    credentialUrl: "https://www.dicoding.com/certificates/JMZVO6JEQXN9",
    image: "/images/surya/llm-evaluation-dashboard.png",
    iconKey: "ml",
  },
  {
    id: "cert-3",
    name: "Belajar Penerapan Machine Learning untuk Flutter",
    issuer: "Dicoding Indonesia",
    date: "Jul 2026",
    credentialId: "1OP8RQNWBZQK",
    credentialUrl: "https://www.dicoding.com/certificates/1OP8RQNWBZQK",
    image: "/images/projects/arkapay-mobile.jpg",
    iconKey: "flutter",
  },
  {
    id: "cert-4",
    name: "Belajar Fundamental Deep Learning",
    issuer: "Dicoding Indonesia",
    date: "Jul 2026",
    credentialId: "NVP7N0G04ZR0",
    credentialUrl: "https://www.dicoding.com/certificates/NVP7N0G04ZR0",
    image: "/images/surya/smart-vegetable-detector.png",
    iconKey: "deeplearning",
  },
  {
    id: "cert-5",
    name: "Belajar Dasar Manajemen Proyek",
    issuer: "Dicoding Indonesia",
    date: "Jun 2026",
    credentialId: "72ZDJNQWJZYW",
    credentialUrl: "https://www.dicoding.com/certificates/72ZDJNQWJZYW",
    image: "/images/surya/vanguard-human-capital.png",
    iconKey: "award",
  },
  {
    id: "cert-6",
    name: "Belajar Penerapan AI di Aplikasi Web",
    issuer: "Dicoding Indonesia",
    date: "Jul 2026",
    credentialId: "MR7MW9JMIPYQ",
    credentialUrl: "https://www.dicoding.com/certificates/MR7MW9JMIPYQ",
    image: "/images/surya/lexindonesia-legal-platform.png",
    iconKey: "webdev",
  },
  {
    id: "cert-7",
    name: "Belajar Machine Learning untuk Pemula",
    issuer: "Dicoding Indonesia",
    date: "Jun 2026",
    credentialId: "1RXYWJ2VKZVM",
    credentialUrl: "https://www.dicoding.com/certificates/1RXYWJ2VKZVM",
    image: "/images/surya/smart-vegetable-detector.png",
    iconKey: "ml",
  },
  {
    id: "cert-8",
    name: "Belajar Dasar UX Design",
    issuer: "Dicoding Indonesia",
    date: "May 2026",
    credentialId: "98XW0QQKJXM3",
    credentialUrl: "https://www.dicoding.com/certificates/98XW0QQKJXM3",
    image: "/images/surya/traveloop.png",
    iconKey: "ux",
  },
  {
    id: "cert-9",
    name: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    date: "May 2026",
    credentialId: "JLX1VJ4ENZ72",
    credentialUrl: "https://www.dicoding.com/certificates/JLX1VJ4ENZ72",
    image: "/images/surya/lexindonesia-legal-platform.png",
    iconKey: "ai",
  },
  {
    id: "cert-10",
    name: "Belajar Dasar Data Science",
    issuer: "Dicoding Indonesia",
    date: "May 2026",
    credentialId: "QLZ99GVMMZ5D",
    credentialUrl: "https://www.dicoding.com/certificates/QLZ99GVMMZ5D",
    image: "/images/surya/nusa-decarb.png",
    iconKey: "datascience",
  },
  {
    id: "cert-11",
    name: "Belajar Dasar Google Cloud",
    issuer: "Dicoding Indonesia",
    date: "Jun 2026",
    credentialId: "GRX5WM03YZ0M",
    credentialUrl: "https://www.dicoding.com/certificates/GRX5WM03YZ0M",
    image: "/images/surya/nusa-asset-management.png",
    iconKey: "googlecloud",
  },
  {
    id: "cert-12",
    name: "Prompt Engineering untuk Software Developer",
    issuer: "Dicoding Indonesia",
    date: "Jun 2026",
    credentialId: "0LZ0YMJY3X65",
    credentialUrl: "https://www.dicoding.com/certificates/0LZ0YMJY3X65",
    image: "/images/projects/medikasatu-triage.jpg",
    iconKey: "prompt",
  },
  {
    id: "cert-13",
    name: "Belajar Membuat Aplikasi Back-End untuk Pemula dengan Google Cloud",
    issuer: "Dicoding Indonesia",
    date: "Jun 2026",
    credentialId: "QLZ99E4Z7Z5D",
    credentialUrl: "https://www.dicoding.com/certificates/QLZ99E4Z7Z5D",
    image: "/images/surya/trustchain.png",
    iconKey: "googlecloud",
  },
  {
    id: "cert-14",
    name: "Belajar Back-End Pemula dengan Python",
    issuer: "Dicoding Indonesia",
    date: "Jun 2026",
    credentialId: "GRPN7JY68X2M",
    credentialUrl: "https://www.dicoding.com/certificates/GRPN7JY68X2M",
    image: "/images/projects/velox-kinematics.jpg",
    iconKey: "python",
  },
  {
    id: "cert-15",
    name: "Memulai Pemrograman dengan Python",
    issuer: "Dicoding Indonesia",
    date: "May 2026",
    credentialId: "1RXYWQE4KZVM",
    credentialUrl: "https://www.dicoding.com/certificates/1RXYWQE4KZVM",
    image: "/images/projects/karsa-ai-vault.jpg",
    iconKey: "python",
  },
];

export const CATEGORY_FILTERS: {
  id: string;
  label: string;
  shortLabel: string;
  dbCategory: ProjectCategory | "ALL";
  description: string;
}[] = [
  {
    id: "featured",
    label: "Semua Karya",
    shortLabel: "Semua Karya",
    dbCategory: "ALL",
    description: "Seluruh karya website, toko online, dan aplikasi AI buatan Surya Pamungkas.",
  },
  {
    id: "web-apps",
    label: "Toko Online & Web App",
    shortLabel: "Toko & Web App",
    dbCategory: "WEB_APP",
    description: "Marketplace, katalog produk, kalkulator finansial, dan platform perjalanan.",
  },
  {
    id: "interactive-3d",
    label: "Landing Page & Brand",
    shortLabel: "Landing Page",
    dbCategory: "INTERACTIVE_WEB",
    description: "Website produk interaktif dengan animasi halus untuk meningkatkan penjualan.",
  },
  {
    id: "enterprise-erp",
    label: "Sistem Bisnis & Aset",
    shortLabel: "Sistem Bisnis",
    dbCategory: "ENTERPRISE_ERP",
    description: "Dashboard manajemen aset cabang, audit emisi karbon, dan rantai pasok.",
  },
  {
    id: "ai-systems",
    label: "Aplikasi AI & Riset",
    shortLabel: "Aplikasi AI",
    dbCategory: "AI_SYSTEM",
    description: "Pencarian dokumen hukum, evaluasi LLM, dan deteksi visual berbasis AI.",
  },
  {
    id: "personal-umkm",
    label: "Edukasi & UMKM",
    shortLabel: "Edukasi & UMKM",
    dbCategory: "PERSONAL_BRAND",
    description: "Platform belajar ringan kuota dan solusi ekspor-impor untuk UMKM.",
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "surya-01",
    slug: "baru-lagi",
    title: "BaruLagi Marketplace & Trade-In",
    clientTypeLabel: "E-Commerce & Kalkulator Tukar Tambah",
    shortDescription:
      "Marketplace elektronik bergaransi dengan kalkulator taksiran tukar tambah otomatis, filter kondisi barang, dan checkout QRIS.",
    problemStatement:
      "Pembeli ragu membeli gadget bekas karena kondisi fisik tidak jelas dan proses hitung harga tukar tambah memakan waktu lama.",
    architectureExecution:
      "Dilengkapi indikator kondisi 3 tingkat (Fair, Good, Excellent), simulasi harga tukar tambah 4 langkah, dan laci keranjang belanja instan.",
    engineeringStory: `### Mengapa Proyek Ini Cocok untuk Bisnis Anda?
1. **Hitung Harga Otomatis:** Pelanggan bisa cek nilai tukar tambah perangkat lama mereka sendiri dalam 4 langkah singkat.
2. **Transparan & Meyakinkan:** Setiap produk menampilkan 25 titik inspeksi, kesehatan baterai, dan garansi secara rapi.
3. **Checkout Praktis:** Mendukung transfer bank, QRIS instan, dan cicilan 0% dalam satu layar.`,
    category: "WEB_APP",
    targetSegment: "SME",
    coverImageUrl: "/images/surya/baru-lagi.png",
    previewVideoUrl: "/videos/surya/baru-lagi.mp4",
    liveDemoUrl: "/projects/baru-lagi?demo=interactive",
    externalLiveUrl: "https://another-new-one.vercel.app",
    githubUrl: "https://github.com/suryapamungkas/baru-lagi",
    techStack: [
      { name: "Next.js 16", icon: "nextjs", role: "Full-Stack Storefront" },
      { name: "React 19", icon: "nextjs", role: "Interactive Trade-In UI" },
      { name: "TypeScript", icon: "typescript", role: "Type-Safe Pricing" },
      { name: "Tailwind CSS", icon: "tailwind", role: "Dark Luxury Styling" },
    ],
    metrics: {
      lighthouseScore: 99,
      loadTimeMs: 320,
      impactMetric: "Cek harga tukar tambah selesai dalam 4 klik",
    },
    architectureLayers: [
      {
        layer: "Tampilan Toko",
        choice: "Next.js 16 + Framer Motion + Lenis Scroll",
        rationale: "Navigasi halus dan gambar produk tajam di layar HP maupun laptop.",
      },
      {
        layer: "Database Produk",
        choice: "Prisma ORM + Relational Schema",
        rationale: "Mengelola stok varian kondisi, persentase baterai, dan garansi.",
      },
      {
        layer: "Alur Pembayaran",
        choice: "Slide-Over Cart + QRIS & Transfer",
        rationale: "Pelanggan bisa langsung bayar tanpa berpindah banyak halaman.",
      },
    ],
    beforeAfter: [
      {
        metricLabel: "Cek Harga Tukar Tambah",
        beforeLabel: "Tanya Admin Manual",
        beforeValue: "30 Menit",
        afterLabel: "Kalkulator BaruLagi",
        afterValue: "< 1 Menit",
        improvementNote: "Harga taksiran langsung muncul otomatis di layar.",
      },
      {
        metricLabel: "Langkah Pembelian",
        beforeLabel: "Toko Biasa",
        beforeValue: "5 Halaman",
        afterLabel: "Laci Checkout Cepat",
        afterValue: "1 Layar",
        improvementNote: "Meminimalkan pembeli batal belanja di tengah jalan.",
      },
    ],
    deliverables: [
      "Katalog Produk dengan Filter Grade & Kondisi",
      "Kalkulator Simulasi Tukar Tambah Interaktif",
      "Laci Keranjang Belanja & Checkout QRIS",
      "Database Produk, Varian, & Garansi",
    ],
    timelineWeeks: "2-3 Minggu",
    likesCount: 194,
    viewsCount: 2340,
    isFeatured: true,
    isStandout: true,
    createdAt: "2026",
  },
  {
    id: "surya-02",
    slug: "adidas-pure-concept",
    title: "Adidas Pure Concept Store",
    clientTypeLabel: "Brand Showcase & 3D Product Launch",
    shortDescription:
      "Website peluncuran produk sepatu bergaya Apple dengan bedah komponen 3D interaktif, Bento grid, dan mode terang/gelap.",
    problemStatement:
      "Katalog foto datar sulit menonjolkan kualitas bahan premium seperti sol BOOST dan rajutan Primeknit kepada pembeli online.",
    architectureExecution:
      "Menghadirkan visualisasi lapisan sepatu yang bisa dibedah di layar, mega-menu instan, serta pemilih ukuran yang ramah pengguna.",
    engineeringStory: `### Keunggulan untuk Brand & Produk Anda
1. **Visualisasi Lapisan Produk:** Pengunjung bisa melihat detail material luar hingga sol bagian dalam secara interaktif.
2. **Tampilan Setara Brand Global:** Tata letak Bento grid bersih yang meningkatkan nilai jual produk di mata konsumen.
3. **Navigasi Tanpa Jeda:** Menu kategori dan keranjang belanja terbuka seketika tanpa loading ulang.`,
    category: "INTERACTIVE_WEB",
    targetSegment: "SME",
    coverImageUrl: "/images/surya/adidas-pure-concept.png",
    previewVideoUrl: "/videos/surya/adidas-pure-concept.mp4",
    liveDemoUrl: "/projects/adidas-pure-concept?demo=interactive",
    externalLiveUrl: "https://adidas-pure-concept.vercel.app",
    githubUrl: "https://github.com/suryapamungkas/adidas-pure-concept",
    techStack: [
      { name: "Next.js 16", icon: "nextjs", role: "High-Speed Brand Web" },
      { name: "Framer Motion", icon: "motion", role: "Exploded View Animation" },
      { name: "TypeScript", icon: "typescript", role: "Cart & Size State" },
      { name: "Tailwind CSS", icon: "tailwind", role: "Adaptive Light/Dark UI" },
    ],
    metrics: {
      lighthouseScore: 100,
      loadTimeMs: 290,
      impactMetric: "Interaksi bedah komponen 60fps di HP & Desktop",
    },
    architectureLayers: [
      {
        layer: "Animasi Produk",
        choice: "Framer Motion Interactive Layers",
        rationale: "Memperlihatkan anatomi bahan produk dengan transisi mulus.",
      },
      {
        layer: "Tata Letak",
        choice: "Apple-Inspired Bento Grid + Sticky Mega Menu",
        rationale: "Menyajikan keunggulan produk secara ringkas dan mudah dipindai.",
      },
    ],
    beforeAfter: [
      {
        metricLabel: "Presentasi Detail Produk",
        beforeLabel: "Galeri Foto Biasa",
        beforeValue: "Statis 2D",
        afterLabel: "Exploded View Interaktif",
        afterValue: "Bedah Lapisan 3D",
        improvementNote: "Pengunjung lebih yakin dengan kualitas material produk.",
      },
    ],
    deliverables: [
      "Hero Showcase & Animasi Bedah Komponen Produk",
      "Bento Grid Keunggulan Material & Fitur",
      "Pemilih Ukuran & Laci Belanja Responsif",
      "Dukungan Mode Terang & Gelap Otomatis",
    ],
    timelineWeeks: "1-2 Minggu",
    likesCount: 182,
    viewsCount: 2190,
    isFeatured: true,
    isStandout: true,
    createdAt: "2026",
  },
  {
    id: "surya-03",
    slug: "nusa-asset-management",
    title: "Nusa Asset Management (EAM)",
    clientTypeLabel: "Sistem Manajemen Aset & QR Code Perusahaan",
    shortDescription:
      "Aplikasi web pelacakan aset fisik multi-cabang dengan pembuatan label QR Code instan, hitung penyusutan PSAK 16, dan alur mutasi.",
    problemStatement:
      "Perusahaan multi-cabang sering kehilangan jejak inventori kantor dan salah menghitung nilai buku penyusutan jika masih memakai Excel manual.",
    architectureExecution:
      "Menyatukan data aset Jakarta, Surabaya, Medan, dan Makassar dalam satu dashboard dengan generator QR Code SVG dan kalkulasi PSAK 16 otomatis.",
    engineeringStory: `### Solusi Rapi untuk Operasional Perusahaan
1. **Cetak Label QR Instan:** Setiap aset baru langsung memiliki kode QR siap cetak untuk ditempel dan dipindai petugas.
2. **Hitung Penyusutan Otomatis:** Sistem menghitung nilai buku aset sesuai standar akuntansi PSAK 16 tanpa rumus manual.
3. **Alur Pindah Cabang Jelas:** Dilengkapi persetujuan berjenjang saat aset dipindahkan antar-kantor.`,
    category: "ENTERPRISE_ERP",
    targetSegment: "ENTERPRISE",
    coverImageUrl: "/images/surya/nusa-asset-management.png",
    previewVideoUrl: "/videos/surya/nusa-asset-management.mp4",
    liveDemoUrl: "/projects/nusa-asset-management?demo=interactive",
    externalLiveUrl: "https://nusa-asset-management.vercel.app",
    githubUrl: "https://github.com/suryapamungkas/nusa-asset-management",
    techStack: [
      { name: "Next.js 16", icon: "nextjs", role: "Enterprise Dashboard" },
      { name: "React 19", icon: "nextjs", role: "QR & Audit Views" },
      { name: "TypeScript", icon: "typescript", role: "PSAK 16 Calculation" },
      { name: "Tailwind CSS", icon: "tailwind", role: "Clean Data Tables" },
    ],
    metrics: {
      lighthouseScore: 99,
      loadTimeMs: 340,
      impactMetric: "Audit aset 4 cabang selesai real-time dengan QR",
    },
    architectureLayers: [
      {
        layer: "Mesin Akuntansi",
        choice: "PSAK 16 Straight-Line Depreciation Engine",
        rationale: "Menghitung penyusutan bulanan dan nilai sisa aset secara presisi.",
      },
      {
        layer: "Pelacakan Fisik",
        choice: "Instant SVG QR & Barcode Generator",
        rationale: "Membuat label fisik aset langsung dari browser tanpa software tambahan.",
      },
    ],
    beforeAfter: [
      {
        metricLabel: "Pencarian & Audit Aset Cabang",
        beforeLabel: "File Excel Terpisah",
        beforeValue: "2-3 Hari",
        afterLabel: "Scan QR & Filter Pusat",
        afterValue: "Detik Itu Juga",
        improvementNote: "Lokasi dan penanggung jawab aset langsung terlihat.",
      },
    ],
    deliverables: [
      "Dashboard Inventori Aset Multi-Cabang",
      "Generator Label QR Code & Barcode Siap Cetak",
      "Kalkulator Penyusutan Nilai Buku (PSAK 16)",
      "Modul Persetujuan Mutasi & Transfer Aset",
    ],
    timelineWeeks: "3-5 Minggu",
    likesCount: 171,
    viewsCount: 1980,
    isFeatured: true,
    isStandout: true,
    createdAt: "2026",
  },
  {
    id: "surya-04",
    slug: "traveloop",
    title: "Traveloop Smart Itinerary & Map",
    clientTypeLabel: "Platform Travel, Peta Interaktif & Split-Bill",
    shortDescription:
      "Aplikasi penyusun jadwal liburan kolaboratif dengan peta split-screen, optimasi rute perjalanan, dan hitung patungan biaya otomatis.",
    problemStatement:
      "Menyusun rencana perjalanan grup sering berantakan karena lokasi wisata, estimasi jarak, dan catatan pengeluaran tersebar di banyak chat.",
    architectureExecution:
      "Menggabungkan jadwal harian di sisi kiri dan peta rute interaktif di sisi kanan, lengkap dengan kalkulator pembagian biaya otomatis.",
    engineeringStory: `### Fitur Utama yang Memudahkan Pengguna
1. **Peta & Jadwal Sinkron:** Klik destinasi di jadwal harian, peta langsung mengarah ke titik lokasi beserta estimasi waktu tempuh.
2. **Hitung Patungan Otomatis:** Mencatat pengeluaran grup dan membagi tagihan per orang secara adil.
3. **Katalog Destinasi Kurasi:** Dilengkapi informasi jam buka dan ulasan tempat wisata populer.`,
    category: "WEB_APP",
    targetSegment: "SME",
    coverImageUrl: "/images/surya/traveloop.png",
    previewVideoUrl: "/videos/surya/traveloop.mp4",
    liveDemoUrl: "/projects/traveloop?demo=interactive",
    externalLiveUrl: "https://traveloop-trip.vercel.app",
    githubUrl: "https://github.com/suryapamungkas/traveloop",
    techStack: [
      { name: "Next.js 16", icon: "nextjs", role: "Split-Screen App" },
      { name: "TypeScript", icon: "typescript", role: "Route & Budget Logic" },
      { name: "Tailwind CSS", icon: "tailwind", role: "Responsive Map UI" },
    ],
    metrics: {
      lighthouseScore: 98,
      loadTimeMs: 360,
      impactMetric: "Rute harian & patungan biaya terhitung otomatis",
    },
    architectureLayers: [
      {
        layer: "Mesin Peta",
        choice: "Multi-Provider Map Engine (Leaflet / OSM)",
        rationale: "Menampilkan titik rute perjalanan secara ringan dan interaktif.",
      },
      {
        layer: "Manajemen Biaya",
        choice: "Real-Time Split-Bill Calculator",
        rationale: "Rekap anggaran grup langsung terbarui setiap ada transaksi baru.",
      },
    ],
    beforeAfter: [
      {
        metricLabel: "Menyusun Rute & Anggaran Grup",
        beforeLabel: "Catat Manual di Chat",
        beforeValue: "Berjam-jam",
        afterLabel: "Smart Itinerary Traveloop",
        afterValue: "5 Menit",
        improvementNote: "Jarak antar-lokasi dan pembagian biaya dihitung sistem.",
      },
    ],
    deliverables: [
      "Antarmuka Split-Screen Jadwal & Peta Interaktif",
      "Penyusun Rute Harian & Estimasi Waktu Tempuh",
      "Kalkulator Anggaran & Split-Bill Grup",
      "Katalog Pencarian Destinasi Wisata",
    ],
    timelineWeeks: "2-4 Minggu",
    likesCount: 165,
    viewsCount: 1840,
    isFeatured: false,
    isStandout: true,
    createdAt: "2026",
  },
  {
    id: "surya-05",
    slug: "lexindonesia-legal-platform",
    title: "LexIndonesia Legal Intelligence",
    clientTypeLabel: "Portal Regulasi Hukum & Chrome Extension",
    shortDescription:
      "Platform pencarian undang-undang dan riset hukum terindeks dengan ruang catatan kerja serta ekstensi pendamping Chrome (Manifest V3).",
    problemStatement:
      "Praktisi hukum dan pelaku usaha kesulitan mencari status berlaku sebuah peraturan jika harus membuka ratusan dokumen PDF satu per satu.",
    architectureExecution:
      "Menyediakan mesin pencari regulasi dengan penanda kata kunci instan, status peraturan real-time, dan ekstensi panel samping Chrome.",
    engineeringStory: `### Keunggulan Sistem
1. **Pencarian Pasal Instan:** Menemukan kata kunci di ribuan regulasi lengkap dengan indikator status berlaku atau dicabut.
2. **Ruang Catatan Riset:** Pengguna dapat menyimpan kutipan pasal dan mengekspor catatan riset hukum.
3. **Ekstensi Chrome Pendamping:** Baca dan analisis dokumen hukum berdampingan di browser menggunakan Side Panel API.`,
    category: "AI_SYSTEM",
    targetSegment: "ENTERPRISE",
    coverImageUrl: "/images/surya/lexindonesia-legal-platform.png",
    liveDemoUrl: "/projects/lexindonesia-legal-platform?demo=interactive",
    externalLiveUrl: "https://lexindonesia.vercel.app",
    githubUrl: "https://github.com/suryapamungkas/lexindonesia-legal-platform",
    techStack: [
      { name: "TypeScript", icon: "typescript", role: "Search & Indexing" },
      { name: "Tailwind CSS", icon: "tailwind", role: "Legal Workspace UI" },
      { name: "Next.js 15", icon: "nextjs", role: "Fast Web Portal" },
    ],
    metrics: {
      lighthouseScore: 99,
      loadTimeMs: 310,
      impactMetric: "Pencarian pasal & status hukum dalam hitungan detik",
    },
    architectureLayers: [
      {
        layer: "Mesin Pencari",
        choice: "Indexed Law Search + Keyword Highlighter",
        rationale: "Menyorot pasal relevan secara instan saat pengguna mengetik.",
      },
      {
        layer: "Integrasi Browser",
        choice: "Chrome Extension Manifest V3 Side Panel",
        rationale: "Memungkinkan riset regulasi tanpa menutup tab kerja utama.",
      },
    ],
    beforeAfter: [
      {
        metricLabel: "Lama Pencarian Rujukan Pasal",
        beforeLabel: "Buka PDF Manual",
        beforeValue: "45 Menit",
        afterLabel: "Pencarian Terindeks LexIndonesia",
        afterValue: "< 10 Detik",
        improvementNote: "Langsung menampilkan ayat terkait beserta status berlakunya.",
      },
    ],
    deliverables: [
      "Mesin Pencari Peraturan dengan Penyorot Kata Kunci",
      "Sistem Akses Member (Gratis vs Pro)",
      "Workspace Catatan Riset & Ekspor Dokumen",
      "Ekstensi Pendamping Google Chrome (Manifest V3)",
    ],
    timelineWeeks: "3-5 Minggu",
    likesCount: 158,
    viewsCount: 1760,
    isFeatured: false,
    isStandout: false,
    createdAt: "2026",
  },
  {
    id: "surya-06",
    slug: "resilio-id",
    title: "Resilio.id Financial Health Platform",
    clientTypeLabel: "Web App Diagnosa Finansial & Kalkulator",
    shortDescription:
      "Platform cek kesehatan keuangan keluarga dan komunitas dengan kuis diagnostik dini, kalkulator dana darurat, dan panduan krisis.",
    problemStatement:
      "Banyak keluarga dan pelaku usaha kecil belum tahu berapa jumlah dana darurat aman untuk menghadapi risiko kehilangan pendapatan.",
    architectureExecution:
      "Merancang alat cek kesehatan finansial interaktif yang langsung menghitung target tabungan darurat dan langkah penyelamatan 48 jam.",
    engineeringStory: `### Nilai Tambah Proyek
1. **Diagnosa Cepat & Mudah:** Pengunjung cukup mengisi data singkat untuk melihat skor ketahanan keuangan mereka.
2. **Kalkulator Dana Darurat:** Menghitung target kas aman secara otomatis sesuai tanggungan keluarga.
3. **Dua Mode Pengguna:** Tersedia untuk rumah tangga pribadi maupun dana gotong-royong komunitas.`,
    category: "WEB_APP",
    targetSegment: "INDIVIDUAL",
    coverImageUrl: "/images/surya/resilio.id.png",
    liveDemoUrl: "/projects/resilio-id?demo=interactive",
    externalLiveUrl: "https://resilioid.vercel.app",
    githubUrl: "https://github.com/suryapamungkas/resilio.id",
    techStack: [
      { name: "Next.js 15", icon: "nextjs", role: "Interactive FinTech Web" },
      { name: "TypeScript", icon: "typescript", role: "Financial Calculator" },
      { name: "Zod", icon: "zod", role: "Diagnostic Form Validation" },
      { name: "Tailwind CSS", icon: "tailwind", role: "Clean Accessible UI" },
    ],
    metrics: {
      lighthouseScore: 100,
      loadTimeMs: 280,
      impactMetric: "Diagnosa kesehatan finansial instan dalam 2 menit",
    },
    architectureLayers: [
      {
        layer: "Mesin Diagnosa",
        choice: "React Hook Form + Zod Validation",
        rationale: "Memastikan input angka akurat dan aman di perangkat pengguna.",
      },
    ],
    beforeAfter: [
      {
        metricLabel: "Hitung Kebutuhan Dana Darurat",
        beforeLabel: "Hitung Manual",
        beforeValue: "Membingungkan",
        afterLabel: "Simulator Resilio.id",
        afterValue: "Otomatis & Terukur",
        improvementNote: "Menampilkan tahapan tabungan bulanan yang realistis.",
      },
    ],
    deliverables: [
      "Alat Cek Kesehatan Finansial Interaktif",
      "Kalkulator Simulasi Dana Darurat",
      "Panduan Langkah Cepat Menghadapi Krisis",
      "Halaman Edukasi 6 Pilar Ketahanan Ekonomi",
    ],
    timelineWeeks: "1-3 Minggu",
    likesCount: 144,
    viewsCount: 1620,
    isFeatured: false,
    isStandout: false,
    createdAt: "2026",
  },
  {
    id: "surya-07",
    slug: "vanguard-human-capital",
    title: "SDM Unggul EdTech & Career Diagnostic",
    clientTypeLabel: "Platform Kursus Online & Tes Kesiapan Karier",
    shortDescription:
      "Website edukasi vokasi dengan tes diagnostik karier 90 hari, simulator beasiswa, dan mode hemat kuota untuk jaringan internet rendah.",
    problemStatement:
      "Peserta pelatihan di daerah sering gagal mengakses materi video belajar karena ukuran website kursus biasa terlalu berat.",
    architectureExecution:
      "Menyediakan Mode Hemat Kuota (<5MB) dengan opsi pemutar audio, tes pemetaan kurikulum 90 hari, dan cek subsidi beasiswa instan.",
    engineeringStory: `### Mengapa Desain Ini Efektif?
1. **Ramah Sinyal Rendah:** Tetap lancar dibuka dari ponsel di wilayah dengan sinyal terbatas berkat mode hemat data.
2. **Peta Belajar Otomatis:** Tes diagnostik awal langsung menyusun kurikulum 90 hari sesuai keahlian peserta.
3. **Simulator Beasiswa:** Memudahkan calon peserta mengecek kuota subsidi secara transparan.`,
    category: "PERSONAL_BRAND",
    targetSegment: "SME",
    coverImageUrl: "/images/surya/vanguard-human-capital.png",
    liveDemoUrl: "/projects/vanguard-human-capital?demo=interactive",
    externalLiveUrl: "https://sdm-unggul.vercel.app",
    githubUrl: "https://github.com/suryapamungkas/vanguard-human-capital",
    techStack: [
      { name: "Next.js 15", icon: "nextjs", role: "Lightweight EdTech UI" },
      { name: "TypeScript", icon: "typescript", role: "Diagnostic Roadmap" },
      { name: "Tailwind CSS", icon: "tailwind", role: "Adaptive Bandwidth Mode" },
    ],
    metrics: {
      lighthouseScore: 100,
      loadTimeMs: 250,
      impactMetric: "Mode hemat kuota < 5MB untuk akses seluruh Indonesia",
    },
    architectureLayers: [
      {
        layer: "Optimasi Jaringan",
        choice: "Low-Bandwidth Adaptive Rendering",
        rationale: "Menghemat kuota data pengguna hingga 80% dengan mode audio.",
      },
    ],
    beforeAfter: [
      {
        metricLabel: "Konsumsi Kuota Belajar",
        beforeLabel: "Streaming Video Berat",
        beforeValue: "> 150 MB / Sesi",
        afterLabel: "Mode Adaptif SDM Unggul",
        afterValue: "< 5 MB / Sesi",
        improvementNote: "Materi tetap bisa dipelajari tanpa buffering.",
      },
    ],
    deliverables: [
      "Katalog 8 Pilar Kurikulum Vokasi",
      "Tes Diagnostik Kesiapan Karier & Rencana 90 Hari",
      "Pemutar Materi Video & Mode Audio Hemat Kuota",
      "Simulator Cek Beasiswa & Voucher Pelatihan",
    ],
    timelineWeeks: "2-3 Minggu",
    likesCount: 139,
    viewsCount: 1540,
    isFeatured: false,
    isStandout: false,
    createdAt: "2026",
  },
  {
    id: "surya-08",
    slug: "nusa-decarb",
    title: "NusaDecarb ESG & Carbon Platform",
    clientTypeLabel: "Dashboard Audit Emisi Karbon & Kepatuhan ESG",
    shortDescription:
      "Platform pemantauan emisi karbon industri, audit efisiensi energi, dan pelaporan kepatuhan taksonomi hijau menuju Net Zero 2060.",
    problemStatement:
      "Perusahaan industri membutuhkan dashboard yang rapi untuk memantau pengurangan emisi karbon dan menyiapkan laporan kepatuhan ESG.",
    architectureExecution:
      "Menyajikan visualisasi metrik emisi real-time, kalkulator efisiensi termal, dan kesiapan integrasi perdagangan karbon (IDX Carbon).",
    engineeringStory: `### Fokus Rekayasa
1. **Visualisasi Data Bersih:** Mengubah data audit energi yang rumit menjadi grafik yang mudah dipahami manajemen.
2. **Siap Standar Regulasi:** Disesuaikan dengan kerangka Taksonomi Hijau Indonesia dan pelaporan MRV.`,
    category: "ENTERPRISE_ERP",
    targetSegment: "ENTERPRISE",
    coverImageUrl: "/images/surya/nusa-decarb.png",
    liveDemoUrl: "/projects/nusa-decarb?demo=interactive",
    externalLiveUrl: "https://nusa-decarb.vercel.app",
    githubUrl: "https://github.com/suryapamungkas/nusa-decarb",
    techStack: [
      { name: "React 19", icon: "nextjs", role: "ESG Analytics UI" },
      { name: "TypeScript", icon: "typescript", role: "Carbon MRV Metrics" },
      { name: "Tailwind CSS", icon: "tailwind", role: "Clean Corporate Theme" },
    ],
    metrics: {
      lighthouseScore: 99,
      loadTimeMs: 310,
      impactMetric: "Pelaporan emisi & audit ESG terpusat dalam 1 portal",
    },
    architectureLayers: [
      {
        layer: "Dashboard Eksekutif",
        choice: "React 19 + TypeScript Telemetry Cards",
        rationale: "Memudahkan pemantauan target penurunan emisi tahunan.",
      },
    ],
    beforeAfter: [
      {
        metricLabel: "Rekap Laporan Emisi Tahunan",
        beforeLabel: "Dokumen Terpisah",
        beforeValue: "Mingguan",
        afterLabel: "Dashboard NusaDecarb",
        afterValue: "Real-Time",
        improvementNote: "Data audit langsung terstruktur rapi untuk manajemen.",
      },
    ],
    deliverables: [
      "Dashboard Pemantauan Emisi Karbon & Efisiensi Energi",
      "Modul Kepatuhan Taksonomi Hijau & IDX Carbon",
      "Halaman Profil Layanan Konsultasi ESG",
    ],
    timelineWeeks: "2-4 Minggu",
    likesCount: 132,
    viewsCount: 1490,
    isFeatured: false,
    isStandout: false,
    createdAt: "2026",
  },
  {
    id: "surya-09",
    slug: "llm-evaluation-dashboard",
    title: "LLM Evaluation & Prompt Dashboard",
    clientTypeLabel: "Dashboard Uji Akurasi AI & Prompt Engineering",
    shortDescription:
      "Aplikasi evaluasi performa model AI (GPT-4o & Gemini) dengan pengujian A/B prompt, penilaian otomatis, dan grafik perbandingan akurasi.",
    problemStatement:
      "Saat memasang fitur AI di bisnis, tim perlu memastikan jawaban AI akurat, konsisten, dan tidak salah memberikan informasi ke pelanggan.",
    architectureExecution:
      "Dibangun dengan Python FastAPI, SQLite, dan Docker untuk menguji berbagai versi prompt secara paralel dan mengukur skor akurasinya.",
    engineeringStory: `### Mengapa Penting untuk Proyek AI Anda?
1. **Uji Akurasi Sebelum Rilis:** Membandingkan kualitas jawaban beberapa model AI sekaligus terhadap data acuan bisnis Anda.
2. **A/B Testing Prompt:** Menemukan instruksi prompt yang paling hemat biaya dan paling tepat sasaran.`,
    category: "AI_SYSTEM",
    targetSegment: "ENTERPRISE",
    coverImageUrl: "/images/surya/llm-evaluation-dashboard.png",
    liveDemoUrl: "/projects/llm-evaluation-dashboard?demo=interactive",
    githubUrl: "https://github.com/suryapamungkas/llm-evaluation-dashboard",
    techStack: [
      { name: "Python", icon: "python", role: "FastAPI Evaluation Core" },
      { name: "Gemini API", icon: "gemini", role: "LLM-as-a-Judge" },
      { name: "PostgreSQL", icon: "postgres", role: "Benchmark Run Storage" },
    ],
    metrics: {
      lighthouseScore: 98,
      loadTimeMs: 350,
      impactMetric: "Uji akurasi multi-model AI otomatis & terukur",
    },
    architectureLayers: [
      {
        layer: "Backend AI",
        choice: "Python FastAPI + Docker Container",
        rationale: "Menjalankan pengujian ratusan skenario tanya-jawab secara paralel.",
      },
    ],
    beforeAfter: [
      {
        metricLabel: "Validasi Kualitas Jawaban Chatbot",
        beforeLabel: "Cek Satu per Satu",
        beforeValue: "Manual & Lama",
        afterLabel: "Automated Judge Rubric",
        afterValue: "Skor Otomatis",
        improvementNote: "Memastikan fitur AI aman digunakan pelanggan.",
      },
    ],
    deliverables: [
      "Dashboard Perbandingan Model AI (Gemini / GPT)",
      "Sistem Penilaian Akurasi Otomatis (Ground Truth)",
      "Manajemen Versi Prompt & Grafik Metrik",
    ],
    timelineWeeks: "2-4 Minggu",
    likesCount: 128,
    viewsCount: 1410,
    isFeatured: false,
    isStandout: false,
    createdAt: "2026",
  },
  {
    id: "surya-10",
    slug: "trustchain-umkm",
    title: "TrustChain UMKM Export Tracker",
    clientTypeLabel: "Platform Verifikasi Rantai Pasok & Ekspor UMKM",
    shortDescription:
      "Website pelacakan pengiriman ekspor-impor UMKM dengan verifikasi dokumen otomatis dan pantauan status kargo lintas negara.",
    problemStatement:
      "Pelaku UMKM yang ingin ekspor sering terkendala transparansi pelacakan barang dan verifikasi dokumen perdagangan dengan pembeli luar negeri.",
    architectureExecution:
      "Menyediakan portal pelacakan kargo transparan dan verifikasi kelengkapan dokumen ekspor berbasis analitik AI.",
    engineeringStory: `### Manfaat bagi Bisnis Ekspor & Logistik
1. **Kepercayaan Pembeli Global:** Mitra luar negeri dapat memantau riwayat perjalanan dan keaslian barang secara transparan.
2. **Cek Dokumen Cepat:** Meminimalkan risiko kesalahan administrasi pengiriman lintas negara.`,
    category: "PERSONAL_BRAND",
    targetSegment: "SME",
    coverImageUrl: "/images/surya/trustchain.png",
    liveDemoUrl: "/projects/trustchain-umkm?demo=interactive",
    externalLiveUrl: "https://trustchain-umkm.vercel.app/",
    githubUrl: "https://github.com/suryapamungkas",
    techStack: [
      { name: "Next.js 15", icon: "nextjs", role: "Supply Chain Portal" },
      { name: "TypeScript", icon: "typescript", role: "Shipment Verification" },
      { name: "Tailwind CSS", icon: "tailwind", role: "Clean Logistics UI" },
    ],
    metrics: {
      lighthouseScore: 99,
      loadTimeMs: 300,
      impactMetric: "Verifikasi pengiriman ekspor UMKM transparan",
    },
    architectureLayers: [
      {
        layer: "Portal Pelacakan",
        choice: "React + AI Compliance Checker",
        rationale: "Menampilkan tahapan pengiriman dari gudang lokal hingga pelabuhan tujuan.",
      },
    ],
    beforeAfter: [
      {
        metricLabel: "Pantau Status Kargo Ekspor",
        beforeLabel: "Tanya Forwarder Manual",
        beforeValue: "Lambat",
        afterLabel: "Portal TrustChain",
        afterValue: "Real-Time",
        improvementNote: "Pembeli dan penjual melihat status pengiriman yang sama.",
      },
    ],
    deliverables: [
      "Dashboard Pelacakan Pengiriman Ekspor-Impor",
      "Modul Verifikasi Dokumen & Kepatuhan Dagang",
      "Halaman Profil Kredibilitas Mitra UMKM",
    ],
    timelineWeeks: "2-3 Minggu",
    likesCount: 121,
    viewsCount: 1350,
    isFeatured: false,
    isStandout: false,
    createdAt: "2026",
  },
  {
    id: "surya-11",
    slug: "smart-vegetable-detector",
    title: "Smart Vegetable AI Detector (PWA)",
    clientTypeLabel: "Aplikasi Web Kamera AI Offline di Browser",
    shortDescription:
      "Aplikasi web progresif (PWA) pendeteksi jenis sayuran lewat kamera dengan info nutrisi otomatis yang berjalan langsung di browser tanpa kuota server.",
    problemStatement:
      "Aplikasi deteksi gambar biasanya harus mengirim foto ke server cloud sehingga lambat saat sinyal lemah dan memakan biaya server tinggi.",
    architectureExecution:
      "Menjalankan model TensorFlow.js dan Transformers.js langsung di perangkat pengguna dengan akselerasi WebGPU dan mode offline penuh.",
    engineeringStory: `### Keunggulan Teknologi
1. **100% Berjalan di Browser:** Deteksi kamera bekerja instan tanpa perlu mengunggah foto pengguna ke server luar.
2. **Bisa Dipakai Offline:** Tetap berfungsi penuh meskipun internet dimatikan berkat teknologi Progressive Web App (PWA).`,
    category: "AI_SYSTEM",
    targetSegment: "INDIVIDUAL",
    coverImageUrl: "/images/surya/smart-vegetable-detector.png",
    liveDemoUrl: "/projects/smart-vegetable-detector?demo=interactive",
    externalLiveUrl: "https://smart-vegetable-detector.netlify.app",
    githubUrl: "https://github.com/suryapamungkas/smart-vegetable-detector",
    techStack: [
      { name: "TypeScript", icon: "typescript", role: "On-Device AI Logic" },
      { name: "Next.js 15", icon: "nextjs", role: "Offline-Ready PWA" },
    ],
    metrics: {
      lighthouseScore: 100,
      loadTimeMs: 240,
      impactMetric: "Deteksi kamera real-time & berjalan 100% offline",
    },
    architectureLayers: [
      {
        layer: "Client-Side AI",
        choice: "TensorFlow.js + Transformers.js + WebGPU",
        rationale: "Nol biaya server AI dan privasi foto pengguna terjaga penuh.",
      },
    ],
    beforeAfter: [
      {
        metricLabel: "Kecepatan Deteksi Kamera",
        beforeLabel: "Upload ke Server",
        beforeValue: "3-5 Detik",
        afterLabel: "On-Device WebGPU",
        afterValue: "Instan (< 200ms)",
        improvementNote: "Langsung mengenali objek dan menampilkan info nutrisi.",
      },
    ],
    deliverables: [
      "Kamera Deteksi Objek Real-Time di Browser",
      "Generator Ringkasan Info Otomatis (On-Device LLM)",
      "Instalasi PWA ke Layar Utama HP (Offline Mode)",
    ],
    timelineWeeks: "1-2 Minggu",
    likesCount: 136,
    viewsCount: 1480,
    isFeatured: false,
    isStandout: false,
    createdAt: "2026",
  },
];

export interface ServiceComparisonRow {
  dimension: string;
  individualSme: string;
  enterprise: string;
}

export const SERVICE_COMPARISON_MATRIX: ServiceComparisonRow[] = [
  {
    dimension: "Cocok Untuk",
    individualSme:
      "Personal branding, portofolio profesional, landing page produk, dan toko online UMKM.",
    enterprise:
      "Sistem inventori cabang, aplikasi web perusahaan, dashboard data, dan integrasi AI.",
  },
  {
    dimension: "Waktu Pengerjaan",
    individualSme: "Cepat & terukur: 3 hari hingga 2 minggu siap online.",
    enterprise: "Bertahap per modul: 3 hingga 6 minggu hingga siap pakai.",
  },
  {
    dimension: "Kemudahan Kelola",
    individualSme:
      "Mudah diedit sendiri, langsung terhubung ke WhatsApp dan pembayaran QRIS.",
    enterprise:
      "Database terpusat, hak akses staf bertingkat, cetak QR, dan laporan otomatis.",
  },
];

export interface ServicePackageTier {
  id: string;
  name: string;
  segment: ClientSegment;
  badge: string;
  timeline: string;
  priceRangeIDR: string;
  summary: string;
  idealFor: string;
  includedModules: string[];
  technicalGuarantees: string[];
  defaultPrompt: string;
}

export const SERVICE_PACKAGES: ServicePackageTier[] = [
  {
    id: "pkg-personal-editorial",
    name: "Personal Web & Landing Page",
    segment: "INDIVIDUAL",
    badge: "Personal & Kreator",
    timeline: "3-7 Hari Kerja",
    priceRangeIDR: "Rp 1,5 Jt - Rp 4,5 Jt",
    summary:
      "Website profil profesional, CV online, atau halaman promosi produk yang rapi dan langsung mengarahkan klien ke WhatsApp Anda.",
    idealFor:
      "Profesional, Freelancer, Konsultan, Kreator, dan Bisnis Jasa Baru.",
    includedModules: [
      "Desain modern & bersih sesuai identitas Anda",
      "Responsif di layar HP, tablet, dan laptop",
      "Tombol kontak langsung ke WhatsApp & formulir pesan",
      "Optimasi SEO dasar agar mudah ditemukan di Google",
    ],
    technicalGuarantees: [
      "Waktu muat cepat (< 1 detik)",
      "Gratis pasang ke domain & hosting pilihan",
      "Garansi revisi & panduan cara pakai",
    ],
    defaultPrompt:
      "Saya ingin membuat paket Personal Web & Landing Page untuk menampilkan profil, karya/layanan, dan tombol pesan langsung ke WhatsApp.",
  },
  {
    id: "pkg-umkm-commerce",
    name: "Website UMKM & Toko Online",
    segment: "SME",
    badge: "Paling Populer untuk UMKM",
    timeline: "1-3 Minggu",
    priceRangeIDR: "Rp 5 Jt - Rp 12 Jt",
    summary:
      "Website katalog produk interaktif, kalkulator harga/tukar tambah, atau toko online lengkap dengan pembayaran otomatis.",
    idealFor:
      "Toko Ritel, Brand F&B, Gadget Store (seperti BaruLagi), Travel, dan UMKM.",
    includedModules: [
      "Katalog produk dengan filter kategori & varian",
      "Keranjang belanja praktis & hitung harga otomatis",
      "Integrasi pembayaran QRIS / Transfer atau Order ke WhatsApp",
      "Halaman admin mudah untuk tambah produk & cek pesanan",
    ],
    technicalGuarantees: [
      "Skor kecepatan Lighthouse 95+",
      "Bebas potongan komisi marketplace",
      "Pendampingan penuh sampai tim Anda bisa mengelola sendiri",
    ],
    defaultPrompt:
      "Saya ingin membuat Website UMKM & Toko Online dengan katalog produk, keranjang belanja, dan integrasi pembayaran QRIS / WhatsApp.",
  },
  {
    id: "pkg-enterprise-custom",
    name: "Custom Web App & Sistem AI",
    segment: "ENTERPRISE",
    badge: "Perusahaan & Startup",
    timeline: "3-6 Minggu",
    priceRangeIDR: "Rp 15 Jt - Rp 45 Jt+",
    summary:
      "Aplikasi web kustom sesuai alur kerja perusahaan: manajemen aset QR, portal dokumen, atau fitur asisten AI pintar.",
    idealFor:
      "Perusahaan Multi-Cabang, Lembaga Hukum, EdTech, Logistik, dan Startup.",
    includedModules: [
      "Pengembangan Full-Stack (Next.js 16, React 19, TypeScript, Python)",
      "Fitur AI kustom (Pencarian dokumen pintar, ringkasan, atau deteksi)",
      "Manajemen pengguna multi-cabang & cetak QR/Laporan PDF",
      "Kode sumber penuh (Full Source Code) menjadi hak milik Anda",
    ],
    technicalGuarantees: [
      "Arsitektur aman & siap berkembang",
      "Dokumentasi lengkap & serah terima kode",
      "Garansi pemeliharaan pasca-rilis",
    ],
    defaultPrompt:
      "Perusahaan kami ingin membangun Custom Web App / Sistem AI untuk manajemen operasional cabang dan otomatisasi data.",
  },
];

export const VERIFIED_ENGINEERING_PILLARS = [
  {
    id: "pillar-mvp",
    title: "Desain Rapi & Mudah Dipahami",
    subtitle:
      "Tampilan bersih tanpa teks berlebihan agar pengunjung langsung paham layanan Anda dan tertarik menghubungi.",
    badges: ["Nyaman di HP", "Navigasi Jelas", "Siap Konversi"],
  },
  {
    id: "pillar-enterprise",
    title: "Cepat Dibuka & Ramah Google",
    subtitle:
      "Dibangun dengan teknologi web terbaru (Next.js 16 & React 19) sehingga halaman terbuka dalam hitungan milidetik.",
    badges: ["Skor 98+ Lighthouse", "Struktur SEO Rapi", "Keamanan SSL"],
  },
  {
    id: "pillar-ai",
    title: "Dikerjakan Langsung oleh Developer",
    subtitle:
      "Anda berkomunikasi langsung dengan Surya Pamungkas dari tahap ide, desain, hingga website resmi online.",
    badges: ["Tanpa Perantara", "17+ Sertifikasi AI & Web", "Garansi Support"],
  },
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return PORTFOLIO_PROJECTS.find((project) => project.slug === slug);
}
