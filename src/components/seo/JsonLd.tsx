import { Post } from "@/types/post";

interface Props {
  post: Post;
  url: string;
}

export default function JsonLd({ post, url }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    url,
    publisher: {
      "@type": "Organization",
      name: "운세 참고서",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
