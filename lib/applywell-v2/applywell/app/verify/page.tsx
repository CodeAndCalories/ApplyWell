"use client";

import Link from "next/link";
import { useApp } from "@/lib/context";
import { Badge, Disclaimer, EmptyState } from "@/components/ui";

const DECLARATIONS = [
  "All information is accurate to the best of my knowledge",
  "I have not fabricated, exaggerated, or misrepresented any information",
  "I understand this is a writing tool, not official admissions advice",
  "I will review and fact-check the final exported documents before submitting",
];

export default function VerifyPage() {
  const { state, verifyEntry } = useApp();
  const { entries } = state;

  const allVerified = entries.length > 0 && entries.every((e) => e.verified);
  const unverifiedCount = entries.filter((e) => !e.verified).length;

  return (
    <div className="py-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-2xl flex-shrink-0">
          🛡️
        </div>
        <div>
          <h1 className="font-serif text-2xl">Honesty Review</h1>
          <p className="text-zinc-500 text-sm">Verify every entry before exporting</p>
        </div>
      </div>

      <Disclaimer>
        By checking each item, you confirm it accurately represents your real experience. False or exaggerated information on college applications can result in rescinded admissions offers and other serious consequences.
      </Disclaimer>

      {entries.length === 0 ? (
        <div className="mt-6">
          <EmptyState icon="✅" title="No entries to verify"
            subtitle="Add entries first, then return here to verify them before export."
            action={
              <Link href="/entries/new"
                className="bg-emerald-400 text-zinc-900 font-semibold rounded-xl px-5 py-2.5 text-sm inline-block">
                Add Entry
              </Link>
            } />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 my-5">
            {entries.map((entry) => (
              <label key={entry.id}
                className={`bg-zinc-900 rounded-xl p-4 flex gap-4 items-start cursor-pointer border transition-colors
                  ${entry.verified ? "border-emerald-400/30" : "border-zinc-800"}`}>
                <input type="checkbox" checked={!!entry.verified}
                  onChange={(e) => verifyEntry(entry.id, e.target.checked)}
                  className="mt-1 flex-shrink-0 w-4 h-4" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <Badge type={entry.type} />
                    {entry.verified && (
                      <span className="text-xs font-semibold text-emerald-400">✓ Confirmed accurate</span>
                    )}
                  </div>
                  <div className="font-semibold text-sm">{entry.title}</div>
                  {entry.org && <div className="text-xs text-zinc-500">{entry.org}</div>}
                  {entry.description && (
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed line-clamp-3">
                      {entry.description}
                    </p>
                  )}
                  {entry.bullets?.length > 0 && (
                    <div className="mt-2">
                      {entry.bullets.map((b, i) => (
                        <div key={i} className="text-xs text-zinc-500 flex gap-1.5">
                          <span>•</span><span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {!entry.verified && (
                    <div className="text-xs text-zinc-600 mt-2">Check to confirm this entry is accurate</div>
                  )}
                </div>
              </label>
            ))}
          </div>

          {/* Final declarations */}
          <div className={`bg-zinc-900 border rounded-xl p-5 mb-5 transition-colors
            ${allVerified ? "border-emerald-400/30" : "border-zinc-800"}`}>
            <div className="font-semibold text-sm mb-3">Before you export, confirm:</div>
            <div className="flex flex-col divide-y divide-zinc-800">
              {DECLARATIONS.map((s, i) => (
                <div key={i} className="flex gap-3 items-start py-3 text-sm text-zinc-400">
                  <span className={`flex-shrink-0 mt-0.5 ${allVerified ? "text-emerald-400" : "text-zinc-700"}`}>
                    {allVerified ? "✓" : "○"}
                  </span>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {allVerified ? (
            <Link href="/export"
              className="block w-full bg-emerald-400 text-zinc-900 font-semibold rounded-xl py-3.5 text-center text-sm hover:opacity-90 transition-opacity">
              ⬇️ Proceed to Export
            </Link>
          ) : (
            <div>
              <button disabled
                className="w-full bg-emerald-400/20 text-emerald-400/50 font-semibold rounded-xl py-3.5 text-sm cursor-not-allowed">
                ⬇️ Proceed to Export
              </button>
              <p className="text-center text-xs text-zinc-600 mt-2">
                Verify {unverifiedCount} remaining {unverifiedCount === 1 ? "entry" : "entries"} to continue
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
