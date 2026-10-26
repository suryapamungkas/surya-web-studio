"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRightIcon,
  CopyPlusIcon,
  ExternalLinkIcon,
  PlayIcon,
} from "lucide-react";
import { TechStackIcon } from "@/components/ui/tech-stack-icon";
import { GlowCard, type GlowCardProps } from "@/components/ui/spotlight-card";
import { type PortfolioProject } from "@/lib/portfolio-data";
import { useAgencyStore } from "@/lib/agency-store";
import { cn } from "@/lib/utils";

interface StandoutStoryCardProps {
  project: PortfolioProject;
}

const STANDOUT_GLOW_COLOR: Record<
  PortfolioProject["category"],
  NonNullable<GlowCardProps["glowColor"]>
> = {
  WEB_APP: "blue",
  MOBILE_APP: "orange",
  AI_SYSTEM: "purple",
  INTERACTIVE_WEB: "purple",
  ENTERPRISE_ERP: "blue",
  PERSONAL_BRAND: "green",
};

export function StandoutStoryCard({ project }: StandoutStoryCardProps) {
  const router = useRouter();
  const [isRevealed, setIsRevealed] = React.useState(false);

  const setActiveDemoProject = useAgencyStore(
    (state) => state.setActiveDemoProject
  );
  const openContactModal = useAgencyStore((state) => state.openContactModal);

  function handleCardClick(e: React.MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement;
    if (target.closest("a, button")) {
      return;
    }
    if (window.matchMedia("(hover: none)").matches && !isRevealed) {
      setIsRevealed(true);
      return;
    }
    router.push(`/projects/${project.slug}`);
  }

  function handleCardKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push(`/projects/${project.slug}`);
    }
  }

  return (
    <GlowCard
      customSize
      glowColor={STANDOUT_GLOW_COLOR[project.category]}
      tabIndex={0}
      role="link"
      aria-label={`Studi Kasus: ${project.title}. ${project.clientTypeLabel}`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      onMouseLeave={() => setIsRevealed(false)}
      className="group cursor-pointer bg-card transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-status-emerald h-[500px] sm:h-[520px]"
    >
      <div className="relative z-10 flex h-full w-full flex-col justify-between overflow-hidden rounded-[14px]">
        {/* Top Header: Clean Industry Eyebrow + Title + Subtitle */}
        <div className="p-6 pb-4 flex flex-col">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-status-emerald mb-1.5 block">
            {project.clientTypeLabel}
          </span>
          <h3 className="font-display font-bold text-foreground text-xl sm:text-2xl leading-snug group-hover:text-status-emerald group-focus-within:text-status-emerald transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-1 font-medium font-mono">
            Estimasi Rilis: {project.timelineWeeks} • Lighthouse{" "}
            {project.metrics.lighthouseScore}/100
          </p>
        </div>

        {/* Bottom Interactive Stage: Clean Case Study Image When Idle -> Smooth Breakdown Reveal on Hover */}
        <div className="relative flex-1 w-full overflow-hidden bg-surface border-t border-border/60">
          {/* Layer 1: Idle Full-Bleed Image with Impact Pill */}
          <div
            className={cn(
              "absolute inset-0 w-full h-full transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-105 group-focus-within:opacity-0 group-focus-within:scale-105 pointer-events-none",
              isRevealed && "opacity-0 scale-105"
            )}
          >
            <Image
              src={project.coverImageUrl}
              alt={`Studi kasus ${project.title}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
                Studi Kasus Unggulan
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between gap-3">
              <div>
                <span className="text-base sm:text-lg font-display font-black text-emerald-300 block leading-tight">
                  {project.beforeAfter[0]?.afterValue ??
                    `Skor ${project.metrics.lighthouseScore}`}
                </span>
                <span className="text-[11px] text-neutral-200 line-clamp-1 font-medium">
                  {project.metrics.impactMetric}
                </span>
              </div>
              <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-0.5 shrink-0">
                <span>Hover</span>
                <ChevronRightIcon className="size-3.5" />
              </span>
            </div>
          </div>

          {/* Layer 2: Smooth Hover/Focus/Tap Executive Breakdown Panel */}
          <div
            className={cn(
              "absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-b from-card via-surface to-status-emerald-subtle/35 transition-all duration-500 ease-out opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto",
              isRevealed && "opacity-100 translate-y-0 pointer-events-auto"
            )}
          >
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-status-emerald bg-status-emerald-subtle px-2 py-0.5 rounded inline-block">
                Dampak Riil & Bedah Solusi
              </span>

              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal line-clamp-3">
                <strong className="font-semibold text-foreground">
                  Solusi:{" "}
                </strong>
                {project.architectureExecution}
              </p>

              {/* Before vs After Highlight Box */}
              <div className="p-3.5 rounded-xl bg-background border border-border/90 shadow-2xs space-y-2">
                <div className="grid grid-cols-2 gap-3">
                  {project.beforeAfter.slice(0, 2).map((item) => (
                    <div key={item.metricLabel} className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-muted-foreground line-clamp-1">
                        {item.metricLabel}
                      </span>
                      <div className="flex items-baseline gap-1.5 font-mono">
                        <span className="text-[11px] text-muted-foreground line-through">
                          {item.beforeValue}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-status-emerald">
                          {item.afterValue}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/60">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech.name}
                      className="inline-flex items-center gap-1 rounded-md bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border/70"
                    >
                      <TechStackIcon name={tech.icon} className="size-3" />
                      <span>{tech.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Interactive Action Bar */}
            <div className="pt-3.5 flex flex-wrap items-center justify-between border-t border-border/80 mt-auto text-xs gap-2">
              <div className="flex items-center gap-3">
                {project.externalLiveUrl ? (
                  <a
                    href={project.externalLiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex min-h-9 items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLinkIcon className="size-3.5 text-status-emerald" />
                    <span>Web Asli</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDemoProject(project);
                    }}
                    className="inline-flex min-h-9 items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    <PlayIcon className="size-3.5 text-status-emerald" />
                    <span>Pratinjau</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openContactModal({
                      subject: `Pesan Website Serupa: ${project.title}`,
                      contextLabel: project.clientTypeLabel,
                      defaultMessage: `Halo Surya, saya tertarik membuat website serupa dengan proyek "${project.title}" (${project.clientTypeLabel}).\n\nKebutuhan kustomisasi yang saya inginkan:\n- Nama brand / usaha: \n- Fitur tambahan yang dibutuhkan: `,
                    });
                  }}
                  className="inline-flex min-h-9 items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <CopyPlusIcon className="size-3.5 text-status-emerald" />
                  <span>Pesan Serupa</span>
                </button>
              </div>

              <Link
                href={`/projects/${project.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex min-h-9 items-center gap-1 font-bold text-status-emerald hover:opacity-85 uppercase tracking-wider"
              >
                <span>Expand</span>
                <ChevronRightIcon className="size-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}
