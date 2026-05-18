import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/mdx";
import { getCategory, ALL_CATEGORY_SLUGS } from "@/lib/categories";
import ArticleCard from "@/components/article/ArticleCard";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return ALL_CATEGORY_SLUGS.map((slug) => ({ category: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return {
    title: cat.title,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const posts = getPostsByCategory(category);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: cat.color }}
        >
          카테고리
        </p>
        <h1 className="text-3xl font-semibold text-(--color-primary) mb-2">
          {cat.title}
        </h1>
        <p className="text-(--color-secondary)">{cat.description}</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-(--color-secondary)">아직 작성된 글이 없습니다.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
