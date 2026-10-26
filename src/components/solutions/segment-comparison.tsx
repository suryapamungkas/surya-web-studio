"use client";

import * as React from "react";
import { UserIcon, Building2Icon } from "lucide-react";
import {
  SERVICE_COMPARISON_MATRIX,
  SERVICE_PACKAGES,
  SURYA_PROFILE,
  type ServicePackageTier,
} from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { Pricing, type PricingPlan } from "@/components/ui/pricing";
import { useAgencyStore } from "@/lib/agency-store";
import { cn } from "@/lib/utils";

export function AgencyPricingSection() {
  const openContactModal = useAgencyStore((state) => state.openContactModal);

  const pricingPlans = React.useMemo<PricingPlan[]>(() => {
    const personalPkg = SERVICE_PACKAGES[0]!;
    const umkmPkg = SERVICE_PACKAGES[1]!;
    const enterprisePkg = SERVICE_PACKAGES[2]!;

    return [
      {
        name: "PERSONAL & LANDING PAGE",
        price: "1.5",
        yearlyPrice: "1.2",
        prefix: "Rp ",
        suffix: " Jt",
        period: "proyek",
        features: [
          ...personalPkg.includedModules,
          ...personalPkg.technicalGuarantees.slice(0, 2),
        ],
        description: `${personalPkg.idealFor} (${personalPkg.timeline})`,
        buttonText: "Pesan Paket Personal",
        href: `mailto:${SURYA_PROFILE.email}?subject=Pemesanan%20Paket%20Personal%20dan%20Landing%20Page`,
        isPopular: false,
        monthlyBillingNote: "sekali bayar • pengerjaan 3-7 hari kerja",
        yearlyBillingNote: "paket hemat bundling domain & maintenance 1 tahun",
        onSelect: (billingMode) => {
          const priceLabel =
            billingMode === "yearly"
              ? "Rp 1,2 Jt / proyek (Bundling Tahunan Hemat 20%)"
              : "Rp 1,5 Jt / proyek (Sekali Bayar)";
          openContactModal({
            subject: "Pemesanan Paket Personal & Landing Page",
            contextLabel: `Paket Personal • ${billingMode === "yearly" ? "Rp 1,2 Jt" : "Rp 1,5 Jt"}`,
            defaultMessage: `Halo Surya, saya tertarik memesan Paket Personal & Landing Page (${priceLabel}).\n\nRencana website yang ingin saya buat:\n- Tujuan website: \n- Estimasi halaman / konten: `,
          });
        },
      },
      {
        name: "UMKM & TOKO ONLINE",
        price: "5",
        yearlyPrice: "4",
        prefix: "Rp ",
        suffix: " Jt",
        period: "proyek",
        features: [
          ...umkmPkg.includedModules,
          ...umkmPkg.technicalGuarantees,
        ],
        description: `${umkmPkg.idealFor} (${umkmPkg.timeline})`,
        buttonText: "Pesan Paket UMKM",
        href: `mailto:${SURYA_PROFILE.email}?subject=Pemesanan%20Paket%20UMKM%20dan%20Toko%20Online`,
        isPopular: true,
        popularLabel: "Populer",
        monthlyBillingNote: "sekali bayar • pengerjaan 1-3 minggu",
        yearlyBillingNote: "paket hemat bundling cloud & maintenance 1 tahun",
        onSelect: (billingMode) => {
          const priceLabel =
            billingMode === "yearly"
              ? "Rp 4 Jt / proyek (Bundling Tahunan Hemat 20%)"
              : "Rp 5 Jt / proyek (Sekali Bayar)";
          openContactModal({
            subject: "Pemesanan Paket UMKM & Toko Online",
            contextLabel: `Paket UMKM • ${billingMode === "yearly" ? "Rp 4 Jt" : "Rp 5 Jt"}`,
            defaultMessage: `Halo Surya, saya tertarik memesan Paket UMKM & Toko Online (${priceLabel}).\n\nDetail usaha & fitur yang saya butuhkan:\n- Nama / jenis usaha: \n- Fitur utama (katalog, checkout, admin, dll.): `,
          });
        },
      },
      {
        name: "CUSTOM WEB APP & AI",
        price: "15",
        yearlyPrice: "12",
        prefix: "Rp ",
        suffix: " Jt",
        period: "proyek",
        features: [
          "Semua fitur pada paket UMKM & Toko Online",
          ...enterprisePkg.includedModules,
          ...enterprisePkg.technicalGuarantees.slice(0, 2),
        ],
        description: `${enterprisePkg.idealFor} (${enterprisePkg.timeline})`,
        buttonText: "Konsultasi Sistem Kustom",
        href: `mailto:${SURYA_PROFILE.email}?subject=Konsultasi%20Paket%20Custom%20Web%20App%20dan%20AI`,
        isPopular: false,
        monthlyBillingNote: "mulai dari • pengerjaan 3-6 minggu",
        yearlyBillingNote: "kontrak tahunan SLA & dukungan prioritas",
        onSelect: (billingMode) => {
          const priceLabel =
            billingMode === "yearly"
              ? "Mulai Rp 12 Jt / proyek (Kontrak Tahunan SLA & Dukungan Prioritas)"
              : "Mulai Rp 15 Jt / proyek";
          openContactModal({
            subject: "Konsultasi Paket Custom Web App & AI",
            contextLabel: `Custom Web App & AI • ${billingMode === "yearly" ? "Mulai Rp 12 Jt" : "Mulai Rp 15 Jt"}`,
            defaultMessage: `Halo Surya, saya ingin berkonsultasi mengenai pengembangan Custom Web App & AI (${priceLabel}).\n\nGambaran sistem yang ingin dibangun:\n- Kebutuhan sistem / alur bisnis: \n- Integrasi atau fitur AI yang diinginkan: `,
          });
        },
      },
    ];
  }, [openContactModal]);

  return (
    <section
      id="paket-harga"
      aria-label="Daftar Paket & Harga Pembuatan Website"
      className="scroll-mt-24"
    >
      <Pricing
        plans={pricingPlans}
        title="Paket & Harga Transparan"
        description={
          "Pilih paket pembuatan website sesuai kebutuhan personal, UMKM, maupun perusahaan Anda.\nSeluruh paket dikerjakan langsung oleh Surya Pamungkas dengan jaminan performa cepat dan siap pakai."
        }
        toggleLabel="Bundling Hosting & Maintenance Tahunan"
        toggleHighlight="(Hemat 20%)"
      />
    </section>
  );
}

export function SegmentComparison() {
  const audienceMode = useAgencyStore((state) => state.audienceMode);
  const setAudienceMode = useAgencyStore((state) => state.setAudienceMode);

  return (
    <div className="flex flex-col gap-12">
      {/* Section 1: Interactive 3-Column Pricing Block from Pricing.md */}
      <AgencyPricingSection />

      {/* Section 2: Dual-Segment Comparison Matrix (SPEC.md 4.7) */}
      <section
        aria-labelledby="matrix-comparison-heading"
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-muted-foreground font-mono text-xs font-medium">
              Panduan Memilih Layanan
            </p>
            <h2
              id="matrix-comparison-heading"
              className="font-display mt-1 text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Perbandingan Layanan: Personal/UMKM vs Perusahaan
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={audienceMode === "INDIVIDUAL" ? "default" : "outline"}
              onClick={() => setAudienceMode("INDIVIDUAL")}
            >
              <UserIcon data-icon="inline-start" />
              Personal / UMKM
            </Button>
            <Button
              size="sm"
              variant={audienceMode === "ENTERPRISE" ? "default" : "outline"}
              onClick={() => setAudienceMode("ENTERPRISE")}
            >
              <Building2Icon data-icon="inline-start" />
              Perusahaan / Startup
            </Button>
          </div>
        </div>

        {/* Responsive Matrix: Cards on Mobile, Structured Table on Desktop */}
        <div className="overflow-hidden rounded-3xl border border-border">
          <div className="bg-surface-elevated hidden grid-cols-12 border-b border-border p-4 text-xs font-semibold md:grid">
            <div className="col-span-3 font-mono">ASPEK LAYANAN</div>
            <div
              className={cn(
                "col-span-4 px-3",
                audienceMode === "INDIVIDUAL" && "text-status-emerald font-bold"
              )}
            >
              PERSONAL BRAND / KREATOR / UMKM
            </div>
            <div
              className={cn(
                "col-span-5 px-3",
                audienceMode === "ENTERPRISE" && "text-status-emerald font-bold"
              )}
            >
              PERUSAHAAN / STARTUP / KORPORASI
            </div>
          </div>

          <div className="divide-y divide-border">
            {SERVICE_COMPARISON_MATRIX.map((row) => (
              <div
                key={row.dimension}
                className="bg-background grid grid-cols-1 gap-4 p-5 md:grid-cols-12 md:items-start"
              >
                <div className="font-display text-sm font-bold md:col-span-3">
                  {row.dimension}
                </div>

                <div
                  className={cn(
                    "rounded-2xl p-3.5 text-sm leading-relaxed transition-colors md:col-span-4",
                    audienceMode === "INDIVIDUAL"
                      ? "bg-surface border border-border text-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  <span className="text-muted-foreground mb-1 block font-mono text-[11px] md:hidden">
                    PERSONAL / UMKM:
                  </span>
                  {row.individualSme}
                </div>

                <div
                  className={cn(
                    "rounded-2xl p-3.5 text-sm leading-relaxed transition-colors md:col-span-5",
                    audienceMode === "ENTERPRISE"
                      ? "bg-surface border border-border text-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  <span className="text-muted-foreground mb-1 block font-mono text-[11px] md:hidden">
                    PERUSAHAAN / STARTUP:
                  </span>
                  {row.enterprise}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
