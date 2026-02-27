"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

const DEMO_RESUME = {
  name: "ALEX RIVERA",
  school: "Westlake High School",
  email: "alex@email.com",
  gpa: "3.9",
  interests: "Computer Science, Environmental Science, Creative Writing",
  sections: [
    {
      title: "EXTRACURRICULAR ACTIVITIES",
      entries: [
        { title: "Robotics Club Captain", org: "Westlake Robotics Team", date: "Sep 2022 – Present", time: "10 hrs/wk · 36 wks/yr", bullets: ["Led 12-member team to regional championship, designing Python-based autonomous navigation system", "Mentored 6 underclassmen in programming fundamentals, improving team retention by 40%"] },
        { title: "Environmental Cleanup Organizer", org: "Green Earth Initiative", date: "Jun 2021 – Present", time: "4 hrs/wk · 20 wks/yr", bullets: ["Organized 24 beach cleanup events collecting 2,000+ lbs of debris over two years", "Grew volunteer base from 10 to 50+ participants through social media outreach"] },
      ]
    },
    {
      title: "HONORS & AWARDS",
      entries: [
        { title: "National Merit Scholarship Semifinalist", org: "National Merit Scholarship Corporation", date: "Sep 2023", time: "", bullets: ["Recognized as top 1% of PSAT scorers nationally"] },
      ]
    },
    {
      title: "WORK EXPERIENCE",
      entries: [
        { title: "Coding Tutor", org: "Self-employed", date: "Jun 2022 – Present", time: "6 hrs/wk · 40 wks/yr", bullets: ["Tutored 8 middle school students in Python and HTML/CSS; all passed intro CS courses"] },
      ]
    },
  ]
};

const DEMO_COLLEGE = [
  { position: "Robotics Club Captain", org: "Westlake Robotics Team", type: "STEM / Technology", hrs: 10, wks: 36, desc: "Led 12-member team to regionals. Designed autonomous Python navigation system. Mentored 6 underclassmen." },
  { position: "Environmental Cleanup Organizer", org: "Green Earth Initiative", type: "Community Service", hrs: 4, wks: 20, desc: "Organized 24 beach cleanups. Collected 2,000+ lbs debris. Grew volunteers from 10 to 50+." },
  { position: "Coding Tutor", org: "Self-employed", type: "Work (paid)", hrs: 6, wks: 40, desc: "Tutored 8 middle schoolers in Python/HTML. All students passed their intro CS courses." },
];

const WATERMARK_TEXT = "PREVIEW ONLY";

export default function PreviewClient() {
  const params = useParams();
  const type = params.type as string;
  const isCollege = type === "college";

  return (
    <div className="min-h-screen bg-zinc-950 py-8 px-4">
      {/* Header */}
      <div className="max-w-xl mx-auto mb-6">
        <Link href="/" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors inline-flex items-center gap-1 mb-4">
          ← Back to Home
        </Link>
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-serif text-2xl">
            {isCollege ? "🎓 College App Preview" : "📄 Resume Preview"}
          </h1>
        </div>
        <p className="text-zinc-500 text-sm">
          {isCollege
            ? "This is how your Common App activities section will look"
            : "This is how your resume will look — clean, ATS-friendly, professional"}
        </p>
      </div>

      {/* Preview paper */}
      <div className="max-w-xl mx-auto relative">
        <div className="relative overflow-hidden rounded-sm shadow-2xl">

          {/* Watermark layer */}
          <div style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none", overflow: "hidden" }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                top: `${8 + i * 13}%`,
                left: "50%",
                transform: "translateX(-50%) rotate(-25deg)",
                fontSize: "28pt",
                fontWeight: 900,
                color: "rgba(0,0,0,0.09)",
                whiteSpace: "nowrap",
                letterSpacing: 6,
                userSelect: "none",
                fontFamily: "sans-serif",
              }}>
                {WATERMARK_TEXT}
              </div>
            ))}
          </div>

          {/* Fade bottom */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 200, zIndex: 20,
            background: "linear-gradient(to top, #09090b 40%, transparent)",
            pointerEvents: "none",
          }} />

          {/* Resume paper */}
          {!isCollege ? (
            <div style={{ background: "white", color: "#111", padding: "48px", fontFamily: "Times New Roman, serif", fontSize: "11pt", lineHeight: 1.4 }}>
              {/* Header */}
              <div style={{ textAlign: "center", borderBottom: "2px solid #111", paddingBottom: 12, marginBottom: 16 }}>
                <div style={{ fontSize: "18pt", fontWeight: 700, letterSpacing: 1 }}>{DEMO_RESUME.name}</div>
                <div style={{ fontSize: "10pt", marginTop: 3 }}>{DEMO_RESUME.school}</div>
                <div style={{ fontSize: "10pt" }}>{DEMO_RESUME.email}</div>
              </div>
              <div style={{ marginBottom: 14, fontSize: "10pt" }}>
                <strong>GPA:</strong> {DEMO_RESUME.gpa}&nbsp;&nbsp;
                <strong>Interests:</strong> {DEMO_RESUME.interests}
              </div>
              {DEMO_RESUME.sections.map((section) => (
                <div key={section.title} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: "10.5pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid #888", paddingBottom: 3, marginBottom: 8 }}>
                    {section.title}
                  </div>
                  {section.entries.map((entry) => (
                    <div key={entry.title} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <strong style={{ fontSize: "11pt" }}>{entry.title}</strong>
                        <span style={{ fontSize: "9.5pt", color: "#555" }}>{entry.date}</span>
                      </div>
                      <div style={{ fontSize: "10pt", fontStyle: "italic", color: "#333" }}>{entry.org}</div>
                      {entry.time && <div style={{ fontSize: "9.5pt", color: "#666" }}>{entry.time}</div>}
                      {entry.bullets.map((b, i) => (
                        <div key={i} style={{ fontSize: "10pt", lineHeight: 1.5, paddingLeft: 14, position: "relative", marginTop: 3 }}>
                          <span style={{ position: "absolute", left: 0 }}>•</span>{b}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            /* College App preview */
            <div style={{ background: "white", color: "#111", padding: "40px", fontFamily: "sans-serif", fontSize: "10.5pt", lineHeight: 1.5 }}>
              <div style={{ fontSize: "16pt", fontWeight: 700, marginBottom: 4 }}>{DEMO_RESUME.name}</div>
              <div style={{ fontSize: "10pt", color: "#555", marginBottom: 24 }}>{DEMO_RESUME.school} · Grade 12 · GPA {DEMO_RESUME.gpa}</div>

              <div style={{ fontSize: "12pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "2px solid #111", paddingBottom: 4, marginBottom: 16 }}>
                Activities & Honors
              </div>

              {DEMO_COLLEGE.map((item, i) => (
                <div key={i} style={{ marginBottom: 18, paddingBottom: 16, borderBottom: i < DEMO_COLLEGE.length - 1 ? "1px solid #eee" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
                    <strong style={{ fontSize: "11pt" }}>{item.position}</strong>
                    <span style={{ fontSize: "9pt", color: "#888", backgroundColor: "#f5f5f5", padding: "2px 8px", borderRadius: 10 }}>{item.type}</span>
                  </div>
                  <div style={{ fontSize: "10pt", color: "#444", marginBottom: 4 }}>{item.org}</div>
                  <div style={{ fontSize: "9pt", color: "#888", marginBottom: 6 }}>
                    {item.hrs} hrs/week · {item.wks} weeks/year
                  </div>
                  <div style={{ fontSize: "10.5pt", color: "#222", backgroundColor: "#f9f9f9", padding: "8px 12px", borderRadius: 6, borderLeft: "3px solid #34d399" }}>
                    {item.desc}
                  </div>
                  <div style={{ fontSize: "9pt", color: "#aaa", marginTop: 3, textAlign: "right" }}>
                    {item.desc.length}/150 characters
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA overlay at bottom */}
        <div className="text-center pt-8 pb-4 relative z-30">
          <p className="text-zinc-400 text-sm mb-4">
            Sign up free to build your own — clean PDF with no watermark
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="https://vital-ram-87.clerk.accounts.dev/sign-up?redirect_url=https://applywell.pages.dev/dashboard"
              className="bg-emerald-400 text-zinc-900 font-semibold rounded-xl px-6 py-3 text-sm hover:opacity-90 transition-opacity">
              Get Started Free
            </Link>
            <Link href="/"
              className="border border-zinc-700 text-zinc-400 font-medium rounded-xl px-6 py-3 text-sm hover:border-zinc-500 transition-colors">
              Back to Home
            </Link>
          </div>
          <p className="text-xs text-zinc-600 mt-3">No credit card required · Data stays in your browser</p>
        </div>
      </div>
    </div>
  );
}
