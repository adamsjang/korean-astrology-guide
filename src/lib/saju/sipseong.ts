export function getSipseong(dayIdx: number, targetIdx: number): string {
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

export const SIPSEONG_GROUP: Record<string, string> = {
  비견: "비겁", 겁재: "비겁",
  식신: "식상", 상관: "식상",
  편재: "재성", 정재: "재성",
  편관: "관성", 정관: "관성",
  편인: "인성", 정인: "인성",
};

export const SIPSEONG_GROUP_COLOR: Record<string, string> = {
  비겁: "#6B7280",
  식상: "#059669",
  재성: "#D97706",
  관성: "#7C3AED",
  인성: "#2563EB",
};

export const SIPSEONG_DESC: Record<string, string> = {
  비견: "자립심과 경쟁 에너지가 높아지는 시기",
  겁재: "재물 변동과 충동적 결정에 주의가 필요한 시기",
  식신: "창의성과 표현력이 꽃피는 여유로운 시기",
  상관: "변화를 추구하고 기존 틀을 벗어나려는 시기",
  편재: "기회가 열리지만 변동성도 큰 시기",
  정재: "안정적인 재물과 현실 기반이 강화되는 시기",
  편관: "외부 압박과 도전이 많아지는 시기",
  정관: "사회적 책임과 명예가 강조되는 시기",
  편인: "직관과 내면 탐구가 깊어지는 시기",
  정인: "배움과 귀인의 도움이 따르는 시기",
};
