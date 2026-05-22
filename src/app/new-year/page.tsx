import type { Metadata } from "next";
import Link from "next/link";
import { getPostBySlug, getPostsByCategory } from "@/lib/mdx";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://korean-astrology-guide.pages.dev";

const ORACLE_DECISION_URL = "https://oracle-decision.pages.dev";
const ORACLE_TOJEONG_GUIDE_URL =
  "https://oracle-decision.pages.dev/guide/tojeong-scoring";

const TITLE = "신년 운세 길잡이 — 토정비결·삼재·세운·띠별 신년운";
const DESCRIPTION =
  "양력 새해와 음력 설날을 앞두고 한국에서 즐겨보는 신년 운세를 한 페이지에 정리했습니다. 토정비결·삼재·사주 세운·12띠 신년운까지 어떤 도구를 어떻게 활용하면 좋은지 안내합니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/new-year" },
  keywords: [
    "신년운세",
    "새해운세",
    "토정비결",
    "삼재",
    "삼재 띠",
    "세운",
    "띠별 신년운세",
    "설날 운세",
    "2026 신년운세",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/new-year`,
    type: "article",
  },
};

const HOIST_POSTS: { slug: string; category: string; label: string }[] = [
  { slug: "daeun-seun", category: "learn", label: "대운과 세운 이해하기" },
  { slug: "saju-timing", category: "learn", label: "사주로 보는 시기론" },
  { slug: "hapchung-guide", category: "learn", label: "합·충·형·파·해 완전 해설" },
];

export default function NewYearHubPage() {
  const hoists = HOIST_POSTS.map(({ slug, category, label }) => {
    const post = getPostBySlug(category, slug);
    return post ? { ...post, label } : null;
  }).filter((p): p is NonNullable<typeof p> => p !== null);

  const zodiacAnimalPosts = getPostsByCategory("zodiac-animal").slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    inLanguage: "ko-KR",
    mainEntityOfPage: `${SITE_URL}/new-year`,
    author: { "@type": "Organization", name: "운세 참고서" },
    publisher: { "@type": "Organization", name: "운세 참고서" },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "신년 운세 길잡이",
        item: `${SITE_URL}/new-year`,
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <header className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-(--color-accent) mb-2">
          시즌 길잡이
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold text-(--color-primary) leading-tight mb-4">
          신년 운세 길잡이
        </h1>
        <p className="text-base text-(--color-secondary) leading-relaxed">
          한국에서 한 해를 시작할 때 가장 많이 찾는 운세는{" "}
          <strong>토정비결</strong>, <strong>삼재</strong>, <strong>사주 세운</strong>
          , <strong>띠별 신년운</strong> 네 가지입니다. 이 페이지는 네 가지를 한자리에서
          비교하고, 어떤 상황에 어떤 도구가 도움이 되는지 안내하기 위한
          시즌 길잡이입니다. 운세 결과를 정해진 운명으로 받아들이기보다, 한 해
          계획을 세우는 참고 자료로 활용해 보세요.
        </p>
        <p className="text-sm text-(--color-secondary) leading-relaxed mt-3">
          한국에서는 양력 1월 1일과 음력 설날(보통 1월 말~2월 중순) 두 시점이
          모두 의미를 가집니다. 절기(節氣) 기준으로는 입춘(立春, 보통 2월
          4일)이 한 해의 진짜 시작으로 여겨지기도 합니다. 운세 도구마다
          시점 해석이 조금씩 다르니, 각 항목에서 다시 안내합니다.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-(--color-primary) mb-3">
          토정비결 — 한 해 흐름을 144괘로 본다
        </h2>
        <p className="text-base text-(--color-secondary) leading-relaxed mb-3">
          토정비결(土亭祕訣)은 조선 중기 학자 토정 이지함(李之菡, 1517~1578)이
          저술한 것으로 전해지는 신년 운세서입니다. 사주의 네 기둥 중 시주(時柱)를
          제외한 <strong>년·월·일주 세 기둥</strong>을 가지고 144개의 괘(卦) 중
          하나를 뽑아 한 해의 흐름을 보는 방식입니다. 한국에서는 음력 설날 전후로
          가장 널리 보는 신년 운세이며, 작괘법(作卦法)은 한 해 단위로 갱신됩니다.
        </p>
        <p className="text-base text-(--color-secondary) leading-relaxed mb-3">
          토정비결은 사주 명리학처럼 평생을 분석하지 않고{" "}
          <strong>그 한 해</strong>만을 다룬다는 점이 특징입니다. 큰 흐름(괘사)과
          월별 운세(월별 풀이)까지 함께 제공해, 한 해의 시기별 처세를 가늠하기에
          유용합니다. 다만 같은 괘를 받은 사람들이 모두 같은 운명을 사는 것은
          아니며, 같은 시기에 어떤 에너지가 강해지는지를 보여주는 참고 관점으로
          이해하는 것이 좋습니다.
        </p>

        <div className="my-5 p-5 rounded-lg border border-(--color-border) bg-(--color-surface)">
          <p className="text-sm font-semibold text-(--color-primary) mb-2">
            ✦ 144괘 토정비결 직접 보기
          </p>
          <p className="text-sm text-(--color-secondary) leading-relaxed mb-3">
            생년월일과 성별을 입력하면 본인의 작괘 결과와 월별 풀이를 함께 확인할
            수 있습니다. 외부 도구(오라클 디시전)에서 무료로 제공합니다.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={ORACLE_DECISION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-(--color-accent) text-white hover:opacity-90 transition-opacity"
            >
              토정비결 보기 →
            </a>
            <a
              href={ORACLE_TOJEONG_GUIDE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-(--color-border) text-(--color-secondary) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
            >
              해석 가이드 읽기
            </a>
          </div>
        </div>

        <p className="text-sm text-(--color-secondary) leading-relaxed">
          작괘 시점은 <strong>음력 설날 자정</strong>이 기준이며, 입춘이 지나기
          전이라도 음력 새해가 시작되면 새로운 해의 괘로 갈아탑니다. 양력 1월에
          미리 보고 싶다면 미리 받아 둔 뒤, 설날 이후 결과를 한 번 더 확인하는
          것도 방법입니다.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-(--color-primary) mb-3">
          삼재(三災) — 12년 주기의 흐름 점검
        </h2>
        <p className="text-base text-(--color-secondary) leading-relaxed mb-3">
          삼재는 12년에 한 번씩, <strong>3년에 걸쳐</strong> 찾아온다고 보는
          전통 운세 개념입니다. 본인의 띠를 기준으로 들삼재(入三災, 시작) →
          눌삼재(中三災, 중간) → 날삼재(出三災, 마무리) 3년이 한 묶음입니다.
          삼재는 명리학의 합충(合冲)이나 절기 흐름과 직접 연결되지는 않지만,
          한국 민간 신앙에서 신년에 본인의 위치를 점검할 때 자주 활용됩니다.
        </p>
        <p className="text-base text-(--color-secondary) leading-relaxed mb-3">
          띠별 삼재 시기는 다음과 같이 묶입니다.
        </p>
        <ul className="text-sm text-(--color-secondary) leading-relaxed space-y-1.5 mb-3 ml-5 list-disc">
          <li>
            <strong>신·자·진(원숭이·쥐·용)</strong> — 인·묘·진년에 삼재
          </li>
          <li>
            <strong>사·유·축(뱀·닭·소)</strong> — 해·자·축년에 삼재
          </li>
          <li>
            <strong>해·묘·미(돼지·토끼·양)</strong> — 사·오·미년에 삼재
          </li>
          <li>
            <strong>인·오·술(범·말·개)</strong> — 신·유·술년에 삼재
          </li>
        </ul>
        <p className="text-sm text-(--color-secondary) leading-relaxed">
          삼재가 든다고 무조건 흉(凶)한 해는 아닙니다. 큰 결정(이직·이사·결혼)
          시기에 조금 더 신중하고, 건강 관리에 신경 쓰는 정도로 받아들이는 것이
          균형 잡힌 관점입니다. 본인 띠와 그 해의 지지가 어떤 관계인지는{" "}
          <Link
            href="/learn/hapchung-guide"
            className="text-(--color-accent) underline hover:no-underline"
          >
            합·충·형·파·해 가이드
          </Link>
          에서 더 자세히 다룹니다.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-(--color-primary) mb-3">
          사주 세운(歲運) — 본인 사주로 보는 신년 흐름
        </h2>
        <p className="text-base text-(--color-secondary) leading-relaxed mb-3">
          명리학에서 그 해의 천간·지지(예: 2026년은 병오년 丙午年)가 본인 사주의
          어떤 자리와 합(合)·충(冲)·형(刑)·파(破)를 이루는지를 보는 방식이
          세운(歲運)입니다. 토정비결이 모든 사람을 144괘로 분류한다면, 세운은
          본인 사주를 기준으로 그 해 특정 시기에 어떤 에너지가 강해지는지를
          개별적으로 분석합니다.
        </p>
        <p className="text-base text-(--color-secondary) leading-relaxed mb-3">
          세운은 보통 <strong>대운(大運, 10년 주기)</strong>의 흐름 위에서 그 해
          한 칸을 더 얹어 해석합니다. 대운에서 길한 시기인지 불안정한 시기인지에
          따라 같은 세운도 다르게 작동합니다. 세운만 본다고 한 해를 다 알 수는
          없고, 대운과 함께 봐야 입체적인 그림이 나옵니다.
        </p>
        <p className="text-sm text-(--color-secondary) leading-relaxed mb-3">
          본인의 대운·세운을 직접 확인하려면 사주팔자 계산기에서 생년월일·성별을
          입력해 대운표를 받아 보세요. 세운은 절기 기준(입춘)을 따르는 것이
          명리학 정통 관점입니다.
        </p>

        {hoists.length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {hoists.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.category}/${post.slug}`}
                className="group block bg-(--color-surface) border border-(--color-border) rounded p-3 hover:border-(--color-accent) transition-colors"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-(--color-secondary) mb-1">
                  더 읽기
                </p>
                <p className="text-sm font-semibold text-(--color-primary) group-hover:text-(--color-accent) transition-colors leading-snug">
                  {post.title}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-(--color-primary) mb-3">
          띠별 신년운세 — 12지의 큰 그림
        </h2>
        <p className="text-base text-(--color-secondary) leading-relaxed mb-3">
          그 해의 지지(예: 2026 병오년의 오 午)와 본인 띠의 지지가 어떤 관계인지를
          보면 신년의 큰 분위기를 잡을 수 있습니다. 육합(六合)·삼합(三合)이 들면
          그 해 협력·기회의 색이 짙어지고, 충(沖)이 들면 변화·이동의 색이
          강해지는 식입니다.
        </p>
        <p className="text-base text-(--color-secondary) leading-relaxed mb-4">
          본인 띠의 기본 에너지부터 알아두면, 매년 새로운 띠가 들 때마다 어떻게
          작용할지 가늠하기 쉬워집니다.
        </p>

        {zodiacAnimalPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {zodiacAnimalPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/zodiac-animal/${post.slug}`}
                className="group block bg-(--color-surface) border border-(--color-border) rounded p-3 hover:border-(--color-accent) transition-colors"
              >
                <p className="text-sm font-semibold text-(--color-primary) group-hover:text-(--color-accent) transition-colors leading-snug mb-1">
                  {post.title}
                </p>
                <p className="text-xs text-(--color-secondary) line-clamp-2">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        )}

        <p className="text-sm">
          <Link
            href="/zodiac-animal"
            className="text-(--color-accent) underline hover:no-underline"
          >
            전체 12띠 가이드 보기 →
          </Link>
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-(--color-primary) mb-3">
          신년 운세 도구 모음
        </h2>
        <p className="text-base text-(--color-secondary) leading-relaxed mb-4">
          신년에는 한 도구만 보기보다 두세 가지 관점을 함께 참고하는 것이
          균형 잡힌 활용법입니다. 운세 참고서에서 제공하는 무료 도구들입니다.
        </p>
        <ul className="space-y-2">
          {[
            {
              href: "/saju-calculator",
              label: "사주팔자 계산기",
              note: "본인 사주·오행 분포·대운·세운 확인",
            },
            {
              href: "/iljin",
              label: "일진 계산기",
              note: "신년 길일·손 없는 날 찾기",
            },
            {
              href: "/gunghap",
              label: "사주 궁합",
              note: "신년 인연·동업 관계 점검",
            },
            {
              href: "/tarot-reading",
              label: "타로 카드 뽑기",
              note: "한 해 메시지 한 장 뽑아보기",
            },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-baseline gap-3 py-2 border-b border-(--color-border) hover:border-(--color-accent) transition-colors group"
              >
                <span className="text-sm font-semibold text-(--color-primary) group-hover:text-(--color-accent) transition-colors">
                  {item.label}
                </span>
                <span className="text-xs text-(--color-secondary)">
                  {item.note}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-4 pt-8 border-t border-(--color-border)">
        <h2 className="text-base font-semibold text-(--color-primary) mb-2">
          신년 운세, 어떻게 활용하면 좋을까
        </h2>
        <p className="text-sm text-(--color-secondary) leading-relaxed">
          여러 도구가 서로 다른 결과를 줄 수 있습니다. 토정비결이 좋게 나오고
          삼재가 들었다면 어느 쪽을 따라야 할까요? 정답은 없습니다. 각 도구가
          전제하는 관점이 다를 뿐이며, 본인이 가장 신중해야 할 영역(건강·관계·재정)에서
          공통적으로 경고하는 신호가 있다면 그 부분을 더 챙기는 정도로 활용하는
          것이 균형 잡힌 접근입니다. 운세 결과가 한 해의 결정을 대신해 줄 수는
          없지만, 미처 챙기지 못한 영역을 다시 생각해 보게 하는 좋은 출발점은
          될 수 있습니다.
        </p>
      </section>
    </div>
  );
}
