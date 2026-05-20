"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { posthog } from "@/lib/posthog";

const SCROLL_DEPTHS = [25, 50, 75, 100] as const;

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reachedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!pathname) return;
    if (!(posthog as unknown as { __loaded?: boolean }).__loaded) return;

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    posthog.capture("$pageview", { $current_url: window.location.href, $pathname: pathname });

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
