// src/components/navbar/GlassNav.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { navItems } from "@/content/nav";

export default function GlassNav() {
  const p = useScrollProgress(140); // 0–1 arası
  const height = 80 - (80 - 58) * p; // 80px → 58px
  const shadowAlpha = 0.12 - (0.12 - 0.08) * p;

  // Nav yüksekliğini CSS değişkenine yaz (layout'ta main'e padding vermek için)
  useEffect(() => {
    document.documentElement.style.setProperty("--nav-h", `${height}px`);
  }, [height]);

  return (
    <div className="fixed top-3 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <nav
        className="pointer-events-auto backdrop-blur-xl bg-white/60 dark:bg-zinc-900/40
                   border border-white/30 dark:border-white/10 shadow-xl rounded-2xl
                   px-4 sm:px-6 flex items-center gap-2 sm:gap-4
                   transition-all duration-200 will-change-transform"
        style={{ height, boxShadow: `0 10px 30px rgba(0,0,0,${shadowAlpha})` }}
        aria-label="Primary"
      >
        {/* Logo */}
        <Link href="/" className="font-semibold tracking-tight mr-1 sm:mr-2">
          <span className="text-base nav-uses-acc" style={{ color: "var(--acc)" }}>
            Tuna
          </span>
        </Link>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-1 sm:gap-2">
          {navItems.map((it) => (
            <li key={it.label} className="relative group">
              {/* Ana link */}
              <Link
                href={it.href ?? "#"}
                className="
                  px-3 py-2 rounded-xl text-sm nav-uses-acc nav-hover
                  hover:bg-black/5 dark:hover:bg-white/5
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                  focus-visible:ring-black/30 dark:focus-visible:ring-white/30
                "
              >
                {it.label}
              </Link>

              {/* Eğer children varsa dropdown */}
              {it.children?.length ? (
                <ul
                  className="
                    absolute left-0 mt-1 hidden min-w-[160px] rounded-xl border border-zinc-200 dark:border-zinc-700
                    bg-white dark:bg-zinc-900 shadow-lg group-hover:block
                  "
                >
                  {it.children.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className="block px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 rounded-lg"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>

        {/* Sağ taraf */}
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/#contact"
            className="hidden sm:inline-flex text-sm font-medium px-3 py-2 rounded-xl nav-uses-acc nav-hover text-white hover:opacity-90"
            style={{ backgroundColor: "var(--acc)" }}
          >
            Contact
          </Link>

          <button
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl
                       bg-black/10 dark:bg-white/10"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </nav>
    </div>
  );
}
