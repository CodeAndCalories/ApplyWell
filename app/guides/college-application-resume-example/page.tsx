import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "College Application Resume Example (2026) — Ready in 10 Minutes",
  description: "See a real college application resume example for high school students. Then build your own in minutes with ApplyWell — $9 one-time, no subscription.",
  alternates: { canonical: "https://applywell.io/guides/college-application-resume-example" },
  openGraph: {
    title: "College Application Resume Example (2026) | ApplyWell",
    description: "See a real college application resume example for high school students. Build yours in minutes — $9 one-time.",
  },
};

const STRIPE_URL = "https://buy.stripe.com/6oU7sKgSQ2K52hdcHt7g401";

function GuideCTA() {
  return (
    <div className="my-8 bg-zinc-900 border border-emerald-500/25 rounded-2xl p-5 shadow-card text-center">
      <p className="text-sm font-semibold text-zinc-200 mb-1">Ready to build your resume?</p>
      <p className="text-xs text-zinc-500 mb-4">$9 one-time · No account · Instant access</p>
      <a
        href={STRIPE_URL}
        className="inline-flex items-center justify-center min-h-[48px] bg-emerald-400 hover:bg-emerald-300 hover:-translate-y-0.5 text-zinc-900 font-bold text-sm rounded-2xl transition-all px-8"
        style={{ boxShadow: "0 4px 16px rgb(52 211 153 / 0.35)" }}
      >
        Build My Resume — $9
      </a>
    </div>
  );
}

const SECTIONS = [
  {
    title: "Education",
    tip: "School name, GPA (if 3.5+), expected graduation, relevant coursework (AP/IB), honors.",
    example: "Westfield High School — GPA: 3.9/4.0 · Expected May 2026\nAP Calculus BC, AP English Language, AP Biology",
  },
  {
    title: "Activities & Leadership",
    tip: "List in reverse chronological order. Lead with your most significant commitment. Include role, organization, and a one-line description.",
    example: "Captain, Varsity Debate Team (2023–2026)\nLed team of 14 to state semifinals; coached 4 junior members on case construction",
  },
  {
    title: "Work Experience",
    tip: "Include part-time jobs, internships, and paid freelance work. 10–20 hours/week shows time management.",
    example: "Barista, Blue Bottle Coffee — June 2024–Present (20 hrs/wk)\nManaged weekend open/close; trained 3 new hires",
  },
  {
    title: "Volunteer & Community",
    tip: "Only include if you have meaningful hours or a clear impact. Avoid padding with one-time events.",
    example: "Volunteer Tutor, City Reads Program — Sept 2023–Present\n2 hrs/week; helped 6 middle schoolers improve reading levels by one grade",
  },
  {
    title: "Skills & Interests",
    tip: "Keep this section short. Only list skills that are genuinely useful or distinctive — not 'Microsoft Word'.",
    example: "Languages: Spanish (conversational), Mandarin (beginner)\nTools: Figma, Python, Adobe Lightroom",
  },
];

export default function CollegeResumeExamplePage() {
  return (
    <div className="py-12 animate-fade-in">
      <div className="mb-8">
        <Link href="/guides" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Back to guides
        </Link>
      </div>

      <h1 className="font-serif text-3xl tracking-tight mb-2">
        College Application Resume — Example & Format
      </h1>
      <p className="text-xs text-zinc-500 mb-10">Last updated: March 2026</p>

      <div className="flex flex-col gap-8">
        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">Do You Need a Resume?</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Most colleges don't require a resume — but many allow you to attach one as a supplement. A well-formatted resume gives admissions officers a clean overview of your accomplishments in one page, and can be a useful reference when writing your activities list and essays. Some scholarship applications and interview processes will ask for one directly. If this is your first time writing a resume, our guide to{" "}
            <Link href="/first-job-resume-for-teens" className="underline underline-offset-2 decoration-zinc-600 hover:decoration-zinc-400 transition-colors">
              first job resume for teens
            </Link>
            {" "}covers every section from scratch.
          </p>
        </section>

        <GuideCTA />

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">Format Rules</h2>
          <ul className="flex flex-col gap-2">
            {[
              "One page. No exceptions for high school students.",
              "PDF format — Word documents can reformat on different computers.",
              "11–12pt font, 0.5–1 inch margins, clean sans-serif (Calibri, Arial, Inter).",
              "No photo, no color unless used sparingly for section headers.",
              "Reverse chronological order within each section — most recent first.",
              "Bullet points for descriptions, not paragraphs.",
            ].map((rule) => (
              <li key={rule} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="text-emerald-500 flex-shrink-0 mt-0.5">›</span>
                {rule}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-4">Section-by-Section Breakdown</h2>
          <div className="flex flex-col gap-4">
            {SECTIONS.map((sec) => (
              <div key={sec.title} className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
                <p className="text-sm font-semibold text-zinc-100 mb-1">{sec.title}</p>
                <p className="text-xs text-zinc-500 leading-relaxed mb-3">{sec.tip}</p>
                <div className="border-t border-zinc-800 pt-3">
                  <p className="text-xs font-semibold text-emerald-400 mb-1 uppercase tracking-wide">Example</p>
                  <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line">{sec.example}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <GuideCTA />

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">What to Leave Off</h2>
          <ul className="flex flex-col gap-2">
            {[
              "Objective statement — these are outdated and waste space",
              "References (and 'references available upon request')",
              "Unrelated hobbies with no clear relevance",
              "Activities where you attended but didn't contribute",
              "GPA below 3.5 — if it's low, leave it out and address it elsewhere if needed",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="text-red-500 flex-shrink-0 mt-0.5">›</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-5">
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">Build Your Resume in ApplyWell</h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            ApplyWell is a{" "}
            <Link href="/no-subscription-resume-builder" className="underline underline-offset-2 decoration-zinc-600 hover:decoration-zinc-400 transition-colors">
              resume builder with no subscription
            </Link>
            {" "}designed for students applying to college. Add your experience, choose a template, and export a clean PDF — ready to attach to any application.
          </p>
          <Link
            href="/"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Start for free
          </Link>
        </section>
      </div>

      <GuideCTA />

      <section className="mt-10">
        <h2 className="text-sm font-semibold text-zinc-100 mb-3">Related Guides</h2>
        <div className="flex flex-col gap-2">
          {[
            { href: "/guides/student-resume-verbs",                  label: "Strong Action Verbs for Student Resumes" },
            { href: "/guides/how-to-describe-leadership-experience", label: "How to Describe Leadership Experience" },
            { href: "/guides/common-app-activities-examples",        label: "Common App Activities — Examples & Tips" },
            { href: "/guides/how-to-write-common-app-essay",         label: "How to Write Your Common App Essay" },
          ].map((g) => (
            <Link key={g.href} href={g.href} className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
              → {g.label}
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-10 pt-6 border-t border-zinc-800/60 flex flex-wrap gap-x-5 gap-y-2">
        {[
          { label: "All Guides", href: "/guides" },
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Contact", href: "/contact" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
