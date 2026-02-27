
"use client";

import Link from "next/link";
import { useApp } from "@/lib/context";
import { Badge } from "@/components/ui";

export default function Dashboard() {
  const { state } = useApp();
  const { profile, entries } = state;

  const verifiedCount = entries.filter((e) => e.verified).length;
  const progress = entries.length ? Math.round((verifiedCount / entries.length) * 100) : 0;

  const quickActions = [
    { label: "Add Entry", icon: "➕", href: "/entries/new", color: "text-emerald-400" },
    { label: "Preview Resume", icon: "📄", href: "/resume", color: "text-indigo-400" },
    { label: "Activities", icon: "📋", href: "/activities", color: "text-amber-400" },
    { label: "Essay Help", icon: "📖", href: "/essay", color: "text-teal-400" },
  ];

  return (
    <div className="py-8 animate-fade-in">
      <div className="mb-6">
        <p className="text-zinc-500 text-sm mb-1">Welcome back</p>
        <h1 className="font-serif text-3xl">{profile.name || "Your Dashboard"}</h1>
        {profile.grade && (
          <p className="text-zinc-500 text-sm mt-1">
            Grade {profile.grade}{profile.school && ` · ${profile.school}`}
          </p>
        )}
      </div>

      {/* Progress */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold">Verification Progress</span>
          <span className="text-sm text-emerald-400">{verifiedCount}/{entries.length} entries</span>
        </div>
        <div className="bg-zinc-800 rounded-full h-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {entries.length === 0 && (
          <p className="text-xs text-zinc-600 mt-2">Add your first entry to get started</p>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {quickActions.map((a) => (
          <Link key={a.href} href={a.href}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-2 hover:border-zinc-700 transition-colors">
            <span className={`text-xl ${a.color}`}>{a.icon}</span>
            <span className="text-sm font-semibold">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent entries */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold">Recent Entries</span>
          <Link href="/entries" className="text-sm text-zinc-500 hover:text-zinc-300">View all →</Link>
        </div>

        {entries.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <div className="text-3xl mb-3">📋</div>
            <div className="font-semibold mb-2">No entries yet</div>
            <p className="text-zinc-500 text-sm mb-4">Add your activities, awards, work experience, and more.</p>
            <Link href="/entries/new"
              className="bg-emerald-400 text-zinc-900 font-semibold rounded-xl px-5 py-2.5 text-sm inline-block">
              Add First Entry
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {entries.slice(0, 4).map((e) => (
              <Link key={e.id} href={`/entries/${e.id}`}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-3 hover:border-zinc-700 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{e.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge type={e.type} />
                    {e.org && <span className="text-xs text-zinc-500 truncate">{e.org}</span>}
                  </div>
                </div>
                {e.verified && <span className="text-emerald-400 text-sm flex-shrink-0">✓</span>}
              </Link>
            ))}
          </div>
        )}
      </div>

      {entries.length > 0 && (
        <Link href="/verify"
          className="bg-emerald-400 text-zinc-900 font-semibold rounded-xl px-6 py-3.5 text-center text-sm block">
          🛡️ Review &amp; Export
        </Link>
      )}
    </div>
  );
}
