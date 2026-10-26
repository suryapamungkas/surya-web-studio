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
  subtitle = "11+ Karya Website Live • 16 Keahlian Teknis • 17 Sertifikasi Resmi",
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

    // Initialize standalone Lenis only if AppProviders hasn't already attached one
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/parallax/layer-1.webp"
              loading="eager"
              width="1600"
              height="1000"
              data-parallax-layer="1"
              alt="Langit malam dan puncak pegunungan"
              className="parallax__layer-img"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/parallax/layer-2.webp"
              loading="eager"
              width="1600"
              height="1000"
              data-parallax-layer="2"
              alt=""
              aria-hidden="true"
              className="parallax__layer-img"
            />
            <div data-parallax-layer="3" className="parallax__layer-title">
              <h2 className="parallax__title">{title}</h2>
              {subtitle && (
                <p className="mt-2 max-w-xl text-center font-mono text-xs sm:text-sm font-medium tracking-wide text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                  {subtitle}
                </p>
              )}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/parallax/layer-4.webp"
              loading="eager"
              width="1600"
              height="1000"
              data-parallax-layer="4"
              alt=""
              aria-hidden="true"
              className="parallax__layer-img"
            />
          </div>
          <div className="parallax__fade" />
        </div>

        {/* Accessible quick-jump control at bottom of parallax stage */}
        {ctaHref && (
          <div className="pointer-events-auto absolute bottom-6 left-1/2 z-30 -translate-x-1/2">
            <a
              href={ctaHref}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-black/65 px-5 py-2.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>{ctaLabel}</span>
              <ArrowDownIcon className="size-3.5" aria-hidden="true" />
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
