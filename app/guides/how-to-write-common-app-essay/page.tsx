import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Write Your Common App Essay",
  description:
    "A step-by-step guide to writing a Common App personal statement that stands out — topic selection, structure, and opening hooks.",
};

const STEPS = [
  {
    number: "01",
    title: "Pick a topic that is actually about you",
    body: "The Common App prompts are just entry points. What matters is the story underneath. Avoid topics that are primarily about someone else (a parent, a coach) or a big event where you were a passive observer. The best essays are about a specific moment, habit, or obsession that reveals how you think.",
  },
  {
    number: "02",
    title: "Start in the middle of the action",
    body: "Skip the preamble. Don't start with 'Ever since I was young…' or a dictionary definition. Open with a scene — a specific moment in time, told in present tense if possible. Drop the reader into something already happening. You can provide context in the second paragraph.",
  },
  {
    number: "03",
    title: "Show, don't summarize",
    body: "Weak essays tell admissions officers what to conclude. Strong essays show the moment and let readers draw their own conclusions. Instead of 'I learned the importance of teamwork,' describe the 3am rehearsal, the argument that almost ended the performance, the specific thing you said that changed the dynamic.",
  },
  {
    number: "04",
    title: "Stay under 650 words — and aim for 600",
    body: "The limit is 650 words. Coming in around 600 shows discipline. Every sentence should earn its place. If a paragraph isn't moving the story forward or revealing something new about you, cut it.",
  },
  {
    number: "05",
    title: "End with what changed, not a summary",
    body: "The conclusion should land on insight, not recap. Don't restate what you wrote. Close with a sentence or two that shows where this experience left you — what you're carrying forward, what question it opened, what you now understand differently.",
  },
];

export default function CommonAppEssayPage() {
  return (
    <div className="py-12 animate-fade-in">
      <div className="mb-8">
        <Link href="/guides" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Back to guides
        </Link>
      </div>

      <h1 className="font-serif text-3xl tracking-tight mb-2">
        How to Write Your Common App Essay
      </h1>
      <p className="text-xs text-zinc-500 mb-10">Last updated: March 2026</p>

      <div className="flex flex-col gap-8">
        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">What Admissions Officers Are Looking For</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            The personal statement is the one place in a college application where you control the narrative. Admissions officers read thousands of essays. They are not looking for a summary of your resume — they want to understand how you think, what you notice, and whether your voice is distinctive. A good essay doesn't have to be about something dramatic. It has to be honest and specific.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-4">Step-by-Step Guide</h2>
          <div className="flex flex-col gap-4">
            {STEPS.map((step) => (
              <div key={step.number} className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-semibold text-emerald-500 flex-shrink-0 mt-0.5">{step.number}</span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-100 mb-2">{step.title}</p>
                    <p className="text-sm text-zinc-400 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">Example Opening — Before & After</h2>
          <div className="flex flex-col gap-3">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wide">Weak opening</span>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed italic">
                "Ever since I was a child, I have always loved music. Growing up in a household where music was always playing, I developed a deep passion for playing the piano. This experience taught me discipline and perseverance."
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Strong opening</span>
              <p className="text-sm text-zinc-300 mt-2 leading-relaxed italic">
                "At 11pm on a Tuesday, I was still at the piano — not practicing, but arguing with a Chopin étude. My hands knew the notes. The problem was the silence between them. I kept playing the same four bars, waiting for something to click."
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">Common Mistakes to Avoid</h2>
          <ul className="flex flex-col gap-2">
            {[
              "Writing about a mission trip or volunteering experience where you're the hero and others are passive recipients",
              "Summarizing your resume — admissions officers already have it",
              "Using elaborate vocabulary to sound impressive — clear, direct writing wins",
              "Ending with 'and that is why I want to attend [University Name]'",
              "Writing what you think they want to hear instead of what is actually true for you",
              "Submitting without reading it aloud — if you stumble reading it, revise it",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="text-red-500 flex-shrink-0 mt-0.5">›</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-5">
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">Draft and Track Your Essays in ApplyWell</h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            ApplyWell includes an essay tracker where you can draft all your supplemental essays, track word counts, and monitor submission status across every school on your list.
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
            { href: "/guides/common-app-activities-examples",        label: "Common App Activities — Examples & Tips" },
            { href: "/guides/how-to-describe-leadership-experience", label: "How to Describe Leadership Experience" },
            { href: "/guides/college-application-resume-example",    label: "College Application Resume Example" },
            { href: "/guides/student-resume-verbs",                  label: "Strong Action Verbs for Student Resumes" },
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
