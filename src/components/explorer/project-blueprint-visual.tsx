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
          "relative w-full overflow-hidden rounded-2xl border border-border bg-surface p-5 sm:p-6 flex flex-col justify-between gap-5",
          className
        )}
      >
        {/* Top bar: Clean System Header + Key Comparison */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-3.5">
          <span className="font-mono text-xs font-medium text-muted-foreground">
            Arsitektur & Stack Teknologi
          </span>

          {primaryComparison && (
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-muted-foreground hidden sm:inline">
                {primaryComparison.metricLabel}:
              </span>
              <span className="text-muted-foreground line-through tabular-nums">
                {primaryComparison.beforeValue}
              </span>
              <ArrowRightIcon className="size-3 text-status-emerald" />
              <span className="rounded-md bg-status-emerald-subtle px-2 py-0.5 font-bold text-status-emerald tabular-nums">
                {primaryComparison.afterValue}
              </span>
            </div>
          )}
        </div>

        {/* Middle: Minimalist 3-Layer Architecture Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {project.architectureLayers.map((layer, index) => (
            <div
              key={layer.layer}
              className="relative rounded-xl border border-border bg-background p-4 flex flex-col justify-between gap-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  0{index + 1} / {layer.layer}
                </span>
                <LayersIcon className={cn("size-4 shrink-0", theme.accentClass)} />
              </div>

              <p className="font-display text-sm sm:text-base font-bold text-foreground leading-snug">
                {layer.choice}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom: Clean Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {project.techStack.map((tech, idx) => (
            <React.Fragment key={tech.name}>
              <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground">
                <TechStackIcon name={tech.icon} className="size-4" />
                <span>{tech.name}</span>
              </div>
              {idx < project.techStack.length - 1 && (
                <ArrowRightIcon className="size-3 text-muted-foreground/50 hidden sm:block" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // Default / "card" / "standout": compact idle visual stage with centered tech stack tiles
  return (
    <div
      className={cn(
        "relative w-full h-full flex items-center justify-center p-4 overflow-hidden bg-surface/40 select-none",
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
      <div className="relative z-10 flex items-center justify-center gap-2">
        {visibleStack.map((tech, idx) => (
          <React.Fragment key={tech.name}>
            <div className="flex flex-col items-center gap-1 rounded-xl border border-border/90 bg-background/90 px-2.5 py-2 shadow-2xs min-w-[68px] max-w-[96px]">
              <TechStackIcon name={tech.icon} className="size-4.5" />
              <span className="font-display text-[10.5px] font-semibold text-foreground text-center truncate w-full" title={tech.name}>
                {tech.name}
              </span>
            </div>
            {idx < visibleStack.length - 1 && (
              <div className="h-px w-2 bg-border shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
