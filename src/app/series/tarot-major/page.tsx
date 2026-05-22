import Link from "next/link";
import type { Metadata } from "next";

const MAJOR_ARCANA = [
  { num: 0, slug: "fool-card", ko: "바보", en: "The Fool" },
  { num: 1, slug: "magician-card", ko: "마법사", en: "The Magician" },
  { num: 2, slug: "high-priestess-card", ko: "여사제", en: "The High Priestess" },
  { num: 3, slug: "empress-card", ko: "여황제", en: "The Empress" },
  { num: 4, slug: "emperor-card", ko: "황제", en: "The Emperor" },
  { num: 5, slug: "hierophant-card", ko: "교황", en: "The Hierophant" },
  { num: 6, slug: "lovers-card", ko: "연인", en: "The Lovers" },
  { num: 7, slug: "chariot-card", ko: "전차", en: "The Chariot" },
  { num: 8, slug: "strength-card", ko: "힘", en: "Strength" },
  { num: 9, slug: "hermit-card", ko: "은둔자", en: "The Hermit" },
  { num: 10, slug: "wheel-of-fortune-card", ko: "운명의 수레바퀴", en: "Wheel of Fortune" },
  { num: 11, slug: "justice-card", ko: "정의", en: "Justice" },
  { num: 12, slug: "hanged-man-card", ko: "매달린 사람", en: "The Hanged Man" },
  { num: 13, slug: "death-card", ko: "죽음", en: "Death" },
  { num: 14, slug: "temperance-card", ko: "절제", en: "Temperance" },
  { num: 15, slug: "devil-card", ko: "악마", en: "The Devil" },
  { num: 16, slug: "tower-card", ko: "탑", en: "The Tower" },
  { num: 17, slug: "star-card", ko: "별", en: "The Star" },
  { num: 18, slug: "moon-card", ko: "달", en: "The Moon" },
  { num: 19, slug: "sun-card", ko: "태양", en: "The Sun" },
  { num: 20, slug: "judgement-card", ko: "심판", en: "Judgement" },
  { num: 21, slug: "world-card", ko: "세계", en: "The World" },
];

export const metadata: Metadata = {
  title: "타로 메이저 아르카나 22장 시리즈 — 0번 바보부터 21번 세계까지",
  description:
    "타로 카드의 핵심인 메이저 아르카나 22장을 한 페이지에서 탐색하세요. 0번 바보의 출발부터 21번 세계의 완성까지, 카드 한 장마다 상징과 해석 가이드를 정리했습니다.",
  alternates: { canonical: "/series/tarot-major" },
};

export default function TarotMajorSeriesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-(--color-accent) mb-2">
          시리즈
        </p>
        <h1 className="text-3xl font-semibold text-(--color-primary) mb-4">
          메이저 아르카나 22장 — 바보의 여정
        </h1>
        <p className="text-(--color-secondary) leading-relaxed">
          타로 78장 중 가장 중요한 자리로 다뤄지는 메이저 아르카나 22장은,
          한 사람이 세상을 만나고 성숙해지는 영적·심리적 여정을 상징합니다.
        </p>
      </header>

      <section className="prose prose-stone max-w-none mb-10 prose-headings:font-semibold prose-headings:text-(--color-primary) prose-p:text-(--color-primary) prose-p:leading-[1.85] prose-a:text-(--color-accent)">
        <h2>메이저 아르카나란 무엇인가</h2>
        <p>
          타로 카드는 메이저 아르카나 22장과 마이너 아르카나 56장, 총 78장으로
          구성됩니다. 메이저 아르카나는 카드 한 장 한 장이 인생의 큰 주제 — 시작·선택·
          욕망·전환·완성 — 을 상징하는 강한 카드들이며, 점을 볼 때 메이저 카드가
          나오면 작은 일상의 사건보다 큰 흐름이나 내면의 변화로 해석하는 경우가
          많습니다.
        </p>
        <p>
          22장은 0번 바보(Fool)에서 시작해 21번 세계(World)에서 끝납니다. 이 순서를
          &quot;바보의 여정&quot;이라고 부르는데, 아무것도 모른 채 길을 떠난 바보가
          마법사·여사제·황제·교황을 만나고, 연인과 전차와 정의와 죽음을 거쳐, 끝내
          별과 달과 태양을 지나 세계의 완성에 도달하는 이야기로 읽힙니다. 카드 한
          장의 의미를 외우는 것보다 이 흐름 안에서 한 장이 어떤 자리에 있는지를
          이해할 때 메이저 아르카나가 훨씬 깊어집니다.
        </p>
        <p>
          이 시리즈는 0번부터 21번까지 순서대로 한 장씩 펼쳤습니다. 처음 타로를
          공부하신다면 0번 바보부터 차례로 읽어 보시고, 특정 상황에서 뽑힌 카드를
          확인하고 싶으시면 해당 카드만 바로 찾아 들어가셔도 좋습니다. 타로 해석은
          정답이 정해진 학문이 아니라 상징을 자신의 삶에 비추어 보는 도구입니다.
        </p>
      </section>

      <section>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {MAJOR_ARCANA.map((card) => (
            <li key={card.slug}>
              <Link
                href={`/tarot/${card.slug}`}
                className="block p-4 border border-(--color-border) rounded-lg bg-(--color-surface) hover:border-(--color-accent) transition-colors group text-center"
              >
                <p className="text-xs font-semibold text-(--color-accent) mb-1">
                  {String(card.num).padStart(2, "0")}
                </p>
                <p className="text-base font-semibold text-(--color-primary) group-hover:text-(--color-accent) leading-tight">
                  {card.ko}
                </p>
                <p className="text-xs text-(--color-secondary) mt-1 leading-tight">
                  {card.en}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-12 pt-6 border-t border-(--color-border) text-sm text-(--color-secondary) leading-relaxed">
        <p>
          타로는 정해진 미래를 알려 주는 도구가 아니라, 지금 자신이 어디에 있고
          무엇을 바라보고 있는지를 비춰 주는 거울입니다. 카드의 상징을 자신의 상황에
          비추어 해석해 보세요.
        </p>
        <p className="mt-2">
          <Link
            href="/tarot/what-is-tarot"
            className="text-(--color-accent) hover:underline"
          >
            타로 기초부터 읽기 →
          </Link>{" "}
          ·{" "}
          <Link
            href="/tarot-reading"
            className="text-(--color-accent) hover:underline"
          >
            오늘의 카드 뽑기 →
          </Link>
        </p>
      </footer>
    </div>
  );
}
