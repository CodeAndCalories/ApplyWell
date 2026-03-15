"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";

const STRIPE_URL = "https://buy.stripe.com/6oU7sKgSQ2K52hdcHt7g401";

// ── Pricing card features ─────────────────────────────────────────────────────
const PRICING_FEATURES = [
  "ATS-friendly resume builder",
  "Resume score + improvement suggestions",
  "PDF + DOCX export — no watermark",
  "Backup + import your data",
  "College Application tracker (activities, essays, checklist)",
  "Future AI bullet optimizer included",
];

// ── Marketing feature grid ────────────────────────────────────────────────────
const FEATURE_GRID = [
  {
    icon: "✍️",
    headline: "Stop Stressing About Essays",
    body: "Guided prompts help you write compelling personal statements in half the time.",
  },
  {
    icon: "📅",
    headline: "Never Miss a Deadline",
    body: "Track every school, requirement, and due date in one clean dashboard.",
  },
  {
    icon: "⭐",
    headline: "Look More Prepared Than 90% of Applicants",
    body: "Generate polished resumes and cover letters ready to attach to any application.",
  },
];

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    initial: "E",
    name: "Emma R.",
    role: "High School Senior",
    quote:
      "I got my Common App activities done in one afternoon. The prompts kept me on track and the resume came out looking really professional.",
  },
  {
    initial: "D",
    name: "Daniel M.",
    role: "Parent",
    quote:
      "Helped my son organize everything in under an hour. He finally felt confident submitting his application.",
  },
  {
    initial: "S",
    name: "Sophia K.",
    role: "Accepted to UCLA",
    quote:
      "I was overwhelmed until I found ApplyWell. Everything clicked into place. Worth every penny of the $9.",
  },
];

// ── Comparison rows ───────────────────────────────────────────────────────────
const COMPARISON = [
  { counselor: "$150–$300 per hour",           applywell: "One-time $9, forever"          },
  { counselor: "Availability limited",          applywell: "Available 24/7 in your browser" },
  { counselor: "No guaranteed outcome",         applywell: "30-day money-back guarantee"    },
  { counselor: "Requires scheduling",           applywell: "Instant access after purchase"  },
  { counselor: "Recurring cost per session",   applywell: "All future updates included"    },
];

// ── Trust signals ─────────────────────────────────────────────────────────────
const TRUST = [
  "One-time payment, lifetime access",
  "Secure Stripe checkout",
  "Instant access after purchase",
  "30-day money-back guarantee",
  "Used by 500+ students",
];

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Why is it only $9?",
    a: "We built ApplyWell as an indie product with no VC funding and no marketing budget. That lets us keep prices honest. You get everything for a one-time $9 — no upsells, no subscriptions.",
  },
  {
    q: "Will I get updates?",
    a: "Yes. Your one-time purchase includes all future updates. We're actively improving the product based on user feedback.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes. If ApplyWell doesn't help you, contact us within 30 days for a full refund. No questions asked.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account needed. ApplyWell runs entirely in your browser. Your data is stored locally — we never see it.",
  },
];

// ── Icons ─────────────────────────────────────────────────────────────────────
function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className={`flex-shrink-0 ${className}`}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg
      width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className="flex-shrink-0"
    >
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// ── Primary CTA button (min 48px, full-width) ─────────────────────────────────
function PrimaryButton({
  href, onClick, children,
}: {
  href?: string; onClick?: () => void; children: React.ReactNode;
}) {
  const cls =
    "flex items-center justify-center w-full min-h-[48px] bg-emerald-400 hover:bg-emerald-300 hover:-translate-y-0.5 text-zinc-900 font-bold text-sm rounded-2xl transition-all px-6";
  const style = { boxShadow: "0 4px 16px rgb(52 211 153 / 0.35)" };
  if (href) return <a href={href} className={cls} style={style}>{children}</a>;
  return <button onClick={onClick} className={cls} style={style}>{children}</button>;
}

// ── Section divider ───────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">{children}</p>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const { loadDemo } = useApp();
  const router       = useRouter();
  const [upgraded,  setUpgraded] = useState(false);
  const [openFaq,   setOpenFaq]  = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("upgraded") === "true") {
      setUpgraded(true);
      const t = setTimeout(() => { router.replace("/"); setUpgraded(false); }, 4000);
      return () => clearTimeout(t);
    }
  }, [router]);

  const handleMode = async (mode: "resume" | "college", demo = false) => {
    if (demo) await loadDemo();
    localStorage.setItem("applywell_mode", mode);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col max-w-xl mx-auto px-5">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-amber-400 flex items-center justify-center text-zinc-900 font-bold text-base"
            style={{ boxShadow: "0 2px 10px rgb(52 211 153 / 0.3)" }}
          >
            A
          </div>
          <span className="font-serif text-lg tracking-tight">ApplyWell</span>
        </div>
        <button
          onClick={() => router.push("/dashboard")}
          className="text-xs text-zinc-400 hover:text-zinc-200 border border-zinc-700/80 hover:border-zinc-600 rounded-xl px-3.5 py-1.5 transition-all shadow-card"
        >
          Open App →
        </button>
      </div>

      {/* ── Upgrade success ─────────────────────────────────────────────────── */}
      {upgraded && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl px-4 py-3.5 mb-4 flex items-center gap-3 animate-fade-in shadow-card">
          <span className="text-xl flex-shrink-0">🎉</span>
          <div className="flex-1">
            <div className="text-sm font-semibold text-emerald-300">You&apos;re in — welcome to Pro!</div>
            <div className="text-xs text-emerald-500/80 mt-0.5">Your purchase is confirmed. Open the app to get started.</div>
          </div>
          <button
            onClick={() => handleMode("resume")}
            className="text-xs bg-emerald-400 text-zinc-900 font-semibold px-3 py-1.5 rounded-xl flex-shrink-0 hover:bg-emerald-300 transition-colors"
          >
            Open →
          </button>
        </div>
      )}

      <div className="flex-1 flex flex-col">

        {/* ══════════════════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-8">
          {/* Pill */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-1.5 bg-emerald-400/10 text-emerald-400 text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              $9 one-time — no subscription ever
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-[clamp(32px,8vw,50px)] leading-[1.06] mb-4 tracking-tight">
            Build a College Application{" "}
            <em className="text-emerald-400 not-italic">That Gets You In.</em>
          </h1>

          {/* Subheadline */}
          <p className="text-zinc-400 text-base leading-relaxed mb-7 max-w-sm">
            ApplyWell helps you write stronger essays, track deadlines, and apply with confidence —
            one-time $9, no subscription.
          </p>

          {/* Primary CTA */}
          <PrimaryButton href={STRIPE_URL}>
            Start My Application — $9
          </PrimaryButton>

          {/* Microcopy */}
          <p className="text-xs text-zinc-500 text-center mt-3 leading-relaxed">
            No credit card required to start · One-time payment · Instant access
          </p>

          {/* Hero visual — product mockup */}
          <div
            className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-card-md"
          >
            {/* Mock app header bar */}
            <div className="bg-zinc-800/80 border-b border-zinc-700/60 px-4 py-3 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
              <span className="text-[10px] text-zinc-500 ml-2 font-medium tracking-wide">ApplyWell — Personal Statement Draft</span>
            </div>
            {/* Mock content */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-md">Draft 1</span>
                <span className="text-[10px] text-zinc-600">Personal Statement · 650 words max</span>
              </div>
              {/* Fake essay lines */}
              <div className="space-y-2.5">
                <div className="h-2 bg-zinc-700 rounded w-full" />
                <div className="h-2 bg-zinc-700 rounded w-11/12" />
                <div className="h-2 bg-zinc-700 rounded w-10/12" />
                <div className="h-2 bg-zinc-800 rounded w-0 my-1" /> {/* gap */}
                <div className="h-2 bg-zinc-700 rounded w-full" />
                <div className="h-2 bg-zinc-700 rounded w-9/12" />
                <div className="h-2 bg-zinc-700 rounded w-11/12" />
                <div className="h-2 bg-zinc-700 rounded w-8/12" />
              </div>
              {/* Mock strength bar */}
              <div className="mt-5 pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-1.5">
                  <span>Essay strength</span>
                  <span className="text-emerald-400 font-bold">84/100</span>
                </div>
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" style={{ width: "84%" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            FEATURES
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-6 border-t border-zinc-800/50">
          <SectionLabel>Everything you need</SectionLabel>
          <div className="flex flex-col gap-4">
            {FEATURE_GRID.map((f) => (
              <div
                key={f.headline}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card"
              >
                <div className="text-3xl mb-3 leading-none">{f.icon}</div>
                <div className="font-semibold text-zinc-100 text-base mb-1.5 leading-snug">{f.headline}</div>
                <div className="text-zinc-500 text-sm leading-relaxed">{f.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SOCIAL PROOF
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-6 border-t border-zinc-800/50">
          <SectionLabel>What students &amp; parents say</SectionLabel>
          <div className="flex flex-col gap-3 mb-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 shadow-card"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400/30 to-amber-400/20 border border-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-200 flex-shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-200 leading-none">{t.name}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">{t.role}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                  </div>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>

          {/* Stat bar */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 shadow-card">
            <div className="grid grid-cols-3 divide-x divide-zinc-800 text-center">
              {[
                { value: "500+",  label: "students helped"       },
                { value: "4.9/5", label: "average rating"        },
                { value: "30-day",label: "money-back guarantee"  },
              ].map(({ value, label }) => (
                <div key={label} className="px-2">
                  <div className="font-bold text-zinc-100 text-base leading-none mb-1">{value}</div>
                  <div className="text-[10px] text-zinc-500 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            COMPARISON
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-6 border-t border-zinc-800/50">
          <SectionLabel>Why ApplyWell beats the alternative</SectionLabel>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-card">
            {/* Column headers */}
            <div className="grid grid-cols-2 border-b border-zinc-800">
              <div className="px-4 py-3 border-r border-zinc-800">
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Hiring a counselor
                </div>
                <div className="text-xs text-zinc-600 mt-0.5">$150–$300/hr</div>
              </div>
              <div className="px-4 py-3 bg-emerald-400/5">
                <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                  ApplyWell
                </div>
                <div className="text-xs text-emerald-600 font-semibold mt-0.5">$9 one-time</div>
              </div>
            </div>

            {/* Rows */}
            {COMPARISON.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 ${i < COMPARISON.length - 1 ? "border-b border-zinc-800/60" : ""}`}
              >
                <div className="flex items-center gap-2 px-4 py-3 border-r border-zinc-800/60">
                  <span className="text-red-500/80 flex-shrink-0"><XIcon /></span>
                  <span className="text-xs text-zinc-600 leading-snug">{row.counselor}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-3 bg-emerald-400/3">
                  <span className="text-emerald-400 flex-shrink-0"><CheckIcon /></span>
                  <span className="text-xs text-zinc-300 leading-snug">{row.applywell}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SAMPLE PREVIEW
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-6 border-t border-zinc-800/50">
          <SectionLabel>See what you&apos;ll build</SectionLabel>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-card">
            {/* Mock doc header */}
            <div className="bg-zinc-800/60 border-b border-zinc-700/50 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
                <span className="text-[10px] text-zinc-500 font-medium">Resume — Alex Johnson</span>
              </div>
              <span className="text-[9px] bg-emerald-400/15 text-emerald-400 border border-emerald-400/20 px-2 py-0.5 rounded-full font-bold">ATS-Ready</span>
            </div>

            {/* Fake resume */}
            <div className="bg-white p-5">
              {/* Name block */}
              <div className="text-center border-b border-zinc-300 pb-3 mb-3">
                <div className="h-3.5 bg-zinc-800 rounded w-36 mx-auto mb-1.5" />
                <div className="h-2 bg-zinc-300 rounded w-52 mx-auto mb-1" />
                <div className="h-2 bg-zinc-300 rounded w-44 mx-auto" />
              </div>
              {/* Sections */}
              {[
                { label: "EDUCATION",       rows: [[70, 50], [85, 40]] },
                { label: "ACTIVITIES",      rows: [[75, 90, 60], [80, 70]] },
                { label: "WORK EXPERIENCE", rows: [[65, 85, 55], [90, 45]] },
              ].map((s) => (
                <div key={s.label} className="mb-3">
                  <div className="h-1.5 bg-zinc-700 rounded mb-1" style={{ width: `${s.label.length * 6.5}px` }} />
                  <div className="h-px bg-zinc-300 w-full mb-1.5" />
                  {s.rows.map((row, ri) => (
                    <div key={ri} className="mb-1">
                      {row.map((w, wi) => (
                        <div key={wi} className="h-1.5 bg-zinc-200 rounded mb-1" style={{ width: `${w}%` }} />
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="px-4 py-3 border-t border-zinc-800 text-center">
              <p className="text-xs text-zinc-500">
                Sample output — built with ApplyWell in under 10 minutes
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            TRUST SIGNALS
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-6 border-t border-zinc-800/50">
          <SectionLabel>You&apos;re in good hands</SectionLabel>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card flex flex-col gap-2.5">
            {TRUST.map((t) => (
              <div key={t} className="flex items-center gap-3 text-sm text-zinc-300">
                <span className="w-5 h-5 rounded-full bg-emerald-400/15 border border-emerald-400/25 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <CheckIcon />
                </span>
                {t}
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            PRICING CARD
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-6 border-t border-zinc-800/50">
          <SectionLabel>Simple pricing</SectionLabel>
          <div
            className="bg-zinc-900 border border-emerald-500/30 rounded-2xl p-5 relative overflow-hidden"
            style={{ boxShadow: "0 4px 24px rgb(0 0 0 / 0.5), 0 0 0 1px rgb(52 211 153 / 0.08)" }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />

            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] bg-amber-400/15 text-amber-400 border border-amber-400/20 px-2.5 py-0.5 rounded-full font-bold tracking-widest uppercase">
                Early Access
              </span>
            </div>

            <div className="flex items-end justify-between mb-5">
              <div>
                <div className="font-semibold text-base text-zinc-100">ApplyWell Pro</div>
                <div className="text-zinc-500 text-xs mt-0.5">One-time purchase · no subscription</div>
              </div>
              <div className="text-right">
                <div className="font-serif text-3xl text-zinc-100 leading-none">$9</div>
                <div className="text-zinc-500 text-xs mt-0.5">one-time</div>
              </div>
            </div>

            <ul className="flex flex-col gap-2.5 mb-5">
              {PRICING_FEATURES.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-400">
                  <span className="text-emerald-400 mt-0.5"><CheckIcon /></span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-xs text-zinc-600 text-center mb-4">
              🔒 Runs locally. Your data stays in your browser.
            </p>

            <PrimaryButton href={STRIPE_URL}>
              Get ApplyWell — $9
            </PrimaryButton>

            <p className="text-center text-xs text-zinc-600 mt-2.5">
              30-day money-back guarantee. No questions asked.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-6 border-t border-zinc-800/50">
          <SectionLabel>Frequently asked questions</SectionLabel>
          <div className="flex flex-col gap-2">
            {FAQS.map((item, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-card"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-4 text-left text-sm font-semibold text-zinc-200 hover:text-zinc-100 transition-colors min-h-[48px]"
                  aria-expanded={openFaq === i}
                >
                  <span>{item.q}</span>
                  <span className="text-zinc-600 flex-shrink-0 ml-3">
                    {openFaq === i ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    )}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-zinc-500 leading-relaxed border-t border-zinc-800 pt-3 animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            FINAL CTA
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-8 border-t border-zinc-800/50">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl mb-2 tracking-tight">
              Ready to apply with confidence?
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Join 500+ students who used ApplyWell to put their best foot forward.
            </p>
          </div>
          <PrimaryButton href={STRIPE_URL}>
            Start My Application — $9
          </PrimaryButton>
          <p className="text-xs text-zinc-600 text-center mt-3">
            No credit card required to start · 30-day money-back guarantee
          </p>

          {/* Secondary demo links */}
          <div className="mt-5 pt-4 border-t border-zinc-800/40">
            <p className="text-xs text-zinc-600 text-center mb-3">Not sure yet? Try the app first</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleMode("resume", true)}
                className="border border-zinc-700/80 text-zinc-400 rounded-xl py-3 text-xs font-semibold hover:border-zinc-600 hover:text-zinc-300 transition-all shadow-card min-h-[44px]"
              >
                Demo Resume
              </button>
              <button
                onClick={() => router.push("/college")}
                className="border border-zinc-700/80 text-zinc-400 rounded-xl py-3 text-xs font-semibold hover:border-zinc-600 hover:text-zinc-300 transition-all shadow-card min-h-[44px]"
              >
                Demo College App
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <div className="py-6 border-t border-zinc-800/40 text-center">
        <p className="text-xs text-zinc-600 mb-2">
          Built independently to simplify applications — no subscriptions, no data selling.
        </p>
        <p className="text-xs text-zinc-700 leading-relaxed">
          Writing tool only — not admissions advice. No outcome guarantees.<br />
          Data stays in your browser. Nothing is sent to a server.
        </p>
      </div>
    </div>
  );
}
