import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";
import { getCategory } from "@/lib/categories";

interface Props {
  post: Post;
}

export default function ArticleCard({ post }: Props) {
  const cat = getCategory(post.category);
  const imgUrl = post.image ?? cat?.image;
  const hasImage = Boolean(imgUrl);

  return (
    <Link
      href={`/${post.category}/${post.slug}`}
      className="group block bg-(--color-surface) border border-(--color-border) rounded overflow-hidden hover:border-(--color-accent) transition-colors"
    >
      {hasImage && imgUrl && (
        <div className="relative aspect-[16/9] bg-(--color-base) overflow-hidden">
          <Image
            src={imgUrl}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5">
        {cat && (
          <span
            className="inline-block text-xs font-medium px-2 py-0.5 rounded mb-3"
            style={{ color: cat.color, backgroundColor: `${cat.color}18` }}
          >
            {cat.title}
          </span>
        )}
        <h3 className="text-base font-semibold text-(--color-primary) leading-snug mb-2 group-hover:text-(--color-accent) transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-(--color-secondary) leading-relaxed line-clamp-2 mb-3">
          {post.description}
        </p>
        <div className="flex items-center gap-3 text-xs text-(--color-secondary)">
          <time dateTime={post.publishedAt}>{post.publishedAt}</time>
          <span>·</span>
          <span>{post.readingTime} 읽기</span>
        </div>
      </div>
    </Link>
  );
}
