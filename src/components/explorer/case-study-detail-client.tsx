"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  BookmarkIcon,
  CheckCircle2Icon,
  ClockIcon,
  ExternalLinkIcon,
  GithubIcon,
  PlayIcon,
  SparklesIcon,
} from "lucide-react";
import { type PortfolioProject } from "@/lib/portfolio-data";
import { useAgencyStore } from "@/lib/agency-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectBlueprintVisual } from "@/components/explorer/project-blueprint-visual";
import { ProjectCard } from "@/components/explorer/project-card";

interface CaseStudyDetailClientProps {
  project: PortfolioProject;
  relatedProjects: PortfolioProject[];
}

export function CaseStudyDetailClient({
  project,
  relatedProjects,
}: CaseStudyDetailClientProps) {
  const setActiveDemoProject = useAgencyStore(
    (state) => state.setActiveDemoProject
  );
  const openContactModal = useAgencyStore((state) => state.openContactModal);
  const bookmarkedSlugs = useAgencyStore((state) => state.bookmarkedSlugs);
  const toggleBookmark = useAgencyStore((state) => state.toggleBookmark);

  const isBookmarked = bookmarkedSlugs.includes(project.slug);

  const segmentLabel =
    project.targetSegment === "ENTERPRISE"
      ? "Sistem Perusahaan"
      : project.targetSegment === "SME"
        ? "UMKM & E-Commerce"
        : "Personal & Edukasi";

  return (
    <article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col gap-10">
      {/* Top Breadcrumb & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeftIcon data-icon="inline-start" />
            Kembali
          </Link>
        </Button>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant={isBookmarked ? "secondary" : "outline"}
            size="sm"
            onClick={() => toggleBookmark(project.slug)}
          >
            <BookmarkIcon
              data-icon="inline-start"
              className={isBookmarked ? "fill-current" : ""}
            />
            {isBookmarked ? "Tersimpan" : "Simpan"}
          </Button>

          {project.externalLiveUrl && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={project.externalLiveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon data-icon="inline-start" />
                Buka Web Asli
              </a>
            </Button>
          )}

          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kode Sumber GitHub"
              >
                <GithubIcon data-icon="inline-start" />
                GitHub
              </a>
            </Button>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setActiveDemoProject(project)}
          >
            <PlayIcon data-icon="inline-start" />
            Simulasi
          </Button>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={() =>
              openContactModal({
                subject: `Buat Website Serupa: ${project.title}`,
                contextLabel: project.clientTypeLabel,
                defaultMessage: `Halo Surya, saya tertarik membuat website serupa dengan "${project.title}" (${project.clientTypeLabel}).\n\nDetail singkat kebutuhan saya: `,
              })
            }
          >
            <SparklesIcon data-icon="inline-start" />
            Pesan Serupa
          </Button>
        </div>
      </div>

      {/* Minimalist Hero Header */}
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default">{project.clientTypeLabel}</Badge>
          <Badge variant="outline">{segmentLabel}</Badge>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted-foreground">
            <ClockIcon className="size-3 text-status-emerald" />
            {project.timelineWeeks}
          </span>
        </div>

        <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
          {project.title}
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Badge variant="verified" className="py-1 px-3">
            <CheckCircle2Icon className="size-3.5 mr-1.5" />
            {project.metrics.impactMetric}
          </Badge>
        </div>
      </header>

      {/* Minimalist Architecture & Tech Stack Blueprint */}
      <section aria-label="Arsitektur sistem">
        <ProjectBlueprintVisual project={project} variant="detail" />
      </section>

      {/* Compact 2-Column Summary: Core Solution & Deliverables */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Brief Challenge & Solution */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-status-emerald">
              01 / Inti Solusi
            </span>

            <div className="flex flex-col gap-1.5">
              <h2 className="font-display text-sm font-bold text-foreground">
                Tantangan
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="flex flex-col gap-1.5 border-t border-border/60 pt-4">
              <h2 className="font-display text-sm font-bold text-foreground">
                Eksekusi Sistem
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {project.architectureExecution}
              </p>
            </div>
          </div>

          {project.beforeAfter[0] && (
            <div className="flex items-center justify-between rounded-xl border border-border/70 bg-surface px-4 py-3 text-xs font-mono">
              <span className="text-muted-foreground">
                {project.beforeAfter[0].metricLabel}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground line-through">
                  {project.beforeAfter[0].beforeValue}
                </span>
                <span className="font-bold text-status-emerald">
                  {project.beforeAfter[0].afterValue}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Concise Deliverables Checklist */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-status-emerald">
                02 / Fitur Utama
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                Estimasi {project.timelineWeeks}
              </span>
            </div>

            <ul className="grid grid-cols-1 gap-2.5 pt-1">
              {project.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-surface/60 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-foreground"
                >
                  <CheckCircle2Icon className="size-4 shrink-0 text-status-emerald" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            type="button"
            variant="default"
            className="w-full"
            onClick={() =>
              openContactModal({
                subject: `Pesan Website Seperti "${project.title}"`,
                contextLabel: `${project.clientTypeLabel} • ${project.timelineWeeks}`,
                defaultMessage: `Halo Surya, saya ingin memesan pembuatan website serupa "${project.title}".\n\nCatatan kebutuhan saya: `,
              })
            }
          >
            <SparklesIcon data-icon="inline-start" />
            Pesan Website Serupa
            <ArrowUpRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </section>

      {/* Related Case Studies */}
      {relatedProjects.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="flex flex-col gap-5 border-t border-border pt-8"
        >
          <div className="flex items-center justify-between">
            <h2
              id="related-heading"
              className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground"
            >
              Karya Lainnya
            </h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Semua Karya</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((rel) => (
              <ProjectCard key={rel.id} project={rel} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
