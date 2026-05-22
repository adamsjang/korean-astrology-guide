import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="border-t border-(--color-border) bg-(--color-surface) mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-(--color-accent) mb-3">
              카테고리
            </p>
            <ul className="space-y-1.5">
              {Object.values(CATEGORIES)
                .slice(0, 5)
                .map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/${cat.slug}`}
                      className="text-sm text-(--color-secondary) hover:text-(--color-primary)"
                    >
                      {cat.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-(--color-accent) mb-3">
              더보기
            </p>
            <ul className="space-y-1.5">
              {Object.values(CATEGORIES)
                .slice(5)
                .map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/${cat.slug}`}
                      className="text-sm text-(--color-secondary) hover:text-(--color-primary)"
                    >
                      {cat.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-(--color-accent) mb-3">
              사이트 안내
            </p>
            <ul className="space-y-1.5">
              {[
                { href: "/search", label: "검색" },
                { href: "/tags", label: "태그 인덱스" },
                { href: "/series/ilju", label: "60갑자 일주 시리즈" },
                { href: "/series/zodiac", label: "12별자리 시리즈" },
                { href: "/series/tarot-major", label: "타로 메이저 22장 시리즈" },
                { href: "/feed.xml", label: "RSS 피드" },
                { href: "/about", label: "소개" },
                { href: "/contact", label: "문의" },
                { href: "/disclaimer", label: "면책 고지" },
                { href: "/privacy", label: "개인정보처리방침" },
                { href: "/terms", label: "이용약관" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-(--color-secondary) hover:text-(--color-primary)"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-(--color-border) pt-6 text-center text-xs text-(--color-secondary) leading-relaxed">
          <p className="mb-1">
            본 사이트의 모든 콘텐츠는 오락·문화·자기이해 목적이며, 법률·의료·재정·혼인
            결정의 절대 기준이 아닙니다.
          </p>
          <p>© {new Date().getFullYear()} 운세 참고서. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
