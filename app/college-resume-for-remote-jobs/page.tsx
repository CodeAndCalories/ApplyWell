import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui";

/* ── Metadata ────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "How College Students Land High-Paying Remote Jobs (2026)",
  description:
    "Skip the entry-level grind. Learn how college students use proof of work, digital portfolios, and remote-ready tools to land high-paying remote jobs in 2026.",
  alternates: { canonical: "https://applywell.io/college-resume-for-remote-jobs" },
  openGraph: {
    title: "How College Students Land High-Paying Remote Jobs (2026) | ApplyWell",
    description:
      "Skip the entry-level grind. Learn how college students use proof of work, digital portfolios, and remote-ready tools to land high-paying remote jobs in 2026.",
    url: "https://applywell.io/college-resume-for-remote-jobs",
    type: "article",
  },
};

/* ── FAQ data ────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "Do remote employers care about my GPA?",
    a: "Rarely. Unless you're applying to consulting, finance, or a role that explicitly states a GPA requirement, most remote employers — especially startups, agencies, and product companies — prioritize portfolio evidence and demonstrated skills over grades. A 3.2 GPA and a deployed GitHub project beats a 3.9 GPA and a blank portfolio page almost every time.",
  },
  {
    q: "What's a digital portfolio and do I actually need one?",
    a: "A digital portfolio is any online presence that shows your work: a GitHub profile with committed code, a Notion page showcasing case studies, a personal website with writing or design samples, or a LinkedIn profile with work samples attached. In 2026, it's strongly recommended for tech, design, marketing, and content roles. Think of it as your resume's evidence layer — the document claims things, the portfolio proves them.",
  },
  {
    q: "How do I get a remote job with zero remote experience?",
    a: "Frame your existing experience through a remote lens. Online courses, self-directed projects, virtual club leadership, and freelance gigs all signal remote capability. List async tools you've used — Notion, Slack, GitHub, Google Docs — and describe any experience managing tasks or communication without in-person supervision. That's remote work, even if you never called it that.",
  },
  {
    q: "What remote tools should I mention on my resume?",
    a: "Only list tools you can discuss confidently in an interview. Common ones worth including: Slack, Notion, GitHub, Google Workspace, Trello, Jira, Zoom, Figma, and AI tools like ChatGPT or Claude if you've used them in a real work context. A recruiter may ask how you use any tool you claim — vague answers hurt more than omitting it.",
  },
  {
    q: "Is $9 worth it when free resume builders exist?",
    a: "Free builders typically add watermarks, require accounts, push subscription upgrades, and produce generic templates that recruiters recognize immediately. ApplyWell produces clean, ATS-optimized resumes with no watermarks, no account required, and no subscription. One interview offer from a role paying $20/hour more than your last job covers the cost in under 30 minutes of work.",
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

/* Inline tool pill — matches Badge aesthetic but accepts any string label */
function ToolPill({
  label,
  color,
}: {
  label: string;
  color: "emerald" | "indigo" | "violet" | "orange" | "sky" | "teal";
}) {
  const colorMap: Record<typeof color, string> = {
    emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    indigo:  "bg-indigo-500/15  text-indigo-300  border-indigo-500/25",
    violet:  "bg-violet-500/15  text-violet-300  border-violet-500/25",
    orange:  "bg-orange-500/15  text-orange-300  border-orange-500/25",
    sky:     "bg-sky-500/15     text-sky-300     border-sky-500/25",
    teal:    "bg-teal-500/15    text-teal-300    border-teal-500/25",
  };
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold border tracking-wide ${colorMap[color]}`}
    >
      {label}
    </span>
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
export default function CollegeResumeForRemoteJobsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="pt-8 pb-16 max-w-xl">

        {/* ── 1. High-energy hook ─────────────────────────────────────────── */}
        <section aria-labelledby="guide-title">
          <PageHeader
            badge="College Job Guide · 2026"
            title="How College Students Land High-Paying Remote Jobs in 2026"
            subtitle="Skip the two-year entry-level grind — here's what actually works"
          />

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card mb-8">
            <p className="text-zinc-300 text-sm leading-relaxed mb-3">
              The most competitive college students in 2026 aren't landing remote jobs through job
              boards and cover letter templates. They're getting hired because their digital
              footprint does the selling before a recruiter opens their resume.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-3">
              A GitHub with deployed projects, a Notion portfolio with documented case studies, or
              even a well-maintained LinkedIn with writing samples — these signal something that a
              3.9 GPA alone never will: that you ship things, you communicate clearly, and you
              don't need someone to walk you through every step.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              This guide covers exactly how to build that profile and translate your college
              experience into resume language that remote hiring managers actually respond to.
            </p>
          </div>
        </section>

        {/* ── 2. Proof of work over GPA ───────────────────────────────────── */}
        <section className="mb-10" aria-labelledby="proof-of-work">
          <SectionHeading>Proof of Work Beats GPA — Here's Why</SectionHeading>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card">
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              Remote employers — especially at startups and digital agencies — treat a GitHub
              profile, Notion portfolio, or deployed project as more valuable than academic
              credentials. The reason is straightforward: proof of work is unambiguous.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Your GPA says you passed exams in a structured environment. Your projects say you
              build things without being told exactly how, that you problem-solve independently, and
              that you can ship something from start to finish. Remote work is almost entirely that
              second list.
            </p>
            <div className="border-t border-zinc-800 pt-4">
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                Your digital footprint checklist
              </p>
              <ul className="flex flex-col gap-1.5">
                {[
                  "GitHub profile with at least 2 projects that have real commits (not just forked repos)",
                  "A README on each project explaining what it does and how to run it",
                  "LinkedIn profile with your GitHub and portfolio links visible",
                  "A Notion, Google Site, or personal domain that aggregates your work",
                  "At least one writing sample, design piece, or analysis you can share publicly",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 3. Coursework + clubs into experience ───────────────────────── */}
        <section className="mb-10" aria-labelledby="coursework-to-experience">
          <SectionHeading>How to Turn Coursework and Clubs Into Resume Experience</SectionHeading>
          <p className="text-zinc-500 text-sm leading-relaxed mb-4">
            Every project, leadership role, and course you've completed is resume-worthy — it just
            needs to be framed as professional experience, not student work.
          </p>
          <div className="flex flex-col gap-3">
            {[
              {
                type: "Data Science course project",
                weak: "Did analysis for data science class",
                strong:
                  "Analyzed 50,000 user behavior records using Python and Pandas; built a Tableau dashboard visualizing customer churn trends; project available on GitHub",
              },
              {
                type: "Student org leadership",
                weak: "Officer in marketing club",
                strong:
                  "Managed 8-person marketing committee for 1,200-student college organization; increased event attendance 60% YoY through targeted email campaigns and social strategy",
              },
              {
                type: "Study abroad / independent travel",
                weak: "Studied abroad in Spain",
                strong:
                  "Coordinated academic and logistical planning for 6-student international group across 3 countries; managed group budget of $8,400 with zero overruns",
              },
              {
                type: "Class group project",
                weak: "Group project for software class",
                strong:
                  "Led 5-person team to design, develop, and deliver a working SaaS prototype in 6 weeks using agile sprint methodology; presented to 3 industry mentors",
              },
            ].map((ex, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-card"
              >
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-3">
                  {ex.type}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-zinc-800/50 rounded-xl p-3 border border-zinc-700/50">
                    <span className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest block mb-1">
                      Generic
                    </span>
                    <p className="text-xs text-zinc-500 font-mono leading-snug">{ex.weak}</p>
                  </div>
                  <div className="bg-emerald-400/5 rounded-xl p-3 border border-emerald-500/20">
                    <span className="text-[10px] font-semibold text-emerald-500 uppercase tracking-widest block mb-1">
                      Remote-ready
                    </span>
                    <p className="text-xs text-zinc-300 leading-snug">{ex.strong}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. Tools section ────────────────────────────────────────────── */}
        <section className="mb-10" aria-labelledby="tools">
          <SectionHeading>Remote Tools Worth Listing on Your Resume</SectionHeading>
          <p className="text-zinc-500 text-sm leading-relaxed mb-4">
            Only list tools you've actually used — but don't undercount. If you've used it in a
            class, club, or personal project, it counts. Here are the tools remote hiring managers
            look for in 2026:
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card">
            <div className="flex flex-wrap gap-2 mb-5">
              <ToolPill label="GitHub" color="emerald" />
              <ToolPill label="Slack" color="indigo" />
              <ToolPill label="Notion" color="violet" />
              <ToolPill label="Google Workspace" color="sky" />
              <ToolPill label="Figma" color="orange" />
              <ToolPill label="Trello / Jira" color="teal" />
              <ToolPill label="Zoom" color="indigo" />
              <ToolPill label="ChatGPT / Claude" color="emerald" />
              <ToolPill label="Airtable" color="teal" />
              <ToolPill label="Linear" color="violet" />
            </div>
            <div className="border-t border-zinc-800 pt-4">
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                How to list tools on your resume
              </p>
              <ul className="flex flex-col gap-1.5">
                {[
                  "Add a Skills section near the bottom of your resume (not the top)",
                  "Group by category: Collaboration, Development, Design, Analytics",
                  "Only list tools you can discuss for 60 seconds if asked",
                  'For AI tools, mention the context: "Used Claude to draft and edit client-facing reports"',
                  "Remove tools that appear on every resume: Microsoft Word, Gmail, Google Chrome",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">›</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 5. Before → After ───────────────────────────────────────────── */}
        <section className="mb-10" aria-labelledby="before-after">
          <SectionHeading>Before → After: College Resume Bullets</SectionHeading>
          <p className="text-zinc-500 text-sm mb-4 leading-relaxed">
            Real college experience — rewritten for remote job applications.
          </p>

          <div className="flex flex-col gap-4">
            {[
              {
                before: "Helped professor with research",
                after:
                  "Assisted faculty research on consumer decision patterns; cleaned and coded 2,100 survey responses in Excel; co-authored section of departmental working paper cited in 3 follow-up studies",
              },
              {
                before: "In charge of social media for club",
                after:
                  "Grew student org LinkedIn from 120 to 840 followers in one semester; designed weekly content calendar using Canva and Buffer; increased event signups 55% — all managed remotely with a distributed 4-person team",
              },
              {
                before: "Internship at marketing agency",
                after:
                  "Supported 3 client accounts at digital marketing agency; built monthly performance reports in Google Data Studio; reduced reporting time 40% by automating data pulls from Google Analytics API",
              },
            ].map((ex, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-zinc-900 border border-zinc-700/60 rounded-2xl p-4 shadow-card">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">
                    Before
                  </span>
                  <p className="text-sm text-zinc-500 leading-snug font-mono">{ex.before}</p>
                </div>
                <div
                  className="bg-zinc-900 border border-emerald-500/25 rounded-2xl p-4 shadow-card"
                  style={{
                    boxShadow:
                      "0 1px 2px rgb(0 0 0 / 0.5), 0 2px 8px rgb(0 0 0 / 0.35), 0 0 0 1px rgb(52 211 153 / 0.06)",
                  }}
                >
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-2">
                    After (ApplyWell)
                  </span>
                  <p className="text-sm text-zinc-300 leading-snug">{ex.after}</p>
                </div>
              </div>
            ))}
          </div>
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

        {/* ── 7. CTA ──────────────────────────────────────────────────────── */}
        <section className="bg-zinc-900 border border-emerald-500/25 rounded-2xl p-6 mb-10 shadow-card">
          <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">
            Ready to compete?
          </p>
          <h2 className="font-serif text-2xl text-zinc-100 leading-tight tracking-tight mb-2">
            Build the resume that gets you the remote offer.
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-5">
            ApplyWell's guided builder turns your coursework, projects, and club experience into
            ATS-ready resume bullets that remote employers actually respond to. One-time payment,
            instant access.
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
              href="/first-job-resume-for-teens"
              badge="Parent's Guide"
              title="A parent's guide to your teen's first resume"
            />
          </div>
        </section>
      </article>
    </>
  );
}
