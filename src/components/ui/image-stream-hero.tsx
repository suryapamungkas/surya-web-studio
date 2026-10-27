"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Geometry of the 3D perspective corridor. Every length is in `cqw`
 * (percentage of the container's inline size) for resolution independence.
 */
export type CorridorPath = {
  /** Strength of the projection. Lower is a wider-angle, more dramatic rush. @default 30 */
  perspective?: number;
  /** Card width in world units (cqw). @default 18 */
  cardWidth?: number;
  /** Card height in world units (cqw). @default 25 */
  cardHeight?: number;
  /** Corner radius applied to each card (cqw). @default 0.4 */
  cardRadius?: number;
  /** On-screen card height at the waist, where a card is born. @default 2.6 */
  birthHeight?: number;
  /** On-screen card height as a card leaves the frame. @default 46 */
  exitHeight?: number;
  /** Lateral offset at birth. Negative starts across the axis so the center stays covered. @default -11 */
  railBirth?: number;
  /** Lateral offset once the rails have finished opening. @default 44 */
  railExit?: number;
  /** How front-loaded the opening is. >1 opens early then holds. @default 3.3 */
  fan?: number;
  /** Y-rotation at birth, in degrees. @default 6 */
  turnBirth?: number;
  /** Y-rotation at exit, in degrees. @default 28 */
  turnExit?: number;
  /** Keyframe stops used to trace the curve. @default 24 */
  stops?: number;
};

const PATH: Required<CorridorPath> = {
  perspective: 30,
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0.4,
  birthHeight: 2.6,
  exitHeight: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
  stops: 24,
};

// Sample the curve in apparent size so consecutive cards keep a constant size ratio.
function keyframes(dir: 1 | -1, name: string, p: Required<CorridorPath>) {
  const steps: string[] = [];
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops;
    const scale =
      (p.birthHeight / p.cardHeight) *
      Math.pow(p.exitHeight / p.birthHeight, u);
    const z = p.perspective * (1 - 1 / scale);
    const rail =
      p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
    steps.push(
      `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(
        2
      )}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)}`
    );
  }
  return `@keyframes ${name}{${steps.join("")}}`;
}

export type StreamImage = {
  src: string;
  /** Optional alt text; the decorative corridor is aria-hidden by default. */
  alt?: string;
};

function createGradientSvgDataUri(
  id: string,
  stops: [string, string, string],
  accentHex: string
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 500" width="360" height="500"><defs><linearGradient id="g-${id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${stops[0]}"/><stop offset="52%" stop-color="${stops[1]}"/><stop offset="100%" stop-color="${stops[2]}"/></linearGradient><radialGradient id="r-${id}" cx="68%" cy="32%" r="65%"><stop offset="0%" stop-color="${accentHex}" stop-opacity="0.55"/><stop offset="100%" stop-color="${stops[2]}" stop-opacity="0"/></radialGradient></defs><rect width="360" height="500" fill="url(#g-${id})"/><rect width="360" height="500" fill="url(#r-${id})"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const DEFAULT_STREAM_IMAGES: StreamImage[] = [
  {
    src: "/images/projects/atelier-kama-3d.jpg",
    alt: "Atelier Kama 3D architectural configurator showcase",
  },
  {
    src: createGradientSvgDataUri(
      "emerald",
      ["#052e24", "#065f46", "#090d16"],
      "#34d399"
    ),
    alt: "Emerald studio atmosphere wash",
  },
  {
    src: "/images/projects/velox-kinematics.jpg",
    alt: "Velox interactive 3D CAD viewer showcase",
  },
  {
    src: createGradientSvgDataUri(
      "indigo",
      ["#1e1b4b", "#312e81", "#09090b"],
      "#818cf8"
    ),
    alt: "Indigo depth gradient wash",
  },
  {
    src: "/images/projects/karsa-ai-vault.jpg",
    alt: "Karsa AI contract intelligence and knowledge graph",
  },
  {
    src: createGradientSvgDataUri(
      "amber",
      ["#271709", "#78350f", "#0c0a09"],
      "#f59e0b"
    ),
    alt: "Warm amber studio aura",
  },
  {
    src: "/images/projects/arkapay-mobile.jpg",
    alt: "ArkaPay QRIS and merchant companion mobile interface",
  },
  {
    src: createGradientSvgDataUri(
      "moon",
      ["#0f172a", "#1e293b", "#09090b"],
      "#38bdf8"
    ),
    alt: "Moon slate tonal gradient",
  },
  {
    src: "/images/projects/nusantara-erp.jpg",
    alt: "Velocity supply chain and maritime fleet ERP dashboard",
  },
  {
    src: "/images/projects/roemah-kopi-d2c.jpg",
    alt: "Roemah Kopi D2C subscription and flavor profile showcase",
  },
  {
    src: "/images/projects/sora-creator-hub.jpg",
    alt: "Sora visual director portfolio and booking platform",
  },
  {
    src: "/images/projects/medikasatu-triage.jpg",
    alt: "Clinical Flow scheduling and AI triage system",
  },
];

export type ImageStreamHeroProps = {
  /**
   * Images cycled onto the rails. Both rails run the same sequence so the
   * corridor reads as one mirrored stream.
   */
  images?: StreamImage[];
  /**
   * Cards on each rail at once.
   * @default 9
   */
  cards?: number;
  /**
   * Seconds for one card to travel the whole corridor.
   * @default 18
   */
  speed?: number;
  /**
   * Vertical placement of the corridor axis, as a percentage of height.
   * @default 55
   */
  axis?: number;
  /** Override any part of the corridor geometry. Merged over the defaults. */
  path?: CorridorPath;
  /** Content rendered above and below the corridor axis. */
  children?: React.ReactNode;
  className?: string;
};

export function ImageStreamHero({
  images = DEFAULT_STREAM_IMAGES,
  cards = 9,
  speed = 18,
  axis = 55,
  path,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & ImageStreamHeroProps) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const right = `ish-r-${id}`;
  const left = `ish-l-${id}`;
  const card = `ish-c-${id}`;

  const p = React.useMemo(() => ({ ...PATH, ...path }), [path]);

  const css = React.useMemo(
    () =>
      `${keyframes(1, right, p)}${keyframes(-1, left, p)}` +
      // Pause rather than disable so negative delays keep the corridor populated on reduced motion.
      `@media(prefers-reduced-motion:reduce){.${card}{animation-play-state:paused}}`,
    [right, left, card, p]
  );

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
      style={{ containerType: "inline-size", ...props.style }}
    >
      <style>{css}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          perspective: `${p.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {[right, left].map((name) =>
            Array.from({ length: cards }, (_, i) => {
              const img = images[i % Math.max(images.length, 1)];
              return (
                <div
                  key={`${name}-${i}`}
                  className={cn(
                    card,
                    "absolute overflow-hidden border border-white/10 shadow-md"
                  )}
                  style={{
                    left: "50%",
                    top: `${axis}%`,
                    width: `${p.cardWidth}cqw`,
                    height: `${p.cardHeight}cqw`,
                    marginLeft: `${-p.cardWidth / 2}cqw`,
                    marginTop: `${-p.cardHeight / 2}cqw`,
                    borderRadius: `${p.cardRadius}cqw`,
                    animation: `${name} ${speed}s linear infinite`,
                    animationDelay: `${-(i * speed) / cards}s`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  {img ? (
                    <img
                      src={img.src}
                      alt={img.alt ?? ""}
                      loading={i < 4 ? "eager" : "lazy"}
                      decoding="async"
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Subtle top and bottom scrims so foreground typography maintains WCAG AA contrast */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background via-background/75 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent"
      />

      {children}
    </div>
  );
}

export default ImageStreamHero;
