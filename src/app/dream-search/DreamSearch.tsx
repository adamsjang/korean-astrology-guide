"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Post } from "@/types/post";

interface Props {
  posts: Post[];
}

export default function DreamSearch({ posts }: Props) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query, posts]);

  return (
    <>
      <div className="relative mb-8">
        <input
          type="search"
          placeholder="꿈 키워드 검색 (예: 뱀, 불, 결혼…)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 pl-10 rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-primary) placeholder:text-(--color-secondary) focus:outline-none focus:border-(--color-accent) text-sm"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-secondary)"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
      </div>

      {query && (
        <p className="text-sm text-(--color-secondary) mb-4">
          &quot;{query}&quot; 검색 결과 {results.length}개
        </p>
      )}

      {results.length === 0 ? (
        <div className="text-center py-16 text-(--color-secondary)">
          <p className="text-lg mb-2">검색 결과가 없습니다</p>
          <p className="text-sm">다른 키워드로 검색해보세요</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {results.map((post) => (
            <Link
              key={post.slug}
              href={`/dream/${post.slug}`}
              className="group flex gap-4 bg-(--color-surface) border border-(--color-border) rounded-lg p-4 hover:border-(--color-accent) transition-colors"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-16 h-16 object-cover rounded flex-shrink-0"
                />
              )}
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-(--color-primary) leading-snug mb-1 group-hover:text-(--color-accent) transition-colors line-clamp-1">
                  {post.title}
                </h3>
                <p className="text-sm text-(--color-secondary) leading-relaxed line-clamp-2 mb-2">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs text-(--color-secondary) bg-(--color-base) px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
