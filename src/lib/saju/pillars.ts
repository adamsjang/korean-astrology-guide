import KoreanLunarCalendar from "korean-lunar-calendar";
import { STEMS, BRANCHES, STEM_EL, BRANCH_EL } from "./constants";
import type { SajuInput, SajuResult, Pillar } from "./types";
import type { Element } from "./constants";

// ─── 년주 ─────────────────────────────────────────────────────────
// 입춘(~2월 4일) 기준으로 연도 전환. ±1일 오차 있음 (2021·2025 등 입춘=2/3인 해)
function getYearPillar(year: number, month: number, day: number): Pillar {
  let y = year;
  if (month < 2 || (month === 2 && day < 4)) y--;
  return {
    stemIdx:   ((y - 4) % 10 + 10) % 10,
    branchIdx: ((y - 4) % 12 + 12) % 12,
  };
}

// ─── 월주 ─────────────────────────────────────────────────────────
// 절기 기준 근사 날짜 (연도마다 ±1~2일 오차 있음)
// 인월(0)=입춘 Feb4, 묘월(1)=경칩 Mar6, ..., 자월(10)=대설 Dec7, 축월(11)=소한 Jan6
const SOLAR_TERMS: [number, number][] = [
  [2,4],[3,6],[4,5],[5,6],[6,6],[7,7],[8,7],[9,8],[10,8],[11,7],[12,7],
];

function getSajuMonthIdx(month: number, day: number): number {
  if (month === 1) return day < 6 ? 10 : 11;  // 소한(1/6) 전=자월, 후=축월
  if (month === 2 && day < 4) return 11;        // 입춘 전=축월
  let idx = 0;
  for (let i = 0; i < SOLAR_TERMS.length; i++) {
    const [m, d] = SOLAR_TERMS[i];
    if (month > m || (month === m && day >= d)) idx = i;
  }
  return idx;
}

function getMonthPillar(month: number, day: number, yearStemIdx: number): Pillar {
  const monthIdx  = getSajuMonthIdx(month, day);
  const branchIdx = (monthIdx + 2) % 12;                     // 인(2)부터 시작
  const starts    = [2,4,6,8,0, 2,4,6,8,0];                  // 갑기→병, 을경→무, ...
  const stemIdx   = (starts[yearStemIdx] + monthIdx) % 10;
  return { stemIdx, branchIdx };
}

// ─── 일주 ─────────────────────────────────────────────────────────
// korean-lunar-calendar 패키지(KARI 기준) gapja 문자열 파싱
// 자시 경계 정책: 자정(00:00) 기준 (현대 다수설)
function parseStemBranch(str: string): Pillar {
  const stemIdx   = STEMS.indexOf(str[0] as typeof STEMS[number]);
  const branchIdx = BRANCHES.indexOf(str[1] as typeof BRANCHES[number]);
  if (stemIdx === -1 || branchIdx === -1) throw new Error(`파싱 불가: ${str}`);
  return { stemIdx, branchIdx };
}

// ─── 시주 ─────────────────────────────────────────────────────────
// 갑기일→자시甲(0), 을경→丙(2), 병신→戊(4), 정임→庚(6), 무계→壬(8)
function getHourPillar(hourBranch: number, dayStemIdx: number): Pillar {
  const starts = [0,2,4,6,8, 0,2,4,6,8];
  return { stemIdx: (starts[dayStemIdx] + hourBranch) % 10, branchIdx: hourBranch };
}

// ─── 오행 분포 ────────────────────────────────────────────────────
export function countElements(pillars: (Pillar | undefined)[]): Record<Element, number> {
  const counts: Record<Element, number> = { 목:0, 화:0, 토:0, 금:0, 수:0 };
  for (const p of pillars) {
    if (!p) continue;
    counts[STEM_EL[p.stemIdx] as Element]++;
    counts[BRANCH_EL[p.branchIdx] as Element]++;
  }
  return counts;
}

// ─── 메인 계산 함수 ───────────────────────────────────────────────
export function calculateSaju(input: SajuInput): SajuResult {
  const cal = new KoreanLunarCalendar();

  let solarDate: { year: number; month: number; day: number };

  if (input.calendar === "lunar") {
    const valid = cal.setLunarDate(
      input.year, input.month, input.day,
      input.isLeapMonth ?? false
    );
    if (!valid) throw new Error("유효하지 않은 음력 날짜입니다.");
    solarDate = cal.getSolarCalendar() as typeof solarDate;
  } else {
    solarDate = { year: input.year, month: input.month, day: input.day };
  }

  const { year, month, day } = solarDate;

  // 일주: 라이브러리 gapja (KARI 정밀 데이터)
  cal.setSolarDate(year, month, day);
  const dayGapja = (cal.getKoreanGapja() as { day: string }).day;
  const dayPillar = parseStemBranch(dayGapja);

  // 년주/월주: 직접 계산 (입춘·절기 기준)
  const yearPillar  = getYearPillar(year, month, day);
  const monthPillar = getMonthPillar(month, day, yearPillar.stemIdx);
  const hourPillar  = input.hourBranch !== undefined
    ? getHourPillar(input.hourBranch, dayPillar.stemIdx)
    : undefined;

  return { input, solarDate, year: yearPillar, month: monthPillar, day: dayPillar, hour: hourPillar };
}
