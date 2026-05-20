"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Post } from "@/types/post";
import { CATEGORIES } from "@/lib/categories";

export default function SearchPage({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [catFilter, setCatFilter] = useState("all");

  const categories = Object.values(CATEGORIES);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return posts.filter((p) => {
      const matchQ =
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchC = catFilter === "all" || p.category === catFilter;
      return matchQ && matchC;
    });
  }, [query, catFilter, posts]);

  return (
    <>
      <div className="relative mb-5">
        <input
          type="search"
          placeholder="제목, 설명, 태그로 검색…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full px-4 py-3 pl-10 rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-primary) placeholder:text-(--color-secondary) focus:outline-none focus:border-(--color-accent) text-sm"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-secondary)"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {["all", ...categories.map((c) => c.slug)].map((slug) => {
          const cat = slug === "all" ? null : categories.find((c) => c.slug === slug);
          const active = catFilter === slug;
          return (
            <button
              key={slug}
              onClick={() => setCatFilter(slug)}
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
        <div className="text-center py-20 text-(--color-secondary)">
          <p className="text-base">검색어를 입력하세요</p>
          <p className="text-sm mt-1 text-(--color-secondary)">제목·설명·태그 기준으로 검색합니다</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-20 text-(--color-secondary)">
          <p className="text-base mb-1">검색 결과가 없습니다</p>
          <p className="text-sm">다른 키워드로 검색해보세요</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-(--color-secondary) mb-4">{results.length}개 결과</p>
          <div className="flex flex-col gap-3">
            {results.map((post) => {
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
