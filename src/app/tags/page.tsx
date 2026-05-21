import Link from "next/link";
import type { Metadata } from "next";
import { getAllTagBuckets } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "태그 인덱스",
  description:
    "운세 참고서의 모든 태그를 한눈에. 관심 키워드로 관련 글을 빠르게 찾아보세요.",
  alternates: { canonical: "/tags" },
};

export default function TagsIndexPage() {
  const tags = getAllTagBuckets();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-(--color-primary) mb-2">
          태그 인덱스
        </h1>
        <p className="text-(--color-secondary)">
          총 {tags.length}개 태그 · 글 수 순으로 정렬했습니다.
        </p>
      </header>

      {tags.length === 0 ? (
        <p className="text-(--color-secondary)">아직 등록된 태그가 없습니다.</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <li key={tag}>
              <Link
                href={`/tags/${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-2 text-sm px-3 py-1.5 border border-(--color-border) rounded-full text-(--color-primary) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
              >
                <span>#{tag}</span>
                <span className="text-xs text-(--color-secondary)">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
