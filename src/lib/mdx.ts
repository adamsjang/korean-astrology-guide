import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Post, PostFrontmatter } from "@/types/post";
import { ALL_CATEGORY_SLUGS } from "@/lib/categories";
import { slugify } from "@/lib/slugify";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

function readPost(category: string, slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;
  const stats = readingTime(content);

  return {
    ...frontmatter,
    slug,
    readingTime: `${Math.ceil(stats.minutes)}분`,
  };
}

export function getAllPosts(): Post[] {
  const posts: Post[] = [];

  for (const category of ALL_CATEGORY_SLUGS) {
    const dir = path.join(CONTENT_DIR, category);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "");
      const post = readPost(category, slug);
      if (post) posts.push(post);
    }
  }

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostBySlug(category: string, slug: string): Post | null {
  return readPost(category, slug);
}

export function getFeaturedPosts(limit = 6): Post[] {
  return getAllPosts()
    .filter((p) => p.featured)
    .slice(0, limit);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  getAllPosts().forEach((p) => p.tags?.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags?.includes(tag));
}

export interface TagBucket {
  tag: string;
  count: number;
}

export function getAllTagBuckets(): TagBucket[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const raw of post.tags ?? []) {
      const tag = raw.trim();
      if (!tag) continue;
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => (b.count - a.count) || a.tag.localeCompare(b.tag, "ko"));
}

export function getTopTagsForCategory(
  category: string,
  limit = 8
): TagBucket[] {
  const counts = new Map<string, number>();
  for (const post of getPostsByCategory(category)) {
    for (const raw of post.tags ?? []) {
      const tag = raw.trim();
      if (!tag) continue;
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => (b.count - a.count) || a.tag.localeCompare(b.tag, "ko"))
    .slice(0, limit);
}

export interface Heading {
  depth: 2 | 3;
  text: string;
  id: string;
}

export function getHeadings(category: string, slug: string): Heading[] {
  const filePath = path.join(CONTENT_DIR, category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);

  const headings: Heading[] = [];
  let inFence = false;
  for (const rawLine of content.split("\n")) {
    const line = rawLine.trimEnd();
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m2 = line.match(/^##\s+(.+?)\s*#*\s*$/);
    if (m2) {
      const text = m2[1].trim();
      headings.push({ depth: 2, text, id: slugify(text) });
      continue;
    }
    const m3 = line.match(/^###\s+(.+?)\s*#*\s*$/);
    if (m3) {
      const text = m3[1].trim();
      headings.push({ depth: 3, text, id: slugify(text) });
    }
  }
  return headings.filter((h) => h.id);
}
