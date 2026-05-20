"use client";

import { useState } from "react";
import Link from "next/link";

const MAJOR_ARCANA = [
  { num: 0, name: "바보", en: "The Fool", slug: "fool-card", keyword: "새 출발, 순수한 가능성", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_00_Fool.jpg" },
  { num: 1, name: "마법사", en: "The Magician", slug: "magician-card", keyword: "의지, 창조력, 실행", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_01_Magician.jpg" },
  { num: 2, name: "여사제", en: "The High Priestess", slug: "high-priestess-card", keyword: "직관, 내면의 앎", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_02_High_Priestess.jpg" },
  { num: 3, name: "여황제", en: "The Empress", slug: "empress-card", keyword: "풍요, 창조, 양육", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_03_Empress.jpg" },
  { num: 4, name: "황제", en: "The Emperor", slug: "emperor-card", keyword: "권위, 구조, 안정", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_04_Emperor.jpg" },
  { num: 5, name: "교황", en: "The Hierophant", slug: "hierophant-card", keyword: "전통, 가르침, 신념", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_05_Hierophant.jpg" },
  { num: 6, name: "연인", en: "The Lovers", slug: "lovers-card", keyword: "선택, 관계, 가치관", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_06_Lovers.jpg" },
  { num: 7, name: "전차", en: "The Chariot", slug: "chariot-card", keyword: "의지, 승리, 집중", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_07_Chariot.jpg" },
  { num: 8, name: "힘", en: "Strength", slug: "strength-card", keyword: "내면의 용기, 온화한 강인함", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_08_Strength.jpg" },
  { num: 9, name: "은둔자", en: "The Hermit", slug: "hermit-card", keyword: "내면 탐구, 지혜, 고독", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_09_Hermit.jpg" },
  { num: 10, name: "운명의 수레바퀴", en: "Wheel of Fortune", slug: "wheel-of-fortune-card", keyword: "변화, 순환, 전환점", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_10_Wheel_of_Fortune.jpg" },
  { num: 11, name: "정의", en: "Justice", slug: "justice-card", keyword: "균형, 공정, 책임", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_11_Justice.jpg" },
  { num: 12, name: "매달린 사람", en: "The Hanged Man", slug: "hanged-man-card", keyword: "희생, 새로운 관점, 기다림", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_12_Hanged_Man.jpg" },
  { num: 13, name: "죽음", en: "Death", slug: "death-card", keyword: "전환, 끝과 시작, 변화", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_13_Death.jpg" },
  { num: 14, name: "절제", en: "Temperance", slug: "temperance-card", keyword: "조화, 균형, 통합", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_14_Temperance.jpg" },
  { num: 15, name: "악마", en: "The Devil", slug: "devil-card", keyword: "속박, 집착, 그림자", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_15_Devil.jpg" },
  { num: 16, name: "탑", en: "The Tower", slug: "tower-card", keyword: "갑작스러운 변화, 붕괴", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_16_Tower.jpg" },
  { num: 17, name: "별", en: "The Star", slug: "star-card", keyword: "희망, 치유, 회복", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_17_Star.jpg" },
  { num: 18, name: "달", en: "The Moon", slug: "moon-card", keyword: "무의식, 환상, 불확실성", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_18_Moon.jpg" },
  { num: 19, name: "태양", en: "The Sun", slug: "sun-card", keyword: "기쁨, 성공, 활력", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_19_Sun.jpg" },
  { num: 20, name: "심판", en: "Judgement", slug: "judgement-card", keyword: "부활, 각성, 새로운 부름", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_20_Judgement.jpg" },
  { num: 21, name: "세계", en: "The World", slug: "world-card", keyword: "완성, 통합, 새로운 시작", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_21_World.jpg" },
];

type Orientation = "정방향" | "역방향";

interface DrawnCard {
  card: typeof MAJOR_ARCANA[0];
  orientation: Orientation;
}

export default function TarotReading() {
  const [drawn, setDrawn] = useState<DrawnCard | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [drawing, setDrawing] = useState(false);

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

  return (
    <div className="max-w-lg mx-auto px-4 py-12 text-center">
      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#6B2D5E" }}>
        타로
      </p>
      <h1 className="text-3xl font-semibold text-(--color-primary) mb-3">오늘의 타로 카드</h1>
      <p className="text-(--color-secondary) mb-10 leading-relaxed">
        마음을 고요히 하고 질문을 떠올린 뒤,<br />카드를 뽑아보세요.
      </p>

      {!drawn && !drawing && (
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

      {drawn && (
        <div
          className="mx-auto mb-8 transition-all duration-500"
          style={{ opacity: flipped ? 1 : 0, transform: flipped ? "scale(1)" : "scale(0.92)" }}
        >
          <div
            className="mx-auto w-40 overflow-hidden rounded-xl border border-(--color-border) shadow-sm mb-5"
            style={drawn.orientation === "역방향" ? { transform: "rotate(180deg)" } : {}}
          >
            <img
              src={drawn.card.image}
              alt={drawn.card.name}
              className="w-full"
            />
          </div>

          <div className="mb-1">
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
        </div>
      )}

      {!drawn && !drawing && (
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
