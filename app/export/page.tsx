"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { Disclaimer } from "@/components/ui";

export default function ExportPage() {
  const { state } = useApp();
  const { profile, entries } = state;
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState<string | null>(null);

  const exportPDF = async (template: "classic" | "modern") => {
    setExporting(template);
    // Render the resume on a hidden element, then export
    // For now, link to the resume preview page
    window.location.href = "/resume";
    setExporting(null);
  };

  const copyText = async () => {
    const text = [
      `RESUME — ${profile.name || "Student"}`,
      profile.grade && `Grade: ${profile.grade}`,
      profile.school && `School: ${profile.school}`,
      profile.gpa && `GPA: ${profile.gpa}`,
      "",
      ...entries.map((e) =>
        [
          `[${e.type.toUpperCase()}] ${e.title}${e.org ? ` | ${e.org}` : ""}`,
          e.hrsPerWeek && `${e.hrsPerWeek} hrs/wk · ${e.weeksPerYear} wks/yr`,
          e.description,
          ...(e.bullets || []).map((b) => `• ${b}`),
        ].filter(Boolean).join("\n")
      ),
    ].filter(Boolean).join("\n\n");

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const actions = [
    {
      id: "pdf-classic",
      icon: "📄",
      label: "Download PDF — Classic",
      sub: "ATS-friendly, Times New Roman serif layout",
      color: "text-emerald-400 bg-emerald-400/10",
      action: () => exportPDF("classic"),
    },
    {
      id: "pdf-modern",
      icon: "📐",
      label: "Download PDF — Modern",
      sub: "Clean sans-serif, contemporary layout",
      color: "text-indigo-400 bg-indigo-400/10",
      action: () => exportPDF("modern"),
    },
    {
      id: "copy",
      icon: copied ? "✅" : "📋",
      label: copied ? "Copied!" : "Copy as Plain Text",
      sub: "Paste into Word, Google Docs, or any editor",
      color: "text-amber-400 bg-amber-400/10",
      action: copyText,
    },
  ];

  return (
    <div className="py-8 animate-fade-in">
      <h1 className="font-serif text-2xl mb-2">Export</h1>
      <p className="text-zinc-500 text-sm mb-6">
        Download your verified resume or copy content for other uses.
      </p>

      <div className="flex flex-col gap-3 mb-6">
        {actions.map((a) => (
          <button key={a.id} onClick={a.action} disabled={exporting === a.id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4 text-left hover:border-zinc-700 transition-colors disabled:opacity-50">
            <div className={`w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center text-xl ${a.color}`}>
              {a.icon}
            </div>
            <div>
              <div className="font-semibold text-sm">{a.label}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{a.sub}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Parent / counselor share */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6">
        <div className="font-semibold text-sm mb-1">📤 Parent / Counselor Share</div>
        <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
          Generate a read-only link to share with a parent or school counselor. (Cloud sync — coming in Phase 2)
        </p>
        <button disabled
          className="w-full border border-zinc-700 text-zinc-600 rounded-xl py-2.5 text-sm font-medium cursor-not-allowed">
          Generate Share Link (Coming Soon)
        </button>
      </div>

      <Disclaimer>
        Always proofread your exported documents before submitting. ApplyWell is a drafting tool — you are responsible for the final accuracy of all materials. This tool does not provide admissions advice and makes no guarantees about outcomes.
      </Disclaimer>
    </div>
  );
}
