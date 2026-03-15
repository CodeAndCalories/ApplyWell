import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Strong Action Verbs for Student Resumes",
  description:
    "A categorized list of action verbs that make student resume bullets sound confident and accomplished. For college and internship applications.",
};

const VERB_CATEGORIES = [
  {
    label: "Leadership",
    color: "text-emerald-400",
    verbs: [
      "Led", "Directed", "Managed", "Coordinated", "Supervised",
      "Chaired", "Founded", "Established", "Launched", "Spearheaded",
      "Championed", "Guided", "Mentored", "Delegated", "Mobilized",
    ],
  },
  {
    label: "Achievement & Impact",
    color: "text-sky-400",
    verbs: [
      "Achieved", "Exceeded", "Earned", "Ranked", "Won",
      "Improved", "Increased", "Reduced", "Raised", "Generated",
      "Delivered", "Completed", "Secured", "Surpassed", "Accelerated",
    ],
  },
  {
    label: "Collaboration & Communication",
    color: "text-violet-400",
    verbs: [
      "Collaborated", "Partnered", "Facilitated", "Presented", "Negotiated",
      "Advised", "Trained", "Coached", "Tutored", "Taught",
      "Represented", "Liaised", "Communicated", "Advocated", "Mediated",
    ],
  },
  {
    label: "Creating & Building",
    color: "text-amber-400",
    verbs: [
      "Designed", "Developed", "Built", "Created", "Produced",
      "Wrote", "Authored", "Drafted", "Composed", "Engineered",
      "Constructed", "Programmed", "Coded", "Illustrated", "Produced",
    ],
  },
  {
    label: "Research & Analysis",
    color: "text-rose-400",
    verbs: [
      "Researched", "Analyzed", "Evaluated", "Assessed", "Investigated",
      "Identified", "Reviewed", "Surveyed", "Tested", "Measured",
      "Synthesized", "Compared", "Examined", "Diagnosed", "Tracked",
    ],
  },
  {
    label: "Organization & Operations",
    color: "text-orange-400",
    verbs: [
      "Organized", "Planned", "Scheduled", "Streamlined", "Implemented",
      "Maintained", "Administered", "Processed", "Managed", "Executed",
      "Oversaw", "Monitored", "Updated", "Compiled", "Prioritized",
    ],
  },
];

export default function StudentResumeVerbsPage() {
  return (
    <div className="py-12 animate-fade-in">
      <div className="mb-8">
        <Link href="/guides" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Back to guides
        </Link>
      </div>

      <h1 className="font-serif text-3xl tracking-tight mb-2">
        Strong Action Verbs for Student Resumes
      </h1>
      <p className="text-xs text-zinc-500 mb-10">Last updated: March 2026</p>

      <div className="flex flex-col gap-8">
        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">Why Action Verbs Matter</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Every resume bullet should start with a strong verb. The verb signals to the reader that something happened — that you acted, not just existed. Weak verbs like "helped," "assisted," or "was responsible for" bury your contribution. Strong, specific verbs tell the reader immediately what role you played.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">Verbs to Avoid</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
            <div className="flex flex-wrap gap-2">
              {["Helped", "Assisted", "Was responsible for", "Worked on", "Did", "Participated in", "Was involved in", "Contributed to"].map((v) => (
                <span key={v} className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-md px-2 py-1">
                  {v}
                </span>
              ))}
            </div>
            <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
              These verbs make it sound like you were nearby while something happened. Replace them with verbs that show you were the one making it happen.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-4">Verbs by Category</h2>
          <div className="flex flex-col gap-4">
            {VERB_CATEGORIES.map((cat) => (
              <div key={cat.label} className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
                <p className={`text-xs font-semibold uppercase tracking-wide mb-3 ${cat.color}`}>
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.verbs.map((v) => (
                    <span
                      key={v}
                      className="text-xs text-zinc-300 bg-zinc-800 border border-zinc-700 rounded-md px-2 py-1"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">How to Use These Verbs</h2>
          <ul className="flex flex-col gap-2">
            {[
              "Lead with the verb — it should be the first word of your bullet point",
              "Use past tense for completed roles, present tense for current ones",
              "Don't use the same verb more than twice across the whole resume",
              "After the verb, add specifics: who, what, how many, what happened",
              "The verb alone is not enough — pair it with a number or outcome whenever possible",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="text-emerald-500 flex-shrink-0 mt-0.5">›</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">Quick Examples</h2>
          <div className="flex flex-col gap-2">
            {[
              { bad: "Was responsible for social media", good: "Grew Instagram following from 200 to 1,400 in 6 months by posting 3x/week" },
              { bad: "Helped tutor students", good: "Tutored 8 students in Algebra II; 6 improved by a full letter grade by semester end" },
              { bad: "Participated in robotics club", good: "Engineered autonomous navigation system for team robot; placed 3rd at regional competition" },
            ].map((ex, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3">
                <p className="text-xs text-red-400 line-through mb-1">{ex.bad}</p>
                <p className="text-sm text-zinc-300">{ex.good}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-5">
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">Build Your Resume in ApplyWell</h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            ApplyWell's resume builder helps you write strong, specific bullet points and export a clean PDF — ready for college applications, scholarships, and internships.
          </p>
          <Link
            href="/"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Start for free
          </Link>
        </section>
      </div>

      <section className="mt-10">
        <h2 className="text-sm font-semibold text-zinc-100 mb-3">Related Guides</h2>
        <div className="flex flex-col gap-2">
          {[
            { href: "/guides/college-application-resume-example",    label: "College Application Resume Example" },
            { href: "/guides/how-to-describe-leadership-experience", label: "How to Describe Leadership Experience" },
            { href: "/guides/common-app-activities-examples",        label: "Common App Activities — Examples & Tips" },
            { href: "/guides/how-to-write-common-app-essay",         label: "How to Write Your Common App Essay" },
          ].map((g) => (
            <Link key={g.href} href={g.href} className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
              → {g.label}
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-10 pt-6 border-t border-zinc-800/60 flex flex-wrap gap-x-5 gap-y-2">
        {[
          { label: "All Guides", href: "/guides" },
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Contact", href: "/contact" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
