import Link from "next/link";
import { Category } from "@/lib/categories";

interface Props {
  categories: Category[];
}

export default function RelatedCategories({ categories }: Props) {
  if (categories.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-(--color-border)">
      <p className="text-xs font-semibold uppercase tracking-wider text-(--color-accent) mb-1">
        관련 카테고리
      </p>
      <h2 className="text-base font-semibold text-(--color-primary) mb-5">
        함께 살펴보면 좋은 주제
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/${cat.slug}`}
              className="group block h-full bg-(--color-surface) border border-(--color-border) rounded p-4 hover:border-(--color-accent) transition-colors"
            >
              <span
                className="inline-block text-xs font-medium px-2 py-0.5 rounded mb-3"
                style={{ color: cat.color, backgroundColor: `${cat.color}18` }}
              >
                {cat.title}
              </span>
              <p className="text-sm text-(--color-secondary) leading-relaxed line-clamp-3 group-hover:text-(--color-primary) transition-colors">
                {cat.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
