import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui";

/* ── Metadata ────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "High-Salary Remote Resume Guide (2026)",
  description:
    "Learn what makes a resume stand out for high-salary remote jobs in 2026. Built for students and entry-level applicants.",
  alternates: { canonical: "https://applywell.io/high-salary-remote-resume" },
  openGraph: {
    title: "High-Salary Remote Resume Guide (2026) | ApplyWell",
    description:
      "Learn what makes a resume stand out for high-salary remote jobs in 2026. Built for students and entry-level applicants.",
    url: "https://applywell.io/high-salary-remote-resume",
    type: "article",
  },
};

/* ── FAQ data ────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "Do I need remote work experience to apply for remote jobs?",
    a: "No. Remote employers look for evidence of self-direction, not a job title that says 'remote.' Projects, freelance work, club leadership, and self-taught skills all demonstrate the independence remote teams want. Frame what you have — don't wait for experience you don't yet have.",
  },
  {
    q: "What tools should I list on my resume for remote jobs?",
    a: "List the tools you've actually used: GitHub, Notion, Slack, Google Workspace, Figma, Trello, Zoom, or any project management software. Avoid listing tools you've only heard of — interviewers will ask follow-up questions, and vague answers hurt more than omitting a tool.",
  },
  {
    q: "How long should a remote resume be in 2026?",
    a: "One page for students and applicants with under five years of experience. Remote recruiters review hundreds of applications — concise and scannable wins over long and comprehensive every time.",
  },
  {
    q: "Should I include a portfolio link on my resume?",
    a: "Yes, absolutely. In 2026 a portfolio link is nearly mandatory for tech, design, marketing, and content roles. Include your GitHub, personal website, or Notion portfolio in your resume header alongside your email and LinkedIn.",
  },
  {
    q: "Can students with no work history get high-salary remote jobs?",
    a: "It depends on the role, but the answer is often yes. Entry-level remote roles in tech support, content writing, data entry, and customer success regularly hire students with no formal work history. The key is showing proof of skill — not proof of employment.",
  },
];

/* ── HowTo steps ─────────────────────────────────────────────────────────── */
const HOWTO_STEPS = [
  {
    name: "Lead with measurable results",
    text: "Replace vague job duties with specific outcomes — numbers, percentages, and named tools that prove your impact.",
  },
  {
    name: "Add your digital portfolio link",
    text: "Include your GitHub, Notion portfolio, or personal site in your resume header so recruiters can verify your skills instantly.",
  },
  {
    name: "List remote-ready tools",
    text: "Mention Slack, Notion, GitHub, Google Workspace, and any async communication tools you have real experience using.",
  },
  {
    name: "Target ATS keywords",
    text: "Include phrases like 'remote collaboration,' 'async communication,' and 'distributed team' to pass automated applicant tracking systems.",
  },
  {
    name: "Keep it to one page",
    text: "One focused, well-formatted page outperforms a two-page resume for every remote job application in 2026.",
  },
];

/* ── JSON-LD schemas ─────────────────────────────────────────────────────── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Build a Resume for High-Salary Remote Jobs in 2026",
  description:
    "A step-by-step guide to writing a resume that stands out for high-salary remote job applications.",
  step: HOWTO_STEPS.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.name,
    text: s.text,
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
export default function HighSalaryRemoteResumePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <article className="pt-8 pb-16 max-w-xl">

        {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="guide-title">
          <PageHeader
            badge="Remote Jobs Guide · 2026"
            title="What Makes a Resume Stand Out for High-Salary Remote Jobs"
            subtitle="A practical guide for students and entry-level applicants"
          />

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card mb-8">
            <p className="text-zinc-300 text-sm leading-relaxed mb-3">
              <strong className="text-zinc-100">Direct answer:</strong> A resume stands out for
              high-salary remote jobs in 2026 by leading with measurable results, demonstrating
              fluency with remote-ready tools (Slack, Notion, GitHub), and showing self-directed
              work through projects, freelance experience, or published portfolios.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Remote recruiters screen hundreds of applications per role. They're not looking for
              the longest list of responsibilities — they're looking for evidence that you can work
              independently, communicate clearly in writing, and deliver outcomes without someone
              standing over your shoulder.
            </p>
          </div>
        </section>

        {/* ── 2. What remote recruiters want ──────────────────────────────── */}
        <section className="mb-10" aria-labelledby="what-recruiters-want">
          <SectionHeading>What Remote Recruiters Actually Look For</SectionHeading>
          <ul className="flex flex-col gap-3">
            {[
              {
                label: "Measurable outcomes",
                detail:
                  '"Grew newsletter open rate from 22% to 41%" beats "managed email campaigns" every time. Numbers are the fastest way to prove impact on a resume.',
              },
              {
                label: "Tool fluency",
                detail:
                  "List tools you've genuinely used: GitHub, Notion, Slack, Google Workspace, Figma, Zoom, Trello, or Jira. Remote teams work inside these tools all day.",
              },
              {
                label: "Evidence of independent work",
                detail:
                  "Projects, freelance gigs, self-taught certifications, and personal websites all signal that you can move without being managed.",
              },
              {
                label: "Clear, concise writing",
                detail:
                  "Remote teams communicate almost entirely in writing. A well-written resume is itself a writing sample — clarity and precision matter.",
              },
              {
                label: "A portfolio or profile link",
                detail:
                  "GitHub, a personal site, or a Notion portfolio page in your resume header signals digital fluency before a recruiter reads a single bullet.",
              },
              {
                label: "ATS keyword alignment",
                detail:
                  'Phrases like "remote collaboration," "async communication," "distributed team," and "cross-functional" help your resume clear automated filters.',
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

        {/* ── 3. Before → After ───────────────────────────────────────────── */}
        <section className="mb-10" aria-labelledby="before-after">
          <SectionHeading>Before → After Resume Bullet Examples</SectionHeading>
          <p className="text-zinc-500 text-sm mb-4 leading-relaxed">
            The same experience — rewritten for a remote job application.
          </p>

          <div className="flex flex-col gap-4">
            {[
              {
                before: "Managed social media for club",
                after:
                  "Grew Instagram following 47% in 4 months by building a weekly content calendar and using analytics to optimize post timing — all managed remotely using Notion and Buffer",
              },
              {
                before: "Helped with school website",
                after:
                  "Built and deployed a React-based school event site on Vercel; reduced update time by 80% by moving from static HTML to a CMS; project code available on GitHub",
              },
              {
                before: "Did research for class project",
                after:
                  "Conducted independent research on consumer pricing behavior; analyzed 1,200 survey responses in Excel; presented findings to a 40-person class with a slide deck that earned an A",
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

        {/* ── 4. For Students ─────────────────────────────────────────────── */}
        <section className="mb-10" aria-labelledby="for-students">
          <SectionHeading>For Students: Your Projects Are Your Experience</SectionHeading>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card">
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              In 2026, a GitHub profile or Notion portfolio is treated as a second resume. Recruiters
              at remote-first companies often check GitHub <em>before</em> reading your bullet
              points. Even one deployed project — a simple website, a data scraper, a scheduling
              app — demonstrates the independence that remote work requires.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              List your GitHub URL in your resume header, alongside your email and LinkedIn. If you
              don't have a GitHub yet, create one today and push anything — even coursework you've
              cleaned up. The presence of a real profile with real commits signals more than a
              blank portfolio link.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              If you don't have paid work experience, your class projects and extracurriculars
              <em> are</em> your experience. Robotics team captain? That's project management.
              Running your school's Instagram? That's content strategy and data analysis. Peer
              tutor? That's curriculum design and async communication.
            </p>
            <div className="border-t border-zinc-800 pt-4">
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                Quick checklist for student remote resumes
              </p>
              <ul className="flex flex-col gap-1.5">
                {[
                  "GitHub profile link in the header",
                  "At least one deployed project with a live URL",
                  "Every bullet has a number or outcome",
                  'Tools listed under a "Skills" section (only tools you can speak to)',
                  "One-page, clean formatting — no tables or text boxes",
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

        {/* ── 5. For Parents ──────────────────────────────────────────────── */}
        <section className="mb-10" aria-labelledby="for-parents">
          <SectionHeading>For Parents: The Secret Weapon Nobody Talks About</SectionHeading>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card">
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              Remote work has become the safest first job for a teenager or young adult — no
              commute, flexible hours, and often higher pay than local entry-level roles. The gap
              between students who land these jobs and those who don't usually isn't talent.
              It's presentation.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              The "secret weapon" is helping your student build their digital footprint now: a
              GitHub with a few projects, a polished LinkedIn with a real profile photo, and a
              resume that reads like a professional's rather than a high schooler's.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              ApplyWell was built specifically for students who don't know where to start. The
              guided format turns vague entries like "worked on a school project" into
              professionally framed bullets with measurable outcomes — the exact language remote
              recruiters are scanning for.
            </p>
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
            Ready to build yours?
          </p>
          <h2 className="font-serif text-2xl text-zinc-100 leading-tight tracking-tight mb-2">
            Turn your experience into a remote-ready resume.
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-5">
            ApplyWell guides you through every section — experience, skills, and portfolio links —
            and formats everything for ATS screening. One-time payment, instant access.
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
              href="/first-job-resume-for-teens"
              badge="Parent's Guide"
              title="A parent's guide to your teen's first resume"
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
