import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import { ALL_CATEGORY_SLUGS } from "@/lib/categories";

export const metadata: Metadata = {
  title: "소개",
  description:
    "운세 참고서는 명리학·별자리·타로·꿈해몽을 교육적으로 해설하는 정보성 콘텐츠 사이트입니다. 운영 원칙, 콘텐츠 작성 절차, 참고 자료, 광고 공지, 정정 정책을 안내합니다.",
  alternates: { canonical: "/about" },
};

const TOOLS = [
  "사주팔자 계산기",
  "사주 궁합",
  "타로 카드 뽑기",
  "꿈해몽 키워드 검색",
  "일진 계산기",
  "타로 질문 테마 뽑기",
];

export default function AboutPage() {
  const postCount = getAllPosts().length;
  const categoryCount = ALL_CATEGORY_SLUGS.length;
  const toolCount = TOOLS.length;

  const STATS = [
    { value: `${postCount}+`, label: "정보성 글" },
    { value: `${categoryCount}`, label: "주제 카테고리" },
    { value: `${toolCount}`, label: "무료 계산 도구" },
    { value: "무료", label: "모든 서비스" },
  ];

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
          운세 결과를 단순히 &ldquo;찍어주는&rdquo; 서비스가 아닙니다. 명리학의
          기본 개념, 궁합을 보는 기준, 꿈 해석의 다양한 관점 등 해석의{" "}
          <strong>근거와 맥락</strong>을 함께 설명하는 데 집중합니다.
        </p>
        <p>
          독자 스스로 사주·타로·꿈해몽 결과를 이해하고 비판적으로 활용할 수
          있도록 돕는 것이 운세 참고서의 역할입니다.
        </p>

        <h2>사이트 운영</h2>
        <p>
          운세 참고서는 2026년에 개설된 비상업 개인 운영 정보 사이트입니다.
          명리학·점성술·타로·꿈해몽 자료를 오랫동안 수집·정리해 온 운영자가
          개인 학습 정리를 공개 자료로 다듬어 공유합니다. 글은 한 번 발행한
          뒤에도 새로운 자료나 독자 피드백을 반영해 주기적으로 보강합니다.
        </p>
        <p>
          현재 {postCount}편 이상의 글을 {categoryCount}개 카테고리에 정리해 두었고,{" "}
          {toolCount}가지 무료 계산 도구를 함께 제공합니다. 모든 글과 도구는 별도의
          가입 절차 없이 누구나 무료로 열람할 수 있습니다.
        </p>

        <h2>콘텐츠 작성 원칙</h2>
        <ul>
          <li>
            <strong>단정적 표현 지양</strong> — &ldquo;반드시 이렇다&rdquo;
            대신 &ldquo;전통적으로는 이렇게 해석합니다&rdquo;로 서술합니다.
          </li>
          <li>
            <strong>출처와 관점 구분</strong> — 한국 전통 민간 신앙, 중국 고전
            명리학, 서양 점성술, 라이더-웨이트 타로 해석, 현대 심리학적 관점
            등 출처가 다르면 그 차이를 명시합니다.
          </li>
          <li>
            <strong>과장 없는 서술</strong> — &ldquo;운명을 바꿔드립니다&rdquo;
            같은 과장 문구 없이 정보 제공에만 집중합니다.
          </li>
          <li>
            <strong>면책 고지 포함</strong> — 모든 글과 계산 도구 하단에 참고
            목적임을 명시하며, 의료·법률·재정·진로 결정의 절대 기준이 아님을
            안내합니다.
          </li>
        </ul>

        <h2>편집 및 검수 절차</h2>
        <p>
          글은 다음 절차를 거쳐 발행됩니다.
        </p>
        <ol>
          <li>
            <strong>1차 자료 수집</strong> — 해당 주제의 전통 문헌, 학술 자료,
            대표적인 해석 학파별 설명을 비교 정리합니다.
          </li>
          <li>
            <strong>초고 작성</strong> — 해석 근거와 함께 일반 독자가 이해할
            수 있는 톤으로 서술하고, 단정적 표현이나 과장이 없는지 점검합니다.
          </li>
          <li>
            <strong>면책 점검</strong> — 의료·재정 결정에 영향을 줄 수 있는
            표현이 있는지 자체 점검 후 면책 고지를 본문 끝에 자동 부착합니다.
          </li>
          <li>
            <strong>발행 후 보강</strong> — 발행 뒤에도 새로운 자료나 독자
            피드백, 그리고 광범위한 검색 데이터에서 누락된 맥락이 발견되면
            글을 보강하고 갱신일을 갱신합니다.
          </li>
        </ol>

        <h2>참고 자료</h2>
        <p>
          글은 특정 한 권의 책이나 한 사람의 해석에 의존하지 않습니다. 일반적
          으로 참고하는 자료의 갈래는 다음과 같습니다.
        </p>
        <ul>
          <li>
            <strong>명리학·사주</strong> — 자평진전, 적천수, 궁통보감 등 고전
            명리 문헌과 현대 한국 명리학자들의 해설서, 한국천문연구원의 만세력
            계산 알고리즘.
          </li>
          <li>
            <strong>서양 점성술</strong> — 12별자리 기본 분류와 원소 체계의
            서양 점성술 전통, 일반 천문학적 사실 (황도, 별자리 경계 등).
          </li>
          <li>
            <strong>타로</strong> — 라이더-웨이트 덱의 표준 상징 해석, 메이저
            아르카나 22장의 전통적 의미 체계.
          </li>
          <li>
            <strong>꿈해몽</strong> — 한국 전통 해몽 문헌과 융 심리학적
            상징 해석을 함께 비교 설명합니다.
          </li>
          <li>
            <strong>관상·손금</strong> — 한국·중국 전통 관상학과 서양
            수상학(palmistry)의 기본 분류 체계.
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
            (한국천문연구원 만세력 기준).
          </li>
          <li>
            <strong>사주 궁합</strong> — 두 사람의 일간 오행 관계와 일지
            합충, 오행 분포를 비교합니다.
          </li>
          <li>
            <strong>타로 카드 뽑기</strong> — 메이저 아르카나 22장 중 랜덤
            뽑기, 라이더-웨이트 카드 이미지 포함, 질문 테마 선택 가능.
          </li>
          <li>
            <strong>꿈해몽 키워드 검색</strong> — 꿈해몽 글을 키워드로
            실시간 검색합니다.
          </li>
          <li>
            <strong>일진 계산기</strong> — 날짜별 일주·십이직·손 없는 날을
            확인합니다.
          </li>
        </ul>

        <h2>광고 및 수익 공지</h2>
        <p>
          운세 참고서는 <strong>Google AdSense</strong>가 자동으로 게재하는
          광고를 통해 사이트 운영비를 충당하고 있습니다. 광고 노출은 Google의
          알고리즘과 독자별 관심사를 바탕으로 결정되며, 운영자가 특정 광고를
          선택하거나 콘텐츠에 영향을 주지 않습니다. 광고에 대한 자세한
          데이터 처리 정책은{" "}
          <Link href="/privacy">개인정보처리방침</Link>을 참고해 주세요.
        </p>
        <p>
          현재 어떠한 외부 상품·서비스에 대한 어필리에이트(제휴 마케팅) 링크나
          유료 협찬·후원 콘텐츠도 포함하고 있지 않습니다. 향후 어필리에이트나
          후원이 도입되는 경우 해당 글 본문에 명확히 표기합니다.
        </p>

        <h2>정정 및 피드백</h2>
        <p>
          글에서 잘못된 사실, 출처 오기, 오해의 소지가 있는 표현을 발견하셨다면{" "}
          <Link href="/contact">문의 페이지</Link>를 통해 알려 주세요. 확인 후
          가능한 한 빨리 본문을 정정하고, 의미 있는 변경이 있는 경우 글 하단에
          정정 사실을 표기합니다.
        </p>

        <h2>운세를 대하는 관점</h2>
        <p>
          운세는 인생의 절대 기준이 아닙니다. 수백 년에 걸쳐 형성된 해석
          체계를 통해 자신을 돌아보는 하나의 관점으로 활용할 때 가장 의미
          있습니다. 모든 해석은 참고 자료이며, 최종 선택은 언제나 당신의
          몫입니다.
        </p>
      </div>

      <div
        className="mt-10 rounded-xl border border-(--color-border) p-5 flex flex-wrap gap-4 text-sm"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <Link href="/contact" className="text-(--color-accent) hover:underline">
          문의하기
        </Link>
        <Link
          href="/disclaimer"
          className="text-(--color-secondary) hover:text-(--color-primary)"
        >
          면책 고지
        </Link>
        <Link
          href="/privacy"
          className="text-(--color-secondary) hover:text-(--color-primary)"
        >
          개인정보처리방침
        </Link>
        <Link
          href="/terms"
          className="text-(--color-secondary) hover:text-(--color-primary)"
        >
          이용약관
        </Link>
      </div>
    </div>
  );
}
