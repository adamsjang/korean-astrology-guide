import { getPostsByCategory } from "@/lib/mdx";
import DreamSearch from "./DreamSearch";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "꿈해몽 키워드 검색",
  description: "꿈에서 본 것을 키워드로 검색해보세요. 뱀, 불, 고양이, 돈 등 다양한 꿈해몽을 찾을 수 있습니다.",
  alternates: { canonical: "/dream-search" },
};

export default function DreamSearchPage() {
  const posts = getPostsByCategory("dream");

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#4A6741" }}>
        꿈해몽
      </p>
      <h1 className="text-3xl font-semibold text-(--color-primary) mb-3">꿈해몽 키워드 검색</h1>
      <p className="text-(--color-secondary) mb-8 leading-relaxed">
        꿈에서 본 것을 입력하면 관련 해몽을 찾아드립니다.
      </p>
      <DreamSearch posts={posts} />
    </div>
  );
}
