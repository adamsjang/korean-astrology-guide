import Link from "next/link";
import type { Heading } from "@/lib/mdx";

interface Props {
  headings: Heading[];
}

export default function TableOfContents({ headings }: Props) {
  if (headings.length < 3) return null;

  return (
    <nav
      aria-label="목차"
      className="mb-10 p-5 border border-(--color-border) rounded bg-(--color-base)"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-(--color-accent) mb-3">
        목차
      </p>
      <ol className="space-y-1.5 text-sm">
        {headings.map((h, i) => (
          <li
            key={`${h.id}-${i}`}
            className={h.depth === 3 ? "ml-4" : ""}
          >
            <Link
              href={`#${h.id}`}
              className="text-(--color-secondary) hover:text-(--color-accent) leading-snug"
            >
              {h.depth === 3 ? "· " : ""}
              {h.text}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
