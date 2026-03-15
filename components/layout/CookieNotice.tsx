"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "applywell_cookie_dismissed";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2.5rem)] max-w-sm
                 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3
                 flex items-center gap-3 animate-fade-in"
      style={{ boxShadow: "0 4px 20px rgb(0 0 0 / 0.5)" }}
    >
      <p className="flex-1 text-xs text-zinc-400 leading-relaxed">
        This site uses cookies for basic functionality and to improve the user experience.
      </p>
      <button
        onClick={dismiss}
        className="flex-shrink-0 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors px-2 py-1 rounded-lg hover:bg-emerald-400/10"
      >
        Got it
      </button>
    </div>
  );
}
