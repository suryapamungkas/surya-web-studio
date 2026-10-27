"use client";

import * as React from "react";
import { useQueryState, parseAsStringLiteral, parseAsString } from "nuqs";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRightIcon,
  BookmarkIcon,
  FolderSearchIcon,
  RotateCcwIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import {
  PORTFOLIO_PROJECTS,
  CATEGORY_FILTERS,
} from "@/lib/portfolio-data";
import { useAgencyStore } from "@/lib/agency-store";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { ViewSwitcherBar } from "@/components/explorer/view-switcher-bar";
import { ProjectCard } from "@/components/explorer/project-card";
import { VerifiedMetricsRow } from "@/components/explorer/verified-metrics-row";
import { InFeedCtaBanner } from "@/components/explorer/in-feed-cta-banner";
import { SuryaProfileSection } from "@/components/explorer/surya-profile-section";
import {
  SegmentComparison,
  AgencyPricingSection,
} from "@/components/solutions/segment-comparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const VIEW_MODES = ["projects", "solutions"] as const;
const CATEGORY_IDS = [
  "featured",
  "web-apps",
  "interactive-3d",
  "enterprise-erp",
  "ai-systems",
  "personal-umkm",
] as const;

export function ExplorerHubClient() {
  const [viewMode, setViewMode] = useQueryState(
    "view",
    parseAsStringLiteral(VIEW_MODES).withDefault("projects")
  );
  const [activeCategory, setActiveCategory] = useQueryState(
    "category",
    parseAsStringLiteral(CATEGORY_IDS).withDefault("featured")
  );
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString.withDefault("")
  );
  const [showSavedOnly, setShowSavedOnly] = React.useState(false);

  const bookmarkedSlugs = useAgencyStore((state) => state.bookmarkedSlugs);

  const isDefaultShowcaseView =
    activeCategory === "featured" &&
    searchQuery.trim() === "" &&
    !showSavedOnly;

  const filteredProjects = React.useMemo(() => {
    const selectedCategoryMeta = CATEGORY_FILTERS.find(
      (cat) => cat.id === activeCategory
    );

    return PORTFOLIO_PROJECTS.filter((project) => {
      if (showSavedOnly && !bookmarkedSlugs.includes(project.slug)) {
        return false;
      }

      if (
        selectedCategoryMeta &&
        selectedCategoryMeta.dbCategory !== "ALL" &&
        project.category !== selectedCategoryMeta.dbCategory
      ) {
        return false;
      }

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(q);
        const matchesClient = project.clientTypeLabel.toLowerCase().includes(q);
        const matchesSummary = project.shortDescription
          .toLowerCase()
          .includes(q);
        const matchesTech = project.techStack.some(
          (tech) =>
            tech.name.toLowerCase().includes(q) ||
            tech.role.toLowerCase().includes(q)
        );
        return (
          matchesTitle || matchesClient || matchesSummary || matchesTech
        );
      }

      return true;
    });
  }, [activeCategory, searchQuery, showSavedOnly, bookmarkedSlugs]);

  // Curated rows featuring all real projects by Surya Pamungkas
  const featuredTopThree = React.useMemo(
    () => PORTFOLIO_PROJECTS.filter((p) => p.isFeatured).slice(0, 3),
    []
  );

  const rowWebAndStore = React.useMemo(
    () =>
      PORTFOLIO_PROJECTS.filter((p) =>
        ["baru-lagi", "traveloop", "vanguard-human-capital"].includes(p.slug)
      ),
    []
  );

  const rowAiSystems = React.useMemo(
    () =>
      PORTFOLIO_PROJECTS.filter((p) =>
        [
          "lexindonesia-legal-platform",
          "llm-evaluation-dashboard",
          "smart-vegetable-detector",
        ].includes(p.slug)
      ),
    []
  );

  const rowEnterpriseAndUmkm = React.useMemo(
    () =>
      PORTFOLIO_PROJECTS.filter((p) =>
        ["resilio-id", "nusa-decarb", "trustchain-umkm"].includes(p.slug)
      ),
    []
  );

  const standoutStories = React.useMemo(
    () => PORTFOLIO_PROJECTS.filter((p) => p.isStandout).slice(0, 3),
    []
  );

  const handleResetFilters = () => {
    void setActiveCategory("featured");
    void setSearchQuery("");
    setShowSavedOnly(false);
  };

  return (
    <div className="min-h-screen">
      {/* Section 0: 3D Perspective Image Stream Hero */}
      <section
        aria-label="Showcase Hero Surya Studio"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-2 pb-6"
      >
        <ImageStreamHero className="h-[420px] sm:h-[500px] lg:h-[560px] w-full rounded-2xl border border-border bg-background">
          <div className="relative z-10 flex h-full flex-col items-center justify-between py-8 sm:py-10 lg:py-12 text-center">
            <div className="px-6">
              <h1 className="font-display text-balance text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                Karya nyata,
                <br />
                di garis depan.
              </h1>
            </div>
            <p className="max-w-md text-balance px-6 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              10+ website produksi aktif, 16 keahlian teknis, dan 17 sertifikasi
              resmi yang siap disesuaikan untuk bisnis Anda.
            </p>
          </div>
        </ImageStreamHero>
      </section>

      {/* Sticky View Switcher, Category Pills, and Live Search Bar */}
      <ViewSwitcherBar
        activeView={viewMode}
        onViewChange={(mode) => void setViewMode(mode)}
        activeCategory={activeCategory}
        onCategoryChange={(cat) =>
          void setActiveCategory(cat as (typeof CATEGORY_IDS)[number])
        }
        searchQuery={searchQuery}
        onSearchChange={(q) => void setSearchQuery(q)}
        totalMatchingCount={filteredProjects.length}
      />

      {/* Compact Filter Status Strip */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-secondary/40 px-4 py-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <SlidersHorizontalIcon className="size-3.5 text-foreground" />
            <span>Kategori:</span>
            <Badge variant="outline" className="bg-background font-medium">
              {
                CATEGORY_FILTERS.find((c) => c.id === activeCategory)?.label ?? "Karya Unggulan"
              }
            </Badge>
            {searchQuery.trim() !== "" && (
              <Badge variant="secondary">
                Cari: &ldquo;{searchQuery}&rdquo;
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant={showSavedOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowSavedOnly((prev) => !prev)}
            >
              <BookmarkIcon data-icon="inline-start" className="size-3.5" />
              Disimpan
              <span className="ml-1 rounded-full bg-foreground/10 px-1.5 py-0.5 font-mono text-[10px] tabular-nums">
                {bookmarkedSlugs.length}
              </span>
            </Button>

            {!isDefaultShowcaseView && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
              >
                <RotateCcwIcon data-icon="inline-start" className="size-3.5" />
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {viewMode === "projects" ? (
          <motion.div
            key="projects-view"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-16"
          >
            {isDefaultShowcaseView ? (
              <>
                {/* SECTION 1: Featured Showcases (Top 3 Real Surya Projects) */}
                <section
                  id="showcase"
                  aria-labelledby="featured-heading"
                  className="flex flex-col gap-5 scroll-mt-24"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        01 / Karya Unggulan Surya Pamungkas
                      </span>
                      <h2
                        id="featured-heading"
                        className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
                      >
                        Contoh Website Siap Pakai
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
                      Klik &ldquo;Buka Web Asli&rdquo; untuk mencoba langsung hasil karya yang sudah online.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredTopThree.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                      />
                    ))}
                  </div>
                </section>

                {/* SECTION 2: Surya Pamungkas Builder Profile, 10 Skills & 14 Certifications */}
                <SuryaProfileSection />

                {/* SECTION 3: Categorized Real Projects Rows */}
                <div className="flex flex-col gap-14">
                  {/* Row A: Web Apps, Travel, FinTech & EdTech */}
                  <section
                    aria-labelledby="row-web-heading"
                    className="flex flex-col gap-5 cv-auto-section"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-border/70 pb-3.5">
                      <div>
                        <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                          02 / Aplikasi Web & Toko Digital
                        </span>
                        <h2
                          id="row-web-heading"
                          className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground"
                        >
                          Toko Online, Rencana Wisata & Portofolio
                        </h2>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => void setActiveCategory("web-apps")}
                      >
                        Filter Web App
                        <ArrowRightIcon data-icon="inline-end" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {rowWebAndStore.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </section>

                  {/* Row B: AI Systems & Legal Tech */}
                  <section
                    aria-labelledby="row-ai-heading"
                    className="flex flex-col gap-5 cv-auto-section"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-border/70 pb-3.5">
                      <div>
                        <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                          03 / Integrasi Kecerdasan Buatan (AI)
                        </span>
                        <h2
                          id="row-ai-heading"
                          className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground"
                        >
                          Riset Hukum, Evaluasi LLM & Kamera AI
                        </h2>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => void setActiveCategory("ai-systems")}
                      >
                        Filter Proyek AI
                        <ArrowRightIcon data-icon="inline-end" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {rowAiSystems.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </section>

                  {/* Row C: Business Systems, ESG & UMKM Export */}
                  <section
                    aria-labelledby="row-erp-heading"
                    className="flex flex-col gap-5 cv-auto-section"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-border/70 pb-3.5">
                      <div>
                        <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                          04 / Dashboard Bisnis & Rantai Pasok
                        </span>
                        <h2
                          id="row-erp-heading"
                          className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground"
                        >
                          Ketahanan Finansial, ESG Karbon & Ekspor UMKM
                        </h2>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => void setActiveCategory("enterprise-erp")}
                      >
                        Filter Sistem Bisnis
                        <ArrowRightIcon data-icon="inline-end" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {rowEnterpriseAndUmkm.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </section>
                </div>

                {/* SECTION 4: Interactive Pricing, Why Work With Surya & CTA Banner */}
                <AgencyPricingSection />
                <VerifiedMetricsRow />
                <InFeedCtaBanner />
              </>
            ) : (
              /* Filtered Search / Category / Saved Results View */
              <section
                aria-labelledby="filtered-results-heading"
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-border/70 pb-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      Hasil Filter Karya
                    </span>
                    <h2
                      id="filtered-results-heading"
                      className="font-display text-2xl font-bold tracking-tight text-foreground"
                    >
                      Menampilkan {filteredProjects.length} Proyek
                    </h2>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleResetFilters}
                  >
                    <RotateCcwIcon data-icon="inline-start" />
                    Tampilkan Semua ({PORTFOLIO_PROJECTS.length} Proyek)
                  </Button>
                </div>

                {filteredProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <Empty className="my-8 py-14">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <FolderSearchIcon className="size-5" />
                      </EmptyMedia>
                      <EmptyTitle>
                        Proyek tidak ditemukan untuk filter ini
                      </EmptyTitle>
                      <EmptyDescription>
                        Reset filter untuk melihat seluruh {PORTFOLIO_PROJECTS.length} karya website siap pakai.
                      </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent className="flex-row flex-wrap justify-center gap-3">
                      <Button
                        type="button"
                        variant="default"
                        onClick={handleResetFilters}
                      >
                        <RotateCcwIcon data-icon="inline-start" />
                        Reset Filter
                      </Button>
                    </EmptyContent>
                  </Empty>
                )}
              </section>
            )}

            {/* SECTION 5: Standout Projects */}
            {standoutStories.length > 0 && isDefaultShowcaseView && (
              <section
                aria-labelledby="standout-stories-heading"
                className="flex flex-col gap-6 pt-6 border-t border-border cv-auto-section"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      05 / Bedah Fitur & Manfaat Bisnis
                    </span>
                    <h2
                      id="standout-stories-heading"
                      className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
                    >
                      Detail Karya Pilihan
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
                    Klik &ldquo;Buka Web Asli&rdquo; atau &ldquo;Simulasi Fitur&rdquo; untuk menguji interaktivitas karya.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {standoutStories.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="solutions-view"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-14"
          >
            <SegmentComparison />
            <SuryaProfileSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
