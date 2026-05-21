import type { Metadata } from "next";
import IljinCalculator from "./IljinCalculator";

export const metadata: Metadata = {
  title: "일진 계산기 — 날짜별 일주·십이직·손 없는 날",
  description: "날짜를 입력하면 그날의 일주(천간·지지)와 십이직, 음력 날짜, 손 없는 날 여부를 확인할 수 있습니다.",
  alternates: { canonical: "/iljin" },
  keywords: ["일진", "일진계산기", "오늘일진", "십이직", "손없는날", "일주계산"],
};

export default function IljinPage() {
  return <IljinCalculator />;
}
