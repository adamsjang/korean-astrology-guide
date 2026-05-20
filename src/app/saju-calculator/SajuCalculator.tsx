"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateSaju, countElements } from "@/lib/saju/pillars";
import { calculateDaeun } from "@/lib/saju/daeun";
import type { SajuInput, DaeunResult, Gender } from "@/lib/saju/types";
import type { SajuResult } from "@/lib/saju/types";
import { STEMS, STEMS_H, BRANCHES, STEM_EL, STEM_YY, ELEMENT_COLOR } from "@/lib/saju/constants";
import type { Element } from "@/lib/saju/constants";
import DateInput from "@/components/saju/DateInput";
import PillarCard from "@/components/saju/PillarCard";
import ElementChart from "@/components/saju/ElementChart";
import DaeunTable from "@/components/saju/DaeunTable";
import SaeunTable from "@/components/saju/SaeunTable";
import { getIljuSlug } from "@/lib/saju/ilju-slugs";

const ELEMENT_LABELS: Record<string, string> = { 목: "목", 화: "화", 토: "토", 금: "금", 수: "수" };

const DEFAULT_INPUT: SajuInput = {
  year: 1990,
  month: 1,
  day: 1,
  hourBranch: undefined,
  calendar: "solar",
};

export default function SajuCalculator() {
  const [input, setInput] = useState<SajuInput>(DEFAULT_INPUT);
  const [gender, setGender] = useState<Gender>("male");
  const [result, setResult] = useState<SajuResult | null>(null);
  const [daeunResult, setDaeunResult] = useState<DaeunResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function calculate() {
    setError(null);
    try {
      const res = calculateSaju(input);
      setResult(res);
      setDaeunResult(calculateDaeun(res, gender));
      try {
        localStorage.setItem("saju_last_input", JSON.stringify({ ...input, gender }));
      } catch { /* ignore */ }
    } catch (e) {
      setError(e instanceof Error ? e.message : "계산 중 오류가 발생했습니다.");
      setResult(null);
      setDaeunResult(null);
    }
  }

  function copyResult() {
    if (!result) return;
    const p = (s: number, b: number) => `${STEMS[s]}${BRANCHES[b]}`;
    const lines = [
      `내 사주 (운세 참고서)`,
      ``,
      `년주 ${p(result.year.stemIdx, result.year.branchIdx)} · 월주 ${p(result.month.stemIdx, result.month.branchIdx)} · 일주 ${p(result.day.stemIdx, result.day.branchIdx)}${result.hour ? ` · 시주 ${p(result.hour.stemIdx, result.hour.branchIdx)}` : ""}`,
      `일간: ${STEMS[result.day.stemIdx]}${STEMS_H[result.day.stemIdx]} (${STEM_EL[result.day.stemIdx]} · ${STEM_YY[result.day.stemIdx]})`,
    ];
    if (elementCounts) {
      const el = Object.entries(elementCounts)
        .filter(([, v]) => v > 0)
        .map(([k, v]) => `${ELEMENT_LABELS[k] ?? k}${v}`)
        .join(" ");
      lines.push(`오행: ${el}`);
    }
    lines.push(``, `https://korean-astrology-guide.pages.dev/saju-calculator`);
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const pillars = result
    ? [
        { pillar: result.year, label: "년주" },
        { pillar: result.month, label: "월주" },
        { pillar: result.day, label: "일주", isDay: true },
        ...(result.hour ? [{ pillar: result.hour, label: "시주" }] : []),
      ]
    : [];

  const elementCounts = result
    ? countElements([result.year, result.month, result.day, result.hour])
    : null;

  const total = elementCounts
    ? Object.values(elementCounts).reduce((a, b) => a + b, 0)
    : 0;

  const dayStemEl = result ? (STEM_EL[result.day.stemIdx] as Element) : null;
  const dayStemColor = dayStemEl ? ELEMENT_COLOR[dayStemEl] : undefined;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--color-accent)" }}>
        사주
      </p>
      <h1 className="text-3xl font-semibold text-(--color-primary) mb-2">사주팔자 계산기</h1>
      <p className="text-(--color-secondary) mb-8 text-sm leading-relaxed">
        생년월일시를 입력하면 사주팔자를 계산합니다.
      </p>

      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-5 mb-4 space-y-4">
        <DateInput value={input} onChange={setInput} showHour={true} />
        <div>
          <p className="text-xs text-(--color-secondary) mb-2">성별 (대운 계산용)</p>
          <div className="flex gap-2">
            {(["male", "female"] as Gender[]).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className="flex-1 py-2 rounded-lg text-sm font-semibold border transition-colors"
                style={{
                  borderColor: gender === g ? "var(--color-accent)" : "var(--color-border)",
                  color: gender === g ? "var(--color-accent)" : "var(--color-secondary)",
                  backgroundColor: gender === g
                    ? "color-mix(in srgb, var(--color-accent) 8%, transparent)"
                    : "transparent",
                }}
              >
                {g === "male" ? "남자" : "여자"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 mb-4 px-1">{error}</p>
      )}

      <button
        type="button"
        onClick={calculate}
        className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        계산하기
      </button>

      {result && (
        <div className="mt-8 space-y-6">
          {/* Mobile layout */}
          <div className="md:hidden space-y-3">
            {pillars.map(({ pillar, label, isDay }) => (
              <PillarCard
                key={label}
                pillar={pillar}
                label={label}
                isDay={isDay}
                compact={!isDay}
              />
            ))}
          </div>

          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-3">
            {pillars.map(({ pillar, label, isDay }) => (
              <PillarCard
                key={label}
                pillar={pillar}
                label={label}
                isDay={isDay}
                compact={false}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={copyResult}
            className="w-full py-2.5 rounded-xl border text-sm font-semibold transition-colors"
            style={{
              borderColor: copied ? "var(--color-accent)" : "var(--color-border)",
              color: copied ? "var(--color-accent)" : "var(--color-secondary)",
            }}
          >
            {copied ? "복사됨 ✓" : "결과 텍스트 복사"}
          </button>

          <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 text-sm leading-relaxed text-(--color-secondary)">
            <p>
              일주의 천간{" "}
              <span className="font-semibold" style={{ color: dayStemColor }}>
                {STEMS[result.day.stemIdx]}{STEMS_H[result.day.stemIdx]}
              </span>
              이 나를 나타냅니다.{" "}
              <span style={{ color: dayStemColor }}>{STEM_EL[result.day.stemIdx]}</span> 기운 ·{" "}
              <span className="text-(--color-primary)">{STEM_YY[result.day.stemIdx]}</span>
            </p>
            {(() => {
              const slug = getIljuSlug(result.day.stemIdx, result.day.branchIdx);
              if (!slug) return null;
              return (
                <Link
                  href={`/ilju/${slug}`}
                  className="inline-flex items-center gap-1 mt-2 text-xs font-medium hover:underline"
                  style={{ color: "var(--color-accent)" }}
                >
                  {STEMS[result.day.stemIdx]}{BRANCHES[result.day.branchIdx]} 일주 가이드 보기
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })()}
          </div>

          {result.input.calendar === "lunar" && (
            <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 text-sm text-(--color-secondary)">
              입력하신 음력{" "}
              <span className="text-(--color-primary)">
                {result.input.year}년 {result.input.month}월 {result.input.day}일
                {result.input.isLeapMonth ? " (윤달)" : ""}
              </span>
              {" → "}양력{" "}
              <span className="text-(--color-primary)">
                {result.solarDate.year}년 {result.solarDate.month}월 {result.solarDate.day}일
              </span>
            </div>
          )}

          {elementCounts && (
            <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-5">
              <p className="text-sm font-semibold text-(--color-primary) mb-4">오행 분포</p>
              <ElementChart elements={elementCounts} total={total} />
            </div>
          )}

          {daeunResult && (
            <DaeunTable daeun={daeunResult} birthYear={result.solarDate.year} dayStemIdx={result.day.stemIdx} />
          )}

          <SaeunTable dayStemIdx={result.day.stemIdx} />

          <div className="rounded-xl border border-(--color-border) bg-(--color-surface) overflow-hidden">
            <button
              type="button"
              onClick={() => setGuideOpen((o) => !o)}
              className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-(--color-primary) hover:bg-(--color-base) transition-colors"
            >
              <span>사주팔자 읽는 법</span>
              <span className="text-(--color-secondary)">{guideOpen ? "▲" : "▼"}</span>
            </button>
            {guideOpen && (
              <div className="px-5 pb-5 text-sm text-(--color-secondary) leading-relaxed border-t border-(--color-border) pt-4">
                일주(나)의 천간이 나 자신을 나타냅니다. 천간은 드러나는 모습, 지지는 내면의 환경을 상징합니다. 사주 해석은 8자의 관계 전체를 보는 것으로, 개별 글자만으로 판단하지 않습니다.
              </div>
            )}
          </div>

          <Link
            href="/gunghap"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border text-sm font-semibold transition-colors hover:border-(--color-accent) hover:text-(--color-accent)"
            style={{ borderColor: "var(--color-border)", color: "var(--color-secondary)" }}
          >
            두 사람 궁합 계산하기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <p className="text-xs text-(--color-secondary) leading-relaxed">
            본 계산기는 정보 제공 목적이며 ±1~2일 오차가 있을 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}
