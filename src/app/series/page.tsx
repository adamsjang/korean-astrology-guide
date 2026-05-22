import Link from "next/link";
import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/mdx";
import CollectionJsonLd from "@/components/seo/CollectionJsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://korean-astrology-guide.pages.dev";

const TITLE = "기획 시리즈 모음 — 일주·별자리·타로 메이저 아르카나";
const DESCRIPTION =
  "운세 참고서가 한 주제를 끝까지 다루는 기획 시리즈를 모았습니다. 60갑자 일주, 12별자리, 타로 메이저 아르카나 22장 — 각 시리즈는 같은 형식과 깊이로 정리해 비교하며 읽기 좋습니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/series" },
  keywords: [
    "시리즈",
    "기획 시리즈",
    "60갑자 일주",
    "일주 가이드",
    "12별자리",
    "별자리 시리즈",
    "타로 메이저 아르카나",
    "메이저 아르카나 22장",
  ],
};

interface SeriesCard {
  href: string;
  label: string;
  subtitle: string;
  description: string;
  count: number;
  countSuffix: string;
  color: string;
}

export default function SeriesIndexPage() {
  const iljuCount = getPostsByCategory("ilju").length;
  const zodiacCount = getPostsByCategory("zodiac").length;
  const tarotCount = getPostsByCategory("tarot").length;

  const cards: SeriesCard[] = [
    {
      href: "/series/ilju",
      label: "60갑자 일주",
      subtitle: "갑자 ~ 계해, 천간 10 × 지지 6",
      description:
        "사주에서 자신을 나타내는 일주(日柱)의 모든 조합을 한자리에 정리했습니다. 자신의 일주를 찾아 기질과 특성을 깊이 이해할 수 있습니다.",
      count: iljuCount,
      countSuffix: "글",
      color: "#4A5568",
    },
    {
      href: "/series/zodiac",
      label: "12별자리",
      subtitle: "양자리 ~ 물고기자리, 양력 생일순",
      description:
        "서양 점성술 12궁의 성격·연애 스타일·궁합을 같은 형식으로 정리했습니다. 자신의 별자리와 잘 맞는 별자리를 한 곳에서 비교해 보세요.",
      count: zodiacCount,
      countSuffix: "글",
      color: "#1B3A6B",
    },
    {
      href: "/series/tarot-major",
      label: "타로 메이저 아르카나",
      subtitle: "0번 바보 ~ 21번 세계, 22장",
      description:
        "타로의 핵심인 메이저 아르카나 22장을 0번부터 21번까지 순서대로 다룹니다. 카드 한 장마다 상징·정방향·역방향 해석을 비교하며 익힐 수 있습니다.",
      count: tarotCount,
      countSuffix: "글",
      color: "#6B2D5E",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <CollectionJsonLd
        name={TITLE}
        description={DESCRIPTION}
        url={`${SITE_URL}/series`}
        items={cards.map((c) => ({ name: c.label, url: `${SITE_URL}${c.href}` }))}
      />
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-(--color-accent) mb-2">
          기획 시리즈
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold text-(--color-primary) mb-4 leading-tight">
          시리즈 모음
        </h1>
        <p className="text-base text-(--color-secondary) leading-relaxed max-w-3xl">
          한 가지 주제를 같은 형식과 같은 깊이로 끝까지 다루는 기획 시리즈입니다.
          하나의 시리즈를 처음부터 끝까지 읽으면, 그 주제의 전체 지도를 그릴 수
          있도록 구성했습니다. 가벼운 호기심으로 한 편씩 따라 읽어도 좋고,
          본인의 일주·별자리·관심 카드를 골라 그것부터 펼쳐 봐도 좋습니다.
        </p>
      </header>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {cards.map((card) => (
          <li key={card.href}>
            <Link
              href={card.href}
              className="group block h-full bg-(--color-surface) border border-(--color-border) rounded-lg p-5 hover:border-(--color-accent) transition-colors"
            >
              <div className="flex items-baseline justify-between mb-3">
                <span
                  className="inline-block text-xs font-semibold px-2 py-0.5 rounded"
                  style={{ color: card.color, backgroundColor: `${card.color}18` }}
                >
                  시리즈
                </span>
                {card.count > 0 && (
                  <span className="text-xs text-(--color-secondary)">
                    {card.count}
                    {card.countSuffix}
                  </span>
                )}
              </div>
              <h2
                className="text-lg font-semibold leading-snug mb-1 group-hover:text-(--color-accent) transition-colors"
                style={{ color: card.color }}
              >
                {card.label}
              </h2>
              <p className="text-xs text-(--color-secondary) mb-3">{card.subtitle}</p>
              <p className="text-sm text-(--color-secondary) leading-relaxed">
                {card.description}
              </p>
              <p className="mt-4 text-sm font-medium text-(--color-accent)">
                시리즈 들어가기 →
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <section className="pt-8 border-t border-(--color-border)">
        <h2 className="text-base font-semibold text-(--color-primary) mb-2">
          시리즈는 이렇게 활용해 보세요
        </h2>
        <ul className="text-sm text-(--color-secondary) leading-relaxed space-y-1.5 ml-5 list-disc">
          <li>
            본인을 가리키는 한 항목(예: 본인 일주, 본인 별자리)부터 펼쳐 읽으면
            진입이 쉽습니다.
          </li>
          <li>
            가까운 사람의 항목을 함께 읽으면 같은 관점으로 두 사람을 비교할 수
            있습니다.
          </li>
          <li>
            시리즈의 처음부터 끝까지 읽으면 그 주제의 전체 지도(천간·지지 체계,
            12궁 원소, 메이저 아르카나 여정)가 그려집니다.
          </li>
        </ul>
      </section>
    </div>
  );
}
