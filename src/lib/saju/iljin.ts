import KoreanLunarCalendar from "korean-lunar-calendar";
import { STEMS, BRANCHES, STEM_EL, BRANCH_EL, STEM_YY } from "./constants";
import type { Element } from "./constants";

const SIPIJIK    = ["건","제","만","평","정","집","파","위","성","수","개","폐"] as const;
const SIPIJIK_H  = ["建","除","滿","平","定","執","破","危","成","收","開","閉"] as const;
// 1=길, 0=중, -1=흉
const SIPIJIK_STAR: (1|0|-1)[] = [1, 1, 0, -1, 1, -1, -1, -1, 1, 0, 1, -1];

export interface IljinResult {
  dayStemIdx:   number;
  dayBranchIdx: number;
  dayStem:      string;
  dayBranch:    string;
  dayElement:   Element;
  dayYY:        string;
  sipijikIdx:   number;
  sipijik:      string;
  sipijikH:     string;
  sipijikStar:  1 | 0 | -1;
  lunarYear:    number;
  lunarMonth:   number;
  lunarDay:     number;
  lunarLeap:    boolean;
  sonNone:      boolean;
}

export function calculateIljin(year: number, month: number, day: number): IljinResult {
  const cal = new KoreanLunarCalendar();
  cal.setSolarDate(year, month, day);

  const gapja = cal.getKoreanGapja() as { year: string; month: string; day: string };
  const lunar  = cal.getLunarCalendar() as { year: number; month: number; day: number; intercalation: boolean };

  const dayStemIdx   = STEMS.indexOf(gapja.day[0] as typeof STEMS[number]);
  const dayBranchIdx = BRANCHES.indexOf(gapja.day[1] as typeof BRANCHES[number]);

  const monthBranchIdx = BRANCHES.indexOf(gapja.month[1] as typeof BRANCHES[number]);
  const sipijikIdx = (dayBranchIdx - monthBranchIdx + 12) % 12;

  const sonNone = lunar.day % 10 === 0 || lunar.day % 10 === 9;

  return {
    dayStemIdx,
    dayBranchIdx,
    dayStem:     gapja.day[0],
    dayBranch:   gapja.day[1],
    dayElement:  STEM_EL[dayStemIdx] as Element,
    dayYY:       STEM_YY[dayStemIdx],
    sipijikIdx,
    sipijik:     SIPIJIK[sipijikIdx],
    sipijikH:    SIPIJIK_H[sipijikIdx],
    sipijikStar: SIPIJIK_STAR[sipijikIdx],
    lunarYear:   lunar.year,
    lunarMonth:  lunar.month,
    lunarDay:    lunar.day,
    lunarLeap:   lunar.intercalation,
    sonNone,
  };
}
