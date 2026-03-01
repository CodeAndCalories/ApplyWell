"use client";

import { useState } from "react";
import Link from "next/link";
import { useCollegeData, Essay, wc } from "../useCollegeData";
import CollegeNav from "../CollegeNav";

const BLANK = { prompt: "", wordLimit: "", body: "" };

export default function EssaysPage() {
  const { data, ready, addEssay, updateEssay, deleteEssay, toggleCheck } = useCollegeData();
  const [form, setForm] = useState(BLANK);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const words = wc(form.body);
  const limit = parseInt(form.wordLimit) || 0;
  const overLimit = limit > 0 && words > limit;
  const nearLimit = limit > 0 && words >= Math.floor(limit * 0.85) && !overLimit;
  const pct = limit > 0 ? Math.min((words / limit) * 100, 100) : 0;

  function set(k: keyof typeof BLANK, v: string) {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.prompt.trim()) e.prompt = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    if (editId) {
      updateEssay(editId, { prompt: form.prompt, wordLimit: form.wordLimit, body: form.body });
    } else {
      addEssay(form);
    }
    closeForm();
  }

  function closeForm() {
    setForm(BLANK);
    setEditId(null);
    setOpen(false);
    setErrors({});
  }

  function startEdit(e: Essay) {
    setForm({ prompt: e.prompt, wordLimit: e.wordLimit, body: e.body });
    setEditId(e.id);
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
        <h1 className="font-serif text-2xl">Essays</h1>
        {!open && (
          <button onClick={() => setOpen(true)}
            className="bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-xl px-4 py-2 text-sm transition-colors">
            + Add
          </button>
        )}
      </div>
      <p className="text-xs text-zinc-500 mb-5">Track word counts, drafts, and polish checklists.</p>

      {/* ── Form ── */}
      {open && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-5 animate-fade-in">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            {editId ? "Edit Essay" : "New Essay"}
          </p>

          <div className="flex flex-col gap-3">
            {/* Prompt */}
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">
                Prompt Title <span className="text-red-400">*</span>
              </label>
              <input value={form.prompt} onChange={e => set("prompt", e.target.value)}
                placeholder="e.g. Common App Personal Statement, Why Brown?" />
              {errors.prompt && <p className="text-xs text-red-400 mt-1">{errors.prompt}</p>}
            </div>

            {/* Word limit */}
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Word Limit</label>
              <input type="number" min="0" value={form.wordLimit}
                onChange={e => set("wordLimit", e.target.value)}
                placeholder="e.g. 650" />
            </div>

            {/* Body */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-zinc-400">Essay Draft</label>
                <span className={`text-xs font-bold tabular-nums
                  ${overLimit ? "text-red-400" : nearLimit ? "text-emerald-400" : "text-zinc-500"}`}>
                  {words}{limit > 0 ? ` / ${limit}` : ""} words
                  {nearLimit && " ✓"}
                  {overLimit && " ⚠️"}
                </span>
              </div>
              <textarea value={form.body} onChange={e => set("body", e.target.value)}
                rows={12}
                placeholder="Paste or write your essay here…"
                className={overLimit ? "border-red-500/60" : nearLimit ? "border-emerald-500/40" : ""}
              />
              {/* Progress bar */}
              {limit > 0 && (
                <div className="mt-1.5 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div style={{ width: `${pct}%` }}
                    className={`h-full rounded-full transition-all duration-300
                      ${overLimit ? "bg-red-500" : nearLimit ? "bg-emerald-500" : "bg-zinc-500"}`} />
                </div>
              )}
              {overLimit && (
                <p className="text-xs text-red-400 mt-1 font-medium">
                  ⚠️ {words - limit} word{words - limit > 1 ? "s" : ""} over the limit.
                </p>
              )}
            </div>

            <div className="flex gap-2 pt-1">
              <button onClick={handleSubmit}
                className="flex-1 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-xl py-2.5 text-sm transition-colors">
                {editId ? "Save Changes" : "Add Essay"}
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
      ) : data.essays.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-3">✍️</div>
          <div className="font-semibold mb-1">No essays yet</div>
          <p className="text-zinc-500 text-sm">Add your personal statement, supplementals, and any other prompts.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {data.essays.map(essay => {
            const words = wc(essay.body);
            const lim = parseInt(essay.wordLimit) || 0;
            const over = lim > 0 && words > lim;
            const near = lim > 0 && words >= Math.floor(lim * 0.85) && !over;
            const pct = lim > 0 ? Math.min((words / lim) * 100, 100) : 0;
            const doneCount = essay.checklist.filter(c => c.done).length;
            const isExpanded = expanded === essay.id;

            return (
              <div key={essay.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden animate-fade-in">
                {/* Card header */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{essay.prompt}</div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={`text-xs font-bold tabular-nums
                          ${over ? "text-red-400" : near ? "text-emerald-400" : "text-zinc-500"}`}>
                          {words}{lim > 0 ? ` / ${lim}` : ""} words
                          {near && " ✓"}
                          {over && " ⚠️"}
                        </span>
                        <span className="text-zinc-700 text-xs">·</span>
                        <span className="text-xs text-zinc-500">
                          Checklist {doneCount}/{essay.checklist.length}
                        </span>
                      </div>
                      {lim > 0 && (
                        <div className="mt-2 h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <div style={{ width: `${pct}%` }}
                            className={`h-full rounded-full transition-all ${over ? "bg-red-500" : near ? "bg-emerald-500" : "bg-zinc-600"}`} />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={() => startEdit(essay)}
                        className="text-zinc-500 hover:text-zinc-300 p-2 rounded-lg hover:bg-zinc-800 transition-colors">✏️</button>
                      <button onClick={() => confirm("Delete this essay?") && deleteEssay(essay.id)}
                        className="text-zinc-500 hover:text-red-400 p-2 rounded-lg hover:bg-zinc-800 transition-colors">🗑️</button>
                    </div>
                  </div>

                  <button onClick={() => setExpanded(isExpanded ? null : essay.id)}
                    className="mt-3 text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-medium">
                    {isExpanded ? "▲ Hide checklist" : "▼ Show checklist"}
                  </button>
                </div>

                {/* Checklist */}
                {isExpanded && (
                  <div className="border-t border-zinc-800 px-4 py-3 animate-fade-in">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Checklist</p>
                    <div className="flex flex-col gap-2.5">
                      {essay.checklist.map(item => (
                        <label key={item.id} className="flex items-center gap-2.5 cursor-pointer group">
                          <input type="checkbox" checked={item.done}
                            onChange={() => toggleCheck(essay.id, item.id)} />
                          <span className={`text-sm transition-colors leading-tight
                            ${item.done ? "line-through text-zinc-600" : "text-zinc-300 group-hover:text-zinc-200"}`}>
                            {item.label}
                          </span>
                        </label>
                      ))}
                    </div>
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
