import Link from "next/link";
import { Fragment, type ReactNode } from "react";

interface Keyword {
  term: string;
  href: string;
}

const KEYWORDS: Keyword[] = [
  { term: "명리학", href: "/learn/saju-structure" },
  { term: "사주팔자", href: "/learn/saju-structure" },
  { term: "오행", href: "/learn/oheng-basics" },
  { term: "음양", href: "/learn/yin-yang-basics" },
  { term: "십신", href: "/learn/sipseong-guide" },
  { term: "천간", href: "/learn/cheongan-10gods" },
  { term: "지지", href: "/learn/jiji-12branches" },
  { term: "대운", href: "/learn/daeun-seun" },
  { term: "용신", href: "/learn/yongshin-guide" },
  { term: "일주", href: "/learn/what-is-ilju" },
  { term: "타로카드", href: "/tarot/what-is-tarot" },
  { term: "별자리", href: "/zodiac/zodiac-12-basics" },
  { term: "꿈해몽", href: "/dream/what-is-dream-interpretation" },
  { term: "관상", href: "/physiognomy/what-is-physiognomy" },
  { term: "손금", href: "/palmistry/palmistry-basics" },
];

function findFirstMatch(text: string): { idx: number; kw: Keyword } | null {
  let best: { idx: number; kw: Keyword } | null = null;
  for (const kw of KEYWORDS) {
    const idx = text.indexOf(kw.term);
    if (idx < 0) continue;
    if (!best || idx < best.idx) best = { idx, kw };
  }
  return best;
}

export function autolinkChildren(children: ReactNode): {
  out: ReactNode;
  linked: boolean;
} {
  let linked = false;

  function transform(node: ReactNode): ReactNode {
    if (linked) return node;
    if (typeof node === "string") {
      const match = findFirstMatch(node);
      if (!match) return node;
      linked = true;
      const before = node.slice(0, match.idx);
      const after = node.slice(match.idx + match.kw.term.length);
      return (
        <>
          {before}
          <Link
            href={match.kw.href}
            className="text-(--color-accent) underline decoration-(--color-accent)/30 hover:decoration-(--color-accent)"
          >
            {match.kw.term}
          </Link>
          {after}
        </>
      );
    }
    if (Array.isArray(node)) {
      return node.map((child, i) => (
        <Fragment key={i}>{transform(child)}</Fragment>
      ));
    }
    return node;
  }

  return { out: transform(children), linked };
}
