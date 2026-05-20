import Link from "next/link";
import { Post } from "@/types/post";

interface Props {
  currentSlug: string;
  category: string;
  posts: Post[];
}

export default function RelatedPosts({ currentSlug, posts }: Props) {
  const related = posts.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="mt-12 pt-10 border-t border-(--color-border)">
      <h2 className="text-base font-semibold text-(--color-primary) mb-4">같은 카테고리의 다른 글</h2>
      <div className="flex flex-col gap-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/${post.category}/${post.slug}`}
            className="group block bg-(--color-surface) border border-(--color-border) rounded p-4 hover:border-(--color-accent) transition-colors"
          >
            <h3 className="text-sm font-semibold text-(--color-primary) leading-snug mb-1 group-hover:text-(--color-accent) transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-(--color-secondary) leading-relaxed line-clamp-2 mb-2">
              {post.description}
            </p>
            <span className="text-xs text-(--color-secondary)">{post.readingTime} 읽기</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
