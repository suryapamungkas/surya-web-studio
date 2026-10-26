"use client";

import * as React from "react";
import { motion } from "motion/react";
import { SearchIcon, XIcon, LayersIcon, CompassIcon } from "lucide-react";
import { CATEGORY_FILTERS } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

interface ViewSwitcherBarProps {
  activeView: "projects" | "solutions";
  onViewChange: (view: "projects" | "solutions") => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalMatchingCount: number;
}

export function ViewSwitcherBar({
  activeView,
  onViewChange,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  totalMatchingCount,
}: ViewSwitcherBarProps) {
  return (
    <div
      id="explorer-hub"
      className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8 scroll-mt-24"
    >
      <div className="flex flex-col gap-4 border-y border-border py-4">
        {/* Top Row: Primary Segmented Toggle (Projects vs Solutions & Packages) + Live Search */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div
            role="tablist"
            aria-label="Mode tampilan eksplorasi"
            className="bg-surface-elevated inline-flex w-full sm:w-fit items-center rounded-full border border-border p-1 gap-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeView === "projects"}
              onClick={() => onViewChange("projects")}
              className={cn(
                "relative inline-flex min-h-11 flex-1 sm:flex-initial items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors cursor-pointer",
                activeView === "projects"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeView === "projects" && (
                <motion.span
                  layoutId="activePrimaryViewTab"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="bg-background border border-border shadow-xs absolute inset-0 rounded-full"
                />
              )}
              <CompassIcon className="relative z-10 size-4" />
              <span className="relative z-10">Projects</span>
              <span className="relative z-10 font-mono text-xs opacity-75">
                ({totalMatchingCount})
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeView === "solutions"}
              onClick={() => onViewChange("solutions")}
              className={cn(
                "relative inline-flex min-h-11 flex-1 sm:flex-initial items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors cursor-pointer",
                activeView === "solutions"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeView === "solutions" && (
                <motion.span
                  layoutId="activePrimaryViewTab"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="bg-background border border-border shadow-xs absolute inset-0 rounded-full"
                />
              )}
              <LayersIcon className="relative z-10 size-4" />
              <span className="relative z-10">Solutions & Packages</span>
            </button>
          </div>

          {activeView === "projects" && (
            <div className="relative w-full md:w-80">
              <label htmlFor="project-search-input" className="sr-only">
                Cari proyek berdasarkan nama atau teknologi
              </label>
              <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
              <input
                id="project-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari studi kasus atau stack (mis. Next.js, ERP)..."
                className="bg-surface text-foreground placeholder:text-muted-foreground border-border min-h-11 w-full rounded-full border pr-10 pl-10 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Hapus kata kunci pencarian"
                  onClick={() => onSearchChange("")}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-1.5 flex size-9 -translate-y-1/2 items-center justify-center rounded-full cursor-pointer"
                >
                  <XIcon className="size-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bottom Row: Horizontal Scrollable Category Pills with layoutId="activeFilterPill" */}
        {activeView === "projects" && (
          <div
            role="navigation"
            aria-label="Filter kategori proyek"
            className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar"
          >
            {CATEGORY_FILTERS.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onCategoryChange(cat.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative inline-flex min-h-11 shrink-0 items-center justify-center rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer",
                    isActive
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground bg-surface"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFilterPill"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                      className="bg-background border-foreground/25 shadow-xs absolute inset-0 rounded-full border"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
