"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

interface ParallaxHeadlineProps {
  children: ReactNode;
  className?: string;
  /** Magnitude of the Y translation in pixels. Default 24. */
  amount?: number;
}

/**
 * Wraps a heading in a scroll-driven Y parallax. The element starts at +amount
 * and slides to -amount as it scrolls past, giving the page a layered feel.
 * Gated on `prefers-reduced-motion` so it sits still for those users.
 */
export function ParallaxHeadline({
  children,
  className,
  amount = 24,
}: ParallaxHeadlineProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}