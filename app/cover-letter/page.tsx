"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { Field, PageHeader } from "@/components/ui";

function buildCoverLetter(
  name: string,
  jobTitle: string,
  company: string,
  skills: string,
): string {
  const skillsList = skills
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  const skillsInline =
    skillsList.length === 0
      ? "relevant skills"
      : skillsList.length === 1
      ? skillsList[0]
      : `${skillsList.slice(0, -1).join(", ")} and ${skillsList[skillsList.length - 1]}`;

  const closing = name.trim() ? name.trim() : "Your Name";

  return `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle || "[Job Title]"} position at ${company || "[Company]"}. With my background in ${skillsInline}, I am confident in my ability to make a meaningful contribution to your team.

Throughout my experience, I have developed strong skills in ${skillsInline}, which I believe align well with the requirements of this role. I am particularly drawn to ${company || "[Company]"} because of its commitment to excellence and the opportunity to work alongside talented, driven professionals.

I am excited about the prospect of bringing my dedication and expertise to the ${jobTitle || "[Job Title]"} role. I am a fast learner who thrives in collaborative environments, and I am confident I can add real value from day one.

Thank you for taking the time to review my application. I would welcome the opportunity to discuss how my background and skills are a strong fit for ${company || "[Company]"}. I look forward to hearing from you.

Sincerely,
${closing}`;
}

export default function CoverLetterPage() {
  const { state } = useApp();
  const profileName = state.profile.name ?? "";

  const [jobTitle, setJobTitle] = useState("");
  const [company,  setCompany]  = useState("");
  const [skills,   setSkills]   = useState("");
  const [generated, setGenerated] = useState<string | null>(null);
  const [copied,    setCopied]    = useState(false);

  const canGenerate = jobTitle.trim() && company.trim();

  const handleGenerate = () => {
    setGenerated(buildCoverLetter(profileName, jobTitle, company, skills));
    setCopied(false);
  };

  const handleCopy = () => {
    if (!generated) return;
    navigator.clipboard.writeText(generated).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setGenerated(null);
    setCopied(false);
  };

  return (
    <div className="py-8 animate-fade-in">
      <PageHeader
        title="Cover Letter Builder"
        subtitle="Fill in the details below and get a ready-to-edit cover letter in seconds."
      />

      {/* ── Inputs ──────────────────────────────────────────────────────────── */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-4 shadow-card flex flex-col gap-0">
        <Field label="Job Title" hint="e.g. Software Engineer Intern, Marketing Manager">
          <input
            type="text"
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
            placeholder="Software Engineer Intern"
          />
        </Field>

        <Field label="Company" hint="The company you're applying to">
          <input
            type="text"
            value={company}
            onChange={e => setCompany(e.target.value)}
            placeholder="Acme Corp"
          />
        </Field>

        <Field
          label="Key Skills"
          hint="Comma-separated — e.g. Python, data analysis, project management"
        >
          <input
            type="text"
            value={skills}
            onChange={e => setSkills(e.target.value)}
            placeholder="Python, data analysis, communication"
          />
        </Field>

        {profileName && (
          <p className="text-xs text-zinc-500 mb-1 -mt-1">
            Signing as <span className="text-zinc-300 font-medium">{profileName}</span> (from your profile)
          </p>
        )}

        <button
          onClick={handleGenerate}
          disabled={!canGenerate}
          className="mt-3 w-full bg-emerald-400 hover:bg-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-900 font-semibold rounded-xl py-3 text-sm transition-colors hover:-translate-y-0.5 transition-transform"
          style={{ boxShadow: canGenerate ? "0 2px 10px rgb(52 211 153 / 0.25)" : undefined }}
        >
          Generate Cover Letter
        </button>
      </div>

      {/* ── Output ──────────────────────────────────────────────────────────── */}
      {generated && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-card animate-fade-in">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Generated Letter
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                  copied
                    ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-400"
                    : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                }`}
              >
                {copied ? "✓ Copied!" : "Copy"}
              </button>
              <button
                onClick={handleClear}
                className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Letter text */}
          <div className="px-5 py-4">
            <pre className="whitespace-pre-wrap font-sans text-sm text-zinc-300 leading-relaxed">
              {generated}
            </pre>
          </div>

          {/* Edit reminder */}
          <div className="px-5 pb-4">
            <p className="text-xs text-zinc-600 leading-relaxed">
              ✏️ This is a starting draft — personalize it before sending. Add specific achievements, reference the job description, and adjust the tone to match the company.
            </p>
          </div>
        </div>
      )}

      {/* ── Tips ────────────────────────────────────────────────────────────── */}
      {!generated && (
        <div className="border border-zinc-800 rounded-2xl p-4">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Tips for a strong cover letter</p>
          <div className="flex flex-col gap-2">
            {[
              "Research the company and mention something specific about them.",
              "Lead with your most relevant skill or achievement.",
              "Keep it to one page — 3 short paragraphs is ideal.",
              "Match keywords from the job description.",
              "Proofread carefully before sending.",
            ].map(tip => (
              <div key={tip} className="flex items-start gap-2 text-xs text-zinc-500">
                <span className="text-emerald-500 flex-shrink-0 mt-px">›</span>
                {tip}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
