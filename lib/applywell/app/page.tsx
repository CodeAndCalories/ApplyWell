"use client";

import Link from "next/link";
import { useApp } from "@/lib/context";
import { Disclaimer } from "@/components/ui";

export default function LandingPage() {
  const { loadDemo } = useApp();

  const features = [
    { icon: "📄", title: "ATS-Ready Resume PDF", desc: "Two templates. Clean formatting. One click to download." },
    { icon: "📋", title: "Common App Activities", desc: "150-character descriptions optimized for impact — in your own words." },
    { icon: "📖", title: "Personal Statement Brainstorm", desc: "Guided prompts to find your story, not fabricate one." },
    { icon: "🛡️", title: "Verification Step Built In", desc: "You confirm every bullet before anything is exported." },
  ];

  return (
    <div className="min-h-screen py-12 animate-fade-in">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-amber-400 flex items-center justify-center text-zinc-900 font-bold text-lg">
          A
        </div>
        <span className="font-serif text-xl">ApplyWell</span>
      </div>

      {/* Hero */}
      <div className="mb-10">
        <h1 className="font-serif text-[clamp(36px,10vw,56px)] leading-[1.05] mb-5">
          Your story,{" "}
          <span className="text-emerald-400 italic">honestly told.</span>
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-sm">
          Build a polished college resume and craft compelling application
          materials — without making anything up. Every word is yours, verified
          by you.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="bg-emerald-400 text-zinc-900 font-semibold rounded-xl px-6 py-3.5 text-center text-base hover:opacity-90 transition-opacity"
          >
            Get Started — It&apos;s Free
          </Link>
          <button
            onClick={async () => { await loadDemo(); window.location.href = "/dashboard"; }}
            className="bg-transparent border border-zinc-700 text-zinc-300 font-medium rounded-xl px-6 py-3.5 text-base hover:border-zinc-500 transition-colors"
          >
            Load Demo Data to Explore
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-col gap-3 mb-8">
        {features.map((f) => (
          <div key={f.title} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex gap-4 items-start">
            <span className="text-2xl flex-shrink-0">{f.icon}</span>
            <div>
              <div className="font-semibold text-sm mb-1">{f.title}</div>
              <div className="text-zinc-500 text-xs leading-relaxed">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <Disclaimer>
        <strong>Important Disclaimers:</strong> ApplyWell is a writing
        assistance tool, not admissions advice. We make no guarantees about
        college outcomes. You are responsible for the accuracy of all content.
        This is not legal or medical advice. All data is stored locally in your
        browser — we do not collect or store your personal information.
      </Disclaimer>
    </div>
  );
}
