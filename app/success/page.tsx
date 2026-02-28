"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"processing" | "done" | "invalid">("processing");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paid = params.get("paid");

    if (paid === "true") {
      try {
        localStorage.setItem("applywell_pro", "true");
        localStorage.setItem("applywell_pro_activated_at", new Date().toISOString());
      } catch {
        // localStorage blocked (private browsing edge case) — still redirect
      }
      setStatus("done");
      // Brief pause so user sees confirmation before redirect
      setTimeout(() => {
        router.replace("/?upgraded=true");
      }, 1200);
    } else {
      setStatus("invalid");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="max-w-sm w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
        {status === "processing" && (
          <>
            <div className="text-3xl mb-4">⏳</div>
            <div className="font-semibold text-base text-zinc-200">Activating…</div>
            <div className="text-xs text-zinc-500 mt-2">Just a moment</div>
          </>
        )}

        {status === "done" && (
          <>
            <div className="text-3xl mb-4">🎉</div>
            <div className="font-semibold text-base text-zinc-100">Payment confirmed!</div>
            <div className="text-sm text-zinc-400 mt-2 leading-relaxed">
              ApplyWell Pro is now active. Redirecting you now…
            </div>
          </>
        )}

        {status === "invalid" && (
          <>
            <div className="text-3xl mb-4">🤔</div>
            <div className="font-semibold text-base text-zinc-200">Something looks off</div>
            <div className="text-sm text-zinc-500 mt-2 leading-relaxed mb-6">
              We didn&apos;t receive a payment confirmation. If you completed a purchase, please contact support.
            </div>
            <button
              onClick={() => router.replace("/")}
              className="w-full border border-zinc-700 text-zinc-400 hover:text-zinc-200 rounded-xl py-2.5 text-sm transition-colors"
            >
              ← Back to ApplyWell
            </button>
          </>
        )}
      </div>
    </div>
  );
}
