export const dynamic = "force-dynamic";

"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { Badge, CharCounter, Disclaimer, EmptyState } from "@/components/ui";
import { optimizeActivityDescription } from "@/lib/ai/aiClient";
import { Entry } from "@/lib/types";
import Link from "next/link";

const ACTIVITY_TYPES = ["Activity","Sport","Volunteer","Work","Project","Skill","Certification"];

export default function ActivitiesPage() {
  const { state } = useApp();
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const entries = state.entries.filter((e) => ACTIVITY_TYPES.includes(e.type));

  const generate = async (entry: Entry) => {
    setLoading((l) => ({ ...l, [entry.id]: true }));
    try {
      const result = await optimizeActivityDescription(entry);
      setDescriptions((d) => ({ ...d, [entry.id]: result }));
    } finally {
      setLoading((l) => ({ ...l, [entry.id]: false }));
    }
  };

  const getDesc = (entry: Entry) => descriptions[entry.id] ?? entry.description ?? "";

  return (
    <div className="py-8 animate-fade-in">
      <h1 className="font-serif text-2xl mb-2">Common App Activities</h1>
      <p className="text-zinc-500 text-sm mb-4 leading-relaxed">
        150 characters for description · 50 characters for position/leadership.
        Edit and verify every word before copying to Common App.
      </p>
      <Disclaimer>
        You must review and confirm every description. Never submit language you haven&apos;t personally verified as accurate.
      </Disclaimer>

      {entries.length === 0 ? (
        <div className="mt-6">
          <EmptyState icon="📋" title="No activities yet"
            subtitle="Add activities, sports, volunteer work, jobs, and projects in your Entries."
            action={
              <Link href="/entries/new"
                className="bg-emerald-400 text-zinc-900 font-semibold rounded-xl px-5 py-2.5 text-sm inline-block">
                Add Entry
              </Link>
            } />
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-5">
          {entries.map((entry) => {
            const desc = getDesc(entry);
            return (
              <div key={entry.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <Badge type={entry.type} />
                    <div className="font-semibold mt-2">{entry.title}</div>
                    {entry.org && <div className="text-xs text-zinc-500">{entry.org}</div>}
                  </div>
                  <button onClick={() => generate(entry)} disabled={loading[entry.id]}
                    className="flex-shrink-0 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-xl px-3 py-2 text-xs font-semibold disabled:opacity-50 hover:border-zinc-500 transition-colors">
                    {loading[entry.id] ? "…" : "✨ AI Draft"}
                  </button>
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                    Position / Leadership (50 char max)
                  </label>
                  <input maxLength={50} defaultValue={entry.title.slice(0, 50)}
                    placeholder="e.g. Captain, Founder, Lead Organizer" />
                  <CharCounter value={entry.title.slice(0, 50)} max={50} />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                    Description (150 char max)
                  </label>
                  <textarea rows={3} maxLength={150} value={desc}
                    onChange={(e) => setDescriptions((d) => ({ ...d, [entry.id]: e.target.value }))}
                    placeholder="Describe your role and impact in 150 characters…" />
                  <CharCounter value={desc} max={150} />
                </div>

                {(entry.hrsPerWeek || entry.weeksPerYear) && (
                  <div className="text-xs text-zinc-600 mt-2">
                    ⏱ {entry.hrsPerWeek} hrs/wk · {entry.weeksPerYear} wks/yr
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
