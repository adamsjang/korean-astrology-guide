import { readFileSync, readdirSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://korean-astrology-guide.pages.dev";
const FEED_LIMIT = 30;
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

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

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
      if (!data || !data.title || !data.publishedAt) continue;
      posts.push({
        category: slug,
        slug: file.replace(/\.mdx$/, ""),
        title: String(data.title),
        description: String(data.description ?? ""),
        publishedAt: String(data.publishedAt).slice(0, 10),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      });
    }
  }
  posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  return posts;
}

function toRfc822(yyyyMmDd) {
  const d = new Date(`${yyyyMmDd}T00:00:00Z`);
  return d.toUTCString();
}

function main() {
  const posts = listPosts().slice(0, FEED_LIMIT);
  const buildDate = new Date().toUTCString();
  const lastBuild = posts[0] ? toRfc822(posts[0].publishedAt) : buildDate;

  const items = posts
    .map((p) => {
      const link = `${SITE_URL}/${p.category}/${p.slug}`;
      return [
        "    <item>",
        `      <title>${escapeXml(p.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${toRfc822(p.publishedAt)}</pubDate>`,
        `      <description>${escapeXml(p.description)}</description>`,
        `      <category>${escapeXml(p.category)}</category>`,
        ...p.tags.map((t) => `      <category>${escapeXml(t)}</category>`),
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>운세 참고서</title>",
    `    <link>${SITE_URL}</link>`,
    "    <description>명리학·별자리·타로·꿈해몽을 교육적으로 해설하는 정보성 콘텐츠 사이트.</description>",
    "    <language>ko</language>",
    `    <lastBuildDate>${lastBuild}</lastBuildDate>`,
    `    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  mkdirSync(PUBLIC_DIR, { recursive: true });
  const outFile = path.join(PUBLIC_DIR, "feed.xml");
  writeFileSync(outFile, xml, "utf-8");
  console.log(`feed.xml: ${posts.length} items`);
}

main();
