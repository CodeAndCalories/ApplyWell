import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SKILLS, getSkill } from "./skills-data";

const STRIPE_URL = "https://buy.stripe.com/6oU7sKgSQ2K52hdcHt7g401";

/* ── Static params ───────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return SKILLS.map((s) => ({ skill: s.slug }));
}

/* ── Metadata ────────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ skill: string }>;
}): Promise<Metadata> {
  const { skill: slug } = await params;
  const skill = getSkill(slug);
  if (!skill) return {};

  return {
    title: `${skill.name} for Teens — Free Courses & Resume Wording (2026)`,
    description: `Learn ${skill.name.toLowerCase()} for free and add it to your resume the right way. Best courses for high school students plus resume bullet points — ApplyWell.`,
    alternates: {
      canonical: `https://applywell.io/guides/ai-skills/${skill.slug}`,
    },
    openGraph: {
      title: `${skill.name} for Teens (2026) | ApplyWell`,
      description: `Learn ${skill.name.toLowerCase()} for free and add it to your resume the right way. Best courses for high school students — ApplyWell.`,
    },
  };
}

/* ── Components ──────────────────────────────────────────────────────────── */
const DEMAND_STYLES: Record<string, string> = {
  "Very High": "bg-emerald-400/10 text-emerald-400 border-emerald-400/25",
  "High":      "bg-amber-400/10  text-amber-400  border-amber-400/25",
  "Medium":    "bg-zinc-700/60   text-zinc-400   border-zinc-600/40",
};

function GuideCTA() {
  return (
    <div className="my-8 bg-zinc-900 border border-emerald-500/25 rounded-2xl p-5 shadow-card text-center">
      <p className="text-sm font-semibold text-zinc-200 mb-1">Ready to add these skills to your resume?</p>
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

/* ── Page ────────────────────────────────────────────────────────────────── */
export default async function AISkillPage({
  params,
}: {
  params: Promise<{ skill: string }>;
}) {
  const { skill: slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();

  return (
    <div className="py-12 animate-fade-in">
      <div className="mb-8 flex items-center gap-3">
        <Link href="/guides/free-ai-courses-for-teens" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Free AI courses for teens
        </Link>
        <span className="text-zinc-700 text-xs">/</span>
        <span className="text-xs text-zinc-600">{skill.name}</span>
      </div>

      <h1 className="font-serif text-3xl tracking-tight mb-2">
        {skill.name} for Students — How to Learn It and Put It on Your Resume
      </h1>
      <p className="text-xs text-zinc-500 mb-6">Last updated: April 2026</p>

      {/* ── Badges ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 px-3 py-1 rounded-full">
          ⏱ {skill.timeToLearn} to learn
        </span>
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full border ${DEMAND_STYLES[skill.demandLevel]}`}>
          📈 {skill.demandLevel} demand
        </span>
      </div>

      <div className="flex flex-col gap-8">

        {/* ── Intro ───────────────────────────────────────────────────────── */}
        <section>
          <p className="text-sm text-zinc-400 leading-relaxed mb-3">
            {skill.description} Employers in every industry — from tech to marketing to healthcare
            — are actively screening for this skill in 2026, even for entry-level and internship
            roles.
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed">
            The good news: you can learn {skill.name.toLowerCase()} for free. Below are the best
            courses for high school students, plus exactly how to word it on your resume so it
            actually gets noticed.
          </p>
        </section>

        {/* ── Courses ─────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-4">
            Free Courses to Learn {skill.name}
          </h2>
          <div className="flex flex-col gap-3">
            {skill.courses.map((course) => (
              <div
                key={course}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 shadow-card flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400/70 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-zinc-200 leading-snug">{course}</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Free · Certificate available</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-600 mt-3">
            Full course links and completion tips in the{" "}
            <Link
              href="/guides/free-ai-courses-for-teens"
              className="underline underline-offset-2 decoration-zinc-700 hover:decoration-zinc-500 transition-colors text-zinc-500"
            >
              free AI courses for teens
            </Link>
            {" "}guide.
          </p>
        </section>

        <GuideCTA />

        {/* ── Resume wording ───────────────────────────────────────────────── */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">
            How to List {skill.name} on Your Resume
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-5">
            ATS software scans for specific keywords before a human ever reads your resume. Listing
            this skill with a concrete achievement — not just the skill name — is what gets you past
            the filter and into the callback pile.
          </p>

          <div className="bg-emerald-400/5 border border-emerald-500/20 rounded-2xl px-5 py-4 mb-4">
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">
              Resume bullet preview
            </p>
            <p className="text-xs text-zinc-300 leading-relaxed font-mono">
              {skill.resumeBulletTeaser}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 flex items-start gap-3">
            <span className="text-lg flex-shrink-0">🔒</span>
            <div>
              <p className="text-sm font-semibold text-zinc-200 mb-1">
                Get the full optimized bullet points inside ApplyWell
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed mb-3">
                ApplyWell generates complete, ATS-ready resume bullets for every skill and course
                above — tailored to your experience level.
              </p>
              <a
                href={STRIPE_URL}
                className="inline-flex items-center justify-center bg-emerald-400 hover:bg-emerald-300 text-zinc-900 font-bold text-xs rounded-xl px-4 py-2 transition-all"
                style={{ boxShadow: "0 2px 10px rgb(52 211 153 / 0.3)" }}
              >
                Unlock bullet points — $9 →
              </a>
            </div>
          </div>
        </section>

        <GuideCTA />

        {/* ── Internal links ───────────────────────────────────────────────── */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">Related Guides</h2>
          <div className="flex flex-col gap-2">
            <Link
              href="/guides/free-ai-courses-for-teens"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              → Free AI courses for teens — full list with links
            </Link>
            <Link
              href="/first-job-resume-for-teens"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              → First job resume for teens — complete guide
            </Link>
            <Link
              href="/guides/college-application-resume-example"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              → College application resume — example & format
            </Link>
            <Link
              href="/guides/student-resume-verbs"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              → Strong action verbs for student resumes
            </Link>
          </div>
        </section>

      </div>

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
