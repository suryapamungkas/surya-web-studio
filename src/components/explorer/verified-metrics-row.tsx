"use client";

import * as React from "react";
import { CheckCircle2Icon, ChevronRightIcon } from "lucide-react";
import { VERIFIED_ENGINEERING_PILLARS } from "@/lib/portfolio-data";
import { useAgencyStore } from "@/lib/agency-store";
import { Badge } from "@/components/ui/badge";
import { GlowCard, type GlowCardProps } from "@/components/ui/spotlight-card";

const PILLAR_GLOW_COLORS: NonNullable<GlowCardProps["glowColor"]>[] = [
  "green",
  "blue",
  "purple",
];

export function VerifiedMetricsRow() {
  const openContactModal = useAgencyStore((state) => state.openContactModal);

  return (
    <section
      id="arsitektur-kerja"
      aria-labelledby="verified-pillars-heading"
      className="w-full scroll-mt-24 cv-auto-section"
    >
      <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8">
        <div className="flex flex-col gap-1.5 md:flex-row md:items-end md:justify-between pb-5 border-b border-border">
          <div>
            <p className="text-muted-foreground font-mono text-xs font-medium">
              Standar Kualitas Pengerjaan
            </p>
            <h2
              id="verified-pillars-heading"
              className="font-display mt-1 text-2xl font-bold tracking-tight"
            >
              Kenapa Buat Website Bersama Surya?
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-xs leading-relaxed">
            Arahkan kursor pada kartu untuk melihat efek spotlight interaktif,
            detail standar pengerjaan, dan jaminan layanan.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {VERIFIED_ENGINEERING_PILLARS.map((pillar, index) => (
            <GlowCard
              key={pillar.id}
              customSize
              glowColor={PILLAR_GLOW_COLORS[index % PILLAR_GLOW_COLORS.length]}
              tabIndex={0}
              className="group h-[245px] bg-background transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-status-emerald"
            >
              <div className="relative z-10 flex h-full w-full flex-col justify-between overflow-hidden rounded-[14px]">
                {/* Top Header: Clean Pillar Number + Title */}
                <div className="p-6 pb-4 flex flex-col gap-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-status-emerald">
                    Pilar 0{index + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold tracking-tight text-foreground group-hover:text-status-emerald group-focus-within:text-status-emerald transition-colors">
                    {pillar.title}
                  </h3>
                </div>

                {/* Bottom Interactive Stage */}
                <div className="relative flex-1 w-full overflow-hidden bg-surface/65 border-t border-border/60">
                  {/* Layer 1: Idle Clean Summary */}
                  <div className="absolute inset-0 p-6 flex items-center justify-between transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-105 group-focus-within:opacity-0 group-focus-within:scale-105 pointer-events-none">
                    <div className="flex flex-wrap items-center gap-2">
                      <CheckCircle2Icon className="text-status-emerald size-5 shrink-0" />
                      <span className="text-xs font-semibold text-foreground">
                        {pillar.badges[0]}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-status-emerald inline-flex items-center gap-1">
                      <span>Detail</span>
                      <ChevronRightIcon className="size-4" />
                    </span>
                  </div>

                  {/* Layer 2: Smooth Hover/Focus Detail Reveal */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-b from-background/95 via-surface/95 to-status-emerald-subtle/35 transition-all duration-500 ease-out opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
                    <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed line-clamp-3">
                      {pillar.subtitle}
                    </p>

                    <div className="flex items-center justify-between border-t border-border/80 pt-3 gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {pillar.badges.map((badgeText) => (
                          <Badge
                            key={badgeText}
                            variant="verified"
                            className="text-[10px]"
                          >
                            {badgeText}
                          </Badge>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          openContactModal({
                            subject: `Tanya Layanan: ${pillar.title}`,
                            contextLabel: `Pilar 0${index + 1}`,
                            defaultMessage: `Halo Surya, saya ingin menanyakan lebih lanjut mengenai standar pengerjaan "${pillar.title}" untuk kebutuhan website saya.`,
                          })
                        }
                        className="inline-flex min-h-9 items-center gap-0.5 text-[11px] font-bold uppercase tracking-wider text-status-emerald hover:opacity-85 shrink-0 cursor-pointer"
                      >
                        <span>Tanya</span>
                        <ChevronRightIcon className="size-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
