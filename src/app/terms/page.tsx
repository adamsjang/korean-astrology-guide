import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관",
  description: "운세 참고서 이용약관입니다.",
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-(--color-primary) mb-8">이용약관</h1>
      <div className="prose prose-stone max-w-none prose-p:text-(--color-primary) prose-p:leading-[1.85] prose-headings:text-(--color-primary)">
        <h2>제1조 목적</h2>
        <p>
          본 약관은 운세 참고서(이하 &ldquo;사이트&rdquo;)가 제공하는 서비스를
          이용하는 데 필요한 기본 사항을 정합니다.
        </p>

        <h2>제2조 서비스 이용</h2>
        <ul>
          <li>사이트의 모든 콘텐츠는 개인적·비상업적 목적으로만 이용 가능합니다.</li>
          <li>콘텐츠를 무단으로 복제·배포·판매하는 행위를 금합니다.</li>
          <li>
            사이트 콘텐츠를 타인에게 해가 되는 방식으로 이용하는 행위를
            금합니다.
          </li>
        </ul>

        <h2>제3조 콘텐츠의 성격</h2>
        <p>
          사이트의 모든 운세·사주·타로·꿈해몽 관련 콘텐츠는 교육적·참고용
          정보이며, 법적·의료적·재정적 조언이 아닙니다. 이를 근거로 한 의사결정의
          결과에 대해 사이트는 책임을 지지 않습니다.
        </p>

        <h2>제4조 저작권</h2>
        <p>
          사이트에 게시된 글, 이미지, 구성 등의 저작권은 운세 참고서에 귀속됩니다.
          인용 시 출처를 명기하고 원문 링크를 포함해 주세요.
        </p>

        <h2>제5조 약관의 변경</h2>
        <p>
          본 약관은 사전 고지 없이 변경될 수 있습니다. 변경된 약관은 사이트 게시
          시점부터 효력이 발생합니다.
        </p>

        <p className="text-sm text-(--color-secondary)">
          최종 수정일: {new Date().toISOString().split("T")[0]}
        </p>
      </div>
    </div>
  );
}
