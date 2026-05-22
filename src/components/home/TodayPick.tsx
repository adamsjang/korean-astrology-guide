"use client";

import { useEffect, useMemo, useState } from "react";
import { Post } from "@/types/post";
import ArticleCard from "@/components/article/ArticleCard";

interface Props {
  posts: Post[];
  count?: number;
}

function hash(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = (h * 33) ^ str.charCodeAt(i);
  }
  return h >>> 0;
}

function pickByDate(posts: Post[], date: string, n: number): Post[] {
  if (posts.length === 0) return [];
  const result: Post[] = [];
  const used = new Set<number>();
  for (let i = 0; result.length < n && i < n * 6; i++) {
    const idx = hash(`${date}::${i}`) % posts.length;
    if (used.has(idx)) continue;
    used.add(idx);
    result.push(posts[idx]);
  }
  return result;
}

function todayLabel(date: string): string {
  const d = new Date(`${date}T00:00:00`);
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
}

export default function TodayPick({ posts, count = 3 }: Props) {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  const picks = useMemo(() => {
    if (!today) return posts.slice(0, count);
    return pickByDate(posts, today, count);
  }, [today, posts, count]);

  return (
    <section className="py-12 border-b border-(--color-border)">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-(--color-accent) mb-1">
            오늘의 추천
          </h2>
          <p className="text-sm text-(--color-secondary)">
            {today
              ? `${todayLabel(today)} 의 발견`
              : "오늘 날짜에 어울리는 글 3편"}
          </p>
        </div>
        {today && (
          <p className="text-xs text-(--color-secondary)">
            매일 자정마다 새로 골라드립니다
          </p>
        )}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {picks.map((post) => (
          <ArticleCard key={`${post.category}/${post.slug}`} post={post} />
        ))}
      </div>
    </section>
  );
}
