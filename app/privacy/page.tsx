import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const SECTIONS = [
  {
    heading: "Introduction",
    body: "ApplyWell is a browser-based college application and resume building tool. This Privacy Policy explains how we collect, use, and protect your personal information when you use our service. By using ApplyWell you agree to the practices described here.",
  },
  {
    heading: "Information We Collect",
    body: "We collect information you provide directly: your name, grade, school, intended major, activities, essays, and other application-related content you enter into the tool. We also collect basic usage data such as browser type and page visits to help us improve the product. We do not collect sensitive financial information — all payment processing is handled by Stripe.",
  },
  {
    heading: "How We Use Information",
    body: "Your personal data is used solely to provide and improve the ApplyWell service. We use it to render your application content, calculate resume scores, and generate previews and exports. We do not sell, rent, or share your personal data with third parties for marketing purposes.",
  },
  {
    heading: "Payments",
    body: "Payments are processed securely by Stripe, Inc. ApplyWell does not store your credit card number, bank account details, or any other financial credentials. When you complete a purchase, you are interacting directly with Stripe's secure payment infrastructure. Please review Stripe's privacy policy at stripe.com/privacy for details on how they handle payment data.",
  },
  {
    heading: "Data Retention",
    body: "ApplyWell stores your application data locally in your browser using localStorage. This data remains on your device and is not transmitted to our servers unless you use an explicit export or backup feature. You may delete your data at any time using the 'Clear & Start Over' option in the app menu. You may also contact us to request deletion of any data we hold about you.",
  },
  {
    heading: "Security",
    body: "We take reasonable precautions to protect your information. Because most of your data is stored locally in your browser, security also depends on the security of your device. We recommend keeping your browser and operating system updated and avoiding use on shared or public devices.",
  },
  {
    heading: "Third-Party Services",
    body: "ApplyWell uses the following third-party services: Stripe (payment processing) and Google Fonts (typography). These services may collect limited technical data such as IP addresses as part of normal operation. We do not use third-party analytics trackers or advertising networks.",
  },
  {
    heading: "Contact",
    body: "If you have questions about this Privacy Policy or wish to request deletion of your data, contact us at support@applywell.io. We typically respond within 24–48 hours.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="py-12 animate-fade-in">
      <div className="mb-8">
        <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Back to home
        </Link>
      </div>

      <h1 className="font-serif text-3xl tracking-tight mb-2">Privacy Policy</h1>
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
          { label: "Terms of Service", href: "/terms" },
          { label: "Contact",          href: "/contact" },
          { label: "Refund Policy",    href: "/refund" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
