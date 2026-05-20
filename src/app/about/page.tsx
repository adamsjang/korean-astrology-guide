import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개",
  description:
    "운세 참고서는 명리학·별자리·타로·꿈해몽을 교육적으로 해설하는 정보성 콘텐츠 사이트입니다. 사이트 목적, 콘텐츠 방향, 운영 원칙을 소개합니다.",
  alternates: { canonical: "/about" },
};

const STATS = [
  { value: "230+", label: "정보성 글" },
  { value: "10",   label: "주제 카테고리" },
  { value: "5+",   label: "무료 계산 도구" },
  { value: "무료",  label: "모든 서비스" },
];

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <p
        className="text-xs font-semibold uppercase tracking-wider mb-2"
        style={{ color: "var(--color-accent)" }}
      >
        소개
      </p>
      <h1 className="text-3xl font-semibold text-(--color-primary) mb-4">
        운세 참고서란
      </h1>
      <p className="text-(--color-secondary) leading-relaxed mb-10">
        명리학·별자리·타로·꿈해몽·손금·관상 등 동서양 전통 해석 체계를
        교육적으로 소개하는 정보성 콘텐츠 사이트입니다.
      </p>

      {/* 통계 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-(--color-border) p-4 text-center"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            <p
              className="text-2xl font-semibold mb-1"
              style={{ color: "var(--color-accent)" }}
            >
              {s.value}
            </p>
            <p className="text-xs text-(--color-secondary)">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="prose prose-stone max-w-none prose-p:text-(--color-primary) prose-p:leading-[1.85] prose-headings:text-(--color-primary) prose-headings:font-semibold prose-li:text-(--color-primary)">
        <h2>이 사이트의 목적</h2>
        <p>
          운세 결과를 단순히 &ldquo;찍어주는&rdquo; 서비스가 아닙니다.
          명리학의 기본 개념, 궁합을 보는 기준, 꿈 해석의 다양한 관점 등
          해석의 <strong>근거와 맥락</strong>을 함께 설명하는 데 집중합니다.
        </p>
        <p>
          독자 스스로 사주·타로·꿈해몽 결과를 이해하고 비판적으로 활용할 수
          있도록 돕는 것이 운세 참고서의 역할입니다.
        </p>

        <h2>콘텐츠 작성 원칙</h2>
        <ul>
          <li>
            <strong>단정적 표현 지양</strong> — &ldquo;반드시 이렇다&rdquo;
            대신 &ldquo;전통적으로는 이렇게 해석합니다&rdquo;로 서술합니다.
          </li>
          <li>
            <strong>출처 명확화</strong> — 한국 전통 민간 신앙, 서양 점성술,
            심리학적 해석 등 관점의 출처를 구분해 설명합니다.
          </li>
          <li>
            <strong>과장 없는 서술</strong> — &ldquo;운명을 바꿔드립니다&rdquo;
            같은 과장 문구 없이 정보 제공에만 집중합니다.
          </li>
          <li>
            <strong>면책 고지 포함</strong> — 모든 글과 계산 도구 하단에 참고
            목적임을 명시합니다.
          </li>
        </ul>

        <h2>제공하는 도구</h2>
        <p>
          콘텐츠 외에 직접 입력해서 사용하는 계산 도구도 무료로 제공합니다.
        </p>
        <ul>
          <li>
            <strong>사주팔자 계산기</strong> — 양력·음력 생년월일시·성별 입력,
            년주·월주·일주·시주와 오행 분포, 대운(大運)·세운(歲運) 계산
            (한국천문연구원 기준)
          </li>
          <li>
            <strong>사주 궁합</strong> — 두 사람의 일간 오행 관계·일지
            합충·오행 분포 비교
          </li>
          <li>
            <strong>타로 카드 뽑기</strong> — 메이저 아르카나 22장 중 랜덤
            뽑기, 라이더-웨이트 카드 이미지 포함
          </li>
          <li>
            <strong>꿈해몽 키워드 검색</strong> — 꿈해몽 글을 실시간 키워드로 검색
          </li>
          <li>
            <strong>타로 질문 테마 뽑기</strong> — 10가지 질문 테마(연애·직업·재물 등)
            선택 후 메이저 아르카나 카드 뽑기
          </li>
        </ul>

        <h2>운세를 대하는 관점</h2>
        <p>
          운세는 인생의 절대 기준이 아닙니다. 수백 년에 걸쳐 형성된 해석
          체계를 통해 자신을 돌아보는 하나의 관점으로 활용할 때 가장
          의미 있습니다. 모든 해석은 참고 자료이며, 최종 선택은 언제나
          당신의 몫입니다.
        </p>
      </div>

      {/* 링크 */}
      <div
        className="mt-10 rounded-xl border border-(--color-border) p-5 flex flex-wrap gap-4 text-sm"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <Link href="/contact" className="text-(--color-accent) hover:underline">
          문의하기
        </Link>
        <Link href="/disclaimer" className="text-(--color-secondary) hover:text-(--color-primary)">
          면책 고지
        </Link>
        <Link href="/privacy" className="text-(--color-secondary) hover:text-(--color-primary)">
          개인정보처리방침
        </Link>
        <Link href="/terms" className="text-(--color-secondary) hover:text-(--color-primary)">
          이용약관
        </Link>
      </div>
    </div>
  );
}
