export type Gender = "male" | "female";

export interface SajuInput {
  year: number;
  month: number;
  day: number;
  hourBranch?: number;       // 0~11 (자~해). undefined = 시주 없음
  calendar: "solar" | "lunar";
  isLeapMonth?: boolean;     // 음력 윤달 여부
  name?: string;             // 궁합 레이블용
  gender?: Gender;
}

export interface Pillar {
  stemIdx: number;   // 0~9 (갑~계)
  branchIdx: number; // 0~11 (자~해)
}

export interface SajuResult {
  input: SajuInput;
  solarDate: { year: number; month: number; day: number };
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour?: Pillar;
}

export interface DaeunPeriod {
  stemIdx: number;
  branchIdx: number;
  startAge: number;
  startYear: number;
}

export interface DaeunResult {
  gender: Gender;
  daeunNumber: number;
  isForward: boolean;
  periods: DaeunPeriod[];
}
