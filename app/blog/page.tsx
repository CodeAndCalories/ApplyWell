import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog — Resume & Application Tips for Students",
  description:
    "Practical guides on resume writing, cover letters, LinkedIn, and college applications for students at every stage.",
};

export default function BlogIndexPage() {
  return (
    <div className="py-12 animate-fade-in">
      <div className="mb-8">
        <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Back to home
        </Link>
      </div>

      <h1 className="font-serif text-3xl tracking-tight mb-2">Student Career Blog</h1>
      <p className="text-sm text-zinc-400 mb-10">
        Practical advice on resumes, cover letters, and applications — written for students.
      </p>

      <div className="flex flex-col gap-4">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 hover:border-zinc-600 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors mb-1 leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs text-zinc-500 leading-relaxed">{post.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xs text-zinc-600">{post.date}</span>
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-5">
        <h2 className="text-sm font-semibold text-zinc-100 mb-2">Build Your Resume for Free</h2>
        <p className="text-sm text-zinc-400 leading-relaxed mb-4">
          ApplyWell is a free resume builder designed for students. No subscription, no paywall — just a
          clean, professional resume you can export in minutes.
        </p>
        <Link
          href="/"
          className="inline-block bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          Start for free
        </Link>
      </div>

      <div className="mt-10 pt-6 border-t border-zinc-800/60 flex flex-wrap gap-x-5 gap-y-2">
        {[
          { label: "Guides", href: "/guides" },
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
