import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { CATEGORIES } from "@/lib/categories";
import ArticleCard from "@/components/article/ArticleCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const recent = getAllPosts().slice(0, 6);
  const categories = Object.values(CATEGORIES);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-(--color-accent) mb-2">
          404
        </p>
        <h1 className="text-3xl font-semibold text-(--color-primary) mb-3">
          페이지를 찾을 수 없어요
        </h1>
        <p className="text-(--color-secondary) leading-relaxed">
          주소가 바뀌었거나 잘못 입력된 URL일 수 있습니다.
          <br />
          아래에서 원하는 글을 찾아보세요.
        </p>
        <div className="mt-6">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-(--color-border) text-(--color-primary) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            글 검색하기
          </Link>
        </div>
      </header>

      <section className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-(--color-accent) mb-4">
          카테고리 둘러보기
        </p>
        <ul className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/${cat.slug}`}
                className="inline-block text-sm px-3 py-1.5 border border-(--color-border) rounded-full text-(--color-secondary) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
                style={{ color: cat.color }}
              >
                {cat.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {recent.length > 0 && (
        <section>
          <p className="text-xs font-semibold uppercase tracking-wider text-(--color-accent) mb-4">
            최근 글
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recent.map((post) => (
              <ArticleCard
                key={`${post.category}/${post.slug}`}
                post={post}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
