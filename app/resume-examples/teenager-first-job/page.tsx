import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sample Resume for Teenager First Job (No Experience) — Free Example",
  description:
    "See a real sample resume for a teenager's first job. No experience needed. Copy this format or build your own in minutes with ApplyWell — $9 one-time.",
  alternates: { canonical: "https://applywell.io/resume-examples/teenager-first-job" },
  openGraph: {
    title: "Sample Resume for Teenager First Job | ApplyWell",
    description:
      "Real resume example for teens with no experience. Build yours in minutes — $9 one-time, no subscription.",
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

export default function TeenagerFirstJobResumePage() {
  return (
    <div className="py-12 animate-fade-in">
      <div className="mb-8">
        <Link href="/resume-examples" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Back to resume examples
        </Link>
      </div>

      <div className="flex flex-col gap-8">
        {/* Section 1 — Intro */}
        <section>
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Resume Example</p>
          <h1 className="font-serif text-3xl tracking-tight mb-4">
            Sample Resume for a Teenager's First Job
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed mb-3">
            Most teens think they have nothing to put on a resume. That's not true — you just need to know how to frame what you already have.
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed">
            This is a real example resume for a teenager applying to their first job with no formal work experience.
          </p>
        </section>

        {/* Section 2 — Visual resume card */}
        <section>
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 flex flex-col gap-5">
            {/* Resume header */}
            <div className="border-b border-zinc-700 pb-4">
              <p className="text-lg font-bold text-zinc-100 tracking-tight">Jordan Lee</p>
              <p className="text-xs text-zinc-400 mt-1">
                Austin, TX &nbsp;·&nbsp; (555) 012-3456 &nbsp;·&nbsp;{" "}
                <a
                  href="mailto:jordan.lee@email.com"
                  className="underline underline-offset-2 decoration-zinc-600 hover:decoration-zinc-400 transition-colors"
                >
                  jordan.lee@email.com
                </a>
              </p>
            </div>

            {/* Objective */}
            <div>
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">Objective</p>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Motivated high school student seeking a part-time position where I can contribute strong communication skills and a reliable work ethic.
              </p>
            </div>

            {/* Education */}
            <div>
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">Education</p>
              <p className="text-xs text-zinc-100 font-medium">Austin High School, Austin TX</p>
              <p className="text-xs text-zinc-400">Expected Graduation: June 2026 &nbsp;·&nbsp; GPA: 3.4</p>
            </div>

            {/* Activities & Experience */}
            <div>
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2">Activities &amp; Experience</p>
              <ul className="flex flex-col gap-3">
                <li>
                  <p className="text-xs text-zinc-100 font-medium">Volunteer, Austin Food Bank <span className="text-zinc-500 font-normal">(Sept 2024 – Present)</span></p>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">Assisted with food sorting and distribution for 200+ families per week</p>
                </li>
                <li>
                  <p className="text-xs text-zinc-100 font-medium">Member, School Debate Team <span className="text-zinc-500 font-normal">(2023 – Present)</span></p>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">Developed public speaking and argumentation skills; competed in 3 regional tournaments</p>
                </li>
                <li>
                  <p className="text-xs text-zinc-100 font-medium">Babysitter <span className="text-zinc-500 font-normal">(Summer 2024)</span></p>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">Provided childcare for 2 families; managed schedules and daily activities independently</p>
                </li>
              </ul>
            </div>

            {/* Skills */}
            <div>
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">Skills</p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Microsoft Office · Google Workspace · Customer Service · Time Management · Teamwork
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 — What makes this resume work */}
        <section>
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">What Makes This Resume Work</p>
          <ul className="flex flex-col gap-2">
            {[
              "Uses activities and volunteering as experience",
              "Objective statement sets a professional tone",
              "Skills section shows transferable abilities",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="text-emerald-500 flex-shrink-0 mt-0.5">›</span>
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* GuideCTA #1 */}
        <GuideCTA />

        {/* Section 4 — Before & After */}
        <section>
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Before &amp; After</p>
          <div className="flex flex-col gap-3">
            <div className="bg-red-950/30 border border-red-500/20 rounded-xl px-5 py-4">
              <p className="text-xs font-semibold text-red-400 mb-1">Before</p>
              <p className="text-sm text-zinc-300">❌ &ldquo;helped at food bank sometimes&rdquo;</p>
            </div>
            <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-xl px-5 py-4">
              <p className="text-xs font-semibold text-emerald-400 mb-1">After</p>
              <p className="text-sm text-zinc-300">
                ✅ &ldquo;Assisted with food sorting and distribution for 200+ families per week at Austin Food Bank&rdquo;
              </p>
            </div>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed mt-4">
            This is exactly what ApplyWell does — turns what you think isn't impressive into something employers respect.
          </p>
        </section>

        {/* GuideCTA #2 */}
        <GuideCTA />

        {/* Section 5 — Internal links */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">Related Guides</h2>
          <div className="flex flex-col gap-2">
            <Link
              href="/first-job-resume-for-teens"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              → full guide to teen resumes
            </Link>
            <Link
              href="/no-subscription-resume-builder"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              → resume builder with no subscription
            </Link>
            <Link
              href="/guides/college-application-resume-example"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              → college application resume example
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
