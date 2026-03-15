import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Application Guides",
  description:
    "Free guides to help students write stronger college applications. Common App activities, essays, resumes, and more.",
};

const GUIDES = [
  {
    href: "/guides/common-app-activities-examples",
    title: "Common App Activities — Examples & Tips",
    description:
      "How to describe your extracurriculars in 150 characters or less, with real before/after examples.",
  },
  {
    href: "/guides/how-to-write-common-app-essay",
    title: "How to Write Your Common App Essay",
    description:
      "A step-by-step breakdown of choosing a topic, structuring your essay, and making admissions officers care.",
  },
  {
    href: "/guides/college-application-resume-example",
    title: "College Application Resume — Example & Format",
    description:
      "What to include, how to order it, and why a one-page resume still wins for college applications.",
  },
  {
    href: "/guides/how-to-describe-leadership-experience",
    title: "How to Describe Leadership Experience",
    description:
      "Turn vague leadership claims into specific, compelling bullet points admissions officers remember.",
  },
  {
    href: "/guides/student-resume-verbs",
    title: "Strong Action Verbs for Student Resumes",
    description:
      "A categorized list of verbs that make your resume bullets sound confident and accomplished.",
  },
];

export default function GuidesPage() {
  return (
    <div className="py-12 animate-fade-in">
      <div className="mb-8">
        <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Back to home
        </Link>
      </div>

      <h1 className="font-serif text-3xl tracking-tight mb-2">Application Guides</h1>
      <p className="text-sm text-zinc-400 mb-10">
        Free guides to help students write stronger college applications.
      </p>

      <div className="flex flex-col gap-4">
        {GUIDES.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="group block bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 hover:border-zinc-600 transition-colors"
          >
            <h2 className="text-sm font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors mb-1">
              {guide.title}
            </h2>
            <p className="text-xs text-zinc-500 leading-relaxed">{guide.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 pt-6 border-t border-zinc-800/60 flex flex-wrap gap-x-5 gap-y-2">
        {[
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
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
