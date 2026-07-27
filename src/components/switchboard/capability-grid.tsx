"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal, RevealChild } from "@/components/switchboard/reveal";
import { ParallaxHeadline } from "@/components/switchboard/parallax";

const CAPABILITIES = [
  {
    title: "Workflow design",
    body: "n8n graphs that don't break in production. Error branches, retries, alerting.",
  },
  {
    title: "Voice agent ops",
    body: "Voice flows with escalation, transfer, and post-call write-back.",
  },
  {
    title: "CRM + billing sync",
    body: "HubSpot, Salesforce, Stripe, NetSuite — bi-directional, no drift.",
  },
  {
    title: "Eval + monitoring",
    body: "Harnesses that score outputs against your rubric. Replayable traces.",
  },
  {
    title: "Hosting + infra",
    body: "Self-hosted, your cloud, or ours. We run the on-call so you don't.",
  },
  {
    title: "Onboarding handoff",
    body: "You own the source. We hand off with runbooks and shadow weeks.",
  },
];

export function CapabilityGrid() {
  const reduced = useReducedMotion();
  return (
    <section id="capabilities" className="tint-lime py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ParallaxHeadline className="max-w-2xl" amount={20}>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
            Capabilities
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            The full delivery stack — without the seat math.
          </h2>
        </ParallaxHeadline>

        <Reveal
          mode="stagger-children"
          className="mt-14 grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CAPABILITIES.map((c) => (
            <RevealChild key={c.title}>
              <motion.div
                whileHover={reduced ? undefined : { y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group h-full bg-[#070A12] p-8 transition-colors hover:bg-[#0E1422]"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-[#C7F36B] transition-transform group-hover:scale-150"
                  />
                  <h3 className="text-base font-medium text-white">{c.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{c.body}</p>
              </motion.div>
            </RevealChild>
          ))}
        </Reveal>
      </div>
    </section>
  );
}