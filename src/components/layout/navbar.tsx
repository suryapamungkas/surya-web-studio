"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookmarkIcon,
  FileTextIcon,
  MailIcon,
  MenuIcon,
  XIcon,
  ShoppingBagIcon,
  GlobeIcon,
  SparklesIcon,
  BotIcon,
  CpuIcon,
  SearchIcon,
  BoxesIcon,
  ShieldCheckIcon,
  BoxIcon,
  RocketIcon,
  CheckCircle2Icon,
  StarIcon,
  ArrowRightIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownNavigation,
  type NavItem,
} from "@/components/ui/dorpdown-navigation";
import { useAgencyStore } from "@/lib/agency-store";
import { SURYA_PROFILE } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const bookmarkedSlugs = useAgencyStore((state) => state.bookmarkedSlugs);
  const openContactModal = useAgencyStore((state) => state.openContactModal);

  React.useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const desktopNavItems = React.useMemo<NavItem[]>(
    () => [
      {
        id: 1,
        label: "Karya Website",
        subMenus: [
          {
            title: "Web App & Toko Online",
            items: [
              {
                label: "BaruLagi Marketplace",
                description: "Trade-In & kalkulator otomatis",
                icon: ShoppingBagIcon,
                badge: "E-Commerce",
                href: "/projects/barulagi",
              },
              {
                label: "Traveloop Platform",
                description: "Itinerary pintar & split-bill",
                icon: GlobeIcon,
                badge: "Travel",
                href: "/projects/traveloop-itinerary-map",
              },
              {
                label: "Resilio.id Health",
                description: "Asisten kesehatan mental",
                icon: SparklesIcon,
                badge: "Health",
                href: "/projects/resilio-mental-health-companion",
              },
            ],
          },
          {
            title: "Sistem AI & Riset",
            items: [
              {
                label: "LexIndonesia AI",
                description: "Asisten telaah dokumen hukum",
                icon: BotIcon,
                badge: "AI Copilot",
                href: "/projects/lexindonesia-legal-copilot",
              },
              {
                label: "Smart Vegetable AI",
                description: "Deteksi kamera offline di browser",
                icon: CpuIcon,
                badge: "WebGPU PWA",
                href: "/projects/smart-vegetable-detector",
              },
              {
                label: "LLM Eval Dashboard",
                description: "Uji akurasi & latensi model",
                icon: SearchIcon,
                badge: "Benchmark",
                href: "/projects/llm-eval-benchmark-tracker",
              },
            ],
          },
          {
            title: "Solusi Bisnis & 3D",
            items: [
              {
                label: "NusaDecarb ESG",
                description: "Audit emisi & kalkulator karbon",
                icon: BoxesIcon,
                badge: "Enterprise",
                href: "/projects/nusadecarb-carbon-accounting",
              },
              {
                label: "TrustChain UMKM",
                description: "Pantau ekspor & dokumen kargo",
                icon: ShieldCheckIcon,
                badge: "Ekspor",
                href: "/projects/trustchain-umkm",
              },
              {
                label: "Adidas Pure Concept",
                description: "Showcase 3D interaktif imersif",
                icon: BoxIcon,
                badge: "3D Motion",
                href: "/projects/adidas-pure-concept-store",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "Paket & Layanan",
        subMenus: [
          {
            title: "Paket Pembuatan",
            items: [
              {
                label: "Personal & Landing Page",
                description: "Mulai Rp 1,5 Jt (3-7 hari kerja)",
                icon: RocketIcon,
                badge: "Personal",
                href: "/#paket-harga",
              },
              {
                label: "Website UMKM & Toko",
                description: "Mulai Rp 5 Jt (katalog & QRIS)",
                icon: ShoppingBagIcon,
                badge: "Populer",
                href: "/#paket-harga",
              },
              {
                label: "Custom Web App & AI",
                description: "Mulai Rp 15 Jt (arsitektur penuh)",
                icon: CpuIcon,
                badge: "Custom",
                href: "/#paket-harga",
              },
            ],
          },
          {
            title: "Standar & Kepuasan",
            items: [
              {
                label: "3 Pilar Kualitas",
                description: "Rapi, cepat, langsung developer",
                icon: CheckCircle2Icon,
                badge: "Standar",
                href: "/#arsitektur-kerja",
              },
              {
                label: "Ulasan Klien 3D",
                description: "Testimoni interaktif terverifikasi",
                icon: StarIcon,
                badge: "Testimoni",
                href: "/#testimoni",
              },
            ],
          },
        ],
      },
      {
        id: 3,
        label: "Konsultasi",
        onClick: () =>
          openContactModal({
            subject: "Konsultasi Pembuatan Website",
            contextLabel: "Dropdown Navigation CTA",
          }),
      },
    ],
    [openContactModal]
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[padding,background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out",
        isScrolled
          ? "bg-background/90 border-b border-border py-2.5 backdrop-blur-md shadow-xs"
          : "bg-background/70 border-b border-transparent py-3.5 backdrop-blur-xs"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand / Logo */}
        <Link
          href="/"
          className="group inline-flex min-h-11 items-center gap-2.5 rounded-full pr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-status-emerald"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-border bg-secondary">
            <Image
              src={SURYA_PROFILE.avatarUrl}
              alt={SURYA_PROFILE.shortName}
              fill
              sizes="40px"
              className="object-cover"
            />
          </span>
          <div className="flex flex-col">
            <span className="font-display text-base font-bold tracking-tight text-foreground group-hover:text-status-emerald transition-colors">
              {SURYA_PROFILE.shortName}
            </span>
            <span className="text-muted-foreground font-mono text-[11px]">
              Personal Website Builder
            </span>
          </div>
        </Link>

        {/* Center: Dropdown Navigation (Desktop) */}
        <div className="hidden lg:flex items-center justify-center">
          <DropdownNavigation navItems={desktopNavItems} />
        </div>

        {/* Right Actions: Direct Consultation CTA and Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            type="button"
            size="sm"
            onClick={() =>
              openContactModal({
                subject: "Pemesanan & Konsultasi Website",
                contextLabel: "Navbar Top CTA",
              })
            }
            className="hidden sm:inline-flex min-h-9 items-center gap-1.5 rounded-full px-4 text-xs font-semibold cursor-pointer"
          >
            <MailIcon className="size-3.5" />
            <span>Pesan Website</span>
          </Button>

          {/* Mobile Menu Toggle Button */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={
              isMobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
            }
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="size-9 rounded-full lg:hidden cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <XIcon className="size-4" />
            ) : (
              <MenuIcon className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-border bg-card/98 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex flex-col gap-4 px-4 py-5 sm:px-6">
              <nav
                className="flex flex-col gap-1"
                aria-label="Navigasi Menu Mobile"
              >
                <Link
                  href="/#showcase"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold text-foreground hover:bg-surface transition-colors"
                >
                  <span>Karya Website</span>
                  <ArrowRightIcon className="size-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/#paket-harga"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold text-foreground hover:bg-surface transition-colors"
                >
                  <span>Paket & Harga Pembuatan</span>
                  <ArrowRightIcon className="size-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/#arsitektur-kerja"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold text-foreground hover:bg-surface transition-colors"
                >
                  <span>Standar Kualitas & 3 Pilar</span>
                  <ArrowRightIcon className="size-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/#testimoni"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold text-foreground hover:bg-surface transition-colors"
                >
                  <span>Ulasan Klien 3D</span>
                  <ArrowRightIcon className="size-4 text-muted-foreground" />
                </Link>
              </nav>

              <div className="flex flex-col gap-2.5 border-t border-border pt-4">
                <div className="flex items-center justify-between rounded-lg bg-surface px-3.5 py-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                    <BookmarkIcon className="size-3.5 text-status-emerald" />
                    Referensi Tersimpan
                  </span>
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    {bookmarkedSlugs.length} Proyek
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openContactModal({
                        subject: "Pemesanan & Konsultasi Website",
                        contextLabel: "Mobile Navbar CTA",
                      });
                    }}
                    className="min-h-10 text-xs font-semibold cursor-pointer"
                  >
                    <MailIcon data-icon="inline-start" />
                    Pesan Web
                  </Button>

                  <Button
                    variant="outline"
                    asChild
                    className="min-h-10 text-xs cursor-pointer"
                  >
                    <a
                      href={SURYA_PROFILE.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FileTextIcon data-icon="inline-start" />
                      Unduh CV
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
