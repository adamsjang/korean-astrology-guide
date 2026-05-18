import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "면책 고지",
  description: "운세 참고서의 콘텐츠 이용 시 주의사항 및 면책 고지입니다.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-(--color-primary) mb-8">면책 고지</h1>
      <div className="prose prose-stone max-w-none prose-p:text-(--color-primary) prose-p:leading-[1.85] prose-headings:text-(--color-primary)">
        <p>
          운세 참고서의 모든 콘텐츠는 <strong>오락·문화·자기이해 목적</strong>으로
          제공됩니다.
        </p>
        <h2>콘텐츠의 한계</h2>
        <ul>
          <li>
            본 사이트의 사주·명리학·별자리·타로·꿈해몽·손금·관상 등의 해석은
            법률·의료·재정·혼인 결정의 절대적 기준이 아닙니다.
          </li>
          <li>
            운세 결과는 개인의 실제 상황, 노력, 선택에 따라 달라질 수 있습니다.
          </li>
          <li>
            &ldquo;반드시 이렇게 된다&rdquo;, &ldquo;100% 맞다&rdquo; 같은 단정은
            이 사이트에서 사용하지 않습니다.
          </li>
        </ul>
        <h2>전문 상담 권고</h2>
        <p>
          법률·의료·심리·재정 관련 결정이 필요하신 경우, 반드시 해당 분야의
          전문가와 상담하시기 바랍니다. 운세나 사주 해석이 전문가 상담을
          대체할 수 없습니다.
        </p>
        <h2>외부 링크</h2>
        <p>
          본 사이트가 제공하는 외부 링크의 내용에 대해서는 책임을 지지 않습니다.
        </p>
      </div>
    </div>
  );
}
