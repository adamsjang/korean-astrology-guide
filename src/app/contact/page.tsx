import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문의",
  description: "운세 참고서에 문의하실 사항이 있으시면 이메일로 연락 주세요.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-(--color-primary) mb-8">문의</h1>
      <div className="prose prose-stone max-w-none prose-p:text-(--color-primary) prose-p:leading-[1.85]">
        <p>콘텐츠 오류 신고, 제안 사항, 저작권 문의 등은 아래 이메일로 연락 주세요.</p>
        <p>
          <strong>이메일:</strong>{" "}
          <a
            href="mailto:contact@korean-astrology-guide.pages.dev"
            className="text-(--color-accent)"
          >
            contact@korean-astrology-guide.pages.dev
          </a>
        </p>
        <p className="text-sm text-(--color-secondary)">
          광고·협찬·제휴 문의는 수락하지 않습니다. 운세 상담 또한 이 사이트에서는
          제공하지 않습니다.
        </p>
      </div>
    </div>
  );
}
