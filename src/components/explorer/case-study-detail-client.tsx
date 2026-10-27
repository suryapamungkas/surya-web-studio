"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  BookmarkIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  CpuIcon,
  ExternalLinkIcon,
  GithubIcon,
  LayersIcon,
  PlayIcon,
  SparklesIcon,
  TrendingUpIcon,
} from "lucide-react";
import { type PortfolioProject } from "@/lib/portfolio-data";
import { useAgencyStore } from "@/lib/agency-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TechStackIcon } from "@/components/ui/tech-stack-icon";
import { GlowCard } from "@/components/ui/spotlight-card";
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

  return (
    <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-14">
      {/* Top Breadcrumb & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeftIcon data-icon="inline-start" />
            Kembali ke Daftar Karya
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
            Simulasi Fitur
          </Button>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={() =>
              openContactModal({
                subject: `Buat Website Serupa: ${project.title}`,
                contextLabel: project.clientTypeLabel,
                defaultMessage: `Halo Surya, saya tertarik membuat website serupa dengan studi kasus "${project.title}" (${project.clientTypeLabel}).\n\nDetail kebutuhan bisnis saya:\n- Nama brand / perusahaan: \n- Fitur yang ingin disesuaikan: `,
              })
            }
          >
            <SparklesIcon data-icon="inline-start" />
            Buat Website Serupa
          </Button>
        </div>
      </div>

      {/* Hero Header & Concise Metadata Grid */}
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">{project.clientTypeLabel}</Badge>
            <Badge variant="outline">
              {project.targetSegment === "ENTERPRISE"
                ? "Sistem Perusahaan"
                : project.targetSegment === "SME"
                  ? "UMKM & E-Commerce"
                  : "Personal & Edukasi"}
            </Badge>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              Karya Surya Pamungkas ({project.createdAt})
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[65ch]">
            {project.shortDescription}
          </p>
        </div>

        <div className="lg:col-span-4">
          <Card className="bg-secondary/40 border-border">
            <CardContent className="p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border/70 pb-3">
                <span className="text-xs font-medium text-muted-foreground">
                  Status Sistem
                </span>
                <Badge variant="verified">
                  <CheckCircle2Icon className="size-3 mr-1" />
                  Produksi Terverifikasi
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Waktu Buka</span>
                  <span className="font-mono font-semibold text-foreground tabular-nums">
                    {project.metrics.loadTimeMs} ms
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Estimasi Buat</span>
                  <span className="font-mono font-semibold text-foreground tabular-nums">
                    {project.timelineWeeks}
                  </span>
                </div>
                <div className="col-span-2 flex flex-col gap-1 pt-1 border-t border-border/50">
                  <span className="text-muted-foreground">Hasil Utama</span>
                  <span className="font-medium text-foreground">
                    {project.metrics.impactMetric}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </header>

      {/* Primary Visual Showcase Frame (Lightweight Architecture Blueprint) */}
      <section aria-label="Blueprint arsitektur proyek" className="relative">
        <ProjectBlueprintVisual project={project} variant="detail" />
      </section>

      {/* Before vs. After Comparison */}
      <section
        aria-labelledby="telemetry-heading"
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
            01 / Manfaat Nyata
          </span>
          <h2
            id="telemetry-heading"
            className="font-display text-2xl font-bold tracking-tight text-foreground"
          >
            Perbandingan Sebelum & Sesudah Pakai Sistem
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.beforeAfter.map((item, idx) => (
            <GlowCard
              key={item.metricLabel}
              customSize
              glowColor={idx % 2 === 0 ? "green" : "blue"}
              tabIndex={0}
              className="group relative h-[210px] bg-card transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-status-emerald"
            >
              <div className="relative z-10 flex h-full w-full flex-col justify-between overflow-hidden rounded-[14px]">
                {/* Top Header: Clean Metric Label */}
                <div className="p-5 pb-3 flex flex-col gap-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-status-emerald">
                    Indikator 0{idx + 1}
                  </span>
                  <h3 className="font-display text-base font-bold text-foreground group-hover:text-status-emerald group-focus-within:text-status-emerald transition-colors line-clamp-1">
                    {item.metricLabel}
                  </h3>
                </div>

                {/* Bottom Stage: Clean Metric Number When Idle -> Smooth Explanation on Hover */}
                <div className="relative flex-1 w-full overflow-hidden bg-surface/65 border-t border-border/60">
                  {/* Idle Layer */}
                  <div className="absolute inset-0 p-5 flex items-center justify-between transition-all duration-400 ease-out group-hover:opacity-0 group-hover:scale-105 group-focus-within:opacity-0 group-focus-within:scale-105 pointer-events-none">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-2xl font-bold text-status-emerald tabular-nums">
                        {item.afterValue}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground line-through tabular-nums">
                        Sebelumnya: {item.beforeValue}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-status-emerald inline-flex items-center gap-0.5">
                      <span>Detail</span>
                      <ChevronRightIcon className="size-3.5" />
                    </span>
                  </div>

                  {/* Hover / Focus Detail Layer */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between bg-gradient-to-b from-card/95 via-surface/95 to-status-emerald-subtle/35 transition-all duration-400 ease-out opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
                    <div className="flex items-start gap-2 text-xs text-foreground/90 leading-relaxed">
                      <TrendingUpIcon className="size-4 shrink-0 text-status-emerald mt-0.5" />
                      <span>{item.improvementNote}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-border/70 pt-2 text-[11px] font-mono">
                      <span className="text-muted-foreground">
                        {item.beforeLabel}: {item.beforeValue}
                      </span>
                      <span className="font-bold text-status-emerald">
                        {item.afterLabel}: {item.afterValue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* Concise Narrative + Deliverables */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-border pt-10">
        {/* Left 7 columns */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
              02 / Ringkasan Solusi
            </span>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Masalah & Solusi yang Diterapkan
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-1.5">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                A. Kendala Sebelumnya
              </span>
              <p className="text-sm sm:text-base text-foreground leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-1.5">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                B. Solusi Website
              </span>
              <p className="text-sm sm:text-base text-foreground leading-relaxed">
                {project.architectureExecution}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-secondary/40 p-5 flex flex-col gap-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-2">
                <CpuIcon className="size-4 text-emerald-600 dark:text-emerald-400" />
                C. Poin Unggulan
              </span>
              <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {project.engineeringStory}
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 columns: Tech Stack & Deliverables */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="border-border">
            <CardHeader className="p-6 pb-3">
              <CardTitle className="text-lg font-bold">
                Fitur yang Anda Dapatkan Jika Buat Serupa
              </CardTitle>
              <CardDescription className="text-xs">
                Bisa disesuaikan lagi dengan nama brand dan kebutuhan bisnis Anda.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-2 flex flex-col gap-4">
              <ul className="flex flex-col gap-2.5">
                {project.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground"
                  >
                    <CheckCircle2Icon className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                type="button"
                variant="default"
                className="w-full mt-2"
                onClick={() =>
                  openContactModal({
                    subject: `Pesan Website Seperti "${project.title}"`,
                    contextLabel: `${project.clientTypeLabel} • ${project.timelineWeeks}`,
                    defaultMessage: `Halo Surya, saya ingin memesan pembuatan website dengan modul seperti pada "${project.title}":\n${project.deliverables.map((d) => `- ${d}`).join("\n")}\n\nCatatan tambahan dari saya: `,
                  })
                }
              >
                <SparklesIcon data-icon="inline-start" />
                Pesan Website Seperti Ini
                <ArrowUpRightIcon data-icon="inline-end" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="p-6 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                <LayersIcon className="size-4 text-foreground" />
                Teknologi
              </div>
              <CardTitle className="text-lg font-bold">
                Teknologi yang Digunakan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 flex flex-col gap-3">
              {project.architectureLayers.map((item, idx) => (
                <div
                  key={item.layer}
                  className="rounded-lg border border-border/80 bg-secondary/30 p-3 flex flex-col gap-1"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold text-foreground">
                      0{idx + 1}. {item.layer}
                    </span>
                    <Badge variant="secondary" className="font-mono text-[11px]">
                      {item.choice}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.rationale}
                  </p>
                </div>
              ))}

              <div className="pt-2 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge
                    key={tech.name}
                    variant="outline"
                    className="gap-1.5 py-1 px-2.5 bg-background"
                  >
                    <TechStackIcon name={tech.icon} className="size-3.5" />
                    <span>{tech.name}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Case Studies */}
      {relatedProjects.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="flex flex-col gap-6 border-t border-border pt-10"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                03 / Karya Lainnya
              </span>
              <h2
                id="related-heading"
                className="font-display text-2xl font-bold tracking-tight text-foreground"
              >
                Karya Terkait Buatan Surya
              </h2>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Lihat Semua 10 Karya</Link>
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
