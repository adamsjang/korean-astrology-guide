"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";

const TOOLS = [
  { href: "/saju-calculator", label: "사주 계산기" },
  { href: "/gunghap",         label: "사주 궁합" },
  { href: "/tarot-reading",   label: "타로 뽑기" },
  { href: "/dream-search",    label: "꿈 키워드 검색" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-(--color-border) bg-(--color-surface)">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-(--color-primary)">
          운세 참고서
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm text-(--color-secondary)">
          {Object.values(CATEGORIES).map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="hover:text-(--color-primary) transition-colors"
            >
              {cat.title}
            </Link>
          ))}

          <Link
            href="/tools"
            className="font-medium hover:text-(--color-primary) transition-colors"
            style={{ color: "var(--color-accent)" }}
          >
            도구
          </Link>
          <Link href="/search" aria-label="검색" className="text-(--color-secondary) hover:text-(--color-primary) transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </Link>
        </nav>

        <button
          className="md:hidden p-2 text-(--color-secondary)"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="메뉴 열기"
        >
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-(--color-border) bg-(--color-surface)">
          <Link
            href="/search"
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-(--color-secondary) hover:bg-(--color-base) hover:text-(--color-primary)"
            onClick={() => setMenuOpen(false)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            글 검색
          </Link>
          <div className="border-b border-(--color-border) mb-1 pb-1">
            <p className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-accent)" }}>
              도구
            </p>
            {TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="block px-4 py-2.5 text-sm text-(--color-secondary) hover:bg-(--color-base) hover:text-(--color-primary)"
                onClick={() => setMenuOpen(false)}
              >
                {t.label}
              </Link>
            ))}
          </div>
          {Object.values(CATEGORIES).map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="block px-4 py-2.5 text-sm text-(--color-secondary) hover:bg-(--color-base) hover:text-(--color-primary)"
              onClick={() => setMenuOpen(false)}
            >
              {cat.title}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
