import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getPostsByCategory } from "@/lib/mdx";
import { getCategory } from "@/lib/categories";
import DisclaimerBanner from "@/components/article/DisclaimerBanner";
import RelatedPosts from "@/components/article/RelatedPosts";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: `/${category}/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      ...(post.image ? { images: [{ url: post.image, width: 400, height: 700 }] } : {}),
    },
    twitter: {
      card: post.image ? "summary_large_image" : "summary",
      ...(post.image ? { images: [post.image] } : {}),
    },
  };
}

export const dynamicParams = false;

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);
  if (!post) notFound();

  const relatedPosts = getPostsByCategory(category);

  const cat = getCategory(category);

  const { default: Content } = await import(
    `@/content/${category}/${slug}.mdx`
  );

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://korean-astrology-guide.pages.dev";

  return (
    <>
      <JsonLd post={post} url={`${siteUrl}/${category}/${slug}`} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-(--color-secondary) mb-8">
          <Link href="/" className="hover:text-(--color-primary)">홈</Link>
          <span>›</span>
          {cat && (
            <>
              <Link href={`/${category}`} className="hover:text-(--color-primary)">{cat.title}</Link>
              <span>›</span>
            </>
          )}
          <span className="text-(--color-primary) line-clamp-1">{post.title}</span>
        </nav>

        <header className="mb-10">
          {cat && (
            <span
              className="inline-block text-xs font-medium px-2 py-0.5 rounded mb-4"
              style={{ color: cat.color, backgroundColor: `${cat.color}18` }}
            >
              {cat.title}
            </span>
          )}
          <h1 className="text-3xl font-semibold text-(--color-primary) leading-snug mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-(--color-secondary) leading-relaxed mb-4">
            {post.description}
          </p>
          <div className="flex items-center gap-3 text-sm text-(--color-secondary)">
            <time>{post.publishedAt}</time>
            <span>·</span>
            <span>{post.readingTime} 읽기</span>
          </div>
        </header>

        <div className="prose prose-stone max-w-none prose-headings:font-semibold prose-headings:text-(--color-primary) prose-p:text-(--color-primary) prose-p:leading-[1.85] prose-a:text-(--color-accent) prose-strong:text-(--color-primary)">
          <Content />
        </div>

        <RelatedPosts currentSlug={slug} category={category} posts={relatedPosts} />
        <DisclaimerBanner />
      </div>
    </>
  );
}
