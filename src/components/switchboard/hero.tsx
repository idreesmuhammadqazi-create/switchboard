"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, stagger, eases } from "animejs";
import { SilkBackground } from "@/components/switchboard/silk-background";

const HEADLINE = "Automation that actually ships.";
const SERVICES = [
  "n8n",
  "Voice agents",
  "Chatbots",
  "Data pipelines",
  "Integrations",
  "Custom AI",
];

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setPrefersReduced(!!mql?.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql?.addEventListener?.("change", handler);
    return () => mql?.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    if (!headlineRef.current) return;
    if (prefersReduced) {
      headlineRef.current
        .querySelectorAll<HTMLSpanElement>(".sb-char")
        .forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      return;
    }
    const chars = headlineRef.current.querySelectorAll<HTMLSpanElement>(".sb-char");
    if (chars.length === 0) return;
    animate(chars, {
      opacity: [0, 1],
      translateY: [14, 0],
      delay: stagger(28),
      duration: 540,
      ease: eases.outCubic,
    });
  }, [prefersReduced]);

  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden">
      <SilkBackground />

      <div className="relative mx-auto flex min-h-[92vh] max-w-5xl flex-col items-center justify-center px-6 pt-20 pb-28 text-center">
        <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">
          Switchboard / AI Operations
        </p>

        <h1
          ref={headlineRef}
          className="max-w-4xl text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          {HEADLINE.split(" ").map((word, wi) => (
            <span
              key={wi}
              className="sb-word inline-block whitespace-nowrap"
              aria-hidden={false}
            >
              {word.split("").map((char, ci) => (
                <span
                  key={`${wi}-${ci}`}
                  className="sb-char inline-block opacity-0"
                >
                  {char}
                </span>
              ))}
              {wi < HEADLINE.split(" ").length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-white/65 sm:text-lg">
          We build n8n workflows, voice agents, and AI automations that run
          <span className="text-white/85"> minus the headcount math.</span>
        </p>

        <ul
          aria-label="Services"
          className="mt-9 flex max-w-3xl flex-wrap items-center justify-center gap-2"
        >
          {SERVICES.map((s, i) => (
            <li key={s}>
              <span
                className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/75 ${
                  i === 0 ? "border-[#C7F36B]/40 bg-[#C7F36B]/10 text-[#C7F36B]" : ""
                }`}
              >
                <span
                  aria-hidden
                  className={`h-1.5 w-1.5 rounded-full ${
                    i === 0 ? "bg-[#C7F36B]" : "bg-white/40"
                  }`}
                />
                {s}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            href="/book-demo"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#C7F36B] px-7 text-sm font-medium text-[#070A12] transition-colors hover:bg-[#C7F36B]/90"
          >
            Book a demo call
          </Link>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
            Live in under a week · No seat fee · n8n-native
          </p>
        </div>
      </div>
    </section>
  );
}