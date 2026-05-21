import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/mdx";
import { getCategory } from "@/lib/categories";
import ArticleCard from "@/components/article/ArticleCard";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

const INDEXABLE_TAG_MIN = 3;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const count = getPostsByTag(decoded).length;
  const shouldIndex = count >= INDEXABLE_TAG_MIN;
  return {
    title: `#${decoded} 관련 글`,
    description: `${decoded} 태그가 붙은 글 목록입니다.`,
    alternates: { canonical: `/tags/${encodeURIComponent(decoded)}` },
    robots: shouldIndex
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export const dynamicParams = false;

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);
  if (posts.length === 0) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-(--color-secondary) mb-2">태그</p>
        <h1 className="text-3xl font-semibold text-(--color-primary) mb-2">
          #{decoded}
        </h1>
        <p className="text-(--color-secondary)">{posts.length}개 글</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <ArticleCard key={`${post.category}/${post.slug}`} post={post} />
        ))}
      </div>
    </div>
  );
}
