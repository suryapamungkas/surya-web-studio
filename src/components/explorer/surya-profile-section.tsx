"use client";

import * as React from "react";
import Image from "next/image";
import {
  AwardIcon,
  Code2Icon,
  FileTextIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  SparklesIcon,
} from "lucide-react";
import {
  SURYA_PROFILE,
  SURYA_SKILLS,
  SURYA_CERTIFICATES,
} from "@/lib/portfolio-data";
import { useAgencyStore } from "@/lib/agency-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

export function SuryaProfileSection() {
  const openContactModal = useAgencyStore((state) => state.openContactModal);

  const skillWheelItems = React.useMemo<WorksWheelItem[]>(
    () =>
      SURYA_SKILLS.map((skill) => ({
        title: skill.name,
        variant: "skill",
        eyebrow: skill.category,
        subtitle: skill.summary,
        meta: "Keahlian Siap Produksi",
        iconKey: skill.iconKey,
      })),
    []
  );

  const certWheelItems = React.useMemo<WorksWheelItem[]>(
    () =>
      SURYA_CERTIFICATES.map((cert) => ({
        title: cert.name,
        href: cert.credentialUrl,
        variant: "certificate",
        eyebrow: cert.issuer,
        subtitle: `Issued: ${cert.date}`,
        meta: `ID: ${cert.credentialId}`,
        issuedDate: cert.date,
        credentialId: cert.credentialId,
        iconKey: cert.iconKey,
      })),
    []
  );

  return (
    <section
      id="tentang-surya"
      aria-labelledby="surya-profile-heading"
      className="scroll-mt-24"
    >
      <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 flex flex-col gap-8">
        {/* Top Row: Compact Builder Identity Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Portrait + Name + Short Consumer Pitch */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative size-24 sm:size-28 shrink-0 overflow-hidden rounded-2xl border-2 border-border bg-background shadow-xs">
              <Image
                src={SURYA_PROFILE.avatarUrl}
                alt={`Foto profil ${SURYA_PROFILE.fullName}`}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="verified">Personal Website Builder</Badge>
                <span className="font-mono text-xs text-muted-foreground">
                  {SURYA_PROFILE.education}
                </span>
              </div>

              <h2
                id="surya-profile-heading"
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
              >
                {SURYA_PROFILE.fullName}
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                {SURYA_PROFILE.tagline}
              </p>

              {/* Social & Contact Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={SURYA_PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background hover:bg-secondary text-foreground border border-border inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors"
                >
                  <GithubIcon className="size-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={SURYA_PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background hover:bg-secondary text-foreground border border-border inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors"
                >
                  <LinkedinIcon className="size-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={SURYA_PROFILE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background hover:bg-secondary text-foreground border border-border inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors"
                >
                  <InstagramIcon className="size-3.5" />
                  <span>@lionelehe</span>
                </a>
                <button
                  type="button"
                  onClick={() =>
                    openContactModal({
                      subject: "Konsultasi Pembuatan Website",
                      contextLabel: "Kontak Profil Surya",
                    })
                  }
                  className="bg-background hover:bg-secondary text-foreground border border-border inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer"
                >
                  <MailIcon className="size-3.5" />
                  <span>Email</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: 3 Compact Stats + Direct Action Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-2.5">
              {SURYA_PROFILE.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-background rounded-2xl border border-border p-3.5 flex flex-col gap-0.5 text-center"
                >
                  <span className="font-mono text-xl sm:text-2xl font-bold text-foreground tabular-nums">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {stat.label}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {stat.note}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Button
                type="button"
                className="flex-1"
                onClick={() =>
                  openContactModal({
                    subject: "Konsultasi Proyek Pembuatan Website",
                    contextLabel: "Konsultasi Langsung",
                    defaultMessage:
                      "Halo Surya, saya ingin berkonsultasi mengenai rencana pembuatan website saya.\n\nGambaran singkat kebutuhan saya:\n- Jenis website: \n- Target waktu rilis: ",
                  })
                }
              >
                <SparklesIcon data-icon="inline-start" />
                Konsultasi Proyek
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <a
                  href={SURYA_PROFILE.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileTextIcon data-icon="inline-start" />
                  Unduh CV
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Row: 3D Works Wheel for Skills & Verified Certifications */}
        <Tabs
          defaultValue="skills"
          className="w-full border-t border-border pt-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <TabsList>
              <TabsTrigger value="skills" className="gap-1.5">
                <Code2Icon className="size-3.5" />
                <span>Keahlian Teknis ({SURYA_SKILLS.length})</span>
              </TabsTrigger>
              <TabsTrigger value="certificates" className="gap-1.5">
                <AwardIcon className="size-3.5" />
                <span>Sertifikasi Resmi ({SURYA_CERTIFICATES.length})</span>
              </TabsTrigger>
            </TabsList>

            <span className="text-xs text-muted-foreground font-mono">
              &ldquo;{SURYA_PROFILE.quote}&rdquo;
            </span>
          </div>

          <TabsContent value="skills" className="mt-0">
            <WorksWheel
              items={skillWheelItems}
              label="Keahlian Teknis"
              action=""
            />
          </TabsContent>

          <TabsContent value="certificates" className="mt-0">
            <WorksWheel
              items={certWheelItems}
              label="Sertifikasi Resmi"
              action="Cek Sertifikat"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
