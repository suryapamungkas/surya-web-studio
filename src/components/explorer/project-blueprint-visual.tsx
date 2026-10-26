"use client";

import * as React from "react";
import { ArrowRightIcon, LayersIcon } from "lucide-react";
import { TechStackIcon } from "@/components/ui/tech-stack-icon";
import type { PortfolioProject } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

interface ProjectBlueprintVisualProps {
  project: PortfolioProject;
  variant?: "card" | "standout" | "detail";
  className?: string;
}

const CATEGORY_THEME: Record<
  PortfolioProject["category"],
  {
    domainTag: string;
    accentClass: string;
    orbGradient: string;
  }
> = {
  WEB_APP: {
    domainTag: "Web Application",
    accentClass: "text-status-emerald",
    orbGradient:
      "from-emerald-500/12 via-emerald-500/4 to-transparent dark:from-emerald-400/12 dark:via-emerald-400/4",
  },
  INTERACTIVE_WEB: {
    domainTag: "Interactive UI",
    accentClass: "text-accent-indigo",
    orbGradient:
      "from-indigo-500/12 via-indigo-500/4 to-transparent dark:from-indigo-400/12 dark:via-indigo-400/4",
  },
  ENTERPRISE_ERP: {
    domainTag: "Enterprise System",
    accentClass: "text-status-emerald",
    orbGradient:
      "from-emerald-500/12 via-teal-500/4 to-transparent dark:from-emerald-400/12 dark:via-teal-400/4",
  },
  AI_SYSTEM: {
    domainTag: "AI & Automation",
    accentClass: "text-accent-indigo",
    orbGradient:
      "from-violet-500/12 via-indigo-500/4 to-transparent dark:from-violet-400/12 dark:via-indigo-400/4",
  },
  PERSONAL_BRAND: {
    domainTag: "Brand & UMKM",
    accentClass: "text-status-emerald",
    orbGradient:
      "from-emerald-500/12 via-emerald-500/4 to-transparent dark:from-emerald-400/12 dark:via-emerald-400/4",
  },
  MOBILE_APP: {
    domainTag: "Mobile App",
    accentClass: "text-accent-indigo",
    orbGradient:
      "from-amber-500/12 via-orange-500/4 to-transparent dark:from-amber-400/12 dark:via-orange-400/4",
  },
};

export function ProjectBlueprintVisual({
  project,
  variant = "card",
  className,
}: ProjectBlueprintVisualProps) {
  const theme = CATEGORY_THEME[project.category];
  const primaryComparison = project.beforeAfter[0];
  const visibleStack = project.techStack.slice(0, 3);

  if (variant === "detail") {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8 flex flex-col justify-between gap-6",
          className
        )}
      >
        {/* Top bar: Clean System Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-4">
          <span className="font-mono text-xs text-muted-foreground">
            Arsitektur Sistem Terverifikasi
          </span>

          <div className="flex items-center gap-2.5 font-mono text-xs">
            <span className="rounded-md border border-border bg-background px-2.5 py-1 font-semibold text-foreground">
              Estimasi: {project.timelineWeeks}
            </span>
          </div>
        </div>

        {/* Middle: 3-Layer Architecture Flow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.architectureLayers.map((layer, index) => (
            <div
              key={layer.layer}
              className="relative rounded-xl border border-border bg-background p-4 flex flex-col justify-between gap-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  0{index + 1} / {layer.layer}
                </span>
                <LayersIcon className={cn("size-4", theme.accentClass)} />
              </div>

              <div>
                <p className="font-display text-sm sm:text-base font-bold text-foreground">
                  {layer.choice}
                </p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {layer.rationale}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom: Tech Stack Pipeline + Key Metric Comparison */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border/80 bg-background/80 p-4">
          <div className="flex flex-wrap items-center gap-2">
            {project.techStack.map((tech, idx) => (
              <React.Fragment key={tech.name}>
                <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground">
                  <TechStackIcon name={tech.icon} className="size-4" />
                  <span>{tech.name}</span>
                  <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline">
                    ({tech.role})
                  </span>
                </div>
                {idx < project.techStack.length - 1 && (
                  <ArrowRightIcon className="size-3.5 text-muted-foreground/60 hidden sm:block" />
                )}
              </React.Fragment>
            ))}
          </div>

          {primaryComparison && (
            <div className="flex items-center gap-2.5 border-t sm:border-t-0 sm:border-l border-border pt-3 sm:pt-0 sm:pl-4 shrink-0">
              <div className="flex flex-col text-right font-mono">
                <span className="text-[10px] uppercase text-muted-foreground">
                  {primaryComparison.metricLabel}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs text-muted-foreground line-through tabular-nums">
                    {primaryComparison.beforeValue}
                  </span>
                  <ArrowRightIcon className="size-3 text-status-emerald" />
                  <span className="text-sm font-bold text-status-emerald tabular-nums">
                    {primaryComparison.afterValue}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default / "card" / "standout": compact idle visual stage with centered tech stack tiles
  return (
    <div
      className={cn(
        "relative w-full h-full flex items-center justify-center p-5 overflow-hidden bg-surface/40 select-none",
        className
      )}
    >
      {/* Subtle Ambient Accent Gradient */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-85",
          theme.orbGradient
        )}
      />

      {/* Centered Tech Stack Tiles */}
      <div className="relative z-10 flex items-center justify-center gap-3">
        {visibleStack.map((tech, idx) => (
          <React.Fragment key={tech.name}>
            <div className="flex flex-col items-center gap-1.5 rounded-xl border border-border/90 bg-background/90 px-3.5 py-3 shadow-2xs min-w-[78px]">
              <TechStackIcon name={tech.icon} className="size-5" />
              <span className="font-display text-[11px] font-semibold text-foreground text-center truncate max-w-[76px]">
                {tech.name}
              </span>
            </div>
            {idx < visibleStack.length - 1 && (
              <div className="h-px w-3 bg-border shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
