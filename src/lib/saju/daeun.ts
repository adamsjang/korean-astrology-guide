import type { SajuResult, DaeunPeriod, DaeunResult, Gender } from "./types";

// 12절기 고정 근사 날짜 (연도 무관, ±1~2일 오차)
// 인덱스 = 사주 월 인덱스 (0=인월 입춘, ..., 11=축월 소한)
const JEOIGI_12: [number, number][] = [
  [2,  4],  // 0: 입춘 → 인월
  [3,  6],  // 1: 경칩 → 묘월
  [4,  5],  // 2: 청명 → 진월
  [5,  6],  // 3: 입하 → 사월
  [6,  6],  // 4: 망종 → 오월
  [7,  7],  // 5: 소서 → 미월
  [8,  7],  // 6: 입추 → 신월
  [9,  8],  // 7: 백로 → 유월
  [10, 8],  // 8: 한로 → 술월
  [11, 7],  // 9: 입동 → 해월
  [12, 7],  // 10: 대설 → 자월
  [1,  6],  // 11: 소한 → 축월
];

function getSajuMonthIdx(month: number, day: number): number {
  if (month === 1) return day < 6 ? 10 : 11;
  if (month === 2 && day < 4) return 11;
  const terms: [number, number][] = [
    [2,4],[3,6],[4,5],[5,6],[6,6],[7,7],[8,7],[9,8],[10,8],[11,7],[12,7],
  ];
  let idx = 0;
  for (let i = 0; i < terms.length; i++) {
    const [m, d] = terms[i];
    if (month > m || (month === m && day >= d)) idx = i;
  }
  return idx;
}

function getAdjacentJeoigiDate(
  birthYear: number, birthMonth: number, birthDay: number,
  direction: "next" | "prev"
): Date {
  const monthIdx = getSajuMonthIdx(birthMonth, birthDay);
  // 순행: 다음 절기(+1), 역행: 현재 월 시작 절기(±0)
  const offset = direction === "next" ? 1 : 0;
  const targetIdx = ((monthIdx + offset) % 12 + 12) % 12;
  const [jm, jd] = JEOIGI_12[targetIdx];
  const birth = new Date(birthYear, birthMonth - 1, birthDay);
  const yearOrder = direction === "next" ? [0, 1, -1] : [0, -1, 1];
  for (const yo of yearOrder) {
    const candidate = new Date(birthYear + yo, jm - 1, jd);
    if (direction === "next" && candidate > birth) return candidate;
    if (direction === "prev" && candidate <= birth) return candidate;
  }
  return new Date(birthYear, jm - 1, jd);
}

export function calculateDaeun(result: SajuResult, gender: Gender): DaeunResult {
  const { solarDate, month: monthPillar, year: yearPillar } = result;
  const { year: birthYear, month: birthMonth, day: birthDay } = solarDate;

  // 년 천간 음양: 짝수 인덱스(갑병무경임) = 양
  const yearIsYang = yearPillar.stemIdx % 2 === 0;
  const isForward = (gender === "male" && yearIsYang) || (gender === "female" && !yearIsYang);

  const direction = isForward ? "next" : "prev";
  const adjacentDate = getAdjacentJeoigiDate(birthYear, birthMonth, birthDay, direction);
  const birth = new Date(birthYear, birthMonth - 1, birthDay);
  const daysDiff = Math.round(
    Math.abs(adjacentDate.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daeunNumber = Math.round(daysDiff / 3);

  const periods: DaeunPeriod[] = [];
  for (let i = 1; i <= 10; i++) {
    const stemIdx = isForward
      ? (monthPillar.stemIdx + i) % 10
      : ((monthPillar.stemIdx - i) % 10 + 10) % 10;
    const branchIdx = isForward
      ? (monthPillar.branchIdx + i) % 12
      : ((monthPillar.branchIdx - i) % 12 + 12) % 12;
    const startAge = daeunNumber + (i - 1) * 10;
    const startYear = birthYear + startAge;
    periods.push({ stemIdx, branchIdx, startAge, startYear });
  }

  return { gender, daeunNumber, isForward, periods };
}
