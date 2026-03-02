// lib/pdf/pdfExport.ts
// Uses jsPDF directly with text rendering (no html2canvas) to avoid oklch color issues

import { AppState, SECTION_LABELS, EntryType, ENTRY_TYPES } from "../types";

function formatDate(d: string) {
  if (!d) return "Present";
  const [y, m] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m) - 1]} ${y}`;
}

// ── Template configuration ────────────────────────────────────────────────────

export type TemplateKey = "classic" | "modern" | "compact" | "executive" | "split";

interface TemplateCfg {
  font: "times" | "helvetica";
  margin: number;
  nameFontSize: number;
  nameStyle: "normal" | "bold";
  bodyFontSize: number;
  metaFontSize: number;
  lineHeight: number;           // pts between body lines
  entryGap: number;             // pts after each entry
  sectionGap: number;           // pts before each section heading
  titleFontSize: number;
  sectionHeadingStyle: "underline" | "topbar" | "box";
  headerAlign: "center" | "left";
  nameTransform: "upper" | "none";
}

const TEMPLATES: Record<TemplateKey, TemplateCfg> = {
  classic: {
    font: "times",
    margin: 56,
    nameFontSize: 18,
    nameStyle: "bold",
    bodyFontSize: 10,
    metaFontSize: 9.5,
    lineHeight: 13,
    entryGap: 6,
    sectionGap: 8,
    titleFontSize: 11,
    sectionHeadingStyle: "underline",
    headerAlign: "center",
    nameTransform: "upper",
  },
  modern: {
    font: "helvetica",
    margin: 56,
    nameFontSize: 22,
    nameStyle: "bold",
    bodyFontSize: 10.5,
    metaFontSize: 9.5,
    lineHeight: 14,
    entryGap: 8,
    sectionGap: 10,
    titleFontSize: 11,
    sectionHeadingStyle: "topbar",
    headerAlign: "left",
    nameTransform: "none",
  },
  compact: {
    font: "helvetica",
    margin: 44,
    nameFontSize: 15,
    nameStyle: "bold",
    bodyFontSize: 9,
    metaFontSize: 8.5,
    lineHeight: 11.5,
    entryGap: 4,
    sectionGap: 5,
    titleFontSize: 9.5,
    sectionHeadingStyle: "underline",
    headerAlign: "center",
    nameTransform: "upper",
  },
  executive: {
    font: "times",
    margin: 60,
    nameFontSize: 20,
    nameStyle: "bold",
    bodyFontSize: 10.5,
    metaFontSize: 9.5,
    lineHeight: 14,
    entryGap: 8,
    sectionGap: 12,
    titleFontSize: 11,
    sectionHeadingStyle: "box",
    headerAlign: "center",
    nameTransform: "upper",
  },
  split: {
    font: "helvetica",
    margin: 52,
    nameFontSize: 21,
    nameStyle: "bold",
    bodyFontSize: 10,
    metaFontSize: 9,
    lineHeight: 13,
    entryGap: 6,
    sectionGap: 8,
    titleFontSize: 10.5,
    sectionHeadingStyle: "topbar",
    headerAlign: "left",
    nameTransform: "none",
  },
};

// ── Main export function ──────────────────────────────────────────────────────

export async function exportResumePDF(
  state: AppState,
  template: TemplateKey = "classic",
  filename = "resume.pdf",
  isPro = false
): Promise<void> {
  const { default: jsPDF } = await import("jspdf");

  const cfg = TEMPLATES[template];
  const { profile, entries } = state;
  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "letter" });

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = cfg.margin;
  const contentW = pageW - margin * 2;
  let y = margin;

  const f = cfg.font;

  function checkPage(needed = 20) {
    if (y + needed > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  }

  function setBody(style: "normal" | "bold" | "italic" = "normal", size?: number) {
    doc.setFont(f, style);
    doc.setFontSize(size ?? cfg.bodyFontSize);
  }

  // ── Header ──────────────────────────────────────────────────────────────────
  const nameDisplay = cfg.nameTransform === "upper"
    ? (profile.name || "YOUR NAME").toUpperCase()
    : (profile.name || "Your Name");

  if (template === "classic" || template === "compact") {
    // Centered, double-divider for classic; single-divider for compact
    doc.setFont(f, "bold");
    doc.setFontSize(cfg.nameFontSize);
    doc.text(nameDisplay, pageW / 2, y, { align: "center" });
    y += cfg.nameFontSize;

    if (profile.school) {
      setBody("normal", cfg.bodyFontSize);
      doc.text(profile.school, pageW / 2, y, { align: "center" });
      y += cfg.lineHeight;
    }
    if (profile.email) {
      setBody("normal", cfg.bodyFontSize);
      doc.text(profile.email, pageW / 2, y, { align: "center" });
      y += cfg.lineHeight;
    }

    y += 4;
    doc.setLineWidth(template === "classic" ? 1.5 : 0.75);
    doc.setDrawColor(0, 0, 0);
    doc.line(margin, y, pageW - margin, y);
    y += 12;

  } else if (template === "executive") {
    // Centered with double rule above and below name
    doc.setLineWidth(1);
    doc.setDrawColor(0, 0, 0);
    doc.line(margin, y, pageW - margin, y);
    y += 6;
    doc.line(margin, y, pageW - margin, y);
    y += 14;

    doc.setFont(f, "bold");
    doc.setFontSize(cfg.nameFontSize);
    doc.text(nameDisplay, pageW / 2, y, { align: "center" });
    y += cfg.nameFontSize + 2;

    if (profile.school) {
      setBody("italic", cfg.bodyFontSize);
      doc.setTextColor(50, 50, 50);
      doc.text(profile.school, pageW / 2, y, { align: "center" });
      doc.setTextColor(0, 0, 0);
      y += cfg.lineHeight;
    }
    if (profile.email) {
      setBody("normal", cfg.bodyFontSize);
      doc.setTextColor(80, 80, 80);
      doc.text(profile.email, pageW / 2, y, { align: "center" });
      doc.setTextColor(0, 0, 0);
      y += cfg.lineHeight;
    }

    y += 6;
    doc.setLineWidth(1);
    doc.line(margin, y, pageW - margin, y);
    y += 3;
    doc.line(margin, y, pageW - margin, y);
    y += 14;

  } else {
    // modern + split: left-aligned
    if (template === "split") {
      // Filled accent band behind name
      doc.setFillColor(28, 28, 28);
      doc.rect(0, y - 16, pageW, cfg.nameFontSize + 20, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont(f, "bold");
      doc.setFontSize(cfg.nameFontSize);
      doc.text(nameDisplay, margin, y + 4);
      doc.setTextColor(0, 0, 0);
      y += cfg.nameFontSize + 10;

      if (profile.school || profile.email) {
        setBody("normal", cfg.bodyFontSize);
        doc.setTextColor(80, 80, 80);
        const sub = [profile.school, profile.email].filter(Boolean).join("  ·  ");
        doc.text(sub, margin, y);
        doc.setTextColor(0, 0, 0);
        y += cfg.lineHeight + 4;
      }
    } else {
      // modern: left accent bar
      doc.setDrawColor(30, 30, 30);
      doc.setLineWidth(4);
      doc.line(margin, y - 4, margin, y + 24);
      doc.setFont(f, "bold");
      doc.setFontSize(cfg.nameFontSize);
      doc.text(nameDisplay, margin + 12, y + 16);
      y += 28;
      if (profile.school) {
        setBody("normal", cfg.bodyFontSize);
        doc.setTextColor(80, 80, 80);
        doc.text(
          `${profile.school}${profile.grade ? ` · Grade ${profile.grade}` : ""}`,
          margin + 12,
          y
        );
        doc.setTextColor(0, 0, 0);
        y += cfg.lineHeight;
      }
      y += 6;
    }
  }

  // ── GPA / Interests ──────────────────────────────────────────────────────────
  if (profile.gpa || profile.interests) {
    setBody("normal", cfg.bodyFontSize);
    let line = "";
    if (profile.gpa) line += `GPA: ${profile.gpa}   `;
    if (profile.interests) line += `Interests: ${profile.interests}`;
    const wrapped = doc.splitTextToSize(line, contentW);
    doc.text(wrapped, margin, y);
    y += wrapped.length * cfg.lineHeight + 4;
  }

  // ── Sections ─────────────────────────────────────────────────────────────────
  for (const type of ENTRY_TYPES) {
    const items = entries.filter((e) => e.type === type);
    if (!items.length) continue;

    checkPage(30);
    y += cfg.sectionGap;

    const label = (SECTION_LABELS[type as EntryType] || type).toUpperCase();

    if (cfg.sectionHeadingStyle === "underline") {
      doc.setFont(f, "bold");
      doc.setFontSize(cfg.bodyFontSize);
      doc.text(label, margin, y);
      y += 3;
      doc.setLineWidth(0.5);
      doc.setDrawColor(120, 120, 120);
      doc.line(margin, y, pageW - margin, y);
      doc.setDrawColor(0, 0, 0);
      y += 10;

    } else if (cfg.sectionHeadingStyle === "topbar") {
      doc.setLineWidth(2);
      doc.setDrawColor(0, 0, 0);
      doc.line(margin, y - 2, margin + 28, y - 2);
      doc.setFont(f, "bold");
      doc.setFontSize(cfg.bodyFontSize);
      doc.text(label, margin, y + 8);
      doc.setLineWidth(0.4);
      doc.setDrawColor(180, 180, 180);
      doc.line(margin, y + 11, pageW - margin, y + 11);
      doc.setDrawColor(0, 0, 0);
      y += 20;

    } else {
      // box: filled gray band
      const bandH = 14;
      doc.setFillColor(240, 240, 240);
      doc.rect(margin, y - 10, contentW, bandH, "F");
      doc.setFont(f, "bold");
      doc.setFontSize(cfg.bodyFontSize);
      doc.text(label, margin + 4, y + 1);
      y += bandH + 2;
    }

    // ── Entries ───────────────────────────────────────────────────────────────
    for (const entry of items) {
      checkPage(40);

      // Title row
      doc.setFont(f, "bold");
      doc.setFontSize(cfg.titleFontSize);
      doc.setTextColor(0, 0, 0);
      doc.text(entry.title, margin, y);

      // Date right-aligned on same line
      const dateStr = (() => {
        const s = entry.startDate ? formatDate(entry.startDate) : null;
        const e = entry.endDate ? formatDate(entry.endDate) : null;
        if (!s && !e) return null;
        if (s && !e) return `${s} – Present`;
        if (!s && e) return e;
        return `${s} – ${e}`;
      })();
      if (dateStr) {
        doc.setFont(f, "normal");
        doc.setFontSize(cfg.metaFontSize);
        doc.setTextColor(80, 80, 80);
        doc.text(dateStr, pageW - margin, y, { align: "right" });
        doc.setTextColor(0, 0, 0);
      }
      y += cfg.lineHeight;

      // Org
      if (entry.org) {
        doc.setFont(f, "italic");
        doc.setFontSize(cfg.bodyFontSize);
        doc.setTextColor(50, 50, 50);
        doc.text(entry.org, margin, y);
        doc.setTextColor(0, 0, 0);
        y += cfg.lineHeight - 1;
      }

      // Time commitment
      if (entry.hrsPerWeek) {
        doc.setFont(f, "normal");
        doc.setFontSize(cfg.metaFontSize);
        doc.setTextColor(100, 100, 100);
        doc.text(`${entry.hrsPerWeek} hrs/wk · ${entry.weeksPerYear} wks/yr`, margin, y);
        doc.setTextColor(0, 0, 0);
        y += cfg.lineHeight - 1;
      }

      // Bullets
      const bullets = entry.bullets?.length
        ? entry.bullets
        : entry.description
        ? [entry.description]
        : [];

      for (const bullet of bullets) {
        checkPage(20);
        doc.setFont(f, "normal");
        doc.setFontSize(cfg.bodyFontSize);
        doc.text("•", margin + 4, y);
        const lines = doc.splitTextToSize(bullet, contentW - 14);
        doc.text(lines, margin + 14, y);
        y += lines.length * cfg.lineHeight;
      }

      y += cfg.entryGap;
    }

    y += 2;
  }

  // ── Watermark (free only, unchanged behavior) ─────────────────────────────
  if (!isPro) {
    const { GState } = await import("jspdf");
    const totalPages = (doc.internal as unknown as { getNumberOfPages: () => number }).getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.saveGraphicsState();
      doc.setGState(new GState({ opacity: 0.08 }));
      doc.setFont("helvetica", "bold");
      doc.setFontSize(72);
      doc.setTextColor(0, 0, 0);
      doc.text("PREVIEW ONLY", pageW / 2, pageH / 2, { align: "center", angle: 45 });
      doc.restoreGraphicsState();
    }
  }

  doc.save(filename);
}
