
"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { PageHeader, Field, Disclaimer } from "@/components/ui";
import { StudentProfile } from "@/lib/types";

export default function ProfilePage() {
  const { state, updateProfile, deleteAllData } = useApp();
  const [form, setForm] = useState<StudentProfile>(state.profile);
  const [saved, setSaved] = useState(false);

  const set = (k: keyof StudentProfile, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="py-8 animate-fade-in">
      <PageHeader
        title="Your Profile"
        subtitle="Basic info used to personalize your resume. All fields are optional."
      />

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-4">
        <Field label="Name (optional)">
          <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Alex Rivera" />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Grade">
            <select value={form.grade} onChange={(e) => set("grade", e.target.value)}>
              <option value="">Select</option>
              {["9","10","11","12","Gap Year"].map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </Field>
          <Field label="GPA (optional)">
            <input value={form.gpa} onChange={(e) => set("gpa", e.target.value)} placeholder="3.8" />
          </Field>
        </div>

        <Field label="School Name (optional)">
          <input value={form.school} onChange={(e) => set("school", e.target.value)} placeholder="Westlake High School" />
        </Field>

        <Field label="Academic Interests">
          <input value={form.interests} onChange={(e) => set("interests", e.target.value)}
            placeholder="Computer Science, Biology, Creative Writing…" />
        </Field>

        <Field label="Email (optional, for sharing)">
          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="alex@email.com" />
        </Field>
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-emerald-400 text-zinc-900 font-semibold rounded-xl py-3 text-sm mb-8 transition-opacity hover:opacity-90"
      >
        {saved ? "✓ Saved!" : "Save Profile"}
      </button>

      <div className="pt-6 border-t border-zinc-800">
        <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-3">Data &amp; Privacy</p>
        <Disclaimer>
          All your data is stored locally in this browser only. We do not collect or transmit your personal information in the MVP version.
        </Disclaimer>
        <button
          onClick={() => {
            if (confirm("Delete ALL your data? This cannot be undone.")) {
              deleteAllData();
              window.location.href = "/";
            }
          }}
          className="mt-4 w-full border border-red-500/50 text-red-400 rounded-xl py-3 text-sm font-medium hover:bg-red-500/10 transition-colors"
        >
          🗑️ Delete My Data
        </button>
      </div>
    </div>
  );
}
