"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context";
import { Badge, EmptyState } from "@/components/ui";
import { ENTRY_TYPES, EntryType } from "@/lib/types";

export default function EntriesPage() {
  const { state, deleteEntry } = useApp();
  const [filter, setFilter] = useState<"All" | EntryType>("All");

  const filtered = filter === "All"
    ? state.entries
    : state.entries.filter((e) => e.type === filter);

  return (
    <div className="py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-serif text-2xl">Entries</h1>
        <Link href="/entries/new"
          className="bg-emerald-400 text-zinc-900 font-semibold rounded-xl px-4 py-2 text-sm">
          + Add
        </Link>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap mb-5">
        {(["All", ...ENTRY_TYPES] as const).map((t) => (
          <button key={t} onClick={() => setFilter(t)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors
              ${filter === t
                ? "border-emerald-400 bg-emerald-400/10 text-emerald-400"
                : "border-zinc-700 text-zinc-500 hover:border-zinc-500"}`}>
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
            <Link href="/entries/new"
              className="bg-emerald-400 text-zinc-900 font-semibold rounded-xl px-5 py-2.5 text-sm inline-block">
              Add Entry
            </Link>
          }
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((entry) => (
            <div key={entry.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 animate-fade-in">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <Badge type={entry.type} />
                    {entry.verified && (
                      <span className="text-xs font-semibold text-emerald-400">✓ Verified</span>
                    )}
                  </div>
                  <div className="font-semibold text-sm mb-0.5">{entry.title}</div>
                  {entry.org && <div className="text-xs text-zinc-500">{entry.org}</div>}
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
                <div className="flex gap-1 flex-shrink-0">
                  <Link href={`/entries/${entry.id}`}
                    className="text-zinc-500 hover:text-zinc-300 p-2 rounded-lg hover:bg-zinc-800 transition-colors">
                    ✏️
                  </Link>
                  <button
                    onClick={() => confirm("Delete this entry?") && deleteEntry(entry.id)}
                    className="text-zinc-500 hover:text-red-400 p-2 rounded-lg hover:bg-zinc-800 transition-colors">
                    🗑️
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
