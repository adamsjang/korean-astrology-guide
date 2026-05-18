"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-(--color-border) bg-(--color-surface)">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-(--color-primary)"
        >
          운세 참고서
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-(--color-secondary)">
          {Object.values(CATEGORIES).map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="hover:text-(--color-primary) transition-colors"
            >
              {cat.title}
            </Link>
          ))}
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
