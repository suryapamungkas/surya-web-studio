import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/layout/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { InteractiveDemoModal } from "@/components/explorer/interactive-demo-modal";
import { ContactEmailModal } from "@/components/contact/contact-email-modal";

export const metadata: Metadata = {
  metadataBase: new URL("https://surya-web-studio.vercel.app"),
  title: {
    default: "Surya Pamungkas | Jasa Pembuatan Website, Toko Online & Aplikasi AI",
    template: "%s | Surya Pamungkas",
  },
  description:
    "Jasa pembuatan website personal, landing page, toko online UMKM, hingga aplikasi web perusahaan berbasis Next.js, React, dan AI oleh Nur Hidayat Surya Pamungkas.",
  keywords: [
    "Jasa Pembuatan Website",
    "Personal Website Builder",
    "Surya Pamungkas",
    "Jasa Web UMKM",
    "Full Stack Developer Indonesia",
    "AI Engineer",
  ],
  openGraph: {
    title: "Surya Pamungkas | Jasa Pembuatan Website, Toko Online & Aplikasi AI",
    description:
      "Lihat 11+ karya website live, cek paket pembuatan web mulai Rp 1,5 Jt, dan konsultasi langsung dengan Surya Pamungkas.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-foreground selection:text-background">
        <AppProviders>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm font-medium focus:text-background"
          >
            Lewati ke konten utama
          </a>
          <Navbar />
          <div id="main-content" className="flex-1">
            {children}
          </div>
          <Footer />
          <InteractiveDemoModal />
          <ContactEmailModal />
        </AppProviders>
      </body>
    </html>
  );
}
