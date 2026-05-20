import { STEMS, BRANCHES, STEM_EL, BRANCH_EL, ELEMENT_COLOR } from "@/lib/saju/constants";
import type { Element } from "@/lib/saju/constants";
import type { DaeunResult } from "@/lib/saju/types";
import { getSipseong, SIPSEONG_GROUP, SIPSEONG_GROUP_COLOR, SIPSEONG_DESC } from "@/lib/saju/sipseong";

interface Props {
  daeun: DaeunResult;
  birthYear: number;
  dayStemIdx?: number;
}

export default function DaeunTable({ daeun, birthYear, dayStemIdx }: Props) {
  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - birthYear;
  const currentDaeunIdx =
    currentAge < daeun.daeunNumber
      ? -1
      : Math.min(
          Math.floor((currentAge - daeun.daeunNumber) / 10),
          daeun.periods.length - 1
        );

  return (
    <div className="rounded-xl border border-(--color-border) p-4" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-(--color-primary)">대운(大運)</p>
        <span className="text-xs text-(--color-secondary)">
          {daeun.daeunNumber}세부터 · {daeun.isForward ? "순행" : "역행"}
        </span>
      </div>

      {currentDaeunIdx === -1 && (
        <p className="text-xs text-(--color-secondary) mb-3">
          아직 첫 대운 전입니다 ({daeun.daeunNumber}세부터 시작)
        </p>
      )}

      <div className="overflow-x-auto">
        <div className="flex gap-2 pb-1" style={{ minWidth: "max-content" }}>
          {daeun.periods.map((period, i) => {
            const isCurrent = i === currentDaeunIdx;
            const stemEl = STEM_EL[period.stemIdx] as Element;
            const branchEl = BRANCH_EL[period.branchIdx] as Element;
            const sipseong = dayStemIdx !== undefined ? getSipseong(dayStemIdx, period.stemIdx) : null;
            const group = sipseong ? SIPSEONG_GROUP[sipseong] : null;
            return (
              <div
                key={i}
                className="rounded-lg border text-center px-3 py-2.5 min-w-[56px]"
                style={{
                  borderColor: isCurrent ? "var(--color-accent)" : "var(--color-border)",
                  backgroundColor: isCurrent ? "color-mix(in srgb, var(--color-accent) 8%, transparent)" : "transparent",
                }}
              >
                <p className="text-xs text-(--color-secondary) mb-1">{period.startAge}세</p>
                <p className="text-base font-semibold leading-tight" style={{ color: ELEMENT_COLOR[stemEl] }}>
                  {STEMS[period.stemIdx]}
                </p>
                <p className="text-base font-semibold leading-tight" style={{ color: ELEMENT_COLOR[branchEl] }}>
                  {BRANCHES[period.branchIdx]}
                </p>
                {sipseong && group && (
                  <p className="text-[10px] mt-1 font-medium" style={{ color: SIPSEONG_GROUP_COLOR[group] }}>
                    {sipseong}
                  </p>
                )}
                {isCurrent && (
                  <p className="text-[10px] mt-0.5 font-semibold" style={{ color: "var(--color-accent)" }}>
                    현재
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {currentDaeunIdx >= 0 && dayStemIdx !== undefined && (() => {
        const cur = daeun.periods[currentDaeunIdx];
        const s = getSipseong(dayStemIdx, cur.stemIdx);
        return (
          <p className="text-xs text-(--color-secondary) mt-3">
            현재 대운 — <span className="font-medium text-(--color-primary)">{s}</span>: {SIPSEONG_DESC[s]}
          </p>
        );
      })()}
      <p className="text-xs text-(--color-secondary) mt-1">
        절기 근사값 기준 — 절기 경계일 출생 시 ±1년 오차가 있을 수 있습니다.
      </p>
    </div>
  );
}
