import posthog, { type PostHog } from "posthog-js";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

export function initPostHog(): PostHog | null {
  if (typeof window === "undefined") return null;
  if (!KEY) return null;
  if ((posthog as unknown as { __loaded?: boolean }).__loaded) return posthog;

  posthog.init(KEY, {
    api_host: HOST,
    capture_pageview: false,
    capture_pageleave: true,
    person_profiles: "identified_only",
    disable_session_recording: true,
    autocapture: true,
  });

  return posthog;
}

export { posthog };
