"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  CheckCircle2Icon,
  CopyPlusIcon,
  ExternalLinkIcon,
  GaugeIcon,
  LayersIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TechStackIcon } from "@/components/ui/tech-stack-icon";
import { useAgencyStore } from "@/lib/agency-store";

export function InteractiveDemoModal() {
  const activeDemoProject = useAgencyStore((state) => state.activeDemoProject);
  const setActiveDemoProject = useAgencyStore(
    (state) => state.setActiveDemoProject
  );
  const openContactModal = useAgencyStore((state) => state.openContactModal);

  const [simulatedUsers, setSimulatedUsers] = React.useState(250);

  if (!activeDemoProject) {
    return null;
  }

  const project = activeDemoProject;
  const computedLatency = Math.round(
    project.metrics.loadTimeMs * (1 + (simulatedUsers - 250) / 10000)
  );

  return (
    <Dialog
      open={Boolean(activeDemoProject)}
      onOpenChange={(open) => {
        if (!open) setActiveDemoProject(null);
      }}
    >
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="verified">
              Lighthouse {project.metrics.lighthouseScore}/100
            </Badge>
            <Badge variant="secondary">{project.clientTypeLabel}</Badge>
          </div>
          <DialogTitle className="mt-1">{project.title}</DialogTitle>
          <DialogDescription>{project.shortDescription}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">
              <LayersIcon className="size-4" />
              <span>Simulasi Interaktif</span>
            </TabsTrigger>
            <TabsTrigger value="performance">
              <GaugeIcon className="size-4" />
              <span>Skor Performa & Beban Uji</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="flex flex-col gap-4">
            <div className="bg-surface relative aspect-16/9 w-full overflow-hidden rounded-xl border border-border">
              {project.previewVideoUrl ? (
                <video
                  src={project.previewVideoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={project.coverImageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-cover"
                />
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {project.architectureLayers.map((layer) => (
                <div
                  key={layer.layer}
                  className="bg-surface rounded-xl border border-border p-3.5"
                >
                  <p className="text-muted-foreground font-mono text-[11px]">
                    {layer.layer}
                  </p>
                  <p className="font-display mt-1 text-sm font-semibold">
                    {layer.choice}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                    {layer.rationale}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="flex flex-col gap-4">
            <div className="bg-surface rounded-2xl border border-border p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-sm font-semibold">
                    Simulator Beban Konkurensi (Benchmark Lab)
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Uji stabilitas waktu respons pada berbagai jumlah pengguna aktif bersamaan.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {[100, 500, 2500].map((count) => (
                    <Button
                      key={count}
                      size="sm"
                      variant={simulatedUsers === count ? "default" : "outline"}
                      onClick={() => setSimulatedUsers(count)}
                    >
                      {count} User
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="bg-background rounded-xl border border-border p-3">
                  <span className="text-muted-foreground font-mono text-xs">
                    Skor Lighthouse
                  </span>
                  <p className="text-status-emerald font-mono mt-1 text-2xl font-bold">
                    {project.metrics.lighthouseScore}
                  </p>
                </div>
                <div className="bg-background rounded-xl border border-border p-3">
                  <span className="text-muted-foreground font-mono text-xs">
                    Waktu Muat (LCP)
                  </span>
                  <p className="font-mono mt-1 text-2xl font-bold">
                    {computedLatency}ms
                  </p>
                </div>
                <div className="bg-background rounded-xl border border-border p-3">
                  <span className="text-muted-foreground font-mono text-xs">
                    Layout Shift (CLS)
                  </span>
                  <p className="font-mono mt-1 text-2xl font-bold">0.00</p>
                </div>
                <div className="bg-background rounded-xl border border-border p-3">
                  <span className="text-muted-foreground font-mono text-xs">
                    Aksesibilitas
                  </span>
                  <p className="text-status-emerald font-mono mt-1 text-2xl font-bold">
                    100
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-2xl border border-border p-4">
              <p className="font-display text-sm font-semibold">
                Modul yang Diserahterimakan pada Blueprint Ini:
              </p>
              <ul className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {project.deliverables.map((item) => (
                  <li
                    key={item}
                    className="text-muted-foreground flex items-start gap-2 text-xs leading-relaxed"
                  >
                    <CheckCircle2Icon className="text-status-emerald mt-0.5 size-4 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex flex-wrap items-center gap-1.5">
          {project.techStack.map((tech) => (
            <Badge key={tech.name} variant="secondary">
              <TechStackIcon name={tech.name} />
              <span>{tech.name}</span>
            </Badge>
          ))}
        </div>

        <DialogFooter className="gap-2">
          {project.externalLiveUrl && (
            <Button asChild variant="secondary">
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
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setActiveDemoProject(null);
              openContactModal({
                subject: `Pesan Web Serupa: ${project.title}`,
                contextLabel: project.clientTypeLabel,
                defaultMessage: `Halo Surya, setelah melihat simulasi proyek "${project.title}", saya ingin berkonsultasi untuk membuat website serupa.\n\nDetail kebutuhan saya:\n- Nama brand / bisnis: \n- Modul yang ingin disertakan: `,
              });
            }}
          >
            <CopyPlusIcon data-icon="inline-start" />
            Pesan Web Serupa
          </Button>
          <Button asChild onClick={() => setActiveDemoProject(null)}>
            <Link href={`/projects/${project.slug}`}>
              Detail Proyek
              <ArrowUpRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
