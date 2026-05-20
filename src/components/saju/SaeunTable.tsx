import { STEMS, BRANCHES, STEM_EL, BRANCH_EL, ELEMENT_COLOR } from "@/lib/saju/constants";
import type { Element } from "@/lib/saju/constants";
import { getSipseong, SIPSEONG_GROUP, SIPSEONG_GROUP_COLOR, SIPSEONG_DESC } from "@/lib/saju/sipseong";

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
                  style={{ color: SIPSEONG_GROUP_COLOR[group] ?? "var(--color-secondary)" }}
                >
                  {sipseong}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {(() => {
        const curStemIdx = ((currentYear - 4) % 10 + 10) % 10;
        const s = getSipseong(dayStemIdx, curStemIdx);
        return (
          <p className="text-xs text-(--color-secondary) mt-3">
            올해 세운 — <span className="font-medium text-(--color-primary)">{s}</span>: {SIPSEONG_DESC[s]}
          </p>
        );
      })()}
    </div>
  );
}
