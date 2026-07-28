"use client";

import dynamic from "next/dynamic";

// Dynamic-import Rive so the ~80kb canvas runtime never enters the SSR bundle.
// The .riv asset is intentionally missing in this scaffold — Rive will gracefully
// fall back to its loading state, but the runtime is still in the client bundle
// so the system is wired end-to-end.
const RiveMascot = dynamic(
  () => import("@/components/rive-mascot").then((m) => m.RiveMascot),
  { ssr: false, loading: () => null }
);

export function FooterMascot() {
  return <RiveMascot />;
}