"use client";

import { useRef, useState } from "react";
import { useApp } from "@/lib/context";
import { Disclaimer } from "@/components/ui";
import { scoreResume } from "@/lib/score";

// ── Export success toast ──────────────────────────────────────────────────────
function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 border border-zinc-700 rounded-full px-5 py-2.5 text-sm text-zinc-200 font-medium shadow-xl animate-fade-in flex items-center gap-2"
      onAnimationEnd={() => setTimeout(onDone, 2200)}
    >
      <span className="text-emerald-400">✓</span> {message}
    </div>
  );
}

export default function ExportPage() {
  const { state, updateProfile, saveEntry } = useApp();
  const { profile, entries } = state;

  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [importMsg, setImportMsg] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { score, grade, checks, suggestions } = scoreResume(state);

  const gradeColor =
    grade === "A" ? "text-emerald-400" :
    grade === "B" ? "text-sky-400" :
    grade === "C" ? "text-amber-400" :
    "text-red-400";

  const barColor =
    grade === "A" ? "bg-emerald-500" :
    grade === "B" ? "bg-sky-500" :
    grade === "C" ? "bg-amber-500" :
    "bg-red-500";

  const showToast = (msg: string) => {
    setToast(msg);
  };

  // ── PDF ───────────────────────────────────────────────────────────────────
  const exportPDF = async (template: "classic" | "modern") => {
    setExporting(template);
    try {
      const { exportResumePDF } = await import("@/lib/pdf/pdfExport");
      await exportResumePDF(state, template, `applywell-resume-${template}.pdf`);
      showToast(`PDF (${template}) downloaded`);
    } catch (e) {
      console.error(e);
      alert("PDF export failed. Please try again.");
    } finally {
      setExporting(null);
    }
  };

  // ── DOCX ──────────────────────────────────────────────────────────────────
  const exportDOCX = async () => {
    setExporting("docx");
    try {
      const { exportResumeDOCX } = await import("@/lib/docx/docxExport");
      await exportResumeDOCX(state, "applywell-resume.docx");
      showToast("Word document downloaded");
    } catch (e) {
      console.error(e);
      alert("DOCX export failed. Please try again.");
    } finally {
      setExporting(null);
    }
  };

  // ── Plain text ────────────────────────────────────────────────────────────
  const copyText = async () => {
    const text = [
      profile.name?.toUpperCase() || "STUDENT NAME",
      profile.school,
      profile.gpa && `GPA: ${profile.gpa}`,
      "",
      ...entries.map((e) =>
        [
          `${e.type.toUpperCase()}: ${e.title}${e.org ? ` | ${e.org}` : ""}`,
          e.description && `  ${e.description}`,
          ...(e.bullets || []).map((b) => `  • ${b}`),
        ]
          .filter(Boolean)
          .join("\n")
      ),
    ]
      .filter(Boolean)
      .join("\n\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    showToast("Copied to clipboard");
    setTimeout(() => setCopied(false), 2500);
  };

  // ── JSON backup ───────────────────────────────────────────────────────────
  const downloadBackup = () => {
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `applywell-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Backup downloaded");
  };

  // ── JSON import ───────────────────────────────────────────────────────────
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (!parsed.profile || !Array.isArray(parsed.entries)) {
          throw new Error("Invalid format");
        }
        updateProfile(parsed.profile);
        parsed.entries.forEach((entry: Parameters<typeof saveEntry>[0]) => saveEntry(entry));
        setImportMsg(`✓ Imported ${parsed.entries.length} entries successfully.`);
        setTimeout(() => setImportMsg(null), 4000);
      } catch {
        setImportMsg("✗ Could not read file. Make sure it's a valid ApplyWell backup.");
        setTimeout(() => setImportMsg(null), 4000);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const resumeActions = [
    {
      id: "pdf-classic",
      icon: "📄",
      label: "Download PDF — Classic",
      sub: "ATS-friendly serif layout",
      color: "text-emerald-400 bg-emerald-400/10",
      action: () => exportPDF("classic"),
    },
    {
      id: "pdf-modern",
      icon: "📐",
      label: "Download PDF — Modern",
      sub: "Clean sans-serif layout",
      color: "text-indigo-400 bg-indigo-400/10",
      action: () => exportPDF("modern"),
    },
    {
      id: "docx",
      icon: "📝",
      label: "Download Word (.docx)",
      sub: "Edit in Word or Google Docs",
      color: "text-sky-400 bg-sky-400/10",
      action: exportDOCX,
    },
    {
      id: "copy",
      icon: copied ? "✅" : "📋",
      label: copied ? "Copied!" : "Copy as Plain Text",
      sub: "Paste anywhere",
      color: "text-amber-400 bg-amber-400/10",
      action: copyText,
    },
  ];

  return (
    <div className="py-8 animate-fade-in">
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      <h1 className="font-serif text-2xl mb-2">Export</h1>
      <p className="text-zinc-500 text-sm mb-6">
        Download your resume or back up your data.
      </p>

      {/* ── Score card ─────────────────────────────────────────────────────── */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold text-sm">Resume Completeness</div>
          <div className={`text-2xl font-bold font-serif ${gradeColor}`}>
            {grade}
            <span className="text-base text-zinc-400 font-sans font-normal ml-1.5">
              {score}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-zinc-800 rounded-full mb-4 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${barColor}`}
            style={{ width: `${score}%` }}
          />
        </div>

        {/* Checks */}
        <div className="flex flex-col gap-1.5 mb-3">
          {checks.map((c) => (
            <div key={c.label} className="flex items-start gap-2 text-xs">
              <span className={`flex-shrink-0 ${c.passed ? "text-emerald-400" : "text-zinc-600"}`}>
                {c.passed ? "✓" : "○"}
              </span>
              <span className={c.passed ? "text-zinc-300" : "text-zinc-500"}>
                {c.passed ? c.label : c.detail}
              </span>
            </div>
          ))}
        </div>

        {/* Suggestions toggle */}
        {suggestions.length > 0 && (
          <div>
            <button
              onClick={() => setShowSuggestions((s) => !s)}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
            >
              <span>{showSuggestions ? "▾" : "▸"}</span>
              {suggestions.length} writing suggestion{suggestions.length > 1 ? "s" : ""}
            </button>

            {showSuggestions && (
              <div className="mt-3 flex flex-col gap-2">
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    className={`text-xs rounded-lg px-3 py-2.5 leading-relaxed ${
                      s.severity === "warn"
                        ? "bg-amber-500/10 border border-amber-500/20 text-amber-300"
                        : "bg-zinc-800 border border-zinc-700 text-zinc-400"
                    }`}
                  >
                    {s.severity === "warn" ? "⚠ " : "💡 "}
                    {s.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Resume download actions ─────────────────────────────────────────── */}
      {entries.length === 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-amber-300 text-sm mb-4">
          No entries yet — add entries first, then return here to export.
        </div>
      )}

      <div className="flex flex-col gap-3 mb-6">
        {resumeActions.map((a) => (
          <button
            key={a.id}
            onClick={a.action}
            disabled={exporting !== null}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4 text-left hover:border-zinc-700 transition-colors disabled:opacity-60"
          >
            <div
              className={`w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center text-xl ${a.color}`}
            >
              {exporting === a.id ? "⏳" : a.icon}
            </div>
            <div>
              <div className="font-semibold text-sm">
                {exporting === a.id ? "Generating…" : a.label}
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">{a.sub}</div>
            </div>
          </button>
        ))}
      </div>

      {/* ── Backup / Import ─────────────────────────────────────────────────── */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6">
        <div className="font-semibold text-sm mb-1">💾 Backup & Restore</div>
        <p className="text-xs text-zinc-500 mb-4">
          Save all your data as a JSON file, or restore from a previous backup.
          Importing merges entries on top of your current data.
        </p>
        <div className="flex flex-col gap-2">
          <button
            onClick={downloadBackup}
            className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 rounded-xl py-2.5 text-sm transition-colors"
          >
            Download Backup (.json)
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 rounded-xl py-2.5 text-sm transition-colors"
          >
            Import from Backup
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={handleImport}
          />
        </div>
        {importMsg && (
          <p
            className={`text-xs mt-3 ${
              importMsg.startsWith("✓") ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {importMsg}
          </p>
        )}
      </div>

      <Disclaimer>
        Always proofread exported documents before submitting. ApplyWell is a
        drafting tool — you are responsible for final accuracy.
      </Disclaimer>
    </div>
  );
}
