export const dynamic = 'force-static';

import type { MetadataRoute } from "next";
import { schools } from "@/data/schools";
import { SKILLS } from "@/app/guides/ai-skills/[skill]/skills-data";

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
      url: `${base}/high-salary-remote-resume`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/first-job-resume-for-teens`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/college-resume-for-remote-jobs`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/no-subscription-resume-builder`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/ai-skills-for-students`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/common-app-activities-help`,
      changeFrequency: "monthly",
      priority: 0.8,
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
      url: `${base}/guides/free-ai-courses-for-teens`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...SKILLS.map((s) => ({
      url: `${base}/guides/ai-skills/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
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
    ...schools.map((s) => ({
      url: `${base}/resume-templates/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
