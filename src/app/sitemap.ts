import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { ALL_CATEGORY_SLUGS } from "@/lib/categories";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://korean-astrology-guide.pages.dev";

  const posts = getAllPosts();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/disclaimer`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    ...ALL_CATEGORY_SLUGS.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/${post.category}/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...postRoutes];
}
