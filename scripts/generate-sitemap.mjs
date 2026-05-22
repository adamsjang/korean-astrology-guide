import { readFileSync, readdirSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://korean-astrology-guide.pages.dev";
const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "src/content");
const PUBLIC_DIR = path.join(ROOT, "public");

const CATEGORY_SLUGS = [
  "fortune-guide",
  "dream",
  "zodiac",
  "tarot",
  "palmistry",
  "physiognomy",
  "learn",
  "compatibility",
  "column",
  "zodiac-animal",
  "ilju",
];

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.5" },
  { path: "/contact", changefreq: "monthly", priority: "0.5" },
  { path: "/disclaimer", changefreq: "monthly", priority: "0.5" },
  { path: "/privacy", changefreq: "monthly", priority: "0.5" },
  { path: "/terms", changefreq: "monthly", priority: "0.5" },
  { path: "/tools", changefreq: "monthly", priority: "0.7" },
  { path: "/iljin", changefreq: "monthly", priority: "0.6" },
  { path: "/saju-calculator", changefreq: "monthly", priority: "0.7" },
  { path: "/gunghap", changefreq: "monthly", priority: "0.7" },
  { path: "/tarot-reading", changefreq: "monthly", priority: "0.7" },
  { path: "/dream-search", changefreq: "monthly", priority: "0.7" },
  { path: "/tags", changefreq: "weekly", priority: "0.7" },
  { path: "/series/ilju", changefreq: "monthly", priority: "0.8" },
  { path: "/series/zodiac", changefreq: "monthly", priority: "0.8" },
  { path: "/series/tarot-major", changefreq: "monthly", priority: "0.8" },
  { path: "/new-year", changefreq: "monthly", priority: "0.8" },
];

const INDEXABLE_TAG_MIN = 3;
const TODAY = new Date().toISOString().slice(0, 10);

function listPosts() {
  const posts = [];
  for (const slug of CATEGORY_SLUGS) {
    const dir = path.join(CONTENT_DIR, slug);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir)) {
      if (!file.endsWith(".mdx")) continue;
      const filePath = path.join(dir, file);
      const raw = readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      if (!data || !data.publishedAt) continue;
      posts.push({
        category: slug,
        slug: file.replace(/\.mdx$/, ""),
        publishedAt: String(data.publishedAt).slice(0, 10),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      });
    }
  }
  return posts;
}

function isoOr(date, fallback) {
  if (!date) return fallback;
  const d = new Date(date);
  if (isNaN(d.getTime())) return fallback;
  return d.toISOString().slice(0, 10);
}

function latestDate(posts, fallback) {
  if (!posts || posts.length === 0) return fallback;
  return posts
    .map((p) => p.publishedAt)
    .filter(Boolean)
    .sort()
    .at(-1) || fallback;
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

function main() {
  const posts = listPosts();
  const entries = [];

  for (const r of STATIC_ROUTES) {
    entries.push({
      loc: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
      lastmod: TODAY,
      changefreq: r.changefreq,
      priority: r.priority,
    });
  }

  for (const cat of CATEGORY_SLUGS) {
    const catPosts = posts.filter((p) => p.category === cat);
    if (catPosts.length === 0) continue;
    entries.push({
      loc: `${SITE_URL}/${cat}`,
      lastmod: latestDate(catPosts, TODAY),
      changefreq: "weekly",
      priority: "0.8",
    });
  }

  for (const p of posts) {
    entries.push({
      loc: `${SITE_URL}/${p.category}/${p.slug}`,
      lastmod: isoOr(p.publishedAt, TODAY),
      changefreq: "monthly",
      priority: "0.9",
    });
  }

  const tagCounts = new Map();
  const tagLatest = new Map();
  for (const p of posts) {
    for (const raw of p.tags) {
      const t = raw.trim();
      if (!t) continue;
      tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
      const prev = tagLatest.get(t);
      if (!prev || p.publishedAt > prev) tagLatest.set(t, p.publishedAt);
    }
  }
  let popularTagCount = 0;
  for (const [tag, count] of tagCounts) {
    if (count < INDEXABLE_TAG_MIN) continue;
    entries.push({
      loc: `${SITE_URL}/tags/${encodeURIComponent(tag)}`,
      lastmod: isoOr(tagLatest.get(tag), TODAY),
      changefreq: "monthly",
      priority: "0.6",
    });
    popularTagCount += 1;
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(urlEntry),
    "</urlset>",
    "",
  ].join("\n");

  mkdirSync(PUBLIC_DIR, { recursive: true });
  const outFile = path.join(PUBLIC_DIR, "sitemap.xml");
  writeFileSync(outFile, xml, "utf-8");

  console.log(
    `sitemap.xml: ${entries.length} URLs (static ${STATIC_ROUTES.length}, categories ${CATEGORY_SLUGS.length}, posts ${posts.length}, indexable tags ${popularTagCount})`
  );
}

main();
