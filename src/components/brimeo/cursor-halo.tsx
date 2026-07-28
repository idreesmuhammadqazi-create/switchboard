"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * CursorHalo — a soft glowing circle that follows the cursor with a spring
 * lag. Hides on touch devices and for reduced-motion users.
 *
 * The halo is a fixed-position div painted on top of the ambient layer but
 * below all interactive content. Uses pointer-events:none so it never
 * interferes with clicks.
 */
export function CursorHalo() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const springX = useSpring(x, { stiffness: 180, damping: 24, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 180, damping: 24, mass: 0.5 });

  useEffect(() => {
    if (reduced) return;
    // Skip on coarse pointers (touch) — cursor halo doesn't add value there.
    if (window.matchMedia?.("(pointer: coarse)").matches) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y, reduced]);

  if (reduced) return null;

  return (
    <>
      <motion.div
        ref={ref}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-20 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: springX,
          y: springY,
          background:
            "radial-gradient(closest-side, rgba(199,243,107,0.12) 0%, rgba(110,216,232,0.04) 35%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      {/* Smaller, sharper inner dot — gives the halo a "core" */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-20 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C7F36B]"
        style={{
          x: springX,
          y: springY,
          opacity: 0.6,
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}