"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";

export default function LandingPage() {
  const { loadDemo } = useApp();
  const router = useRouter();

  const handleMode = async (mode: "resume" | "college", demo = false) => {
    if (demo) await loadDemo();
    // Store chosen mode
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
          Sign In
        </button>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col justify-center py-8">
        <div className="mb-2">
          <span className="bg-emerald-400/15 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-400/20">
            Free to start · No account required
          </span>
        </div>

        <h1 className="font-serif text-[clamp(36px,9vw,54px)] leading-[1.05] mt-4 mb-4">
          Your story,{" "}
          <span className="text-emerald-400 italic">honestly told.</span>
        </h1>

        <p className="text-zinc-400 text-base leading-relaxed mb-10 max-w-sm">
          Build polished college application materials — verified by you, never fabricated.
        </p>

        {/* THE TWO CLEAR CHOICES */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Choose your goal</p>
          <div className="grid grid-cols-1 gap-3">

            {/* Resume */}
            <button onClick={() => handleMode("resume")}
              className="group bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-emerald-400/50 rounded-2xl p-5 text-left transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-2xl flex-shrink-0">
                  📄
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-base mb-1 group-hover:text-emerald-400 transition-colors">
                    Build My Resume
                  </div>
                  <div className="text-zinc-500 text-sm leading-relaxed">
                    ATS-friendly one-page resume. Perfect for scholarships, jobs, programs, and college applications.
                  </div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {["PDF Export","2 Templates","Auto Bullets"].map(t => (
                      <span key={t} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="text-zinc-600 group-hover:text-emerald-400 transition-colors text-lg">→</div>
              </div>
            </button>

            {/* College App */}
            <button onClick={() => handleMode("college")}
              className="group bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-400/50 rounded-2xl p-5 text-left transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-2xl flex-shrink-0">
                  🎓
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-base mb-1 group-hover:text-amber-400 transition-colors">
                    College Application
                  </div>
                  <div className="text-zinc-500 text-sm leading-relaxed">
                    Common App activities, 150-char descriptions, and personal statement brainstorming.
                  </div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {["Activities List","Essay Help","150 Char Optimizer"].map(t => (
                      <span key={t} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="text-zinc-600 group-hover:text-amber-400 transition-colors text-lg">→</div>
              </div>
            </button>
          </div>
        </div>

        {/* Demo option */}
        <div className="border-t border-zinc-800 pt-4 mt-1">
          <p className="text-xs text-zinc-600 text-center mb-3">Not sure yet? See it in action first</p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => handleMode("resume", true)}
              className="border border-zinc-700 text-zinc-400 rounded-xl py-2.5 text-xs font-medium hover:border-zinc-500 transition-colors">
              👀 Demo Resume
            </button>
            <button onClick={() => handleMode("college", true)}
              className="border border-zinc-700 text-zinc-400 rounded-xl py-2.5 text-xs font-medium hover:border-zinc-500 transition-colors">
              👀 Demo College App
            </button>
          </div>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="pb-8 text-xs text-zinc-600 text-center leading-relaxed">
        Writing tool only — not admissions advice. No outcome guarantees.<br />
        Data stored locally in your browser.
      </div>
    </div>
  );
}
