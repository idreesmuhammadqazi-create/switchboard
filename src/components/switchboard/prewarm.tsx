"use client";

import { useEffect } from "react";

/**
 * Prewarm heavy chunks during the browser idle window so that when the user
 * scrolls into a section that needs them, they're already cached. We don't
 * care about the resolved values — we just want the network/parse cost to
 * happen early, off the critical path.
 *
 * Targets (in load order):
 *   1. Silk shader (three.js ~840kb) — used in hero
 *   2. Bklit line chart (visx + d3 ~350kb) — used in stats band
 *   3. Rive runtime (~80kb) — used in footer
 */
export function PrewarmHeavy() {
  useEffect(() => {
    type RC = (cb: () => void, opts?: { timeout: number }) => number;
    const ric = (window as Window & { requestIdleCallback?: RC })
      .requestIdleCallback;
    const idle =
      (cb: () => void) =>
      ric?.(cb, { timeout: 2000 }) ??
      window.setTimeout(cb, 1200);

    // Phase 1: kick off after first idle slot.
    const h1 = idle(() => {
      // Silk — dynamic-import the source so three.js is parsed and cached.
      void import("@/components/Silk");
    });

    // Phase 2: wait until after first user interaction (or another idle slot)
    // to start downloading the chart and Rive runtime. We don't want them
    // contending with the hero paint.
    const startPrewarm = () => {
      void import("@/components/charts/line-chart");
      void import("@/components/rive-mascot");
    };
    const onInteract = () => {
      startPrewarm();
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
    };
    window.addEventListener("pointerdown", onInteract, { passive: true, once: true });
    window.addEventListener("keydown", onInteract, { passive: true, once: true });
    const h2 = window.setTimeout(startPrewarm, 4000);

    return () => {
      const cic = (window as Window & { cancelIdleCallback?: (h: number) => void })
        .cancelIdleCallback;
      if (typeof h1 === "number") cic?.(h1) ?? window.clearTimeout(h1);
      window.clearTimeout(h2);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
    };
  }, []);

  return null;
}