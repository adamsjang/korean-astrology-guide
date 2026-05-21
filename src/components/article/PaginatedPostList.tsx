"use client";

import { useState } from "react";
import { Post } from "@/types/post";
import ArticleCard from "@/components/article/ArticleCard";

interface Props {
  posts: Post[];
  pageSize?: number;
}

export default function PaginatedPostList({ posts, pageSize = 20 }: Props) {
  const [visible, setVisible] = useState(pageSize);

  if (posts.length === 0) {
    return (
      <p className="text-(--color-secondary)">아직 작성된 글이 없습니다.</p>
    );
  }

  const shown = posts.slice(0, visible);
  const remaining = posts.length - visible;

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shown.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
      {remaining > 0 && (
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() =>
              setVisible((v) => Math.min(v + pageSize, posts.length))
            }
            className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 border border-(--color-border) rounded-lg text-(--color-primary) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
          >
            더 보기
            <span className="text-xs text-(--color-secondary)">
              ({Math.min(pageSize, remaining)}개 / {remaining} 남음)
            </span>
          </button>
        </div>
      )}
    </>
  );
}
