"use client";

import { useApp } from "@/lib/context";
import EntryForm from "@/components/entries/EntryForm";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function EntryPageClient() {
  const params = useParams();
  const slug = params.slug as string[];
  const id = slug?.[0];
  const { state } = useApp();

  if (id === "new") {
    return <EntryForm />;
  }

  const entry = state.entries.find((e) => e.id === id);

  if (!entry) {
    return (
      <div className="py-16 text-center">
        <div className="text-4xl mb-4">🔍</div>
        <div className="font-semibold mb-2">Entry not found</div>
        <p className="text-zinc-500 text-sm mb-6">It may have been deleted or the link is invalid.</p>
        <Link href="/entries" className="bg-emerald-400 text-zinc-900 font-semibold rounded-xl px-5 py-2.5 text-sm">
          Back to Entries
        </Link>
      </div>
    );
  }

  return <EntryForm initial={entry} />;
}
