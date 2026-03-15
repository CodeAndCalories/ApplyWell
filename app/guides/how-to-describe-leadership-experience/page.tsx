import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Describe Leadership Experience",
  description:
    "Turn vague leadership claims into specific, compelling resume bullets. Before/after examples for student leaders.",
};

const EXAMPLES = [
  {
    role: "Club President",
    weak: "President of the Environmental Club. Organized meetings and led initiatives to help the environment.",
    strong: "Grew Environmental Club from 8 to 34 members; launched school composting program adopted by 3 cafeteria stations; lobbied administration to install 4 water refill stations.",
  },
  {
    role: "Team Captain",
    weak: "Captain of the varsity basketball team. Responsible for leading the team during practice and games.",
    strong: "Varsity basketball captain (12 players); instituted pre-game film sessions that cut opponents' scoring average by 11 pts; mentored 2 sophomore players through varsity transition.",
  },
  {
    role: "Student Government",
    weak: "Student Council treasurer. Managed the budget and helped plan events.",
    strong: "Managed $14,000 student activities budget; reallocated $3,200 to underfunded arts programs after conducting a student survey; coordinated 5 school-wide events (450+ attendees each).",
  },
  {
    role: "Project Lead",
    weak: "Led a group project for a science fair. Our team won second place.",
    strong: "Led 4-person team in regional science fair; designed experiment methodology, delegated tasks, and presented findings to panel of 8 judges; placed 2nd out of 47 teams.",
  },
];

export default function LeadershipExperiencePage() {
  return (
    <div className="py-12 animate-fade-in">
      <div className="mb-8">
        <Link href="/guides" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Back to guides
        </Link>
      </div>

      <h1 className="font-serif text-3xl tracking-tight mb-2">
        How to Describe Leadership Experience
      </h1>
      <p className="text-xs text-zinc-500 mb-10">Last updated: March 2026</p>

      <div className="flex flex-col gap-8">
        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">Why Most Leadership Descriptions Fall Flat</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Saying you were president, captain, or chair tells an admissions officer your title — not what you actually did. Every other applicant with the same title will write something similar. The goal is to show the specific decisions you made, the people you impacted, and the outcomes you produced. That's what makes a leadership entry memorable.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">The Leadership Description Formula</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
            <p className="text-sm font-semibold text-emerald-400 mb-2">Title + What You Changed + Who Was Affected + Measurable Outcome</p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Not every entry will have all four elements, but the more you can include, the stronger it gets. Always try to add at least one number.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-4">Before & After Examples</h2>
          <div className="flex flex-col gap-4">
            {EXAMPLES.map((ex) => (
              <div key={ex.role} className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
                <p className="text-xs font-semibold text-zinc-300 mb-3">{ex.role}</p>
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
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">Questions to Ask Yourself</h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-3">
            When drafting a leadership bullet, answer these questions and use the answers as raw material:
          </p>
          <ul className="flex flex-col gap-2">
            {[
              "What was the group or project like when I started vs. when I left?",
              "What specific decision did I make that others didn't make before me?",
              "How many people did I directly manage, coach, or work alongside?",
              "What was the measurable result — growth, placement, dollars raised, attendees?",
              "What did I have to push for that wasn't easy or automatic?",
            ].map((q) => (
              <li key={q} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="text-emerald-500 flex-shrink-0 mt-0.5">›</span>
                {q}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">What If You Were Not an Official Leader?</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Leadership doesn't require a title. If you organized a study group, started a tradition on your team, trained a new employee, or took responsibility for a project no one asked you to run — that counts. Describe what you initiated and what happened as a result. The behavior is more important than the title.
          </p>
        </section>

        <section className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-5">
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">Build Your Activities List in ApplyWell</h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            ApplyWell's Common App activities tracker helps you draft and refine each entry with a character counter — so you get every word right before you paste it into your application.
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
            { href: "/guides/common-app-activities-examples",     label: "Common App Activities — Examples & Tips" },
            { href: "/guides/student-resume-verbs",               label: "Strong Action Verbs for Student Resumes" },
            { href: "/guides/college-application-resume-example", label: "College Application Resume Example" },
            { href: "/guides/how-to-write-common-app-essay",      label: "How to Write Your Common App Essay" },
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
