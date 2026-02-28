// lib/score.ts
// Pure client-side completeness scorer. No deps, no side effects.

import { AppState } from "./types";

export interface ScoreResult {
  score: number;        // 0–100
  grade: "A" | "B" | "C" | "D" | "F";
  checks: ScoreCheck[];
}

export interface ScoreCheck {
  label: string;
  passed: boolean;
  detail: string;
}

export function scoreResume(state: AppState): ScoreResult {
  const { profile, entries } = state;

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
      detail: entries.length >= 3 ? `${entries.length} entries` : `Only ${entries.length} — add more`,
    },
    {
      label: "At least 1 activity or sport",
      passed: entries.some((e) => e.type === "Activity" || e.type === "Sport"),
      detail: entries.some((e) => e.type === "Activity" || e.type === "Sport")
        ? "Activity or sport present"
        : "Add an activity or sport",
    },
    {
      label: "All entries have descriptions or bullets",
      passed: entries.length > 0 && entries.every(
        (e) => (e.bullets?.length ?? 0) > 0 || e.description?.trim()
      ),
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
  ];

  const passed = checks.filter((c) => c.passed).length;
  const score = Math.round((passed / checks.length) * 100);

  const grade: ScoreResult["grade"] =
    score >= 90 ? "A" :
    score >= 75 ? "B" :
    score >= 60 ? "C" :
    score >= 40 ? "D" : "F";

  return { score, grade, checks };
}
