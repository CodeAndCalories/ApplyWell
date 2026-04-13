import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JOB_TYPES } from "@/data/job-types";

interface Props {
  params: Promise<{ "job-type": string }>;
}

export async function generateStaticParams() {
  return JOB_TYPES.map((j) => ({ "job-type": j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params)["job-type"];
  const data = JOB_TYPES.find((j) => j.slug === slug);
  if (!data) return {};
  return {
    title: `Resume for ${data.name} — Student Guide`,
    description: `How to write a resume for a ${data.name.toLowerCase()} as a student. Tips, what to emphasize, and common mistakes to avoid.`,
  };
}

export default async function JobTypeResumePage({ params }: Props) {
  const slug = (await params)["job-type"];
  const data = JOB_TYPES.find((j) => j.slug === slug);
  if (!data) notFound();

  const others = JOB_TYPES.filter((j) => j.slug !== slug).slice(0, 5);

  return (
    <div className="py-12 animate-fade-in">
      <div className="mb-8">
        <Link href="/blog" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Blog
        </Link>
      </div>

      <h1 className="font-serif text-3xl tracking-tight mb-2 leading-tight">
        Resume for {data.name} — Student Guide
      </h1>
      <p className="text-xs text-zinc-500 mb-10">Updated 2026 · ApplyWell</p>

      <div className="flex flex-col gap-8">
        <section>
          <p className="text-sm text-zinc-400 leading-relaxed">{data.intro}</p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">Tips for This Type of Role</h2>
          <ul className="flex flex-col gap-2">
            {data.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="text-emerald-500 flex-shrink-0 mt-0.5">›</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">What to Emphasize</h2>
          <div className="flex flex-col gap-3">
            {data.emphases.map((item) => (
              <div
                key={item}
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3"
              >
                <p className="text-sm text-zinc-300 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">Common Mistakes to Avoid</h2>
          <ul className="flex flex-col gap-2">
            {data.mistakes.map((mistake) => (
              <li key={mistake} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="text-red-500 flex-shrink-0 mt-0.5">›</span>
                {mistake}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-5">
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">
            Build a Resume That Gets You Hired
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            ApplyWell is a free resume builder for students. Whether you&rsquo;re applying for your first
            job or a competitive internship, ApplyWell helps you put your best foot forward — with no
            subscription and no paywall on downloads.
          </p>
          <Link
            href="/"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Build your resume free →
          </Link>
        </section>
      </div>

      {others.length > 0 && (
        <section className="mt-10">
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">More Resume Guides</h2>
          <div className="flex flex-col gap-2">
            {others.map((j) => (
              <Link
                key={j.slug}
                href={`/resume-for/${j.slug}`}
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                → Resume for {j.name}
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
