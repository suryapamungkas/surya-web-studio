"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { MailIcon, FileTextIcon, ArrowUpRightIcon, SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  SterlingGateKineticNavigation,
  type KineticNavItem,
} from "@/components/ui/sterling-gate-kinetic-navigation";
import { useAgencyStore } from "@/lib/agency-store";
import { SURYA_PROFILE } from "@/lib/portfolio-data";

export function Navbar() {
  const openContactModal = useAgencyStore((state) => state.openContactModal);

  const navItems = React.useMemo<KineticNavItem[]>(
    () => [
      {
        label: "Karya Website",
        href: "/#showcase",
        meta: "01 / 11+ Proyek Live",
        shapeIndex: "1",
      },
      {
        label: "Standar Kualitas",
        href: "/#arsitektur-kerja",
        meta: "02 / 3 Pilar & Garansi",
        shapeIndex: "2",
      },
      {
        label: "Paket & Harga",
        href: "/#paket-harga",
        meta: "03 / Mulai Rp 1,5 Jt",
        shapeIndex: "3",
      },
      {
        label: "Ulasan Klien 3D",
        href: "/#testimoni",
        meta: "04 / Testimoni Nyata",
        shapeIndex: "4",
        fade: true,
      },
      {
        label: "Tentang Surya",
        href: "/#tentang-surya",
        meta: "05 / Profil Developer & CV",
        shapeIndex: "5",
      },
    ],
    []
  );

  return (
    <SterlingGateKineticNavigation
      items={navItems}
      toggleHintText="Navigasi"
      openLabel="Menu"
      closeLabel="Tutup"
      logoSlot={
        <Link
          href="/"
          className="group inline-flex min-h-11 items-center gap-2.5 rounded-full pr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-status-emerald cursor-pointer"
        >
          <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-border bg-secondary">
            <Image
              src={SURYA_PROFILE.avatarUrl}
              alt={SURYA_PROFILE.shortName}
              fill
              sizes="40px"
              className="object-cover"
              priority
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
      }
      rightActionsSlot={
        <Button
          type="button"
          size="sm"
          onClick={() =>
            openContactModal({
              subject: "Pemesanan & Konsultasi Website",
              contextLabel: "Navbar Top CTA",
            })
          }
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-4 text-xs font-semibold cursor-pointer"
        >
          <MailIcon className="size-3.5" />
          <span className="hidden sm:inline">Pesan Website</span>
          <span className="sm:hidden">Pesan</span>
        </Button>
      }
      footerSlot={
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-status-emerald opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-status-emerald" />
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                Tersedia untuk Proyek Baru
              </span>
            </div>
            <Badge variant="outline" className="font-mono text-[10px]">
              Surabaya, ID
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <Button
              type="button"
              onClick={() =>
                openContactModal({
                  subject: "Konsultasi Pembuatan Website",
                  contextLabel: "Kinetic Drawer Footer CTA",
                })
              }
              className="min-h-11 text-xs font-semibold cursor-pointer"
            >
              <SparklesIcon className="size-4 mr-1.5" />
              Konsultasi Proyek
            </Button>

            <Button
              variant="outline"
              asChild
              className="min-h-11 text-xs cursor-pointer"
            >
              <a
                href={SURYA_PROFILE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileTextIcon className="size-4 mr-1.5" />
                Unduh CV Lengkap
                <ArrowUpRightIcon className="size-3.5 ml-1 text-muted-foreground" />
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/70 pt-3">
            <span>Email Langsung:</span>
            <a
              href={`mailto:${SURYA_PROFILE.email}`}
              className="font-mono text-foreground hover:text-status-emerald transition-colors"
            >
              {SURYA_PROFILE.email}
            </a>
          </div>
        </div>
      }
    />
  );
}

export default Navbar;
