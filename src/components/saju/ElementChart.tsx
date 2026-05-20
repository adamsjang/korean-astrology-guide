import { ELEMENT_COLOR } from "@/lib/saju/constants";
import type { Element } from "@/lib/saju/constants";

interface ElementChartProps {
  elements: Record<string, number>;
  total: number;
}

const ELEMENT_ORDER: Element[] = ["목", "화", "토", "금", "수"];

export default function ElementChart({ elements, total }: ElementChartProps) {
  return (
    <div className="space-y-2">
      {ELEMENT_ORDER.map((el) => {
        const count = elements[el] ?? 0;
        const pct = total > 0 ? (count / total) * 100 : 0;
        const color = ELEMENT_COLOR[el];
        return (
          <div key={el} className="flex items-center gap-3">
            <span className="w-4 text-sm font-semibold shrink-0" style={{ color }}>
              {el}
            </span>
            <div className="flex-1 h-3 rounded-full bg-(--color-border) overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${pct}%`, backgroundColor: color }}
              />
            </div>
            <span className="w-4 text-sm text-(--color-secondary) text-right shrink-0">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}
