"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ParallaxHeadline } from "@/components/brimeo/parallax";

type Feature = {
  id: string;
  title: string;
  body: string;
  bullets: string[];
  visual: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    id: "wire",
    title: "Wire it once.",
    body: "n8n graphs that don't break in production. Error branches, retries, alerting — built in.",
    bullets: ["400+ native nodes", "Self-hosted or cloud", "Version-controlled graphs"],
    visual: <WireVisual />,
  },
  {
    id: "watch",
    title: "Watch it run.",
    body: "Every call, every run, every handoff — logged, scored, and searchable. The eval harness catches drift before your customers do.",
    bullets: ["Replayable traces", "Custom rubrics", "Real-time alerts"],
    visual: <WatchVisual />,
  },
  {
    id: "improve",
    title: "Improve every week.",
    body: "Patterns from real calls feed back into prompts, routing, and tone. The system gets sharper the longer it runs.",
    bullets: ["Closed-loop eval", "Tone tuning", "Auto-rubric updates"],
    visual: <ImproveVisual />,
  },
];

export function PinnedScroll() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track which feature is in view as the user scrolls through the section.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const vh = window.innerHeight;
      // Total scrollable distance inside the section (height - viewport).
      const totalScroll = Math.max(sectionHeight - vh, 1);
      // How far we've scrolled past the section's top, clamped to its range.
      const passed = Math.min(Math.max(-sectionTop, 0), totalScroll);
      const progress = passed / totalScroll;
      setScrollProgress(progress);

      // Map progress to active feature index. Three features, evenly split.
      const idx = Math.min(
        Math.floor(progress * FEATURES.length * 0.999),
        FEATURES.length - 1
      );
      setActiveIndex(idx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#070A12]"
      // Height: 3 viewports — one per feature card scroll past.
      style={{ height: `${FEATURES.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — pinned */}
          <div className="flex flex-col justify-center">
            <ParallaxHeadline amount={14}>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#C7F36B]">
                Delivery
              </p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Three layers. One system.
              </h2>
              <p className="mt-4 max-w-md text-base text-white/55">
                Scroll the right side. The architecture stays put.
              </p>
            </ParallaxHeadline>

            {/* Live indicator: which feature is active */}
            <div className="mt-10 flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                Stage {String(activeIndex + 1).padStart(2, "0")} / {String(FEATURES.length).padStart(2, "0")}
              </span>
              <div className="relative h-px flex-1 bg-white/10">
                <div
                  className="absolute inset-y-0 left-0 bg-[#C7F36B] transition-[width] duration-200 ease-out"
                  style={{ width: `${((activeIndex + 1) / FEATURES.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Feature visual for the active stage */}
            <div className="mt-10 h-44 w-full overflow-hidden rounded-md border border-white/10 bg-[#0B0F1A]">
              {FEATURES[activeIndex].visual}
            </div>
          </div>

          {/* RIGHT — scrolling cards */}
          <div className="relative h-[80vh] overflow-hidden">
            <motion.div
              className="flex h-full flex-col gap-6"
              animate={
                reduced
                  ? undefined
                  : {
                      y: `-${activeIndex * 36}%`,
                    }
              }
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 220, damping: 28 }
              }
            >
              {FEATURES.map((f, i) => (
                <article
                  key={f.id}
                  className={`shrink-0 border bg-[#0E1422] p-7 transition-colors ${
                    i === activeIndex
                      ? "border-[#C7F36B]/40"
                      : "border-white/10"
                  }`}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-2xl font-medium text-white">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-base text-white/65">{f.body}</p>
                  <ul className="mt-4 space-y-1.5">
                    {f.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-white/55"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/30"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </motion.div>

            {/* Progress indicator on the right rail */}
            <div
              aria-hidden
              className="absolute right-0 top-0 h-full w-px bg-white/5"
            >
              <div
                className="absolute left-0 top-0 w-px bg-[#C7F36B]"
                style={{ height: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Per-feature visuals (match the active stage) ---

function WireVisual() {
  return (
    <svg viewBox="0 0 320 120" className="h-full w-full">
      <defs>
        <linearGradient id="wire-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C7F36B" />
          <stop offset="100%" stopColor="#6ED8E8" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#wire-line)" strokeWidth="1.5">
        <path d="M16 60 H80 L96 30 H160 L176 90 H240 L256 60 H304" />
      </g>
      {[
        [16, 60],
        [96, 30],
        [176, 90],
        [256, 60],
        [304, 60],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6" fill="#070A12" stroke="#C7F36B" strokeWidth="1.5" />
          <circle cx={x} cy={y} r="2" fill="#C7F36B" />
        </g>
      ))}
    </svg>
  );
}

function WatchVisual() {
  const points = [10, 14, 12, 18, 22, 19, 28, 32, 30, 38, 44, 42, 50, 56, 60];
  const W = 320;
  const H = 120;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const stepX = W / (points.length - 1);
  const yFor = (v: number) => H - 8 - ((v - min) / (max - min)) * (H - 16);
  const path = points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${yFor(v)}`)
    .join(" ");

  return (
    <svg viewBox="0 0 320 120" className="h-full w-full">
      <g stroke="#1F2937" strokeWidth="1">
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1="0" x2="320" y1={20 + i * 22} y2={20 + i * 22} />
        ))}
      </g>
      <path d={`${path} L ${W} ${H} L 0 ${H} Z`} fill="#6ED8E8" opacity="0.12" />
      <path d={path} fill="none" stroke="#6ED8E8" strokeWidth="2" strokeLinecap="round" />
      {points.map((v, i) => (
        <circle key={i} cx={i * stepX} cy={yFor(v)} r="2.5" fill="#6ED8E8" />
      ))}
    </svg>
  );
}

function ImproveVisual() {
  const rows = [
    { label: "intent match", v: 0.82, target: 0.9 },
    { label: "tone fit", v: 0.74, target: 0.85 },
    { label: "escalation rate", v: 0.91, target: 0.88 },
    { label: "booked-meeting rate", v: 0.68, target: 0.78 },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-5">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
            <span>{r.label}</span>
            <span className="text-white/55">
              {Math.round(r.v * 100)}%
              <span className="ml-2 text-white/35">
                target {Math.round(r.target * 100)}%
              </span>
            </span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full bg-[#C7F36B]"
              style={{ width: `${r.v * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}