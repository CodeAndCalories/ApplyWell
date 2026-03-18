import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Disclaimer } from "@/components/ui";

/* ── Metadata ────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "How to Write Common App Activities That Stand Out (2026 Guide)",
  description:
    "Learn how to write compelling 150-character Common App activity descriptions using the X-Y-Z formula. Used by students getting into top schools.",
  alternates: { canonical: "https://applywell.io/common-app-activities-help" },
  openGraph: {
    title: "How to Write Common App Activities That Stand Out (2026 Guide) | ApplyWell",
    description:
      "Learn how to write compelling 150-character Common App activity descriptions using the X-Y-Z formula. Used by students getting into top schools.",
    url: "https://applywell.io/common-app-activities-help",
    type: "article",
  },
};

/* ── FAQ data ────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "How many Common App activities should I list?",
    a: "Common App allows up to 10 activities. You don't need to fill all 10 — quality beats quantity every time. Seven strong, well-described activities outperform ten weak ones. Admissions officers read every word of every description, so every slot you fill must earn its place.",
  },
  {
    q: "What counts as an activity on the Common App?",
    a: "Almost anything with sustained commitment: clubs, sports, jobs, internships, volunteer work, family responsibilities, self-directed projects, religious activities, creative pursuits, and independent research. If you spent meaningful time on it and can describe an outcome, it belongs on your list.",
  },
  {
    q: "Should I list activities in order of importance?",
    a: "Yes. Common App displays activities in the order you list them, and most admissions officers read top-to-bottom. Put your most significant, sustained commitment first — usually something you've done for multiple years and held a leadership role in. Don't lead with something you joined in senior year.",
  },
  {
    q: "Can I use the same activity description for every school?",
    a: "Common App submissions use the same activity list for every school you apply to, so your descriptions need to work universally. Write them to highlight your genuine impact, not to appeal to a specific school's culture — that's what supplemental essays are for.",
  },
  {
    q: "Is the X-Y-Z formula really that different from what I'd write naturally?",
    a: "For most students, yes. The natural instinct is to describe a role — 'I was captain of the debate team.' The X-Y-Z formula forces you to describe impact — 'Led 14-person team to state quarterfinals; developed weekly argument workshops that improved win rate 40%.' Admissions officers at selective schools read thousands of activity lists. The ones with concrete outcomes stand out.",
  },
];

/* ── Activity categories ─────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    type: "Club / Org Leadership",
    weak: "President of student government",
    strong:
      "Led 20-member student government; passed 3 school-wide policy changes; allocated $12k budget across 8 student organizations",
  },
  {
    type: "Athletics",
    weak: "Varsity soccer player",
    strong:
      "4-year varsity starter; team captain senior year; led team to first state playoff appearance in 11 years with 14-2 record",
  },
  {
    type: "Volunteer / Community Service",
    weak: "Volunteered at animal shelter",
    strong:
      "Logged 200+ volunteer hours over 3 years; coordinated 12 adoption events placing 85 animals; trained 6 new volunteers on intake process",
  },
  {
    type: "Work Experience",
    weak: "Worked at coffee shop",
    strong:
      "Barista and shift lead, 15 hrs/week for 2 years; trained 4 new hires; maintained 4.8-star location rating during high-volume weekend shifts",
  },
  {
    type: "Creative / Artistic",
    weak: "Plays piano",
    strong:
      "Studied classical piano for 9 years; performed at 3 regional competitions; composed original piece performed at school's annual showcase",
  },
  {
    type: "Independent / Self-Directed",
    weak: "Likes to code",
    strong:
      "Self-taught web developer; built 4 deployed projects including a local business directory with 300+ active users; active GitHub with 200+ commits",
  },
];

/* ── JSON-LD schema ──────────────────────────────────────────────────────── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/* ── Inline components ───────────────────────────────────────────────────── */
function CTAButton() {
  return (
    <Link
      href="/"
      className="flex items-center justify-center w-full min-h-[52px] bg-emerald-400 hover:bg-emerald-300 hover:-translate-y-0.5 text-zinc-900 font-bold text-sm rounded-2xl transition-all px-6"
      style={{ boxShadow: "0 4px 16px rgb(52 211 153 / 0.35)" }}
    >
      Build My Resume — $9 one-time, no subscription
    </Link>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-xl text-zinc-100 leading-snug tracking-tight mb-4">
      {children}
    </h2>
  );
}

function GuideCard({ href, badge, title }: { href: string; badge: string; title: string }) {
  return (
    <Link
      href={href}
      className="bg-zinc-900 border border-emerald-500/25 rounded-2xl p-4 shadow-card hover:border-emerald-500/50 transition-colors group block"
    >
      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5 block">
        {badge}
      </span>
      <p className="text-sm font-semibold text-zinc-200 group-hover:text-zinc-100 leading-snug">
        {title} →
      </p>
    </Link>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function CommonAppActivitiesHelpPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="pt-8 pb-16 max-w-xl">

        {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="guide-title">
          <PageHeader
            badge="Common App Guide · 2026"
            title="How to Write Common App Activities That Actually Stand Out"
            subtitle="150 characters. Used by students getting into top schools."
          />

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card mb-8">
            <p className="text-zinc-300 text-sm leading-relaxed mb-3">
              You have 150 characters per activity. Most students waste them listing what they did.
              The ones who get in describe what they achieved.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Admissions officers at selective schools read thousands of activity lists every cycle.
              The descriptions that stop them aren&apos;t longer — they&apos;re more precise. This
              guide shows you the exact formula used by students who turn ordinary activities into
              compelling evidence of leadership, impact, and character.
            </p>
          </div>
        </section>

        {/* ── 2. The 150-character rule ───────────────────────────────────── */}
        <section className="mb-10" aria-labelledby="character-rule">
          <SectionHeading>The 150-Character Rule: Why Brevity Wins</SectionHeading>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card">
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              Common App gives you 150 characters for each activity description — roughly two short
              sentences. That constraint is not a bug; it&apos;s the point. Admissions officers are
              trained to extract signal from compressed information. A tight, specific description
              signals writing ability, self-awareness, and the capacity to prioritize — all traits
              colleges actively recruit.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              A vague 150-character description wastes the slot entirely. A specific one — with a
              number, an outcome, or a scale of impact — does more persuasive work than a full
              paragraph could.
            </p>
            <div className="border-t border-zinc-800 pt-4">
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
                The difference in practice
              </p>
              <div className="flex flex-col gap-3">
                <div className="bg-zinc-800/50 rounded-xl p-3 border border-zinc-700/50">
                  <span className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest block mb-1">
                    Vague (wasted)
                  </span>
                  <p className="text-xs text-zinc-500 font-mono leading-snug">
                    &quot;I was involved in the debate team and helped with competitions.&quot;
                  </p>
                  <p className="text-[10px] text-zinc-700 mt-1">138 characters — says nothing</p>
                </div>
                <div className="bg-emerald-400/5 rounded-xl p-3 border border-emerald-500/20">
                  <span className="text-[10px] font-semibold text-emerald-500 uppercase tracking-widest block mb-1">
                    Specific (effective)
                  </span>
                  <p className="text-xs text-zinc-300 leading-snug">
                    &quot;Captain, 3 yrs; led team to state semifinals; coached 6 novice members;
                    won Best Speaker at 2 invitationals&quot;
                  </p>
                  <p className="text-[10px] text-emerald-700 mt-1">138 characters — says everything</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. X-Y-Z formula ────────────────────────────────────────────── */}
        <section className="mb-10" aria-labelledby="xyz-formula">
          <SectionHeading>The X-Y-Z Formula for Common App Activities</SectionHeading>
          <p className="text-zinc-500 text-sm leading-relaxed mb-4">
            The X-Y-Z formula — used by career coaches and college consultants alike — adapts
            perfectly to the 150-character constraint:{" "}
            <em className="text-zinc-400">Accomplished [X] as measured by [Y], by doing [Z].</em>{" "}
            In practice, you&apos;ll compress it, but the structure keeps every description
            anchored to a real outcome.
          </p>

          <div className="flex flex-col gap-4">
            {[
              {
                before: "Captain of robotics team",
                after:
                  "Led 12-member team to regional finals; managed $3k budget and weekly sprint schedule",
              },
              {
                before: "Volunteered at food bank",
                after:
                  "Coordinated 40+ volunteer shifts serving 200 families/week; trained 8 new volunteers on intake process",
              },
              {
                before: "School newspaper writer",
                after:
                  "Published 15 articles reaching 800+ readers; increased online engagement 60% via social distribution strategy",
              },
            ].map((ex, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-zinc-900 border border-zinc-700/60 rounded-2xl p-4 shadow-card">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">
                    Before
                  </span>
                  <p className="text-sm text-zinc-500 font-mono leading-snug">{ex.before}</p>
                </div>
                <div
                  className="bg-zinc-900 border border-emerald-500/25 rounded-2xl p-4 shadow-card"
                  style={{
                    boxShadow:
                      "0 1px 2px rgb(0 0 0 / 0.5), 0 2px 8px rgb(0 0 0 / 0.35), 0 0 0 1px rgb(52 211 153 / 0.06)",
                  }}
                >
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-2">
                    After (X-Y-Z)
                  </span>
                  <p className="text-sm text-zinc-300 leading-snug">{ex.after}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. Activity categories ──────────────────────────────────────── */}
        <section className="mb-10" aria-labelledby="categories">
          <SectionHeading>X-Y-Z Examples for Every Activity Type</SectionHeading>
          <p className="text-zinc-500 text-sm leading-relaxed mb-4">
            The formula works across every Common App category. Here&apos;s how to apply it to
            the most common activity types students list.
          </p>
          <div className="flex flex-col gap-4">
            {CATEGORIES.map((cat, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-card"
              >
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-3">
                  {cat.type}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-zinc-800/50 rounded-xl p-3 border border-zinc-700/50">
                    <span className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest block mb-1">
                      Typical
                    </span>
                    <p className="text-xs text-zinc-500 font-mono leading-snug">{cat.weak}</p>
                  </div>
                  <div className="bg-emerald-400/5 rounded-xl p-3 border border-emerald-500/20">
                    <span className="text-[10px] font-semibold text-emerald-500 uppercase tracking-widest block mb-1">
                      X-Y-Z version
                    </span>
                    <p className="text-xs text-zinc-300 leading-snug">{cat.strong}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. Disclaimer crossover callout ─────────────────────────────── */}
        <section className="mb-10" aria-labelledby="crossover">
          <Disclaimer>
            The same format that wins Common App activities is exactly what remote employers look
            for on resumes. ApplyWell helps you nail both — activity descriptions and full resume
            bullets — using the same X-Y-Z discipline.
          </Disclaimer>
        </section>

        {/* ── 6. FAQ ──────────────────────────────────────────────────────── */}
        <section className="mb-10" aria-labelledby="faq">
          <SectionHeading>Frequently Asked Questions</SectionHeading>
          <div className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card"
              >
                <h3 className="text-sm font-semibold text-zinc-100 mb-2 leading-snug">{f.q}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. Conversion block ─────────────────────────────────────────── */}
        <section className="bg-zinc-900 border border-emerald-500/25 rounded-2xl p-6 mb-10 shadow-card">
          <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">
            Same formula. Full resume.
          </p>
          <h2 className="font-serif text-2xl text-zinc-100 leading-tight tracking-tight mb-2">
            Build your resume with the same format.
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-5">
            ApplyWell applies the X-Y-Z formula to every section of your resume — experience,
            activities, skills, and projects. The same discipline that makes your Common App
            activities stand out will make your resume the one that gets a callback.
          </p>
          <CTAButton />
          <p className="text-xs text-zinc-600 text-center mt-3">
            No account required · Data stays in your browser · 30-day guarantee
          </p>
        </section>

        {/* ── 8. Related guides ────────────────────────────────────────────── */}
        <section aria-label="Related guides">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
            Related guides
          </p>
          <div className="flex flex-col gap-3">
            <GuideCard
              href="/high-salary-remote-resume"
              badge="Remote Jobs"
              title="What makes a resume stand out for high-salary remote jobs"
            />
            <GuideCard
              href="/first-job-resume-for-teens"
              badge="Parent's Guide"
              title="A parent's guide to your teen's first resume"
            />
            <GuideCard
              href="/college-resume-for-remote-jobs"
              badge="College"
              title="How college students land high-paying remote jobs"
            />
            <GuideCard
              href="/ai-skills-for-students"
              badge="AI Skills"
              title="AI skills for your resume: what students should list in 2026"
            />
            <GuideCard
              href="/no-subscription-resume-builder"
              badge="Pricing"
              title="The best resume builder with no subscription — why one-time wins"
            />
          </div>
        </section>
      </article>
    </>
  );
}
