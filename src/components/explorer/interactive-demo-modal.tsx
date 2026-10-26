"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  CheckCircle2Icon,
  CopyPlusIcon,
  ExternalLinkIcon,
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
import { TechStackIcon } from "@/components/ui/tech-stack-icon";
import { ProjectBlueprintVisual } from "@/components/explorer/project-blueprint-visual";
import { useAgencyStore } from "@/lib/agency-store";

export function InteractiveDemoModal() {
  const activeDemoProject = useAgencyStore((state) => state.activeDemoProject);
  const setActiveDemoProject = useAgencyStore(
    (state) => state.setActiveDemoProject
  );
  const openContactModal = useAgencyStore((state) => state.openContactModal);

  if (!activeDemoProject) {
    return null;
  }

  const project = activeDemoProject;

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
            <Badge variant="verified">{project.timelineWeeks}</Badge>
            <Badge variant="secondary">{project.clientTypeLabel}</Badge>
          </div>
          <DialogTitle className="mt-1">{project.title}</DialogTitle>
          <DialogDescription>{project.shortDescription}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <ProjectBlueprintVisual project={project} variant="detail" />

          <div className="bg-surface rounded-2xl border border-border p-4">
            <p className="font-display text-sm font-semibold">
              Modul yang Diserahterimakan pada Proyek Ini:
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
        </div>

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
