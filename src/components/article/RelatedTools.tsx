import Link from "next/link";

const CATEGORY_TOOLS: Record<string, { href: string; label: string }[]> = {
  dream:         [{ href: "/dream-search",    label: "꿈해몽 키워드 검색" }],
  tarot:         [{ href: "/tarot-reading",   label: "타로 카드 뽑기" }],
  column:        [{ href: "/saju-calculator", label: "사주팔자 계산기" }, { href: "/gunghap", label: "사주 궁합" }],
  learn:         [{ href: "/saju-calculator", label: "사주팔자 계산기" }],
  compatibility: [{ href: "/gunghap",         label: "사주 궁합" }, { href: "/saju-calculator", label: "사주팔자 계산기" }],
  "zodiac-animal":[{ href: "/saju-calculator", label: "사주팔자 계산기" }],
  zodiac:        [{ href: "/tarot-reading",   label: "타로 카드 뽑기" }],
  palmistry:     [{ href: "/saju-calculator", label: "사주팔자 계산기" }],
  physiognomy:   [{ href: "/saju-calculator", label: "사주팔자 계산기" }],
  "fortune-guide":[{ href: "/saju-calculator", label: "사주팔자 계산기" }, { href: "/tarot-reading", label: "타로 카드 뽑기" }],
};

interface Props {
  category: string;
}

export default function RelatedTools({ category }: Props) {
  const tools = CATEGORY_TOOLS[category];
  if (!tools || tools.length === 0) return null;

  return (
    <section className="mt-8 pt-8 border-t border-(--color-border)">
      <p className="text-xs font-semibold uppercase tracking-wider text-(--color-secondary) mb-3">
        함께 사용해보세요
      </p>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border border-(--color-border) text-(--color-secondary) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            {tool.label}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  );
}
