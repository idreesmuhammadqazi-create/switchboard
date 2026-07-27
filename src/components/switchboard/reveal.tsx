"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { animate, stagger, eases } from "animejs";
import { motion, useReducedMotion } from "motion/react";

type Mode = "fade-up" | "stagger-children" | "word-stagger";

interface RevealProps {
  mode?: Mode;
  className?: string;
  /** IntersectionObserver root margin, e.g. "0px 0px -10% 0px". Default triggers ~10% before viewport. */
  margin?: string;
  /** Re-trigger when scrolling back out and back in. Default fires once. */
  repeat?: boolean;
  children: ReactNode;
}

export function Reveal({
  mode = "fade-up",
  className,
  margin = "0px 0px -10% 0px",
  repeat = false,
  children,
}: RevealProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      // Make sure nothing is left hidden when reduced-motion is on.
      if (mode === "stagger-children") {
        el.querySelectorAll<HTMLElement>(".reveal-child").forEach((c) => {
          c.style.opacity = "1";
          c.style.transform = "none";
        });
      }
      if (mode === "word-stagger") {
        el.querySelectorAll<HTMLElement>(".reveal-word").forEach((w) => {
          w.style.opacity = "1";
          w.style.transform = "none";
        });
      }
      return;
    }

    const fire = () => {
      if (mode === "stagger-children") {
        const kids = el.querySelectorAll<HTMLElement>(".reveal-child");
        if (kids.length === 0) return;
        animate(kids, {
          opacity: [0, 1],
          translateY: [16, 0],
          delay: stagger(60),
          duration: 520,
          ease: eases.outCubic,
        });
      } else if (mode === "word-stagger") {
        const words = el.querySelectorAll<HTMLElement>(".reveal-word");
        if (words.length === 0) return;
        animate(words, {
          opacity: [0, 1],
          translateY: [10, 0],
          delay: stagger(35),
          duration: 480,
          ease: eases.outCubic,
        });
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!triggered.current) {
            triggered.current = true;
            fire();
          }
        } else if (repeat) {
          triggered.current = false;
        }
      },
      { rootMargin: margin, threshold: 0.05 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [mode, margin, repeat, reduced]);

  if (mode === "fade-up") {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: !repeat, margin }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Wrap an inline text string so each word becomes a `.reveal-word` span.
 * Use inside a `word-stagger` Reveal.
 */
export function RevealText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="reveal-word inline-block opacity-0">
          {word}
          {i < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

/**
 * Wrap children so each gets a `.reveal-child` class for stagger reveal.
 * Use inside a `stagger-children` Reveal.
 */
export function RevealChild({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`reveal-child opacity-0 ${className ?? ""}`}>{children}</div>
  );
}

/** Re-exported for callers that want to inject a child programmatically. */
export { Children, isValidElement, cloneElement };
export type { ReactElement };