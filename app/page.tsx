"use client";

import Link from "next/link";
import { useApp } from "@/lib/context";

export default function LandingPage() {
  const { loadDemo } = useApp();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col justify-center px-6 py-16 max-w-xl mx-auto w-full">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-amber-400 flex items-center justify-center text-zinc-900 font-bold text-lg">A</div>
          <span className="font-serif text-xl">ApplyWell</span>
        </div>

        <h1 className="font-serif text-[clamp(38px,10vw,58px)] leading-[1.05] mb-5">
          Your story,{" "}
          <span className="text-emerald-400 italic">honestly told.</span>
        </h1>

        <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-sm">
          Build a polished college resume and craft compelling application materials — without making anything up.
        </p>

        <div className="flex flex-col gap-3 mb-10">
          <Link href="/dashboard"
            className="bg-emerald-400 text-zinc-900 font-semibold rounded-xl px-6 py-4 text-center text-base hover:opacity-90 transition-opacity">
            Get Started — It&apos;s Free
          </Link>
          <button
            onClick={async () => { await loadDemo(); window.location.href = "/dashboard"; }}
            className="bg-transparent border border-zinc-700 text-zinc-300 font-medium rounded-xl px-6 py-4 text-base hover:border-zinc-500 transition-colors">
            Explore with Demo Data
          </button>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {["📄 ATS Resume PDF","🎓 Common App Style","📖 Essay Brainstorm","🛡️ Honesty Verified"].map(f => (
            <span key={f} className="bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1.5 text-xs text-zinc-400">{f}</span>
          ))}
        </div>

        {/* Two modes callout */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6">
          <div className="text-sm font-semibold mb-3">Two ways to use ApplyWell</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-800">
              <div className="text-base mb-1">📄</div>
              <div className="text-xs font-semibold mb-1">Resume Mode</div>
              <div className="text-xs text-zinc-500">Traditional ATS-friendly resume for jobs, scholarships, and programs</div>
            </div>
            <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-800">
              <div className="text-base mb-1">🎓</div>
              <div className="text-xs font-semibold mb-1">College App Mode</div>
              <div className="text-xs text-zinc-500">Common App format with activities prioritized and 150-char descriptions</div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-amber-300/80 text-xs leading-relaxed">
          ⚠️ ApplyWell is a writing tool, not admissions advice. No guarantee of outcomes. You are responsible for accuracy. Data stored locally in your browser.
        </div>
      </div>
    </div>
  );
}
