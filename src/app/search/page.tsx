import { Suspense } from "react";
import { getAllPosts, getAllTagBuckets, getFeaturedPosts } from "@/lib/mdx";
import SearchPage from "./SearchPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "글 검색",
  description: "운세 참고서의 전체 글을 검색합니다.",
  robots: { index: false, follow: true },
};

export default function SearchRoute() {
  const posts = getAllPosts();
  const popularTags = getAllTagBuckets()
    .filter((b) => b.count >= 3)
    .slice(0, 16);
  const suggestions = getFeaturedPosts(3);
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold text-(--color-primary) mb-6">글 검색</h1>
      <Suspense fallback={null}>
        <SearchPage posts={posts} popularTags={popularTags} suggestions={suggestions} />
      </Suspense>
    </div>
  );
}
