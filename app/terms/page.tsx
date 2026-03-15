import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
};

const SECTIONS = [
  {
    heading: "Use of Service",
    body: "ApplyWell provides a browser-based tool to help students build college application materials including resumes, activity lists, and essays. By accessing or using ApplyWell you agree to these Terms. You must be at least 13 years old to use this service. If you are under 18, you confirm that a parent or guardian has reviewed and agreed to these Terms on your behalf.",
  },
  {
    heading: "Payments",
    body: "Access to ApplyWell's full features requires a one-time payment of $9 per application. Payments are processed securely through Stripe. You will be charged at the time of purchase. ApplyWell does not store your payment information.",
  },
  {
    heading: "Refund Policy",
    body: "We offer a 30-day money-back guarantee. If ApplyWell does not meet your expectations for any reason, contact us at support@applywell.io within 30 days of your purchase and we will issue a full refund. No questions asked. Refunds are processed within several business days.",
  },
  {
    heading: "User Responsibilities",
    body: "You are responsible for the accuracy of the content you enter into ApplyWell. You agree not to use the service for any unlawful purpose, to impersonate others, or to submit content that is false, misleading, or harmful. You are responsible for maintaining the security of your device and browser.",
  },
  {
    heading: "Intellectual Property",
    body: "All content, design, code, and materials that make up ApplyWell are owned by or licensed to us and are protected by applicable intellectual property laws. The application content you create using ApplyWell belongs to you. We do not claim ownership over your essays, activity descriptions, or personal information.",
  },
  {
    heading: "No Guarantee of Admission",
    body: "ApplyWell is a writing and organizational tool. Using ApplyWell does not guarantee admission to any college, university, or program. We make no representations or warranties about the effectiveness of materials created with ApplyWell. College admission decisions are made solely by the institutions to which you apply.",
  },
  {
    heading: "Limitation of Liability",
    body: "To the maximum extent permitted by law, ApplyWell and its creators shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of the service, including loss of data, missed deadlines, or admission outcomes. Our total liability shall not exceed the amount you paid for the service.",
  },
  {
    heading: "Changes to Terms",
    body: "We may update these Terms from time to time. We will notify users of significant changes by updating the date at the top of this page. Continued use of ApplyWell after changes are posted constitutes acceptance of the revised Terms.",
  },
  {
    heading: "Contact",
    body: "Questions about these Terms? Contact us at support@applywell.io. We typically respond within 24–48 hours.",
  },
];

export default function TermsPage() {
  return (
    <div className="py-12 animate-fade-in">
      <div className="mb-8">
        <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Back to home
        </Link>
      </div>

      <h1 className="font-serif text-3xl tracking-tight mb-2">Terms of Service</h1>
      <p className="text-xs text-zinc-500 mb-10">Last updated: March 2026</p>

      <div className="flex flex-col gap-8">
        {SECTIONS.map((s) => (
          <section key={s.heading}>
            <h2 className="text-sm font-semibold text-zinc-100 mb-2">{s.heading}</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">{s.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-12 pt-6 border-t border-zinc-800/60 flex flex-wrap gap-x-5 gap-y-2">
        {[
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Contact",        href: "/contact" },
          { label: "Refund Policy",  href: "/refund" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
