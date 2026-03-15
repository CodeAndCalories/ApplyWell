export const dynamic = 'force-static';

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://applywell.io";

  return [
    {
      url: base,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/guides`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/guides/common-app-activities-examples`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/guides/how-to-write-common-app-essay`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/guides/college-application-resume-example`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/guides/how-to-describe-leadership-experience`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/guides/student-resume-verbs`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/contact`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/refund`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
