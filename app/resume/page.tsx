"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/lib/context";
import { SECTION_LABELS, EntryType, ENTRY_TYPES } from "@/lib/types";
import Link from "next/link";
import type { TemplateKey } from "@/lib/pdf/pdfExport";

const TEMPLATE_STORAGE_KEY = "applywell_resume_template";

// ── Template metadata ─────────────────────────────────────────────────────────

interface TemplateMeta {
  key: TemplateKey;
  label: string;
  description: string;
  pro: boolean;
  emoji: string;
}

const TEMPLATES: TemplateMeta[] = [
  {
    key: "classic",
    label: "Classic",
    description: "ATS-friendly · Times New Roman · Centered header",
    pro: false,
    emoji: "📄",
  },
  {
    key: "modern",
    label: "Modern",
    description: "Clean sans-serif · Left accent bar · Bold name",
    pro: false,
    emoji: "✦",
  },
  {
    key: "compact",
    label: "Compact",
    description: "Tight spacing · Fits more on one page · Sans-serif",
    pro: true,
    emoji: "⬛",
  },
  {
    key: "executive",
    label: "Executive",
    description: "Serif · Double rules · Boxed section headings",
    pro: true,
    emoji: "◆",
  },
  {
    key: "split",
    label: "Split",
    description: "Dark header band · Clean sans · High contrast",
    pro: true,
    emoji: "▌",
  },
];

// ── Preview style helpers — drive on-screen preview per template ──────────────

interface PreviewStyle {
  fontFamily: string;
  fontSize: string;
  lineHeight: string | number;
  headerNode: (profile: AppProfile) => React.ReactNode;
  sectionHead: (label: string) => React.ReactNode;
  entryTitleSize: string;
  entryGap: string;
}

type AppProfile = ReturnType<typeof useApp>["state"]["profile"];

function previewStyleFor(t: TemplateKey): PreviewStyle {
  switch (t) {
    case "classic":
      return {
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: "11pt",
        lineHeight: 1.4,
        entryTitleSize: "11pt",
        entryGap: "10px",
        headerNode: (p) => (
          <div style={{ textAlign: "center", borderBottom: "2px solid #111", paddingBottom: 12, marginBottom: 16 }}>
            <div style={{ fontSize: "18pt", fontWeight: 700, letterSpacing: 1 }}>
              {p.name?.toUpperCase() || "YOUR NAME"}
            </div>
            {p.school && <div style={{ fontSize: "10pt", marginTop: 3 }}>{p.school}</div>}
            {p.email && <div style={{ fontSize: "10pt" }}>{p.email}</div>}
          </div>
        ),
        sectionHead: (label) => (
          <div style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "10.5pt", borderBottom: "1px solid #888", paddingBottom: 3, marginBottom: 8 }}>
            {label}
          </div>
        ),
      };

    case "modern":
      return {
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontSize: "10.5pt",
        lineHeight: 1.45,
        entryTitleSize: "11pt",
        entryGap: "10px",
        headerNode: (p) => (
          <div style={{ borderLeft: "4px solid #111", paddingLeft: 16, marginBottom: 20 }}>
            <div style={{ fontSize: "22pt", fontWeight: 700, letterSpacing: -1 }}>{p.name || "Your Name"}</div>
            {p.school && <div style={{ fontSize: "10pt", color: "#555", marginTop: 2 }}>{p.school}{p.grade && ` · Grade ${p.grade}`}</div>}
            {p.email && <div style={{ fontSize: "9.5pt", color: "#777" }}>{p.email}</div>}
          </div>
        ),
        sectionHead: (label) => (
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: "inline-block", borderTop: "2px solid #111", paddingTop: 2, fontWeight: 700, fontSize: "9pt", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
            <div style={{ borderBottom: "0.5px solid #ccc" }} />
          </div>
        ),
      };

    case "compact":
      return {
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontSize: "9pt",
        lineHeight: 1.3,
        entryTitleSize: "9.5pt",
        entryGap: "6px",
        headerNode: (p) => (
          <div style={{ textAlign: "center", borderBottom: "1px solid #333", paddingBottom: 8, marginBottom: 10 }}>
            <div style={{ fontSize: "15pt", fontWeight: 700, letterSpacing: 0.5 }}>{p.name?.toUpperCase() || "YOUR NAME"}</div>
            <div style={{ fontSize: "8.5pt", color: "#444", marginTop: 2 }}>
              {[p.school, p.email].filter(Boolean).join(" · ")}
            </div>
          </div>
        ),
        sectionHead: (label) => (
          <div style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "8.5pt", borderBottom: "0.5px solid #999", paddingBottom: 2, marginBottom: 6 }}>
            {label}
          </div>
        ),
      };

    case "executive":
      return {
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: "10.5pt",
        lineHeight: 1.45,
        entryTitleSize: "11pt",
        entryGap: "10px",
        headerNode: (p) => (
          <div style={{ textAlign: "center", borderTop: "1.5px solid #111", borderBottom: "1.5px solid #111", padding: "10px 0 8px", marginBottom: 18 }}>
            <div style={{ fontSize: "20pt", fontWeight: 700, letterSpacing: 2 }}>{p.name?.toUpperCase() || "YOUR NAME"}</div>
            {p.school && <div style={{ fontSize: "10pt", fontStyle: "italic", color: "#444", marginTop: 2 }}>{p.school}</div>}
            {p.email && <div style={{ fontSize: "9.5pt", color: "#666" }}>{p.email}</div>}
          </div>
        ),
        sectionHead: (label) => (
          <div style={{ background: "#efefef", padding: "3px 6px", fontWeight: 700, fontSize: "9.5pt", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 9 }}>
            {label}
          </div>
        ),
      };

    case "split":
      return {
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontSize: "10pt",
        lineHeight: 1.42,
        entryTitleSize: "10.5pt",
        entryGap: "9px",
        headerNode: (p) => (
          <div style={{ background: "#1c1c1c", color: "#fff", margin: "-48px -48px 20px -48px", padding: "28px 48px 22px" }}>
            <div style={{ fontSize: "21pt", fontWeight: 700 }}>{p.name || "Your Name"}</div>
            {(p.school || p.email) && (
              <div style={{ fontSize: "9.5pt", color: "#bbb", marginTop: 4 }}>
                {[p.school, p.email].filter(Boolean).join("  ·  ")}
              </div>
            )}
          </div>
        ),
        sectionHead: (label) => (
          <div style={{ marginBottom: 9 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
              <div style={{ width: 22, height: 2, background: "#111" }} />
              <div style={{ fontWeight: 700, fontSize: "9pt", textTransform: "uppercase", letterSpacing: "0.11em" }}>{label}</div>
            </div>
            <div style={{ borderBottom: "0.5px solid #ddd" }} />
          </div>
        ),
      };
  }
}

// ── Utility ───────────────────────────────────────────────────────────────────

function formatDate(d: string) {
  if (!d) return "Present";
  const [y, m] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m) - 1]} ${y}`;
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ResumePage() {
  const { state } = useApp();
  const { profile, entries } = state;

  const [template, setTemplate] = useState<TemplateKey>("classic");
  const [isPro, setIsPro] = useState(false);
  const [visible, setVisible] = useState<Set<string>>(new Set(entries.map(e => e.id)));
  const [showWatermarkInfo, setShowWatermarkInfo] = useState(false);
  const [showProGate, setShowProGate] = useState(false);
  const [gatedTemplate, setGatedTemplate] = useState<TemplateKey | null>(null);

  // Hydrate from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(TEMPLATE_STORAGE_KEY) as TemplateKey | null;
    const pro = localStorage.getItem("applywell_pro") === "true";
    setIsPro(pro);
    if (stored && TEMPLATES.find(t => t.key === stored)) {
      const meta = TEMPLATES.find(t => t.key === stored)!;
      if (!meta.pro || pro) setTemplate(stored);
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(TEMPLATE_STORAGE_KEY, template);
  }, [template]);

  function handleSelectTemplate(key: TemplateKey) {
    const meta = TEMPLATES.find(t => t.key === key)!;
    if (meta.pro && !isPro) {
      setGatedTemplate(key);
      setShowProGate(true);
      return;
    }
    setTemplate(key);
  }

  const toggleEntry = (id: string) =>
    setVisible(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const visibleEntries = entries.filter(e => visible.has(e.id));
  const grouped = ENTRY_TYPES.reduce<Record<string, typeof entries>>((acc, t) => {
    const items = visibleEntries.filter(e => e.type === t);
    if (items.length) acc[t] = items;
    return acc;
  }, {});

  const ps = previewStyleFor(template);

  return (
    <div className="py-6 animate-fade-in">

      {/* ── Template selector ─────────────────────────────────────────────── */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Template</p>
        <div className="flex flex-col gap-2">
          {TEMPLATES.map(meta => {
            const active = template === meta.key;
            const locked = meta.pro && !isPro;
            return (
              <button
                key={meta.key}
                onClick={() => handleSelectTemplate(meta.key)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                  active
                    ? "border-emerald-400 bg-emerald-400/8 text-zinc-100"
                    : locked
                    ? "border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:border-zinc-700"
                    : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-600"
                }`}
              >
                <span className="text-lg flex-shrink-0 w-7 text-center" aria-hidden>{meta.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{meta.label}</span>
                    {meta.pro ? (
                      <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${
                        isPro
                          ? "bg-amber-400/15 text-amber-400 border border-amber-400/25"
                          : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                      }`}>
                        {isPro ? "PRO" : "🔒 PRO"}
                      </span>
                    ) : (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 font-semibold">FREE</span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5">{meta.description}</div>
                </div>
                {active && (
                  <span className="text-emerald-400 text-sm flex-shrink-0">✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Entry toggles ─────────────────────────────────────────────────── */}
      {entries.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Show / Hide Entries</p>
          <div className="flex flex-wrap gap-2">
            {entries.map(e => (
              <button key={e.id} onClick={() => toggleEntry(e.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
                  ${visible.has(e.id)
                    ? "border-emerald-400 bg-emerald-400/10 text-emerald-400"
                    : "border-zinc-700 text-zinc-600"}`}>
                {e.title.slice(0, 22)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Resume preview ────────────────────────────────────────────────── */}
      <div className="relative mb-4">
        <div className="overflow-x-auto shadow-2xl rounded-sm">
          <div
            id="resume-paper"
            style={{
              background: "white",
              color: "#111",
              padding: 48,
              fontFamily: ps.fontFamily,
              fontSize: ps.fontSize,
              lineHeight: ps.lineHeight,
              minWidth: 480,
              position: "relative",
            }}
          >
            {/* Watermark overlay */}
            {!isPro && (
              <div style={{
                position: "absolute", inset: 0, zIndex: 10,
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

            {/* Header — driven by template */}
            {ps.headerNode(profile)}

            {/* GPA / Interests */}
            {(profile.gpa || profile.interests) && (
              <div style={{ marginBottom: 14, fontSize: ps.fontSize }}>
                {profile.gpa && <span><strong>GPA:</strong> {profile.gpa}&nbsp;&nbsp;</span>}
                {profile.interests && <span><strong>Interests:</strong> {profile.interests}</span>}
              </div>
            )}

            {/* Sections */}
            {Object.entries(grouped).map(([type, items]) => (
              <div key={type} style={{ marginBottom: 16 }}>
                {ps.sectionHead(SECTION_LABELS[type as EntryType] || type)}
                {items.map(entry => (
                  <EntryRow
                    key={entry.id}
                    entry={entry}
                    titleSize={ps.entryTitleSize}
                    bodySize={ps.fontSize}
                    gap={ps.entryGap}
                  />
                ))}
              </div>
            ))}

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

      {/* ── Watermark info modal ──────────────────────────────────────────── */}
      {showWatermarkInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-lg font-semibold mb-2">Preview Mode</div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              The watermark is removed when you download the PDF. The downloaded file is clean and ready to submit — no watermark, no branding.
            </p>
            <p className="text-zinc-500 text-xs mb-4">
              Classic and Modern templates are free. Compact, Executive, and Split require a one-time upgrade.
            </p>
            <button onClick={() => setShowWatermarkInfo(false)}
              className="w-full bg-emerald-400 text-zinc-900 font-semibold rounded-xl py-2.5 text-sm">
              Got it
            </button>
          </div>
        </div>
      )}

      {/* ── Pro gate modal ────────────────────────────────────────────────── */}
      {showProGate && gatedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-2xl mb-2">{TEMPLATES.find(t => t.key === gatedTemplate)?.emoji}</div>
            <div className="text-lg font-semibold mb-1">{TEMPLATES.find(t => t.key === gatedTemplate)?.label} Template</div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              This template is included with the one-time Pro upgrade. Unlock all 3 pro templates plus watermark-free PDF and Word exports.
            </p>
            <Link
              href="/export"
              onClick={() => setShowProGate(false)}
              className="block w-full bg-emerald-400 hover:bg-emerald-300 text-zinc-900 font-semibold rounded-xl py-2.5 text-sm text-center transition-colors mb-3"
            >
              Upgrade — $39 one-time
            </Link>
            <button
              onClick={() => setShowProGate(false)}
              className="w-full text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}

      {/* ── Actions ───────────────────────────────────────────────────────── */}
      <div className="flex gap-3">
        <Link href="/export"
          className="flex-1 bg-emerald-400 text-zinc-900 font-semibold rounded-xl py-3 text-sm text-center hover:opacity-90 transition-opacity">
          ⬇️ Download PDF
        </Link>
        <Link href="/export"
          className="flex-1 border border-zinc-700 text-zinc-300 font-semibold rounded-xl py-3 text-sm text-center hover:border-emerald-400 hover:text-emerald-400 transition-colors">
          ✨ Upgrade to export clean
        </Link>
      </div>

      <p className="text-xs text-zinc-600 text-center mt-3">
        Downloaded PDF has no watermark ✓
      </p>
    </div>
  );
}

// ── EntryRow component ────────────────────────────────────────────────────────

function EntryRow({
  entry,
  titleSize,
  bodySize,
  gap,
}: {
  entry: ReturnType<typeof useApp>["state"]["entries"][0];
  titleSize: string;
  bodySize: string;
  gap: string;
}) {
  return (
    <div style={{ marginBottom: gap }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <strong style={{ fontSize: titleSize }}>{entry.title}</strong>
        <span style={{ fontSize: "9.5pt", color: "#555", flexShrink: 0, marginLeft: 8 }}>
          {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
        </span>
      </div>
      {entry.org && (
        <div style={{ fontSize: bodySize, fontStyle: "italic", color: "#333" }}>{entry.org}</div>
      )}
      {entry.hrsPerWeek && (
        <div style={{ fontSize: "9.5pt", color: "#666" }}>
          {entry.hrsPerWeek} hrs/wk · {entry.weeksPerYear} wks/yr
        </div>
      )}
      {(entry.bullets?.length ? entry.bullets : entry.description ? [entry.description] : []).map((b, i) => (
        <div key={i} style={{ fontSize: bodySize, lineHeight: 1.5, paddingLeft: 14, position: "relative", marginTop: 3 }}>
          <span style={{ position: "absolute", left: 0 }}>•</span>{b}
        </div>
      ))}
    </div>
  );
}
