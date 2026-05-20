"use client";

import { useState } from "react";
import Link from "next/link";

const MAJOR_ARCANA = [
  { num: 0,  name: "바보",            en: "The Fool",            slug: "fool-card",            keyword: "새 출발, 순수한 가능성",      image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_00_Fool.jpg" },
  { num: 1,  name: "마법사",          en: "The Magician",        slug: "magician-card",        keyword: "의지, 창조력, 실행",           image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_01_Magician.jpg" },
  { num: 2,  name: "여사제",          en: "The High Priestess",  slug: "high-priestess-card",  keyword: "직관, 내면의 앎",              image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_02_High_Priestess.jpg" },
  { num: 3,  name: "여황제",          en: "The Empress",         slug: "empress-card",         keyword: "풍요, 창조, 양육",             image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_03_Empress.jpg" },
  { num: 4,  name: "황제",            en: "The Emperor",         slug: "emperor-card",         keyword: "권위, 구조, 안정",             image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_04_Emperor.jpg" },
  { num: 5,  name: "교황",            en: "The Hierophant",      slug: "hierophant-card",      keyword: "전통, 가르침, 신념",           image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_05_Hierophant.jpg" },
  { num: 6,  name: "연인",            en: "The Lovers",          slug: "lovers-card",          keyword: "선택, 관계, 가치관",           image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_06_Lovers.jpg" },
  { num: 7,  name: "전차",            en: "The Chariot",         slug: "chariot-card",         keyword: "의지, 승리, 집중",             image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_07_Chariot.jpg" },
  { num: 8,  name: "힘",              en: "Strength",            slug: "strength-card",        keyword: "내면의 용기, 온화한 강인함",   image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_08_Strength.jpg" },
  { num: 9,  name: "은둔자",          en: "The Hermit",          slug: "hermit-card",          keyword: "내면 탐구, 지혜, 고독",        image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_09_Hermit.jpg" },
  { num: 10, name: "운명의 수레바퀴", en: "Wheel of Fortune",    slug: "wheel-of-fortune-card",keyword: "변화, 순환, 전환점",           image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_10_Wheel_of_Fortune.jpg" },
  { num: 11, name: "정의",            en: "Justice",             slug: "justice-card",         keyword: "균형, 공정, 책임",             image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_11_Justice.jpg" },
  { num: 12, name: "매달린 사람",     en: "The Hanged Man",      slug: "hanged-man-card",      keyword: "희생, 새로운 관점, 기다림",    image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_12_Hanged_Man.jpg" },
  { num: 13, name: "죽음",            en: "Death",               slug: "death-card",           keyword: "전환, 끝과 시작, 변화",        image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_13_Death.jpg" },
  { num: 14, name: "절제",            en: "Temperance",          slug: "temperance-card",      keyword: "조화, 균형, 통합",             image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_14_Temperance.jpg" },
  { num: 15, name: "악마",            en: "The Devil",           slug: "devil-card",           keyword: "속박, 집착, 그림자",           image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_15_Devil.jpg" },
  { num: 16, name: "탑",              en: "The Tower",           slug: "tower-card",           keyword: "갑작스러운 변화, 붕괴",        image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_16_Tower.jpg" },
  { num: 17, name: "별",              en: "The Star",            slug: "star-card",            keyword: "희망, 치유, 회복",             image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_17_Star.jpg" },
  { num: 18, name: "달",              en: "The Moon",            slug: "moon-card",            keyword: "무의식, 환상, 불확실성",       image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_18_Moon.jpg" },
  { num: 19, name: "태양",            en: "The Sun",             slug: "sun-card",             keyword: "기쁨, 성공, 활력",             image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_19_Sun.jpg" },
  { num: 20, name: "심판",            en: "Judgement",           slug: "judgement-card",       keyword: "부활, 각성, 새로운 부름",      image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_20_Judgement.jpg" },
  { num: 21, name: "세계",            en: "The World",           slug: "world-card",           keyword: "완성, 통합, 새로운 시작",      image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_21_World.jpg" },
];

const THEMES = [
  { id: "today",      label: "오늘의 하루",    desc: "오늘 하루에 관한 질문" },
  { id: "love",       label: "연애 / 관계",    desc: "연인, 짝사랑, 관계에 관한 질문" },
  { id: "career",     label: "직업 / 커리어",  desc: "일, 직장, 진로에 관한 질문" },
  { id: "money",      label: "재물 / 금전",    desc: "돈, 재정, 투자에 관한 질문" },
  { id: "health",     label: "건강 / 에너지",  desc: "몸과 마음의 컨디션에 관한 질문" },
  { id: "decision",   label: "결정 / 선택",    desc: "선택의 기로에서 도움을 구하는 질문" },
  { id: "people",     label: "인간관계",       desc: "가족, 친구, 직장 관계에 관한 질문" },
  { id: "inner",      label: "내면 성찰",      desc: "나 자신을 이해하기 위한 질문" },
  { id: "newstart",   label: "새로운 시작",    desc: "변화나 도전을 앞두고 던지는 질문" },
  { id: "conflict",   label: "갈등 / 위기",    desc: "현재의 어려움을 어떻게 볼지" },
];

type Orientation = "정방향" | "역방향";

interface DrawnCard {
  card: typeof MAJOR_ARCANA[0];
  orientation: Orientation;
}

export default function TarotReading() {
  const [theme, setTheme] = useState<string | null>(null);
  const [drawn, setDrawn] = useState<DrawnCard | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [drawing, setDrawing] = useState(false);

  const selectedTheme = THEMES.find((t) => t.id === theme);

  function draw() {
    setDrawing(true);
    setFlipped(false);
    setDrawn(null);
    setTimeout(() => {
      const card = MAJOR_ARCANA[Math.floor(Math.random() * MAJOR_ARCANA.length)];
      const orientation: Orientation = Math.random() < 0.5 ? "정방향" : "역방향";
      setDrawn({ card, orientation });
      setDrawing(false);
      setTimeout(() => setFlipped(true), 100);
    }, 600);
  }

  function resetTheme() {
    setTheme(null);
    setDrawn(null);
    setFlipped(false);
    setDrawing(false);
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12 text-center">
      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#6B2D5E" }}>
        타로
      </p>
      <h1 className="text-3xl font-semibold text-(--color-primary) mb-3">오늘의 타로 카드</h1>
      <p className="text-(--color-secondary) mb-8 leading-relaxed">
        마음을 고요히 하고 질문을 떠올린 뒤,<br />카드를 뽑아보세요.
      </p>

      {/* 테마 선택 */}
      {theme === null && !drawing && (
        <div className="mb-8 text-left">
          <p className="text-sm font-semibold text-(--color-primary) mb-3 text-center">질문 테마 선택</p>
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className="text-left px-4 py-3 rounded-lg border border-(--color-border) hover:border-(--color-accent) transition-colors"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <p className="text-sm font-medium text-(--color-primary)">{t.label}</p>
                <p className="text-xs text-(--color-secondary) mt-0.5 leading-snug">{t.desc}</p>
              </button>
            ))}
          </div>
          <button
            onClick={() => setTheme("general")}
            className="mt-3 w-full text-sm text-(--color-secondary) py-2 hover:text-(--color-primary) transition-colors"
          >
            테마 없이 바로 뽑기 →
          </button>
        </div>
      )}

      {/* 선택된 테마 표시 */}
      {theme !== null && (
        <div className="mb-6">
          {selectedTheme && (
            <span
              className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4"
              style={{ color: "#6B2D5E", backgroundColor: "#6B2D5E18" }}
            >
              {selectedTheme.label}에 관한 질문
            </span>
          )}
        </div>
      )}

      {/* 카드 뒷면 */}
      {theme !== null && !drawn && !drawing && (
        <div
          className="mx-auto mb-10 w-40 h-64 rounded-xl border-2 border-(--color-border) bg-(--color-surface) flex items-center justify-center cursor-pointer hover:border-(--color-accent) transition-colors"
          onClick={draw}
        >
          <span className="text-4xl select-none">✦</span>
        </div>
      )}

      {drawing && (
        <div className="mx-auto mb-10 w-40 h-64 rounded-xl border-2 border-(--color-border) bg-(--color-surface) flex items-center justify-center animate-pulse">
          <span className="text-4xl select-none">✦</span>
        </div>
      )}

      {/* 결과 */}
      {drawn && (
        <div
          className="mx-auto mb-8 transition-all duration-500"
          style={{ opacity: flipped ? 1 : 0, transform: flipped ? "scale(1)" : "scale(0.92)" }}
        >
          <div
            className="mx-auto w-40 overflow-hidden rounded-xl border border-(--color-border) shadow-sm mb-5"
            style={drawn.orientation === "역방향" ? { transform: "rotate(180deg)" } : {}}
          >
            <img src={drawn.card.image} alt={drawn.card.name} className="w-full" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-1">
            <span
              className="inline-block text-xs font-medium px-2 py-0.5 rounded"
              style={{ color: "#6B2D5E", backgroundColor: "#6B2D5E18" }}
            >
              {drawn.orientation}
            </span>
          </div>

          <h2 className="text-2xl font-semibold text-(--color-primary) mb-1">
            {drawn.card.num}. {drawn.card.name}
          </h2>
          <p className="text-sm text-(--color-secondary) mb-1">{drawn.card.en}</p>
          <p className="text-(--color-secondary) mb-6">{drawn.card.keyword}</p>

          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href={`/tarot/${drawn.card.slug}`}
              className="inline-block text-sm font-medium px-5 py-2 rounded-lg border border-(--color-border) text-(--color-primary) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
            >
              카드 상세 해석 보기
            </Link>
            <button
              onClick={draw}
              className="text-sm font-medium px-5 py-2 rounded-lg border border-(--color-border) text-(--color-secondary) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
            >
              다시 뽑기
            </button>
          </div>

          <button
            onClick={resetTheme}
            className="mt-4 text-xs text-(--color-secondary) hover:text-(--color-primary) transition-colors"
          >
            테마 변경
          </button>
        </div>
      )}

      {/* 카드 뽑기 버튼 */}
      {theme !== null && !drawn && !drawing && (
        <button
          onClick={draw}
          className="text-sm font-medium px-6 py-2.5 rounded-lg border border-(--color-border) text-(--color-primary) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
        >
          카드 뽑기
        </button>
      )}

      <p className="mt-12 text-xs text-(--color-secondary) leading-relaxed">
        타로 카드는 자기 이해와 성찰을 위한 참고 도구입니다.<br />
        결과를 절대적인 예언으로 받아들이지 마세요.
      </p>
    </div>
  );
}
