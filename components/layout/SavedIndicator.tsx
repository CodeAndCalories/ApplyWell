"use client";

import { useApp } from "@/lib/context";
import { useEffect, useState } from "react";

export default function SavedIndicator() {
  const { isSaved } = useApp();
  const [visible, setVisible] = useState(false);

  // Show for 2 s each time isSaved fires, then hide
  useEffect(() => {
    if (!isSaved) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(t);
  }, [isSaved]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-3 left-1/2 -translate-x-1/2 z-50 animate-fade-in
                 flex items-center gap-1.5 px-3.5 py-1.5
                 bg-zinc-900 border border-zinc-700/80 rounded-full
                 text-xs font-semibold text-zinc-300 select-none"
      style={{ boxShadow: "0 2px 12px rgb(0 0 0 / 0.5)" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
      Saved ✓
    </div>
  );
}
