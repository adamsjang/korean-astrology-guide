import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개",
  description: "운세 참고서는 명리학·별자리·타로·꿈해몽을 교육적으로 해설하는 정보성 콘텐츠 사이트입니다.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-(--color-primary) mb-8">소개</h1>
      <div className="prose prose-stone max-w-none prose-p:text-(--color-primary) prose-p:leading-[1.85] prose-headings:text-(--color-primary)">
        <p>
          <strong>운세 참고서</strong>는 명리학·별자리·타로·꿈해몽·손금·관상 등
          동서양 전통 해석 체계를 교육적으로 소개하는 정보성 콘텐츠 사이트입니다.
        </p>
        <h2>이 사이트의 목적</h2>
        <p>
          운세나 사주 결과를 단순히 &ldquo;찍어주는&rdquo; 서비스가 아닙니다.
          명리학의 기본 개념, 궁합을 보는 기준, 꿈 해석의 다양한 관점 등
          해석의 근거와 맥락을 함께 설명하는 데 집중합니다.
        </p>
        <p>
          독자 스스로 운세·사주·타로 결과를 이해하고 비판적으로 활용할 수 있도록
          돕는 것이 운세 참고서의 역할입니다.
        </p>
        <h2>콘텐츠 방향</h2>
        <ul>
          <li>단정적 표현 대신 &ldquo;전통적으로는 이렇게 해석합니다&rdquo;</li>
          <li>과장 문구 없이 교육적·참고용으로 서술</li>
          <li>모든 글 하단에 면책 고지 포함</li>
          <li>글 1편당 충분한 설명과 맥락 제공</li>
        </ul>
        <p>
          운세는 인생의 절대 기준이 아닙니다. 하나의 관점이자 자기이해 도구로
          현명하게 활용하시기 바랍니다.
        </p>
      </div>
    </div>
  );
}
