// lib/score.ts
// Pure client-side completeness + quality scorer. No deps, no side effects.

import { AppState, Entry } from "./types";

export interface ScoreResult {
  score: number;        // 0–100
  grade: "A" | "B" | "C" | "D" | "F";
  checks: ScoreCheck[];
  suggestions: Suggestion[];
}

export interface ScoreCheck {
  label: string;
  passed: boolean;
  detail: string;
}

export interface Suggestion {
  severity: "warn" | "tip";
  message: string;
}

// ── Bullet quality helpers ─────────────────────────────────────────────────────

const METRIC_RE = /\d+(%|k|K|\+|x|hrs?|hours?|years?|months?|weeks?|days?|students?|members?|people|awards?|projects?|times?)?/;
const WEAK_START_RE = /^(did|do|does|was|were|is|are|have|had|has|helped|worked|went|got|made|used|also|i\s)/i;

function bulletQuality(bullet: string): "good" | "short" | "weak" | "ok" {
  const trimmed = bullet.trim();
  if (trimmed.length < 20) return "short";
  if (WEAK_START_RE.test(trimmed)) return "weak";
  if (METRIC_RE.test(trimmed)) return "good";
  return "ok";
}

function firstWord(s: string): string {
  return s.trim().split(/\s+/)[0]?.toLowerCase() ?? "";
}

function repeatedFirstWords(entries: Entry[]): string[] {
  const allBullets = entries.flatMap((e) => e.bullets ?? []).filter(Boolean);
  const words = allBullets.map(firstWord).filter(Boolean);
  const freq: Record<string, number> = {};
  for (const w of words) freq[w] = (freq[w] ?? 0) + 1;
  return Object.entries(freq)
    .filter(([, count]) => count >= 3)
    .map(([word]) => word);
}

// ── Main scorer ───────────────────────────────────────────────────────────────

export function scoreResume(state: AppState): ScoreResult {
  const { profile, entries } = state;
  const allBullets = entries.flatMap((e) => e.bullets ?? []).filter(Boolean);

  const checks: ScoreCheck[] = [
    {
      label: "Name filled in",
      passed: !!profile.name?.trim(),
      detail: profile.name?.trim() ? profile.name : "Add your name in Profile",
    },
    {
      label: "School filled in",
      passed: !!profile.school?.trim(),
      detail: profile.school?.trim() ? profile.school : "Add your school in Profile",
    },
    {
      label: "GPA included",
      passed: !!profile.gpa?.trim(),
      detail: profile.gpa?.trim() ? `GPA: ${profile.gpa}` : "Add GPA in Profile",
    },
    {
      label: "Email included",
      passed: !!profile.email?.trim(),
      detail: profile.email?.trim() ? profile.email : "Add email in Profile",
    },
    {
      label: "At least 3 entries",
      passed: entries.length >= 3,
      detail: entries.length >= 3
        ? `${entries.length} entries`
        : `Only ${entries.length} — add more`,
    },
    {
      label: "At least 1 activity or sport",
      passed: entries.some((e) => e.type === "Activity" || e.type === "Sport"),
      detail: entries.some((e) => e.type === "Activity" || e.type === "Sport")
        ? "Activity or sport present"
        : "Add an activity or sport",
    },
    {
      label: "All entries have content",
      passed:
        entries.length > 0 &&
        entries.every((e) => (e.bullets?.length ?? 0) > 0 || e.description?.trim()),
      detail:
        entries.length === 0
          ? "No entries yet"
          : entries.every((e) => (e.bullets?.length ?? 0) > 0 || e.description?.trim())
          ? "All entries have content"
          : `${entries.filter((e) => !(e.bullets?.length) && !e.description?.trim()).length} entries missing content`,
    },
    {
      label: "All entries verified",
      passed: entries.length > 0 && entries.every((e) => e.verified),
      detail:
        entries.length === 0
          ? "No entries yet"
          : entries.every((e) => e.verified)
          ? "All verified ✓"
          : `${entries.filter((e) => !e.verified).length} unverified — check Verify page`,
    },
    {
      label: "Bullets are detailed (20+ chars)",
      passed:
        allBullets.length > 0 &&
        allBullets.every((b) => bulletQuality(b) !== "short"),
      detail:
        allBullets.length === 0
          ? "No bullets yet"
          : allBullets.every((b) => bulletQuality(b) !== "short")
          ? "All bullets are detailed"
          : `${allBullets.filter((b) => bulletQuality(b) === "short").length} bullets are too short`,
    },
    {
      label: "At least one bullet includes a metric",
      passed: allBullets.length > 0 && allBullets.some((b) => METRIC_RE.test(b)),
      detail: allBullets.some((b) => METRIC_RE.test(b))
        ? "Metrics found ✓"
        : "Add numbers or percentages to at least one bullet",
    },
  ];

  const passed = checks.filter((c) => c.passed).length;
  const score = Math.round((passed / checks.length) * 100);

  const grade: ScoreResult["grade"] =
    score >= 90 ? "A" :
    score >= 75 ? "B" :
    score >= 60 ? "C" :
    score >= 40 ? "D" : "F";

  // Suggestions — advisory, not scored
  const suggestions: Suggestion[] = [];

  const weakBullets = allBullets.filter((b) => bulletQuality(b) === "weak");
  if (weakBullets.length > 0) {
    suggestions.push({
      severity: "warn",
      message: `${weakBullets.length} bullet${weakBullets.length > 1 ? "s" : ""} start with a weak word ("did", "helped", "was"). Use strong action verbs instead.`,
    });
  }

  const repeated = repeatedFirstWords(entries);
  if (repeated.length > 0) {
    suggestions.push({
      severity: "warn",
      message: `"${repeated[0]}" starts 3+ bullets. Vary your opening verbs to avoid repetition.`,
    });
  }

  if (!allBullets.some((b) => METRIC_RE.test(b)) && allBullets.length > 0) {
    suggestions.push({
      severity: "tip",
      message: "Add at least one number or metric to strengthen impact (e.g. 'Led 12 students', 'Raised $500', 'Improved by 30%').",
    });
  }

  if (entries.length > 0 && entries.length < 5) {
    suggestions.push({
      severity: "tip",
      message: `You have ${entries.length} ${entries.length === 1 ? "entry" : "entries"}. Most strong resumes have 5–10.`,
    });
  }

  return { score, grade, checks, suggestions };
}
