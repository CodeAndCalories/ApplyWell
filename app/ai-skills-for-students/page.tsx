import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui";

/* ── Metadata ────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "AI Skills for Your Resume: What Students Should List in 2026",
  description:
    "Learn which AI tools are worth listing on a student resume in 2026, how to frame them so employers take them seriously, and what to avoid.",
  alternates: { canonical: "https://applywell.io/ai-skills-for-students" },
  openGraph: {
    title: "AI Skills for Your Resume: What Students Should List in 2026 | ApplyWell",
    description:
      "Learn which AI tools are worth listing on a student resume in 2026, how to frame them so employers take them seriously, and what to avoid.",
    url: "https://applywell.io/ai-skills-for-students",
    type: "article",
  },
};

/* ── FAQ data ────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "Should I list ChatGPT or Claude on my resume?",
    a: "Yes — but only if you can describe how you used it in a real context. 'Used Claude to draft and edit weekly client reports, reducing writing time by 40%' is strong. 'Familiar with ChatGPT' is meaningless. List AI tools the same way you'd list any tool: with a specific use case and, where possible, an outcome.",
  },
  {
    q: "Do employers take AI skills seriously, or does it look like cheating?",
    a: "Most employers in 2026 view AI proficiency as a productivity skill, not an ethical concern. The companies hiring entry-level remote workers often use AI internally every day. What matters is whether you can describe how you use it to produce better work faster — not whether you use it at all.",
  },
  {
    q: "What AI tools are actually worth learning as a student?",
    a: "Prioritize tools that match your target industry. For writing and content roles: ChatGPT, Claude, Grammarly. For design: Midjourney, Adobe Firefly, Canva AI. For code: GitHub Copilot, Cursor. For research and analysis: Perplexity, NotebookLM. Learn one or two deeply rather than listing ten you've barely touched.",
  },
  {
    q: "How do I list AI skills if I've only used them for personal projects?",
    a: "Personal projects count. Frame them the same way you'd frame any independent work: describe the project, the tool you used, and the result. 'Used Midjourney to generate brand assets for a personal e-commerce store; drove 200+ site visits in first month' is a real, credible bullet.",
  },
  {
    q: "Will listing AI skills hurt my chances with some employers?",
    a: "With a small minority, yes. Some employers in regulated industries (law, finance, healthcare) have strict policies around AI-generated work. Research the company before your interview. For most roles — especially remote, tech-adjacent, and startup positions — AI fluency is a genuine advantage in 2026.",
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

/* ── Tool data ───────────────────────────────────────────────────────────── */
const AI_TOOLS = [
  {
    category: "Writing & communication",
    tools: [
      { name: "ChatGPT", use: "Drafting, editing, summarizing long documents" },
      { name: "Claude", use: "Long-form writing, research analysis, client communication" },
      { name: "Grammarly", use: "Proofreading and tone adjustment for professional writing" },
    ],
  },
  {
    category: "Design & visuals",
    tools: [
      { name: "Midjourney", use: "Image generation for marketing, social content, presentations" },
      { name: "Canva AI", use: "Automated design layouts, background removal, AI text-to-image" },
      { name: "Adobe Firefly", use: "Generative fill, image editing, brand-safe visual assets" },
    ],
  },
  {
    category: "Coding & development",
    tools: [
      { name: "GitHub Copilot", use: "AI code completion and pair programming in VS Code" },
      { name: "Cursor", use: "AI-native code editor with context-aware suggestions" },
    ],
  },
  {
    category: "Research & analysis",
    tools: [
      { name: "Perplexity", use: "Cited AI search for research, fact-checking, competitive analysis" },
      { name: "NotebookLM", use: "Summarizing and Q&A over uploaded documents and PDFs" },
    ],
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
export default function AiSkillsForStudentsPage() {
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
            badge="AI Skills Guide · 2026"
            title="AI Skills for Your Resume: What Students Should List in 2026"
            subtitle="How to add AI tools to your resume in a way employers actually take seriously"
          />

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card mb-8">
            <p className="text-zinc-300 text-sm leading-relaxed mb-3">
              <strong className="text-zinc-100">Direct answer:</strong> In 2026, AI tools belong
              on a student resume the same way any software skill does — listed with a specific use
              case, not as a vague buzzword. "Proficient in AI" means nothing. "Used Claude to
              draft and edit weekly client reports, cutting production time by 40%" is a resume
              bullet.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              The students landing competitive remote roles aren't hiding their AI usage — they're
              framing it as a productivity multiplier. This guide covers which tools are worth
              listing, how to write the bullets, and what to avoid so you don't look like you're
              padding your resume with tools you've barely opened.
            </p>
          </div>
        </section>

        {/* ── 2. The rule for listing AI tools ───────────────────────────── */}
        <section className="mb-10" aria-labelledby="the-rule">
          <SectionHeading>The One Rule for Listing AI on Your Resume</SectionHeading>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card">
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              Only list an AI tool if you can answer this question in an interview: <em>"Walk me
              through how you use [tool] in your work."</em>
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Interviewers — especially at tech companies and remote-first startups — will follow
              up on every tool you list. If you've listed GitHub Copilot but never actually used it
              to write code, that gap will surface quickly. A shorter, accurate list is always
              stronger than a longer padded one.
            </p>
            <div className="border-t border-zinc-800 pt-4">
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
                How to frame AI tool experience
              </p>
              <div className="flex flex-col gap-3">
                {[
                  {
                    label: "Name the tool",
                    example: '"Used Claude..."',
                  },
                  {
                    label: "Describe the task it assisted with",
                    example: '"...to research and draft weekly content briefs for 3 client blogs..."',
                  },
                  {
                    label: "Add the outcome",
                    example: '"...reducing brief production time from 3 hours to 45 minutes"',
                  },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-400/15 border border-emerald-400/25 flex items-center justify-center text-emerald-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <span className="text-sm font-semibold text-zinc-200 block mb-0.5">
                        {step.label}
                      </span>
                      <span className="text-xs text-zinc-500 font-mono leading-snug">
                        {step.example}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Tools by category ────────────────────────────────────────── */}
        <section className="mb-10" aria-labelledby="tools-by-category">
          <SectionHeading>AI Tools Worth Listing — by Category</SectionHeading>
          <div className="flex flex-col gap-4">
            {AI_TOOLS.map((cat) => (
              <div
                key={cat.category}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card"
              >
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
                  {cat.category}
                </p>
                <div className="flex flex-col gap-3">
                  {cat.tools.map((tool) => (
                    <div key={tool.name} className="flex items-start gap-3">
                      <span className="text-emerald-400 mt-0.5 flex-shrink-0 text-sm">›</span>
                      <div>
                        <span className="text-sm font-semibold text-zinc-200">{tool.name}</span>
                        <span className="text-sm text-zinc-500"> — {tool.use}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. Before → After bullets ───────────────────────────────────── */}
        <section className="mb-10" aria-labelledby="before-after">
          <SectionHeading>Before → After: AI-Framed Resume Bullets</SectionHeading>
          <p className="text-zinc-500 text-sm mb-4 leading-relaxed">
            Vague AI mentions vs. bullets that actually land interviews.
          </p>

          <div className="flex flex-col gap-4">
            {[
              {
                before: "Used AI to help write content",
                after:
                  "Used Claude to research, outline, and draft 3 weekly blog posts for a client in the SaaS space; editor approval rate improved from 60% to 92% over 8 weeks",
              },
              {
                before: "Familiar with AI tools",
                after:
                  "Integrated GitHub Copilot into daily development workflow; reduced boilerplate code time by ~35% on a 6-week React project; all code reviewed and tested manually before commit",
              },
              {
                before: "Made graphics using AI",
                after:
                  "Generated and edited brand-consistent social assets using Midjourney and Canva AI for a student org's Instagram; follower growth increased 28% over one semester",
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

        {/* ── 5. What to avoid ────────────────────────────────────────────── */}
        <section className="mb-10" aria-labelledby="what-to-avoid">
          <SectionHeading>What to Avoid When Listing AI Skills</SectionHeading>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card">
            <div className="flex flex-col gap-4">
              {[
                {
                  avoid: 'Vague phrases like "familiar with AI" or "AI proficient"',
                  why: "Every applicant writes this. It signals you've heard of AI tools but can't speak to using them.",
                },
                {
                  avoid: "Listing tools you've opened once",
                  why: "Interviewers probe tool claims. If you listed Cursor but never built a project with it, that's a credibility gap.",
                },
                {
                  avoid: "Implying AI did the work for you",
                  why: 'Bullets like "AI wrote my reports" raise red flags. Frame it as AI-assisted — you directed, edited, and owned the output.',
                },
                {
                  avoid: "Putting AI tools at the top of your resume",
                  why: "AI skills belong in a Skills section or woven into experience bullets — not as the headline of your application.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="border-b border-zinc-800 last:border-0 pb-4 last:pb-0"
                >
                  <p className="text-sm font-semibold text-red-400 mb-1">✕ {item.avoid}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.why}</p>
                </div>
              ))}
            </div>
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
            Turn your AI skills into a resume that gets noticed.
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-5">
            ApplyWell guides you through every section — experience, skills, tools, and projects —
            and formats everything for ATS screening. Add your AI skills where they belong and
            export a clean PDF in minutes.
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
              href="/college-resume-for-remote-jobs"
              badge="College"
              title="How college students land high-paying remote jobs"
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
