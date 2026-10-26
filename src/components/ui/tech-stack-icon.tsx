import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkillVisualTheme {
  iconColor: string;
  glowColor: string;
  badgeBg: string;
  badgeText: string;
  borderAccent: string;
}

export function getSkillVisualTheme(name: string): SkillVisualTheme {
  const key = name.toLowerCase();

  if (key.includes("python")) {
    return {
      iconColor: "text-[#387EB8]",
      glowColor: "from-[#387EB8]/30 via-[#FFE052]/20 to-transparent",
      badgeBg: "bg-[#387EB8]/15 border-[#387EB8]/30",
      badgeText: "text-[#60A5FA]",
      borderAccent: "group-hover:border-[#387EB8]/60",
    };
  }
  if (key.includes("backend") || key.includes("server") || key.includes("fastapi")) {
    return {
      iconColor: "text-emerald-400",
      glowColor: "from-emerald-500/25 via-emerald-400/10 to-transparent",
      badgeBg: "bg-emerald-500/15 border-emerald-500/30",
      badgeText: "text-emerald-400",
      borderAccent: "group-hover:border-emerald-500/60",
    };
  }
  if (key.includes("web") || key.includes("globe") || key.includes("tailwind")) {
    return {
      iconColor: "text-cyan-400",
      glowColor: "from-cyan-500/25 via-cyan-400/10 to-transparent",
      badgeBg: "bg-cyan-500/15 border-cyan-500/30",
      badgeText: "text-cyan-300",
      borderAccent: "group-hover:border-cyan-400/60",
    };
  }
  if (key === "ai" || key.includes("artificial") || key.includes("cpu")) {
    return {
      iconColor: "text-indigo-400",
      glowColor: "from-indigo-500/25 via-indigo-400/10 to-transparent",
      badgeBg: "bg-indigo-500/15 border-indigo-500/30",
      badgeText: "text-indigo-300",
      borderAccent: "group-hover:border-indigo-400/60",
    };
  }
  if (key.includes("ml") || key.includes("machine") || key.includes("brain")) {
    return {
      iconColor: "text-amber-400",
      glowColor: "from-amber-500/25 via-amber-400/10 to-transparent",
      badgeBg: "bg-amber-500/15 border-amber-500/30",
      badgeText: "text-amber-300",
      borderAccent: "group-hover:border-amber-400/60",
    };
  }
  if (key.includes("deep") || key.includes("network") || key.includes("motion")) {
    return {
      iconColor: "text-purple-400",
      glowColor: "from-purple-500/25 via-purple-400/10 to-transparent",
      badgeBg: "bg-purple-500/15 border-purple-500/30",
      badgeText: "text-purple-300",
      borderAccent: "group-hover:border-purple-400/60",
    };
  }
  if (key.includes("genai") || key.includes("gemini") || key.includes("sparkle")) {
    return {
      iconColor: "text-yellow-400",
      glowColor: "from-yellow-500/25 via-amber-400/10 to-transparent",
      badgeBg: "bg-yellow-500/15 border-yellow-500/30",
      badgeText: "text-yellow-300",
      borderAccent: "group-hover:border-yellow-400/60",
    };
  }
  if (key.includes("data") || key.includes("chart") || key.includes("typescript") || key.includes("postgres")) {
    return {
      iconColor: "text-blue-400",
      glowColor: "from-blue-500/25 via-blue-400/10 to-transparent",
      badgeBg: "bg-blue-500/15 border-blue-500/30",
      badgeText: "text-blue-300",
      borderAccent: "group-hover:border-blue-400/60",
    };
  }
  if (key.includes("prompt") || key.includes("terminal")) {
    return {
      iconColor: "text-teal-400",
      glowColor: "from-teal-500/25 via-teal-400/10 to-transparent",
      badgeBg: "bg-teal-500/15 border-teal-500/30",
      badgeText: "text-teal-300",
      borderAccent: "group-hover:border-teal-400/60",
    };
  }
  if (key.includes("googlecloud") || key.includes("gcp")) {
    return {
      iconColor: "text-sky-400",
      glowColor: "from-[#4285F4]/25 via-[#34A853]/15 to-transparent",
      badgeBg: "bg-sky-500/15 border-sky-500/30",
      badgeText: "text-sky-300",
      borderAccent: "group-hover:border-sky-400/60",
    };
  }
  if (key.includes("cloud") || key.includes("next") || key.includes("react") || key.includes("flutter")) {
    return {
      iconColor: "text-sky-400",
      glowColor: "from-sky-500/25 via-sky-400/10 to-transparent",
      badgeBg: "bg-sky-500/15 border-sky-500/30",
      badgeText: "text-sky-300",
      borderAccent: "group-hover:border-sky-400/60",
    };
  }
  if (key.includes("ux") || key.includes("pen") || key.includes("design")) {
    return {
      iconColor: "text-pink-400",
      glowColor: "from-pink-500/25 via-pink-400/10 to-transparent",
      badgeBg: "bg-pink-500/15 border-pink-500/30",
      badgeText: "text-pink-300",
      borderAccent: "group-hover:border-pink-400/60",
    };
  }

  return {
    iconColor: "text-emerald-400",
    glowColor: "from-emerald-500/20 via-emerald-400/5 to-transparent",
    badgeBg: "bg-emerald-500/15 border-emerald-500/30",
    badgeText: "text-emerald-300",
    borderAccent: "group-hover:border-emerald-400/60",
  };
}

export function TechStackIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const normalized = name.toLowerCase();

  // 1. Python (Official Dual-Color Blue & Gold Emblem)
  if (normalized.includes("python")) {
    return (
      <svg
        viewBox="0 0 128 128"
        fill="none"
        aria-hidden="true"
        className={cn("size-4 shrink-0", className)}
      >
        <path
          fill="#387EB8"
          d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"
        />
        <path
          fill="#FFE052"
          d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"
        />
      </svg>
    );
  }

  // 2. Google Cloud (Official 4-Color Google Cloud Emblem)
  if (normalized.includes("googlecloud") || normalized.includes("gcp")) {
    return (
      <svg
        viewBox="0 0 128 128"
        fill="none"
        aria-hidden="true"
        className={cn("size-4 shrink-0", className)}
      >
        <path
          fill="#EA4335"
          d="M80.7 45.8l14.8-14.8 1-6.3C84.2 12.8 66.2 8.9 50.4 15.8 39.2 20.6 30.8 30.1 27.2 41.7l5.5-.8 20.8-3.4 1.6-1.7c7.6-8.2 20.1-9.3 28.9-2.2l-3.3 12.2z"
        />
        <path
          fill="#4285F4"
          d="M100.3 41.8c-2.5-9.2-7.8-17.4-15.1-23.5L70.3 33.2c6.3 5.1 9.9 12.8 9.7 21v2.6c7.3 0 13.2 5.9 13.2 13.2s-5.9 13.2-13.2 13.2H53.6l-2.6 2.8v15.8l2.6 2.4h26.4c19.1.1 34.7-15.3 34.8-34.4.1-12.5-6.6-24.1-14.5-28z"
        />
        <path
          fill="#34A853"
          d="M27.3 104.2h26.3V83.2H27.3c-1.9 0-3.8-.4-5.5-1.2l-3.9 1.2-14.9 14.8-1.3 5c6.8 5.1 15.1 7.9 25.6 1.2z"
        />
        <path
          fill="#FBBC05"
          d="M27.3 35.5C12.3 35.6.1 47.9 0 62.9c0 8.5 3.9 16.5 10.6 21.7l15.9-15.9c-5.7-2.6-8.2-9.3-5.6-15s9.3-8.2 15-5.6c2.5 1.1 4.5 3.1 5.6 5.6l15.9-15.9C50.2 28.6 39 35.5 27.3 35.5z"
        />
      </svg>
    );
  }

  // 3. Back-End Development / Server Rack (Emerald, matching suryapamungkas.vercel.app)
  if (normalized.includes("backend") || normalized.includes("server") || normalized.includes("fastapi")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn("size-4 shrink-0 text-emerald-500", className)}
      >
        <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
        <line x1="6" x2="6.01" y1="6" y2="6" />
        <line x1="6" x2="6.01" y1="18" y2="18" />
      </svg>
    );
  }

  // 4. Web Development / Globe (Cyan, matching suryapamungkas.vercel.app)
  if (normalized.includes("webdev") || normalized.includes("globe") || normalized === "web") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn("size-4 shrink-0 text-cyan-400", className)}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    );
  }

  // 5. Artificial Intelligence / CPU (Indigo, matching suryapamungkas.vercel.app)
  if (normalized === "ai" || normalized.includes("artificial") || normalized.includes("cpu")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn("size-4 shrink-0 text-indigo-400", className)}
      >
        <rect width="16" height="16" x="4" y="4" rx="2" />
        <rect width="6" height="6" x="9" y="9" rx="1" />
        <path d="M15 2v2" />
        <path d="M15 20v2" />
        <path d="M2 15h2" />
        <path d="M2 9h2" />
        <path d="M20 15h2" />
        <path d="M20 9h2" />
        <path d="M9 2v2" />
        <path d="M9 20v2" />
      </svg>
    );
  }

  // 6. Machine Learning / BrainCircuit (Amber, matching suryapamungkas.vercel.app)
  if (normalized.includes("ml") || normalized.includes("machine") || normalized.includes("brain")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn("size-4 shrink-0 text-amber-400", className)}
      >
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
        <path d="M9 13a4.5 4.5 0 0 0 3-4" />
        <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
        <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
        <path d="M6 18a4 4 0 0 1-1.967-.516" />
        <path d="M12 13h4" />
        <path d="M12 18h6a2 2 0 0 1 2 2v1" />
        <path d="M12 8h8" />
        <path d="M16 8V5a2 2 0 0 1 2-2" />
        <circle cx="16" cy="13" r=".5" fill="currentColor" />
        <circle cx="18" cy="3" r=".5" fill="currentColor" />
        <circle cx="20" cy="21" r=".5" fill="currentColor" />
        <circle cx="20" cy="8" r=".5" fill="currentColor" />
      </svg>
    );
  }

  // 7. Deep Learning / Network Hierarchy (Purple, matching suryapamungkas.vercel.app)
  if (normalized.includes("deep") || normalized.includes("network")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn("size-4 shrink-0 text-purple-400", className)}
      >
        <rect x="16" y="16" width="6" height="6" rx="1" />
        <rect x="2" y="16" width="6" height="6" rx="1" />
        <rect x="9" y="2" width="6" height="6" rx="1" />
        <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
        <path d="M12 12V8" />
      </svg>
    );
  }

  // 8. Generative AI / Sparkles (Yellow-Gold, matching suryapamungkas.vercel.app)
  if (normalized.includes("genai") || normalized.includes("gemini") || normalized.includes("sparkle")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn("size-4 shrink-0 text-yellow-400", className)}
      >
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        <path d="M20 3v4" />
        <path d="M22 5h-4" />
        <path d="M4 17v2" />
        <path d="M5 18H3" />
      </svg>
    );
  }

  // 9. Data Science / LineChart (Blue, matching suryapamungkas.vercel.app)
  if (normalized.includes("datascience") || normalized.includes("chart")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn("size-4 shrink-0 text-blue-400", className)}
      >
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    );
  }

  // 10. Prompt Engineering / Terminal (Teal, matching suryapamungkas.vercel.app)
  if (normalized.includes("prompt") || normalized.includes("terminal")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn("size-4 shrink-0 text-teal-400", className)}
      >
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" x2="20" y1="19" y2="19" />
      </svg>
    );
  }

  // 11. Cloud Computing (Sky Blue, matching suryapamungkas.vercel.app)
  if (normalized.includes("cloud")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn("size-4 shrink-0 text-sky-400", className)}
      >
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    );
  }

  // 12. UX Fundamentals / PenTool (Pink, matching suryapamungkas.vercel.app)
  if (normalized.includes("ux") || normalized.includes("pentool")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn("size-4 shrink-0 text-pink-400", className)}
      >
        <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
        <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" />
        <path d="m2.3 2.3 7.286 7.286" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    );
  }

  // 13. Next.js & React 19 (React Orbital Atom in Cyan + Next Core)
  if (normalized.includes("next") || normalized.includes("react")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={cn("size-4 shrink-0 text-sky-400", className)}
      >
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4.2"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4.2"
          transform="rotate(60 12 12)"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4.2"
          transform="rotate(120 12 12)"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  // 14. TypeScript & Tailwind CSS
  if (normalized.includes("tailwind") || normalized.includes("typescript")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={cn("size-4 shrink-0 text-cyan-400", className)}
      >
        <path
          fill="#38BDF8"
          d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.47 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.39 16.85 9.53 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.47 12 7 12z"
        />
      </svg>
    );
  }

  // 15. Framer Motion & Lenis
  if (normalized.includes("motion")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={cn("size-4 shrink-0 text-purple-400", className)}
      >
        <path
          d="M4 3h16v8h-8L4 3Zm0 8h8l8 8H4v-8Zm0 8h8v4l-8-4Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  // 16. PostgreSQL, Prisma & SQLite
  if (normalized.includes("postgres") || normalized.includes("database")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn("size-4 shrink-0 text-blue-400", className)}
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </svg>
    );
  }

  // 17. Flutter
  if (normalized.includes("flutter")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={cn("size-4 shrink-0 text-sky-400", className)}
      >
        <path
          d="M14.5 3L5.5 12L8.5 15L20.5 3H14.5ZM14.5 11.5L9.7 16.3L14.5 21H20.5L15.7 16.2L20.5 11.5H14.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  // 18. Certificate / Award Ribbon (Matches suryapamungkas.vercel.app Certificate Card)
  if (normalized.includes("award") || normalized.includes("cert")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn("size-4 shrink-0 text-zinc-200", className)}
      >
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    );
  }

  // Default fallback
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-4 shrink-0 text-emerald-400", className)}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
