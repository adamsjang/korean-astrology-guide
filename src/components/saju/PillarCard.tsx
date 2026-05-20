import {
  STEMS,
  STEMS_H,
  BRANCHES,
  BRANCHES_H,
  ANIMALS,
  STEM_EL,
  BRANCH_EL,
  STEM_YY,
  BRANCH_YY,
  ELEMENT_COLOR,
} from "@/lib/saju/constants";
import type { Element } from "@/lib/saju/constants";
import type { Pillar } from "@/lib/saju/types";

interface PillarCardProps {
  pillar: Pillar;
  label: string;
  isDay?: boolean;
  compact?: boolean;
}

export default function PillarCard({ pillar, label, isDay = false, compact = false }: PillarCardProps) {
  const stemChar = STEMS[pillar.stemIdx];
  const stemHanja = STEMS_H[pillar.stemIdx];
  const stemEl = STEM_EL[pillar.stemIdx] as Element;
  const stemYY = STEM_YY[pillar.stemIdx];

  const branchChar = BRANCHES[pillar.branchIdx];
  const branchHanja = BRANCHES_H[pillar.branchIdx];
  const branchEl = BRANCH_EL[pillar.branchIdx] as Element;
  const branchYY = BRANCH_YY[pillar.branchIdx];
  const animal = ANIMALS[pillar.branchIdx];

  const stemColor = ELEMENT_COLOR[stemEl];
  const branchColor = ELEMENT_COLOR[branchEl];

  const borderClass = isDay
    ? "border-2 border-(--color-accent)"
    : "border border-(--color-border)";

  const paddingClass = compact ? "p-3" : "p-4";
  const bigTextClass = compact ? "text-3xl" : "text-4xl";
  const labelTextClass = compact ? "text-xs" : "text-sm";

  return (
    <div className={`rounded-xl bg-(--color-surface) ${borderClass} ${paddingClass}`}>
      <p className={`${labelTextClass} font-semibold text-(--color-secondary) mb-3`}>{label}</p>

      <div className="flex items-center gap-2 mb-3">
        <span className={`${bigTextClass} font-bold leading-none`} style={{ color: stemColor }}>
          {stemChar}
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-(--color-secondary)">{stemHanja}</span>
          <span
            className="text-xs px-1.5 py-0.5 rounded leading-none"
            style={{ color: stemColor, backgroundColor: `${stemColor}1a` }}
          >
            {stemEl} · {stemYY}
          </span>
        </div>
      </div>

      <hr className="border-(--color-border) mb-3" />

      <div className="flex items-center gap-2">
        <span className={`${bigTextClass} font-bold leading-none`} style={{ color: branchColor }}>
          {branchChar}
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-(--color-secondary)">{branchHanja}</span>
          <span
            className="text-xs px-1.5 py-0.5 rounded leading-none"
            style={{ color: branchColor, backgroundColor: `${branchColor}1a` }}
          >
            {branchEl} · {branchYY}
          </span>
          <span className="text-xs text-(--color-secondary)">{animal}</span>
        </div>
      </div>
    </div>
  );
}
