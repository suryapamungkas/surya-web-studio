"use client";

import * as React from "react";
import {
  CheckCircle2Icon,
  ChevronRightIcon,
  SparklesIcon,
  ZapIcon,
  UserCheckIcon,
} from "lucide-react";
import { VERIFIED_ENGINEERING_PILLARS } from "@/lib/portfolio-data";
import { useAgencyStore } from "@/lib/agency-store";
import { GlowCard, type GlowCardProps } from "@/components/ui/spotlight-card";

const PILLAR_GLOW_COLORS: NonNullable<GlowCardProps["glowColor"]>[] = [
  "green",
  "blue",
  "purple",
];

const PILLAR_ICONS = [SparklesIcon, ZapIcon, UserCheckIcon];
const PILLAR_TAGS = ["UX & Tampilan", "Performa & SEO", "Komunikasi Langsung"];

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
            Standar teknis terukur, jaminan performa produksi, dan alur pengerjaan langsung tanpa perantara agensi.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3 items-stretch">
          {VERIFIED_ENGINEERING_PILLARS.map((pillar, index) => {
            const Icon = PILLAR_ICONS[index % PILLAR_ICONS.length];
            const tag = PILLAR_TAGS[index % PILLAR_TAGS.length];
            const glowColor =
              PILLAR_GLOW_COLORS[index % PILLAR_GLOW_COLORS.length];

            return (
              <GlowCard
                key={pillar.id}
                customSize
                glowColor={glowColor}
                tabIndex={0}
                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-status-emerald"
              >
                <div className="relative z-10 flex h-full flex-col justify-between gap-5">
                  {/* Top: Header, Title and Full Description */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-status-emerald">
                          Pilar 0{index + 1}
                        </span>
                        <span className="size-1 rounded-full bg-border" />
                        <span className="text-[11px] font-medium text-muted-foreground">
                          {tag}
                        </span>
                      </div>
                      <div className="flex size-8 items-center justify-center rounded-lg border border-border/80 bg-surface text-status-emerald transition-colors group-hover:border-status-emerald/40 group-hover:bg-status-emerald/10">
                        <Icon className="size-4 shrink-0" />
                      </div>
                    </div>

                    <h3 className="font-display text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-status-emerald">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {pillar.subtitle}
                    </p>
                  </div>

                  {/* Bottom: Verified Deliverable Badges and Direct Action */}
                  <div className="flex flex-col gap-4 border-t border-border/60 pt-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {pillar.badges.map((badgeText) => (
                        <span
                          key={badgeText}
                          className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-surface/90 px-2 py-1 text-[11px] font-medium text-foreground transition-colors group-hover:border-status-emerald/30"
                        >
                          <CheckCircle2Icon className="size-3 text-status-emerald shrink-0" />
                          <span>{badgeText}</span>
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] font-medium text-muted-foreground">
                        Konsultasi spesifikasi
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          openContactModal({
                            subject: `Tanya Layanan: ${pillar.title}`,
                            contextLabel: `Pilar 0${index + 1}`,
                            defaultMessage: `Halo Surya, saya ingin menanyakan lebih lanjut mengenai standar pengerjaan "${pillar.title}" untuk kebutuhan website saya.`,
                          })
                        }
                        className="inline-flex min-h-8 items-center gap-1 text-xs font-semibold text-status-emerald hover:opacity-80 transition-all cursor-pointer group-hover:translate-x-0.5"
                      >
                        <span>Tanya Detail</span>
                        <ChevronRightIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
