"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { useReducedMotion } from "motion/react";

export type CountFormat = "round" | "k" | "M" | "s1";

const FORMATTERS: Record<CountFormat, (n: number) => string> = {
  round: (n) => Math.round(n).toString(),
  k: (n) => `${Math.round(n)}k`,
  M: (n) =>
    `${n.toFixed(n >= 1 ? 1 : 2).replace(/\.0$/, "")}M`,
  s1: (n) => `${n.toFixed(1)}s`,
};

interface CountUpProps {
  /** Target value to count to. */
  to: number;
  /** Duration in ms. Default 1400. */
  duration?: number;
  /** Format preset. Default "round". */
  format?: CountFormat;
  className?: string;
  /** Trigger once (default) or every time the element enters viewport. */
  once?: boolean;
}

/**
 * CountUp — animates from 0 → `to` when the element first enters viewport.
 * Reduced-motion users see the final value immediately.
 *
 * Renders the value as plain text so it inherits the surrounding typography.
 */
export function CountUp({
  to,
  duration = 1400,
  format = "round",
  className,
  once = true,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const formatter = FORMATTERS[format] ?? FORMATTERS.round;
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setValue(to);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const obj = { v: 0 };
        animate(obj, {
          v: to,
          duration,
          ease: "outExpo",
          onUpdate: () => setValue(obj.v),
          onComplete: () => setValue(to),
        });
        if (once) obs.disconnect();
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration, once, reduced]);

  return (
    <span ref={ref} className={className}>
      {formatter(value)}
    </span>
  );
}