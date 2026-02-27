import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed "output: export" — incompatible with Clerk and SSR routes.
  // Cloudflare Pages uses @cloudflare/next-on-pages for dynamic Next.js apps.
  images: { unoptimized: true },
};

export default nextConfig;
