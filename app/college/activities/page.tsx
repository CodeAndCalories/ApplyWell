"use client";

import { useState } from "react";
import Link from "next/link";
import { useCollegeData, Activity } from "../useCollegeData";
import CollegeNav from "../CollegeNav";

const DESC_MAX = 150;

const BLANK = {
  role: "", org: "", grades: "", hrsPerWeek: "", weeksPerYear: "", description: "",
};

export default function ActivitiesPage() {
  const { data, ready, addActivity, updateActivity, deleteActivity, moveActivity } = useCollegeData();
  const [form, setForm] = useState(BLANK);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const descLen = form.description.length;
  const overDesc = descLen > DESC_MAX;

  function set(k: keyof typeof BLANK, v: string) {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.role.trim()) e.role = "Required";
    if (!form.org.trim()) e.org = "Required";
    if (overDesc) e.description = "Over 150 character limit";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    if (editId) {
      updateActivity(editId, form);
    } else {
      addActivity(form);
    }
    closeForm();
  }

  function closeForm() {
    setForm(BLANK);
    setEditId(null);
    setOpen(false);
    setErrors({});
  }

  function startEdit(a: Activity) {
    setForm({ role: a.role, org: a.org, grades: a.grades, hrsPerWeek: a.hrsPerWeek, weeksPerYear: a.weeksPerYear, description: a.description });
    setEditId(a.id);
    setOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="py-6 animate-fade-in">
      <CollegeNav />

      {/* Back to overview */}
      <Link href="/college" className="inline-flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-400 transition-colors mb-4">
        ← Back to overview
      </Link>

      <div className="flex items-center justify-between mb-1">
        <h1 className="font-serif text-2xl">Activities</h1>
        {!open && (
          <button onClick={() => setOpen(true)}
            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl px-4 py-2 text-sm transition-colors">
            + Add
          </button>
        )}
      </div>
      <p className="text-xs text-zinc-500 mb-5">
        {ready ? data.activities.length : 0}/10 Common App slots used
      </p>

      {/* ── Form ── */}
      {open && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-5 animate-fade-in">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            {editId ? "Edit Activity" : "New Activity"}
          </p>

          <div className="flex flex-col gap-3">
            {/* Role */}
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">
                Position / Role <span className="text-red-400">*</span>
              </label>
              <input value={form.role} onChange={e => set("role", e.target.value)}
                placeholder="e.g. Varsity Team Captain" />
              {errors.role && <p className="text-xs text-red-400 mt-1">{errors.role}</p>}
            </div>

            {/* Org */}
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">
                Organization <span className="text-red-400">*</span>
              </label>
              <input value={form.org} onChange={e => set("org", e.target.value)}
                placeholder="e.g. Lincoln High Soccer Club" />
              {errors.org && <p className="text-xs text-red-400 mt-1">{errors.org}</p>}
            </div>

            {/* Grade levels */}
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Grade Levels</label>
              <input value={form.grades} onChange={e => set("grades", e.target.value)}
                placeholder="e.g. 9, 10, 11, 12" />
            </div>

            {/* Hours / Weeks */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-zinc-400 mb-1 block">Hours / Week</label>
                <input type="number" min="0" max="168" value={form.hrsPerWeek}
                  onChange={e => set("hrsPerWeek", e.target.value)}
                  placeholder="e.g. 8" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-zinc-400 mb-1 block">Weeks / Year</label>
                <input type="number" min="0" max="52" value={form.weeksPerYear}
                  onChange={e => set("weeksPerYear", e.target.value)}
                  placeholder="e.g. 36" />
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-zinc-400">
                  Description <span className="text-zinc-600">(Common App 150 char max)</span>
                </label>
                <span className={`text-xs font-bold tabular-nums
                  ${overDesc ? "text-red-400" : descLen > 120 ? "text-amber-400" : "text-zinc-500"}`}>
                  {descLen}/{DESC_MAX}
                </span>
              </div>
              <textarea
                value={form.description}
                onChange={e => set("description", e.target.value)}
                rows={3}
                placeholder="Describe your role, responsibilities, and impact…"
                className={overDesc ? "border-red-500/70" : descLen > 120 ? "border-amber-500/50" : ""}
              />
              {overDesc && (
                <p className="text-xs text-red-400 mt-1 font-medium">
                  ⚠️ {descLen - DESC_MAX} character{descLen - DESC_MAX > 1 ? "s" : ""} over the limit — Common App truncates at 150.
                </p>
              )}
              {errors.description && !overDesc && (
                <p className="text-xs text-red-400 mt-1">{errors.description}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-1">
              <button onClick={handleSubmit}
                className="flex-1 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl py-2.5 text-sm transition-colors">
                {editId ? "Save Changes" : "Add Activity"}
              </button>
              <button onClick={closeForm}
                className="px-5 border border-zinc-700 hover:border-zinc-500 text-zinc-400 font-semibold rounded-xl text-sm transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── List ── */}
      {!ready ? (
        <div className="text-center py-16 text-zinc-600 text-sm">Loading…</div>
      ) : data.activities.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-3">🎯</div>
          <div className="font-semibold mb-1">No activities yet</div>
          <p className="text-zinc-500 text-sm">Add clubs, sports, volunteer work, jobs, research, and more.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {data.activities.map((a, idx) => {
              const dl = a.description.length;
              const over = dl > DESC_MAX;
              return (
                <div key={a.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 animate-fade-in">
                  <div className="flex items-start gap-2">
                    {/* Reorder buttons */}
                    <div className="flex flex-col gap-0.5 flex-shrink-0 mt-0.5">
                      <button onClick={() => moveActivity(a.id, "up")} disabled={idx === 0}
                        title="Move up"
                        className="text-zinc-600 hover:text-zinc-300 disabled:opacity-20 w-6 h-6 flex items-center justify-center rounded hover:bg-zinc-800 transition-colors text-xs">
                        ▲
                      </button>
                      <button onClick={() => moveActivity(a.id, "down")} disabled={idx === data.activities.length - 1}
                        title="Move down"
                        className="text-zinc-600 hover:text-zinc-300 disabled:opacity-20 w-6 h-6 flex items-center justify-center rounded hover:bg-zinc-800 transition-colors text-xs">
                        ▼
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-semibold text-sm truncate">{a.role}</div>
                          <div className="text-xs text-zinc-500 truncate">{a.org}</div>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <button onClick={() => startEdit(a)}
                            className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
                            title="Edit">✏️</button>
                          <button onClick={() => confirm("Delete this activity?") && deleteActivity(a.id)}
                            className="text-zinc-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
                            title="Delete">🗑️</button>
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5 text-xs text-zinc-600">
                        {a.grades && <span>📅 Grades {a.grades}</span>}
                        {a.hrsPerWeek && <span>⏱ {a.hrsPerWeek} hrs/wk</span>}
                        {a.weeksPerYear && <span>📆 {a.weeksPerYear} wks/yr</span>}
                      </div>

                      {/* Description */}
                      {a.description && (
                        <p className={`text-xs mt-2 leading-relaxed ${over ? "text-red-400" : "text-zinc-400"}`}>
                          {a.description}
                        </p>
                      )}

                      {/* Char counter */}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-zinc-700">#{idx + 1}</span>
                        <span className={`text-xs font-semibold tabular-nums
                          ${over ? "text-red-400" : dl > 120 ? "text-amber-400" : "text-zinc-600"}`}>
                          {dl}/{DESC_MAX} chars {over && "⚠️"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Common App Preview */}
          <div className="mt-6 bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="bg-zinc-100 px-4 py-2 border-b border-zinc-200">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Common App Preview
              </p>
            </div>
            <div className="p-4 flex flex-col gap-4">
              {data.activities.map((a, idx) => (
                <div key={a.id} className="text-zinc-900">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-bold text-xs">{idx + 1}. {a.role}</span>
                    {(a.hrsPerWeek || a.weeksPerYear) && (
                      <span className="text-xs text-zinc-500 flex-shrink-0">
                        {a.hrsPerWeek && `${a.hrsPerWeek} hr/wk`}
                        {a.hrsPerWeek && a.weeksPerYear && " · "}
                        {a.weeksPerYear && `${a.weeksPerYear} wk/yr`}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-600">{a.org}{a.grades && ` · Grades ${a.grades}`}</div>
                  {a.description && (
                    <p className="text-xs text-zinc-700 mt-0.5 leading-relaxed">
                      {a.description.slice(0, DESC_MAX)}
                      {a.description.length > DESC_MAX && (
                        <span className="text-red-500 font-semibold"> [truncated]</span>
                      )}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
