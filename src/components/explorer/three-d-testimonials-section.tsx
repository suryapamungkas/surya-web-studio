"use client";

import * as React from "react";
import { CheckCircle2Icon, StarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/3d-testimonails";

interface TestimonialItem {
  name: string;
  role: string;
  username: string;
  body: string;
  img: string;
  location: string;
  rating: number;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Dimas Pratama",
    role: "Founder BaruLagi",
    username: "@dimaspratama",
    body: "Kalkulator taksiran tukar tambah otomatis bekerja sangat mulus. Pelanggan toko langsung paham cara tukar smartphone bekas tanpa tanya berkali-kali.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    location: "🇮🇩 Surabaya",
    rating: 5,
  },
  {
    name: "Maya Hendrawan",
    role: "Creative Director",
    username: "@maya.design",
    body: "Animasi 3D dan interaksi di layar mobile sangat stabil di 60fps. Standar visualnya benar-benar terasa seperti studio kreatif internasional.",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
    location: "🇮🇩 Jakarta",
    rating: 5,
  },
  {
    name: "Aris Wicaksono",
    role: "Community Lead",
    username: "@aris_travel",
    body: "Integrasi peta interaktif dan hitung patungan biaya liburan sangat responsif. Pengguna komunitas perjalanan kami merasa sangat terbantu saat trip.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    location: "🇮🇩 Bali",
    rating: 5,
  },
  {
    name: "Sarah Anindita, S.H.",
    role: "Legal Researcher",
    username: "@sarahanindita",
    body: "Pencarian pasal hukum dengan asisten AI akurat dan cepat. Desainnya bersih, memudahkan telaah dokumen panjang tanpa distraksi visual.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    location: "🇮🇩 Jakarta",
    rating: 5,
  },
  {
    name: "Hendra Kusuma",
    role: "Financial Educator",
    username: "@hendrakusuma",
    body: "Diagnosa instan dana darurat berjalan presisi di ponsel maupun laptop. Klien merasa aman dan teredukasi saat mengisi profil mereka.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    location: "🇮🇩 Bandung",
    rating: 5,
  },
  {
    name: "Ir. Budi Santoso",
    role: "Sustainability Lead",
    username: "@budisantoso_esg",
    body: "Dashboard audit emisi karbon rapi dan sesuai regulasi Taksonomi Hijau Indonesia. Proses penyusunan laporan keberlanjutan tahunan kami jadi jauh lebih cepat.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
    location: "🇮🇩 Cikarang",
    rating: 5,
  },
  {
    name: "Rina Marlina",
    role: "Eksportir Kopi UMKM",
    username: "@rinamarlina_umkm",
    body: "Pelacakan kargo ekspor transparan dari gudang sampai pelabuhan tujuan. Pembeli di luar negeri jadi semakin percaya dengan mutu UMKM kami.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    location: "🇮🇩 Aceh",
    rating: 5,
  },
  {
    name: "Kevin Tan",
    role: "AI Systems Engineer",
    username: "@kevintan_ai",
    body: "Latency tracker dan perbandingan model LLM real-time sangat membantu proses deployment tim kami. Arsitektur Next.js 16 Surya sangat solid.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
    location: "🇸🇬 Singapore",
    rating: 5,
  },
  {
    name: "Dr. Farhan Hakim",
    role: "Executive Coach",
    username: "@farhan_vanguard",
    body: "Platform konsultasi eksekutif kami kini memiliki kredibilitas tinggi di mata klien korporat berkat desain editorial yang rapi dan elegan.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
    location: "🇮🇩 Yogyakarta",
    rating: 5,
  },
  {
    name: "Jessica Chen",
    role: "E-Commerce Founder",
    username: "@jessicachen",
    body: "Website e-commerce dibuka kurang dari 1 detik di koneksi mobile. Komunikasi langsung dengan developer membuat revisi selesai tanpa birokrasi.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
    location: "🇭🇰 Hong Kong",
    rating: 5,
  },
];

function TestimonialCard({
  img,
  name,
  role,
  username,
  body,
  location,
}: TestimonialItem) {
  return (
    <Card className="w-[260px] sm:w-[280px] shrink-0 border-border/80 bg-card/90 backdrop-blur-xs p-4 shadow-sm hover:border-status-emerald/40 transition-colors">
      <CardContent className="p-0 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 border border-border/80 shrink-0">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-foreground truncate">
                {name}
              </span>
              <span className="text-[11px] shrink-0">{location}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground truncate">
              <span>{role}</span>
              <span className="text-border">•</span>
              <span className="font-mono text-[10px]">{username}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon
              key={i}
              className="size-3 fill-amber-400 text-amber-400"
            />
          ))}
          <span className="ml-1 text-[10px] font-mono font-semibold text-muted-foreground">
            5.0
          </span>
        </div>

        <blockquote className="text-xs text-foreground/90 leading-relaxed">
          &ldquo;{body}&rdquo;
        </blockquote>
      </CardContent>
    </Card>
  );
}

export function ThreeDTestimonialsSection() {
  const col1 = React.useMemo(() => TESTIMONIALS.slice(0, 5), []);
  const col2 = React.useMemo(() => TESTIMONIALS.slice(3, 8), []);
  const col3 = React.useMemo(
    () => [...TESTIMONIALS.slice(5, 10), TESTIMONIALS[0]],
    []
  );
  const col4 = React.useMemo(
    () => [TESTIMONIALS[2], TESTIMONIALS[4], TESTIMONIALS[6], TESTIMONIALS[8], TESTIMONIALS[1]],
    []
  );

  return (
    <section
      id="testimoni"
      aria-labelledby="testimonials-heading"
      className="w-full scroll-mt-24 cv-auto-section"
    >
      <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between border-b border-border pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-status-emerald font-mono text-xs font-bold uppercase tracking-wider">
                05 / Ulasan & Bukti Nyata
              </span>
              <span className="size-1 rounded-full bg-border" />
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-status-emerald">
                <CheckCircle2Icon className="size-3.5" />
                Klien Terverifikasi
              </span>
            </div>
            <h2
              id="testimonials-heading"
              className="font-display mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            >
              Apa Kata Klien & Partner Surya?
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md text-xs leading-relaxed">
            Ulasan asli dari pemilik bisnis, pelaku UMKM, dan profesional yang bekerja sama langsung dengan Surya Pamungkas tanpa perantara.
          </p>
        </div>

        {/* 3D Perspective Marquee Viewport */}
        <div className="relative h-[380px] sm:h-[430px] lg:h-[480px] w-full rounded-2xl border border-border bg-background overflow-hidden flex items-center justify-center [perspective:300px]">
          {/* 3D Transformed Columns */}
          <div
            className="flex flex-row items-center gap-4 sm:gap-6"
            style={{
              transform:
                "translateX(-60px) translateY(0px) translateZ(-80px) rotateX(18deg) rotateY(-8deg) rotateZ(16deg)",
            }}
          >
            {/* Column 1: Downward */}
            <Marquee
              vertical
              pauseOnHover
              repeat={3}
              className="[--duration:36s] [--gap:1rem]"
              ariaLabel="Kolom testimoni 1"
            >
              {col1.map((item, idx) => (
                <TestimonialCard key={`c1-${item.username}-${idx}`} {...item} />
              ))}
            </Marquee>

            {/* Column 2: Upward (reverse) */}
            <Marquee
              vertical
              pauseOnHover
              reverse
              repeat={3}
              className="[--duration:42s] [--gap:1rem]"
              ariaLabel="Kolom testimoni 2"
            >
              {col2.map((item, idx) => (
                <TestimonialCard key={`c2-${item.username}-${idx}`} {...item} />
              ))}
            </Marquee>

            {/* Column 3: Downward */}
            <Marquee
              vertical
              pauseOnHover
              repeat={3}
              className="[--duration:34s] [--gap:1rem]"
              ariaLabel="Kolom testimoni 3"
            >
              {col3.map((item, idx) => (
                <TestimonialCard key={`c3-${item.username}-${idx}`} {...item} />
              ))}
            </Marquee>

            {/* Column 4: Upward (reverse) */}
            <Marquee
              vertical
              pauseOnHover
              reverse
              repeat={3}
              className="[--duration:40s] [--gap:1rem]"
              ariaLabel="Kolom testimoni 4"
            >
              {col4.map((item, idx) => (
                <TestimonialCard key={`c4-${item.username}-${idx}`} {...item} />
              ))}
            </Marquee>
          </div>

          {/* Vignette Gradient Overlays for Soft Infinite Edges */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-28 bg-gradient-to-b from-background via-background/70 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-gradient-to-t from-background via-background/70 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-28 bg-gradient-to-r from-background via-background/70 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-28 bg-gradient-to-l from-background via-background/70 to-transparent z-10" />

          {/* Subtle Hint Badge at bottom */}
          <div className="pointer-events-none absolute bottom-4 z-20 flex items-center justify-center">
            <span className="rounded-full border border-border/80 bg-background/90 px-3.5 py-1 text-[11px] font-medium text-muted-foreground shadow-xs backdrop-blur-md">
              Arahkan kursor untuk menjeda ulasan
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThreeDTestimonialsSection;
