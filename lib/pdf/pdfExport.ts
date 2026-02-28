// lib/pdf/pdfExport.ts
// Uses jsPDF directly with text rendering (no html2canvas) to avoid oklch color issues

import { AppState, SECTION_LABELS, EntryType, ENTRY_TYPES } from "../types";

function formatDate(d: string) {
  if (!d) return "Present";
  const [y, m] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m) - 1]} ${y}`;
}

export async function exportResumePDF(
  state: AppState,
  template: "classic" | "modern" = "classic",
  filename = "resume.pdf",
  isPro = false
): Promise<void> {
  const { default: jsPDF } = await import("jspdf");
  
  const { profile, entries } = state;
  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "letter" });
  
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 56;
  const contentW = pageW - margin * 2;
  let y = margin;

  const font = template === "modern" ? "helvetica" : "times";

  function checkPage(needed = 20) {
    if (y + needed > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  }

  function addText(text: string, x: number, size: number, style: "normal"|"bold"|"italic" = "normal", maxWidth?: number) {
    doc.setFont(font, style);
    doc.setFontSize(size);
    if (maxWidth) {
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return lines.length;
    } else {
      doc.text(text, x, y);
      return 1;
    }
  }

  // ── Header ──────────────────────────────────────────────────────────────────
  if (template === "classic") {
    doc.setFont(font, "bold");
    doc.setFontSize(18);
    const name = (profile.name || "YOUR NAME").toUpperCase();
    doc.text(name, pageW / 2, y, { align: "center" });
    y += 18;
    if (profile.school) {
      doc.setFont(font, "normal");
      doc.setFontSize(10);
      doc.text(profile.school, pageW / 2, y, { align: "center" });
      y += 13;
    }
    if (profile.email) {
      doc.setFont(font, "normal");
      doc.setFontSize(10);
      doc.text(profile.email, pageW / 2, y, { align: "center" });
      y += 13;
    }
    // Divider
    y += 4;
    doc.setLineWidth(1.5);
    doc.line(margin, y, pageW - margin, y);
    y += 12;
  } else {
    // Modern: left-aligned with accent bar
    doc.setDrawColor(30, 30, 30);
    doc.setLineWidth(4);
    doc.line(margin, y - 4, margin, y + 24);
    doc.setFont(font, "bold");
    doc.setFontSize(22);
    doc.text(profile.name || "Your Name", margin + 12, y + 16);
    y += 28;
    if (profile.school) {
      doc.setFont(font, "normal");
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(`${profile.school}${profile.grade ? ` · Grade ${profile.grade}` : ""}`, margin + 12, y);
      doc.setTextColor(0, 0, 0);
      y += 14;
    }
    y += 8;
  }

  // ── GPA / Interests ──────────────────────────────────────────────────────────
  if (profile.gpa || profile.interests) {
    doc.setFont(font, "normal");
    doc.setFontSize(10);
    let line = "";
    if (profile.gpa) line += `GPA: ${profile.gpa}   `;
    if (profile.interests) line += `Interests: ${profile.interests}`;
    const wrapped = doc.splitTextToSize(line, contentW);
    doc.text(wrapped, margin, y);
    y += wrapped.length * 13 + 6;
  }

  // ── Sections ─────────────────────────────────────────────────────────────────
  for (const type of ENTRY_TYPES) {
    const items = entries.filter((e) => e.type === type);
    if (!items.length) continue;

    checkPage(30);

    // Section heading
    y += 4;
    doc.setFont(font, "bold");
    doc.setFontSize(10);
    doc.text((SECTION_LABELS[type as EntryType] || type).toUpperCase(), margin, y);
    y += 3;
    doc.setLineWidth(0.5);
    doc.setDrawColor(120, 120, 120);
    doc.line(margin, y, pageW - margin, y);
    y += 10;
    doc.setDrawColor(0, 0, 0);

    for (const entry of items) {
      checkPage(40);

      // Title + date on same line
      doc.setFont(font, "bold");
      doc.setFontSize(11);
      doc.text(entry.title, margin, y);
      const dateStr = `${formatDate(entry.startDate)} – ${formatDate(entry.endDate)}`;
      doc.setFont(font, "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(80, 80, 80);
      doc.text(dateStr, pageW - margin, y, { align: "right" });
      doc.setTextColor(0, 0, 0);
      y += 13;

      // Org
      if (entry.org) {
        doc.setFont(font, "italic");
        doc.setFontSize(10);
        doc.setTextColor(50, 50, 50);
        doc.text(entry.org, margin, y);
        doc.setTextColor(0, 0, 0);
        y += 12;
      }

      // Time commitment
      if (entry.hrsPerWeek) {
        doc.setFont(font, "normal");
        doc.setFontSize(9.5);
        doc.setTextColor(100, 100, 100);
        doc.text(`${entry.hrsPerWeek} hrs/wk · ${entry.weeksPerYear} wks/yr`, margin, y);
        doc.setTextColor(0, 0, 0);
        y += 12;
      }

      // Bullets or description
      const bullets = entry.bullets?.length ? entry.bullets : entry.description ? [entry.description] : [];
      for (const bullet of bullets) {
        checkPage(20);
        doc.setFont(font, "normal");
        doc.setFontSize(10);
        doc.text("•", margin + 4, y);
        const lines = doc.splitTextToSize(bullet, contentW - 14);
        doc.text(lines, margin + 14, y);
        y += lines.length * 13;
      }

      y += 6;
    }

    y += 2; // consistent gap after each section
  }

  // ── Watermark (free only) ─────────────────────────────────────────────────
  if (!isPro) {
    const totalPages = (doc.internal as unknown as { getNumberOfPages: () => number }).getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(180, 180, 180);
      doc.text(
        "Created with ApplyWell \u2022 applywell.pages.dev",
        pageW / 2,
        pageH - 20,
        { align: "center" }
      );
      doc.setTextColor(0, 0, 0);
    }
  }

  doc.save(filename);
}
