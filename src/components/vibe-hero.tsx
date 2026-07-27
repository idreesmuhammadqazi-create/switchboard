"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { animate, stagger, eases } from "animejs";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Silk from "@/components/Silk";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import { LineChart, Line } from "@/components/charts/line-chart";

const HEADLINE = "Vibe coding, wired up.";

const CHART_DATA = Array.from({ length: 12 }, (_, i) => ({
  date: new Date(2026, i, 1).toISOString(),
  signups: 40 + Math.round(Math.sin(i / 1.5) * 18 + i * 3),
}));

// Lazy-load Rive so the heavy canvas code never enters the server bundle and
// the missing .riv asset fails gracefully instead of breaking the page.
const RiveMascot = dynamic(
  () => import("@/components/rive-mascot").then((m) => m.RiveMascot),
  { ssr: false, loading: () => null }
);

export function VibeHero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const logo1Ref = useRef<HTMLDivElement>(null);
  const logo2Ref = useRef<HTMLDivElement>(null);
  const logo3Ref = useRef<HTMLDivElement>(null);
  const [riveFailed, setRiveFailed] = useState(false);

  // Anime.js text reveal — staggered per character on mount.
  useEffect(() => {
    if (!headlineRef.current) return;
    const chars = headlineRef.current.querySelectorAll<HTMLSpanElement>(".vibe-char");
    if (chars.length === 0) return;
    animate(chars, {
      opacity: [0, 1],
      translateY: [16, 0],
      delay: stagger(30),
      duration: 600,
      ease: eases.outCubic,
    });
  }, []);

  // Motion spring — cursor-reactive scale on the headline.
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 15, mass: 0.4 };
  const scaleX = useSpring(useTransform(cursorX, [-1, 1], [0.97, 1.03]), springConfig);
  const scaleY = useSpring(useTransform(cursorY, [-1, 1], [0.97, 1.03]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    cursorX.set(x);
    cursorY.set(y);
  };
  const handleMouseLeave = () => {
    cursorX.set(0);
    cursorY.set(0);
  };

  return (
    <section
      ref={containerRef}
      className="relative isolate min-h-screen w-full overflow-hidden bg-black text-white"
    >
      {/* React Bits — Silk shader background */}
      <div className="absolute inset-0 -z-20">
        <Silk speed={3} scale={1.4} color="#1a1a2e" noiseIntensity={1.2} rotation={0.2} />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-16 px-6 py-24">
        {/* Headline — Anime.js + Motion */}
        <motion.h1
          ref={headlineRef}
          className="text-center text-5xl font-semibold tracking-tight md:text-7xl"
          style={{ x: scaleX, y: scaleY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {HEADLINE.split("").map((char, i) => (
            <span key={i} className="vibe-char inline-block opacity-0">
              {char === " " ? " " : char}
            </span>
          ))}
        </motion.h1>

        {/* Magic UI — Animated Beam connecting 3 logos */}
        <div className="relative flex w-full max-w-2xl items-center justify-between py-12">
          <div
            ref={logo1Ref}
            className="z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl font-bold backdrop-blur"
          >
            A
          </div>
          <div
            ref={logo2Ref}
            className="z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl font-bold backdrop-blur"
          >
            B
          </div>
          <div
            ref={logo3Ref}
            className="z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl font-bold backdrop-blur"
          >
            C
          </div>
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={logo1Ref}
            toRef={logo2Ref}
            gradientStartColor="#ffaa40"
            gradientStopColor="#9c40ff"
            duration={3}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={logo2Ref}
            toRef={logo3Ref}
            gradientStartColor="#40ffaa"
            gradientStopColor="#40aaff"
            duration={3}
            delay={1.5}
          />
        </div>

        {/* KokonutUI — Liquid Glass card with Bklit line chart inside */}
        <LiquidGlassCard
          glassSize="lg"
          className="w-full max-w-2xl rounded-3xl border border-white/10 text-white"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Live metrics</h2>
              <span className="text-xs text-white/60">Last 12 months</span>
            </div>
            <div className="h-48 w-full">
              <LineChart
                data={CHART_DATA}
                xDataKey="date"
                aspectRatio="2 / 1"
                className="h-full w-full text-white"
              >
                <Line dataKey="signups" />
              </LineChart>
            </div>
          </div>
        </LiquidGlassCard>
      </div>

      {/* Rive mascot corner — falls back to a static emoji if the .riv is missing */}
      <div className="fixed bottom-6 right-6 z-30">
        {riveFailed ? (
          <FallbackMascot />
        ) : (
          <RiveMascot onError={() => setRiveFailed(true)} />
        )}
      </div>
    </section>
  );
}

function FallbackMascot() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-3xl backdrop-blur transition-transform"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transform: hovered ? "rotate(-15deg) scale(1.1)" : "none" }}
      aria-label="Mascot"
    >
      <span aria-hidden>👋</span>
    </div>
  );
}