// lib/docx/docxExport.ts
// Generates a .docx resume from AppState using the `docx` package.
// Dynamically imported so the large bundle only loads on demand.

import { AppState, SECTION_LABELS, EntryType, ENTRY_TYPES } from "../types";

function formatDate(d: string) {
  if (!d) return "Present";
  const [y, m] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m) - 1]} ${y}`;
}

// Spacing helper — Paragraph.spacing expects a plain object, not createSpacing()
function sp(before = 0, after = 0) {
  return { before, after };
}

export async function exportResumeDOCX(
  state: AppState,
  filename = "resume.docx",
  isPro = false
): Promise<void> {
  const {
    Document, Packer, Paragraph, TextRun, AlignmentType,
    BorderStyle,
  } = await import("docx");

  const { profile, entries } = state;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type DocChild = any;

  const hrPara = (): DocChild =>
    new Paragraph({
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 4, color: "888888", space: 1 },
      },
      spacing: sp(80, 40),
    });

  const spacer = (after = 60): DocChild =>
    new Paragraph({ spacing: sp(0, after) });

  const children: DocChild[] = [];

  // ── Header ───────────────────────────────────────────────────────────────────
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: sp(0, 40),
      children: [
        new TextRun({ text: (profile.name || "YOUR NAME").toUpperCase(), bold: true, size: 36 }),
      ],
    })
  );

  const sublineParts: string[] = [];
  if (profile.school) sublineParts.push(profile.school);
  if (profile.grade) sublineParts.push(`Grade ${profile.grade}`);
  if (profile.email) sublineParts.push(profile.email);

  if (sublineParts.length) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: sp(0, 20),
        children: [
          new TextRun({ text: sublineParts.join("  ·  "), size: 20, color: "444444" }),
        ],
      })
    );
  }

  if (profile.gpa) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: sp(0, 60),
        children: [
          new TextRun({ text: `GPA: ${profile.gpa}`, size: 20, color: "444444" }),
        ],
      })
    );
  }

  children.push(hrPara());

  // ── Sections ──────────────────────────────────────────────────────────────────
  for (const type of ENTRY_TYPES) {
    const items = entries.filter((e) => e.type === type);
    if (!items.length) continue;

    children.push(
      new Paragraph({
        spacing: sp(120, 20),
        children: [
          new TextRun({
            text: (SECTION_LABELS[type as EntryType] || type).toUpperCase(),
            bold: true,
            size: 20,
          }),
        ],
      })
    );
    children.push(hrPara());

    for (const entry of items) {
      const dateStr = `${formatDate(entry.startDate)} – ${formatDate(entry.endDate)}`;

      children.push(
        new Paragraph({
          spacing: sp(80, 0),
          children: [
            new TextRun({ text: entry.title, bold: true, size: 22 }),
            new TextRun({ text: `   ${dateStr}`, size: 18, color: "666666" }),
          ],
        })
      );

      if (entry.org) {
        children.push(
          new Paragraph({
            spacing: sp(0, 0),
            children: [
              new TextRun({ text: entry.org, italics: true, size: 20, color: "333333" }),
            ],
          })
        );
      }

      if (entry.hrsPerWeek) {
        children.push(
          new Paragraph({
            spacing: sp(0, 0),
            children: [
              new TextRun({
                text: `${entry.hrsPerWeek} hrs/wk · ${entry.weeksPerYear} wks/yr`,
                size: 18,
                color: "777777",
              }),
            ],
          })
        );
      }

      const bullets =
        entry.bullets?.length
          ? entry.bullets
          : entry.description
          ? [entry.description]
          : [];

      for (const bullet of bullets) {
        children.push(
          new Paragraph({
            spacing: sp(20, 0),
            indent: { left: 360 },
            children: [new TextRun({ text: `• ${bullet}`, size: 20 })],
          })
        );
      }

      children.push(spacer(40));
    }
  }

  // ── Watermark (free only) ─────────────────────────────────────────────────
  if (!isPro) {
    children.push(spacer(40));
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: sp(120, 0),
        children: [
          new TextRun({
            text: "Created with ApplyWell \u2022 applywell.pages.dev",
            size: 14,
            color: "AAAAAA",
          }),
        ],
      })
    );
  }

  const doc = new Document({ sections: [{ properties: {}, children }] });
  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
