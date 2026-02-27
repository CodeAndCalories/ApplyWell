// lib/storage/localStorage.ts

import { AppState, DEFAULT_STATE } from "../types";

const KEY = "applywell_v1";

export function loadState(): AppState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveState(state: AppState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    console.warn("Could not save to localStorage");
  }
}

export function clearState(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
