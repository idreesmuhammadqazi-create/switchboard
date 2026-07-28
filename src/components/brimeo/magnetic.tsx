"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

interface MagneticProps {
  children: ReactNode;
  /** Max X/Y translation in px. Default 14. */
  amount?: number;
  className?: string;
}

/**
 * Magnetic — wraps an element so its center translates toward the cursor
 * with a spring. Falls back to a static wrapper for reduced-motion users.
 *
 * Uses pointer events so it works for mouse + pen + touch (touch users
 * usually tap and don't hover, so the effect stays at rest).
 */
export function Magnetic({ children, amount = 14, className }: MagneticProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(pointer: coarse)").matches) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Map distance from center to a -amount..+amount translation.
      const dx = (e.clientX - cx) / (rect.width / 2 + 80);
      const dy = (e.clientY - cy) / (rect.height / 2 + 80);
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      x.set(clamp(dx) * amount);
      y.set(clamp(dy) * amount);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [amount, reduced, x, y]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}