import { notFound } from "next/navigation";
import { getPostsByCategory, getTopTagsForCategory } from "@/lib/mdx";
import { getCategory, getRelatedCategories, ALL_CATEGORY_SLUGS } from "@/lib/categories";
import { getLearnStages } from "@/lib/learn-path";
import PaginatedPostList from "@/components/article/PaginatedPostList";
import RelatedCategories from "@/components/article/RelatedCategories";
import LearnPath from "@/components/article/LearnPath";
import CollectionJsonLd from "@/components/seo/CollectionJsonLd";
import Link from "next/link";
import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://korean-astrology-guide.pages.dev";

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
  const topTags = getTopTagsForCategory(category, 8);
  const relatedCategories = getRelatedCategories(category);
  const learnStages = category === "learn" ? getLearnStages() : [];

  const collectionItems = posts.slice(0, 50).map((p) => ({
    name: p.title,
    url: `${SITE_URL}/${p.category}/${p.slug}`,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <CollectionJsonLd
        name={cat.title}
        description={cat.description}
        url={`${SITE_URL}/${cat.slug}`}
        items={collectionItems}
        itemListOrder="Descending"
      />
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
        {category === "physiognomy" && (
          <a
            href="https://gwansang-mirror.pages.dev/?utm_source=kag&utm_medium=referral&utm_campaign=physiognomy-cta"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm font-medium px-4 py-2 rounded-lg border border-(--color-border) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
            style={{ color: "#5C4A3A", borderColor: "#5C4A3A40" }}
          >
            觀 카메라로 내 얼굴 부위 직접 측정해 보기 →
          </a>
        )}
      </div>

      {category === "learn" && learnStages.length > 0 && (
        <LearnPath stages={learnStages} />
      )}

      {topTags.length > 0 && (
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-(--color-accent) mb-3">
            자주 다루는 태그
          </p>
          <ul className="flex flex-wrap gap-2">
            {topTags.map(({ tag, count }) => (
              <li key={tag}>
                <Link
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="inline-flex items-center gap-1.5 text-sm px-3 py-1 border border-(--color-border) rounded-full text-(--color-secondary) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
                >
                  <span>#{tag}</span>
                  <span className="text-xs opacity-60">{count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {category === "learn" && (
        <div className="mb-6 pt-10 border-t border-(--color-border)">
          <p className="text-xs font-semibold uppercase tracking-wider text-(--color-accent) mb-2">
            전체 목록 (최신순)
          </p>
          <p className="text-sm text-(--color-secondary)">
            학습 경로 외에 최신순으로 모든 글을 살펴보고 싶다면 아래 목록을 이용하세요.
          </p>
        </div>
      )}

      <PaginatedPostList posts={posts} pageSize={20} />

      <RelatedCategories categories={relatedCategories} />
    </div>
  );
}
