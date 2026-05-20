"use client";

import { Suspense, useEffect } from "react";
import { initPostHog } from "@/lib/posthog";
import AnalyticsTracker from "./AnalyticsTracker";

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initPostHog();
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
      {children}
    </>
  );
}
