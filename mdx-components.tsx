import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import { slugify, extractText } from "@/lib/slugify";

function makeHeading(Tag: "h2" | "h3") {
  return function Heading({ children }: { children?: ReactNode }) {
    const text = extractText(children);
    const id = slugify(text);
    return <Tag id={id || undefined}>{children}</Tag>;
  };
}

export function useMDXComponents(): MDXComponents {
  return {
    h2: makeHeading("h2"),
    h3: makeHeading("h3"),
  };
}
