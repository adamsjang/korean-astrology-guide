import { getPostBySlug } from "@/lib/mdx";
import type { Post } from "@/types/post";

export interface LearnStage {
  level: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  description: string;
  slugs: string[];
}

/**
 * Curated reading order for the learn (명리학 기초) category.
 * Order matters — the path answers "what should I read next?".
 * All 28 published learn articles are placed; any new file added to
 * src/content/learn/ should be appended to the right stage so the path
 * stays exhaustive.
 *
 * Slugs are validated at module load (getLearnStages) — a typo or a
 * file deletion throws during the build so broken links never ship.
 */
const STAGES: LearnStage[] = [
  {
    level: 1,
    title: "Level 1 · 입문",
    subtitle: "음양·오행부터 사주 4기둥까지",
    description:
      "명리학을 처음 접하는 분이 가장 먼저 익혀야 하는 기본 개념입니다. 음양·오행의 의미, 천간·지지 22글자, 사주팔자가 어떻게 구성되는지 차근차근 봅니다.",
    slugs: [
      "yin-yang-basics",
      "oheng-basics",
      "cheongan-10gods",
      "jiji-12branches",
      "saju-structure",
      "what-is-ilju",
      "how-to-read-saju",
    ],
  },
  {
    level: 2,
    title: "Level 2 · 중급",
    subtitle: "일간·십성·신강신약·용신",
    description:
      "기초 개념을 갖췄다면 본인의 일간을 중심으로 사주를 해석하는 핵심 도구들을 익힙니다. 십성·신강신약·합충·용신·대운까지 — 명리학 해석의 뼈대입니다.",
    slugs: [
      "ilgan-characteristics",
      "ten-stems-personality",
      "twelve-branches-personality",
      "sipseong-guide",
      "singnyak-gang",
      "hapchung-guide",
      "yongshin-guide",
      "daeun-seun",
    ],
  },
  {
    level: 3,
    title: "Level 3 · 심화",
    subtitle: "격국·신살·십이운성·시기론",
    description:
      "기본 해석을 넘어 사주의 격(格)을 파악하고 신살·십이운성·공망 같은 보조 개념을 다룹니다. 오행 균형과 시기론까지 익히면 단순한 해석을 넘어 입체적 분석이 가능합니다.",
    slugs: [
      "gyeokguk-basics",
      "sibi-unseong",
      "sinsal-basics",
      "gongmang-guide",
      "oheng-balance",
      "saju-timing",
    ],
  },
  {
    level: 4,
    title: "Level 4 · 실전 응용",
    subtitle: "삶의 구체적 질문에 사주 적용하기",
    description:
      "도구를 모두 갖췄다면 이제 실전입니다. 연애·결혼·직업·재물·건강·인간관계처럼 우리가 사주에서 가장 자주 묻는 주제별로 무엇을 어떻게 봐야 하는지 정리했습니다.",
    slugs: [
      "saju-relationship-pattern",
      "saju-love-reading",
      "saju-marriage",
      "saju-parents",
      "saju-career",
      "saju-wealth",
      "saju-health",
    ],
  },
];

export interface ResolvedLearnStage extends Omit<LearnStage, "slugs"> {
  posts: Post[];
}

export function getLearnStages(): ResolvedLearnStage[] {
  return STAGES.map((stage) => ({
    level: stage.level,
    title: stage.title,
    subtitle: stage.subtitle,
    description: stage.description,
    posts: stage.slugs.map((slug) => {
      const post = getPostBySlug("learn", slug);
      if (!post) {
        throw new Error(
          `learn-path.ts references missing article: learn/${slug}.mdx — fix the slug or remove it from STAGES`
        );
      }
      return post;
    }),
  }));
}
