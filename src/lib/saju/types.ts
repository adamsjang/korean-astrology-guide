export interface SajuInput {
  year: number;
  month: number;
  day: number;
  hourBranch?: number;       // 0~11 (자~해). undefined = 시주 없음
  calendar: "solar" | "lunar";
  isLeapMonth?: boolean;     // 음력 윤달 여부
  name?: string;             // 궁합 레이블용
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
  // 확장 슬롯
  // daeun?: DaeunPeriod[];
  // yongshin?: string;
}
