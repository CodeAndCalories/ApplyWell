"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { Disclaimer } from "@/components/ui";
import { SECTION_LABELS, EntryType, ENTRY_TYPES } from "@/lib/types";

function formatDate(d: string) {
  if (!d) return "Present";
  const [y, m] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m) - 1]} ${y}`;
}

export default function ExportPage() {
  const { state } = useApp();
  const { profile, entries } = state;
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState<string | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<"classic" | "modern">("classic");

  const grouped = ENTRY_TYPES.reduce<Record<string, typeof entries>>((acc, t) => {
    const items = entries.filter((e) => e.type === t);
    if (items.length) acc[t] = items;
    return acc;
  }, {});

  const exportPDF = async (template: "classic" | "modern") => {
    setExporting(template);
    setActiveTemplate(template);
    await new Promise((r) => setTimeout(r, 300));
    try {
      const { exportResumePDF } = await import("@/lib/pdf/pdfExport");
      await exportResumePDF("export-resume-paper", `applywell-resume-${template}.pdf`);
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

      {/* Hidden resume paper for PDF capture */}
      <div style={{ position: "absolute", left: "-9999px", top: 0, width: 680 }}>
        <div id="export-resume-paper" className={`resume-paper ${activeTemplate === "modern" ? "modern" : ""}`}>
          {activeTemplate === "classic" ? (
            <div style={{ textAlign: "center", borderBottom: "2px solid #111", paddingBottom: 12, marginBottom: 16 }}>
              <div style={{ fontSize: "18pt", fontWeight: 700, letterSpacing: 1 }}>{profile.name?.toUpperCase() || "YOUR NAME"}</div>
              {profile.school && <div style={{ fontSize: "10pt", marginTop: 3 }}>{profile.school}</div>}
              {profile.email && <div style={{ fontSize: "10pt" }}>{profile.email}</div>}
            </div>
          ) : (
            <div style={{ borderLeft: "4px solid #111", paddingLeft: 16, marginBottom: 20 }}>
              <div style={{ fontSize: "22pt", fontWeight: 700 }}>{profile.name || "Your Name"}</div>
              {profile.school && <div style={{ fontSize: "10pt", color: "#555", marginTop: 2 }}>{profile.school}{profile.grade && ` · Grade ${profile.grade}`}</div>}
            </div>
          )}
          {(profile.gpa || profile.interests) && (
            <div style={{ marginBottom: 14, fontSize: "10pt" }}>
              {profile.gpa && <span><strong>GPA:</strong> {profile.gpa}&nbsp;&nbsp;</span>}
              {profile.interests && <span><strong>Interests:</strong> {profile.interests}</span>}
            </div>
          )}
          {Object.entries(grouped).map(([type, items]) => (
            <div key={type} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: "10.5pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid #888", paddingBottom: 3, marginBottom: 8 }}>
                {SECTION_LABELS[type as EntryType] || type}
              </div>
              {items.map((entry) => (
                <div key={entry.id} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <strong style={{ fontSize: "11pt" }}>{entry.title}</strong>
                    <span style={{ fontSize: "9.5pt", color: "#555" }}>{formatDate(entry.startDate)} – {formatDate(entry.endDate)}</span>
                  </div>
                  {entry.org && <div style={{ fontSize: "10pt", fontStyle: "italic", color: "#333" }}>{entry.org}</div>}
                  {entry.hrsPerWeek && <div style={{ fontSize: "9.5pt", color: "#666" }}>{entry.hrsPerWeek} hrs/wk · {entry.weeksPerYear} wks/yr</div>}
                  {(entry.bullets?.length ? entry.bullets : entry.description ? [entry.description] : []).map((b, i) => (
                    <div key={i} style={{ fontSize: "10pt", lineHeight: 1.5, paddingLeft: 14, position: "relative", marginTop: 3 }}>
                      <span style={{ position: "absolute", left: 0 }}>•</span>{b}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6">
        <div className="font-semibold text-sm mb-1">📤 Parent / Counselor Share</div>
        <p className="text-xs text-zinc-500 mb-4">Share a read-only link with a parent or counselor. Coming in Phase 2.</p>
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
