"use client";

import Image from "next/image";
import { ArrowUpRightIcon, FileTextIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SURYA_PROFILE } from "@/lib/portfolio-data";
import { useAgencyStore } from "@/lib/agency-store";

export function InFeedCtaBanner() {
  const openContactModal = useAgencyStore((state) => state.openContactModal);

  return (
    <section
      aria-labelledby="in-feed-cta-heading"
      className="w-full"
    >
      <div className="bg-surface-elevated border-border flex flex-col items-start justify-between gap-6 rounded-3xl border px-6 py-6 sm:px-8 md:flex-row md:items-center">
        <div className="flex items-center gap-4 max-w-2xl">
          <div className="relative size-14 sm:size-16 shrink-0 overflow-hidden rounded-2xl border border-border bg-background">
            <Image
              src={SURYA_PROFILE.avatarUrl}
              alt={SURYA_PROFILE.fullName}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground font-mono text-xs">
              Dikerjakan Langsung Tanpa Perantara Agensi
            </span>
            <h2
              id="in-feed-cta-heading"
              className="font-display text-lg sm:text-xl font-bold tracking-tight"
            >
              Ingin punya website seperti contoh di atas?
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              Ceritakan ide bisnis Anda dan dapatkan rancangan fitur website yang siap dikembangkan.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <Button
            type="button"
            className="flex-1 md:flex-initial"
            onClick={() =>
              openContactModal({
                subject: "Konsultasi Pembuatan Website",
                contextLabel: "Katalog Karya",
                defaultMessage:
                  "Halo Surya, saya melihat contoh karya di website Anda dan ingin berkonsultasi untuk membuat website bisnis saya.\n\nDetail singkat kebutuhan saya:\n- Jenis bisnis / produk: \n- Contoh proyek yang saya sukai: ",
              })
            }
          >
            Konsultasi Pembuatan Website
            <ArrowUpRightIcon data-icon="inline-end" />
          </Button>
          <Button
            variant="outline"
            asChild
            className="flex-1 md:flex-initial"
          >
            <a
              href={SURYA_PROFILE.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileTextIcon data-icon="inline-start" />
              Lihat CV Surya
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
