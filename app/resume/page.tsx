"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useApp } from "@/lib/context";
import { SECTION_LABELS, EntryType, ENTRY_TYPES } from "@/lib/types";
import Link from "next/link";
import type { TemplateKey } from "@/lib/pdf/pdfExport";

const TEMPLATE_STORAGE_KEY = "applywell_resume_template";
const RESUME_PAPER_WIDTH = 480; // matches minWidth on the resume div

// ── Template metadata ─────────────────────────────────────────────────────────

interface TemplateMeta {
  key: TemplateKey;
  label: string;
  description: string;
  pro: boolean;
  emoji: string;
}

const TEMPLATES: TemplateMeta[] = [
  { key: "classic",   label: "Classic",    description: "ATS-friendly · Times New Roman · Centered header", pro: false, emoji: "📄" },
  { key: "modern",    label: "Modern",     description: "Clean sans-serif · Left accent bar · Bold name",   pro: false, emoji: "✦"  },
  { key: "compact",   label: "Compact",    description: "Tight spacing · Fits more on one page",            pro: true,  emoji: "⬛" },
  { key: "executive", label: "Executive",  description: "Serif · Double rules · Boxed headings",            pro: true,  emoji: "◆"  },
  { key: "split",     label: "Split",      description: "Dark header band · High contrast",                 pro: true,  emoji: "▌"  },
];

// ── Preview style helpers ─────────────────────────────────────────────────────

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
            <div style={{ fontSize: "18pt", fontWeight: 700, letterSpacing: 1 }}>{p.name?.toUpperCase() || "YOUR NAME"}</div>
            {p.school && <div style={{ fontSize: "10pt", marginTop: 3 }}>{p.school}</div>}
            {p.email  && <div style={{ fontSize: "10pt" }}>{p.email}</div>}
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
            {p.email  && <div style={{ fontSize: "9.5pt", color: "#777" }}>{p.email}</div>}
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
            <div style={{ fontSize: "8.5pt", color: "#444", marginTop: 2 }}>{[p.school, p.email].filter(Boolean).join(" · ")}</div>
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
            {p.email  && <div style={{ fontSize: "9.5pt", color: "#666" }}>{p.email}</div>}
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
              <div style={{ fontSize: "9.5pt", color: "#bbb", marginTop: 4 }}>{[p.school, p.email].filter(Boolean).join("  ·  ")}</div>
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

  const [template, setTemplate]             = useState<TemplateKey>("classic");
  const [isPro, setIsPro]                   = useState(false);
  const [visible, setVisible]               = useState<Set<string>>(new Set(entries.map(e => e.id)));
  const [showWatermarkInfo, setShowWatermarkInfo] = useState(false);
  const [showProGate, setShowProGate]       = useState(false);
  const [gatedTemplate, setGatedTemplate]   = useState<TemplateKey | null>(null);

  // ── Scaled preview refs ──────────────────────────────────────────────────
  const rightColRef   = useRef<HTMLDivElement>(null);
  const resumeInnerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale]               = useState(0.71);
  const [containerHeight, setContainerHeight] = useState(600);

  const recalculate = useCallback(() => {
    if (!rightColRef.current) return;
    const containerW = rightColRef.current.clientWidth;
    const s = Math.min(containerW / RESUME_PAPER_WIDTH, 1);
    setScale(s);
    requestAnimationFrame(() => {
      if (resumeInnerRef.current) {
        setContainerHeight(resumeInnerRef.current.scrollHeight * s);
      }
    });
  }, []);

  useEffect(() => {
    recalculate();
    const ro = new ResizeObserver(recalculate);
    if (rightColRef.current) ro.observe(rightColRef.current);
    return () => ro.disconnect();
  }, [recalculate]);

  // Recalculate height when content changes
  useEffect(() => {
    requestAnimationFrame(recalculate);
  }, [entries, template, visible, recalculate]);

  // ── localStorage hydration ───────────────────────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem(TEMPLATE_STORAGE_KEY) as TemplateKey | null;
    const pro    = localStorage.getItem("applywell_pro") === "true";
    setIsPro(pro);
    if (stored && TEMPLATES.find(t => t.key === stored)) {
      const meta = TEMPLATES.find(t => t.key === stored)!;
      if (!meta.pro || pro) setTemplate(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TEMPLATE_STORAGE_KEY, template);
  }, [template]);

  function handleSelectTemplate(key: TemplateKey) {
    const meta = TEMPLATES.find(t => t.key === key)!;
    if (meta.pro && !isPro) { setGatedTemplate(key); setShowProGate(true); return; }
    setTemplate(key);
  }

  const toggleEntry = (id: string) =>
    setVisible(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const visibleEntries = entries.filter(e => visible.has(e.id));
  const grouped = ENTRY_TYPES.reduce<Record<string, typeof entries>>((acc, t) => {
    const items = visibleEntries.filter(e => e.type === t);
    if (items.length) acc[t] = items;
    return acc;
  }, {});

  const ps = previewStyleFor(template);

  // ── Step tracker state ────────────────────────────────────────────────────
  const hasProfile  = !!(profile.name?.trim() && profile.school?.trim());
  const hasWork     = entries.some(e => e.type === "Work");
  const hasSkills   = entries.some(e => e.type === "Skill");
  const allVerified = entries.length > 0 && entries.every(e => e.verified);

  const currentStep =
    !hasProfile  ? 0 :
    !hasWork     ? 1 :
    !hasSkills   ? 2 :
    !allVerified ? 3 : 4;

  const STEPS = [
    { label: "Personal Info", href: "/profile" },
    { label: "Experience",    href: "/entries/new" },
    { label: "Skills",        href: "/entries/new" },
    { label: "Preview",       href: "/resume" },
    { label: "Export",        href: "/export" },
  ];

  return (
    <div className="py-4 animate-fade-in">

      {/* ── Step progress tracker ────────────────────────────────────────── */}
      <div className="mb-5 overflow-x-auto no-scrollbar">
        <div className="flex items-center min-w-max gap-0">
          {STEPS.map((step, i) => {
            const done    = i < currentStep;
            const active  = i === currentStep;
            const isLast  = i === STEPS.length - 1;
            return (
              <div key={step.label} className="flex items-center gap-0">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all ${
                    done
                      ? "border-emerald-400 bg-emerald-400 text-zinc-900"
                      : active
                      ? "border-emerald-400 bg-zinc-900 text-emerald-400"
                      : "border-zinc-700 bg-zinc-900 text-zinc-600"
                  }`}>
                    {done ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span className={`text-[9px] font-semibold whitespace-nowrap tracking-wide ${
                    active ? "text-emerald-400" : done ? "text-zinc-400" : "text-zinc-600"
                  }`}>
                    {step.label}
                  </span>
                </div>
                {!isLast && (
                  <div className={`w-8 h-px mb-4 mx-1 ${i < currentStep ? "bg-emerald-400/50" : "bg-zinc-700"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3 items-start">

        {/* ── LEFT PANEL: controls ──────────────────────────────────────── */}
        <div className="w-44 flex-shrink-0 sticky top-[60px] flex flex-col gap-4">

          {/* Template selector */}
          <div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Template</p>
            <div className="flex flex-col gap-1.5">
              {TEMPLATES.map(meta => {
                const active = template === meta.key;
                const locked = meta.pro && !isPro;
                return (
                  <button
                    key={meta.key}
                    onClick={() => handleSelectTemplate(meta.key)}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-xl border text-left transition-all ${
                      active
                        ? "border-emerald-400 bg-emerald-400/10 text-zinc-100"
                        : locked
                        ? "border-zinc-800 bg-zinc-900/50 text-zinc-600 hover:border-zinc-700"
                        : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                    }`}
                  >
                    <span className="text-sm flex-shrink-0 w-5 text-center" aria-hidden>{meta.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold leading-tight truncate">{meta.label}</div>
                      {meta.pro && (
                        <div className={`text-[9px] font-bold mt-0.5 ${isPro ? "text-amber-400" : "text-zinc-600"}`}>
                          {isPro ? "PRO" : "🔒 PRO"}
                        </div>
                      )}
                    </div>
                    {active && <span className="text-emerald-400 text-xs flex-shrink-0">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Entry toggles */}
          {entries.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                Show / Hide
              </p>
              <div className="flex flex-col gap-1">
                {entries.map(e => (
                  <button
                    key={e.id}
                    onClick={() => toggleEntry(e.id)}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border text-left transition-colors ${
                      visible.has(e.id)
                        ? "border-emerald-400/40 bg-emerald-400/8 text-emerald-300"
                        : "border-zinc-800 text-zinc-600 hover:border-zinc-700 hover:text-zinc-400"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${visible.has(e.id) ? "bg-emerald-400" : "bg-zinc-700"}`} />
                    <span className="text-xs truncate">{e.title.slice(0, 18)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Link
              href="/export"
              className="block bg-emerald-400 hover:bg-emerald-300 text-zinc-900 font-semibold rounded-xl py-2.5 text-xs text-center transition-colors"
              style={{ boxShadow: "0 2px 8px rgb(52 211 153 / 0.25)" }}
            >
              ⬇ Export
            </Link>
            {!isPro && (
              <Link
                href="/export"
                className="block border border-zinc-700 text-zinc-400 font-medium rounded-xl py-2 text-xs text-center hover:border-emerald-400/50 hover:text-emerald-400 transition-colors"
              >
                ✨ Upgrade
              </Link>
            )}
          </div>
        </div>

        {/* ── RIGHT PANEL: scaled resume preview ───────────────────────── */}
        <div ref={rightColRef} className="flex-1 min-w-0">

          {/* Scaled preview container */}
          <div
            className="relative overflow-hidden rounded-sm"
            style={{
              height: containerHeight,
              boxShadow: "0 4px 32px rgb(0 0 0 / 0.7), 0 2px 8px rgb(0 0 0 / 0.5)",
            }}
          >
            <div
              ref={resumeInnerRef}
              id="resume-paper"
              style={{
                background: "white",
                color: "#111",
                padding: 48,
                fontFamily: ps.fontFamily,
                fontSize: ps.fontSize,
                lineHeight: ps.lineHeight,
                width: RESUME_PAPER_WIDTH,
                position: "absolute",
                top: 0,
                left: 0,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              {/* Watermark overlay */}
              {!isPro && (
                <div style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }}>
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

              {ps.headerNode(profile)}

              {(profile.gpa || profile.interests) && (
                <div style={{ marginBottom: 14, fontSize: ps.fontSize }}>
                  {profile.gpa       && <span><strong>GPA:</strong> {profile.gpa}&nbsp;&nbsp;</span>}
                  {profile.interests && <span><strong>Interests:</strong> {profile.interests}</span>}
                </div>
              )}

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
                  Toggle entries on the left to see them here
                </div>
              )}
            </div>
          </div>

          {/* Watermark note */}
          {!isPro && (
            <div className="text-center mt-2">
              <button
                onClick={() => setShowWatermarkInfo(true)}
                className="text-xs text-zinc-500 hover:text-zinc-300 underline underline-offset-2 transition-colors"
              >
                Why is there a watermark?
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Strength score ──────────────────────────────────────────────────── */}
      <ResumeStrengthScore profile={profile} entries={entries} />

      {/* ── ATS keywords ────────────────────────────────────────────────────── */}
      <ATSKeywords entries={entries} />

      {/* ── Watermark info modal ────────────────────────────────────────────── */}
      {showWatermarkInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-sm w-full shadow-card-lg">
            <div className="text-lg font-semibold mb-2">Preview Mode</div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              The watermark is removed when you download the PDF. The downloaded file is clean and ready to submit — no watermark, no branding.
            </p>
            <p className="text-zinc-500 text-xs mb-4">
              Classic and Modern templates are free. Compact, Executive, and Split require a one-time upgrade.
            </p>
            <button
              onClick={() => setShowWatermarkInfo(false)}
              className="w-full bg-emerald-400 hover:bg-emerald-300 text-zinc-900 font-semibold rounded-xl py-2.5 text-sm transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* ── Pro gate modal ──────────────────────────────────────────────────── */}
      {showProGate && gatedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-sm w-full shadow-card-lg">
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
              Upgrade — $9 one-time
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
    </div>
  );
}

// ── ATS Keyword Suggestions ───────────────────────────────────────────────────

const ATS_KEYWORDS = [
  "managed", "developed", "improved", "leadership",
  "collaborated", "achieved", "delivered", "optimized",
];

function ATSKeywords({ entries }: { entries: ReturnType<typeof useApp>["state"]["entries"] }) {
  const allText = entries
    .flatMap(e => [...(e.bullets ?? []), e.description ?? "", e.title ?? ""])
    .join(" ")
    .toLowerCase();

  const results = ATS_KEYWORDS.map(kw => ({
    keyword: kw,
    found: allText.includes(kw),
  }));

  const foundCount   = results.filter(r => r.found).length;
  const missingCount = results.length - foundCount;

  return (
    <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-zinc-200">ATS Keywords</span>
        <span className="text-xs text-zinc-500">
          <span className="text-emerald-400 font-semibold">{foundCount}</span>/{results.length} found
        </span>
      </div>
      <p className="text-xs text-zinc-500 mb-4">
        Common resume action words recruiters and ATS scanners look for.
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        {results.map(({ keyword, found }) => (
          <div
            key={keyword}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium border ${
              found
                ? "bg-emerald-400/8 border-emerald-400/20 text-emerald-300"
                : "bg-zinc-800/50 border-zinc-700/50 text-zinc-600"
            }`}
          >
            <span className={`flex-shrink-0 ${found ? "text-emerald-400" : "text-zinc-700"}`}>
              {found ? "✓" : "○"}
            </span>
            {keyword}
          </div>
        ))}
      </div>
      {missingCount > 0 && (
        <p className="text-xs text-zinc-600 mt-3 leading-relaxed">
          Add missing keywords naturally into your bullet points where they honestly apply.
        </p>
      )}
    </div>
  );
}

// ── Resume Strength Score ─────────────────────────────────────────────────────

const METRIC_RE_SCORE = /\d+(%|k|K|\+|x|hrs?|hours?|years?|months?|weeks?|students?|members?|awards?)?/;

function ResumeStrengthScore({
  profile,
  entries,
}: {
  profile: ReturnType<typeof useApp>["state"]["profile"];
  entries:  ReturnType<typeof useApp>["state"]["entries"];
}) {
  const workEntries  = entries.filter(e => e.type === "Work");
  const skillEntries = entries.filter(e => e.type === "Skill");
  const allText      = entries.flatMap(e => [...(e.bullets ?? []), e.description ?? ""]).join(" ");
  const hasNumbers   = METRIC_RE_SCORE.test(allText);

  const hasSummary   = !!(profile.interests?.trim());
  const hasEducation = !!(profile.school?.trim());

  const MAX_POINTS = 71; // 15+10+21+10+15
  let earned = 0;
  if (hasSummary)   earned += 15;
  if (hasEducation) earned += 10;
  earned += Math.min(workEntries.length, 3) * 7;
  earned += Math.min(skillEntries.length, 5) * 2;
  if (hasNumbers)   earned += 15;

  const score = Math.round((earned / MAX_POINTS) * 100);

  const barColor =
    score >= 80 ? "bg-emerald-500" :
    score >= 60 ? "bg-sky-500" :
    score >= 40 ? "bg-amber-500" : "bg-red-500";

  const textColor =
    score >= 80 ? "text-emerald-400" :
    score >= 60 ? "text-sky-400" :
    score >= 40 ? "text-amber-400" : "text-red-400";

  const checks = [
    { label: "Summary / interests filled in",              pts: 15,  passed: hasSummary },
    { label: "Education info added",                       pts: 10,  passed: hasEducation },
    { label: "Work experience #1",                         pts: 7,   passed: workEntries.length >= 1 },
    { label: "Work experience #2",                         pts: 7,   passed: workEntries.length >= 2 },
    { label: "Work experience #3",                         pts: 7,   passed: workEntries.length >= 3 },
    { label: "Skill added (×1, up to 5 × +2)",            pts: 2,   passed: skillEntries.length >= 1 },
    { label: "Skill added (×2)",                           pts: 2,   passed: skillEntries.length >= 2 },
    { label: "Skill added (×3)",                           pts: 2,   passed: skillEntries.length >= 3 },
    { label: "Skill added (×4)",                           pts: 2,   passed: skillEntries.length >= 4 },
    { label: "Skill added (×5)",                           pts: 2,   passed: skillEntries.length >= 5 },
    { label: "Numbers or metrics found in bullets",        pts: 15,  passed: hasNumbers },
  ];

  return (
    <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-zinc-200">Resume Strength</span>
        <span className={`text-sm font-bold tabular-nums ${textColor}`}>{score}/100</span>
      </div>

      <div className="bg-zinc-800 rounded-full h-1.5 overflow-hidden mb-4">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        {checks.map((c) => (
          <div key={c.label} className="flex items-center gap-2 text-xs">
            <span className={`flex-shrink-0 font-bold ${c.passed ? "text-emerald-400" : "text-zinc-700"}`}>
              {c.passed ? "✓" : "○"}
            </span>
            <span className={c.passed ? "text-zinc-300" : "text-zinc-600"}>
              {c.label}
            </span>
            <span className={`ml-auto flex-shrink-0 font-semibold tabular-nums ${c.passed ? "text-emerald-500" : "text-zinc-700"}`}>
              +{c.pts}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── EntryRow component ────────────────────────────────────────────────────────

function EntryRow({
  entry, titleSize, bodySize, gap,
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
