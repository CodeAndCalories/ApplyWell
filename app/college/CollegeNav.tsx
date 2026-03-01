"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/college",            icon: "🎓", label: "Overview"   },
  { href: "/college/activities", icon: "🎯", label: "Activities" },
  { href: "/college/essays",     icon: "✍️", label: "Essays"     },
  { href: "/college/review",     icon: "✅", label: "Review"     },
];

export default function CollegeNav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl mb-6 overflow-x-auto no-scrollbar">
      {TABS.map(({ href, icon, label }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2 px-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors min-w-0
              ${active ? "bg-blue-500 text-white" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"}`}>
            <span className="text-sm leading-none">{icon}</span>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
