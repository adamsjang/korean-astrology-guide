import TarotReading from "./TarotReading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘의 타로 카드 뽑기",
  description: "메이저 아르카나 22장 중 오늘의 카드를 뽑아보세요. 카드의 상징과 의미를 통해 현재 상황을 돌아볼 수 있습니다.",
  alternates: { canonical: "/tarot-reading" },
};

export default function TarotReadingPage() {
  return <TarotReading />;
}
