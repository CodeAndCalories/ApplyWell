import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppProvider } from "@/lib/context";
import TopNav from "@/components/layout/TopNav";
import SavedIndicator from "@/components/layout/SavedIndicator";

export const metadata: Metadata = {
  title: "ApplyWell — Honest College Application Support",
  description: "Build a polished college resume and craft compelling application materials.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />
        </head>
        <body className="bg-zinc-950 text-zinc-100 antialiased min-h-screen">
          <AppProvider>
            <SavedIndicator />
            <TopNav />
            <main className="max-w-xl mx-auto px-4 pb-8">{children}</main>
          </AppProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
