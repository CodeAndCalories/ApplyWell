"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/lib/context";

const PAGE_TITLES: Record<string, string> = {
  "/": "ApplyWell",
  "/dashboard": "Dashboard",
  "/profile": "Profile",
  "/entries": "Entries",
  "/entries/new": "New Entry",
  "/resume": "Resume Preview",
  "/activities": "Activities",
  "/essay": "Personal Statement",
  "/verify": "Verify",
  "/export": "Export",
};

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useApp();

  // Don't show on landing page
  if (pathname === "/") return null;

  const title = PAGE_TITLES[pathname] || "ApplyWell";
  const isEditEntry = pathname.startsWith("/entries/") && pathname !== "/entries/new";
  const showBack = pathname !== "/dashboard";

  return (
    <div className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur border-b border-zinc-800/60">
      <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
        {showBack ? (
          <button onClick={() => router.back()}
            className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 -ml-1">
            ← 
          </button>
        ) : (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-400 to-amber-400 flex items-center justify-center text-zinc-900 font-bold text-xs">
              A
            </div>
          </Link>
        )}

        <span className="font-semibold text-sm flex-1">
          {isEditEntry ? "Edit Entry" : title}
        </span>

        {pathname === "/dashboard" && (
          <Link href="/profile" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
            {state.profile.name ? state.profile.name.split(" ")[0] : "Profile"} →
          </Link>
        )}

        {pathname === "/entries" && (
          <Link href="/entries/new"
            className="bg-emerald-400 text-zinc-900 font-semibold rounded-lg px-3 py-1.5 text-xs">
            + Add
          </Link>
        )}
      </div>
    </div>
  );
}
