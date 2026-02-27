// Server component for static export
import PreviewClient from "./client";

export function generateStaticParams() {
  return [{ type: "resume" }, { type: "college" }];
}

export default function PreviewPage() {
  return <PreviewClient />;
}
