/**
 * AmbientLayer — fixed background that runs across the entire page.
 *
 * Five layers stacked on top of each other:
 *   1. Drifting lime blob (CSS keyframes) — top center
 *   2. Drifting cyan counter-blob — right side, slower
 *   3. Drifting magenta blob — bottom left, slowest (the new color pulse)
 *   4. Vertical "scanline" gradient that moves down forever
 *   5. Faint grid mask that anchors the page visually
 *
 * All animation is CSS — zero JS runtime cost, scales with the GPU compositor,
 * and never blocks input. Sits behind all content at -z-30.
 */
export function AmbientLayer() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-30 overflow-hidden"
    >
      {/* Layer 1 — drifting lime blob */}
      <div
        className="ambient-blob absolute -top-1/3 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(199,243,107,0.10), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Layer 2 — cyan counter-blob, offset and slower */}
      <div
        className="ambient-blob-2 absolute top-1/3 -right-1/4 h-[60vh] w-[60vh] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(110,216,232,0.06), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Layer 3 — magenta orb, drifting bottom-left, slowest of the three */}
      <div
        className="ambient-blob-3 absolute bottom-0 -left-1/4 h-[70vh] w-[70vh] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(181,122,255,0.07), transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Layer 4 — vertical scan gradient that scrolls down forever */}
      <div
        className="ambient-scan absolute inset-x-0 -top-1/2 h-[200vh]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.015) 50%, transparent 100%)",
        }}
      />

      {/* Layer 5 — faint grid mask. Anchors the page so it never feels empty. */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(closest-side at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(closest-side at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      <style>{`
        @keyframes ambient-drift {
          0%   { transform: translate(-50%, 0)    scale(1);   opacity: 0.9; }
          50%  { transform: translate(-45%, -5%)  scale(1.1); opacity: 1; }
          100% { transform: translate(-50%, 0)    scale(1);   opacity: 0.9; }
        }
        @keyframes ambient-drift-2 {
          0%   { transform: translate(0, 0)     scale(1);   opacity: 0.7; }
          50%  { transform: translate(-4%, 5%)  scale(1.15); opacity: 1; }
          100% { transform: translate(0, 0)     scale(1);   opacity: 0.7; }
        }
        @keyframes ambient-drift-3 {
          0%   { transform: translate(0, 0)    scale(1);    opacity: 0.85; }
          50%  { transform: translate(6%, -3%) scale(1.12); opacity: 1; }
          100% { transform: translate(0, 0)    scale(1);    opacity: 0.85; }
        }
        @keyframes ambient-scan {
          0%   { transform: translateY(0); }
          100% { transform: translateY(50%); }
        }
        .ambient-blob   { animation: ambient-drift   22s ease-in-out infinite; }
        .ambient-blob-2 { animation: ambient-drift-2 30s ease-in-out infinite; }
        .ambient-blob-3 { animation: ambient-drift-3 38s ease-in-out infinite; }
        .ambient-scan   { animation: ambient-scan    18s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ambient-blob, .ambient-blob-2, .ambient-blob-3, .ambient-scan {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}