"use client";

// A technical showcase index built as a 3D scroll drum.
// The active item sits flat and centered at the front, while adjacent items
// rotate vertically along a perspective curve. Scrolling moves between items.
import * as React from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  AwardIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  TechStackIcon,
  getSkillVisualTheme,
} from "@/components/ui/tech-stack-icon";

export interface WorksWheelItem {
  /** Item name. Shown beside the front card and in the index. */
  title: string;
  /** Cover art. Any src an <img> takes. Optional when variant is 'skill' or 'certificate'. */
  image?: string;
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string;
  /** Card visual mode: 'skill' (TechStackIcon card), 'certificate' (Credential card), or 'image'. */
  variant?: "skill" | "certificate" | "image";
  /** Optional category or issuer eyebrow shown on the card and side readout. */
  eyebrow?: string;
  /** Optional concise description or credential details. */
  subtitle?: string;
  /** Optional secondary metadata (e.g. date or credential ID). */
  meta?: string;
  /** Optional issue date for certificates (e.g. 'Aug 2026'). */
  issuedDate?: string;
  /** Optional raw credential ID for certificates. */
  credentialId?: string;
  /** Optional tech icon key for skill/certificate cards. */
  iconKey?: string;
}

export interface WorksWheelProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> {
  items: WorksWheelItem[];
  /** Sits in the middle of the drum. @default undefined */
  label?: string;
  /** Label on the card's hover affordance. Omit to drop it. @default undefined */
  action?: string;
}

// Geometry constants measured relative to stage and card height.
const CARD_H = 0.38;
const CARD_MAX_W = 0.34;
const CARD_RATIO = 1.45;
const STEP = 40;
const DRUM = 2.22;
const LENS = 2.7;
const BOW = 1.82;
const TITLE = 0.11;
const INDEX = 0.036;
const CULL = 1.6;

const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
const SETTLE = 140;
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

type Stage = { w: number; h: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

export function WorksWheel({
  items,
  label = "Works '26",
  action = "View",
  className,
  ...props
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);

  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const isCompact = w > 0 && w < 640;
    const maxWFactor = isCompact ? 0.62 : CARD_MAX_W;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * maxWFactor);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    return {
      cardW,
      cardH,
      drumR,
      bow: cardH * (isCompact ? 1.1 : BOW),
      depth: cardH * LENS,
      title: clamp(cardH * TITLE, 15, 26),
      index: clamp(cardH * INDEX, 10.5, 12.5),
    };
  }, [stage]);

  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const pos = turn.current;

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = `translateX(${bowAt(drumDeg, bow)}px) rotateX(${drumDeg}deg) translateZ(${drumR}px)`;
          card.style.opacity = Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = "scale(1)";
      }

      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last);
    },
    [last]
  );

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      const next = target.current + event.deltaY / WHEEL_UNITS;
      const canScrollWheel =
        (event.deltaY > 0 && target.current < last) ||
        (event.deltaY < 0 && target.current > 0);
      if (canScrollWheel) {
        event.preventDefault();
        event.stopPropagation();
      }
      to(next);
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(
        () => to(Math.round(target.current)),
        SETTLE
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to, last]);

  const drag = React.useRef<number | null>(null);
  const dragMoved = React.useRef(false);
  const settling = React.useRef(0);

  const activeItem = items[active];
  const activeTheme = getSkillVisualTheme(
    activeItem?.iconKey || activeItem?.title || ""
  );

  return (
    <section
      aria-label={label}
      className={cn(
        "bg-background text-foreground relative h-[33rem] sm:h-[36rem] w-full overflow-hidden rounded-2xl border border-border select-none",
        className
      )}
      {...props}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="focus-visible:outline-foreground absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          const targetEl = event.target as HTMLElement;
          if (targetEl.closest("a, button")) return;
          drag.current = event.clientY;
          dragMoved.current = false;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return;
          const dy = drag.current - event.clientY;
          if (Math.abs(dy) > 3) dragMoved.current = true;
          to(target.current + dy / DRAG_UNITS);
          drag.current = event.clientY;
        }}
        onPointerUp={() => {
          drag.current = null;
          to(Math.round(target.current));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") to(Math.round(target.current) + 1);
          else if (event.key === "ArrowUp") to(Math.round(target.current) - 1);
          else if (event.key === "Home") to(0);
          else if (event.key === "End") to(last);
          else return;
          event.preventDefault();
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const isExternal = Boolean(
              item.href && /^https?:\/\//i.test(item.href)
            );
            const Tag = (item.href ? "a" : "div") as "a";
            const theme = getSkillVisualTheme(item.iconKey || item.title);

            return (
              <React.Fragment key={`${item.title}-${i}`}>
                <Tag
                  id={`works-wheel-${i}`}
                  role="option"
                  aria-selected={i === active}
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (dragMoved.current) {
                      e.preventDefault();
                      return;
                    }
                    if (!item.href) {
                      e.preventDefault();
                      if (i !== active) {
                        to(i);
                      }
                      return;
                    }
                    // When clicking an off-center card, rotate it to the front
                    if (i !== active) {
                      e.preventDefault();
                      to(i);
                    }
                  }}
                  ref={(node: HTMLElement | null) => {
                    cardRefs.current[i] = node;
                  }}
                  className="group absolute [backface-visibility:hidden]"
                  style={{
                    width: metrics.cardW,
                    height: metrics.cardH,
                    marginLeft: -metrics.cardW / 2,
                    marginTop: -metrics.cardH / 2,
                  }}
                >
                  {item.variant === "skill" ? (
                    /* SKILL ICON CARD (Matches suryapamungkas.vercel.app TechStackIcon Card) */
                    <span
                      className={cn(
                        "relative flex size-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/12 bg-zinc-950/95 p-4 text-center shadow-[0_20px_45px_-18px_rgba(0,0,0,0.75)] transition-all duration-300",
                        theme.borderAccent
                      )}
                    >
                      {/* Subtle ambient glow matching the skill signature color */}
                      <span
                        className={cn(
                          "pointer-events-none absolute -inset-4 bg-gradient-to-br opacity-35 transition-opacity duration-300 group-hover:opacity-65 blur-xl",
                          theme.glowColor
                        )}
                      />

                      {/* Top Category Eyebrow */}
                      {item.eyebrow ? (
                        <span
                          className={cn(
                            "pointer-events-none absolute top-3 left-3 rounded-md border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider",
                            theme.badgeBg,
                            theme.badgeText
                          )}
                        >
                          {item.eyebrow}
                        </span>
                      ) : null}

                      {/* Center Large Tech Stack Icon */}
                      <span className="relative flex size-16 sm:size-20 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 shadow-inner transition-transform duration-300 group-hover:scale-110">
                        <TechStackIcon
                          name={item.iconKey || item.title}
                          className="size-10 sm:size-12 drop-shadow-md"
                        />
                      </span>

                      {/* Skill Title Below Icon */}
                      <span className="relative z-10 font-display text-xs sm:text-base font-semibold tracking-wide text-zinc-200 transition-colors duration-300 group-hover:text-white line-clamp-1 px-2">
                        {item.title}
                      </span>

                      {/* Hover Action Pill */}
                      {action && item.href ? (
                        <span className="bg-white/95 text-zinc-950 pointer-events-none absolute top-3 right-3 flex translate-y-1 items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold opacity-0 shadow-sm transition group-hover:translate-y-0 group-hover:opacity-100">
                          <span>{action}</span>
                          <ExternalLinkIcon className="size-2.5" />
                        </span>
                      ) : null}
                    </span>
                  ) : item.variant === "certificate" ? (
                    /* CERTIFICATE CREDENTIAL CARD */
                    <span className="relative flex size-full flex-col justify-between overflow-hidden rounded-2xl border border-white/12 bg-zinc-950/95 p-4 sm:p-5 text-left shadow-[0_20px_45px_-18px_rgba(0,0,0,0.75)] transition-all duration-300 group-hover:border-white/25">
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-zinc-500/10 via-transparent to-zinc-800/20 opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* Top Section: Circular Award Badge + Certificate Name + Issuer */}
                      <span className="relative z-10 flex items-start gap-3.5">
                        <span className="flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/10 transition-colors group-hover:bg-white/15">
                          <AwardIcon
                            className="size-5 sm:size-6 text-zinc-200"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="font-display text-xs sm:text-base font-semibold text-zinc-100 leading-snug line-clamp-2">
                            {item.title}
                          </span>
                          {item.eyebrow ? (
                            <span className="mt-1 text-[11px] sm:text-xs text-zinc-400 truncate">
                              {item.eyebrow}
                            </span>
                          ) : null}
                        </span>
                        {item.iconKey && item.iconKey !== "award" ? (
                          <span className="hidden sm:flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                            <TechStackIcon
                              name={item.iconKey}
                              className="size-4"
                            />
                          </span>
                        ) : null}
                      </span>

                      {/* Bottom Section: Issued Date + Credential ID + ExternalLink Circle Button */}
                      <span className="relative z-10 mt-auto flex items-center justify-between border-t border-white/10 pt-3">
                        <span className="flex min-w-0 flex-col text-[10px] sm:text-xs text-zinc-400 font-mono">
                          {item.issuedDate ? (
                            <span>Issued: {item.issuedDate}</span>
                          ) : null}
                          {item.credentialId ? (
                            <span className="truncate max-w-[145px] sm:max-w-[190px] text-zinc-500">
                              ID: {item.credentialId}
                            </span>
                          ) : null}
                        </span>

                        <span className="ml-2 flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-zinc-300 transition-colors group-hover:bg-white/20 group-hover:text-white">
                          <ExternalLinkIcon
                            className="size-3.5 sm:size-4"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                    </span>
                  ) : (
                    /* DEFAULT IMAGE CARD */
                    <span className="bg-muted shadow-foreground/15 relative block size-full overflow-hidden rounded-xl border border-white/15 shadow-[0_18px_40px_-18px_var(--tw-shadow-color)]">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          draggable={false}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : null}
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />
                      <span className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-col gap-1">
                        <span className="font-display text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 drop-shadow-xs">
                          {item.title}
                        </span>
                      </span>
                    </span>
                  )}
                </Tag>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Front-card details readout on the left */}
      <div className="pointer-events-none absolute top-4 left-4 right-4 sm:top-1/2 sm:right-auto sm:left-[4.5%] sm:-translate-y-1/2 sm:max-w-[27%] flex flex-col gap-2 tracking-tight opacity-100 transition-opacity">
        <div className="flex items-center gap-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-surface border border-border shadow-2xs">
            {activeItem?.variant === "certificate" ? (
              <AwardIcon className="size-4 text-status-emerald" />
            ) : (
              <TechStackIcon
                name={activeItem?.iconKey || activeItem?.title || ""}
                className="size-4"
              />
            )}
          </span>
          {activeItem?.eyebrow ? (
            <span
              className={cn(
                "font-mono text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md border w-fit",
                activeTheme.badgeBg,
                activeTheme.badgeText
              )}
            >
              {activeItem.eyebrow}
            </span>
          ) : null}
        </div>

        <div
          className="font-display font-bold text-foreground leading-tight line-clamp-2"
          style={{ fontSize: metrics.title }}
        >
          {activeItem?.title}
        </div>

        {activeItem?.subtitle ? (
          <p className="hidden sm:block text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {activeItem.subtitle}
          </p>
        ) : null}

        {activeItem?.meta ? (
          <span className="hidden sm:inline-block font-mono text-[11px] text-foreground/80">
            {activeItem.meta}
          </span>
        ) : null}
      </div>

      {/* Right-hand interactive index list with icons */}
      <ol
        className="text-muted-foreground hidden sm:flex sm:flex-col sm:items-end sm:gap-0.5 absolute top-[5%] right-[2.5%] max-w-[26%] text-right leading-[1.55] z-10"
        style={{ fontSize: metrics.index }}
      >
        {items.map((item, i) => (
          <li key={`${item.title}-idx-${i}`} className="max-w-full">
            <button
              type="button"
              onClick={() => to(i)}
              className={cn(
                "focus-visible:outline-foreground inline-flex items-center justify-end gap-1.5 cursor-pointer transition-colors outline-none focus-visible:outline-1 max-w-full",
                i === active
                  ? "text-status-emerald font-bold"
                  : "hover:text-foreground"
              )}
            >
              <span className="truncate">{item.title}</span>
              {item.variant === "certificate" ? (
                <AwardIcon className="size-3 shrink-0 opacity-75" />
              ) : (
                <TechStackIcon
                  name={item.iconKey || item.title}
                  className="size-3 shrink-0"
                />
              )}
            </button>
          </li>
        ))}
      </ol>

      {/* Bottom Interactive Control Pill for Touch, Mouse & Keyboard Users */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-1 rounded-full bg-surface/90 backdrop-blur-md border border-border p-1 shadow-xs">
          <button
            type="button"
            onClick={() => to(Math.max(0, active - 1))}
            disabled={active === 0}
            aria-label="Item sebelumnya"
            className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-background disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <ArrowUpIcon className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => to(Math.min(last, active + 1))}
            disabled={active === last}
            aria-label="Item berikutnya"
            className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-background disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <ArrowDownIcon className="size-3.5" />
          </button>
        </div>

        <span className="font-mono text-[11px] text-muted-foreground bg-surface/90 backdrop-blur-md border border-border rounded-full px-3 py-1 tabular-nums">
          {`${active + 1} / ${count}`}
        </span>
      </div>
    </section>
  );
}

export default WorksWheel;
