"use client";

import { useRef } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { ParallaxHeadline } from "@/components/brimeo/parallax";

const STEPS = [
  {
    n: "01",
    title: "Connect",
    body: "Point us at your stack. CRM, calendar, billing, knowledge base. Five minutes, no engineering ticket.",
  },
  {
    n: "02",
    title: "Orchestrate",
    body: "We design the workflow, train the agent, and define escalation rules. You see the plan before we build.",
  },
  {
    n: "03",
    title: "Improve",
    body: "Every call and run is logged, scored, and routed to your QA queue. The system gets sharper every week.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="tint-cyan py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ParallaxHeadline className="max-w-2xl" amount={22}>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
            How Brimeo works
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Three steps from kickoff to first call.
          </h2>
        </ParallaxHeadline>

        <div className="mt-16">
          <Pipeline />
        </div>
      </div>
    </section>
  );
}

function Pipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);
  const c = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-0"
    >
      {STEPS.map((s, i) => {
        const ref = [a, b, c][i];
        return (
          <div
            key={s.n}
            ref={ref}
            className="relative flex flex-col gap-3 border border-white/10 bg-[#101625] p-7 lg:mr-0"
          >
            <span className="font-mono text-sm text-[#C7F36B]">{s.n}</span>
            <h3 className="text-xl font-medium text-white">{s.title}</h3>
            <p className="text-sm leading-relaxed text-white/65">{s.body}</p>
          </div>
        );
      })}

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={a}
        toRef={b}
        gradientStartColor="#C7F36B"
        gradientStopColor="#6ED8E8"
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={b}
        toRef={c}
        gradientStartColor="#6ED8E8"
        gradientStopColor="#C7F36B"
        duration={3}
        delay={1.5}
      />
    </div>
  );
}