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
          현재 사이트는 회원가입, 로그인 기능이 없으며, 별도의 개인정보를 수집하지
          않습니다. 다만 통계·분석 목적으로 익명 방문 데이터가 수집될 수 있습니다.
        </p>

        <h2>쿠키 및 분석 도구</h2>
        <p>
          사이트 개선을 위해 Google Analytics 등 제3자 분석 도구를 사용할 수
          있습니다. 이 도구들은 IP 주소, 방문 페이지, 체류 시간 등 익명 통계를
          수집합니다. 개인을 특정하는 정보는 수집하지 않습니다.
        </p>

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
