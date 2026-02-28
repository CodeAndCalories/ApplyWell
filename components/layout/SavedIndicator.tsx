"use client";

import { useApp } from "@/lib/context";

export default function SavedIndicator() {
  const { isSaved } = useApp();
  if (!isSaved) return null;
  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 border border-zinc-700 rounded-full px-4 py-1.5 text-xs text-zinc-400 font-medium animate-fade-in flex items-center gap-1.5 shadow-lg">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
      Saved locally
    </div>
  );
}
