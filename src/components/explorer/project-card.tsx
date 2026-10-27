"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookmarkIcon,
  ChevronRightIcon,
  ClockIcon,
  ExternalLinkIcon,
  PlayIcon,
} from "lucide-react";
import { GlowCard, type GlowCardProps } from "@/components/ui/spotlight-card";
import { ProjectBlueprintVisual } from "@/components/explorer/project-blueprint-visual";
import type { PortfolioProject } from "@/lib/portfolio-data";
import { useAgencyStore } from "@/lib/agency-store";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: PortfolioProject;
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

export function ProjectCard({ project }: ProjectCardProps) {
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
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches &&
      !isRevealed
    ) {
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
      className="group cursor-pointer bg-card transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-status-emerald h-[285px] sm:h-[300px]"
    >
      <div className="relative z-10 flex h-full w-full flex-col justify-between overflow-hidden rounded-[14px]">
        {/* Top Header: Compact Category Eyebrow + Bold Title */}
        <div className="p-5 pb-3.5 flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-status-emerald truncate">
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
                "inline-flex size-7 items-center justify-center rounded-full border transition-all cursor-pointer shrink-0",
                isBookmarked
                  ? "bg-status-emerald text-white border-status-emerald opacity-100"
                  : "border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
              )}
            >
              <BookmarkIcon className="size-3.5" />
            </button>
          </div>

          <h3 className="font-display font-bold text-foreground text-base sm:text-lg leading-snug group-hover:text-status-emerald group-focus-within:text-status-emerald transition-colors line-clamp-1">
            {project.title}
          </h3>
        </div>

        {/* Bottom Interactive Stage: Compact Idle Visual -> Smooth Detail Reveal on Hover */}
        <div className="relative flex-1 w-full overflow-hidden bg-surface/60 border-t border-border/60">
          {/* Layer 1: Compact Idle State */}
          <div
            className={cn(
              "absolute inset-0 w-full h-full transition-all duration-400 ease-out group-hover:opacity-0 group-hover:scale-105 group-focus-within:opacity-0 group-focus-within:scale-105 pointer-events-none",
              isRevealed && "opacity-0 scale-105"
            )}
          >
            <ProjectBlueprintVisual project={project} variant="card" />
          </div>

          {/* Layer 2: Smooth Hover/Focus/Tap Detail Panel */}
          <div
            className={cn(
              "absolute inset-0 p-5 flex flex-col justify-between bg-gradient-to-b from-card/95 via-surface/95 to-status-emerald-subtle/35 transition-all duration-400 ease-out opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto",
              isRevealed && "opacity-100 translate-y-0 pointer-events-auto"
            )}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-status-emerald bg-status-emerald-subtle px-2 py-0.5 rounded inline-block">
                  {SEGMENT_LABEL[project.targetSegment]}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                  <ClockIcon className="size-3 text-status-emerald" />
                  {project.timelineWeeks}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal line-clamp-2">
                {project.shortDescription}
              </p>
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-2.5 flex items-center justify-between border-t border-border/80 mt-auto text-xs gap-2">
              {project.externalLiveUrl ? (
                <a
                  href={project.externalLiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex min-h-8 items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                  className="inline-flex min-h-8 items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <PlayIcon className="size-3.5 text-status-emerald" />
                  <span>Simulasi</span>
                </button>
              )}

              <Link
                href={`/projects/${project.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex min-h-8 items-center gap-1 font-bold text-status-emerald hover:opacity-85 uppercase tracking-wider"
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
