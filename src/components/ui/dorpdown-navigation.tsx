"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SubMenuItem {
  label: string;
  description: string;
  icon: React.ElementType;
  href?: string;
  onClick?: () => void;
  badge?: string;
}

export interface SubMenuColumn {
  title: string;
  items: SubMenuItem[];
}

export interface NavItem {
  id: number;
  label: string;
  subMenus?: SubMenuColumn[];
  link?: string;
  onClick?: () => void;
}

export interface DropdownNavigationProps {
  navItems: NavItem[];
  className?: string;
  isStandalone?: boolean;
}

export function DropdownNavigation({
  navItems,
  className,
  isStandalone = false,
}: DropdownNavigationProps) {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [isHover, setIsHover] = React.useState<number | null>(null);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const clearHoverTimeout = React.useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = React.useCallback(
    (item: NavItem) => {
      clearHoverTimeout();
      setIsHover(item.id);
      if (item.subMenus && item.subMenus.length > 0) {
        setOpenMenu(item.label);
      } else {
        setOpenMenu(null);
      }
    },
    [clearHoverTimeout]
  );

  const handleMouseLeave = React.useCallback(() => {
    clearHoverTimeout();
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
      setIsHover(null);
    }, 150);
  }, [clearHoverTimeout]);

  React.useEffect(() => {
    return () => {
      clearHoverTimeout();
    };
  }, [clearHoverTimeout]);

  // Handle escape key to close menu
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setIsHover(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const content = (
    <nav
      className={cn("relative flex items-center justify-center", className)}
      aria-label="Navigasi Menu Dropdown"
      onMouseLeave={handleMouseLeave}
    >
      <ul className="relative flex items-center space-x-0.5 rounded-full border border-border/80 bg-surface/75 p-1 backdrop-blur-md">
        {navItems.map((navItem) => {
          const isOpen = openMenu === navItem.label;
          const isHovered = isHover === navItem.id;
          const hasDropdown = Boolean(
            navItem.subMenus && navItem.subMenus.length > 0
          );

          return (
            <li
              key={navItem.label}
              className="relative"
              onMouseEnter={() => handleMouseEnter(navItem)}
            >
              {navItem.link ? (
                <Link
                  href={navItem.link}
                  onClick={navItem.onClick}
                  className="relative z-10 flex min-h-9 items-center justify-center gap-1 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground cursor-pointer"
                >
                  <span>{navItem.label}</span>
                  {(isHovered || isOpen) && (
                    <motion.div
                      layoutId="hover-bg"
                      className="absolute inset-0 size-full rounded-full bg-primary/10 -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 32,
                        mass: 0.8,
                      }}
                    />
                  )}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={navItem.onClick}
                  aria-expanded={isOpen}
                  aria-haspopup={hasDropdown ? "true" : undefined}
                  className="relative z-10 flex min-h-9 items-center justify-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-status-emerald"
                >
                  <span>{navItem.label}</span>
                  {hasDropdown && (
                    <ChevronDownIcon
                      className={cn(
                        "size-3.5 transition-transform duration-300 ease-out",
                        isOpen ? "rotate-180 text-foreground" : "text-muted-foreground/80"
                      )}
                    />
                  )}
                  {(isHovered || isOpen) && (
                    <motion.div
                      layoutId="hover-bg"
                      className="absolute inset-0 size-full rounded-full bg-primary/10 -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 32,
                        mass: 0.8,
                      }}
                    />
                  )}
                </button>
              )}

              <AnimatePresence>
                {isOpen && navItem.subMenus && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-2.5 z-50 pointer-events-auto"
                    onMouseEnter={clearHoverTimeout}
                    onMouseLeave={handleMouseLeave}
                  >
                    <motion.div
                      layoutId="dropdown-nav-card"
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                        mass: 0.8,
                      }}
                      className="w-max rounded-2xl border border-border/80 bg-card/95 p-5 shadow-2xl backdrop-blur-xl"
                    >
                      <div className="flex space-x-7 shrink-0 overflow-hidden">
                        {navItem.subMenus.map((sub) => (
                          <motion.div
                            layout
                            transition={{
                              type: "spring",
                              stiffness: 350,
                              damping: 30,
                            }}
                            className="min-w-[210px] max-w-[260px] flex flex-col gap-3.5"
                            key={sub.title}
                          >
                            <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/70 pb-2">
                              {sub.title}
                            </h3>
                            <ul className="space-y-3.5">
                              {sub.items.map((item) => {
                                const Icon = item.icon;
                                const innerContent = (
                                  <>
                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-foreground transition-all duration-200 group-hover:scale-105 group-hover:border-status-emerald/50 group-hover:bg-status-emerald/10 group-hover:text-status-emerald">
                                      <Icon className="size-4 flex-none" />
                                    </div>
                                    <div className="min-w-0 flex-1 leading-snug">
                                      <div className="flex items-center gap-1.5">
                                        <p className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-status-emerald transition-colors duration-200 truncate">
                                          {item.label}
                                        </p>
                                        {item.badge && (
                                          <span className="rounded-full bg-status-emerald-subtle px-1.5 py-0.2 font-mono text-[9px] font-bold text-status-emerald">
                                            {item.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[11px] text-muted-foreground line-clamp-1 transition-colors duration-200 group-hover:text-foreground/85">
                                        {item.description}
                                      </p>
                                    </div>
                                  </>
                                );

                                return (
                                  <li key={item.label}>
                                    {item.href ? (
                                      <Link
                                        href={item.href}
                                        onClick={() => {
                                          setOpenMenu(null);
                                          setIsHover(null);
                                          item.onClick?.();
                                        }}
                                        className="group flex items-start space-x-2.5 rounded-lg p-1.5 -m-1.5 transition-all duration-200 hover:bg-surface/90 hover:translate-x-0.5"
                                      >
                                        {innerContent}
                                      </Link>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setOpenMenu(null);
                                          setIsHover(null);
                                          item.onClick?.();
                                        }}
                                        className="group flex w-full items-start space-x-2.5 rounded-lg p-1.5 -m-1.5 text-left transition-all duration-200 hover:bg-surface/90 hover:translate-x-0.5 cursor-pointer"
                                      >
                                        {innerContent}
                                      </button>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  if (isStandalone) {
    return (
      <main className="relative w-full min-h-screen flex items-start md:items-center justify-center px-4 py-10">
        <div className="relative gap-5 flex flex-col items-center justify-center">
          {content}
        </div>
      </main>
    );
  }

  return content;
}

export default DropdownNavigation;
