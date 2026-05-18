import Link from "next/link";
import { getAllPosts, getFeaturedPosts } from "@/lib/mdx";
import { CATEGORIES } from "@/lib/categories";
import ArticleCard from "@/components/article/ArticleCard";

export default function HomePage() {
  const featured = getFeaturedPosts(6);
  const recent = getAllPosts().slice(0, 9);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <section className="mb-14 text-center">
        <h1 className="text-4xl font-semibold text-(--color-primary) mb-4">
          운세 참고서
        </h1>
        <p className="text-lg text-(--color-secondary) max-w-xl mx-auto">
          명리학·별자리·타로·꿈해몽을 쉽고 교육적으로 해설합니다.
          <br />
          운세는 참고 도구일 뿐, 선택은 언제나 당신의 몫입니다.
        </p>
      </section>

      <section className="mb-14">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-(--color-accent) mb-6">
          카테고리
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {Object.values(CATEGORIES).map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="block border border-(--color-border) rounded p-4 hover:border-(--color-accent) transition-colors group"
            >
              <p
                className="text-sm font-semibold mb-1 group-hover:text-(--color-accent) transition-colors"
                style={{ color: cat.color }}
              >
                {cat.title}
              </p>
              <p className="text-xs text-(--color-secondary) leading-snug">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mb-14">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-(--color-accent) mb-6">
            추천 글
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((post) => (
              <ArticleCard key={`${post.category}/${post.slug}`} post={post} />
            ))}
          </div>
        </section>
      )}

      {recent.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-(--color-accent) mb-6">
            최근 글
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recent.map((post) => (
              <ArticleCard key={`${post.category}/${post.slug}`} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
