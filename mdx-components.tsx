import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import { slugify, extractText } from "@/lib/slugify";
import { autolinkChildren } from "@/lib/autolink";

function makeHeading(Tag: "h2" | "h3") {
  return function Heading({ children }: { children?: ReactNode }) {
    const text = extractText(children);
    const id = slugify(text);
    return <Tag id={id || undefined}>{children}</Tag>;
  };
}

function Paragraph({ children }: { children?: ReactNode }) {
  const { out } = autolinkChildren(children);
  return <p>{out}</p>;
}

export function useMDXComponents(): MDXComponents {
  return {
    h2: makeHeading("h2"),
    h3: makeHeading("h3"),
    p: Paragraph,
  };
}
