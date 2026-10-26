"use client";

import React, { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  customSize?: boolean; // When true, ignores size prop and uses width/height or className
}

const glowColorMap: Record<
  NonNullable<GlowCardProps["glowColor"]>,
  { base: number; spread: number }
> = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

const sizeMap: Record<NonNullable<GlowCardProps["size"]>, string> = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

const beforeAfterStyles = `
  [data-glow]::before,
  [data-glow]::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: calc(var(--glow-border-size) * -1);
    border: var(--glow-border-size) solid transparent;
    border-radius: calc(var(--glow-radius) * 1px);
    background-size: calc(100% + (2 * var(--glow-border-size))) calc(100% + (2 * var(--glow-border-size)));
    background-repeat: no-repeat;
    background-position: 50% 50%;
    mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: intersect;
    z-index: 20;
  }
  
  [data-glow]::before {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
      calc(var(--x, -999) * 1px)
      calc(var(--y, -999) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
    );
    filter: brightness(2);
  }
  
  [data-glow]::after {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
      calc(var(--x, -999) * 1px)
      calc(var(--y, -999) * 1px),
      hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
    );
  }
  
  [data-glow] > [data-glow] {
    position: absolute;
    inset: 0;
    will-change: filter;
    opacity: var(--outer, 1);
    border-radius: calc(var(--glow-radius) * 1px);
    border-width: calc(var(--glow-border-size) * 20);
    filter: blur(calc(var(--glow-border-size) * 10));
    background: none;
    pointer-events: none;
    border: none;
    z-index: 10;
  }
  
  [data-glow] > [data-glow]::before {
    inset: -10px;
    border-width: 10px;
  }
`;

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = "",
  glowColor = "blue",
  size = "md",
  width,
  height,
  customSize = false,
  style,
  ...rest
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;

      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const localX = x - rect.left;
        const localY = y - rect.top;

        cardRef.current.style.setProperty("--x", localX.toFixed(2));
        cardRef.current.style.setProperty(
          "--xp",
          (x / window.innerWidth).toFixed(2)
        );
        cardRef.current.style.setProperty("--y", localY.toFixed(2));
        cardRef.current.style.setProperty(
          "--yp",
          (y / window.innerHeight).toFixed(2)
        );
      }
    };

    document.addEventListener("pointermove", syncPointer, { passive: true });
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getSizeClasses = () => {
    if (customSize) {
      return "";
    }
    return sizeMap[size];
  };

  const getInlineStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties & Record<string, string | number> = {
      "--base": base,
      "--spread": spread,
      "--glow-radius": "16",
      "--glow-border": "2",
      "--glow-backdrop": "var(--card, hsl(0 0% 60% / 0.12))",
      "--glow-backup-border": "var(--border, hsl(0 0% 60% / 0.18))",
      "--size": "240",
      "--outer": "1",
      "--glow-border-size": "calc(var(--glow-border, 2) * 1px)",
      "--spotlight-size": "calc(var(--size, 150) * 1px)",
      "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, -999) * 1px)
        calc(var(--y, -999) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.12)), transparent
      )`,
      backgroundColor: "var(--glow-backdrop, transparent)",
      backgroundSize:
        "calc(100% + (2 * var(--glow-border-size))) calc(100% + (2 * var(--glow-border-size)))",
      backgroundPosition: "50% 50%",
      border: "var(--glow-border-size) solid var(--glow-backup-border)",
      position: "relative",
      touchAction: customSize ? "pan-y" : "none",
      ...style,
    };

    if (width !== undefined) {
      baseStyles.width = typeof width === "number" ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === "number" ? `${height}px` : height;
    }

    return baseStyles;
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={cn(
          getSizeClasses(),
          !customSize && "aspect-[3/4] grid grid-rows-[1fr_auto] p-4 gap-4",
          "rounded-2xl relative shadow-xs dark:shadow-[0_1rem_2rem_-1rem_black] backdrop-blur-[5px]",
          className
        )}
        {...rest}
      >
        <div ref={innerRef} data-glow aria-hidden="true" />
        {children}
      </div>
    </>
  );
};

export { GlowCard };
