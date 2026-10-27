"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowDownIcon } from "lucide-react";

export interface ParallaxComponentProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  showOsmoEmblem?: boolean;
  children?: React.ReactNode;
}

export function ParallaxComponent({
  title = "Surya Studio",
  subtitle = "10+ Karya Website Live • 16 Keahlian Teknis • 17 Sertifikasi Resmi",
  ctaLabel = "Lihat Karya Website",
  ctaHref = "#showcase",
  showOsmoEmblem = false,
  children,
}: ParallaxComponentProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const container = parallaxRef.current;
    if (!container) return;

    const triggerElement = container.querySelector<HTMLElement>(
      "[data-parallax-layers]"
    );

    const ctx = gsap.context(() => {
      if (triggerElement) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: "0% 0%",
            end: "100% 0%",
            scrub: 0,
          },
        });

        const layers = [
          { layer: "1", yPercent: 70 },
          { layer: "2", yPercent: 55 },
          { layer: "3", yPercent: 40 },
          { layer: "4", yPercent: 10 },
        ];

        layers.forEach((layerObj, idx) => {
          tl.to(
            triggerElement.querySelectorAll(
              `[data-parallax-layer="${layerObj.layer}"]`
            ),
            {
              yPercent: layerObj.yPercent,
              ease: "none",
            },
            idx === 0 ? undefined : "<"
          );
        });
      }
    }, container);

    let localLenis: Lenis | null = null;
    let updateLocalLenis: ((time: number) => void) | null = null;

    if (!document.documentElement.classList.contains("lenis")) {
      localLenis = new Lenis();
      localLenis.on("scroll", ScrollTrigger.update);
      updateLocalLenis = (time: number) => {
        localLenis?.raf(time * 1000);
      };
      gsap.ticker.add(updateLocalLenis);
      gsap.ticker.lagSmoothing(0);
    } else {
      ScrollTrigger.refresh();
    }

    return () => {
      ctx.revert();
      if (updateLocalLenis) {
        gsap.ticker.remove(updateLocalLenis);
      }
      if (localLenis) {
        localLenis.destroy();
      }
    };
  }, []);

  return (
    <div className="parallax" ref={parallaxRef}>
      <section
        className="parallax__header"
        aria-label="Visual pembuka berlapis Surya Studio"
      >
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow" />
          <div data-parallax-layers className="parallax__layers">
            {/* Layer 1 (Deep Background, yPercent: 70): Obsidian & Emerald-Indigo Studio Atmosphere + Architectural Grid */}
            <div
              data-parallax-layer="1"
              aria-hidden="true"
              className="parallax__layer-img flex items-center justify-center overflow-hidden"
            >
              <svg
                viewBox="0 0 1600 1000"
                preserveAspectRatio="xMidYMid slice"
                className="h-full w-full"
              >
                <defs>
                  <linearGradient id="studio-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#07090d" />
                    <stop offset="45%" stopColor="#0b1519" />
                    <stop offset="80%" stopColor="#0f2027" />
                    <stop offset="100%" stopColor="#090c10" />
                  </linearGradient>
                  <radialGradient
                    id="emerald-core-glow"
                    cx="50%"
                    cy="34%"
                    r="42%"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
                    <stop offset="45%" stopColor="#4338ca" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="#07090d" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient
                    id="indigo-wing-glow"
                    cx="78%"
                    cy="28%"
                    r="35%"
                  >
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#07090d" stopOpacity="0" />
                  </radialGradient>
                  <pattern
                    id="studio-arch-grid"
                    width="80"
                    height="80"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 80 0 L 0 0 0 80"
                      fill="none"
                      stroke="rgba(52, 211, 153, 0.07)"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>

                {/* Base Nocturnal Sky */}
                <rect width="1600" height="1000" fill="url(#studio-sky)" />
                <rect
                  width="1600"
                  height="1000"
                  fill="url(#emerald-core-glow)"
                />
                <rect
                  width="1600"
                  height="1000"
                  fill="url(#indigo-wing-glow)"
                />

                {/* Subtle Architectural Grid & Concentric Orbital Rings */}
                <rect
                  width="1600"
                  height="1000"
                  fill="url(#studio-arch-grid)"
                />
                <circle
                  cx="800"
                  cy="360"
                  r="220"
                  fill="none"
                  stroke="rgba(52, 211, 153, 0.14)"
                  strokeWidth="1"
                  strokeDasharray="6 8"
                />
                <circle
                  cx="800"
                  cy="360"
                  r="360"
                  fill="none"
                  stroke="rgba(129, 140, 248, 0.11)"
                  strokeWidth="1"
                />
                <circle
                  cx="800"
                  cy="360"
                  r="520"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1"
                />

                {/* Luminous Studio Core Beacon */}
                <circle
                  cx="800"
                  cy="260"
                  r="56"
                  fill="rgba(16, 185, 129, 0.14)"
                />
                <circle
                  cx="800"
                  cy="260"
                  r="22"
                  fill="rgba(167, 243, 208, 0.45)"
                />
                <circle cx="800" cy="260" r="7" fill="#ecfdf5" />
              </svg>
            </div>

            {/* Layer 2 (Midground Architecture & Floating UI Frames, yPercent: 55) */}
            <div
              data-parallax-layer="2"
              aria-hidden="true"
              className="parallax__layer-img flex items-center justify-center overflow-hidden"
            >
              <svg
                viewBox="0 0 1600 1000"
                preserveAspectRatio="xMidYMid slice"
                className="h-full w-full"
              >
                <defs>
                  <linearGradient
                    id="mid-arch-facet"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#132a31" stopOpacity="0.88" />
                    <stop offset="100%" stopColor="#091015" stopOpacity="0.98" />
                  </linearGradient>
                  <linearGradient
                    id="mid-arch-right"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#192338" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#091015" stopOpacity="0.98" />
                  </linearGradient>
                </defs>

                {/* Left Architectural Monolith & Geometric Ridges */}
                <polygon
                  points="0,760 260,470 560,670 800,540 1040,670 1340,460 1600,740 1600,1000 0,1000"
                  fill="url(#mid-arch-facet)"
                  stroke="rgba(52, 211, 153, 0.22)"
                  strokeWidth="1.5"
                />
                <polygon
                  points="260,470 420,680 560,670"
                  fill="rgba(16, 185, 129, 0.08)"
                />
                <polygon
                  points="1340,460 1160,690 1040,670"
                  fill="url(#mid-arch-right)"
                />

                {/* Left Floating Web Architecture Wireframe Panel */}
                <g transform="translate(110, 250)">
                  <rect
                    width="280"
                    height="168"
                    rx="16"
                    fill="rgba(14, 22, 28, 0.78)"
                    stroke="rgba(52, 211, 153, 0.32)"
                    strokeWidth="1.5"
                  />
                  <circle cx="26" cy="24" r="4" fill="#34d399" />
                  <circle cx="42" cy="24" r="4" fill="rgba(255,255,255,0.2)" />
                  <circle cx="58" cy="24" r="4" fill="rgba(255,255,255,0.2)" />
                  <rect
                    x="22"
                    y="48"
                    width="140"
                    height="10"
                    rx="5"
                    fill="rgba(52, 211, 153, 0.45)"
                  />
                  <rect
                    x="22"
                    y="68"
                    width="210"
                    height="8"
                    rx="4"
                    fill="rgba(255, 255, 255, 0.14)"
                  />
                  <rect
                    x="22"
                    y="92"
                    width="110"
                    height="52"
                    rx="8"
                    fill="rgba(255, 255, 255, 0.05)"
                    stroke="rgba(255, 255, 255, 0.1)"
                  />
                  <rect
                    x="144"
                    y="92"
                    width="114"
                    height="52"
                    rx="8"
                    fill="rgba(16, 185, 129, 0.09)"
                    stroke="rgba(52, 211, 153, 0.25)"
                  />
                </g>

                {/* Right Floating AI & Cloud Telemetry Wireframe Panel */}
                <g transform="translate(1210, 240)">
                  <rect
                    width="280"
                    height="168"
                    rx="16"
                    fill="rgba(15, 20, 32, 0.78)"
                    stroke="rgba(129, 140, 248, 0.35)"
                    strokeWidth="1.5"
                  />
                  <circle cx="26" cy="24" r="4" fill="#818cf8" />
                  <circle cx="42" cy="24" r="4" fill="rgba(255,255,255,0.2)" />
                  <circle cx="58" cy="24" r="4" fill="rgba(255,255,255,0.2)" />
                  <rect
                    x="22"
                    y="48"
                    width="160"
                    height="10"
                    rx="5"
                    fill="rgba(129, 140, 248, 0.5)"
                  />
                  <polyline
                    points="26,134 78,108 130,120 188,82 252,66"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="188" cy="82" r="4.5" fill="#34d399" />
                  <circle cx="252" cy="66" r="4.5" fill="#34d399" />
                </g>
              </svg>
            </div>

            {/* Layer 3 (Center Title & Unobstructed Subtitle Stage, yPercent: 40) */}
            <div data-parallax-layer="3" className="parallax__layer-title">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-black/55 px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-emerald-300 backdrop-blur-md">
                Full-Stack Web & AI Engineering Studio
              </span>
              <h2 className="parallax__title">{title}</h2>
              {subtitle && (
                <p className="mt-3 max-w-xl rounded-full border border-white/15 bg-black/60 px-5 py-2 text-center font-mono text-xs sm:text-sm font-medium tracking-wide text-neutral-100 backdrop-blur-md">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Layer 4 (Foreground Architectural Horizon Silhouette, yPercent: 10, never blocks center text) */}
            <div
              data-parallax-layer="4"
              aria-hidden="true"
              className="parallax__layer-img pointer-events-none flex items-end justify-center overflow-hidden"
            >
              <svg
                viewBox="0 0 1600 1000"
                preserveAspectRatio="xMidYMid slice"
                className="h-full w-full"
              >
                <defs>
                  <linearGradient
                    id="fg-horizon-ridge"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#0c1318" />
                    <stop offset="100%" stopColor="#07090c" />
                  </linearGradient>
                </defs>

                {/* Low-Profile Foreground Frame Ridge (Leaves Center Stage 100% Clear) */}
                <path
                  d="M 0,810 L 220,735 L 480,825 L 800,855 L 1120,825 L 1380,735 L 1600,810 L 1600,1000 L 0,1000 Z"
                  fill="url(#fg-horizon-ridge)"
                  stroke="rgba(52, 211, 153, 0.28)"
                  strokeWidth="1.5"
                />
                <path
                  d="M 0,865 L 340,810 L 800,885 L 1260,810 L 1600,865 L 1600,1000 L 0,1000 Z"
                  fill="#07090c"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>
          <div className="parallax__fade" />
        </div>

        {/* Accessible quick-jump control at bottom of parallax stage */}
        {ctaHref && (
          <div className="pointer-events-auto absolute bottom-6 left-1/2 z-30 -translate-x-1/2">
            <a
              href={ctaHref}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-400/35 bg-black/75 px-5 py-2.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-transform hover:-translate-y-0.5 hover:border-emerald-400/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>{ctaLabel}</span>
              <ArrowDownIcon
                className="size-3.5 text-emerald-400"
                aria-hidden="true"
              />
            </a>
          </div>
        )}
      </section>

      {(showOsmoEmblem || children) && (
        <section className="parallax__content">
          {showOsmoEmblem && (
            <div className="flex flex-col items-center pt-6 pb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 160 160"
                fill="none"
                aria-hidden="true"
                className="osmo-icon-svg"
              >
                <path
                  d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          )}
          {children}
        </section>
      )}
    </div>
  );
}

export default function ParallaxDemo() {
  return (
    <>
      <ParallaxComponent title="Parallax" />
      <div className="osmo-credits">
        <p className="osmo-credits__p">
          Resource by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.osmo.supply/"
            className="osmo-credits__p-a"
          >
            Osmo
          </a>
        </p>
      </div>
    </>
  );
}
