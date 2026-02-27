"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { SECTION_LABELS, EntryType, ENTRY_TYPES } from "@/lib/types";

function formatDate(d: string) {
  if (!d) return "Present";
  const [y, m] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m) - 1]} ${y}`;
}

export default function ResumePage() {
  const { state } = useApp();
  const { profile, entries } = state;
  const [template, setTemplate] = useState<"classic" | "modern">("classic");
  const [visible, setVisible] = useState<Set<string>>(new Set(entries.map((e) => e.id)));
  const [exporting, setExporting] = useState(false);

  const toggleEntry = (id: string) =>
    setVisible((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const visibleEntries = entries.filter((e) => visible.has(e.id));

  const grouped = ENTRY_TYPES.reduce<Record<string, typeof entries>>((acc, t) => {
    const items = visibleEntries.filter((e) => e.type === t);
    if (items.length) acc[t] = items;
    return acc;
  }, {});

  const handleExport = async () => {
    setExporting(true);
    try {
      const { exportResumePDF } = await import("@/lib/pdf/pdfExport");
      await exportResumePDF(state, template, `resume-${template}.pdf`);
    } catch (e) {
      console.error(e);
      alert("PDF export failed. Check console for details.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="py-8 animate-fade-in">
      <h1 className="font-serif text-2xl mb-5">Resume Preview</h1>

      {/* Template switcher */}
      <div className="flex gap-2 mb-4">
        {(["classic", "modern"] as const).map((t) => (
          <button key={t} onClick={() => setTemplate(t)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors capitalize
              ${template === t
                ? "border-emerald-400 bg-emerald-400/10 text-emerald-400"
                : "border-zinc-700 text-zinc-500 hover:border-zinc-500"}`}>
            {t === "classic" ? "Classic (ATS)" : "Modern Minimal"}
          </button>
        ))}
      </div>

      {/* Entry toggles */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-5">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Toggle Entries</p>
        <div className="flex flex-wrap gap-2">
          {entries.map((e) => (
            <button key={e.id} onClick={() => toggleEntry(e.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
                ${visible.has(e.id)
                  ? "border-emerald-400 bg-emerald-400/10 text-emerald-400"
                  : "border-zinc-700 text-zinc-600"}`}>
              {e.title.slice(0, 24)}
            </button>
          ))}
        </div>
      </div>

      {/* Resume paper */}
      <div className="overflow-x-auto mb-5 shadow-2xl rounded-sm">
        <div id="resume-paper" className={`resume-paper ${template === "modern" ? "modern" : ""}`}
          style={{ minWidth: 520 }}>
          {/* Header */}
          {template === "classic" ? (
            <div style={{ textAlign: "center", borderBottom: "2px solid #111", paddingBottom: 12, marginBottom: 16 }}>
              <div style={{ fontSize: "18pt", fontWeight: 700, letterSpacing: 1 }}>
                {profile.name?.toUpperCase() || "YOUR NAME"}
              </div>
              {profile.school && <div style={{ fontSize: "10pt", marginTop: 3 }}>{profile.school}</div>}
              {profile.email && <div style={{ fontSize: "10pt" }}>{profile.email}</div>}
            </div>
          ) : (
            <div style={{ borderLeft: "4px solid #111", paddingLeft: 16, marginBottom: 20 }}>
              <div style={{ fontSize: "22pt", fontWeight: 700, letterSpacing: -1, fontFamily: "inherit" }}>
                {profile.name || "Your Name"}
              </div>
              {profile.school && (
                <div style={{ fontSize: "10pt", color: "#555", marginTop: 2 }}>
                  {profile.school}{profile.grade && ` · Grade ${profile.grade}`}
                </div>
              )}
            </div>
          )}

          {/* Summary line */}
          {(profile.gpa || profile.interests) && (
            <div style={{ marginBottom: 14, fontSize: "10pt" }}>
              {profile.gpa && <span><strong>GPA:</strong> {profile.gpa}&nbsp;&nbsp;</span>}
              {profile.interests && <span><strong>Interests:</strong> {profile.interests}</span>}
            </div>
          )}

          {/* Sections */}
          {Object.entries(grouped).map(([type, items]) => (
            <div key={type} style={{ marginBottom: 16 }}>
              <div style={{
                fontSize: "10.5pt", fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.08em", borderBottom: "1px solid #888",
                paddingBottom: 3, marginBottom: 8,
              }}>
                {SECTION_LABELS[type as EntryType] || type}
              </div>
              {items.map((entry) => (
                <div key={entry.id} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <strong style={{ fontSize: "11pt" }}>{entry.title}</strong>
                    <span style={{ fontSize: "9.5pt", color: "#555", flexShrink: 0, marginLeft: 8 }}>
                      {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
                    </span>
                  </div>
                  {entry.org && (
                    <div style={{ fontSize: "10pt", fontStyle: "italic", color: "#333" }}>{entry.org}</div>
                  )}
                  {entry.hrsPerWeek && (
                    <div style={{ fontSize: "9.5pt", color: "#666" }}>
                      {entry.hrsPerWeek} hrs/wk · {entry.weeksPerYear} wks/yr
                    </div>
                  )}
                  {(entry.bullets?.length ? entry.bullets : entry.description ? [entry.description] : []).map((b, i) => (
                    <div key={i} style={{ fontSize: "10pt", lineHeight: 1.5, paddingLeft: 14, position: "relative", marginTop: 3 }}>
                      <span style={{ position: "absolute", left: 0 }}>•</span>
                      {b}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}

          {visibleEntries.length === 0 && (
            <div style={{ textAlign: "center", color: "#999", padding: "40px 0" }}>
              Toggle entries above to see them here
            </div>
          )}
        </div>
      </div>

      <button onClick={handleExport} disabled={exporting}
        className="w-full bg-emerald-400 text-zinc-900 font-semibold rounded-xl py-3.5 text-sm hover:opacity-90 disabled:opacity-50 transition-opacity">
        {exporting ? "Generating PDF…" : "⬇️ Download PDF"}
      </button>
    </div>
  );
}
