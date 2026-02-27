"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import { Entry, ENTRY_TYPES } from "@/lib/types";
import { Disclaimer, CharCounter, Field } from "@/components/ui";
import { generateResumeBullets } from "@/lib/ai/aiClient";

interface Props {
  initial?: Entry;
}

const BLANK: Omit<Entry, "id"> = {
  type: "Activity", title: "", org: "", startDate: "", endDate: "",
  hrsPerWeek: "", weeksPerYear: "", description: "", notes: "",
  bullets: [], verified: false,
};

export default function EntryForm({ initial }: Props) {
  const router = useRouter();
  const { state, saveEntry } = useApp();
  const [form, setForm] = useState<Omit<Entry, "id">>(initial ?? BLANK);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiBullets, setAiBullets] = useState<string[]>([]);
  const [selectedBullets, setSelectedBullets] = useState<string[]>(initial?.bullets ?? []);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleBullet = (b: string) =>
    setSelectedBullets((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]);

  const handleGenerate = async () => {
    if (!form.title.trim()) { alert("Please enter a title first."); return; }
    setAiLoading(true);
    try {
      const bullets = await generateResumeBullets(state.profile, { ...form, id: initial?.id ?? "" });
      setAiBullets(bullets);
    } finally { setAiLoading(false); }
  };

  const handleSave = () => {
    if (!form.title.trim()) { alert("Title is required."); return; }
    saveEntry({
      ...form,
      id: initial?.id ?? `e_${Date.now()}`,
      bullets: selectedBullets,
    });
    router.push("/entries");
  };

  const noTimeTypes = ["Award", "Certification", "Skill"];

  return (
    <div className="py-8 animate-fade-in">
      <button onClick={() => router.back()} className="text-zinc-500 text-sm mb-6 flex items-center gap-2 hover:text-zinc-300">
        ← Back
      </button>

      <h1 className="font-serif text-2xl mb-6">{initial ? "Edit Entry" : "New Entry"}</h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-4">
        <Field label="Type">
          <select value={form.type} onChange={(e) => set("type", e.target.value as Entry["type"])}>
            {ENTRY_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>

        <Field label="Title / Role *">
          <input value={form.title} onChange={(e) => set("title", e.target.value)}
            placeholder={form.type === "Award" ? "e.g. National Merit Semifinalist" : "e.g. Robotics Club Captain"} />
        </Field>

        <Field label="Organization / School / Company">
          <input value={form.org} onChange={(e) => set("org", e.target.value)} placeholder="e.g. Westlake High School" />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Start Date">
            <input type="month" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
          </Field>
          <Field label="End Date">
            <input type="month" value={form.endDate} onChange={(e) => set("endDate", e.target.value)}
              placeholder="Blank = present" />
          </Field>
        </div>

        {!noTimeTypes.includes(form.type) && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Hrs/Week" hint="Include practice, prep, commute">
              <input type="number" min="0" max="168" value={form.hrsPerWeek}
                onChange={(e) => set("hrsPerWeek", e.target.value)} placeholder="e.g. 10" />
            </Field>
            <Field label="Weeks/Year">
              <input type="number" min="0" max="52" value={form.weeksPerYear}
                onChange={(e) => set("weeksPerYear", e.target.value)} placeholder="e.g. 36" />
            </Field>
          </div>
        )}

        <Field label="Description">
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)}
            placeholder="What did you do? What was your role? What did you achieve?" />
          <CharCounter value={form.description} max={300} />
        </Field>

        <Field label="Impact / Metrics (optional)"
          hint="Numbers matter: raised $X, led Y people, won Z place, improved by N%. Estimate if unsure — you'll verify before export.">
          <input value={form.notes} onChange={(e) => set("notes", e.target.value)}
            placeholder="e.g. Led 15-person team, raised $3,000, won regional championship" />
        </Field>
      </div>

      {/* AI bullet helper */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="font-semibold text-sm">AI Resume Bullets</div>
            <div className="text-xs text-zinc-500 mt-0.5">
              AI-suggested bullets based on your input. Select only what&apos;s true.
            </div>
          </div>
          <button onClick={handleGenerate} disabled={aiLoading}
            className="flex-shrink-0 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-xl px-4 py-2 text-xs font-semibold hover:border-zinc-500 disabled:opacity-50 transition-colors">
            {aiLoading ? "Generating…" : "✨ Generate"}
          </button>
        </div>

        {aiLoading && (
          <div className="flex flex-col gap-2">
            {[80, 95, 70].map((w, i) => (
              <div key={i} className="h-4 rounded bg-zinc-700 animate-pulse" style={{ width: `${w}%` }} />
            ))}
          </div>
        )}

        {aiBullets.length > 0 && (
          <div>
            <Disclaimer>Review each bullet carefully. Only check bullets that are 100% accurate and truly reflect your experience.</Disclaimer>
            <div className="mt-3 flex flex-col divide-y divide-zinc-800">
              {aiBullets.map((b, i) => (
                <label key={i} className="flex gap-3 items-start py-3 cursor-pointer">
                  <input type="checkbox" checked={selectedBullets.includes(b)} onChange={() => toggleBullet(b)}
                    className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm leading-relaxed text-zinc-300">{b}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {selectedBullets.length > 0 && (
          <div className="mt-3 pt-3 border-t border-zinc-800">
            <div className="text-xs text-emerald-400 font-semibold mb-2">Selected ({selectedBullets.length})</div>
            {selectedBullets.map((b, i) => (
              <div key={i} className="text-xs text-zinc-400 leading-relaxed flex gap-2 mb-1">
                <span>•</span><span>{b}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={() => router.back()}
          className="flex-1 border border-zinc-700 text-zinc-400 rounded-xl py-3 text-sm font-medium hover:border-zinc-500 transition-colors">
          Cancel
        </button>
        <button onClick={handleSave}
          className="flex-[2] bg-emerald-400 text-zinc-900 font-semibold rounded-xl py-3 text-sm hover:opacity-90 transition-opacity">
          {initial ? "Save Changes" : "Add Entry"}
        </button>
      </div>
    </div>
  );
}
