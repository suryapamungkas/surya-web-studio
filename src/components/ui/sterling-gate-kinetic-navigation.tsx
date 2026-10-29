"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { cn } from "@/lib/utils";

// Register GSAP Plugins safely on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export interface KineticNavItem {
  label: string;
  href?: string;
  meta?: string;
  shapeIndex: "1" | "2" | "3" | "4" | "5";
  fade?: boolean;
  onClick?: () => void;
}

export interface SterlingGateNavigationProps {
  logoSlot?: React.ReactNode;
  rightActionsSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
  items?: KineticNavItem[];
  toggleHintText?: string;
  openLabel?: string;
  closeLabel?: string;
  headerClassName?: string;
}

const DEFAULT_NAV_ITEMS: KineticNavItem[] = [
  {
    label: "Karya Website",
    href: "/#showcase",
    meta: "01 / 11+ Proyek Live",
    shapeIndex: "1",
  },
  {
    label: "Standar Kualitas",
    href: "/#arsitektur-kerja",
    meta: "02 / 3 Pilar & Garansi",
    shapeIndex: "2",
  },
  {
    label: "Paket & Harga",
    href: "/#paket-harga",
    meta: "03 / Mulai Rp 1,5 Jt",
    shapeIndex: "3",
  },
  {
    label: "Ulasan Klien 3D",
    href: "/#testimoni",
    meta: "04 / Testimoni Nyata",
    shapeIndex: "4",
    fade: true,
  },
  {
    label: "Tentang Surya",
    href: "/#tentang-surya",
    meta: "05 / Profil Developer & CV",
    shapeIndex: "5",
  },
];

type CleanupElement = Element & {
  _cleanup?: () => void;
};

export function SterlingGateKineticNavigation({
  logoSlot,
  rightActionsSlot,
  footerSlot,
  items = DEFAULT_NAV_ITEMS,
  toggleHintText = "Navigasi",
  openLabel = "Menu",
  closeLabel = "Tutup",
  headerClassName,
}: SterlingGateNavigationProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Sticky header scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when fullscreen drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Initial Setup & Shape Hover Effects
  useEffect(() => {
    if (!containerRef.current) return;

    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        gsap.defaults({ ease: "main", duration: 0.7 });
      }
    } catch {
      gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      const menuItems = containerRef.current!.querySelectorAll(
        ".menu-list-item[data-shape]"
      );
      const shapesContainer = containerRef.current!.querySelector(
        ".ambient-background-shapes"
      );

      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer
          ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`)
          : null;

        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
          if (shapesContainer) {
            shapesContainer
              .querySelectorAll(".bg-shape")
              .forEach((s) => s.classList.remove("active"));
          }
          shape.classList.add("active");

          gsap.fromTo(
            shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "back.out(1.7)",
              overwrite: "auto",
            }
          );
        };

        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => shape.classList.remove("active"),
            overwrite: "auto",
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);

        (item as CleanupElement)._cleanup = () => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (containerRef.current) {
        const menuEls = containerRef.current.querySelectorAll(
          ".menu-list-item[data-shape]"
        );
        menuEls.forEach((item) => {
          const cleanupEl = item as CleanupElement;
          if (cleanupEl._cleanup) {
            cleanupEl._cleanup();
          }
        });
      }
    };
  }, [items]);

  // Menu Open/Close Animation Effect
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const navWrap = containerRef.current!.querySelector(
        ".nav-overlay-wrapper"
      );
      const menu = containerRef.current!.querySelector(".menu-content");
      const overlay = containerRef.current!.querySelector(".overlay");
      const bgPanels =
        containerRef.current!.querySelectorAll(".backdrop-layer");
      const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
      const fadeTargets =
        containerRef.current!.querySelectorAll("[data-menu-fade]");

      const menuButton =
        containerRef.current!.querySelector(".nav-close-btn");
      const menuButtonTexts = menuButton
        ? menuButton.querySelectorAll("p")
        : null;
      const menuButtonIcon = menuButton
        ? menuButton.querySelector(".menu-button-icon")
        : null;

      if (!hasMountedRef.current) {
        hasMountedRef.current = true;
        if (!isMenuOpen) {
          if (navWrap) navWrap.setAttribute("data-nav", "closed");
          gsap.set(navWrap, { display: "none" });
          if (menuButtonTexts) gsap.set(menuButtonTexts, { yPercent: 0 });
          if (menuButtonIcon) gsap.set(menuButtonIcon, { rotate: 0 });
          return;
        }
      }

      const tl = gsap.timeline();

      if (isMenuOpen) {
        // OPEN
        if (navWrap) navWrap.setAttribute("data-nav", "open");

        tl.set(navWrap, { display: "block" })
          .set(menu, { xPercent: 0 }, "<")
          .fromTo(
            menuButtonTexts,
            { yPercent: 0 },
            { yPercent: -100, stagger: 0.2 }
          )
          .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<")
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
          .fromTo(
            bgPanels,
            { xPercent: 101 },
            { xPercent: 0, stagger: 0.12, duration: 0.575 },
            "<"
          )
          .fromTo(
            menuLinks,
            { yPercent: 140, rotate: 10 },
            { yPercent: 0, rotate: 0, stagger: 0.05 },
            "<+=0.35"
          );

        if (fadeTargets.length) {
          tl.fromTo(
            fadeTargets,
            { autoAlpha: 0, yPercent: 50 },
            {
              autoAlpha: 1,
              yPercent: 0,
              stagger: 0.04,
              clearProps: "all",
            },
            "<+=0.2"
          );
        }
      } else {
        // CLOSE
        if (navWrap) navWrap.setAttribute("data-nav", "closed");

        tl.to(overlay, { autoAlpha: 0 })
          .to(menu, { xPercent: 120 }, "<")
          .to(menuButtonTexts, { yPercent: 0 }, "<")
          .to(menuButtonIcon, { rotate: 0 }, "<")
          .set(navWrap, { display: "none" });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  // keydown Escape handling
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div ref={containerRef} className="site-header-wrapper">
      <header
        className={cn(
          "header",
          isScrolled && "is-scrolled",
          headerClassName
        )}
      >
        <div className="container is--full">
          <nav className="nav-row" aria-label="Navigasi Utama">
            {logoSlot ? (
              <div className="nav-logo-row" onClick={closeMenu}>
                {logoSlot}
              </div>
            ) : (
              <Link
                href="/"
                aria-label="Beranda Surya Pamungkas"
                onClick={closeMenu}
                className="nav-logo-row font-display font-bold text-base tracking-tight"
              >
                Surya Studio
              </Link>
            )}

            <div className="nav-row__right">
              {rightActionsSlot}

              {/* Clean Menu Indicator */}
              {toggleHintText && (
                <div
                  className="nav-toggle-label cursor-pointer"
                  onClick={toggleMenu}
                >
                  <span className="toggle-text">{toggleHintText}</span>
                </div>
              )}

              {/* Kinetic Menu Button */}
              <button
                type="button"
                aria-expanded={isMenuOpen}
                aria-label={
                  isMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
                }
                className="nav-close-btn"
                onClick={toggleMenu}
              >
                <div className="menu-button-text">
                  <p className="p-large">{openLabel}</p>
                  <p className="p-large">{closeLabel}</p>
                </div>
                <div className="icon-wrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="menu-button-icon"
                    aria-hidden="true"
                  >
                    <path
                      d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z"
                      fill="currentColor"
                    />
                    <path
                      d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z"
                      fill="currentColor"
                    />
                    <path
                      d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
                      fill="currentColor"
                    />
                    <path
                      d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
                      fill="currentColor"
                    />
                    <path
                      d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
                      fill="currentColor"
                    />
                    <path
                      d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <section
        className="fullscreen-menu-container"
        aria-label="Menu Navigasi Layar Penuh"
      >
        <div data-nav="closed" className="nav-overlay-wrapper">
          <div className="overlay" onClick={closeMenu} />
          <nav className="menu-content" aria-label="Daftar Menu Kinetic">
            <div className="menu-bg">
              <div className="backdrop-layer first" />
              <div className="backdrop-layer second" />
              <div className="backdrop-layer" />

              {/* Abstract shapes container */}
              <div className="ambient-background-shapes" aria-hidden="true">
                {/* Shape 1: Floating circles */}
                <svg
                  className="bg-shape bg-shape-1"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  <circle
                    className="shape-element"
                    cx="80"
                    cy="120"
                    r="40"
                    fill="rgba(16,185,129,0.18)"
                  />
                  <circle
                    className="shape-element"
                    cx="300"
                    cy="80"
                    r="60"
                    fill="rgba(99,102,241,0.16)"
                  />
                  <circle
                    className="shape-element"
                    cx="200"
                    cy="300"
                    r="80"
                    fill="rgba(16,185,129,0.14)"
                  />
                  <circle
                    className="shape-element"
                    cx="350"
                    cy="280"
                    r="30"
                    fill="rgba(99,102,241,0.18)"
                  />
                </svg>

                {/* Shape 2: Wave pattern */}
                <svg
                  className="bg-shape bg-shape-2"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  <path
                    className="shape-element"
                    d="M0 200 Q100 100, 200 200 T 400 200"
                    stroke="rgba(16,185,129,0.22)"
                    strokeWidth="60"
                    fill="none"
                  />
                  <path
                    className="shape-element"
                    d="M0 280 Q100 180, 200 280 T 400 280"
                    stroke="rgba(99,102,241,0.18)"
                    strokeWidth="40"
                    fill="none"
                  />
                </svg>

                {/* Shape 3: Grid dots */}
                <svg
                  className="bg-shape bg-shape-3"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  <circle
                    className="shape-element"
                    cx="50"
                    cy="50"
                    r="8"
                    fill="rgba(16,185,129,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="150"
                    cy="50"
                    r="8"
                    fill="rgba(99,102,241,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="250"
                    cy="50"
                    r="8"
                    fill="rgba(16,185,129,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="350"
                    cy="50"
                    r="8"
                    fill="rgba(99,102,241,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="100"
                    cy="150"
                    r="12"
                    fill="rgba(99,102,241,0.25)"
                  />
                  <circle
                    className="shape-element"
                    cx="200"
                    cy="150"
                    r="12"
                    fill="rgba(16,185,129,0.25)"
                  />
                  <circle
                    className="shape-element"
                    cx="300"
                    cy="150"
                    r="12"
                    fill="rgba(99,102,241,0.25)"
                  />
                  <circle
                    className="shape-element"
                    cx="50"
                    cy="250"
                    r="10"
                    fill="rgba(16,185,129,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="150"
                    cy="250"
                    r="10"
                    fill="rgba(99,102,241,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="250"
                    cy="250"
                    r="10"
                    fill="rgba(16,185,129,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="350"
                    cy="250"
                    r="10"
                    fill="rgba(99,102,241,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="100"
                    cy="350"
                    r="6"
                    fill="rgba(16,185,129,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="200"
                    cy="350"
                    r="6"
                    fill="rgba(99,102,241,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="300"
                    cy="350"
                    r="6"
                    fill="rgba(16,185,129,0.3)"
                  />
                </svg>

                {/* Shape 4: Organic blobs */}
                <svg
                  className="bg-shape bg-shape-4"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  <path
                    className="shape-element"
                    d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100"
                    fill="rgba(16,185,129,0.15)"
                  />
                  <path
                    className="shape-element"
                    d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200"
                    fill="rgba(99,102,241,0.14)"
                  />
                </svg>

                {/* Shape 5: Diagonal lines */}
                <svg
                  className="bg-shape bg-shape-5"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  <line
                    className="shape-element"
                    x1="0"
                    y1="100"
                    x2="300"
                    y2="400"
                    stroke="rgba(16,185,129,0.18)"
                    strokeWidth="30"
                  />
                  <line
                    className="shape-element"
                    x1="100"
                    y1="0"
                    x2="400"
                    y2="300"
                    stroke="rgba(99,102,241,0.15)"
                    strokeWidth="25"
                  />
                  <line
                    className="shape-element"
                    x1="200"
                    y1="0"
                    x2="400"
                    y2="200"
                    stroke="rgba(16,185,129,0.12)"
                    strokeWidth="20"
                  />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper">
              <div className="flex flex-col gap-1.5" data-menu-fade>
                <span className="font-mono text-xs uppercase tracking-widest text-status-emerald">
                  Navigasi Utama
                </span>
                <p className="text-xs text-muted-foreground">
                  Pilih halaman atau bagian yang ingin Anda jelajahi.
                </p>
              </div>

              <ul className="menu-list">
                {items.map((item) => (
                  <li
                    key={item.label}
                    className="menu-list-item"
                    data-shape={item.shapeIndex}
                  >
                    {item.onClick ? (
                      <button
                        type="button"
                        onClick={() => {
                          closeMenu();
                          item.onClick?.();
                        }}
                        className="nav-link"
                      >
                        <p
                          className="nav-link-text"
                          {...(item.fade ? { "data-menu-fade": true } : {})}
                        >
                          {item.label}
                        </p>
                        {item.meta && (
                          <span className="nav-link-meta">{item.meta}</span>
                        )}
                        <div className="nav-link-hover-bg" />
                      </button>
                    ) : (
                      <Link
                        href={item.href ?? "/"}
                        onClick={closeMenu}
                        className="nav-link"
                      >
                        <p
                          className="nav-link-text"
                          {...(item.fade ? { "data-menu-fade": true } : {})}
                        >
                          {item.label}
                        </p>
                        {item.meta && (
                          <span className="nav-link-meta">{item.meta}</span>
                        )}
                        <div className="nav-link-hover-bg" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {footerSlot && (
                <div
                  data-menu-fade
                  className="border-t border-border pt-5 mt-auto"
                >
                  {footerSlot}
                </div>
              )}
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}

export { SterlingGateKineticNavigation as Component };
export default SterlingGateKineticNavigation;
