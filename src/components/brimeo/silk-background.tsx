"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// three.js + react-three-fiber are heavy. Dynamic-import the Silk shader so it
// never enters the SSR bundle. The shader doesn't paint until the browser is
// idle, so it doesn't compete with the hero headline for first paint cycles.
const Silk = dynamic(
  () => import("@/components/Silk").then((m) => m.default),
  { ssr: false, loading: () => null }
);

export function SilkBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Defer shader mount to the browser's idle window. Falls back to a setTimeout
    // if requestIdleCallback isn't available (Safari, older browsers).
    type RC = (cb: () => void, opts?: { timeout: number }) => number;
    const ric = (window as Window & { requestIdleCallback?: RC })
      .requestIdleCallback;
    const handle =
      ric?.(() => setEnabled(true), { timeout: 1500 }) ??
      window.setTimeout(() => setEnabled(true), 800);
    return () => {
      if (typeof handle === "number") {
        const cic = (window as Window & { cancelIdleCallback?: (h: number) => void })
          .cancelIdleCallback;
        cic?.(handle) ?? window.clearTimeout(handle);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      {/* Static gradient is always painted behind the WebGL layer, so the
          background is never blank while the shader boots. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 30%, #151D2E 0%, #0B1020 55%, #070A12 100%)",
        }}
      />
      {enabled ? (
        <div className="absolute inset-0 opacity-60">
          <Silk speed={3} scale={1.4} color="#1a1a2e" noiseIntensity={1.2} rotation={0.2} />
        </div>
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#070A12]" />
    </div>
  );
}