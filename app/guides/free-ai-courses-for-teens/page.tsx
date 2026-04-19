import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free AI Courses for Teens (2026) — Add These to Your Resume",
  description:
    "The best free AI courses for high school students in 2026. Learn real skills, then use ApplyWell to add them to your resume with professional wording.",
  alternates: { canonical: "https://applywell.io/guides/free-ai-courses-for-teens" },
  openGraph: {
    title: "Free AI Courses for Teens (2026) | ApplyWell",
    description:
      "Best free AI courses for high school students. Learn the skills, then add them to your resume the right way.",
  },
};

const STRIPE_URL = "https://buy.stripe.com/6oU7sKgSQ2K52hdcHt7g401";

const COURSES = [
  {
    name: "Google AI Essentials",
    url: "https://grow.google/ai-essentials",
    provider: "Google",
    time: "~10 hrs",
    learns: "Fundamentals of AI and how to use AI tools in the workplace.",
  },
  {
    name: "Microsoft AI Skills",
    url: "https://www.microsoft.com/en-us/ai",
    provider: "Microsoft",
    time: "~6 hrs",
    learns: "Introduction to AI concepts and Microsoft Copilot tools.",
  },
  {
    name: "Elements of AI",
    url: "https://www.elementsofai.com",
    provider: "University of Helsinki",
    time: "~15 hrs",
    learns: "How AI works, ethics, and real-world applications.",
  },
  {
    name: "AI For Everyone (free audit)",
    url: "https://www.coursera.org/learn/ai-for-everyone",
    provider: "Coursera / DeepLearning.AI",
    time: "~6 hrs",
    learns: "Non-technical intro to AI strategy and workflow.",
  },
  {
    name: "Khan Academy AI",
    url: "https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:impact-of-computing/xcae6f4a7ff015e7d:ai/a/introduction-to-ai",
    provider: "Khan Academy",
    time: "Self-paced",
    learns: "Beginner-friendly AI and machine learning concepts.",
  },
  {
    name: "Google Prompting Essentials",
    url: "https://grow.google/prompting-essentials",
    provider: "Google",
    time: "~5 hrs",
    learns: "How to write effective prompts for AI tools.",
  },
  {
    name: "Harvard CS50 AI (free audit)",
    url: "https://cs50.harvard.edu/ai",
    provider: "Harvard / edX",
    time: "~7 weeks",
    learns: "Python-based intro to AI and machine learning.",
  },
  {
    name: "Canva AI Design",
    url: "https://www.canva.com/learn/",
    provider: "Canva",
    time: "~2 hrs",
    learns: "Using AI tools for visual design and content creation.",
  },
];

function GuideCTA() {
  return (
    <div className="my-8 bg-zinc-900 border border-emerald-500/25 rounded-2xl p-5 shadow-card text-center">
      <p className="text-sm font-semibold text-zinc-200 mb-1">Ready to add these skills to your resume?</p>
      <p className="text-xs text-zinc-500 mb-4">$9 one-time · No account · Instant access</p>
      <a
        href={STRIPE_URL}
        className="inline-flex items-center justify-center min-h-[48px] bg-emerald-400 hover:bg-emerald-300 hover:-translate-y-0.5 text-zinc-900 font-bold text-sm rounded-2xl transition-all px-8"
        style={{ boxShadow: "0 4px 16px rgb(52 211 153 / 0.35)" }}
      >
        Build My Resume — $9
      </a>
    </div>
  );
}

export default function FreeAICoursesForTeensPage() {
  return (
    <div className="py-12 animate-fade-in">
      <div className="mb-8">
        <Link href="/guides" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Back to guides
        </Link>
      </div>

      <h1 className="font-serif text-3xl tracking-tight mb-2">
        Free AI Courses for Teens (2026)
      </h1>
      <p className="text-xs text-zinc-500 mb-10">Last updated: April 2026</p>

      <div className="flex flex-col gap-8">

        {/* ── Intro ─────────────────────────────────────────────────────────── */}
        <section>
          <p className="text-sm text-zinc-400 leading-relaxed mb-3">
            AI skills are becoming the most valuable thing a teen can put on a resume in 2026.
            Employers and college admissions officers are actively looking for students who have taken
            initiative to learn these tools — and the best courses are completely free.
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed">
            This guide covers the top free AI courses for high school students — what they teach,
            how long they take, and exactly how to word them on your{" "}
            <Link
              href="/first-job-resume-for-teens"
              className="underline underline-offset-2 decoration-zinc-600 hover:decoration-zinc-400 transition-colors"
            >
              first job resume for teens
            </Link>
            {" "}or your{" "}
            <Link
              href="/guides/college-application-resume-example"
              className="underline underline-offset-2 decoration-zinc-600 hover:decoration-zinc-400 transition-colors"
            >
              college application resume
            </Link>
            .
          </p>
        </section>

        {/* ── Course list ───────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-4">
            8 Free AI Courses Worth Adding to Your Resume
          </h2>
          <div className="flex flex-col gap-4">
            {COURSES.map((course) => (
              <div
                key={course.name}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card"
              >
                <div className="flex items-start justify-between gap-3 mb-1">
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors leading-snug"
                  >
                    {course.name} ↗
                  </a>
                  <span className="text-[10px] font-semibold text-zinc-600 bg-zinc-800 border border-zinc-700/60 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                    {course.time}
                  </span>
                </div>
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">
                  {course.provider}
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed mb-3">{course.learns}</p>
                <a
                  href={STRIPE_URL}
                  className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500 hover:text-emerald-400 transition-colors"
                >
                  <span>🔒</span>
                  <span>Resume bullet points for this skill — unlocked with ApplyWell</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        <GuideCTA />

        {/* ── How to list AI skills ─────────────────────────────────────────── */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">
            How to List AI Skills on Your Resume
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-5">
            ATS software scans for specific keywords before a human sees your resume. Listing AI
            skills correctly — with the certification name, what you did, and a concrete application
            — dramatically improves your chances of passing the initial screen and impressing the
            hiring manager.
          </p>

          <div className="flex flex-col gap-3 mb-5">
            <div className="bg-emerald-400/5 border border-emerald-500/20 rounded-xl px-4 py-3">
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1.5">
                ✅ Strong example
              </p>
              <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                Completed Google AI Essentials certification; applied prompt engineering techniques
                to automate [task] and reduce time spent by 40%
              </p>
            </div>
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3">
              <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1.5">
                ❌ Weak example
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed font-mono">
                I know AI stuff
              </p>
            </div>
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed">
            Get the exact bullet points for every course above inside ApplyWell —{" "}
            <a
              href={STRIPE_URL}
              className="underline underline-offset-2 decoration-zinc-600 hover:decoration-emerald-400 transition-colors text-zinc-300"
            >
              start for $9 →
            </a>
          </p>
        </section>

        <GuideCTA />

        {/* ── Related guides ────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">Related Guides</h2>
          <div className="flex flex-col gap-2">
            {[
              { href: "/first-job-resume-for-teens",                   label: "A Parent's Guide to Your Teen's First Resume" },
              { href: "/guides/college-application-resume-example",    label: "College Application Resume — Example & Format" },
              { href: "/guides/student-resume-verbs",                  label: "Strong Action Verbs for Student Resumes" },
              { href: "/guides/how-to-describe-leadership-experience", label: "How to Describe Leadership Experience" },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                → {g.label}
              </Link>
            ))}
          </div>
        </section>

      </div>

      <div className="mt-10 pt-6 border-t border-zinc-800/60 flex flex-wrap gap-x-5 gap-y-2">
        {[
          { label: "All Guides",     href: "/guides" },
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Contact",        href: "/contact" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
