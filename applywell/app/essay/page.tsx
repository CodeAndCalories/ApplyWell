
"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { Disclaimer } from "@/components/ui";
import { brainstormEssay } from "@/lib/ai/aiClient";

interface Outline { section: string; prompt: string; }
interface Result { themes: string[]; outline: Outline[]; }

export default function EssayPage() {
  const { state } = useApp();
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [draftSections, setDraftSections] = useState<Record<number, string>>({});

  const generate = async () => {
    setLoading(true);
    try {
      const r = await brainstormEssay(state.profile, state.entries);
      setResult(r);
    } finally { setLoading(false); }
  };

  return (
    <div className="py-8 animate-fade-in">
      <h1 className="font-serif text-2xl mb-2">Personal Statement</h1>
      <p className="text-zinc-500 text-sm mb-4 leading-relaxed">
        Brainstorming help and outline structure.{" "}
        <strong className="text-zinc-300">No fabrication</strong> — prompts are designed to draw out your real story.
      </p>

      <Disclaimer>
        This tool helps you brainstorm and organize. It does not write your essay for you. Every word in your final essay must be authentically yours. Submitting AI-generated essays as your own work may violate college application policies.
      </Disclaimer>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mt-5 mb-4">
        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
          Your Raw Thoughts (anything goes here)
        </label>
        <textarea rows={6} value={notes} onChange={(e) => setNotes(e.target.value)}
          placeholder="What moments from your life have shaped you most? What do you wish admissions officers understood about you? What are you proud of that doesn't show up on your resume? Don't edit — just write." />
        <button onClick={generate} disabled={loading}
          className="mt-4 w-full bg-emerald-400 text-zinc-900 font-semibold rounded-xl py-3 text-sm hover:opacity-90 disabled:opacity-50 transition-opacity">
          {loading ? "Thinking…" : "✨ Generate Brainstorm & Outline"}
        </button>
      </div>

      {result && (
        <div className="animate-fade-in">
          {/* Themes */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-4">
            <div className="font-semibold mb-2">💡 Potential Themes</div>
            <p className="text-xs text-zinc-500 mb-4">
              Starting points based on common essay approaches. Choose the one that feels most authentic — or ignore these entirely and follow your instinct.
            </p>
            <div className="flex flex-col gap-2">
              {result.themes.map((t, i) => (
                <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-300 leading-relaxed">
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Outline */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-4">
            <div className="font-semibold mb-4">📝 Essay Outline</div>
            <div className="flex flex-col gap-5">
              {result.outline.map((section, i) => (
                <div key={i}>
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                    {i + 1}. {section.section}
                  </div>
                  <div className="text-xs text-zinc-500 italic mb-2 leading-relaxed">{section.prompt}</div>
                  <textarea rows={3}
                    value={draftSections[i] ?? ""}
                    onChange={(e) => setDraftSections((d) => ({ ...d, [i]: e.target.value }))}
                    placeholder={`Write your ${section.section.toLowerCase()} here…`}
                    className="text-sm" />
                </div>
              ))}
            </div>
          </div>

          <Disclaimer>
            Remember: This outline is a scaffold, not a template. The best essays break expected structures. Write in your own voice, then revise. Have a trusted adult — teacher, counselor, or parent — review your final draft.
          </Disclaimer>
        </div>
      )}
    </div>
  );
}
