import { STEMS, BRANCHES, STEM_EL, BRANCH_EL, ELEMENT_COLOR } from "@/lib/saju/constants";
import type { Element } from "@/lib/saju/constants";

const SIPSEONG_LABEL = ["비견","겁재","식신","상관","편재","정재","편관","정관","편인","정인"] as const;
const SIPSEONG_GROUP: Record<string, string> = {
  비견: "비겁", 겁재: "비겁",
  식신: "식상", 상관: "식상",
  편재: "재성", 정재: "재성",
  편관: "관성", 정관: "관성",
  편인: "인성", 정인: "인성",
};

function getSipseong(dayIdx: number, targetIdx: number): string {
  const dayEl = Math.floor(dayIdx / 2);
  const targetEl = Math.floor(targetIdx / 2);
  const sameYY = dayIdx % 2 === targetIdx % 2;
  if (dayEl === targetEl) return sameYY ? "비견" : "겁재";
  if ((dayEl + 1) % 5 === targetEl) return sameYY ? "상관" : "식신";
  if ((dayEl + 2) % 5 === targetEl) return sameYY ? "편재" : "정재";
  if ((targetEl + 2) % 5 === dayEl) return sameYY ? "편관" : "정관";
  if ((targetEl + 1) % 5 === dayEl) return sameYY ? "편인" : "정인";
  return "비견";
}

const GROUP_COLOR: Record<string, string> = {
  비겁: "#6B7280",
  식상: "#059669",
  재성: "#D97706",
  관성: "#7C3AED",
  인성: "#2563EB",
};

interface Props {
  dayStemIdx: number;
}

export default function SaeunTable({ dayStemIdx }: Props) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  return (
    <div className="rounded-xl border border-(--color-border) p-4" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-(--color-primary)">세운(歲運)</p>
        <span className="text-xs text-(--color-secondary)">일간 기준 십성</span>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-2 pb-1" style={{ minWidth: "max-content" }}>
          {years.map((year) => {
            const stemIdx = ((year - 4) % 10 + 10) % 10;
            const branchIdx = ((year - 4) % 12 + 12) % 12;
            const stemEl = STEM_EL[stemIdx] as Element;
            const branchEl = BRANCH_EL[branchIdx] as Element;
            const sipseong = getSipseong(dayStemIdx, stemIdx);
            const group = SIPSEONG_GROUP[sipseong];
            const isCurrent = year === currentYear;

            return (
              <div
                key={year}
                className="rounded-lg border text-center px-2.5 py-2 min-w-[52px]"
                style={{
                  borderColor: isCurrent ? "var(--color-accent)" : "var(--color-border)",
                  backgroundColor: isCurrent
                    ? "color-mix(in srgb, var(--color-accent) 8%, transparent)"
                    : "transparent",
                }}
              >
                <p className="text-[10px] text-(--color-secondary) mb-1">{year}</p>
                <p className="text-sm font-semibold leading-tight" style={{ color: ELEMENT_COLOR[stemEl] }}>
                  {STEMS[stemIdx]}
                </p>
                <p className="text-sm font-semibold leading-tight" style={{ color: ELEMENT_COLOR[branchEl] }}>
                  {BRANCHES[branchIdx]}
                </p>
                <p
                  className="text-[10px] mt-1 font-medium"
                  style={{ color: GROUP_COLOR[group] ?? "var(--color-secondary)" }}
                >
                  {sipseong}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
