"use client";

import { EntryType } from "@/lib/types";

// ─── Disclaimer box ───────────────────────────────────────────────────────────
export function Disclaimer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 bg-amber-500/8 border border-amber-500/25 rounded-2xl p-4 text-amber-300 text-sm leading-relaxed shadow-card">
      <span className="flex-shrink-0 mt-0.5 text-amber-400">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </span>
      <span>{children}</span>
    </div>
  );
}

// ─── Character counter ────────────────────────────────────────────────────────
export function CharCounter({ value = "", max }: { value?: string; max: number }) {
  const len   = value.length;
  const color = len > max ? "text-red-400" : len > max * 0.9 ? "text-amber-400" : "text-zinc-600";
  return (
    <div className={`text-right text-xs mt-1 font-medium tabular-nums ${color}`}>
      {len}/{max}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
export function EmptyState({
  icon, title, subtitle, action,
}: {
  icon: string; title: string; subtitle: string; action?: React.ReactNode;
}) {
  return (
    <div className="text-center py-14 px-6 text-zinc-500">
      <div className="text-5xl mb-4 select-none">{icon}</div>
      <div className="text-base font-semibold text-zinc-200 mb-2">{title}</div>
      <div className="text-sm leading-relaxed mb-6 max-w-xs mx-auto">{subtitle}</div>
      {action}
    </div>
  );
}

// ─── Entry type badge ─────────────────────────────────────────────────────────
const BADGE_COLORS: Record<EntryType, string> = {
  Activity:      "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  Award:         "bg-amber-500/15   text-amber-300   border-amber-500/25",
  Work:          "bg-indigo-500/15  text-indigo-300  border-indigo-500/25",
  Volunteer:     "bg-teal-500/15    text-teal-300    border-teal-500/25",
  Sport:         "bg-red-500/15     text-red-300     border-red-500/25",
  Education:     "bg-blue-500/15    text-blue-300    border-blue-500/25",
  Coursework:    "bg-violet-500/15  text-violet-300  border-violet-500/25",
  Project:       "bg-orange-500/15  text-orange-300  border-orange-500/25",
  Skill:         "bg-pink-500/15    text-pink-300    border-pink-500/25",
  Certification: "bg-sky-500/15     text-sky-300     border-sky-500/25",
};

export function Badge({ type }: { type: EntryType }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold border tracking-wide ${BADGE_COLORS[type]}`}>
      {type}
    </span>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────
export function SkeletonLine({ width = "100%" }: { width?: string }) {
  return (
    <div
      className="h-4 rounded-lg bg-zinc-800 animate-pulse"
      style={{ width }}
    />
  );
}

// ─── Page header ──────────────────────────────────────────────────────────────
export function PageHeader({
  title, subtitle, badge,
}: {
  title: string; subtitle?: string; badge?: string;
}) {
  return (
    <div className="mb-7">
      {badge && (
        <span className="inline-block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
          {badge}
        </span>
      )}
      <h1 className="font-serif text-2xl text-zinc-100 leading-tight tracking-tight">{title}</h1>
      {subtitle && (
        <p className="text-zinc-500 text-sm mt-1.5 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
export function Field({
  label, children, hint,
}: {
  label: string; children: React.ReactNode; hint?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">{hint}</p>}
    </div>
  );
}
