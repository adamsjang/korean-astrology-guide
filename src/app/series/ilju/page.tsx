import Link from "next/link";
import type { Metadata } from "next";
import { getIljuSlug } from "@/lib/saju/ilju-slugs";
import CollectionJsonLd from "@/components/seo/CollectionJsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://korean-astrology-guide.pages.dev";

const STEMS_KR = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
const STEMS_H = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES_KR = [
  "자",
  "축",
  "인",
  "묘",
  "진",
  "사",
  "오",
  "미",
  "신",
  "유",
  "술",
  "해",
];
const BRANCHES_H = [
  "子",
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥",
];
const STEM_EL = ["목", "목", "화", "화", "토", "토", "금", "금", "수", "수"];
const STEM_YY = ["양", "음", "양", "음", "양", "음", "양", "음", "양", "음"];

const EL_COLOR: Record<string, string> = {
  목: "#2d6a4f",
  화: "#c0392b",
  토: "#9a7d3a",
  금: "#a4a4a4",
  수: "#1d3557",
};

export const metadata: Metadata = {
  title: "60갑자 일주 시리즈 — 천간 10 × 지지 6 전체 가이드",
  description:
    "사주 명리학에서 일주는 본인의 핵심 정체성을 가리킵니다. 갑자에서 계해까지 60갑자 일주를 한 페이지에서 탐색하고, 천간별로 정리된 6개 일주 가이드로 자신의 일주를 찾아보세요.",
  alternates: { canonical: "/series/ilju" },
};

function buildIljuList(stemIdx: number) {
  const items: { stemIdx: number; branchIdx: number; slug: string }[] = [];
  for (let bi = 0; bi < 12; bi++) {
    const slug = getIljuSlug(stemIdx, bi);
    if (slug) items.push({ stemIdx, branchIdx: bi, slug });
  }
  return items;
}

function buildAllIljuItems() {
  const items: { name: string; url: string }[] = [];
  for (let si = 0; si < 10; si++) {
    for (let bi = 0; bi < 12; bi++) {
      const slug = getIljuSlug(si, bi);
      if (!slug) continue;
      items.push({
        name: `${STEMS_KR[si]}${BRANCHES_KR[bi]} 일주`,
        url: `${SITE_URL}/ilju/${slug}`,
      });
    }
  }
  return items;
}

export default function IljuSeriesPage() {
  const allItems = buildAllIljuItems();
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <CollectionJsonLd
        name="60갑자 일주 시리즈"
        description="갑자에서 계해까지 60갑자 일주를 천간 10 × 지지 6으로 한 페이지에서 탐색."
        url={`${SITE_URL}/series/ilju`}
        items={allItems}
      />
      <header className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-(--color-accent) mb-2">
          시리즈
        </p>
        <h1 className="text-3xl font-semibold text-(--color-primary) mb-4">
          60갑자 일주 — 천간 10 × 지지 6
        </h1>
        <p className="text-(--color-secondary) leading-relaxed">
          사주명리학에서 일주(日柱)는 태어난 날의 천간과 지지를 묶은 두 글자로, 본인의
          핵심 정체성·기질·연애 방식·직업 적성을 드러내는 가장 중요한 자리로 다뤄집니다.
        </p>
      </header>

      <section className="prose prose-stone max-w-none mb-12 prose-headings:font-semibold prose-headings:text-(--color-primary) prose-p:text-(--color-primary) prose-p:leading-[1.85] prose-a:text-(--color-accent)">
        <h2>일주가 무엇이고 왜 중요한가</h2>
        <p>
          사주팔자는 년주·월주·일주·시주 네 기둥으로 구성됩니다. 그중 일주의 천간을
          일간이라고 부르며, 일간은 본인 그 자체를 나타내는 자리입니다. 다른 일곱 글자는
          모두 이 일간을 기준으로 해석됩니다. 예를 들어 같은 비견·식상·재성·관성·인성
          같은 십신 관계도, 어떤 천간이 일간이냐에 따라 의미가 완전히 달라집니다.
        </p>
        <p>
          일주는 일간 하나만으로 보지 않습니다. 일간 아래의 지지(일지)는 본인의 내적
          기반·배우자궁·잠재적 욕구를 보여 줍니다. 갑목이 자수 위에 앉은 갑자 일주와,
          같은 갑목이 오화 위에 앉은 갑오 일주는 같은 갑목이라도 흐름과 성격이 다릅니다.
          일주는 일간과 일지의 결합으로, 한 사람의 본질을 가장 압축적으로 보여주는
          단위라고 봐도 무방합니다.
        </p>
        <h2>60갑자의 구조</h2>
        <p>
          천간 10개와 지지 12개를 일대일로 짝지으면 단순 계산으로는 120개가 되지만,
          음양은 같은 음양끼리만 짝지어집니다. 양간은 양지와, 음간은 음지와만 결합하므로
          실제로는 60개의 조합만 생깁니다. 이것이 60갑자이고, 일주의 모든 경우의 수가
          됩니다. 한 사람의 일주는 60일에 한 번씩 돌아오므로, 약 60일 단위로 같은 일주를
          가진 사람들이 다시 태어납니다.
        </p>
        <p>
          아래 표는 천간 10개를 행으로 두고, 각 천간이 만나는 6개의 지지를 묶어
          정리했습니다. 본인의 일주를 모르신다면 먼저 사주 계산기로 일주를 확인하시고,
          해당 일주 가이드를 펼쳐 자신의 기질과 흐름을 비교해 보세요. 일주 해석은 단정이
          아니라 자기 이해의 출발점입니다.
        </p>
        <p>
          <Link href="/saju-calculator">
            사주 계산기로 내 일주 먼저 찾아보기
          </Link>
        </p>
      </section>

      <section className="space-y-8">
        {STEMS_KR.map((stem, si) => {
          const items = buildIljuList(si);
          if (items.length === 0) return null;
          const el = STEM_EL[si];
          const yy = STEM_YY[si];
          const color = EL_COLOR[el];

          return (
            <div key={stem}>
              <header className="flex items-baseline gap-3 mb-4 pb-2 border-b border-(--color-border)">
                <span
                  className="text-2xl font-semibold"
                  style={{ color }}
                >
                  {stem}
                </span>
                <span className="text-lg text-(--color-secondary)">
                  {STEMS_H[si]}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded"
                  style={{ color, backgroundColor: `${color}18` }}
                >
                  {el} · {yy}
                </span>
                <span className="text-sm text-(--color-secondary) ml-auto">
                  {items.length}개 일주
                </span>
              </header>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {items.map(({ branchIdx, slug }) => (
                  <li key={slug}>
                    <Link
                      href={`/ilju/${slug}`}
                      className="block p-3 border border-(--color-border) rounded text-center hover:border-(--color-accent) transition-colors group"
                    >
                      <p
                        className="text-base font-semibold group-hover:text-(--color-accent) transition-colors"
                        style={{ color }}
                      >
                        {stem}
                        {BRANCHES_KR[branchIdx]}
                      </p>
                      <p className="text-xs text-(--color-secondary) mt-0.5">
                        {STEMS_H[si]}
                        {BRANCHES_H[branchIdx]}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <footer className="mt-16 pt-8 border-t border-(--color-border) text-sm text-(--color-secondary) leading-relaxed">
        <p>
          일주는 자기 이해의 한 도구이며, 운명을 단정하는 잣대가 아닙니다. 같은 일주여도
          월주·시주·대운에 따라 흐름이 크게 달라지므로 전체 사주 흐름과 함께 봐 주세요.
        </p>
      </footer>
    </div>
  );
}
