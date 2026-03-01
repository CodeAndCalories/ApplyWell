import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/context";
import TopNav from "@/components/layout/TopNav";
import SavedIndicator from "@/components/layout/SavedIndicator";

export const metadata: Metadata = {
  metadataBase: new URL("https://applywell.io"),
  title: {
    default: "ApplyWell — Resume & College Application Builder",
    template: "%s | ApplyWell",
  },
  description:
    "ApplyWell helps students and job seekers build professional resumes and college applications. Track Common App activities, draft essays, and export clean PDFs. Free preview. One-time upgrade. No subscription.",
  keywords: [
    "resume builder",
    "college application tracker",
    "Common App activities",
    "college essay tracker",
    "ATS resume",
    "student resume builder",
    "college application help",
    "applywell",
  ],
  alternates: {
    canonical: "https://applywell.io",
  },
  openGraph: {
    type: "website",
    url: "https://applywell.io",
    siteName: "ApplyWell",
    title: "ApplyWell — Resume & College Application Builder",
    description:
      "Build professional resumes and track college applications. Export clean PDFs. Works in your browser — no account required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ApplyWell — Resume & College Application Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ApplyWell — Resume & College Application Builder",
    description:
      "Build professional resumes and track college applications. Export clean PDFs. Works in your browser — no account required.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-zinc-950 text-zinc-100 antialiased min-h-screen">
        <AppProvider>
          <SavedIndicator />
          <TopNav />
          <main className="max-w-xl mx-auto px-4 pb-8">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
