// lib/ai/aiClient.ts
// ─────────────────────────────────────────────────────────────────────────────
// Abstraction layer for AI calls.
// To plug in a real provider:
//   1. Set NEXT_PUBLIC_AI_PROVIDER=openai (or anthropic) in .env.local
//   2. Add OPENAI_API_KEY or ANTHROPIC_API_KEY to .env.local
//   3. Create /app/api/ai/route.ts to proxy calls server-side (keeps keys safe)
//   4. Update the openai/anthropic branches below to fetch that route
// ─────────────────────────────────────────────────────────────────────────────

import { Entry, StudentProfile } from "../types";

const PROVIDER = process.env.NEXT_PUBLIC_AI_PROVIDER || "stub";

async function callAI(fn: string, payload: unknown): Promise<unknown> {
  if (PROVIDER === "stub") return null;
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fn, payload }),
  });
  if (!res.ok) throw new Error(`AI API error: ${res.status}`);
  return res.json();
}

// ─── Resume Bullets ───────────────────────────────────────────────────────────
export async function generateResumeBullets(
  _profile: StudentProfile,
  entry: Entry
): Promise<string[]> {
  if (PROVIDER !== "stub") {
    const result = await callAI("generateResumeBullets", { entry });
    return result as string[];
  }

  await new Promise((r) => setTimeout(r, 900));
  const verb = entry.type === "Work" ? "Managed" : entry.type === "Award" ? "Earned" : "Led";
  return [
    `${verb} ${entry.title}${entry.org ? ` at ${entry.org}` : ""}, dedicating ${entry.hrsPerWeek || "X"} hrs/week over ${entry.weeksPerYear || "Y"} weeks/year`,
    `${entry.notes || `Demonstrated commitment and skill in ${entry.type.toLowerCase()} role`}`,
    `Collaborated with peers and mentors to achieve measurable impact in ${entry.title}`,
  ].filter(Boolean);
}

// ─── Common App Activity Description (150 char) ───────────────────────────────
export async function optimizeActivityDescription(entry: Entry): Promise<string> {
  if (PROVIDER !== "stub") {
    const result = await callAI("optimizeActivityDescription", { entry });
    return result as string;
  }

  await new Promise((r) => setTimeout(r, 600));
  const base = `${entry.description || entry.title}${entry.notes ? ". " + entry.notes : ""}`;
  return base.slice(0, 150);
}

// ─── Essay Brainstorm ─────────────────────────────────────────────────────────
export async function brainstormEssay(
  profile: StudentProfile,
  _entries: Entry[]
): Promise<{
  themes: string[];
  outline: { section: string; prompt: string }[];
}> {
  if (PROVIDER !== "stub") {
    const result = await callAI("brainstormEssay", { profile });
    return result as ReturnType<typeof brainstormEssay>;
  }

  await new Promise((r) => setTimeout(r, 1100));
  return {
    themes: [
      "Identity & belonging — how your background shapes your perspective",
      "Turning point — a challenge or failure that changed how you think",
      "Quiet passion — a lesser-known interest that defines you more than your résumé does",
      "Community & service — how you see your role in something larger than yourself",
    ],
    outline: [
      {
        section: "Hook (1–2 sentences)",
        prompt:
          "Start in the middle of a specific moment — a scene, image, or action. Not a quote. Not a definition. Something only you could write.",
      },
      {
        section: "Context (2–3 sentences)",
        prompt:
          "Give the reader just enough background to understand why this moment matters. Resist the urge to over-explain.",
      },
      {
        section: "Complication or Tension",
        prompt:
          "What made this hard, confusing, or meaningful? What did you not expect? What did you struggle with?",
      },
      {
        section: "Insight or Shift",
        prompt:
          "What did you learn, realize, or change? Be specific — avoid generic conclusions like 'I learned teamwork.'",
      },
      {
        section: "Closing (connect forward)",
        prompt:
          "Return to the opening image or idea. Show how you're different now, and hint at who you're becoming — not just who you were.",
      },
    ],
  };
}
