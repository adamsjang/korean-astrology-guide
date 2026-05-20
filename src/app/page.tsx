import Link from "next/link";
import { getAllPosts, getFeaturedPosts, getPostsByCategory } from "@/lib/mdx";
import { CATEGORIES } from "@/lib/categories";
import ArticleCard from "@/components/article/ArticleCard";

const TOOLS = [
  {
    href: "/saju-calculator",
    label: "사주팔자 계산기",
    desc: "생년월일시로 사주팔자와 오행 분포 계산",
    color: "#8B6914",
  },
  {
    href: "/gunghap",
    label: "사주 궁합",
    desc: "두 사람의 일간 오행 관계와 일지 합충 분석",
    color: "#4A2C6E",
  },
  {
    href: "/tarot-reading",
    label: "타로 카드 뽑기",
    desc: "메이저 아르카나 22장 중 오늘의 카드 뽑기",
    color: "#6B2D5E",
  },
  {
    href: "/dream-search",
    label: "꿈해몽 키워드 검색",
    desc: "꿈에서 본 것을 키워드로 검색",
    color: "#4A6741",
  },
];

export default function HomePage() {
  const featured = getFeaturedPosts(5);
  const recent = getAllPosts().slice(0, 6);
  const categoriesWithCount = Object.values(CATEGORIES).map((cat) => ({
    ...cat,
    count: getPostsByCategory(cat.slug).length,
  }));

  return (
    <>
      {/* ── 히어로 ─────────────────────────────────────────────── */}
      <section
        className="border-b border-(--color-border)"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-3xl mx-auto px-4 py-16 sm:py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-accent)" }}>
            운세 참고서
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-(--color-primary) leading-tight mb-5">
            명리학·별자리·타로·꿈해몽을
            <br />
            <span style={{ color: "var(--color-accent)" }}>쉽고 교육적으로</span> 해설합니다
          </h1>
          <p className="text-lg text-(--color-secondary) mb-10 leading-relaxed">
            운세는 정해진 운명이 아니라 자기 이해의 도구입니다.
            <br className="hidden sm:block" />
            130개 이상의 정보성 글과 4가지 계산 도구를 무료로 제공합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/saju-calculator"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              사주팔자 계산기
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/tarot-reading"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border transition-colors hover:border-(--color-accent) hover:text-(--color-accent)"
              style={{ borderColor: "var(--color-border)", color: "var(--color-secondary)" }}
            >
              오늘의 타로 뽑기
            </Link>
          </div>
          <p className="mt-6 text-xs text-(--color-secondary)">
            <Link href="/about" className="hover:text-(--color-primary) underline underline-offset-2">
              이 사이트에 대하여
            </Link>
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">

        {/* ── 처음이시라면 ────────────────────────────────────────── */}
        {featured.length > 0 && (
          <section className="py-12 border-b border-(--color-border)">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-(--color-accent) mb-6">
              처음이시라면
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((post) => (
                <ArticleCard key={`${post.category}/${post.slug}`} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* ── 주제별 콘텐츠 ────────────────────────────────────────── */}
        <section className="py-12 border-b border-(--color-border)">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-(--color-accent) mb-6">
            주제별 콘텐츠
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {categoriesWithCount.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group block border border-(--color-border) rounded-lg p-4 hover:border-(--color-accent) transition-colors"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p
                    className="text-sm font-semibold group-hover:text-(--color-accent) transition-colors leading-snug"
                    style={{ color: cat.color }}
                  >
                    {cat.title}
                  </p>
                  <span className="text-xs text-(--color-secondary) shrink-0 mt-0.5">
                    {cat.count}개
                  </span>
                </div>
                <p className="text-xs text-(--color-secondary) leading-snug">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 최근 글 ─────────────────────────────────────────────── */}
        {recent.length > 0 && (
          <section className="py-12 border-b border-(--color-border)">
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

        {/* ── 도구 모음 ────────────────────────────────────────────── */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-(--color-accent)">
              운세 도구
            </h2>
            <Link
              href="/tools"
              className="text-xs text-(--color-secondary) hover:text-(--color-primary) transition-colors"
            >
              전체 보기 →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group block border border-(--color-border) rounded-lg p-4 hover:border-(--color-accent) transition-colors"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <p
                  className="text-sm font-semibold mb-1.5 group-hover:text-(--color-accent) transition-colors"
                  style={{ color: tool.color }}
                >
                  {tool.label}
                </p>
                <p className="text-xs text-(--color-secondary) leading-snug">
                  {tool.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
