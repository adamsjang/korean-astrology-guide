import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Post, PostFrontmatter } from "@/types/post";
import { ALL_CATEGORY_SLUGS } from "@/lib/categories";

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
