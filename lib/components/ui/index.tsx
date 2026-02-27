"use client";

import { EntryType } from "@/lib/types";

// ─── Disclaimer box ───────────────────────────────────────────────────────────
export function Disclaimer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-amber-300 text-sm leading-relaxed">
      ⚠️ {children}
    </div>
  );
}

// ─── Character counter ────────────────────────────────────────────────────────
export function CharCounter({ value = "", max }: { value?: string; max: number }) {
  const len = value.length;
  const color = len > max ? "text-red-400" : len > max * 0.9 ? "text-amber-400" : "text-zinc-500";
  return (
    <div className={`text-right text-xs mt-1 ${color}`}>
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
    <div className="text-center py-12 px-6 text-zinc-500">
      <div className="text-5xl mb-4">{icon}</div>
      <div className="text-lg font-semibold text-zinc-200 mb-2">{title}</div>
      <div className="text-sm leading-relaxed mb-6">{subtitle}</div>
      {action}
    </div>
  );
}

// ─── Entry type badge ─────────────────────────────────────────────────────────
const BADGE_COLORS: Record<EntryType, string> = {
  Activity: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Award: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Work: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  Volunteer: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  Sport: "bg-red-500/20 text-red-300 border-red-500/30",
  Education: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Coursework: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Project: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Skill: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Certification: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export function Badge({ type }: { type: EntryType }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold border ${BADGE_COLORS[type]}`}>
      {type}
    </span>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────
export function SkeletonLine({ width = "100%" }: { width?: string }) {
  return (
    <div
      className="h-4 rounded bg-zinc-700 animate-pulse"
      style={{ width }}
    />
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-serif text-2xl text-zinc-100">{title}</h1>
      {subtitle && <p className="text-zinc-500 text-sm mt-1 leading-relaxed">{subtitle}</p>}
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
      <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-zinc-600 mt-1">{hint}</p>}
    </div>
  );
}
