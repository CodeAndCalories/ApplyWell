"use client";

import { useState } from "react";
import Link from "next/link";
import { useCollegeData, wc } from "../useCollegeData";
import CollegeNav from "../CollegeNav";

// ── Checklist sections (12 items total) ───────────────────────────────────────

const ACTIVITIES_QUALITY = [
  { id: "aq_under150",   label: "Every description is under 150 characters" },
  { id: "aq_novague",    label: "No vague filler — \"helped with\" or \"participated in\"" },
  { id: "aq_roleimpact", label: "Each entry shows a specific role and measurable impact" },
];

const ESSAYS_QUALITY = [
  { id: "eq_withinlimit", label: "All essays are within their word limits" },
  { id: "eq_specific",    label: "Each essay uses specific details, not generalities" },
  { id: "eq_nogeneric",   label: "No generic claims — \"I am a hard worker\" etc." },
  { id: "eq_voice",       label: "Written in your own voice — sounds like you" },
];

const LOGISTICS = [
  { id: "lg_deadlines",    label: "All school deadlines noted and calendared" },
  { id: "lg_recommenders", label: "Recommenders contacted and confirmed" },
  { id: "lg_transcript",   label: "Transcript request submitted to school counselor" },
  { id: "lg_testscores",   label: "Test scores sent to schools (if required or beneficial)" },
  { id: "lg_commonapp",    label: "Common App account created and school list finalized" },
];

const ALL_CHECKS = [...ACTIVITIES_QUALITY, ...ESSAYS_QUALITY, ...LOGISTICS];
const TOTAL = ALL_CHECKS.length; // 12

// ── Helpers ───────────────────────────────────────────────────────────────────

function hardTrunc(s: string, max = 150): string {
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + "…";
}

function buildTxtPacket(
  data: ReturnType<typeof useCollegeData>["data"],
  checks: Record<string, boolean>
): string {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
  const hr40 = "-".repeat(40);
  const hr60 = "=".repeat(60);
  const lines: string[] = [];

  lines.push(hr60);
  lines.push("  COLLEGE APPLICATION PACKET — ApplyWell");
  lines.push(`  Exported: ${date}`);
  lines.push(hr60);
  lines.push("");

  // Activities
  lines.push("ACTIVITIES");
  lines.push(hr40);
  if (data.activities.length === 0) {
    lines.push("  (no activities added)");
  } else {
    data.activities.forEach((a, i) => {
      const descLen = a.description.length;
      const desc = hardTrunc(a.description, 150);
      const truncated = descLen > 150;
      lines.push(`${i + 1}. ${a.role}`);
      lines.push(`   Org: ${a.org}${a.grades ? ` | Grades: ${a.grades}` : ""}`);
      if (a.hrsPerWeek || a.weeksPerYear) {
        lines.push(`   Time: ${a.hrsPerWeek || "—"} hrs/wk · ${a.weeksPerYear || "—"} wks/yr`);
      }
      lines.push(`   Description [${Math.min(descLen, 150)}/150 chars${truncated ? " — TRUNCATED" : ""}]:`);
      lines.push(`   ${desc}`);
      lines.push("");
    });
  }

  lines.push("");
  lines.push("ESSAYS");
  lines.push(hr40);
  if (data.essays.length === 0) {
    lines.push("  (no essays added)");
  } else {
    data.essays.forEach((e, i) => {
      const words = wc(e.body);
      const lim = parseInt(e.wordLimit) || 0;
      lines.push(`${i + 1}. ${e.prompt}`);
      lines.push(`   Word count: ${words}${lim > 0 ? ` / ${lim}` : " (no limit set)"}`);
      lines.push("");
      lines.push(e.body.trim() || "  (no draft yet)");
      lines.push("");
      if (i < data.essays.length - 1) lines.push(hr40);
    });
  }

  lines.push("");
  lines.push("REVIEW CHECKLIST");
  lines.push(hr40);
  const sections = [
    { title: "Activities Quality", items: ACTIVITIES_QUALITY },
    { title: "Essays Quality",     items: ESSAYS_QUALITY     },
    { title: "Logistics",          items: LOGISTICS           },
  ];
  sections.forEach(({ title, items }) => {
    lines.push(`${title}:`);
    items.forEach(item => {
      lines.push(`  ${checks[item.id] ? "[✓]" : "[ ]"} ${item.label}`);
    });
    lines.push("");
  });

  const done = Object.values(checks).filter(Boolean).length;
  lines.push(`Checklist: ${done}/${TOTAL} complete`);
  lines.push(`Exported: ${date}`);
  lines.push(hr60);

  return lines.join("\n");
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ReviewPage() {
  const { data, ready } = useCollegeData();
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  function toggle(id: string) {
    setChecks(c => ({ ...c, [id]: !c[id] }));
  }

  const actCount = data.activities.length;
  const actOverLimit = data.activities.filter(a => a.description.length > 150).length;
  const essaysOverLimit = data.essays.filter(e => {
    const l = parseInt(e.wordLimit) || 0;
    return l > 0 && wc(e.body) > l;
  });

  const doneCount = Object.values(checks).filter(Boolean).length;
  const allDone = doneCount === TOTAL;
  const remaining = TOTAL - doneCount;

  // ── A) Download .txt packet ───────────────────────────────────────────────
  function downloadTxt() {
    const text = buildTxtPacket(data, checks);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `applywell-college-packet-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ── B) Copy activities to clipboard ──────────────────────────────────────
  async function copyActivities() {
    if (data.activities.length === 0) {
      alert("No activities to copy.");
      return;
    }
    const lines = data.activities.map((a, i) => {
      const parts: string[] = [
        `${i + 1}. ${a.role}`,
        `   ${a.org}`,
      ];
      if (a.hrsPerWeek || a.weeksPerYear) {
        parts.push(`   ${a.hrsPerWeek || "—"} hrs/wk · ${a.weeksPerYear || "—"} wks/yr`);
      }
      parts.push(`   ${hardTrunc(a.description, 150)}`);
      return parts.join("\n");
    });
    try {
      await navigator.clipboard.writeText(lines.join("\n\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      alert("Clipboard unavailable — copy manually from the Activities page.");
    }
  }

  // ── C) Download .json backup ──────────────────────────────────────────────
  function downloadJson() {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      college: data,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `applywell-college-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="py-6 animate-fade-in">
      <CollegeNav />

      {/* Back to overview */}
      <Link href="/college" className="inline-flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-400 transition-colors mb-4">
        ← Back to overview
      </Link>

      <div className="mb-6">
        <h1 className="font-serif text-2xl mb-1">Review</h1>
        <p className="text-zinc-500 text-sm">Check everything before you submit.</p>
      </div>

      {!ready ? (
        <div className="text-center py-16 text-zinc-600 text-sm">Loading…</div>
      ) : (
        <>
          {/* ── Action needed banner ──────────────────────────────────────── */}
          {(actOverLimit > 0 || essaysOverLimit.length > 0) && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
              <p className="text-xs font-semibold text-red-400 mb-2">⚠️ Fix before submitting</p>
              <div className="flex flex-col gap-1.5">
                {actOverLimit > 0 && (
                  <Link href="/college/activities" className="text-xs text-red-300 hover:text-red-200 transition-colors">
                    → {actOverLimit} activit{actOverLimit > 1 ? "ies" : "y"} over 150 characters
                  </Link>
                )}
                {essaysOverLimit.map(e => (
                  <Link key={e.id} href="/college/essays" className="text-xs text-red-300 hover:text-red-200 transition-colors">
                    → &ldquo;{e.prompt}&rdquo; is over the word limit
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── Activities data summary ───────────────────────────────────── */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Activities</p>
              <Link href="/college/activities" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Edit →</Link>
            </div>
            <div className="flex gap-4 mb-3">
              <div className="flex-1 bg-zinc-800 rounded-lg p-3 text-center">
                <div className={`text-2xl font-bold tabular-nums ${actCount >= 10 ? "text-amber-400" : "text-blue-400"}`}>{actCount}</div>
                <div className="text-xs text-zinc-500 mt-0.5">of 10 added</div>
              </div>
              <div className="flex-1 bg-zinc-800 rounded-lg p-3 text-center">
                <div className={`text-2xl font-bold tabular-nums ${actOverLimit > 0 ? "text-red-400" : "text-emerald-400"}`}>{actOverLimit}</div>
                <div className="text-xs text-zinc-500 mt-0.5">over 150 chars</div>
              </div>
            </div>
            {actCount === 0 ? (
              <p className="text-xs text-zinc-600 text-center py-1">No activities added yet.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {data.activities.map((a, idx) => {
                  const over = a.description.length > 150;
                  return (
                    <div key={a.id} className="flex items-center justify-between gap-2">
                      <span className="text-xs text-zinc-400 truncate">{idx + 1}. {a.role} — {a.org}</span>
                      <span className={`text-xs font-semibold tabular-nums flex-shrink-0 ${over ? "text-red-400" : "text-zinc-600"}`}>
                        {a.description.length}/150 {over ? "⚠️" : "✓"}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Essays data summary ───────────────────────────────────────── */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Essays</p>
              <Link href="/college/essays" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">Edit →</Link>
            </div>
            {data.essays.length === 0 ? (
              <p className="text-xs text-zinc-600 text-center py-1">No essays added yet.</p>
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
                        <span className={`text-xs font-bold tabular-nums flex-shrink-0 ${over ? "text-red-400" : near ? "text-emerald-400" : "text-zinc-500"}`}>
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
                        <span className="text-zinc-600">Checklist {doneChecks}/{essay.checklist.length}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Activities quality checklist ─────────────────────────────── */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Activities Quality</p>
            <div className="flex flex-col gap-3">
              {ACTIVITIES_QUALITY.map(item => (
                <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" checked={!!checks[item.id]} onChange={() => toggle(item.id)} className="mt-0.5 flex-shrink-0" />
                  <span className={`text-sm leading-tight transition-colors ${checks[item.id] ? "line-through text-zinc-600" : "text-zinc-300 group-hover:text-zinc-200"}`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* ── Essays quality checklist ──────────────────────────────────── */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Essays Quality</p>
            <div className="flex flex-col gap-3">
              {ESSAYS_QUALITY.map(item => (
                <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" checked={!!checks[item.id]} onChange={() => toggle(item.id)} className="mt-0.5 flex-shrink-0" />
                  <span className={`text-sm leading-tight transition-colors ${checks[item.id] ? "line-through text-zinc-600" : "text-zinc-300 group-hover:text-zinc-200"}`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* ── Logistics checklist ───────────────────────────────────────── */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Logistics</p>
            <div className="flex flex-col gap-3">
              {LOGISTICS.map(item => (
                <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" checked={!!checks[item.id]} onChange={() => toggle(item.id)} className="mt-0.5 flex-shrink-0" />
                  <span className={`text-sm leading-tight transition-colors ${checks[item.id] ? "line-through text-zinc-600" : "text-zinc-300 group-hover:text-zinc-200"}`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* ── Overall progress ─────────────────────────────────────────── */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-500">{doneCount} of {TOTAL} items complete</span>
              <span className={`text-xs font-bold ${allDone ? "text-emerald-400" : "text-zinc-600"}`}>
                {allDone ? "Ready to submit! 🎉" : `${remaining} remaining`}
              </span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                style={{ width: `${(doneCount / TOTAL) * 100}%` }}
                className={`h-full rounded-full transition-all duration-500 ${allDone ? "bg-emerald-500" : "bg-blue-500"}`}
              />
            </div>
          </div>

          {/* ── Ready banner ─────────────────────────────────────────────── */}
          {allDone && (
            <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-xl p-4 text-center animate-fade-in mb-4">
              <div className="text-2xl mb-1">🎓</div>
              <div className="font-semibold text-emerald-400 mb-1">You&apos;re ready to apply!</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Everything looks good. Double-check each school&apos;s portal before submitting.
              </p>
            </div>
          )}

          {/* ── Export panel ─────────────────────────────────────────────── */}
          <div className={`rounded-xl p-4 mb-4 border transition-all ${
            allDone ? "bg-zinc-900 border-emerald-500/30" : "bg-zinc-900/40 border-zinc-800"
          }`}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold text-zinc-200">Export your application packet</p>
              {!allDone && (
                <span className="text-xs text-zinc-600 tabular-nums">{remaining} item{remaining !== 1 ? "s" : ""} left</span>
              )}
            </div>
            <p className="text-xs text-zinc-500 mb-4">
              {allDone
                ? "Download or share your materials in the format that works for you."
                : "Complete the Review checklist above to unlock export."}
            </p>

            <div className="flex flex-col gap-2">
              {/* A) txt */}
              <button
                onClick={allDone ? downloadTxt : undefined}
                disabled={!allDone}
                className={`flex items-center gap-3 rounded-xl p-3 text-left border transition-all ${
                  allDone
                    ? "bg-zinc-800 border-zinc-700 hover:border-emerald-500/50 hover:bg-zinc-700 cursor-pointer"
                    : "bg-zinc-800/20 border-zinc-800/50 opacity-40 cursor-not-allowed"
                }`}
              >
                <span className="text-xl flex-shrink-0">📄</span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-zinc-200">Download College Packet (.txt)</div>
                  <div className="text-xs text-zinc-500">Activities, essays, checklist summary — one file</div>
                </div>
              </button>

              {/* B) clipboard */}
              <button
                onClick={allDone ? copyActivities : undefined}
                disabled={!allDone}
                className={`flex items-center gap-3 rounded-xl p-3 text-left border transition-all ${
                  allDone
                    ? "bg-zinc-800 border-zinc-700 hover:border-blue-500/50 hover:bg-zinc-700 cursor-pointer"
                    : "bg-zinc-800/20 border-zinc-800/50 opacity-40 cursor-not-allowed"
                }`}
              >
                <span className="text-xl flex-shrink-0">{copied ? "✅" : "📋"}</span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-zinc-200">
                    {copied ? "Copied to clipboard!" : "Copy Activities for Common App"}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {copied
                      ? "Paste directly into Common App"
                      : "Role, org, hours, description — truncated to 150 chars"}
                  </div>
                </div>
              </button>

              {/* C) json */}
              <button
                onClick={allDone ? downloadJson : undefined}
                disabled={!allDone}
                className={`flex items-center gap-3 rounded-xl p-3 text-left border transition-all ${
                  allDone
                    ? "bg-zinc-800 border-zinc-700 hover:border-purple-500/50 hover:bg-zinc-700 cursor-pointer"
                    : "bg-zinc-800/20 border-zinc-800/50 opacity-40 cursor-not-allowed"
                }`}
              >
                <span className="text-xl flex-shrink-0">💾</span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-zinc-200">Download College Backup (.json)</div>
                  <div className="text-xs text-zinc-500">Re-importable backup of your college data</div>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
