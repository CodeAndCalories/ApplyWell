import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MAJORS } from "@/data/majors";

interface Props {
  params: Promise<{ major: string }>;
}

export async function generateStaticParams() {
  return MAJORS.map((m) => ({ major: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { major } = await params;
  const data = MAJORS.find((m) => m.slug === major);
  if (!data) return {};
  return {
    title: `${data.name} Resume Template for Students`,
    description: `Build a strong ${data.name} resume as a student. Key skills, relevant coursework, and sample bullet points tailored for ${data.name} graduates.`,
  };
}

export default async function MajorResumePage({ params }: Props) {
  const { major } = await params;
  const data = MAJORS.find((m) => m.slug === major);
  if (!data) notFound();

  const others = MAJORS.filter((m) => m.slug !== major).slice(0, 5);

  return (
    <div className="py-12 animate-fade-in">
      <div className="mb-8">
        <Link href="/blog" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Blog
        </Link>
      </div>

      <h1 className="font-serif text-3xl tracking-tight mb-2 leading-tight">
        {data.name} Resume Template for Students
      </h1>
      <p className="text-xs text-zinc-500 mb-10">Updated 2026 · ApplyWell</p>

      <div className="flex flex-col gap-8">
        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">
            What Recruiters Look for in {data.name} Graduates
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">{data.intro}</p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">Key Skills to Highlight</h2>
          <ul className="flex flex-col gap-2">
            {data.skills.map((skill) => (
              <li key={skill} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="text-emerald-500 flex-shrink-0 mt-0.5">›</span>
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">Relevant Coursework to List</h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-3">
            Include a &ldquo;Relevant Coursework&rdquo; line in your education section with 4–6 classes
            that directly tie to the roles you&rsquo;re applying for. For {data.name} majors, these
            courses tend to carry the most weight:
          </p>
          <div className="flex flex-wrap gap-2">
            {data.coursework.map((course) => (
              <span
                key={course}
                className="text-xs text-zinc-300 bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-lg"
              >
                {course}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">Sample Resume Bullet Points</h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-3">
            These examples show how to write strong, results-focused bullet points for a {data.name}{" "}
            resume. Adapt them to your own experience — the structure is what matters.
          </p>
          <div className="flex flex-col gap-3">
            {data.bullets.map((bullet) => (
              <div
                key={bullet}
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3"
              >
                <p className="text-sm text-zinc-300 leading-relaxed">· {bullet}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">
            Resume Format Tips for {data.name} Students
          </h2>
          <ul className="flex flex-col gap-2">
            {[
              "Keep it to one page — even with strong experience, brevity wins at the student level",
              "Lead with Education until you have 2+ years of relevant work experience",
              "Use the same action-verb bullet format for Activities as you would for Jobs",
              "Include a Skills section listing specific tools, software, or technical knowledge",
              "Tailor your resume for each application by mirroring keywords from the job posting",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="text-emerald-500 flex-shrink-0 mt-0.5">›</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-5">
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">
            Build Your {data.name} Resume — Free
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            ApplyWell is a free resume builder designed specifically for students. Add your education,
            activities, coursework, and projects — then export a clean, professional resume in one click.
            No subscription required.
          </p>
          <Link
            href="/"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Start building for free →
          </Link>
        </section>
      </div>

      {others.length > 0 && (
        <section className="mt-10">
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">Resume Templates by Major</h2>
          <div className="flex flex-col gap-2">
            {others.map((m) => (
              <Link
                key={m.slug}
                href={`/resume-templates/${m.slug}`}
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                → {m.name} Resume Template
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-10 pt-6 border-t border-zinc-800/60 flex flex-wrap gap-x-5 gap-y-2">
        {[
          { label: "Blog", href: "/blog" },
          { label: "Guides", href: "/guides" },
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
