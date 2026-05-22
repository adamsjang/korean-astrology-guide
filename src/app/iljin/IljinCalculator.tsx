"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { calculateIljin } from "@/lib/saju/iljin";
import { STEMS_H, BRANCHES_H, ANIMALS, ELEMENT_COLOR } from "@/lib/saju/constants";
import { getIljuSlug } from "@/lib/saju/ilju-slugs";

function toDateString(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function fromDateString(s: string): { year: number; month: number; day: number } {
  const [y, m, d] = s.split("-").map(Number);
  return { year: y, month: m, day: d };
}

const SIPIJIK_LABEL: Record<number, string> = {
  1:  "길일로 여겨집니다",
  0:  "보통 날로 분류됩니다",
  [-1 as number]: "흉일로 분류됩니다",
};

const SIPIJIK_DESC: Record<string, string> = {
  건: "한 달의 시작을 여는 날. 새로운 일을 시작하거나 세우기에 전통적으로 좋다고 여겨집니다.",
  제: "묵은 것을 제거하고 정리하는 날. 청소나 정돈에 좋다고 전해집니다.",
  만: "가득 차오르는 에너지의 날. 결실보다 채워가는 과정에 어울린다고 합니다.",
  평: "평온하고 무난한 날. 큰 변화보다 일상적인 업무에 적합하다고 전해집니다.",
  정: "안정되고 정해지는 날. 계약·결정·정착 등에 좋다고 전통적으로 여겨집니다.",
  집: "집중하고 모으는 날. 한 가지에 집중하는 작업에 어울린다고 합니다.",
  파: "부수고 깨는 에너지의 날. 전통적으로 새로운 시작을 피한다고 전해집니다.",
  위: "위태로움을 뜻하는 날. 중요한 결정을 피하는 것이 낫다고 전통에서는 설명합니다.",
  성: "이루어지는 날. 완성·성취·결실에 좋다고 전통적으로 여겨집니다.",
  수: "거두고 마무리하는 날. 수확이나 마감에 어울린다고 합니다.",
  개: "열리는 날. 새로운 시작과 개업 등에 좋다고 전통적으로 여겨집니다.",
  폐: "닫히는 날. 마무리와 정리에는 좋지만 시작에는 적합하지 않다고 전해집니다.",
};

export default function IljinCalculator() {
  const [dateStr, setDateStr] = useState<string>(() => toDateString(new Date()));

  const { year, month, day } = fromDateString(dateStr);

  let result: ReturnType<typeof calculateIljin> | null = null;
  let calcError = "";
  try {
    result = calculateIljin(year, month, day);
  } catch {
    calcError = "해당 날짜는 지원 범위를 벗어납니다.";
  }

  const moveDay = useCallback((delta: number) => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + delta);
    setDateStr(toDateString(d));
  }, [dateStr]);

  const isStemColor = result ? ELEMENT_COLOR[result.dayElement] : undefined;
  const isBranchAnimal = result ? ANIMALS[result.dayBranchIdx] : "";

  const starColor = result
    ? result.sipijikStar === 1 ? "#2d6a4f"
    : result.sipijikStar === 0 ? "#9a7d3a"
    : "#c0392b"
    : undefined;

  const isSon = result?.sonNone;
  const isSonText = isSon
    ? `음력 ${result!.lunarMonth}월 ${result!.lunarDay}일 — 전통적으로 손 없는 날로 여겨집니다`
    : `음력 ${result?.lunarMonth}월 ${result?.lunarDay}일${result?.lunarLeap ? " (윤달)" : ""}`;

  const isSonLabel = isSon ? "손 없는 날" : "손 있는 날";

  const isBranchH = result ? BRANCHES_H[result.dayBranchIdx] : "";
  const isStemH   = result ? STEMS_H[result.dayStemIdx] : "";

  const iSipijikStar = result?.sipijikStar;
  const isSipijikLabel = iSipijikStar !== undefined ? SIPIJIK_LABEL[iSipijikStar] : "";

  const isSipijikDesc = result ? SIPIJIK_DESC[result.sipijik] ?? "" : "";

  const iljuSlug = result ? getIljuSlug(result.dayStemIdx, result.dayBranchIdx) : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--color-accent)" }}>
        일진
      </p>
      <h1 className="text-3xl font-semibold text-(--color-primary) mb-2">일진 계산기</h1>
      <p className="text-(--color-secondary) mb-8 text-sm leading-relaxed">
        날짜를 선택하면 그날의 일주·십이직·음력 날짜를 확인할 수 있습니다.
      </p>

      {/* 날짜 입력 */}
      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-5 mb-4">
        <p id="iljin-date-label" className="text-xs text-(--color-secondary) mb-2">날짜 선택</p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => moveDay(-1)}
            aria-label="어제 날짜로 이동"
            className="px-3 py-2 rounded-lg border border-(--color-border) text-sm text-(--color-secondary) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
          >
            ← 어제
          </button>
          <input
            type="date"
            value={dateStr}
            min="1900-01-01"
            max="2050-12-31"
            onChange={(e) => setDateStr(e.target.value)}
            aria-labelledby="iljin-date-label"
            className="flex-1 px-3 py-2 rounded-lg border border-(--color-border) text-sm text-(--color-primary) bg-(--color-base) focus:outline-none focus:border-(--color-accent)"
          />
          <button
            type="button"
            onClick={() => moveDay(1)}
            aria-label="내일 날짜로 이동"
            className="px-3 py-2 rounded-lg border border-(--color-border) text-sm text-(--color-secondary) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
          >
            내일 →
          </button>
        </div>
        <button
          type="button"
          onClick={() => setDateStr(toDateString(new Date()))}
          className="mt-2 text-xs text-(--color-secondary) hover:text-(--color-accent) transition-colors"
        >
          오늘로 돌아가기
        </button>
      </div>

      {calcError && <p role="alert" className="text-sm text-red-600 mb-4">{calcError}</p>}

      {result && (
        <div className="space-y-4">
          {/* 일주 카드 */}
          <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-5">
            <p className="text-xs text-(--color-secondary) mb-3">오늘의 일주 (日柱)</p>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-4xl font-semibold leading-none mb-1" style={{ color: isStemColor }}>
                  {result.dayStem}
                </p>
                <p className="text-xs text-(--color-secondary)">{isStemH}</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-semibold leading-none mb-1 text-(--color-primary)">
                  {result.dayBranch}
                </p>
                <p className="text-xs text-(--color-secondary)">{isBranchH}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-sm font-semibold text-(--color-primary)">
                  {result.dayElement} 오행 · {result.dayYY}
                </p>
                <p className="text-xs text-(--color-secondary) mt-0.5">
                  {isBranchAnimal}띠 해당
                </p>
              </div>
            </div>
          </div>

          {/* 십이직 카드 */}
          <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-5">
            <p className="text-xs text-(--color-secondary) mb-3">십이직 (十二直)</p>
            <div className="flex items-start gap-3">
              <div className="shrink-0 text-center min-w-[48px]">
                <p className="text-3xl font-semibold" style={{ color: starColor }}>
                  {result.sipijik}
                </p>
                <p className="text-xs text-(--color-secondary)">{result.sipijikH}</p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: starColor }}>
                  {isSipijikLabel}
                </p>
                <p className="text-sm text-(--color-secondary) leading-relaxed">
                  {isSipijikDesc}
                </p>
              </div>
            </div>
          </div>

          {/* 음력 / 손 없는 날 */}
          <div
            className="rounded-xl border p-5"
            style={{
              borderColor: isSon ? "var(--color-accent)" : "var(--color-border)",
              backgroundColor: isSon
                ? "color-mix(in srgb, var(--color-accent) 6%, var(--color-surface))"
                : "var(--color-surface)",
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs text-(--color-secondary) mb-1">음력 날짜</p>
                <p className="text-sm text-(--color-primary) leading-relaxed">{isSonText}</p>
              </div>
              <span
                className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{
                  color: isSon ? "var(--color-accent)" : "var(--color-secondary)",
                  backgroundColor: isSon
                    ? "color-mix(in srgb, var(--color-accent) 12%, transparent)"
                    : "transparent",
                  border: isSon ? "1px solid var(--color-accent)" : "1px solid var(--color-border)",
                }}
              >
                {isSonLabel}
              </span>
            </div>
            {isSon && (
              <p className="text-xs text-(--color-secondary) mt-2 leading-relaxed">
                음력 끝자리가 9·0인 날을 전통적으로 &ldquo;손 없는 날&rdquo;이라고 부릅니다. 손(동서남북을 돌아다니며 방해한다는 상상의 귀신)이 쉬는 날로 여겨 이사·개업 등에 좋다고 전해집니다.
              </p>
            )}
          </div>

          {/* 일주 가이드 CTA */}
          {iljuSlug && (
            <Link
              href={`/ilju/${iljuSlug}`}
              className="flex items-center justify-between gap-3 w-full rounded-xl border p-5 hover:border-(--color-accent) transition-colors group"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
            >
              <div>
                <p className="text-xs text-(--color-secondary) mb-1">일주 완전 가이드</p>
                <p className="text-sm font-semibold text-(--color-primary) group-hover:text-(--color-accent) transition-colors">
                  {result.dayStem}{result.dayBranch}({isStemH}{isBranchH}) 일주 — 성격·연애·직업 특징 보기
                </p>
              </div>
              <svg className="w-4 h-4 shrink-0 text-(--color-secondary) group-hover:text-(--color-accent) transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}

          <p className="text-xs text-(--color-secondary) leading-relaxed pt-1">
            십이직·손 없는 날 정보는 전통 민간 신앙에 기반한 참고 자료입니다. 실제 결정은 개인의 판단에 따르시기 바랍니다.
          </p>
        </div>
      )}
    </div>
  );
}
