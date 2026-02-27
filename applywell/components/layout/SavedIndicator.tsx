"use client";

import { useApp } from "@/lib/context";

export default function SavedIndicator() {
  const { isSaved } = useApp();
  if (!isSaved) return null;
  return (
    <div className="fixed top-3 right-3 z-50 bg-emerald-500/20 border border-emerald-500/40 rounded-lg px-3 py-1.5 text-xs text-emerald-400 font-medium animate-fade-in">
      ✓ Saved
    </div>
  );
}
