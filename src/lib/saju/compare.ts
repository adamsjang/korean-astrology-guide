import { STEM_EL, BRANCH_EL, STEMS, STEMS_H, BRANCHES, BRANCHES_H, ANIMALS } from "./constants";
import type { Element } from "./constants";
import { countElements } from "./pillars";
import type { SajuResult, Pillar } from "./types";

// ─── 상생·상극 데이터 ────────────────────────────────────────────
const SHENG: Record<string, Element> = { 목:"화", 화:"토", 토:"금", 금:"수", 수:"목" };
const KE:    Record<string, Element> = { 목:"토", 화:"금", 토:"수", 금:"목", 수:"화" };
const SHENG_LABEL: Record<string, string> = {
  목화:"목생화", 화토:"화생토", 토금:"토생금", 금수:"금생수", 수목:"수생목",
};
const KE_LABEL: Record<string, string> = {
  목토:"목극토", 화금:"화극금", 토수:"토극수", 금목:"금극목", 수화:"수극화",
};

// ─── 육합·충·삼합 ────────────────────────────────────────────────
const LIUHE: [number, number, string][] = [
  [0,1,"자축합 (토)"], [2,11,"인해합 (목)"], [3,10,"묘술합 (화)"],
  [4,9,"진유합 (금)"], [5,8,"사신합 (수)"], [6,7,"오미합 (토)"],
];
const CHONG: [number, number, string][] = [
  [0,6,"자오충"], [1,7,"축미충"], [2,8,"인신충"],
  [3,9,"묘유충"], [4,10,"진술충"], [5,11,"사해충"],
];
const SANHE: [number[], string][] = [
  [[2,6,10], "인오술 삼합 (화국)"],
  [[8,0,4],  "신자진 삼합 (수국)"],
  [[11,3,7], "해묘미 삼합 (목국)"],
  [[5,9,1],  "사유축 삼합 (금국)"],
];

// ─── 공개 타입 ────────────────────────────────────────────────────

export interface StemRelation {
  type: "생" | "극" | "비화";
  direction: "a→b" | "b→a" | "equal";
  label: string;
  description: string;
}

export interface BranchRelation {
  type: "육합" | "충" | "삼합" | "동일" | "중립";
  label: string;
  description: string;
}

export interface GunghapAnalysis {
  stem: StemRelation;
  branch: BranchRelation;
  elementCompare: {
    a: Record<Element, number>;
    b: Record<Element, number>;
    aTotal: number;
    bTotal: number;
  };
}

// ─── 분석 함수 ────────────────────────────────────────────────────

function analyzeStem(aStemIdx: number, bStemIdx: number): StemRelation {
  const aEl = STEM_EL[aStemIdx] as Element;
  const bEl = STEM_EL[bStemIdx] as Element;
  const aName = `${STEMS[aStemIdx]}(${aEl})`;
  const bName = `${STEMS[bStemIdx]}(${bEl})`;

  if (aEl === bEl) {
    return {
      type: "비화", direction: "equal",
      label: `${aEl} 비화`,
      description: `두 사람 모두 ${aEl} 기운의 일간입니다. 서로 공명하거나 경쟁적인 면이 함께 나타날 수 있습니다.`,
    };
  }
  if (SHENG[aEl] === bEl) {
    return {
      type: "생", direction: "a→b",
      label: SHENG_LABEL[aEl + bEl] ?? `${aEl}생${bEl}`,
      description: `${aName}이 ${bName}을 북돋아주는 방향입니다. 한 사람이 에너지를 공급하는 흐름이 있습니다.`,
    };
  }
  if (SHENG[bEl] === aEl) {
    return {
      type: "생", direction: "b→a",
      label: SHENG_LABEL[bEl + aEl] ?? `${bEl}생${aEl}`,
      description: `${bName}이 ${aName}을 북돋아주는 방향입니다. 한 사람이 에너지를 공급하는 흐름이 있습니다.`,
    };
  }
  if (KE[aEl] === bEl) {
    return {
      type: "극", direction: "a→b",
      label: KE_LABEL[aEl + bEl] ?? `${aEl}극${bEl}`,
      description: `${aName}이 ${bName}을 견제하는 방향입니다. 긴장감이 만들어지기도 하지만 방향성을 잡아주는 역할로 작용하기도 합니다.`,
    };
  }
  if (KE[bEl] === aEl) {
    return {
      type: "극", direction: "b→a",
      label: KE_LABEL[bEl + aEl] ?? `${bEl}극${aEl}`,
      description: `${bName}이 ${aName}을 견제하는 방향입니다. 긴장감이 만들어지기도 하지만 방향성을 잡아주는 역할로 작용하기도 합니다.`,
    };
  }
  // 모든 5오행 쌍은 위에서 처리됨 (도달 불가)
  return { type: "비화", direction: "equal", label: "중립", description: "" };
}

function analyzeBranch(aBranchIdx: number, bBranchIdx: number): BranchRelation {
  const aName = `${BRANCHES[aBranchIdx]}(${ANIMALS[aBranchIdx]})`;
  const bName = `${BRANCHES[bBranchIdx]}(${ANIMALS[bBranchIdx]})`;

  if (aBranchIdx === bBranchIdx) {
    return {
      type: "동일", label: `${BRANCHES[aBranchIdx]}${BRANCHES_H[aBranchIdx]} 동일`,
      description: `두 사람의 일지가 같습니다. 비슷한 내면 환경과 생활 리듬을 가질 수 있습니다.`,
    };
  }

  for (const [a, b, label] of LIUHE) {
    if ((aBranchIdx === a && bBranchIdx === b) || (aBranchIdx === b && bBranchIdx === a)) {
      return {
        type: "육합", label,
        description: `${aName}과 ${bName}은 서로 끌어당기는 합의 관계입니다.`,
      };
    }
  }

  for (const [a, b, label] of CHONG) {
    if ((aBranchIdx === a && bBranchIdx === b) || (aBranchIdx === b && bBranchIdx === a)) {
      return {
        type: "충", label,
        description: `${aName}과 ${bName}은 서로 부딪히는 충의 관계입니다. 긴장감을 만들기도 하지만 역동성의 원천이 되기도 합니다.`,
      };
    }
  }

  for (const [group, label] of SANHE) {
    if (group.includes(aBranchIdx) && group.includes(bBranchIdx)) {
      return {
        type: "삼합", label,
        description: `${aName}과 ${bName}은 같은 삼합 그룹에 속합니다. 같은 방향의 에너지로 공명하는 면이 있습니다.`,
      };
    }
  }

  return {
    type: "중립", label: "중립",
    description: `${aName}과 ${bName}은 특별한 합충 관계에 해당하지 않습니다.`,
  };
}

export function getPillarLabel(p: Pillar): string {
  return `${STEMS[p.stemIdx]}${STEMS_H[p.stemIdx]} / ${BRANCHES[p.branchIdx]}${BRANCHES_H[p.branchIdx]}`;
}

export function analyze(a: SajuResult, b: SajuResult): GunghapAnalysis {
  const aEl = countElements([a.year, a.month, a.day, a.hour]);
  const bEl = countElements([b.year, b.month, b.day, b.hour]);
  const aTotal = Object.values(aEl).reduce((s, v) => s + v, 0);
  const bTotal = Object.values(bEl).reduce((s, v) => s + v, 0);

  return {
    stem:   analyzeStem(a.day.stemIdx, b.day.stemIdx),
    branch: analyzeBranch(a.day.branchIdx, b.day.branchIdx),
    elementCompare: { a: aEl, b: bEl, aTotal, bTotal },
  };
}
