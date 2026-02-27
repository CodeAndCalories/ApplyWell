"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import { useState } from "react";

const NAV = [
  { href: "/dashboard", label: "Home", icon: "🏠" },
  { href: "/entries", label: "Entries", icon: "📋" },
  { href: "/resume", label: "Resume", icon: "📄" },
  { href: "/activities", label: "Activities", icon: "🎯" },
  { href: "/verify", label: "Verify", icon: "🛡️" },
];

const PAGE_TITLES: Record<string, string> = {
  "/": "ApplyWell",
  "/dashboard": "Dashboard",
  "/profile": "Profile",
  "/entries": "Entries",
  "/resume": "Resume",
  "/activities": "Activities",
  "/essay": "Essay",
  "/verify": "Verify",
  "/export": "Export",
};

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { state, deleteAllData } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname === "/") return null;

  const isDeepPage = pathname.startsWith("/entries/") ||
    pathname === "/essay" || pathname === "/export" || pathname === "/profile";
  const showBack = isDeepPage;
  const title = PAGE_TITLES[pathname] || "ApplyWell";

  return (
    <>
      {/* Main top nav */}
      <div className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-xl mx-auto px-3 h-14 flex items-center gap-2">

          {/* Left: back or logo */}
          {showBack ? (
            <button onClick={() => router.back()}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors text-sm font-medium px-1">
              ← Back
            </button>
          ) : (
            <Link href="/dashboard" className="flex items-center gap-2 mr-1">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-amber-400 flex items-center justify-center text-zinc-900 font-bold text-sm flex-shrink-0">
                A
              </div>
              <span className="font-serif text-base hidden sm:block">ApplyWell</span>
            </Link>
          )}

          {/* Center nav tabs (main pages only) */}
          {!isDeepPage && (
            <div className="flex-1 flex items-center justify-center gap-0.5 overflow-x-auto no-scrollbar">
              {NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}
                    className={`flex flex-col items-center px-2.5 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0
                      ${active
                        ? "bg-emerald-400/15 text-emerald-400"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"}`}>
                    <span className="text-base leading-tight">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Deep page: show title */}
          {isDeepPage && (
            <span className="flex-1 text-sm font-semibold text-center">
              {pathname.startsWith("/entries/") ? "Entry" : title}
            </span>
          )}

          {/* Right: menu */}
          <div className="relative flex-shrink-0">
            <button onClick={() => setMenuOpen(o => !o)}
              className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-zinc-200 transition-colors text-sm">
              {state.profile.name ? state.profile.name[0].toUpperCase() : "☰"}
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-10 z-50 w-52 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-zinc-800">
                    <div className="text-sm font-semibold">{state.profile.name || "Student"}</div>
                    <div className="text-xs text-zinc-500">{state.profile.school || "No school set"}</div>
                  </div>
                  {[
                    { href: "/profile", label: "👤 My Profile" },
                    { href: "/essay", label: "📖 Essay Brainstorm" },
                    { href: "/export", label: "⬇️ Export Resume" },
                  ].map(item => (
                    <Link key={item.href} href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors">
                      {item.label}
                    </Link>
                  ))}
                  <div className="border-t border-zinc-800">
                    <Link href="/" onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm text-zinc-400 hover:bg-zinc-800 transition-colors">
                      ← Back to Home
                    </Link>
                    <button onClick={() => {
                      if (confirm("Clear all data and start fresh?")) {
                        deleteAllData();
                        window.location.href = "/";
                      }
                      setMenuOpen(false);
                    }}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-zinc-800 transition-colors">
                      🗑️ Clear & Start Over
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
