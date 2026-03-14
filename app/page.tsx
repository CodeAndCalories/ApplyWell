"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";

const STRIPE_URL = "https://buy.stripe.com/6oU7sKgSQ2K52hdcHt7g401";

const FEATURES = [
  "ATS-friendly resume builder",
  "Resume score + improvement suggestions",
  "PDF + DOCX export",
  "Backup + import",
  "College Application tracker (activities, essays, checklist)",
  "Future AI bullet optimizer included",
];

const VALUE_PROPS = [
  "Clean ATS-optimized formatting",
  "Professional PDF + Word export",
  "One-time payment — lifetime access",
];

const FAQS: { q: string; a: string }[] = [
  { q: "Is this a subscription?",      a: "No. One-time upgrade. No recurring fees." },
  { q: "Is my data stored online?",    a: "No. Your data stays in your browser (localStorage). You can download a backup JSON at any time." },
  { q: "What do I get with the upgrade?", a: "Clean, professional PDF and Word exports with no watermark." },
];

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-px">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function LandingPage() {
  const { loadDemo } = useApp();
  const router       = useRouter();
  const [upgraded, setUpgraded] = useState(false);
  const [openFaq,  setOpenFaq]  = useState<number | null>(null);

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

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center py-6">

        {/* Pill badge */}
        <div className="mb-5">
          <span className="inline-flex items-center gap-1.5 bg-emerald-400/10 text-emerald-400 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-emerald-400/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Free · No account required · Works in your browser
          </span>
        </div>

        <h1 className="font-serif text-[clamp(34px,8.5vw,52px)] leading-[1.06] mb-4 tracking-tight">
          Build and export a{" "}
          <em className="text-emerald-400 not-italic">professional resume</em>
          {" "}with confidence.
        </h1>

        <p className="text-zinc-400 text-base leading-relaxed mb-5 max-w-sm">
          Build polished resumes and application materials — verified by you, never fabricated.
        </p>

        {/* Audience list */}
        <div className="flex flex-col gap-1.5 mb-8">
          {[
            "Students applying to college",
            "Job seekers applying to internships or full-time roles",
            "Parents helping organize activities",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-zinc-400">
              <span className="text-emerald-400"><CheckIcon /></span>
              {item}
            </div>
          ))}
        </div>

        {/* ── Mode cards ──────────────────────────────────────────────────── */}
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">
          Choose your goal
        </p>
        <div className="flex flex-col gap-3 mb-6">

          {/* Resume card */}
          <button
            onClick={() => handleMode("resume")}
            className="group bg-zinc-900 hover:bg-zinc-800/80 border border-emerald-400/25 hover:border-emerald-400/50 rounded-2xl p-5 text-left transition-all duration-200 shadow-card hover:shadow-card-md relative overflow-hidden"
          >
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/4 to-transparent pointer-events-none rounded-2xl" />
            <span className="absolute top-3.5 right-3.5 text-[10px] bg-emerald-400/15 text-emerald-400 border border-emerald-400/25 px-2 py-0.5 rounded-full font-bold tracking-wide uppercase">
              Most popular
            </span>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:bg-emerald-400/15 transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <line x1="9" y1="7" x2="15" y2="7" /><line x1="9" y1="11" x2="15" y2="11" /><line x1="9" y1="15" x2="12" y2="15" />
                </svg>
              </div>
              <div className="flex-1 pr-16">
                <div className="font-semibold text-base mb-1 text-zinc-100 group-hover:text-emerald-400 transition-colors">
                  Build My Resume
                </div>
                <div className="text-zinc-500 text-sm leading-relaxed">
                  ATS-friendly one-page resume. Perfect for scholarships, jobs, programs, and college applications.
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {["PDF Export", "5 Templates", "Auto Bullets"].map((t) => (
                    <span key={t} className="text-xs bg-zinc-800 text-zinc-400 border border-zinc-700/60 px-2.5 py-0.5 rounded-lg">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-zinc-600 group-hover:text-emerald-400 transition-colors absolute bottom-5 right-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </button>

          {/* College App card */}
          <button
            onClick={() => router.push("/college")}
            className="group bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-700/80 hover:border-amber-400/40 rounded-2xl p-5 text-left transition-all duration-200 shadow-card hover:shadow-card-md relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/3 to-transparent pointer-events-none rounded-2xl" />
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 flex-shrink-0 group-hover:bg-amber-400/15 transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div className="flex-1 pr-8">
                <div className="font-semibold text-base mb-1 text-zinc-100 group-hover:text-amber-400 transition-colors">
                  College Application
                </div>
                <div className="text-zinc-500 text-sm leading-relaxed">
                  Common App activities, character limits, essay tracking, and a review checklist.
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {["Activities", "Essays", "Review"].map((t) => (
                    <span key={t} className="text-xs bg-zinc-800 text-zinc-400 border border-zinc-700/60 px-2.5 py-0.5 rounded-lg">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-zinc-600 group-hover:text-amber-400 transition-colors absolute bottom-5 right-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* ── Pricing card ────────────────────────────────────────────────── */}
        <div
          className="bg-zinc-900 border border-emerald-500/30 rounded-2xl p-5 mb-4 relative overflow-hidden"
          style={{ boxShadow: "0 4px 24px rgb(0 0 0 / 0.5), 0 0 0 1px rgb(52 211 153 / 0.08)" }}
        >
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />

          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] bg-amber-400/15 text-amber-400 border border-amber-400/20 px-2.5 py-0.5 rounded-full font-bold tracking-widest uppercase">
              Early Access
            </span>
          </div>

          <div className="flex items-end justify-between mb-5">
            <div>
              <div className="font-semibold text-base text-zinc-100">Resume Builder</div>
              <div className="text-zinc-500 text-xs mt-0.5">One-time purchase · no subscription</div>
            </div>
            <div className="text-right">
              <div className="font-serif text-3xl text-zinc-100 leading-none">$9</div>
              <div className="text-zinc-500 text-xs mt-0.5">one-time</div>
            </div>
          </div>

          <ul className="flex flex-col gap-2.5 mb-5">
            {FEATURES.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-400">
                <span className="text-emerald-400 mt-0.5"><CheckIcon /></span>
                {item}
              </li>
            ))}
          </ul>

          <div className="border-t border-zinc-800 pt-4 flex flex-col gap-2 mb-5">
            {VALUE_PROPS.map((v) => (
              <div key={v} className="flex items-center gap-2.5 text-sm text-zinc-300">
                <span className="text-emerald-400"><CheckIcon /></span>
                {v}
              </div>
            ))}
          </div>

          <p className="text-xs text-zinc-600 text-center mb-3">
            🔒 Runs locally. Your data stays in your browser.
          </p>

          <a
            href={STRIPE_URL}
            className="block w-full bg-emerald-400 hover:bg-emerald-300 text-zinc-900 font-semibold rounded-xl py-3.5 text-sm transition-colors text-center"
            style={{ boxShadow: "0 2px 12px rgb(52 211 153 / 0.3)" }}
          >
            Get Resume Builder — $9
          </a>
          <p className="text-center text-xs text-zinc-600 mt-2">
            Submit with confidence in minutes.
          </p>
        </div>

        {/* ── Resume preview mockup ────────────────────────────────────────── */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-4 text-center shadow-card">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">
            See the final result
          </p>
          <div
            className="bg-white rounded-xl mx-auto w-full max-w-xs aspect-[8.5/11] flex flex-col items-start justify-start p-4 overflow-hidden"
            style={{ boxShadow: "0 4px 20px rgb(0 0 0 / 0.5)" }}
          >
            <div className="w-full border-b border-zinc-200 pb-2 mb-3 text-center">
              <div className="h-3 bg-zinc-800 rounded w-32 mx-auto mb-1.5" />
              <div className="h-2 bg-zinc-300 rounded w-24 mx-auto mb-1" />
              <div className="h-2 bg-zinc-300 rounded w-28 mx-auto" />
            </div>
            {[
              { heading: "EDUCATION",       lines: [3, 2] },
              { heading: "ACTIVITIES",      lines: [3, 2, 3] },
              { heading: "WORK EXPERIENCE", lines: [2, 3] },
            ].map((section) => (
              <div key={section.heading} className="w-full mb-3">
                <div className="h-1.5 bg-zinc-700 rounded w-20 mb-1.5" />
                <div className="h-px bg-zinc-200 w-full mb-2" />
                {section.lines.map((w, i) => (
                  <div key={i} className="h-1.5 bg-zinc-200 rounded mb-1.5" style={{ width: `${w * 18 + 30}%` }} />
                ))}
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-500 mt-3">
            Exactly what you download after upgrading.
          </p>
        </div>

        {/* ── Testimonial ─────────────────────────────────────────────────── */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 mb-4 shadow-card">
          <div className="flex gap-1 mb-2.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed mb-2.5 italic">
            &ldquo;Helped my son organize everything in under an hour. He finally felt confident submitting his application.&rdquo;
          </p>
          <p className="text-xs text-zinc-500 font-medium">— Parent</p>
        </div>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <div className="mb-5 flex flex-col gap-2">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-card"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left text-sm font-semibold text-zinc-300 hover:text-zinc-100 transition-colors"
                aria-expanded={openFaq === i}
              >
                <span>{item.q}</span>
                <span className="text-zinc-600 flex-shrink-0 ml-2">
                  {openFaq === i ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
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

        {/* ── Demo option ─────────────────────────────────────────────────── */}
        <div className="border-t border-zinc-800/60 pt-5">
          <p className="text-xs text-zinc-600 text-center mb-3">
            Not sure yet? See it in action first
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleMode("resume", true)}
              className="border border-zinc-700/80 text-zinc-400 rounded-xl py-2.5 text-xs font-semibold hover:border-zinc-600 hover:text-zinc-300 transition-all shadow-card"
            >
              Demo Resume
            </button>
            <button
              onClick={() => router.push("/college")}
              className="border border-zinc-700/80 text-zinc-400 rounded-xl py-2.5 text-xs font-semibold hover:border-zinc-600 hover:text-zinc-300 transition-all shadow-card"
            >
              Demo College App
            </button>
          </div>
        </div>
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
