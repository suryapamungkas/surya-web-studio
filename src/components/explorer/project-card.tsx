"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookmarkIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  PlayIcon,
} from "lucide-react";
import { TechStackIcon } from "@/components/ui/tech-stack-icon";
import { GlowCard, type GlowCardProps } from "@/components/ui/spotlight-card";
import type { PortfolioProject } from "@/lib/portfolio-data";
import { useAgencyStore } from "@/lib/agency-store";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: PortfolioProject;
  priority?: boolean;
}

const SEGMENT_LABEL: Record<PortfolioProject["targetSegment"], string> = {
  INDIVIDUAL: "Personal & Edukasi",
  SME: "UMKM & E-Commerce",
  ENTERPRISE: "Sistem Perusahaan",
};

const CATEGORY_GLOW_COLOR: Record<
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

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const router = useRouter();
  const [isRevealed, setIsRevealed] = React.useState(false);

  const setActiveDemoProject = useAgencyStore(
    (state) => state.setActiveDemoProject
  );
  const bookmarkedSlugs = useAgencyStore((state) => state.bookmarkedSlugs);
  const toggleBookmark = useAgencyStore((state) => state.toggleBookmark);
  const isBookmarked = bookmarkedSlugs.includes(project.slug);

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
      glowColor={CATEGORY_GLOW_COLOR[project.category]}
      tabIndex={0}
      role="link"
      aria-label={`${project.clientTypeLabel}: ${project.title}. Klik untuk membuka detail proyek.`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      onMouseLeave={() => setIsRevealed(false)}
      className="group cursor-pointer bg-card transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-status-emerald h-[470px] sm:h-[490px]"
    >
      <div className="relative z-10 flex h-full w-full flex-col justify-between overflow-hidden rounded-[14px]">
        {/* Top Header: Clean Category Eyebrow + Bold Title */}
        <div className="p-6 pb-4 flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-status-emerald truncate">
              {project.clientTypeLabel}
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(project.slug);
              }}
              aria-label={
                isBookmarked
                  ? `Hapus ${project.title} dari simpanan`
                  : `Simpan ${project.title}`
              }
              aria-pressed={isBookmarked}
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-full border transition-all cursor-pointer shrink-0",
                isBookmarked
                  ? "bg-status-emerald text-white border-status-emerald opacity-100"
                  : "border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
              )}
            >
              <BookmarkIcon className="size-3.5" />
            </button>
          </div>

          <h3 className="font-display font-bold text-foreground text-lg sm:text-xl leading-snug group-hover:text-status-emerald group-focus-within:text-status-emerald transition-colors line-clamp-2">
            {project.title}
          </h3>
        </div>

        {/* Bottom Interactive Stage: Clean Cover Image When Idle -> Smooth Detail Reveal on Hover */}
        <div className="relative flex-1 w-full overflow-hidden bg-surface border-t border-border/60">
          {/* Layer 1: Idle Full-Bleed Image State */}
          <div
            className={cn(
              "absolute inset-0 w-full h-full transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-105 group-focus-within:opacity-0 group-focus-within:scale-105 pointer-events-none",
              isRevealed && "opacity-0 scale-105"
            )}
          >
            <Image
              src={project.coverImageUrl}
              alt={`Tampilan proyek ${project.title}`}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 right-4 text-xs font-semibold text-white bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15 font-mono">
              {project.timelineWeeks} • Skor {project.metrics.lighthouseScore}
            </div>
          </div>

          {/* Layer 2: Smooth Hover/Focus/Tap Detail Panel */}
          <div
            className={cn(
              "absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-b from-card via-surface to-status-emerald-subtle/35 transition-all duration-500 ease-out opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto",
              isRevealed && "opacity-100 translate-y-0 pointer-events-auto"
            )}
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-status-emerald bg-status-emerald-subtle px-2 py-0.5 rounded inline-block">
                  Ringkasan Eksekutif
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {SEGMENT_LABEL[project.targetSegment]}
                </span>
              </div>

              <p className="text-sm text-foreground/90 leading-relaxed font-normal line-clamp-3">
                {project.shortDescription}
              </p>

              {/* Impact & Tech Stack Box */}
              <div className="p-3 rounded-xl bg-background border border-border/90 shadow-2xs space-y-2">
                <div className="text-xs font-semibold text-status-emerald leading-snug">
                  {project.metrics.impactMetric}
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
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

            {/* Bottom Action Footer */}
            <div className="pt-3.5 flex items-center justify-between border-t border-border/80 mt-auto text-xs gap-2">
              {project.externalLiveUrl ? (
                <a
                  href={project.externalLiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex min-h-9 items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLinkIcon className="size-3.5 text-status-emerald" />
                  <span>Buka Web Asli</span>
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
                  <span>Simulasi Fitur</span>
                </button>
              )}

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
