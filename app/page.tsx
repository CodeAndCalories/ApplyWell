"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";

const STRIPE_URL = "https://buy.stripe.com/fZubJ00TSesN095cHt7g400";

export default function LandingPage() {
  const { loadDemo } = useApp();
  const router = useRouter();
  const [upgraded, setUpgraded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("upgraded") === "true") {
      setUpgraded(true);
      const t = setTimeout(() => {
        router.replace("/");
        setUpgraded(false);
      }, 4000);
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
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-amber-400 flex items-center justify-center text-zinc-900 font-bold text-base">A</div>
          <span className="font-serif text-lg">ApplyWell</span>
        </div>
        <button onClick={() => router.push("/dashboard")}
          className="text-xs text-zinc-500 hover:text-zinc-300 border border-zinc-800 rounded-lg px-3 py-1.5 transition-colors">
          Open App →
        </button>
      </div>

      {/* Upgrade success banner */}
      {upgraded && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3 mb-2 flex items-center gap-3 animate-fade-in">
          <span className="text-lg flex-shrink-0">🎉</span>
          <div>
            <div className="text-sm font-semibold text-emerald-300">You&apos;re in — welcome to Pro!</div>
            <div className="text-xs text-emerald-500 mt-0.5">Your purchase is confirmed. Open the app to get started.</div>
          </div>
          <button
            onClick={() => handleMode("resume")}
            className="ml-auto text-xs bg-emerald-400 text-zinc-900 font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 hover:bg-emerald-300 transition-colors"
          >
            Open →
          </button>
        </div>
      )}

      {/* Hero */}
      <div className="flex-1 flex flex-col justify-center py-8">
        <div className="mb-2">
          <span className="bg-emerald-400/15 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-400/20">
            Free · No account required · Works in your browser
          </span>
        </div>

        <h1 className="font-serif text-[clamp(36px,9vw,54px)] leading-[1.05] mt-4 mb-1">
          Build and export a{" "}
          <span className="text-emerald-400 italic">professional resume</span>
          {" "}with confidence.
        </h1>

        <p className="text-sm text-zinc-500 mb-3">
          Designed for real applications in 2026.
        </p>

        <p className="text-zinc-500 text-sm text-center mb-4">
          Free preview. One-time upgrade. No subscription.
        </p>

        <p className="text-zinc-400 text-base leading-relaxed mb-4 max-w-sm">
          Build polished resumes and application materials — verified by you, never fabricated.
        </p>

        {/* Who it's for */}
        <div className="flex flex-col gap-1 mb-8 text-sm text-zinc-400">
          <span>For: • Students applying to college</span>
          <span className="pl-5">• Job seekers applying to internships or full-time roles</span>
          <span className="pl-5">• Parents helping organize activities</span>
        </div>

        {/* Two choices */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Choose your goal</p>
          <div className="grid grid-cols-1 gap-3">

            {/* Resume card — primary */}
            <button onClick={() => handleMode("resume")}
              className="group bg-zinc-900 hover:bg-zinc-800 border border-emerald-400/30 hover:border-emerald-400/60 rounded-2xl p-5 text-left transition-all relative">
              <span className="absolute top-3.5 right-3.5 text-xs bg-emerald-400/15 text-emerald-400 border border-emerald-400/25 px-2 py-0.5 rounded-full font-semibold">
                Most popular
              </span>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-2xl flex-shrink-0">📄</div>
                <div className="flex-1 pr-20">
                  <div className="font-semibold text-base mb-1 group-hover:text-emerald-400 transition-colors">Build My Resume</div>
                  <div className="text-zinc-500 text-sm leading-relaxed">ATS-friendly one-page resume. Perfect for scholarships, jobs, programs, and college applications.</div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {["PDF Export","2 Templates","Auto Bullets"].map(t => (
                      <span key={t} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="text-zinc-600 group-hover:text-emerald-400 transition-colors text-lg absolute bottom-5 right-4">→</div>
              </div>
            </button>

            {/* College Application card */}
            <button onClick={() => router.push("/college")}
              className="group bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-400/50 rounded-2xl p-5 text-left transition-all relative">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-2xl flex-shrink-0">🎓</div>
                <div className="flex-1 pr-20">
                  <div className="font-semibold text-base mb-1 group-hover:text-amber-400 transition-colors">College Application</div>
                  <div className="text-zinc-500 text-sm leading-relaxed">Common App activities, character limits, essay tracking, and a review checklist.</div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {["Activities","Essays","Review"].map(t => (
                      <span key={t} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="text-zinc-600 group-hover:text-amber-400 transition-colors text-lg absolute bottom-5 right-4">→</div>
              </div>
            </button>
          </div>
        </div>

        {/* ── Pricing card ── */}
        <div className="bg-zinc-900 border border-emerald-500/40 rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-amber-400/15 text-amber-400 border border-amber-400/20 px-2.5 py-0.5 rounded-full font-semibold">
              Early Access
            </span>
          </div>

          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="font-semibold text-base">Resume Builder</div>
              <div className="text-zinc-500 text-xs mt-0.5">One-time purchase · no subscription</div>
            </div>
            <div className="text-right">
              <div className="font-serif text-2xl text-zinc-100">$39</div>
              <div className="text-zinc-500 text-xs">one-time</div>
            </div>
          </div>

          <ul className="flex flex-col gap-2 mb-4">
            {[
              "ATS-friendly resume builder",
              "Resume score + improvement suggestions",
              "PDF + DOCX export",
              "Backup + import",
              "College Application tracker included (activities, essays, review checklist)",
              "Future AI bullet optimizer included",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="text-emerald-400 flex-shrink-0 mt-px">✓</span>
                {item}
              </li>
            ))}
          </ul>

          {/* Value stack */}
          <div className="flex flex-col gap-1.5 mb-5 pt-3 border-t border-zinc-800">
            {[
              "Clean ATS-optimized formatting",
              "Professional PDF + Word export",
              "One-time payment — lifetime access",
            ].map((v) => (
              <div key={v} className="flex items-center gap-2 text-sm text-zinc-300">
                <span className="text-emerald-400 flex-shrink-0">✓</span>
                {v}
              </div>
            ))}
          </div>

          {/* Security line */}
          <p className="text-xs text-zinc-600 text-center mb-3">
            🔒 Runs locally. Your data stays in your browser.
          </p>

          {/* CTA → Stripe */}
          <a
            href={STRIPE_URL}
            className="block w-full bg-emerald-400 hover:bg-emerald-300 text-zinc-900 font-semibold rounded-xl py-3 text-sm transition-colors text-center"
          >
            Get Resume Builder — $39
          </a>
          <p className="text-center text-xs text-zinc-600 mt-2">
            Submit with confidence in minutes.
          </p>
        </div>

        {/* Visual proof section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-4 text-center">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">See the final result</p>
          <div className="bg-white rounded-lg mx-auto w-full max-w-xs aspect-[8.5/11] flex flex-col items-start justify-start p-4 shadow-lg overflow-hidden">
            <div className="w-full border-b border-zinc-300 pb-2 mb-3 text-center">
              <div className="h-3 bg-zinc-800 rounded w-32 mx-auto mb-1.5" />
              <div className="h-2 bg-zinc-300 rounded w-24 mx-auto mb-1" />
              <div className="h-2 bg-zinc-300 rounded w-28 mx-auto" />
            </div>
            {[
              { heading: "EDUCATION", lines: [3, 2] },
              { heading: "ACTIVITIES", lines: [3, 2, 3] },
              { heading: "WORK EXPERIENCE", lines: [2, 3] },
            ].map((section) => (
              <div key={section.heading} className="w-full mb-2.5">
                <div className="h-1.5 bg-zinc-700 rounded w-20 mb-1" />
                <div className="h-px bg-zinc-300 w-full mb-1.5" />
                {section.lines.map((w, i) => (
                  <div key={i} className="h-1.5 bg-zinc-200 rounded mb-1" style={{ width: `${w * 20 + 30}%` }} />
                ))}
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-500 mt-3">
            Exactly what you download after upgrading.
          </p>
        </div>

        {/* Testimonial */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 mb-4">
          <p className="text-sm text-zinc-300 leading-relaxed mb-2">
            &ldquo;Helped my son organize everything in under an hour. He finally felt confident submitting his application.&rdquo;
          </p>
          <p className="text-xs text-zinc-500">— Parent</p>
        </div>

        {/* FAQ accordion */}
        <div className="mb-4 flex flex-col gap-2">
          {([
            {
              q: "Is this a subscription?",
              a: "No. One-time upgrade. No recurring fees.",
            },
            {
              q: "Is my data stored online?",
              a: "No. Your data stays in your browser (localStorage). You can also download a backup JSON at any time.",
            },
            {
              q: "What do I get with the upgrade?",
              a: "Clean, professional PDF and Word exports with no watermark.",
            },
          ] as { q: string; a: string }[]).map((item, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-zinc-300 hover:text-zinc-100 transition-colors"
                aria-expanded={openFaq === i}
              >
                <span>{item.q}</span>
                <span className="text-zinc-600 flex-shrink-0 ml-2 text-xs">
                  {openFaq === i ? "▲" : "▼"}
                </span>
              </button>
              {openFaq === i && (
                <div className="px-4 pb-3 text-sm text-zinc-500 leading-relaxed border-t border-zinc-800 pt-2">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Demo option */}
        <div className="border-t border-zinc-800 pt-4 mt-1">
          <p className="text-xs text-zinc-600 text-center mb-3">Not sure yet? See it in action first</p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => handleMode("resume", true)}
              className="border border-zinc-700 text-zinc-400 rounded-xl py-2.5 text-xs font-medium hover:border-zinc-500 transition-colors">
              👀 Demo Resume
            </button>
            <button onClick={() => router.push("/college")}
              className="border border-zinc-700 text-zinc-400 rounded-xl py-2.5 text-xs font-medium hover:border-zinc-500 transition-colors">
              👀 Demo College App
            </button>
          </div>
        </div>
      </div>

      {/* Trust line */}
      <p className="text-xs text-zinc-500 text-center mb-3">
        Built independently to simplify applications — no subscriptions, no data selling.
      </p>

      <div className="pb-8 text-xs text-zinc-600 text-center leading-relaxed">
        Writing tool only — not admissions advice. No outcome guarantees.<br />
        Data stays in your browser. Nothing is sent to a server.<br />
        <span className="mt-1 block">Built for students and job seekers.</span>
      </div>
    </div>
  );
}
