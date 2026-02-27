
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
    try {
      const { exportResumePDF } = await import("@/lib/pdf/pdfExport");
      await exportResumePDF(state, template, `applywell-resume-${template}.pdf`);
    } catch (e) {
      console.error(e);
      alert("PDF export failed. Please try again.");
    } finally {
      setExporting(null);
    }
  };

  const copyText = async () => {
    const text = [
      profile.name?.toUpperCase() || "STUDENT NAME",
      profile.school,
      profile.gpa && `GPA: ${profile.gpa}`,
      "",
      ...entries.map((e) => [
        `${e.type.toUpperCase()}: ${e.title}${e.org ? ` | ${e.org}` : ""}`,
        e.description && `  ${e.description}`,
        ...(e.bullets || []).map((b) => `  • ${b}`),
      ].filter(Boolean).join("\n")),
    ].filter(Boolean).join("\n\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const actions = [
    { id: "pdf-classic", icon: "📄", label: "Download PDF — Classic", sub: "ATS-friendly serif layout", color: "text-emerald-400 bg-emerald-400/10", action: () => exportPDF("classic") },
    { id: "pdf-modern", icon: "📐", label: "Download PDF — Modern", sub: "Clean sans-serif layout", color: "text-indigo-400 bg-indigo-400/10", action: () => exportPDF("modern") },
    { id: "copy", icon: copied ? "✅" : "📋", label: copied ? "Copied!" : "Copy as Plain Text", sub: "Paste into Word or Google Docs", color: "text-amber-400 bg-amber-400/10", action: copyText },
  ];

  return (
    <div className="py-8 animate-fade-in">
      <h1 className="font-serif text-2xl mb-2">Export</h1>
      <p className="text-zinc-500 text-sm mb-6">Download your verified resume or copy for other uses.</p>

      {entries.length === 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-amber-300 text-sm mb-6">
          No entries yet — add entries first then return here to export.
        </div>
      )}

      <div className="flex flex-col gap-3 mb-6">
        {actions.map((a) => (
          <button key={a.id} onClick={a.action} disabled={exporting !== null}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4 text-left hover:border-zinc-700 transition-colors disabled:opacity-60">
            <div className={`w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center text-xl ${a.color}`}>
              {exporting === a.id ? "⏳" : a.icon}
            </div>
            <div>
              <div className="font-semibold text-sm">{exporting === a.id ? "Generating…" : a.label}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{a.sub}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6">
        <div className="font-semibold text-sm mb-1">📤 Parent / Counselor Share</div>
        <p className="text-xs text-zinc-500 mb-4">Share a read-only link. Coming in Phase 2.</p>
        <button disabled className="w-full border border-zinc-700 text-zinc-600 rounded-xl py-2.5 text-sm cursor-not-allowed">
          Generate Share Link (Coming Soon)
        </button>
      </div>

      <Disclaimer>
        Always proofread exported documents before submitting. ApplyWell is a drafting tool — you are responsible for final accuracy.
      </Disclaimer>
    </div>
  );
}
