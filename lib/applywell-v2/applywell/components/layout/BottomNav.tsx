"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/dashboard", label: "Home", icon: "🏠" },
  { href: "/entries", label: "Entries", icon: "📋" },
  { href: "/resume", label: "Resume", icon: "📄" },
  { href: "/verify", label: "Verify", icon: "🛡️" },
  { href: "/profile", label: "Profile", icon: "👤" },
];

export default function BottomNav() {
  const path = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-800 flex pb-safe">
      {NAV.map((item) => {
        const active = path === item.href || path.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 flex flex-col items-center py-2.5 gap-0.5 text-xs font-medium transition-colors
              ${active ? "text-emerald-400" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            <span className="text-xl leading-none">{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
