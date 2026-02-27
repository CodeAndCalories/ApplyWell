export const dynamic = "force-dynamic";

// Server wrapper — needed for static export
import EntryPageClient from "./client";

export function generateStaticParams() {
  return [{ slug: ["new"] }, { slug: ["placeholder"] }];
}

export default function EntryPage() {
  return <EntryPageClient />;
}
