import { ELEMENT_COLOR } from "@/lib/saju/constants";
import type { Element } from "@/lib/saju/constants";

interface DivergingChartProps {
  aElements: Record<string, number>;
  bElements: Record<string, number>;
  aTotal: number;
  bTotal: number;
  aLabel?: string;
  bLabel?: string;
}

const ORDER: Element[] = ["목", "화", "토", "금", "수"];

export default function DivergingChart({
  aElements, bElements, aTotal, bTotal,
  aLabel = "나", bLabel = "상대방",
}: DivergingChartProps) {
  const maxTotal = Math.max(aTotal, bTotal, 1);

  return (
    <div>
      {/* 헤더 */}
      <div className="grid grid-cols-[1fr_2rem_1fr] mb-2">
        <span className="text-xs text-(--color-secondary) text-right pr-3">
          {aLabel} <span className="font-medium text-(--color-primary)">({aTotal}자)</span>
        </span>
        <span className="text-xs text-(--color-secondary) text-center">오행</span>
        <span className="text-xs text-(--color-secondary) pl-3">
          {bLabel} <span className="font-medium text-(--color-primary)">({bTotal}자)</span>
        </span>
      </div>

      <div className="space-y-2">
        {ORDER.map((el) => {
          const aC = aElements[el] ?? 0;
          const bC = bElements[el] ?? 0;
          const color = ELEMENT_COLOR[el];
          const aPct = (aC / maxTotal) * 100;
          const bPct = (bC / maxTotal) * 100;

          return (
            <div key={el} className="grid grid-cols-[1fr_2rem_1fr] items-center gap-0">
              {/* A 바: 오른쪽 정렬, 오른쪽에서 왼쪽으로 */}
              <div className="flex items-center justify-end gap-1.5">
                <span className="text-xs w-3 text-right shrink-0" style={{ color }}>
                  {aC > 0 ? aC : ""}
                </span>
                <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-border)" }}>
                  <div
                    className="h-full rounded-full ml-auto"
                    style={{ width: `${aPct}%`, backgroundColor: color }}
                  />
                </div>
              </div>

              {/* 오행 이름 */}
              <span
                className="text-xs font-semibold text-center"
                style={{ color }}
              >
                {el}
              </span>

              {/* B 바: 왼쪽 정렬 */}
              <div className="flex items-center gap-1.5">
                <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-border)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${bPct}%`, backgroundColor: color }}
                  />
                </div>
                <span className="text-xs w-3 shrink-0" style={{ color }}>
                  {bC > 0 ? bC : ""}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
