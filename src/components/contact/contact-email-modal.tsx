"use client";

import * as React from "react";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  MailIcon,
  RotateCcwIcon,
  SendIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { SURYA_PROFILE } from "@/lib/portfolio-data";
import { useAgencyStore } from "@/lib/agency-store";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export function ContactEmailModal() {
  const isContactModalOpen = useAgencyStore(
    (state) => state.isContactModalOpen
  );
  const contactDraft = useAgencyStore((state) => state.contactDraft);
  const setContactModalOpen = useAgencyStore(
    (state) => state.setContactModalOpen
  );

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [whatsapp, setWhatsapp] = React.useState("");
  const [subject, setSubject] = React.useState(contactDraft.subject);
  const [message, setMessage] = React.useState(
    contactDraft.defaultMessage ?? ""
  );
  const [status, setStatus] = React.useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  React.useEffect(() => {
    if (isContactModalOpen) {
      setSubject(contactDraft.subject);
      setMessage(contactDraft.defaultMessage ?? "");
      setStatus("idle");
      setErrorMessage(null);
    }
  }, [
    isContactModalOpen,
    contactDraft.subject,
    contactDraft.defaultMessage,
  ]);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(SURYA_PROFILE.email);
      setCopiedEmail(true);
      toast.success(`Alamat email ${SURYA_PROFILE.email} disalin.`);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      toast.error("Gagal menyalin email secara otomatis.");
    }
  }

  const gmailComposeUrl = React.useMemo(() => {
    const compiledBody = [
      name.trim() ? `Nama: ${name.trim()}` : null,
      email.trim() ? `Email: ${email.trim()}` : null,
      whatsapp.trim() ? `WhatsApp: ${whatsapp.trim()}` : null,
      contactDraft.contextLabel ? `Kategori: ${contactDraft.contextLabel}` : null,
      "",
      message.trim() || "Halo Surya, saya ingin berkonsultasi mengenai pembuatan website.",
    ]
      .filter((line) => line !== null)
      .join("\n");

    const params = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: SURYA_PROFILE.email,
      su: subject.trim() || "Konsultasi Pembuatan Website",
      body: compiledBody,
    });
    return `https://mail.google.com/mail/?${params.toString()}`;
  }, [name, email, whatsapp, subject, message, contactDraft.contextLabel]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      setStatus("error");
      setErrorMessage(
        "Mohon lengkapi nama, alamat email, topik layanan, dan detail pesan Anda."
      );
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("name", trimmedName);
      formData.append("email", trimmedEmail);
      if (whatsapp.trim()) {
        formData.append("whatsapp", whatsapp.trim());
      }
      formData.append("topik_layanan", trimmedSubject);
      if (contactDraft.contextLabel) {
        formData.append("konteks_pilihan", contactDraft.contextLabel);
      }
      formData.append("message", trimmedMessage);
      formData.append(
        "_subject",
        `[Surya Web Studio] ${trimmedSubject} (${trimmedName})`
      );
      formData.append("_captcha", "false");
      formData.append("_template", "table");

      const response = await fetch(
        `https://formsubmit.co/${SURYA_PROFILE.email}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok || response.type === "opaque") {
        setStatus("success");
        toast.success("Pesan berhasil dikirim ke email Surya Pamungkas.");
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Gagal mengirim pesan otomatis karena kendala jaringan. Silakan klik Coba Kirim Ulang atau gunakan tombol Buka di Gmail Web di bawah."
      );
      toast.error("Gagal mengirim pesan. Silakan coba lagi atau gunakan Gmail Web.");
    }
  }

  function handleResetForm() {
    setStatus("idle");
    setErrorMessage(null);
    setMessage("");
  }

  const isSubmitting = status === "submitting";

  return (
    <Dialog open={isContactModalOpen} onOpenChange={setContactModalOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center justify-between gap-2 pr-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="verified">Respon Langsung oleh Surya</Badge>
              {contactDraft.contextLabel && (
                <Badge variant="secondary" className="font-mono text-[11px]">
                  {contactDraft.contextLabel}
                </Badge>
              )}
            </div>
          </div>

          <DialogTitle className="mt-1">
            Kirim Pesan & Konsultasi Proyek
          </DialogTitle>
          <DialogDescription>
            Pesan Anda akan dikirim langsung ke{" "}
            <span className="font-mono font-medium text-foreground">
              {SURYA_PROFILE.email}
            </span>{" "}
            tanpa perlu membuka aplikasi email bawaan perangkat.
          </DialogDescription>
        </DialogHeader>

        {/* Recipient Info Bar + Copy & Gmail Fallback */}
        <div className="bg-surface flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border px-3.5 py-2.5 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <MailIcon className="size-4 shrink-0 text-status-emerald" />
            <span className="font-mono text-foreground truncate">
              {SURYA_PROFILE.email}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyEmail}
              className="min-h-9 text-xs"
            >
              {copiedEmail ? (
                <>
                  <CheckIcon className="size-3.5 text-status-emerald" />
                  <span>Tersalin</span>
                </>
              ) : (
                <>
                  <CopyIcon className="size-3.5" />
                  <span>Salin Email</span>
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              asChild
              className="min-h-9 text-xs text-muted-foreground hover:text-foreground"
            >
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Buka di Gmail Web</span>
                <ExternalLinkIcon className="size-3.5" />
              </a>
            </Button>
          </div>
        </div>

        {status === "success" ? (
          <div className="bg-surface rounded-2xl border border-border p-6 flex flex-col items-center text-center gap-4">
            <div className="bg-status-emerald-subtle text-status-emerald flex size-12 items-center justify-center rounded-full border border-status-emerald/30">
              <CheckCircle2Icon className="size-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-display text-lg font-bold text-foreground">
                Pesan Berhasil Terkirim
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm max-w-md leading-relaxed">
                Terima kasih, <strong className="text-foreground">{name}</strong>.
                Detail kebutuhan Anda untuk{" "}
                <strong className="text-foreground">{subject}</strong> sudah
                diteruskan ke{" "}
                <span className="font-mono text-foreground">
                  {SURYA_PROFILE.email}
                </span>
                . Surya akan membalas ke{" "}
                <span className="font-mono text-foreground">{email}</span>
                {whatsapp.trim() ? ` atau WhatsApp ${whatsapp.trim()}` : ""}.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 w-full pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleResetForm}
                className="min-h-11"
              >
                <RotateCcwIcon data-icon="inline-start" />
                Kirim Pesan Lain
              </Button>
              <Button
                type="button"
                onClick={() => setContactModalOpen(false)}
                className="min-h-11"
              >
                Selesai & Tutup
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contact-name">Nama Lengkap *</Label>
                <Input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  disabled={isSubmitting}
                  placeholder="Nama Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contact-email">Alamat Email *</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  disabled={isSubmitting}
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contact-whatsapp">
                  Nomor WhatsApp{" "}
                  <span className="text-muted-foreground font-normal">
                    (Opsional)
                  </span>
                </Label>
                <Input
                  id="contact-whatsapp"
                  name="whatsapp"
                  type="tel"
                  disabled={isSubmitting}
                  placeholder="0812xxxx (untuk respon cepat)"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="h-10"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contact-subject">Topik / Paket Layanan *</Label>
                <Input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  disabled={isSubmitting}
                  placeholder="Konsultasi Pembuatan Website"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="h-10"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-message">
                Detail Kebutuhan Website *
              </Label>
              <Textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                disabled={isSubmitting}
                placeholder="Ceritakan jenis website, fitur utama, atau referensi proyek yang Anda inginkan..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-28 resize-y"
              />
            </div>

            {status === "error" && errorMessage && (
              <div
                role="alert"
                className="bg-destructive/10 border-destructive/30 text-destructive flex flex-col gap-2 rounded-xl border p-3.5 text-xs leading-relaxed"
              >
                <div className="flex items-start gap-2">
                  <AlertCircleIcon className="mt-0.5 size-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 pl-6">
                  <a
                    href={gmailComposeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline underline-offset-4 font-semibold inline-flex items-center gap-1"
                  >
                    <span>Kirim via Gmail Web sebagai alternatif</span>
                    <ExternalLinkIcon className="size-3" />
                  </a>
                </div>
              </div>
            )}

            <DialogFooter className="gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => setContactModalOpen(false)}
                className="min-h-11"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-h-11"
              >
                {isSubmitting ? (
                  <>
                    <Spinner className="mr-1.5 size-4" />
                    <span>Mengirim Pesan...</span>
                  </>
                ) : (
                  <>
                    <SendIcon data-icon="inline-start" />
                    <span>Kirim Pesan Sekarang</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
