import Link from "next/link";

export const metadata = {
  title: "운세 도구 모음",
  description: "사주팔자 계산기, 사주 궁합, 타로 뽑기, 꿈해몽 키워드 검색 등 운세 관련 도구를 모았습니다.",
  alternates: { canonical: "/tools" },
};

const TOOL_CARDS = [
  {
    href: "/saju-calculator",
    label: "사주팔자 계산기",
    description: "생년월일시와 성별을 입력하면 사주팔자·오행 분포·대운·세운을 계산합니다.",
    color: "var(--color-accent)",
  },
  {
    href: "/gunghap",
    label: "사주 궁합",
    description: "두 사람의 사주를 비교해 일간 오행 관계와 일지 합충을 분석합니다.",
    color: "#4A2C6E",
  },
  {
    href: "/tarot-reading",
    label: "타로 카드 뽑기",
    description: "연애·직업·재물 등 10가지 질문 테마를 선택한 후 메이저 아르카나 카드를 뽑습니다.",
    color: "#6B2D5E",
  },
  {
    href: "/dream-search",
    label: "꿈해몽 키워드 검색",
    description: "꿈에서 본 것을 키워드로 검색해 관련 해몽을 찾아봅니다.",
    color: "#4A6741",
  },
  {
    href: "/search",
    label: "전체 글 검색",
    description: "170개 이상의 글을 제목·설명·태그로 검색하고 카테고리별로 필터링합니다.",
    color: "#374151",
  },
];

export default function ToolsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--color-accent)" }}>
        도구
      </p>
      <h1 className="text-3xl font-semibold text-(--color-primary) mb-2">운세 도구</h1>
      <p className="text-(--color-secondary) mb-8 text-sm leading-relaxed">
        사주·타로·꿈해몽을 더 쉽게 탐색하는 도구 모음입니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TOOL_CARDS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="tool-card relative rounded-xl border bg-(--color-surface) p-5 transition-colors"
            style={
              {
                borderColor: "var(--color-border)",
                "--tool-color": tool.color,
              } as React.CSSProperties
            }
          >
            <h2 className="text-base font-semibold text-(--color-primary) mb-2">
              {tool.label}
            </h2>
            <p className="text-sm text-(--color-secondary) leading-relaxed pr-6">
              {tool.description}
            </p>
            <svg
              className="absolute bottom-4 right-4 w-4 h-4 text-(--color-border)"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      <style>{`
        .tool-card:hover {
          border-color: var(--tool-color) !important;
        }
      `}</style>
    </div>
  );
}
