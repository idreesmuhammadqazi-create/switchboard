import Link from "next/link";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import { ParallaxHeadline } from "@/components/switchboard/parallax";
import { Magnetic } from "@/components/switchboard/magnetic";

export function CtaCard() {
  return (
    <section className="tint-magenta py-24">
      <div className="mx-auto max-w-5xl px-6">
        <LiquidGlassCard
          glassSize="lg"
          glassEffect={false}
          className="!bg-[#101625]/80 !backdrop-blur-md rounded-2xl border border-white/20 text-white"
        >
          <div className="relative px-8 py-16 text-center sm:px-16">
            <ParallaxHeadline amount={16}>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#C7F36B]">
                Ready when you are
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Wire it once. Run it forever.
              </h2>
            </ParallaxHeadline>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-white/80">
              Twenty minutes. We&apos;ll show you the agent on your line, or the workflow in your stack.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3">
              <Magnetic amount={14}>
                <Link
                  href="/book-demo"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#C7F36B] px-8 text-sm font-medium text-[#070A12] transition-colors hover:bg-[#C7F36B]/90"
                >
                  Book a demo call
                </Link>
              </Magnetic>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
                No deck. No SDR. Just the system.
              </p>
            </div>
          </div>
        </LiquidGlassCard>
      </div>
    </section>
  );
}