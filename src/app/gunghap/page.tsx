import GunghapChecker from "./GunghapChecker";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사주 궁합",
  description: "두 사람의 생년월일시를 입력해 일간 오행 관계, 일지 합충, 오행 분포를 비교합니다.",
  alternates: { canonical: "/gunghap" },
};

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--color-cat-compatibility)" }}>
        궁합
      </p>
      <h1 className="text-3xl font-semibold text-(--color-primary) mb-2">사주 궁합</h1>
      <p className="text-(--color-secondary) mb-8 text-sm leading-relaxed">
        두 사람의 생년월일시를 입력하면 일간 오행 관계와 일지 합충을 분석합니다.
      </p>
      <GunghapChecker />
    </div>
  );
}
