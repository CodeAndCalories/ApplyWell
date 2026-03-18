import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Disclaimer } from "@/components/ui";

/* ── Metadata ────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "A Parent's Guide to Your Teen's First Resume (2026)",
  description:
    "Most teen resumes are rejected before a human sees them. Learn how to help your student build a first resume that actually gets noticed — for any job, local or remote.",
  alternates: { canonical: "https://applywell.io/first-job-resume-for-teens" },
  openGraph: {
    title: "A Parent's Guide to Your Teen's First Resume (2026) | ApplyWell",
    description:
      "Most teen resumes are rejected before a human sees them. Learn how to help your student build a first resume that actually gets noticed — for any job, local or remote.",
    url: "https://applywell.io/first-job-resume-for-teens",
    type: "article",
  },
};

/* ── FAQ data ────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "My teen has never had a real job — can they still make a resume?",
    a: "Yes, and this is more common than most parents realize. The first resume is almost always built without formal work experience. School clubs, volunteer hours, babysitting, lawn care, and helping with a family business all count as real experience when written correctly. The goal isn't a long resume — it's an honest one, formatted so employers can read it in 30 seconds.",
  },
  {
    q: "How long should a teen's first resume be?",
    a: "One page, always. A second page won't impress an employer — it will make the resume harder to scan. ApplyWell is built around one-page resumes by design, so you can't accidentally over-pad it.",
  },
  {
    q: "My teen only has babysitting and lawn-mowing experience. Is that enough?",
    a: "Absolutely. These roles show responsibility, client communication, and reliability — three traits every employer values. The key is framing: 'Regular childcare provider for 4 families in neighborhood; consistently rehired over 2 years' tells a professional story. ApplyWell's guided prompts help turn informal experience into polished bullets.",
  },
  {
    q: "Should volunteer hours go on a teen's resume?",
    a: "Yes, always. Even a few hours at a food bank, school event, or community cleanup demonstrates initiative and community awareness — two qualities employers now actively screen for. List the organization, the role, a rough hour count, and one thing your teen did or learned.",
  },
  {
    q: "Does ApplyWell work for teens applying for local jobs, not just remote?",
    a: "Yes. ApplyWell generates clean, ATS-ready resumes that work for any job: local retail, food service, lawn care, tutoring, lifeguarding, or remote opportunities. The format is professional and readable whether it's reviewed by a computer or a small business owner.",
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
      Get Your Student Started — $9 one-time, no subscription
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

function GuideCard({
  href,
  badge,
  title,
}: {
  href: string;
  badge: string;
  title: string;
}) {
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
export default function FirstJobResumeForTeensPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="pt-8 pb-16 max-w-xl">

        {/* ── 1. Emotional hook ───────────────────────────────────────────── */}
        <section aria-labelledby="guide-title">
          <PageHeader
            badge="Parent's Guide · 2026"
            title="A Parent's Guide to Your Teen's First Resume"
            subtitle="Most first resumes are rejected before a human ever reads them — here's how to change that"
          />

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card mb-8">
            <p className="text-zinc-300 text-sm leading-relaxed mb-3">
              Most teen resumes are filtered out before a human ever reads them. Applicant tracking
              systems — used by grocery stores, restaurants, and retailers, not just corporations —
              reject resumes with bad formatting, missing keywords, or wrong file types before a
              manager sees a single line.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-3">
              Your student could have a genuinely impressive record — years of babysitting, club
              leadership, volunteer work — and still get ignored because the document doesn't pass a
              30-second scan.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              This guide walks you through exactly what employers want from a first-time applicant,
              and how to turn what your teen already has into a resume that gets a callback.
            </p>
          </div>
        </section>

        {/* ── 2. What employers want ──────────────────────────────────────── */}
        <section className="mb-10" aria-labelledby="what-employers-want">
          <SectionHeading>What Employers Actually Want from First-Time Applicants</SectionHeading>
          <p className="text-zinc-500 text-sm leading-relaxed mb-4">
            Employers hiring teens and first-time job seekers aren't expecting years of experience.
            They're screening for five things:
          </p>
          <ul className="flex flex-col gap-3">
            {[
              {
                label: "Reliability",
                detail:
                  "Can they show up on time, every shift? Mention consistent commitments: a sport played for two years, a job they've held all summer, or a weekly volunteer slot they haven't missed.",
              },
              {
                label: "Basic communication",
                detail:
                  "A clearly written resume with no typos is itself proof of communication skill. Employers notice when a first-time applicant puts real effort into their presentation.",
              },
              {
                label: "Willingness to learn",
                detail:
                  "Phrases like 'completed online certification,' 'sought feedback from coach,' or 'learned new software for club role' all signal coachability — one of the most valued traits in any entry-level hire.",
              },
              {
                label: "Responsibility",
                detail:
                  "Any role where they handled something important counts: cash, schedules, younger children, customer service, or equipment. Name the responsibility explicitly on the resume.",
              },
              {
                label: "Character",
                detail:
                  "Kindness, patience, and teamwork show up in volunteer entries, club leadership, and even in how experience is described. A student who tutored peers for free, or organized a fundraiser, communicates character through those details.",
              },
            ].map((item) => (
              <li
                key={item.label}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-card"
              >
                <span className="text-sm font-semibold text-emerald-400 block mb-1">
                  {item.label}
                </span>
                <span className="text-sm text-zinc-400 leading-relaxed">{item.detail}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── 3. Turn school into bullets ─────────────────────────────────── */}
        <section className="mb-10" aria-labelledby="school-to-bullets">
          <SectionHeading>How to Turn School Into Resume Bullets</SectionHeading>
          <p className="text-zinc-500 text-sm leading-relaxed mb-4">
            Everything your teen does — clubs, projects, part-time work, and even household
            responsibilities — can become a professional resume entry when written correctly.
          </p>

          <div className="flex flex-col gap-4">
            {[
              {
                category: "Clubs & organizations",
                plain: "Member of Environmental Club",
                strong:
                  "Led weekly meetings for 12-member Environmental Club; coordinated two fundraising drives raising $800 for local park restoration",
              },
              {
                category: "School projects",
                plain: "Made a website for class",
                strong:
                  "Built a functional e-commerce prototype using Wix for a school entrepreneurship competition; project received highest presentation score in class of 28",
              },
              {
                category: "Babysitting / childcare",
                plain: "Babysat for families",
                strong:
                  "Provided consistent childcare for 4 families (ages 3–10); managed after-school schedules, meals, and homework — rehired by all families for 2+ years",
              },
              {
                category: "Household responsibility",
                plain: "Helped at home",
                strong:
                  "Managed weekly household logistics for family of 5 including grocery planning, sibling scheduling, and recurring chore coordination — without supervision — for 3 years",
              },
            ].map((ex, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-card">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-3">
                  {ex.category}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-zinc-800/50 rounded-xl p-3 border border-zinc-700/50">
                    <span className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest block mb-1">
                      Typical wording
                    </span>
                    <p className="text-xs text-zinc-500 font-mono leading-snug">{ex.plain}</p>
                  </div>
                  <div className="bg-emerald-400/5 rounded-xl p-3 border border-emerald-500/20">
                    <span className="text-[10px] font-semibold text-emerald-500 uppercase tracking-widest block mb-1">
                      ApplyWell version
                    </span>
                    <p className="text-xs text-zinc-300 leading-snug">{ex.strong}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-zinc-400 text-sm mt-3">
            Bonus: ApplyWell&apos;s X-Y-Z bullet format works directly for Common App Activities
            too. The same 150-character discipline that wins remote jobs is exactly what college
            admissions officers want to see in your activity descriptions.
          </p>
        </section>

        {/* ── 4. Trust section ────────────────────────────────────────────── */}
        <section className="mb-10" aria-labelledby="trust">
          <SectionHeading>Why ApplyWell — Not a Generic Free Builder</SectionHeading>

          {/* Disclaimer component — used for key trust callout */}
          <div className="mb-4">
            <Disclaimer>
              ApplyWell stores everything in your browser — no account, no login, no data ever
              sent to a server. Unlike ad-supported free builders, we don't sell your student's
              information or display career ads. One $9 payment, no subscription, no upsell.
            </Disclaimer>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card">
            <div className="flex flex-col gap-4">
              {[
                {
                  heading: "Ad-free and distraction-free",
                  body: "Free builders make money showing your teen job ads, resume service upsells, and subscription prompts. ApplyWell charges $9 once and that's it — no dark patterns, no upgrade pressure.",
                },
                {
                  heading: "Professional output, not a template",
                  body: "Most free builders produce cookie-cutter PDFs that recruiters see hundreds of times a week. ApplyWell generates clean, ATS-optimized resumes that pass automated screening and look polished to human reviewers.",
                },
                {
                  heading: "Built for students specifically",
                  body: "The guided prompts are designed for people who have never written a resume before. Each section includes examples, hints, and length guidance — so your teen isn't staring at a blank page.",
                },
                {
                  heading: "Safe for minors",
                  body: "No account means no email address, no password, and nothing stored in the cloud. The entire tool runs in the browser. You can close the tab and reopen it — the data is still there, saved locally.",
                },
              ].map((item) => (
                <div key={item.heading} className="border-b border-zinc-800 last:border-0 pb-4 last:pb-0">
                  <h3 className="text-sm font-semibold text-zinc-100 mb-1">{item.heading}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. FAQ ──────────────────────────────────────────────────────── */}
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

        {/* ── 6. CTA ──────────────────────────────────────────────────────── */}
        <section className="bg-zinc-900 border border-emerald-500/25 rounded-2xl p-6 mb-10 shadow-card">
          <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">
            Ready to get started?
          </p>
          <h2 className="font-serif text-2xl text-zinc-100 leading-tight tracking-tight mb-2">
            Give your student a professional first impression.
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-5">
            ApplyWell guides your teen through building a complete, ATS-ready resume in under an
            hour — even with no work experience. One-time payment, instant access, no account
            needed.
          </p>
          <CTAButton />
          <p className="text-xs text-zinc-600 text-center mt-3">
            No account required · Data stays in your browser · 30-day guarantee
          </p>
        </section>

        {/* ── Internal links ───────────────────────────────────────────────── */}
        <section aria-label="Related guides">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
            More guides
          </p>
          <div className="flex flex-col gap-3">
            <GuideCard
              href="/high-salary-remote-resume"
              badge="Remote Jobs"
              title="What makes a resume stand out for high-salary remote jobs"
            />
            <GuideCard
              href="/college-resume-for-remote-jobs"
              badge="College"
              title="How college students land high-paying remote jobs"
            />
          </div>
        </section>
      </article>
    </>
  );
}
