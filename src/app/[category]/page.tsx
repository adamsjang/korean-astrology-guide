import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/mdx";
import { getCategory, ALL_CATEGORY_SLUGS } from "@/lib/categories";
import ArticleCard from "@/components/article/ArticleCard";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return ALL_CATEGORY_SLUGS.map((slug) => ({ category: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return {
    title: cat.title,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const posts = getPostsByCategory(category);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: cat.color }}
        >
          카테고리
        </p>
        <h1 className="text-3xl font-semibold text-(--color-primary) mb-2">
          {cat.title}
        </h1>
        <p className="text-(--color-secondary) mb-3">{cat.description}</p>
        <p className="text-sm text-(--color-secondary) leading-relaxed max-w-2xl">{cat.intro}</p>
        {category === "dream" && (
          <Link
            href="/dream-search"
            className="inline-flex items-center gap-2 mt-4 text-sm font-medium px-4 py-2 rounded-lg border border-(--color-border) text-(--color-secondary) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            키워드로 꿈해몽 검색하기
          </Link>
        )}
        {category === "tarot" && (
          <Link
            href="/tarot-reading"
            className="inline-flex items-center gap-2 mt-4 text-sm font-medium px-4 py-2 rounded-lg border border-(--color-border) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
            style={{ color: "#6B2D5E", borderColor: "#6B2D5E40" }}
          >
            ✦ 오늘의 타로 카드 뽑기
          </Link>
        )}
      </div>

      {posts.length === 0 ? (
        <p className="text-(--color-secondary)">아직 작성된 글이 없습니다.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
