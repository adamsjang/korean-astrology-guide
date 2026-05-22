"use client";

import { useState, useEffect } from "react";
import { calculateSaju } from "@/lib/saju/pillars";
import { analyze } from "@/lib/saju/compare";
import type { SajuInput, SajuResult } from "@/lib/saju/types";
import type { GunghapAnalysis } from "@/lib/saju/compare";
import {
  STEMS,
  STEMS_H,
  BRANCHES,
  BRANCHES_H,
  ANIMALS,
  STEM_EL,
  BRANCH_EL,
  ELEMENT_COLOR,
} from "@/lib/saju/constants";
import type { Element } from "@/lib/saju/constants";
import DateInput from "@/components/saju/DateInput";
import PillarCard from "@/components/saju/PillarCard";
import DivergingChart from "@/components/saju/DivergingChart";
import DisclaimerBanner from "@/components/article/DisclaimerBanner";

const DEFAULT_INPUT: SajuInput = { year: 1990, month: 1, day: 1, calendar: "solar" };

function extractFirstElement(label: string): Element | null {
  const map: Record<string, Element> = { 목: "목", 화: "화", 토: "토", 금: "금", 수: "수" };
  for (const ch of label) {
    if (map[ch]) return map[ch];
  }
  return null;
}

function branchBadgeColor(type: GunghapAnalysis["branch"]["type"]): string {
  if (type === "충") return "#c0392b";
  if (type === "육합") return "#2d6a4f";
  if (type === "삼합") return "#1a5276";
  return "var(--color-secondary)";
}

export default function GunghapChecker() {
  const [inputA, setInputA] = useState<SajuInput>({ ...DEFAULT_INPUT });
  const [inputB, setInputB] = useState<SajuInput>({ ...DEFAULT_INPUT });
  const [resultA, setResultA] = useState<SajuResult | null>(null);
  const [resultB, setResultB] = useState<SajuResult | null>(null);
  const [analysis, setAnalysis] = useState<GunghapAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedInput, setSavedInput] = useState<SajuInput | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("saju_last_input");
      if (raw) {
        const parsed = JSON.parse(raw) as SajuInput;
        setSavedInput(parsed);
      }
    } catch {
    }
  }, []);

  function calculate() {
    setError(null);
    try {
      const rA = calculateSaju(inputA);
      const rB = calculateSaju(inputB);
      setResultA(rA);
      setResultB(rB);
      setAnalysis(analyze(rA, rB));
    } catch (e) {
      setError(e instanceof Error ? e.message : "계산 중 오류가 발생했습니다.");
      setResultA(null);
      setResultB(null);
      setAnalysis(null);
    }
  }

  function PersonPillars({ result, label }: { result: SajuResult; label: string }) {
    return (
      <div>
        <p className="text-sm font-semibold text-(--color-primary) mb-3">{label}</p>
        <div className="grid grid-cols-2 gap-3">
          <PillarCard pillar={result.year} label="년주" compact={false} />
          <PillarCard pillar={result.month} label="월주" compact={false} />
          <PillarCard pillar={result.day} label="일주" isDay={true} compact={false} />
          {result.hour ? (
            <PillarCard pillar={result.hour} label="시주" compact={false} />
          ) : (
            <div className="rounded-xl bg-(--color-surface) border border-dashed border-(--color-border) p-4">
              <p className="text-sm font-semibold text-(--color-secondary) mb-3">시주</p>
              <p className="text-sm text-(--color-secondary)">미입력</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const stemArrow = (() => {
    if (!analysis || !resultA || !resultB) return null;
    const { direction } = analysis.stem;
    const aIdx = resultA.day.stemIdx;
    const bIdx = resultB.day.stemIdx;
    const aEl = STEM_EL[aIdx] as Element;
    const bEl = STEM_EL[bIdx] as Element;
    const aColor = ELEMENT_COLOR[aEl];
    const bColor = ELEMENT_COLOR[bEl];

    const aSide = (
      <span>
        <span style={{ color: aColor, fontWeight: 700 }}>
          {STEMS[aIdx]}{STEMS_H[aIdx]}
        </span>
        <span className="text-xs text-(--color-secondary) ml-1">({aEl})</span>
      </span>
    );
    const bSide = (
      <span>
        <span style={{ color: bColor, fontWeight: 700 }}>
          {STEMS[bIdx]}{STEMS_H[bIdx]}
        </span>
        <span className="text-xs text-(--color-secondary) ml-1">({bEl})</span>
      </span>
    );

    if (direction === "equal") {
      return <span>{aSide} <span className="mx-1">↔</span> {bSide}</span>;
    }
    if (direction === "a→b") {
      return <span>{aSide} <span className="mx-1">→</span> {bSide}</span>;
    }
    return <span>{bSide} <span className="mx-1">→</span> {aSide}</span>;
  })();

  const stemBadgeColor = (() => {
    if (!analysis) return "var(--color-secondary)";
    const el = extractFirstElement(analysis.stem.label);
    return el ? ELEMENT_COLOR[el] : "var(--color-secondary)";
  })();

  return (
    <div className="space-y-6">
      {savedInput && (
        <div className="rounded-xl border border-(--color-border) bg-(--color-surface) px-5 py-4 flex items-center justify-between gap-4 text-sm">
          <span className="text-(--color-secondary)">저장된 내 사주가 있습니다.</span>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() => { setInputA(savedInput); setSavedInput(null); }}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              불러오기
            </button>
            <button
              type="button"
              onClick={() => setSavedInput(null)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-(--color-secondary) border border-(--color-border) hover:text-(--color-primary) transition-colors"
            >
              무시
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DateInput value={inputA} onChange={setInputA} showHour={true} label="나" />
          <DateInput value={inputB} onChange={setInputB} showHour={true} label="상대방" />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600 px-1">{error}</p>
      )}

      <button
        type="button"
        onClick={calculate}
        className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        계산하기
      </button>

      {analysis && resultA && resultB && (
        <div className="space-y-6">
          <div className="md:hidden space-y-6">
            <PersonPillars result={resultA} label="나" />
            <hr className="border-(--color-border)" />
            <PersonPillars result={resultB} label="상대방" />
          </div>

          <div className="hidden md:grid md:grid-cols-2 gap-6">
            <PersonPillars result={resultA} label="나" />
            <PersonPillars result={resultB} label="상대방" />
          </div>

          <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-5 space-y-3">
            <p className="text-sm font-semibold text-(--color-primary)">일간 오행 관계</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base">{stemArrow}</span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold leading-none"
                style={{ color: stemBadgeColor, backgroundColor: `${stemBadgeColor}22` }}
              >
                {analysis.stem.label}
              </span>
            </div>
            <p className="text-sm text-(--color-secondary) leading-relaxed">{analysis.stem.description}</p>
          </div>

          <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-5 space-y-3">
            <p className="text-sm font-semibold text-(--color-primary)">일지 관계</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span>
                <span style={{ color: ELEMENT_COLOR[BRANCH_EL[resultA.day.branchIdx] as Element], fontWeight: 700 }}>
                  {BRANCHES[resultA.day.branchIdx]}{BRANCHES_H[resultA.day.branchIdx]}
                </span>
                <span className="text-xs text-(--color-secondary) ml-1">({ANIMALS[resultA.day.branchIdx]})</span>
              </span>
              <span className="text-(--color-secondary) mx-1">—</span>
              <span>
                <span style={{ color: ELEMENT_COLOR[BRANCH_EL[resultB.day.branchIdx] as Element], fontWeight: 700 }}>
                  {BRANCHES[resultB.day.branchIdx]}{BRANCHES_H[resultB.day.branchIdx]}
                </span>
                <span className="text-xs text-(--color-secondary) ml-1">({ANIMALS[resultB.day.branchIdx]})</span>
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold leading-none"
                style={{
                  color: branchBadgeColor(analysis.branch.type),
                  backgroundColor: `${branchBadgeColor(analysis.branch.type)}22`,
                }}
              >
                {analysis.branch.label}
              </span>
            </div>
            <p className="text-sm text-(--color-secondary) leading-relaxed">{analysis.branch.description}</p>
          </div>

          <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-5 space-y-4">
            <p className="text-sm font-semibold text-(--color-primary)">오행 분포 비교</p>
            <DivergingChart
              aElements={analysis.elementCompare.a}
              bElements={analysis.elementCompare.b}
              aTotal={analysis.elementCompare.aTotal}
              bTotal={analysis.elementCompare.bTotal}
              aLabel="나"
              bLabel="상대방"
            />
            {analysis.elementCompare.aTotal !== analysis.elementCompare.bTotal && (
              <p className="text-xs text-(--color-secondary)">
                시주 미입력 등으로 두 사람의 기준이 다를 수 있습니다.
              </p>
            )}
          </div>

          <div className="rounded-xl border border-(--color-border) bg-(--color-surface) overflow-hidden">
            <button
              type="button"
              onClick={() => setGuideOpen((o) => !o)}
              className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-(--color-primary) hover:bg-(--color-base) transition-colors"
            >
              <span>궁합 해석에 대하여</span>
              <span className="text-(--color-secondary)">{guideOpen ? "▲" : "▼"}</span>
            </button>
            {guideOpen && (
              <div className="px-5 pb-5 text-sm text-(--color-secondary) leading-relaxed border-t border-(--color-border) pt-4">
                사주 궁합은 두 사람의 일주(日柱)를 중심으로 살피는 것이 기본이나, 전체 여덟 글자의 흐름과 대운·세운까지 함께 보아야 더 입체적인 이해가 가능합니다. 여기서 보여주는 관계는 일간·일지의 기본 관계에 한정된 참고 정보입니다.
              </div>
            )}
          </div>

          <DisclaimerBanner />
        </div>
      )}
    </div>
  );
}
