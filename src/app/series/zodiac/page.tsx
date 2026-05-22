import Link from "next/link";
import type { Metadata } from "next";

const ZODIACS = [
  { slug: "aries", ko: "양자리", symbol: "♈", element: "불", date: "3.21–4.19", color: "#c0392b" },
  { slug: "taurus", ko: "황소자리", symbol: "♉", element: "흙", date: "4.20–5.20", color: "#7d6b3a" },
  { slug: "gemini", ko: "쌍둥이자리", symbol: "♊", element: "공기", date: "5.21–6.21", color: "#e1a437" },
  { slug: "cancer", ko: "게자리", symbol: "♋", element: "물", date: "6.22–7.22", color: "#5b8bb0" },
  { slug: "leo", ko: "사자자리", symbol: "♌", element: "불", date: "7.23–8.22", color: "#c0392b" },
  { slug: "virgo", ko: "처녀자리", symbol: "♍", element: "흙", date: "8.23–9.22", color: "#7d6b3a" },
  { slug: "libra", ko: "천칭자리", symbol: "♎", element: "공기", date: "9.23–10.22", color: "#e1a437" },
  { slug: "scorpio", ko: "전갈자리", symbol: "♏", element: "물", date: "10.23–11.21", color: "#5b8bb0" },
  { slug: "sagittarius", ko: "사수자리", symbol: "♐", element: "불", date: "11.22–12.21", color: "#c0392b" },
  { slug: "capricorn", ko: "염소자리", symbol: "♑", element: "흙", date: "12.22–1.19", color: "#7d6b3a" },
  { slug: "aquarius", ko: "물병자리", symbol: "♒", element: "공기", date: "1.20–2.18", color: "#e1a437" },
  { slug: "pisces", ko: "물고기자리", symbol: "♓", element: "물", date: "2.19–3.20", color: "#5b8bb0" },
];

export const metadata: Metadata = {
  title: "12별자리 시리즈 — 성격·연애·궁합 전체 가이드",
  description:
    "서양 점성술의 12별자리(양자리~물고기자리)를 한 곳에서 탐색하세요. 각 별자리별 성격·연애 스타일·궁합 가이드를 양력 생일 순서로 정리했습니다.",
  alternates: { canonical: "/series/zodiac" },
};

export default function ZodiacSeriesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-(--color-accent) mb-2">
          시리즈
        </p>
        <h1 className="text-3xl font-semibold text-(--color-primary) mb-4">
          12별자리 시리즈 — 양자리부터 물고기자리까지
        </h1>
        <p className="text-(--color-secondary) leading-relaxed">
          서양 점성술은 태양이 태어난 날에 지나는 황도 12궁을 기준으로 사람의 기질을
          분류합니다.
        </p>
      </header>

      <section className="prose prose-stone max-w-none mb-10 prose-headings:font-semibold prose-headings:text-(--color-primary) prose-p:text-(--color-primary) prose-p:leading-[1.85] prose-a:text-(--color-accent)">
        <h2>별자리는 어떤 정보를 담고 있는가</h2>
        <p>
          별자리(태양 별자리)는 태양이 황도 위 어느 12궁에 자리할 때 태어났는지를
          나타냅니다. 양력 생일 하나만 알면 누구나 확인할 수 있을 만큼 진입 장벽이
          낮고, 같은 별자리를 가진 사람들끼리 공유하는 기본 기질이 있다는 점에서
          자기 이해의 출발점으로 자주 활용됩니다. 다만 별자리 하나로 사람의 모든 면을
          단정하기는 어렵습니다. 점성술은 본래 태양·달·수성·금성·화성 등 여러 행성의
          위치를 모두 살펴보는 학문이며, 태양 별자리는 그중 가장 잘 알려진 한 조각일
          뿐입니다.
        </p>
        <p>
          12별자리는 네 가지 원소(불·흙·공기·물)로 묶입니다. 불 원소(양·사자·사수)는
          행동력과 직진하는 추진력을, 흙 원소(황소·처녀·염소)는 안정과 현실 감각을,
          공기 원소(쌍둥이·천칭·물병)는 관계와 사고의 유연함을, 물 원소(게·전갈·물고기)는
          감정과 직관을 대표합니다. 같은 원소끼리는 비슷한 결을, 다른 원소끼리는 보완
          관계를 이루는 경우가 많아 궁합 해석의 기본 축이 됩니다.
        </p>
        <p>
          이 시리즈는 12별자리 각각의 성격, 연애 스타일, 잘 맞는 별자리와 주의할
          궁합을 한 권의 가이드처럼 정리했습니다. 자신의 별자리부터 펼쳐 보시거나,
          연인·가족·동료의 별자리를 비교하며 읽어 보세요. 별자리 해석은 사람을
          틀에 가두는 잣대가 아니라 서로의 차이를 이해하는 언어입니다.
        </p>
      </section>

      <section>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {ZODIACS.map((z) => (
            <li
              key={z.slug}
              className="border border-(--color-border) rounded-lg p-4 bg-(--color-surface)"
            >
              <div className="flex items-center gap-3 mb-3 pb-3 border-b border-(--color-border)">
                <span
                  className="text-2xl"
                  style={{ color: z.color }}
                  aria-hidden
                >
                  {z.symbol}
                </span>
                <div>
                  <p
                    className="text-base font-semibold leading-tight"
                    style={{ color: z.color }}
                  >
                    {z.ko}
                  </p>
                  <p className="text-xs text-(--color-secondary)">
                    {z.element} · {z.date}
                  </p>
                </div>
              </div>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <Link
                    href={`/zodiac/${z.slug}-personality`}
                    className="text-(--color-primary) hover:text-(--color-accent) transition-colors"
                  >
                    · 성격 가이드
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/zodiac/${z.slug}-love`}
                    className="text-(--color-primary) hover:text-(--color-accent) transition-colors"
                  >
                    · 연애 스타일
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/zodiac/${z.slug}-compatibility`}
                    className="text-(--color-primary) hover:text-(--color-accent) transition-colors"
                  >
                    · 궁합 가이드
                  </Link>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-12 pt-6 border-t border-(--color-border) text-sm text-(--color-secondary) leading-relaxed">
        <p>
          별자리 해석은 자기 이해의 한 도구이며, 같은 별자리라도 출생 시간·달 별자리·
          상승 별자리에 따라 결이 달라집니다. 단정보다는 참고 관점으로 활용해 주세요.
        </p>
        <p className="mt-2">
          <Link
            href="/zodiac/zodiac-12-basics"
            className="text-(--color-accent) hover:underline"
          >
            12별자리 기초 가이드부터 읽기 →
          </Link>
        </p>
      </footer>
    </div>
  );
}
