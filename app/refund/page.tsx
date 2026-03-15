import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy",
};

export default function RefundPage() {
  return (
    <div className="py-12 animate-fade-in">
      <div className="mb-8">
        <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Back to home
        </Link>
      </div>

      <h1 className="font-serif text-3xl tracking-tight mb-2">Refund Policy</h1>
      <p className="text-xs text-zinc-500 mb-10">Last updated: March 2026</p>

      <div className="flex flex-col gap-8">
        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">30-Day Money-Back Guarantee</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            We want you to feel confident using ApplyWell. If the tool does not meet your expectations for any reason, you may request a full refund within 30 days of your purchase. No lengthy process, no hard feelings.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">How to Request a Refund</h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-3">
            To request a refund, send an email to{" "}
            <a
              href="mailto:support@applywell.io"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              support@applywell.io
            </a>{" "}
            with the following:
          </p>
          <ul className="flex flex-col gap-2">
            {[
              "The email address used when making your purchase",
              "A brief reason for the refund (optional — helps us improve)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="text-emerald-500 flex-shrink-0 mt-0.5">›</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">Processing Time</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Refunds are processed within several business days. The time for the refund to appear in your account depends on your bank or card issuer and is typically 3–10 business days after we initiate the refund.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-100 mb-2">Eligibility</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Refund requests must be submitted within 30 days of the original purchase date. After 30 days, purchases are final. If you have any questions about eligibility, contact us and we will do our best to help.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t border-zinc-800/60 flex flex-wrap gap-x-5 gap-y-2">
        {[
          { label: "Privacy Policy",   href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
          { label: "Contact",          href: "/contact" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
