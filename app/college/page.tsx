"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useCollegeData, wc, CollegeData } from "./useCollegeData";
import CollegeNav from "./CollegeNav";

const COLLEGE_KEY = "applywell_college_data";

export default function CollegePage() {
  const { data, ready } = useCollegeData();
  const fileRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<"idle" | "ok" | "error">("idle");
  const [importMsg, setImportMsg] = useState("");

  const actCount = data.activities.length;
  const essayCount = data.essays.length;
  const essaysInRange = data.essays.filter(e => {
    const limit = parseInt(e.wordLimit) || 0;
    if (!limit) return false;
    const words = wc(e.body);
    return words >= Math.floor(limit * 0.85) && words <= limit;
  }).length;

  const cards = [
    {
      href: "/college/activities",
      icon: "🎯",
      title: "Activities",
      stat: ready ? `${actCount} / 10 added` : "—",
      sub: "Position, org, hours, description",
      ring: "border-blue-500/30 bg-blue-500/5 hover:border-blue-500/50",
      statColor: actCount >= 10 ? "text-amber-400" : "text-blue-400",
    },
    {
      href: "/college/essays",
      icon: "✍️",
      title: "Essays",
      stat: ready ? `${essayCount} drafted` : "—",
      sub: ready && essayCount > 0
        ? `${essaysInRange} within word limit`
        : "Track word counts & checklist",
      ring: "border-purple-500/30 bg-purple-500/5 hover:border-purple-500/50",
      statColor: "text-purple-400",
    },
    {
      href: "/college/review",
      icon: "✅",
      title: "Review",
      stat: "Check status",
      sub: "Readiness checklist before applying",
      ring: "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50",
      statColor: "text-emerald-400",
    },
  ];

  // ── Import college backup ─────────────────────────────────────────────────
  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const raw = JSON.parse(ev.target?.result as string);
        // Accept { college: {...} } (our backup format) or raw CollegeData
        const incoming: CollegeData = raw.college ?? raw;
        if (!Array.isArray(incoming.activities) || !Array.isArray(incoming.essays)) {
          throw new Error("Invalid format");
        }
        // Merge: add new items, keep existing ones by ID
        const existing: CollegeData = (() => {
          try {
            return JSON.parse(localStorage.getItem(COLLEGE_KEY) || "{}");
          } catch {
            return { activities: [], essays: [] };
          }
        })();
        const existingActIds = new Set((existing.activities ?? []).map((a: { id: string }) => a.id));
        const existingEssayIds = new Set((existing.essays ?? []).map((e: { id: string }) => e.id));
        const merged: CollegeData = {
          activities: [
            ...(existing.activities ?? []),
            ...incoming.activities.filter(a => !existingActIds.has(a.id)),
          ],
          essays: [
            ...(existing.essays ?? []),
            ...incoming.essays.filter(e => !existingEssayIds.has(e.id)),
          ],
        };
        localStorage.setItem(COLLEGE_KEY, JSON.stringify(merged));
        setImportStatus("ok");
        setImportMsg("Imported successfully — reloading…");
        setTimeout(() => window.location.reload(), 900);
      } catch {
        setImportStatus("error");
        setImportMsg("Invalid file — use a .json backup exported from this app.");
        setTimeout(() => setImportStatus("idle"), 4000);
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="py-6 animate-fade-in">
      <CollegeNav />

      <div className="mb-5">
        <h1 className="font-serif text-2xl mb-1">College Applications</h1>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Organize your college applications clearly and confidently.
        </p>
        <p className="text-xs text-zinc-600 mt-1.5">
          Start here → Add activities, draft essays, then run Review before submitting.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3 mb-5">
        {cards.map(card => (
          <Link key={card.href} href={card.href}
            className={`block border rounded-xl p-4 transition-all ${card.ring}`}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl flex-shrink-0">{card.icon}</span>
                <div className="min-w-0">
                  <div className="font-semibold text-sm">{card.title}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{card.sub}</div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className={`text-sm font-bold tabular-nums ${card.statColor}`}>{card.stat}</div>
                <div className="text-xs text-zinc-600 mt-0.5">→</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col gap-2 mb-6">
        <Link href="/college/activities"
          className="block w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl py-3 text-sm text-center transition-colors">
          🎯 Go to Activities →
        </Link>
        <Link href="/college/essays"
          className="block w-full bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-xl py-3 text-sm text-center transition-colors">
          ✍️ Go to Essays →
        </Link>
        <Link href="/college/review"
          className="block w-full border border-emerald-500/50 hover:border-emerald-500 text-emerald-400 hover:text-emerald-300 font-semibold rounded-xl py-3 text-sm text-center transition-colors">
          ✅ Run Review →
        </Link>
      </div>

      {/* Common App quick facts */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
          Common App Quick Facts
        </p>
        <div className="flex flex-col gap-2.5">
          {[
            ["🎯", "Activity descriptions: 150 character max"],
            ["✍️", "Personal statement: 250–650 words"],
            ["📝", "Most supplementals: 150–250 words"],
            ["🔢", "Maximum 10 activities on Common App"],
            ["📅", "Most EA deadlines: November 1–15"],
          ].map(([icon, tip]) => (
            <div key={tip as string} className="flex gap-2.5 text-xs text-zinc-400 leading-relaxed">
              <span className="flex-shrink-0">{icon}</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Import backup */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
          Import College Backup
        </p>
        <p className="text-xs text-zinc-600 mb-3">
          Restore from a .json file exported via the Review page. New entries are merged — existing data is kept.
        </p>
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-zinc-200 rounded-xl py-2.5 text-sm font-medium transition-colors"
        >
          📂 Choose College Backup (.json)
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={handleImport}
        />
        {importStatus === "ok" && (
          <p className="text-xs text-emerald-400 mt-2 text-center">{importMsg}</p>
        )}
        {importStatus === "error" && (
          <p className="text-xs text-red-400 mt-2 text-center">{importMsg}</p>
        )}
      </div>
    </div>
  );
}
