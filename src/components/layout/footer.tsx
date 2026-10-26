"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SURYA_PROFILE } from "@/lib/portfolio-data";
import { useAgencyStore } from "@/lib/agency-store";

export function Footer() {
  const openContactModal = useAgencyStore((state) => state.openContactModal);

  return (
    <footer className="bg-surface border-t border-border mt-20">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Builder Identity & Direct Action */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-border bg-background">
                <Image
                  src={SURYA_PROFILE.avatarUrl}
                  alt={SURYA_PROFILE.fullName}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </span>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold tracking-tight">
                  {SURYA_PROFILE.fullName}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {SURYA_PROFILE.role}
                </span>
              </div>
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              Jasa pembuatan website personal, toko online UMKM, hingga aplikasi web perusahaan berbasis Next.js, React, dan AI.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Badge variant="verified">11+ Proyek Live</Badge>
              <Badge variant="secondary">17+ Sertifikasi AI & Web</Badge>
              <Badge variant="secondary">Surabaya & Remote Indonesia</Badge>
            </div>
          </div>

          {/* Navigation tailored to Surya's actual projects and contact */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-7">
            <div className="flex flex-col gap-3">
              <h2 className="font-display text-sm font-semibold">
                Karya Website Pilihan
              </h2>
              <ul className="flex flex-col gap-2 text-sm">
                <li>
                  <Link
                    href="/projects/baru-lagi"
                    className="text-muted-foreground hover:text-foreground inline-flex min-h-9 items-center gap-1.5 transition-colors"
                  >
                    <span>BaruLagi Marketplace & Trade-In</span>
                    <ArrowUpRightIcon className="size-3.5" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects/adidas-pure-concept"
                    className="text-muted-foreground hover:text-foreground inline-flex min-h-9 items-center gap-1.5 transition-colors"
                  >
                    <span>Adidas Pure Concept 3D Store</span>
                    <ArrowUpRightIcon className="size-3.5" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects/nusa-asset-management"
                    className="text-muted-foreground hover:text-foreground inline-flex min-h-9 items-center gap-1.5 transition-colors"
                  >
                    <span>Nusa Asset Management (EAM)</span>
                    <ArrowUpRightIcon className="size-3.5" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects/traveloop"
                    className="text-muted-foreground hover:text-foreground inline-flex min-h-9 items-center gap-1.5 transition-colors"
                  >
                    <span>Traveloop Smart Itinerary & Map</span>
                    <ArrowUpRightIcon className="size-3.5" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-display text-sm font-semibold">
                Kontak & Informasi Layanan
              </h2>
              <ul className="flex flex-col gap-2 text-sm">
                <li>
                  <Link
                    href="/#paket-harga"
                    className="text-muted-foreground hover:text-foreground inline-flex min-h-9 items-center gap-1.5 transition-colors"
                  >
                    <span>Paket & Harga Pembuatan Website</span>
                    <ArrowUpRightIcon className="size-3.5" />
                  </Link>
                </li>
                <li>
                  <a
                    href={SURYA_PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground inline-flex min-h-9 items-center gap-1.5 transition-colors"
                  >
                    <span>GitHub (@suryapamungkas)</span>
                    <ArrowUpRightIcon className="size-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href={SURYA_PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground inline-flex min-h-9 items-center gap-1.5 transition-colors"
                  >
                    <span>LinkedIn (Surya Pamungkas)</span>
                    <ArrowUpRightIcon className="size-3.5" />
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      openContactModal({
                        subject: "Konsultasi Pembuatan Website",
                        contextLabel: "Kontak Footer",
                      })
                    }
                    className="text-muted-foreground hover:text-foreground inline-flex min-h-9 items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{SURYA_PROFILE.email}</span>
                    <ArrowUpRightIcon className="size-3.5" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-muted-foreground flex flex-col items-start justify-between gap-4 text-xs sm:flex-row sm:items-center">
          <p>
            © 2026 {SURYA_PROFILE.fullName}. Jasa Pembuatan Website Personal, UMKM & Aplikasi AI.
          </p>
          <div className="flex items-center gap-5">
            <a
              href={SURYA_PROFILE.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground inline-flex min-h-9 items-center transition-colors"
            >
              Unduh CV Resmi
            </a>
            <Link
              href="/?view=solutions#explorer-hub"
              className="hover:text-foreground inline-flex min-h-9 items-center transition-colors"
            >
              Lihat Paket Layanan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
