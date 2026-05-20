import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "운세 참고서의 개인정보처리방침입니다.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-(--color-primary) mb-8">개인정보처리방침</h1>
      <div className="prose prose-stone max-w-none prose-p:text-(--color-primary) prose-p:leading-[1.85] prose-headings:text-(--color-primary)">
        <p>운세 참고서(이하 &ldquo;사이트&rdquo;)는 이용자의 개인정보를 중요시합니다.</p>

        <h2>수집하는 개인정보</h2>
        <p>
          현재 사이트는 회원가입, 로그인 기능이 없으며, 이용자가 직접 입력하여
          제공하는 개인정보를 별도로 수집하지 않습니다. 다만 통계·분석 목적으로
          아래에 안내된 익명 방문 데이터가 수집됩니다.
        </p>

        <h2>쿠키 및 분석 도구</h2>
        <p>
          사이트 개선을 위해 제3자 제품 분석 도구인 <strong>PostHog</strong>를
          사용합니다. PostHog는 방문 및 이용 패턴을 익명으로 측정합니다.
        </p>
        <ul>
          <li>
            <strong>수집 항목</strong>: IP 주소(축약 형태로 처리), 디바이스/브라우저
            정보, 방문 페이지 URL, 페이지 체류 시간, 페이지 내 스크롤 깊이,
            링크/버튼 클릭 이벤트, 광고 슬롯 뷰포트 노출 시점, 익명 식별 쿠키
          </li>
          <li>
            <strong>처리 목적</strong>: 콘텐츠 가독성·구성 개선, 인기 카테고리
            파악, 사이트 사용성 분석
          </li>
          <li>
            <strong>보유 기간</strong>: PostHog 정책에 따라 최대 1년 보관 후 자동
            폐기 (이벤트 단위)
          </li>
          <li>
            <strong>국외 이전</strong>: 수집된 데이터는 PostHog의 EU 리전 서버
            (독일 Frankfurt)에 저장됩니다. 이전받는 자: PostHog Inc.
            (posthog.com), 이전 방법: HTTPS 통신.
          </li>
          <li>
            <strong>이용자 권리</strong>: 브라우저 설정에서 쿠키를 차단하거나
            DoNotTrack을 켜는 방법으로 수집을 거부할 수 있습니다.
          </li>
        </ul>

        <h2>광고</h2>
        <p>
          Google AdSense 등 제3자 광고 서비스를 사용할 수 있습니다. 광고 서비스는
          쿠키를 사용하여 방문자의 관심사에 맞는 광고를 제공할 수 있습니다.
          광고 개인화 설정은 Google 계정에서 변경 가능합니다.
        </p>

        <h2>개인정보의 보유 및 이용 기간</h2>
        <p>
          이용자가 별도로 제공한 개인정보가 없으므로, 별도의 보유·이용 기간이
          없습니다.
        </p>

        <h2>문의</h2>
        <p>개인정보 관련 문의는 문의 페이지를 통해 연락 주세요.</p>

        <p className="text-sm text-(--color-secondary)">
          최종 수정일: {new Date().toISOString().split("T")[0]}
        </p>
      </div>
    </div>
  );
}
