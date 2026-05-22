"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Post } from "@/types/post";
import { CATEGORIES } from "@/lib/categories";
import { searchPosts } from "@/lib/search";

function highlight(text: string, query: string) {
  const q = query.trim();
  if (!q) return text;
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return text;
  const escaped = tokens
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const re = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(re);
  return parts.map((part, i) =>
    new RegExp(`^(${escaped})$`, "i").test(part) ? (
      <mark
        key={i}
        className="bg-(--color-accent) text-(--color-surface) rounded-sm px-0.5"
      >
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

interface Props {
  posts: Post[];
  popularTags: { tag: string; count: number }[];
  suggestions: Post[];
}

export default function SearchPage({ posts, popularTags, suggestions }: Props) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [catFilter, setCatFilter] = useState("all");

  const categories = Object.values(CATEGORIES);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const scored = searchPosts(posts, query);
    if (catFilter === "all") return scored;
    return scored.filter((s) => s.post.category === catFilter);
  }, [query, catFilter, posts]);

  function applyTag(tag: string) {
    setQuery(tag);
    setCatFilter("all");
  }

  return (
    <>
      <div className="relative mb-5">
        <input
          type="search"
          placeholder="제목, 설명, 태그로 검색…"
          aria-label="글 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full px-4 py-3 pl-10 rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-primary) placeholder:text-(--color-secondary) focus:outline-none focus:border-(--color-accent) text-sm"
        />
        <svg
          aria-hidden="true"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-secondary)"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
      </div>

      <div role="group" aria-label="카테고리 필터" className="flex flex-wrap gap-2 mb-6">
        {["all", ...categories.map((c) => c.slug)].map((slug) => {
          const cat = slug === "all" ? null : categories.find((c) => c.slug === slug);
          const active = catFilter === slug;
          return (
            <button
              key={slug}
              onClick={() => setCatFilter(slug)}
              aria-pressed={active}
              className="text-xs px-3 py-1.5 rounded-full border transition-colors"
              style={
                active
                  ? {
                      borderColor: cat ? cat.color : "var(--color-accent)",
                      color: cat ? cat.color : "var(--color-accent)",
                      backgroundColor: cat ? `${cat.color}18` : "color-mix(in srgb, var(--color-accent) 8%, transparent)",
                    }
                  : { borderColor: "var(--color-border)", color: "var(--color-secondary)" }
              }
            >
              {slug === "all" ? "전체" : cat?.title}
            </button>
          );
        })}
      </div>

      {!query.trim() ? (
        <>
          {popularTags.length > 0 && (
            <section aria-labelledby="popular-tags-heading" className="mb-10">
              <h2
                id="popular-tags-heading"
                className="text-xs font-semibold uppercase tracking-wider text-(--color-accent) mb-3"
              >
                인기 태그
              </h2>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((t) => (
                  <button
                    key={t.tag}
                    type="button"
                    onClick={() => applyTag(t.tag)}
                    className="text-xs px-2.5 py-1 rounded-full border border-(--color-border) text-(--color-secondary) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
                    style={{ backgroundColor: "var(--color-surface)" }}
                  >
                    #{t.tag} <span className="text-(--color-secondary) opacity-60">{t.count}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {suggestions.length > 0 && (
            <section aria-labelledby="suggestions-heading">
              <h2
                id="suggestions-heading"
                className="text-xs font-semibold uppercase tracking-wider text-(--color-accent) mb-3"
              >
                처음이시라면
              </h2>
              <div className="flex flex-col gap-3">
                {suggestions.map((post) => {
                  const cat = categories.find((c) => c.slug === post.category);
                  return (
                    <Link
                      key={`${post.category}/${post.slug}`}
                      href={`/${post.category}/${post.slug}`}
                      className="group block border border-(--color-border) rounded-lg p-4 hover:border-(--color-accent) transition-colors"
                      style={{ backgroundColor: "var(--color-surface)" }}
                    >
                      {cat && (
                        <span
                          className="inline-block text-xs px-2 py-0.5 rounded mb-2"
                          style={{ color: cat.color, backgroundColor: `${cat.color}18` }}
                        >
                          {cat.title}
                        </span>
                      )}
                      <h3 className="text-sm font-semibold text-(--color-primary) leading-snug mb-1 group-hover:text-(--color-accent) transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-(--color-secondary) leading-relaxed line-clamp-2">
                        {post.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </>
      ) : results.length === 0 ? (
        <>
          <p role="status" aria-live="polite" className="text-center py-10 text-(--color-secondary)">
            <span className="block text-base mb-1">&ldquo;{query}&rdquo; 검색 결과가 없습니다</span>
            <span className="block text-sm">다른 키워드로 검색해보세요</span>
          </p>
          {popularTags.length > 0 && (
            <section aria-labelledby="suggested-tags-heading" className="mt-4">
              <h2
                id="suggested-tags-heading"
                className="text-xs font-semibold uppercase tracking-wider text-(--color-accent) mb-3 text-center"
              >
                이런 태그는 어떠세요
              </h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {popularTags.slice(0, 12).map((t) => (
                  <button
                    key={t.tag}
                    type="button"
                    onClick={() => applyTag(t.tag)}
                    className="text-xs px-2.5 py-1 rounded-full border border-(--color-border) text-(--color-secondary) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
                    style={{ backgroundColor: "var(--color-surface)" }}
                  >
                    #{t.tag}
                  </button>
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <>
          <p role="status" aria-live="polite" className="text-sm text-(--color-secondary) mb-4">
            {results.length}개 결과
          </p>
          <div className="flex flex-col gap-3">
            {results.map(({ post }) => {
              const cat = categories.find((c) => c.slug === post.category);
              return (
                <Link
                  key={`${post.category}/${post.slug}`}
                  href={`/${post.category}/${post.slug}`}
                  className="group block border border-(--color-border) rounded-lg p-4 hover:border-(--color-accent) transition-colors"
                  style={{ backgroundColor: "var(--color-surface)" }}
                >
                  {cat && (
                    <span
                      className="inline-block text-xs px-2 py-0.5 rounded mb-2"
                      style={{ color: cat.color, backgroundColor: `${cat.color}18` }}
                    >
                      {cat.title}
                    </span>
                  )}
                  <h3 className="text-sm font-semibold text-(--color-primary) leading-snug mb-1 group-hover:text-(--color-accent) transition-colors line-clamp-2">
                    {highlight(post.title, query)}
                  </h3>
                  <p className="text-sm text-(--color-secondary) leading-relaxed line-clamp-2">
                    {highlight(post.description, query)}
                  </p>
                  <p className="text-xs text-(--color-secondary) mt-2">{post.readingTime} 읽기</p>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
