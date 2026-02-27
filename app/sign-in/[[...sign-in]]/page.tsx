export const dynamic = "force-dynamic";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full flex flex-col items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-amber-400 flex items-center justify-center text-zinc-900 font-bold text-base">
            A
          </div>
          <span className="font-serif text-lg text-zinc-100">ApplyWell</span>
        </div>
        <SignIn
          appearance={{
            variables: {
              colorBackground: "#18181b",
              colorText: "#f4f4f5",
              colorTextSecondary: "#a1a1aa",
              colorPrimary: "#34d399",
              colorInputBackground: "#27272a",
              colorInputText: "#f4f4f5",
              borderRadius: "12px",
            },
            elements: {
              card: "shadow-none border border-zinc-800",
              headerTitle: "font-serif text-2xl",
              formButtonPrimary: "bg-emerald-400 text-zinc-900 hover:bg-emerald-300 font-semibold",
            },
          }}
        />
      </div>
    </div>
  );
}
