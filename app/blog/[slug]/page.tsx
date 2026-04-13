import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blog-posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="py-12 animate-fade-in">
      <div className="mb-8">
        <Link href="/blog" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Back to blog
        </Link>
      </div>

      <h1 className="font-serif text-3xl tracking-tight mb-2 leading-tight">{post.title}</h1>
      <div className="flex items-center gap-3 mb-10">
        <span className="text-xs text-zinc-500">{post.date}</span>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-8">
        {post.sections.map((section, i) => {
          if (!section.heading && section.paragraphs && !section.items) {
            return (
              <section key={i}>
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-sm text-zinc-400 leading-relaxed mb-3 last:mb-0">
                    {p}
                  </p>
                ))}
              </section>
            );
          }

          if (section.heading && !section.items) {
            return (
              <section key={i}>
                <h2 className="text-sm font-semibold text-zinc-100 mb-3">{section.heading}</h2>
                {section.paragraphs?.map((p, j) => (
                  <p key={j} className="text-sm text-zinc-400 leading-relaxed mb-3 last:mb-0">
                    {p}
                  </p>
                ))}
              </section>
            );
          }

          if (section.items) {
            return (
              <section key={i}>
                {section.heading && (
                  <h2 className="text-sm font-semibold text-zinc-100 mb-3">{section.heading}</h2>
                )}
                {section.paragraphs?.map((p, j) => (
                  <p key={j} className="text-sm text-zinc-400 leading-relaxed mb-3">
                    {p}
                  </p>
                ))}
                <ul className="flex flex-col gap-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-zinc-400">
                      <span
                        className={`flex-shrink-0 mt-0.5 ${
                          section.numbered ? "text-emerald-500 font-semibold text-xs w-4" : "text-emerald-500"
                        }`}
                      >
                        {section.numbered ? `${j + 1}.` : "›"}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            );
          }

          return null;
        })}

        <section className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-5">
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">
            Build Your Resume for Free with ApplyWell
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            ApplyWell is a free resume builder made for students. Organize your activities, coursework,
            and experience into a polished resume you can export in one click — no subscription required.
          </p>
          <Link
            href="/"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Start for free →
          </Link>
        </section>
      </div>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">More from the Blog</h2>
          <div className="flex flex-col gap-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                → {p.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-10 pt-6 border-t border-zinc-800/60 flex flex-wrap gap-x-5 gap-y-2">
        {[
          { label: "All Posts", href: "/blog" },
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
