"use client";

import Link from "next/link";
import { useApp } from "@/lib/context";
import { Badge } from "@/components/ui";

/* ── Icon helpers ─────────────────────────────────────────────────────────── */
function IconPlus() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function IconDoc() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="9" y1="7" x2="15" y2="7" /><line x1="9" y1="11" x2="15" y2="11" /><line x1="9" y1="15" x2="12" y2="15" />
    </svg>
  );
}
function IconList() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}
function IconBook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="12" y1="6" x2="16" y2="6" /><line x1="12" y1="10" x2="16" y2="10" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/* ── Dashboard ────────────────────────────────────────────────────────────── */
export default function Dashboard() {
  const { state } = useApp();
  const { profile, entries } = state;

  const verifiedCount = entries.filter((e) => e.verified).length;
  const progress      = entries.length ? Math.round((verifiedCount / entries.length) * 100) : 0;

  const quickActions = [
    { label: "Add Entry",      href: "/entries/new", Icon: IconPlus, color: "text-emerald-400", bg: "bg-emerald-400/10",  border: "border-emerald-400/20",  hover: "hover:border-emerald-400/40 hover:bg-emerald-400/15" },
    { label: "Preview Resume", href: "/resume",      Icon: IconDoc,  color: "text-indigo-400",  bg: "bg-indigo-400/10",   border: "border-indigo-400/20",   hover: "hover:border-indigo-400/40 hover:bg-indigo-400/15" },
    { label: "Activities",     href: "/activities",  Icon: IconList, color: "text-amber-400",   bg: "bg-amber-400/10",    border: "border-amber-400/20",    hover: "hover:border-amber-400/40 hover:bg-amber-400/15" },
    { label: "Essay Help",     href: "/essay",       Icon: IconBook, color: "text-teal-400",    bg: "bg-teal-400/10",     border: "border-teal-400/20",     hover: "hover:border-teal-400/40 hover:bg-teal-400/15" },
  ];

  const firstName = profile.name?.split(" ")[0] || null;

  return (
    <div className="py-8 animate-fade-in">

      {/* ── Greeting ──────────────────────────────────────────────────────── */}
      <div className="mb-7">
        <p className="text-zinc-500 text-sm font-medium mb-1">Welcome back{firstName ? "," : ""}</p>
        <h1 className="font-serif text-3xl leading-tight tracking-tight">
          {firstName ?? "Your Dashboard"}
        </h1>
        {profile.grade && (
          <p className="text-zinc-500 text-sm mt-1.5">
            Grade {profile.grade}
            {profile.school && <span className="text-zinc-600"> · {profile.school}</span>}
          </p>
        )}
      </div>

      {/* ── Stats row ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { value: entries.length, label: "Entries" },
          { value: verifiedCount,  label: "Verified" },
          { value: `${progress}%`, label: "Complete" },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center shadow-card"
          >
            <div className="text-2xl font-bold text-zinc-100 leading-none mb-1">{value}</div>
            <div className="text-xs text-zinc-500 font-medium tracking-wide">{label}</div>
          </div>
        ))}
      </div>

      {/* ── Verification progress ─────────────────────────────────────────── */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-4 shadow-card">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-zinc-200">Verification Progress</span>
          <span className="text-sm font-semibold text-emerald-400">
            {verifiedCount}/{entries.length}
          </span>
        </div>

        {/* Track */}
        <div className="bg-zinc-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>

        {entries.length === 0 ? (
          <p className="text-xs text-zinc-600 mt-2.5">Add your first entry to get started.</p>
        ) : progress === 100 ? (
          <p className="text-xs text-emerald-500 mt-2.5 font-medium">All entries verified — ready to export!</p>
        ) : (
          <p className="text-xs text-zinc-600 mt-2.5">
            {entries.length - verifiedCount} remaining to verify
          </p>
        )}
      </div>

      {/* ── Quick actions ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {quickActions.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className={`bg-zinc-900 border ${a.border} ${a.hover} rounded-2xl p-4 flex flex-col gap-3 transition-all duration-150 shadow-card group`}
          >
            <div className={`w-9 h-9 rounded-xl ${a.bg} border ${a.border} flex items-center justify-center ${a.color} transition-transform group-hover:scale-105`}>
              <a.Icon />
            </div>
            <span className="text-sm font-semibold text-zinc-200 group-hover:text-zinc-100 transition-colors leading-tight">
              {a.label}
            </span>
          </Link>
        ))}
      </div>

      {/* ── Recent entries ────────────────────────────────────────────────── */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-zinc-200">Recent Entries</span>
          <Link
            href="/entries"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
          >
            View all <IconChevronRight />
          </Link>
        </div>

        {entries.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center shadow-card">
            <div
              className="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto mb-4"
              style={{ boxShadow: "0 2px 8px rgb(0 0 0 / 0.3)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <div className="font-semibold text-zinc-200 mb-1.5">No entries yet</div>
            <p className="text-zinc-500 text-sm mb-5 leading-relaxed">
              Add your activities, awards, work experience, and more.
            </p>
            <Link
              href="/entries/new"
              className="inline-flex items-center gap-2 bg-emerald-400 text-zinc-900 font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors hover:bg-emerald-300 glow-emerald-btn"
            >
              <IconPlus /> Add First Entry
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {entries.slice(0, 4).map((e) => (
              <Link
                key={e.id}
                href={`/entries/${e.id}`}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3.5 flex items-center gap-3 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-150 shadow-card group"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-zinc-100 truncate group-hover:text-zinc-50">
                    {e.title}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge type={e.type} />
                    {e.org && (
                      <span className="text-xs text-zinc-500 truncate">{e.org}</span>
                    )}
                  </div>
                </div>
                {e.verified ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <IconCheck />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 flex-shrink-0" />
                )}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      {entries.length > 0 && (
        <Link
          href="/verify"
          className="flex items-center justify-center gap-2 bg-emerald-400 text-zinc-900 font-semibold rounded-2xl px-6 py-3.5 text-sm transition-colors hover:bg-emerald-300 glow-emerald-btn"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
          Review &amp; Export
        </Link>
      )}
    </div>
  );
}
