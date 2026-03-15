import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Common App Activities — Examples & Tips",
  description:
    "How to describe your extracurriculars in 150 characters. Real before/after examples for Common App activities.",
};

const EXAMPLES = [
  {
    label: "Debate Team",
    weak: "Member of debate team. Competed in tournaments.",
    strong: "Competed in 12 NSDA tournaments; reached state quarterfinals twice; coached 3 new members on case construction.",
  },
  {
    label: "Part-Time Job",
    weak: "Worked at a coffee shop to help family.",
    strong: "Barista 20 hrs/week; trained 4 new hires; managed weekend open/close independently for 18 months.",
  },
  {
    label: "Volunteering",
    weak: "Volunteered at a food bank on weekends.",
    strong: "Sorted and distributed 800+ lbs of food per month at local food bank; recruited 6 classmates as regular volunteers.",
  },
  {
    label: "Independent Project",
    weak: "Built an app for fun.",
    strong: "Self-taught Python to build a tutoring scheduler app; 40+ students at school use it weekly to book peer sessions.",
  },
  {
    label: "Sports",
    weak: "Played varsity soccer for three years.",
    strong: "Varsity soccer captain (yr 3); led team to regional finals; organized weekly film sessions to improve defensive positioning.",
  },
];

export default function CommonAppActivitiesPage() {
  return (
    <div className="py-12 animate-fade-in">
      <div className="mb-8">
        <Link href="/guides" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Back to guides
        </Link>
      </div>

      <h1 className="font-serif text-3xl tracking-tight mb-2">
        Common App Activities — Examples & Tips
      </h1>
      <p className="text-xs text-zinc-500 mb-10">Last updated: March 2026</p>

      <div className="flex flex-col gap-8">
        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">Why the Activities Section Matters</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            The Common App gives you 150 characters to describe each activity — about two short sentences. Admissions officers read hundreds of these. The difference between a forgettable entry and a memorable one is specificity: numbers, outcomes, and roles that show what you actually did, not just that you showed up.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">The Formula</h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-3">
            Strong activity descriptions follow a simple pattern:
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
            <p className="text-sm font-semibold text-emerald-400 mb-1">Role + Action + Result/Scale</p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Lead with what you did (not who you are), include a number if possible, and end with why it mattered or how big it was.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-4">Before & After Examples</h2>
          <div className="flex flex-col gap-4">
            {EXAMPLES.map((ex) => (
              <div key={ex.label} className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
                <p className="text-xs font-semibold text-zinc-300 mb-3">{ex.label}</p>
                <div className="flex flex-col gap-2">
                  <div>
                    <span className="text-xs font-semibold text-red-400 uppercase tracking-wide">Before</span>
                    <p className="text-sm text-zinc-400 mt-1 leading-relaxed">{ex.weak}</p>
                  </div>
                  <div className="border-t border-zinc-800 pt-2">
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">After</span>
                    <p className="text-sm text-zinc-300 mt-1 leading-relaxed">{ex.strong}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">Quick Tips</h2>
          <ul className="flex flex-col gap-2">
            {[
              "Start with an action verb — avoid 'I was' or 'Member of'",
              "Use numbers whenever possible: hours per week, people served, events organized",
              "Mention your role specifically: captain, founder, lead organizer, head tutor",
              "Skip filler words: 'various', 'many', 'a lot of'",
              "You can abbreviate to fit 150 characters: 'yrs' for years, 'hrs' for hours",
              "List your most meaningful activity first — that slot carries the most weight",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="text-emerald-500 flex-shrink-0 mt-0.5">›</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-5">
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">Track Your Activities in ApplyWell</h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            ApplyWell includes a Common App activities tracker where you can draft, edit, and count characters for each entry — all in one place.
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
            { href: "/guides/how-to-describe-leadership-experience", label: "How to Describe Leadership Experience" },
            { href: "/guides/college-application-resume-example",    label: "College Application Resume Example" },
            { href: "/guides/student-resume-verbs",                  label: "Strong Action Verbs for Student Resumes" },
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
