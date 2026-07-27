import { Reveal, RevealChild } from "@/components/switchboard/reveal";
import { ParallaxHeadline } from "@/components/switchboard/parallax";

const TILES = [
  {
    industry: "Home services",
    metric: "+42%",
    metricLabel: "booked-job rate",
    before: "Three office staff. Missed calls after hours. 14% lead loss.",
    after:
      "Voice agent answers 24/7. Same booking flow as your top rep. Live in 6 days.",
  },
  {
    industry: "B2B SaaS",
    metric: "0 → 1.4s",
    metricLabel: "median response time",
    before: "Inbound leads waited 9 minutes. Top-of-funnel churn was eating demos.",
    after:
      "n8n workflow routes inbound + qualifies + books a meeting before a human wakes up.",
  },
  {
    industry: "E-commerce",
    metric: "−68%",
    metricLabel: "tier-1 ticket volume",
    before: "Returns, order status, and shipping questions flooded the inbox.",
    after:
      "On-site chatbot trained on the help center escalates only the edge cases.",
  },
];

export function UseCaseOutcomes() {
  return (
    <section className="tint-lime py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ParallaxHeadline className="max-w-2xl" amount={20}>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
            Outcomes
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Numbers, not narratives.
          </h2>
        </ParallaxHeadline>

        <Reveal
          mode="stagger-children"
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {TILES.map((t) => (
            <RevealChild
              key={t.industry}
              className="relative border border-white/10 bg-[#070A12] p-7"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                {t.industry}
              </p>
              <p className="mt-5 font-mono text-5xl font-medium tracking-tight text-[#C7F36B]">
                {t.metric}
              </p>
              <p className="mt-1 text-sm text-white/55">{t.metricLabel}</p>

              <div className="mt-6 space-y-3 border-t border-white/5 pt-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                    Before
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">
                    {t.before}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#C7F36B]/70">
                    After
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-white/85">
                    {t.after}
                  </p>
                </div>
              </div>
            </RevealChild>
          ))}
        </Reveal>
      </div>
    </section>
  );
}