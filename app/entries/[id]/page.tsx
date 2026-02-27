// Server component — needed for generateStaticParams with static export
import EditEntryClient from "./client";

export function generateStaticParams() {
  return [{ id: "placeholder" }];
}

export default function EditEntryPage() {
  return <EditEntryClient />;
}
