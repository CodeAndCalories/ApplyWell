"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context";
import { Badge, EmptyState } from "@/components/ui";
import { ENTRY_TYPES, EntryType } from "@/lib/types";

function IconEdit() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}
function IconTrash() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14H6L5 6"/>
      <path d="M10 11v6"/><path d="M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

export default function EntriesPage() {
  const { state, deleteEntry } = useApp();
  const [filter, setFilter] = useState<"All" | EntryType>("All");

  const filtered = filter === "All"
    ? state.entries
    : state.entries.filter((e) => e.type === filter);

  return (
    <div className="py-8 animate-fade-in">

      {/* Header */}
      <div className="flex items-center justify-between mb-1.5">
        <h1 className="font-serif text-2xl tracking-tight">Entries</h1>
        <Link
          href="/entries/new"
          className="inline-flex items-center gap-1.5 bg-emerald-400 text-zinc-900 font-semibold rounded-xl px-4 py-2 text-sm transition-colors hover:bg-emerald-300"
          style={{ boxShadow: "0 2px 10px rgb(52 211 153 / 0.25)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add
        </Link>
      </div>

      <p className="text-xs text-zinc-500 mb-5 leading-relaxed">
        Add everything you want included. You&apos;ll choose what to show on the resume later.
      </p>

      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap mb-5">
        {(["All", ...ENTRY_TYPES] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-all tracking-wide
              ${filter === t
                ? "border-emerald-400/60 bg-emerald-400/12 text-emerald-400"
                : "border-zinc-700/80 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="📋"
          title={filter === "All" ? "No entries yet" : `No ${filter} entries`}
          subtitle="Add activities, awards, work, sports, projects, skills, and more. Colleges want to see the full picture of who you are."
          action={
            <Link
              href="/entries/new"
              className="inline-flex items-center gap-2 bg-emerald-400 text-zinc-900 font-semibold rounded-xl px-5 py-2.5 text-sm hover:bg-emerald-300 transition-colors"
              style={{ boxShadow: "0 2px 10px rgb(52 211 153 / 0.25)" }}
            >
              Add Entry
            </Link>
          }
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((entry) => (
            <div
              key={entry.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 animate-fade-in shadow-card hover:border-zinc-700 transition-all duration-150"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  {/* Type badge + verified */}
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <Badge type={entry.type} />
                    {entry.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                        <span className="w-4 h-4 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center">
                          <IconCheck />
                        </span>
                        Verified
                      </span>
                    )}
                  </div>

                  <div className="font-semibold text-sm text-zinc-100 mb-0.5 leading-snug">
                    {entry.title}
                  </div>
                  {entry.org && (
                    <div className="text-xs text-zinc-500">{entry.org}</div>
                  )}
                  {(entry.hrsPerWeek || entry.weeksPerYear) && (
                    <div className="text-xs text-zinc-600 mt-1">
                      {entry.hrsPerWeek && `${entry.hrsPerWeek} hrs/wk`}
                      {entry.hrsPerWeek && entry.weeksPerYear && " · "}
                      {entry.weeksPerYear && `${entry.weeksPerYear} wks/yr`}
                    </div>
                  )}
                  {entry.description && (
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed line-clamp-2">
                      {entry.description}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-1 flex-shrink-0">
                  <Link
                    href={`/entries/${entry.id}`}
                    className="flex items-center justify-center w-8 h-8 text-zinc-500 hover:text-zinc-200 rounded-xl hover:bg-zinc-800 transition-all"
                    title="Edit"
                  >
                    <IconEdit />
                  </Link>
                  <button
                    onClick={() => confirm("Delete this entry?") && deleteEntry(entry.id)}
                    className="flex items-center justify-center w-8 h-8 text-zinc-600 hover:text-red-400 rounded-xl hover:bg-zinc-800 transition-all"
                    title="Delete"
                  >
                    <IconTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
