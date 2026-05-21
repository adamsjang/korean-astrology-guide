import { Post } from "@/types/post";
import { getCategory } from "@/lib/categories";

interface Props {
  post: Post;
  url: string;
}

export default function JsonLd({ post, url }: Props) {
  const cat = getCategory(post.category);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://korean-astrology-guide.pages.dev";

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    inLanguage: "ko",
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    keywords: (post.tags ?? []).join(", "),
    articleSection: cat?.title ?? post.category,
    url,
    mainEntityOfPage: url,
    author: {
      "@type": "Organization",
      name: "운세 참고서",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "운세 참고서",
      url: siteUrl,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: `${siteUrl}/`,
      },
      ...(cat
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: cat.title,
              item: `${siteUrl}/${cat.slug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: cat ? 3 : 2,
        name: post.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
