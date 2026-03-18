import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Disclaimer } from "@/components/ui";

/* ── Metadata ────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Best No-Subscription Resume Builder for Students (2026)",
  description:
    "Compare the best resume builders with no subscription. See why a one-time payment beats monthly fees for students and first-time job seekers in 2026.",
  alternates: { canonical: "https://applywell.io/no-subscription-resume-builder" },
  openGraph: {
    title: "Best No-Subscription Resume Builder for Students (2026) | ApplyWell",
    description:
      "Compare the best resume builders with no subscription. See why a one-time payment beats monthly fees for students and first-time job seekers in 2026.",
    url: "https://applywell.io/no-subscription-resume-builder",
    type: "article",
  },
};

/* ── FAQ data ────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "Why do most resume builders charge a subscription?",
    a: "Subscriptions maximize revenue per user. A student who pays $3/month for two years generates $72 — versus $9 once. Most builders lock PDF export, ATS formatting, or template access behind recurring fees specifically because a resume is something you need urgently, making you more likely to accept ongoing charges without questioning them.",
  },
  {
    q: "What's the catch with free resume builders?",
    a: "Free builders make money through ads, data, and upsells. Your email address and resume content may be shared with job boards or marketing partners. Many add watermarks to your PDF, cap the number of resumes you can build, or block download entirely until you upgrade. Read the privacy policy before entering any personal information.",
  },
  {
    q: "Can a $9 resume builder actually compete with expensive tools?",
    a: "Yes — because the output format is what matters, not the price tag. ApplyWell generates clean, ATS-optimized resumes in the same standard format that $30/month tools produce. What you're paying for with expensive tools is usually a brand name and a larger template library, neither of which changes how your resume performs in a recruiter's inbox.",
  },
  {
    q: "Does ApplyWell have any recurring charges?",
    a: "No. ApplyWell is a one-time $9 payment per application. There is no monthly fee, no annual plan, no premium tier, and no upsell after purchase. You pay once and get full access to the builder, PDF export, and all features — forever, for that application.",
  },
  {
    q: "What happens to my data after I pay?",
    a: "Nothing — because we never have it. ApplyWell stores your resume data entirely in your browser's local storage. Nothing is sent to a server, saved in a database, or tied to an account. You can close the tab, reopen it next week, and your data will still be there. When you're done, clear your browser data and it's gone.",
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

/* ── Comparison data ─────────────────────────────────────────────────────── */
const COMPARISON = [
  {
    feature: "Price",
    subscription: "$15–$30/month ($180–$360/year)",
    applywell: "$9 one-time — no subscription",
  },
  {
    feature: "PDF export",
    subscription: "Often locked behind paid tier",
    applywell: "Included — no watermark",
  },
  {
    feature: "ATS optimization",
    subscription: "Usually a premium upsell",
    applywell: "Built in by default",
  },
  {
    feature: "Account required",
    subscription: "Always — email + password",
    applywell: "Never — no login needed",
  },
  {
    feature: "Data privacy",
    subscription: "Stored on their servers",
    applywell: "Stays in your browser only",
  },
  {
    feature: "Cancellation risk",
    subscription: "Easy to forget, hard to cancel",
    applywell: "No subscription to cancel",
  },
];

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

function CheckIcon() {
  return (
    <svg
      width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className="flex-shrink-0"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className="flex-shrink-0"
    >
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
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
export default function NoSubscriptionResumeBuilderPage() {
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
            badge="Resume Builder Guide · 2026"
            title="The Best Resume Builder With No Subscription"
            subtitle="Why one-time payment wins for students and first-time job seekers"
          />

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card mb-8">
            <p className="text-zinc-300 text-sm leading-relaxed mb-3">
              <strong className="text-zinc-100">Direct answer:</strong> The best no-subscription
              resume builder in 2026 is one that charges a single flat fee, stores your data
              locally (not on their servers), exports a clean ATS-ready PDF without watermarks,
              and doesn't require an account or email address to get started.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Most popular resume builders charge $15–$30 per month — a pricing model designed
              around the urgency of job searching, not the interests of the applicant. For a
              student or first-time job seeker who needs one polished resume, paying $9 once makes
              more financial sense than $180 over a year they'll forget to cancel.
            </p>
          </div>
        </section>

        {/* ── 2. Why subscriptions are bad for students ───────────────────── */}
        <section className="mb-10" aria-labelledby="why-no-subscription">
          <SectionHeading>Why Subscription Resume Builders Are a Bad Deal for Students</SectionHeading>
          <div className="flex flex-col gap-3">
            {[
              {
                heading: "You only need a resume a few times a year",
                body: "A subscription charges you every month, even when you're not applying anywhere. A student who builds one resume in September and one in March pays 12 months of fees for two documents.",
              },
              {
                heading: "The urgency trap",
                body: "Job applications are time-sensitive. Resume builders know that when you need a PDF tonight, you'll accept a $15/month charge without reading the fine print. The subscription model is built around this pressure — not your best interest.",
              },
              {
                heading: "Cancellation is deliberately difficult",
                body: "Most subscription services require you to log in, navigate to a settings page, and confirm cancellation. Some require a phone call. Millions of people pay for tools they stopped using because canceling felt like too much friction.",
              },
              {
                heading: "Your data is their product",
                body: "Free and cheap subscription tools often monetize user data — sharing your career history, target job titles, and contact info with job boards, recruiters, and marketing partners. Read the privacy policy. It's rarely good news.",
              },
            ].map((item) => (
              <div
                key={item.heading}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-card"
              >
                <h3 className="text-sm font-semibold text-zinc-100 mb-1.5">{item.heading}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. Comparison table ─────────────────────────────────────────── */}
        <section className="mb-10" aria-labelledby="comparison">
          <SectionHeading>Subscription Builders vs. ApplyWell</SectionHeading>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-card">
            {/* Header row */}
            <div className="grid grid-cols-3 border-b border-zinc-800 bg-zinc-800/40">
              <div className="px-3 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                Feature
              </div>
              <div className="px-3 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-l border-zinc-800">
                Subscription builders
              </div>
              <div className="px-3 py-3 text-[10px] font-bold text-emerald-500 uppercase tracking-widest border-l border-zinc-800">
                ApplyWell
              </div>
            </div>
            {COMPARISON.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 ${i < COMPARISON.length - 1 ? "border-b border-zinc-800/60" : ""}`}
              >
                <div className="px-3 py-3 text-xs font-semibold text-zinc-400">{row.feature}</div>
                <div className="px-3 py-3 flex items-start gap-1.5 border-l border-zinc-800/60">
                  <span className="text-red-500/80 mt-0.5 flex-shrink-0"><XIcon /></span>
                  <span className="text-xs text-zinc-500 leading-snug">{row.subscription}</span>
                </div>
                <div className="px-3 py-3 flex items-start gap-1.5 border-l border-zinc-800/60 bg-emerald-400/3">
                  <span className="text-emerald-400 mt-0.5 flex-shrink-0"><CheckIcon /></span>
                  <span className="text-xs text-zinc-300 leading-snug">{row.applywell}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. What you actually get ────────────────────────────────────── */}
        <section className="mb-10" aria-labelledby="what-you-get">
          <SectionHeading>What ApplyWell Includes for $9</SectionHeading>

          <div className="mb-4">
            <Disclaimer>
              ApplyWell runs entirely in your browser. No account. No email address. No server
              ever receives your data. Your resume is stored locally — close the tab and reopen it
              anytime. Pay once and it's yours.
            </Disclaimer>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card">
            <ul className="flex flex-col gap-2.5">
              {[
                "ATS-friendly resume builder with guided prompts for every section",
                "Resume score and improvement suggestions before you export",
                "PDF and DOCX export — clean format, no watermark",
                "College Application tracker: activities list, essays, deadline checklist",
                "Cover letter builder",
                "Backup and import — export your data as JSON, reimport anytime",
                "One-time payment — no subscription, no renewal, no upsell",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-400">
                  <span className="text-emerald-400 mt-0.5"><CheckIcon /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 5. Who it's for ─────────────────────────────────────────────── */}
        <section className="mb-10" aria-labelledby="who-its-for">
          <SectionHeading>Who Benefits Most from a No-Subscription Builder</SectionHeading>
          <div className="flex flex-col gap-3">
            {[
              {
                label: "High school students",
                detail:
                  "Building a first resume for a part-time job, college application, or scholarship. No recurring cost, no account parents need to manage.",
              },
              {
                label: "College students",
                detail:
                  "Applying for internships or entry-level jobs once or twice a year. A $9 one-time payment is a non-decision — a $30/month subscription is not.",
              },
              {
                label: "Parents helping their teens",
                detail:
                  "A tool with no login, no data storage, and no subscription is a tool you can trust with your student's personal details.",
              },
              {
                label: "Career changers and re-entrants",
                detail:
                  "Adults returning to the workforce after a gap don't need a subscription. They need one polished resume, now, without ongoing cost.",
              },
              {
                label: "Anyone who applied and got the job",
                detail:
                  "With a subscription builder, the billing continues whether you're job searching or not. With ApplyWell, you paid once and you're done.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-card"
              >
                <span className="text-sm font-semibold text-emerald-400 block mb-1">
                  {item.label}
                </span>
                <span className="text-sm text-zinc-400 leading-relaxed">{item.detail}</span>
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
            No subscription. Ever.
          </p>
          <h2 className="font-serif text-2xl text-zinc-100 leading-tight tracking-tight mb-2">
            Build a professional resume for $9 — once.
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-5">
            ATS-ready PDF, no watermark, no account, no recurring charge. Pay once, get your
            resume, move on. That's the whole deal.
          </p>
          <CTAButton />
          <p className="text-xs text-zinc-600 text-center mt-3">
            No account required · Data stays in your browser · 30-day guarantee
          </p>
        </section>

        {/* ── Related guides ───────────────────────────────────────────────── */}
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
              href="/ai-skills-for-students"
              badge="AI Skills"
              title="AI skills for your resume: what students should list in 2026"
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
