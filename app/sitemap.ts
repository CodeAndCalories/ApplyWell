import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://applywell.io";
  const now = new Date();

  const routes = [
    { url: "/",                        priority: 1.0,  changeFrequency: "monthly" as const },
    { url: "/college",                 priority: 0.9,  changeFrequency: "monthly" as const },
    { url: "/college/activities",      priority: 0.8,  changeFrequency: "monthly" as const },
    { url: "/college/essays",          priority: 0.8,  changeFrequency: "monthly" as const },
    { url: "/college/review",          priority: 0.8,  changeFrequency: "monthly" as const },
    { url: "/resume",                  priority: 0.8,  changeFrequency: "monthly" as const },
    { url: "/entries",                 priority: 0.7,  changeFrequency: "monthly" as const },
    { url: "/verify",                  priority: 0.7,  changeFrequency: "monthly" as const },
    { url: "/export",                  priority: 0.6,  changeFrequency: "monthly" as const },
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${base}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
