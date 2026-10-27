"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SunIcon,
  MoonIcon,
  BookmarkIcon,
  FileTextIcon,
  MailIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  SterlingGateKineticNavigation,
  type KineticNavItem,
} from "@/components/ui/sterling-gate-kinetic-navigation";
import { useAgencyStore } from "@/lib/agency-store";
import { SURYA_PROFILE } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const bookmarkedSlugs = useAgencyStore((state) => state.bookmarkedSlugs);
  const openContactModal = useAgencyStore((state) => state.openContactModal);

  React.useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setIsScrolled(window.scrollY > 180);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const kineticItems = React.useMemo<KineticNavItem[]>(
    () => [
      {
        label: "Karya Website",
        href: "/#showcase",
        meta: "01 / 10+ Proyek Live",
        shapeIndex: "1",
      },
      {
        label: "Keahlian & Sertifikasi",
        href: "/#tentang-surya",
        meta: "02 / 16 Skill & 17 Sertifikat",
        shapeIndex: "2",
      },
      {
        label: "Paket & Harga",
        href: "/#paket-harga",
        meta: "03 / Mulai Rp 1,5 Jt",
        shapeIndex: "3",
      },
      {
        label: "Standar Kualitas",
        href: "/#arsitektur-kerja",
        meta: "04 / Jaminan Performa",
        shapeIndex: "4",
        fade: true,
      },
      {
        label: "Konsultasi & Email",
        meta: "05 / Kirim Pesan Langsung",
        shapeIndex: "5",
        onClick: () =>
          openContactModal({
            subject: "Konsultasi Pembuatan Website",
            contextLabel: "Menu Navigasi",
          }),
      },
    ],
    [openContactModal]
  );

  return (
    <SterlingGateKineticNavigation
      items={kineticItems}
      toggleHintText="Eksplor Menu"
      openLabel="Menu"
      closeLabel="Tutup"
      headerClassName={cn(
        isScrolled
          ? "bg-background/90 border-b border-border py-3 backdrop-blur-md"
          : "bg-background border-b border-transparent py-4"
      )}
      logoSlot={
        <Link
          href="/"
          className="group inline-flex min-h-11 items-center gap-2.5 rounded-full pr-2"
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
            <span className="font-display text-base font-bold tracking-tight">
              {SURYA_PROFILE.shortName}
            </span>
            <span className="text-muted-foreground font-mono text-[11px]">
              Personal Website Builder
            </span>
          </div>
        </Link>
      }
      rightActionsSlot={
        mounted ? (
          <Button
            variant="outline"
            size="icon"
            aria-label={
              resolvedTheme === "dark"
                ? "Beralih ke mode terang"
                : "Beralih ke mode gelap"
            }
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
          </Button>
        ) : null
      }
      footerSlot={
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs">
            <span className="inline-flex items-center gap-2 font-medium text-foreground">
              <BookmarkIcon className="size-4 text-status-emerald" />
              Referensi Proyek Disimpan
            </span>
            <Badge variant="secondary" className="font-mono">
              {bookmarkedSlugs.length} Proyek
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              type="button"
              className="flex-1 min-h-11"
              onClick={() =>
                openContactModal({
                  subject: "Pemesanan & Konsultasi Website",
                  contextLabel: "Kinetic Navigation CTA",
                })
              }
            >
              <MailIcon data-icon="inline-start" />
              Pesan Website Sekarang
            </Button>

            <Button variant="outline" asChild className="min-h-11">
              <a
                href={SURYA_PROFILE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileTextIcon data-icon="inline-start" />
                Unduh CV
              </a>
            </Button>
          </div>
        </div>
      }
    />
  );
}
