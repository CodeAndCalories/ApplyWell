
"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { SECTION_LABELS, EntryType, ENTRY_TYPES } from "@/lib/types";
import Link from "next/link";

function formatDate(d: string) {
  if (!d) return "Present";
  const [y, m] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m) - 1]} ${y}`;
}

type Mode = "resume" | "college";
type Template = "classic" | "modern";

export default function ResumePage() {
  const { state } = useApp();
  const { profile, entries } = state;
  const [template, setTemplate] = useState<Template>("classic");
  const [mode, setMode] = useState<Mode>("resume");
  const [visible, setVisible] = useState<Set<string>>(new Set(entries.map(e => e.id)));
  const [exporting, setExporting] = useState(false);
  const [showWatermarkInfo, setShowWatermarkInfo] = useState(false);

  const isPro = false; // flip to true when Clerk + payments added

  const toggleEntry = (id: string) =>
    setVisible(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const visibleEntries = entries.filter(e => visible.has(e.id));

  // College app mode filters differently - highlights activities over academics
  const collegeActivityTypes = ["Activity","Sport","Volunteer","Work","Project"];
  const collegeAcademicTypes = ["Education","Coursework","Award","Certification"];

  const grouped = ENTRY_TYPES.reduce<Record<string, typeof entries>>((acc, t) => {
    const items = visibleEntries.filter(e => e.type === t);
    if (items.length) acc[t] = items;
    return acc;
  }, {});

  const handleExport = async () => {
    setExporting(true);
    try {
      const { exportResumePDF } = await import("@/lib/pdf/pdfExport");
      await exportResumePDF(state, template, `applywell-${mode}-${template}.pdf`);
    } catch (e) {
      console.error(e);
      alert("PDF export failed. Please try again.");
    } finally { setExporting(false); }
  };

  return (
    <div className="py-6 animate-fade-in">
      {/* Mode switcher */}
      <div className="flex gap-2 mb-5 p-1 bg-zinc-900 rounded-xl border border-zinc-800">
        {([["resume","📄 Resume","Standard resume format"],["college","🎓 College App","Common App style"]] as const).map(([m, label, sub]) => (
          <button key={m} onClick={() => setMode(m as Mode)}
            className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
              mode === m ? "bg-emerald-400 text-zinc-900" : "text-zinc-500 hover:text-zinc-300"}`}>
            <div>{label}</div>
            <div className={`text-xs font-normal mt-0.5 ${mode === m ? "text-zinc-800" : "text-zinc-600"}`}>{sub}</div>
          </button>
        ))}
      </div>

      {mode === "college" && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 mb-4 text-blue-300 text-xs leading-relaxed">
          🎓 <strong>College App Mode</strong> — prioritizes activities, leadership, and impact over academics. Formatted for Common App supplemental materials.
        </div>
      )}

      {/* Template switcher */}
      <div className="flex gap-2 mb-4">
        {(["classic","modern"] as const).map(t => (
          <button key={t} onClick={() => setTemplate(t)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors
              ${template === t ? "border-emerald-400 bg-emerald-400/10 text-emerald-400" : "border-zinc-700 text-zinc-500 hover:border-zinc-500"}`}>
            {t === "classic" ? "Classic (ATS)" : "Modern"}
          </button>
        ))}
      </div>

      {/* Entry toggles */}
      {entries.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Show / Hide Entries</p>
          <div className="flex flex-wrap gap-2">
            {entries.map(e => (
              <button key={e.id} onClick={() => toggleEntry(e.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
                  ${visible.has(e.id) ? "border-emerald-400 bg-emerald-400/10 text-emerald-400" : "border-zinc-700 text-zinc-600"}`}>
                {e.title.slice(0, 22)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Resume preview with watermark */}
      <div className="relative mb-4">
        <div className="overflow-x-auto shadow-2xl rounded-sm">
          <div id="resume-paper" className={`resume-paper ${template === "modern" ? "modern" : ""}`}
            style={{ minWidth: 480, position: "relative" }}>

            {/* Watermark overlay */}
            {!isPro && (
              <div style={{
                position: "absolute", inset: 0, zIndex: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                pointerEvents: "none",
              }}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{
                    position: "absolute",
                    top: `${15 + i * 16}%`,
                    left: "50%",
                    transform: "translateX(-50%) rotate(-30deg)",
                    fontSize: "32pt",
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.07)",
                    whiteSpace: "nowrap",
                    letterSpacing: 4,
                    userSelect: "none",
                  }}>
                    PREVIEW ONLY
                  </div>
                ))}
              </div>
            )}

            {/* Classic header */}
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
                <div style={{ fontSize: "22pt", fontWeight: 700, letterSpacing: -1 }}>{profile.name || "Your Name"}</div>
                {profile.school && <div style={{ fontSize: "10pt", color: "#555", marginTop: 2 }}>{profile.school}{profile.grade && ` · Grade ${profile.grade}`}</div>}
              </div>
            )}

            {(profile.gpa || profile.interests) && (
              <div style={{ marginBottom: 14, fontSize: "10pt" }}>
                {profile.gpa && <span><strong>GPA:</strong> {profile.gpa}&nbsp;&nbsp;</span>}
                {profile.interests && <span><strong>Interests:</strong> {profile.interests}</span>}
              </div>
            )}

            {/* College app mode: activities first */}
            {mode === "college" ? (
              <>
                {collegeActivityTypes.map(type => {
                  const items = visibleEntries.filter(e => e.type === type);
                  if (!items.length) return null;
                  return (
                    <div key={type} style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: "10.5pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid #888", paddingBottom: 3, marginBottom: 8 }}>
                        {SECTION_LABELS[type as EntryType] || type}
                      </div>
                      {items.map(entry => <EntryRow key={entry.id} entry={entry} />)}
                    </div>
                  );
                })}
                {collegeAcademicTypes.map(type => {
                  const items = visibleEntries.filter(e => e.type === type);
                  if (!items.length) return null;
                  return (
                    <div key={type} style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: "10.5pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid #888", paddingBottom: 3, marginBottom: 8 }}>
                        {SECTION_LABELS[type as EntryType] || type}
                      </div>
                      {items.map(entry => <EntryRow key={entry.id} entry={entry} />)}
                    </div>
                  );
                })}
              </>
            ) : (
              Object.entries(grouped).map(([type, items]) => (
                <div key={type} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: "10.5pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid #888", paddingBottom: 3, marginBottom: 8 }}>
                    {SECTION_LABELS[type as EntryType] || type}
                  </div>
                  {items.map(entry => <EntryRow key={entry.id} entry={entry} />)}
                </div>
              ))
            )}

            {visibleEntries.length === 0 && (
              <div style={{ textAlign: "center", color: "#aaa", padding: "40px 0", fontSize: "11pt" }}>
                Toggle entries above to see them here
              </div>
            )}
          </div>
        </div>

        {/* Watermark banner */}
        {!isPro && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent pt-16 pb-4 px-4 text-center rounded-b-sm">
            <button onClick={() => setShowWatermarkInfo(true)}
              className="text-xs text-zinc-400 underline underline-offset-2">
              Why is there a watermark?
            </button>
          </div>
        )}
      </div>

      {showWatermarkInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-lg font-semibold mb-2">Preview Mode</div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              The watermark is removed when you download the PDF. The downloaded file is clean and ready to submit — no watermark, no branding.
            </p>
            <p className="text-zinc-500 text-xs mb-4">
              In a future paid version, premium templates and AI-powered suggestions will be gated. The core resume export will always be free.
            </p>
            <button onClick={() => setShowWatermarkInfo(false)}
              className="w-full bg-emerald-400 text-zinc-900 font-semibold rounded-xl py-2.5 text-sm">
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Link href="/export"
          className="flex-1 bg-emerald-400 text-zinc-900 font-semibold rounded-xl py-3 text-sm text-center hover:opacity-90 transition-opacity">
          ⬇️ Download PDF
        </Link>
        <button onClick={handleExport} disabled={exporting}
          className="flex-1 border border-zinc-700 text-zinc-300 font-semibold rounded-xl py-3 text-sm hover:border-zinc-500 disabled:opacity-50 transition-colors">
          {exporting ? "Generating…" : "⚡ Quick Export"}
        </button>
      </div>

      <p className="text-xs text-zinc-600 text-center mt-3">
        Downloaded PDF has no watermark ✓
      </p>
    </div>
  );
}

function EntryRow({ entry }: { entry: ReturnType<typeof useApp>["state"]["entries"][0] }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <strong style={{ fontSize: "11pt" }}>{entry.title}</strong>
        <span style={{ fontSize: "9.5pt", color: "#555", flexShrink: 0, marginLeft: 8 }}>
          {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
        </span>
      </div>
      {entry.org && <div style={{ fontSize: "10pt", fontStyle: "italic", color: "#333" }}>{entry.org}</div>}
      {entry.hrsPerWeek && (
        <div style={{ fontSize: "9.5pt", color: "#666" }}>{entry.hrsPerWeek} hrs/wk · {entry.weeksPerYear} wks/yr</div>
      )}
      {(entry.bullets?.length ? entry.bullets : entry.description ? [entry.description] : []).map((b, i) => (
        <div key={i} style={{ fontSize: "10pt", lineHeight: 1.5, paddingLeft: 14, position: "relative", marginTop: 3 }}>
          <span style={{ position: "absolute", left: 0 }}>•</span>{b}
        </div>
      ))}
    </div>
  );
}
