"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import { useState } from "react";

/* ── Inline SVG icons ─────────────────────────────────────────────────────── */
function IconHome({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function IconEntries({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}
function IconResume({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="9" y1="7" x2="15" y2="7" />
      <line x1="9" y1="11" x2="15" y2="11" />
      <line x1="9" y1="15" x2="12" y2="15" />
    </svg>
  );
}
function IconActivities({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}
function IconVerify({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

/* ── Nav config ───────────────────────────────────────────────────────────── */
const NAV = [
  { href: "/dashboard",  label: "Home",       Icon: IconHome },
  { href: "/entries",    label: "Entries",    Icon: IconEntries },
  { href: "/resume",     label: "Resume",     Icon: IconResume },
  { href: "/activities", label: "Activities", Icon: IconActivities },
  { href: "/verify",     label: "Verify",     Icon: IconVerify },
];

const PAGE_TITLES: Record<string, string> = {
  "/dashboard":     "Dashboard",
  "/profile":       "Profile",
  "/entries":       "Entries",
  "/resume":        "Resume",
  "/activities":    "Activities",
  "/essay":         "Essay Help",
  "/verify":        "Verify",
  "/export":        "Export",
  "/cover-letter":  "Cover Letter",
};

/* ── Menu link items ──────────────────────────────────────────────────────── */
const MENU_LINKS = [
  { href: "/profile",       label: "My Profile",     icon: "👤" },
  { href: "/essay",         label: "Essay Help",     icon: "📖" },
  { href: "/cover-letter",  label: "Cover Letter",   icon: "✉️" },
  { href: "/export",        label: "Export Resume",  icon: "⬇️" },
  { href: "/college",       label: "College App",    icon: "🎓" },
];

/* ── Component ────────────────────────────────────────────────────────────── */
export default function TopNav() {
  const pathname = usePathname();
  const router   = useRouter();
  const { state, deleteAllData } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  if (
    pathname === "/" ||
    pathname.startsWith("/preview") ||
    pathname.startsWith("/college")
  ) return null;

  const isDeepPage =
    pathname.startsWith("/entries/") ||
    ["essay", "export", "profile", "cover-letter"].some(p => pathname === "/" + p);

  const title = PAGE_TITLES[pathname] ?? "ApplyWell";
  const displayName   = state.profile.name || "Student";
  const avatarInitial = displayName[0]?.toUpperCase() ?? "A";

  return (
    <div
      className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80"
      style={{ boxShadow: "0 1px 12px rgb(0 0 0 / 0.5)" }}
    >
      <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-2">

        {/* Left: logo or back button */}
        {isDeepPage ? (
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100 transition-colors text-sm font-medium flex-shrink-0 px-2 py-1 rounded-lg hover:bg-zinc-800/60"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
        ) : (
          <Link href="/" className="flex items-center gap-2 mr-1 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-amber-400 flex items-center justify-center text-zinc-900 font-bold text-sm shadow-card">
              A
            </div>
          </Link>
        )}

        {/* Center: nav tabs or page title */}
        {!isDeepPage ? (
          <div className="flex-1 flex items-center justify-center gap-0.5 overflow-x-auto no-scrollbar">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center px-2.5 py-1.5 rounded-xl text-[10px] font-semibold transition-all duration-150 whitespace-nowrap flex-shrink-0 gap-0.5 tracking-wide
                    ${active
                      ? "bg-emerald-400/12 text-emerald-400"
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
                    }`}
                >
                  <item.Icon size={17} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ) : (
          <span className="flex-1 text-sm font-semibold text-center tracking-tight">{title}</span>
        )}

        {/* Right: avatar + dropdown */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700/80 flex items-center justify-center text-zinc-300 hover:text-zinc-100 hover:border-zinc-600 transition-all text-sm font-bold shadow-card"
          >
            {avatarInitial}
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div
                className="absolute right-0 top-10 z-50 w-56 bg-zinc-900 border border-zinc-700/80 rounded-2xl overflow-hidden animate-fade-in"
                style={{ boxShadow: "0 8px 32px rgb(0 0 0 / 0.6), 0 4px 12px rgb(0 0 0 / 0.4)" }}
              >
                {/* User info */}
                <div className="px-4 py-3.5 border-b border-zinc-800">
                  <div className="text-sm font-semibold text-zinc-100">{displayName}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{state.profile.school || "No school set"}</div>
                </div>

                {/* Links */}
                <div className="py-1">
                  {MENU_LINKS.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800/70 hover:text-zinc-100 transition-colors"
                    >
                      <span className="text-base w-5 text-center leading-none">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Danger zone */}
                <div className="border-t border-zinc-800 py-1">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      if (confirm("Clear all data and start fresh?")) {
                        deleteAllData();
                        router.push("/");
                      }
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-amber-400/90 hover:bg-zinc-800/70 hover:text-amber-300 transition-colors"
                  >
                    <span className="text-base w-5 text-center leading-none">↺</span>
                    Clear &amp; Start Over
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
