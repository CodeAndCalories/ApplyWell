"use client";

import { useApp } from "@/lib/context";
import EntryForm from "@/components/entries/EntryForm";
import { useParams } from "next/navigation";

export default function EditEntryClient() {
  const params = useParams();
  const id = params.id as string;
  const { state } = useApp();
  const entry = state.entries.find((e) => e.id === id);

  if (!entry) {
    return (
      <div className="py-12 text-center text-zinc-500">
        Entry not found.{" "}
        <a href="/entries" className="text-emerald-400 underline">Back to entries</a>
      </div>
    );
  }

  return <EntryForm initial={entry} />;
}
