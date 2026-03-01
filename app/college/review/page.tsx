"use client";

import { useState } from "react";
import Link from "next/link";
import { useCollegeData, wc } from "../useCollegeData";
import CollegeNav from "../CollegeNav";

const FINAL_CHECKS = [
  { id: "acts", label: "Activities complete and within 150 characters" },
  { id: "essays", label: "All essays within word limit" },
  { id: "info", label: "All information verified and accurate" },
  { id: "read", label: "Read everything aloud at least once" },
  { id: "peer", label: "Peer or counselor has reviewed" },
];

export default function ReviewPage() {
  const { data, ready } = useCollegeData();
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  function toggle(id: string) {
    setChecks(c => ({ ...c, [id]: !c[id] }));
  }

  const actCount = data.activities.length;
  const actOverLimit = data.activities.filter(a => a.description.length > 150).length;
  const doneCount = Object.values(checks).filter(Boolean).length;
  const allDone = doneCount === FINAL_CHECKS.length;

  return (
    <div className="py-6 animate-fade-in">
      <CollegeNav />

      <div className="mb-6">
        <h1 className="font-serif text-2xl mb-1">Review</h1>
        <p className="text-zinc-500 text-sm">Check everything before you submit.</p>
      </div>

      {!ready ? (
        <div className="text-center py-16 text-zinc-600 text-sm">Loading…</div>
      ) : (
        <>
          {/* ── Activities Summary ── */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Activities</p>
              <Link href="/college/activities" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                Edit →
              </Link>
            </div>

            <div className="flex gap-4 mb-3">
              <div className="flex-1 bg-zinc-800 rounded-lg p-3 text-center">
                <div className={`text-2xl font-bold tabular-nums ${actCount >= 10 ? "text-amber-400" : "text-blue-400"}`}>
                  {actCount}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">of 10 added</div>
              </div>
              <div className="flex-1 bg-zinc-800 rounded-lg p-3 text-center">
                <div className={`text-2xl font-bold tabular-nums ${actOverLimit > 0 ? "text-red-400" : "text-emerald-400"}`}>
                  {actOverLimit}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">over 150 chars</div>
              </div>
            </div>

            {actCount === 0 && (
              <p className="text-xs text-zinc-600 text-center py-2">No activities added yet.</p>
            )}

            {actCount > 0 && (
              <div className="flex flex-col gap-2">
                {data.activities.map((a, idx) => {
                  const over = a.description.length > 150;
                  return (
                    <div key={a.id} className="flex items-center justify-between gap-2">
                      <span className="text-xs text-zinc-400 truncate">
                        {idx + 1}. {a.role} — {a.org}
                      </span>
                      <span className={`text-xs font-semibold tabular-nums flex-shrink-0 ${over ? "text-red-400" : "text-zinc-600"}`}>
                        {a.description.length}/150 {over ? "⚠️" : "✓"}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Essays Summary ── */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Essays</p>
              <Link href="/college/essays" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                Edit →
              </Link>
            </div>

            {data.essays.length === 0 ? (
              <p className="text-xs text-zinc-600 text-center py-2">No essays added yet.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {data.essays.map(essay => {
                  const words = wc(essay.body);
                  const lim = parseInt(essay.wordLimit) || 0;
                  const over = lim > 0 && words > lim;
                  const near = lim > 0 && words >= Math.floor(lim * 0.85) && !over;
                  const under = lim > 0 && words < Math.floor(lim * 0.85);
                  const pct = lim > 0 ? Math.min((words / lim) * 100, 100) : 0;
                  const doneChecks = essay.checklist.filter(c => c.done).length;

                  return (
                    <div key={essay.id} className="bg-zinc-800/50 rounded-lg p-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold text-zinc-300 leading-tight">{essay.prompt}</span>
                        <span className={`text-xs font-bold tabular-nums flex-shrink-0
                          ${over ? "text-red-400" : near ? "text-emerald-400" : "text-zinc-500"}`}>
                          {words}{lim > 0 ? `/${lim}` : ""} {over ? "⚠️" : near ? "✓" : ""}
                        </span>
                      </div>

                      {lim > 0 && (
                        <div className="h-1 bg-zinc-700 rounded-full overflow-hidden mb-2">
                          <div style={{ width: `${pct}%` }}
                            className={`h-full rounded-full ${over ? "bg-red-500" : near ? "bg-emerald-500" : "bg-zinc-500"}`} />
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs">
                        <span className={`${over ? "text-red-400" : near ? "text-emerald-400" : under ? "text-amber-400" : "text-zinc-600"}`}>
                          {over && `${words - lim} words over limit`}
                          {near && "Within word limit ✓"}
                          {under && lim > 0 && `${lim - words} words under 85% threshold`}
                          {!lim && "No word limit set"}
                        </span>
                        <span className="text-zinc-600">
                          Checklist {doneChecks}/{essay.checklist.length}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Final Checklist ── */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Final Checklist
            </p>
            <div className="flex flex-col gap-3">
              {FINAL_CHECKS.map(item => (
                <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={!!checks[item.id]}
                    onChange={() => toggle(item.id)} />
                  <span className={`text-sm leading-tight transition-colors
                    ${checks[item.id] ? "line-through text-zinc-600" : "text-zinc-300 group-hover:text-zinc-200"}`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-500">{doneCount} of {FINAL_CHECKS.length} complete</span>
                <span className={`text-xs font-bold ${allDone ? "text-emerald-400" : "text-zinc-600"}`}>
                  {allDone ? "Ready to submit! 🎉" : `${FINAL_CHECKS.length - doneCount} remaining`}
                </span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  style={{ width: `${(doneCount / FINAL_CHECKS.length) * 100}%` }}
                  className={`h-full rounded-full transition-all duration-500 ${allDone ? "bg-emerald-500" : "bg-blue-500"}`}
                />
              </div>
            </div>
          </div>

          {/* ── Ready state banner ── */}
          {allDone && (
            <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-xl p-4 text-center animate-fade-in">
              <div className="text-2xl mb-1">🎓</div>
              <div className="font-semibold text-emerald-400 mb-1">You're ready to apply!</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Everything looks good. Double-check each school's portal before submitting.
              </p>
            </div>
          )}

          {/* Quick nav */}
          {!allDone && (actOverLimit > 0 || data.essays.some(e => {
            const l = parseInt(e.wordLimit) || 0;
            return l > 0 && wc(e.body) > l;
          })) && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-red-400 mb-2">⚠️ Action needed</p>
              <div className="flex flex-col gap-1.5">
                {actOverLimit > 0 && (
                  <Link href="/college/activities" className="text-xs text-red-300 hover:text-red-200 transition-colors">
                    → {actOverLimit} activit{actOverLimit > 1 ? "ies" : "y"} over 150 characters
                  </Link>
                )}
                {data.essays.filter(e => {
                  const l = parseInt(e.wordLimit) || 0;
                  return l > 0 && wc(e.body) > l;
                }).map(e => (
                  <Link key={e.id} href="/college/essays" className="text-xs text-red-300 hover:text-red-200 transition-colors">
                    → "{e.prompt}" is over the word limit
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
