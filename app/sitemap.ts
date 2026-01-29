import { MetadataRoute } from "next";

// Use environment variable or Vercel's automatic URL
// IMPORTANT: Set NEXT_PUBLIC_SITE_URL in Vercel Environment Variables
// to match your exact production domain (e.g., https://ramarasim.com)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://ramarasim.com");

// Project IDs - in production, fetch these from your database/API
const projectIds = [1, 2, 3];

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic project pages
  const projectPages: MetadataRoute.Sitemap = projectIds.map((id) => ({
    url: `${siteUrl}/projects/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages];
}
