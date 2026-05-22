import type { Post } from "@/types/post";

export interface ScoredPost {
  post: Post;
  score: number;
}

export function tokenize(query: string): string[] {
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean);
}

export function searchPosts(posts: Post[], query: string): ScoredPost[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const fullQuery = tokens.join(" ");
  const scored: ScoredPost[] = [];

  for (const post of posts) {
    const title = post.title.toLowerCase();
    const desc = post.description.toLowerCase();
    const tags = post.tags.map((t) => t.toLowerCase());

    let score = 0;
    let allTokensMatch = true;

    for (const tok of tokens) {
      let tokenScore = 0;
      if (title === tok) tokenScore += 200;
      else if (title.includes(tok)) tokenScore += 100;

      if (tags.some((t) => t === tok)) tokenScore += 80;
      else if (tags.some((t) => t.includes(tok))) tokenScore += 50;

      if (desc.includes(tok)) tokenScore += 30;

      if (tokenScore === 0) {
        allTokensMatch = false;
        break;
      }
      score += tokenScore;
    }

    if (!allTokensMatch) continue;

    if (tokens.length > 1) {
      if (title.includes(fullQuery)) score += 100;
      else if (desc.includes(fullQuery)) score += 30;
    }

    scored.push({ post, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored;
}
