"use client";

import { useState, useEffect, useCallback } from "react";

const KEY = "applywell_college_data";

export interface Activity {
  id: string;
  role: string;
  org: string;
  grades: string;
  hrsPerWeek: string;
  weeksPerYear: string;
  description: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface Essay {
  id: string;
  prompt: string;
  wordLimit: string;
  body: string;
  checklist: ChecklistItem[];
}

export interface CollegeData {
  activities: Activity[];
  essays: Essay[];
}

const EMPTY: CollegeData = { activities: [], essays: [] };

function load(): CollegeData {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...JSON.parse(raw) };
  } catch { return EMPTY; }
}

function save(d: CollegeData) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(KEY, JSON.stringify(d)); } catch {}
}

export function useCollegeData() {
  const [data, setData] = useState<CollegeData>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => { setData(load()); setReady(true); }, []);

  const commit = useCallback((next: CollegeData) => { setData(next); save(next); }, []);

  // Activities
  const addActivity = useCallback((a: Omit<Activity, "id">) =>
    commit({ ...data, activities: [...data.activities, { ...a, id: crypto.randomUUID() }] }),
  [data, commit]);

  const updateActivity = useCallback((id: string, patch: Partial<Activity>) =>
    commit({ ...data, activities: data.activities.map(a => a.id === id ? { ...a, ...patch } : a) }),
  [data, commit]);

  const deleteActivity = useCallback((id: string) =>
    commit({ ...data, activities: data.activities.filter(a => a.id !== id) }),
  [data, commit]);

  const moveActivity = useCallback((id: string, dir: "up" | "down") => {
    const arr = [...data.activities];
    const i = arr.findIndex(a => a.id === id);
    if (dir === "up" && i === 0) return;
    if (dir === "down" && i === arr.length - 1) return;
    const j = dir === "up" ? i - 1 : i + 1;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    commit({ ...data, activities: arr });
  }, [data, commit]);

  // Essays
  const addEssay = useCallback((e: Omit<Essay, "id" | "checklist">) =>
    commit({
      ...data,
      essays: [
        ...data.essays,
        {
          ...e,
          id: crypto.randomUUID(),
          checklist: [
            "Clear theme",
            "Specific examples",
            "Personal growth shown",
            "No exaggeration",
          ].map(label => ({ id: crypto.randomUUID(), label, done: false })),
        },
      ],
    }),
  [data, commit]);

  const updateEssay = useCallback((id: string, patch: Partial<Essay>) =>
    commit({ ...data, essays: data.essays.map(e => e.id === id ? { ...e, ...patch } : e) }),
  [data, commit]);

  const deleteEssay = useCallback((id: string) =>
    commit({ ...data, essays: data.essays.filter(e => e.id !== id) }),
  [data, commit]);

  const toggleCheck = useCallback((essayId: string, itemId: string) =>
    commit({
      ...data,
      essays: data.essays.map(e =>
        e.id !== essayId ? e : {
          ...e,
          checklist: e.checklist.map(c => c.id === itemId ? { ...c, done: !c.done } : c),
        }
      ),
    }),
  [data, commit]);

  return {
    data, ready,
    addActivity, updateActivity, deleteActivity, moveActivity,
    addEssay, updateEssay, deleteEssay, toggleCheck,
  };
}

/** Word count helper — shared across pages */
export function wc(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}
