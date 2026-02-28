// lib/storage/backup.ts
// Pure helpers for validating and merging ApplyWell backup files.
// No side effects. No external deps. Safe to call from any client component.

import { AppState, DEFAULT_STATE, ENTRY_TYPES } from "../types";

const MAX_BYTES = 2 * 1024 * 1024; // 2 MB

// ── Validation ────────────────────────────────────────────────────────────────

function isString(v: unknown): v is string {
  return typeof v === "string";
}

function isStringRecord(v: unknown): v is Record<string, string> {
  return (
    typeof v === "object" &&
    v !== null &&
    !Array.isArray(v) &&
    Object.values(v as object).every((x) => typeof x === "string")
  );
}

function validateProfile(p: unknown): string | null {
  if (typeof p !== "object" || p === null || Array.isArray(p)) {
    return "profile must be an object";
  }
  const PROFILE_KEYS = ["name", "grade", "school", "interests", "gpa", "email"] as const;
  for (const key of PROFILE_KEYS) {
    const val = (p as Record<string, unknown>)[key];
    if (val !== undefined && !isString(val)) {
      return `profile.${key} must be a string`;
    }
  }
  return null;
}

function validateEntry(e: unknown, index: number): string | null {
  if (typeof e !== "object" || e === null || Array.isArray(e)) {
    return `entries[${index}] must be an object`;
  }
  const entry = e as Record<string, unknown>;

  if (!isString(entry.id) || !entry.id.trim()) {
    return `entries[${index}].id must be a non-empty string`;
  }
  if (!isString(entry.type) || !ENTRY_TYPES.includes(entry.type as never)) {
    return `entries[${index}].type "${entry.type}" is not a valid entry type`;
  }
  if (!isString(entry.title)) {
    return `entries[${index}].title must be a string`;
  }
  if (entry.bullets !== undefined) {
    if (
      !Array.isArray(entry.bullets) ||
      !(entry.bullets as unknown[]).every((b) => typeof b === "string")
    ) {
      return `entries[${index}].bullets must be an array of strings`;
    }
  }
  if (entry.verified !== undefined && typeof entry.verified !== "boolean") {
    return `entries[${index}].verified must be a boolean`;
  }
  return null;
}

function validateDrafts(drafts: unknown): string | null {
  if (drafts === undefined || drafts === null) return null;
  if (typeof drafts !== "object" || Array.isArray(drafts)) {
    return "drafts must be an object";
  }
  for (const [key, val] of Object.entries(drafts as object)) {
    if (typeof val !== "object" || val === null) {
      return `drafts["${key}"] must be an object`;
    }
    const d = val as Record<string, unknown>;
    if (d.resumeBullets !== undefined) {
      if (
        !Array.isArray(d.resumeBullets) ||
        !(d.resumeBullets as unknown[]).every((b) => typeof b === "string")
      ) {
        return `drafts["${key}"].resumeBullets must be an array of strings`;
      }
    }
    if (d.activityDescription !== undefined && !isString(d.activityDescription)) {
      return `drafts["${key}"].activityDescription must be a string`;
    }
  }
  return null;
}

// ── Public API ────────────────────────────────────────────────────────────────

export type ParseResult =
  | { ok: true; data: AppState }
  | { ok: false; error: string };

export async function parseBackupFile(file: File): Promise<ParseResult> {
  if (file.size > MAX_BYTES) {
    return {
      ok: false,
      error: `File is too large (${(file.size / 1024).toFixed(0)} KB). Maximum is 2 MB.`,
    };
  }

  let raw: string;
  try {
    raw = await file.text();
  } catch {
    return { ok: false, error: "Could not read the file." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, error: "File is not valid JSON." };
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return { ok: false, error: "File must be a JSON object." };
  }

  const obj = parsed as Record<string, unknown>;

  // Validate profile
  const profileErr = validateProfile(obj.profile);
  if (profileErr) return { ok: false, error: profileErr };

  // Validate entries
  if (!Array.isArray(obj.entries)) {
    return { ok: false, error: "entries must be an array." };
  }
  for (let i = 0; i < (obj.entries as unknown[]).length; i++) {
    const entryErr = validateEntry((obj.entries as unknown[])[i], i);
    if (entryErr) return { ok: false, error: entryErr };
  }

  // Validate drafts (optional)
  const draftsErr = validateDrafts(obj.drafts);
  if (draftsErr) return { ok: false, error: draftsErr };

  // Build a clean AppState, filling in defaults for any missing fields
  const incoming: AppState = {
    profile: {
      ...DEFAULT_STATE.profile,
      ...(isStringRecord(obj.profile) ? obj.profile : {}),
    },
    entries: (obj.entries as Record<string, unknown>[]).map((e) => ({
      id: String(e.id ?? ""),
      type: e.type as AppState["entries"][number]["type"],
      title: String(e.title ?? ""),
      org: String(e.org ?? ""),
      startDate: String(e.startDate ?? ""),
      endDate: String(e.endDate ?? ""),
      hrsPerWeek: String(e.hrsPerWeek ?? ""),
      weeksPerYear: String(e.weeksPerYear ?? ""),
      description: String(e.description ?? ""),
      notes: String(e.notes ?? ""),
      bullets: Array.isArray(e.bullets)
        ? (e.bullets as unknown[]).map(String)
        : [],
      verified: typeof e.verified === "boolean" ? e.verified : false,
    })),
    drafts: typeof obj.drafts === "object" && obj.drafts !== null && !Array.isArray(obj.drafts)
      ? (obj.drafts as AppState["drafts"])
      : {},
  };

  return { ok: true, data: incoming };
}

// ── Merge ─────────────────────────────────────────────────────────────────────

export function mergeAppState(current: AppState, incoming: AppState): AppState {
  // Profile: prefer incoming non-empty fields, keep current otherwise
  const profile = { ...current.profile };
  for (const key of Object.keys(incoming.profile) as (keyof typeof profile)[]) {
    const val = incoming.profile[key];
    if (typeof val === "string" && val.trim()) {
      profile[key] = val;
    }
  }

  // Entries: de-dupe by id — incoming wins on collision
  const entryMap = new Map(current.entries.map((e) => [e.id, e]));
  for (const e of incoming.entries) {
    entryMap.set(e.id, e);
  }
  const entries = Array.from(entryMap.values());

  // Drafts: de-dupe by key — incoming wins on collision
  const drafts = { ...current.drafts, ...incoming.drafts };

  return { profile, entries, drafts };
}
