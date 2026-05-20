import Link from "next/link";
import type { Post } from "@/types/post";

interface Props {
  currentSlug: string;
  posts: Post[];
}

export default function PrevNextNav({ currentSlug, posts }: Props) {
  const idx = posts.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return null;

  // posts는 최신순(내림차순) — 이전 글 = 오래된 것(idx+1), 다음 글 = 최신(idx-1)
  const older = posts[idx + 1] ?? null;
  const newer = posts[idx - 1] ?? null;
  if (!older && !newer) return null;

  return (
    <nav className="mt-8 pt-8 border-t border-(--color-border) grid grid-cols-2 gap-3 text-sm">
      <div>
        {older && (
          <Link
            href={`/${older.category}/${older.slug}`}
            className="group flex flex-col gap-1 p-3 rounded-lg border border-(--color-border) hover:border-(--color-accent) transition-colors"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            <span className="text-xs text-(--color-secondary)">← 이전 글</span>
            <span className="font-medium text-(--color-primary) group-hover:text-(--color-accent) transition-colors line-clamp-2 leading-snug">
              {older.title}
            </span>
          </Link>
        )}
      </div>
      <div>
        {newer && (
          <Link
            href={`/${newer.category}/${newer.slug}`}
            className="group flex flex-col gap-1 p-3 rounded-lg border border-(--color-border) hover:border-(--color-accent) transition-colors text-right"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            <span className="text-xs text-(--color-secondary)">다음 글 →</span>
            <span className="font-medium text-(--color-primary) group-hover:text-(--color-accent) transition-colors line-clamp-2 leading-snug">
              {newer.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
