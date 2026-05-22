"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { posthog } from "@/lib/posthog";

const SCROLL_DEPTHS = [25, 50, 75, 100] as const;

const TOOL_PATHS = new Set([
  "/saju-calculator",
  "/gunghap",
  "/tarot-reading",
  "/dream-search",
  "/iljin",
  "/tools",
]);
const SERIES_PREFIX = "/series/";
const CATEGORY_SLUGS = new Set([
  "fortune-guide",
  "dream",
  "zodiac",
  "tarot",
  "palmistry",
  "physiognomy",
  "learn",
  "compatibility",
  "column",
  "zodiac-animal",
  "ilju",
]);

function classifyPath(pathname: string) {
  if (pathname === "/") return { type: "home" as const };
  if (TOOL_PATHS.has(pathname)) return { type: "tool" as const, tool: pathname.slice(1) };
  if (pathname.startsWith(SERIES_PREFIX)) {
    return { type: "series" as const, series: pathname.slice(SERIES_PREFIX.length) };
  }
  if (pathname === "/tags") return { type: "tags_index" as const };
  if (pathname.startsWith("/tags/")) {
    return { type: "tag" as const, tag: decodeURIComponent(pathname.slice("/tags/".length)) };
  }
  if (pathname === "/search") return { type: "search" as const };
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 1 && CATEGORY_SLUGS.has(parts[0])) {
    return { type: "category" as const, category: parts[0] };
  }
  if (parts.length === 2 && CATEGORY_SLUGS.has(parts[0])) {
    return { type: "article" as const, category: parts[0], slug: parts[1] };
  }
  return { type: "other" as const };
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reachedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!pathname) return;
    if (!(posthog as unknown as { __loaded?: boolean }).__loaded) return;

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    const route = classifyPath(pathname);
    posthog.capture("$pageview", {
      $current_url: window.location.href,
      $pathname: pathname,
      route_type: route.type,
      ...("category" in route ? { category: route.category } : {}),
      ...("slug" in route ? { slug: route.slug } : {}),
      ...("series" in route ? { series: route.series } : {}),
      ...("tag" in route ? { tag: route.tag } : {}),
      ...("tool" in route ? { tool: route.tool } : {}),
    });

    if (route.type === "article") {
      posthog.capture("article_view", {
        path: url,
        category: route.category,
        slug: route.slug,
      });
    }

    reachedDepths.current = new Set();

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const viewport = window.innerHeight;
      const full = doc.scrollHeight - viewport;
      if (full <= 0) return;
      const pct = Math.min(100, Math.round((scrollTop / full) * 100));
      for (const d of SCROLL_DEPTHS) {
        if (pct >= d && !reachedDepths.current.has(d)) {
          reachedDepths.current.add(d);
          posthog.capture("scroll_depth_reached", { depth_percent: d, path: url });
          if (d === 100 && route.type === "article") {
            posthog.capture("article_read", {
              path: url,
              category: "category" in route ? route.category : undefined,
              slug: "slug" in route ? route.slug : undefined,
            });
          }
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor?.href) return;
      try {
        const dest = new URL(anchor.href, window.location.href);
        if (dest.host && dest.host !== window.location.host) {
          posthog.capture("outbound_link_clicked", {
            href: dest.href,
            host: dest.host,
            anchor_text: (anchor.textContent || "").trim().slice(0, 200),
            path: url,
          });
        }
      } catch {
        // ignore malformed URLs
      }
    };

    const seenAds = new WeakSet<Element>();
    const adIo = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio < 0.5) continue;
          const el = entry.target as HTMLElement;
          if (el.dataset.adsbygoogleStatus !== "done") continue;
          if (seenAds.has(el)) continue;
          seenAds.add(el);

          const allAds = Array.from(document.querySelectorAll("ins.adsbygoogle"));
          const slotIndex = allAds.indexOf(el) + 1;

          const doc = document.documentElement;
          const full = doc.scrollHeight - window.innerHeight;
          const depthPct = full > 0 ? Math.min(100, Math.round((window.scrollY / full) * 100)) : 0;

          posthog.capture("ad_slot_viewed", {
            slot_index: slotIndex,
            path: url,
            scroll_depth_when_viewed: depthPct,
          });

          adIo.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    const observeAd = (node: Element) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.matches("ins.adsbygoogle")) adIo.observe(node);
      node.querySelectorAll?.("ins.adsbygoogle").forEach((el) => adIo.observe(el));
    };

    document.querySelectorAll("ins.adsbygoogle").forEach((el) => adIo.observe(el));

    const adMo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node instanceof Element) observeAd(node);
        }
      }
    });
    adMo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick, { capture: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, { capture: true } as EventListenerOptions);
      adIo.disconnect();
      adMo.disconnect();
    };
  }, [pathname, searchParams]);

  return null;
}
