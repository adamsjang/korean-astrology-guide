import SajuCalculator from "./SajuCalculator";

export const metadata = {
  title: "사주팔자 계산기",
  description: "생년월일시를 입력하면 사주팔자(四柱八字)를 계산합니다. 양력·음력 모두 지원합니다.",
  alternates: { canonical: "/saju-calculator" },
};

export default function Page() {
  return <SajuCalculator />;
}
