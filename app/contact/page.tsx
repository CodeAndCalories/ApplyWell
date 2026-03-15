import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="py-12 animate-fade-in">
      <div className="mb-8">
        <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Back to home
        </Link>
      </div>

      <h1 className="font-serif text-3xl tracking-tight mb-2">Contact</h1>
      <p className="text-xs text-zinc-500 mb-10">We&apos;re a small indie team — we read every message.</p>

      <div className="flex flex-col gap-8">
        {/* Main contact */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">Get in Touch</h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            If you have questions about ApplyWell, refunds, or your application, contact us at:
          </p>
          <a
            href="mailto:support@applywell.io"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            support@applywell.io
          </a>
          <p className="text-xs text-zinc-500 mt-2">Typically within 24–48 hours.</p>
        </section>

        {/* Refund requests */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">Refund Requests</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            We offer a 30-day money-back guarantee. To request a refund, email{" "}
            <a href="mailto:support@applywell.io" className="text-zinc-300 hover:text-zinc-100 underline underline-offset-2 transition-colors">
              support@applywell.io
            </a>{" "}
            with the email address used when creating your application. A brief reason helps us improve but is not required.
          </p>
        </section>

        {/* General questions */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">General Questions</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            For feature requests, bug reports, or anything else, reach out to the same address. We appreciate feedback and use it to improve ApplyWell.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t border-zinc-800/60 flex flex-wrap gap-x-5 gap-y-2">
        {[
          { label: "Privacy Policy",    href: "/privacy" },
          { label: "Terms of Service",  href: "/terms" },
          { label: "Refund Policy",     href: "/refund" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
