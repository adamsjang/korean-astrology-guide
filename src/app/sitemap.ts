import { MetadataRoute } from "next";

export const dynamic = "force-static";
import { getAllPosts } from "@/lib/mdx";
import { ALL_CATEGORY_SLUGS } from "@/lib/categories";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://korean-astrology-guide.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: now, priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, priority: 0.5 },
    { url: `${SITE_URL}/disclaimer`, lastModified: now, priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified: now, priority: 0.5 },
    { url: `${SITE_URL}/terms`, lastModified: now, priority: 0.5 },
    ...ALL_CATEGORY_SLUGS.map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: now,
      priority: 0.8,
    })),
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/${post.category}/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    priority: 0.9,
  }));

  return [...staticRoutes, ...postRoutes];
}
