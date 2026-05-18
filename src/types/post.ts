export interface PostFrontmatter {
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  tags: string[];
  featured?: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
  readingTime: string;
}
