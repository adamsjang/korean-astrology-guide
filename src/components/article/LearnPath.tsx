import Link from "next/link";
import type { ResolvedLearnStage } from "@/lib/learn-path";

interface Props {
  stages: ResolvedLearnStage[];
}

const STAGE_COLOR: Record<number, string> = {
  1: "#5C8A3F",
  2: "#3C7A4B",
  3: "#2C5E47",
  4: "#1F4A3D",
};

export default function LearnPath({ stages }: Props) {
  if (stages.length === 0) return null;

  return (
    <section className="mb-12" aria-labelledby="learn-path-heading">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-(--color-accent) mb-2">
          학습 경로
        </p>
        <h2
          id="learn-path-heading"
          className="text-2xl font-semibold text-(--color-primary) mb-2"
        >
          처음부터 차근차근 — 명리학 학습 4단계
        </h2>
        <p className="text-sm text-(--color-secondary) leading-relaxed max-w-2xl">
          명리학은 진입장벽이 높아 어디서 시작해야 할지 막막합니다. 아래
          순서대로 읽으면 음양·오행 기초부터 사주 실전 해석까지 자연스럽게
          학습할 수 있도록 정리했습니다.
        </p>
      </header>

      <ol className="space-y-10">
        {stages.map((stage) => (
          <li key={stage.level}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:gap-6">
              <div
                className="flex-none text-3xl font-bold leading-none"
                style={{ color: STAGE_COLOR[stage.level] }}
                aria-hidden="true"
              >
                0{stage.level}
              </div>
              <div className="flex-1">
                <h3
                  className="text-lg font-semibold text-(--color-primary) mb-1"
                  style={{ color: STAGE_COLOR[stage.level] }}
                >
                  {stage.title}
                </h3>
                <p className="text-sm font-medium text-(--color-primary) mb-2">
                  {stage.subtitle}
                </p>
                <p className="text-sm text-(--color-secondary) leading-relaxed mb-4">
                  {stage.description}
                </p>
                <ol className="space-y-2 border-l-2 pl-4" style={{ borderColor: `${STAGE_COLOR[stage.level]}40` }}>
                  {stage.posts.map((post, idx) => (
                    <li key={post.slug} className="flex gap-3">
                      <span
                        className="flex-none text-xs font-mono pt-1 text-(--color-secondary) min-w-[1.75rem]"
                        aria-hidden="true"
                      >
                        {String(idx + 1).padStart(2, "0")}.
                      </span>
                      <Link
                        href={`/learn/${post.slug}`}
                        className="group flex-1 block py-1"
                      >
                        <span className="block text-sm font-medium text-(--color-primary) group-hover:text-(--color-accent) transition-colors">
                          {post.title}
                        </span>
                        <span className="block text-xs text-(--color-secondary) leading-relaxed line-clamp-1 mt-0.5">
                          {post.description}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
