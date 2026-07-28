import { LineChart, Line } from "@/components/charts/line-chart";
import { ParallaxHeadline } from "@/components/brimeo/parallax";
import { CountUp } from "@/components/brimeo/count-up";

// 12 months of calls+automations handled. Mild upward trend with seasonality.
const SERIES = Array.from({ length: 12 }, (_, i) => {
  const month = new Date(2026, i, 1).toISOString();
  return {
    date: month,
    calls: 800 + Math.round(Math.sin(i / 1.4) * 220 + i * 80),
    runs: 2400 + Math.round(Math.cos(i / 2) * 380 + i * 140),
  };
});

export function StatsBand() {
  return (
    <section className="tint-mix border-y border-white/5 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <ParallaxHeadline amount={26}>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
                Activity
              </p>
              <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                The system in motion.
              </h2>
            </div>
            <p className="hidden max-w-xs text-right text-sm text-white/55 md:block">
              Last 12 months across all deployed agents and workflows.
            </p>
          </div>
        </ParallaxHeadline>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr]">
          <dl className="grid grid-cols-1 gap-8">
            {[
              { label: "Calls handled", to: 248, format: "k" as const, sub: "Across 14 deployments" },
              { label: "Workflow runs", to: 1.2, format: "M" as const, sub: "Median runtime 1.4s" },
              { label: "Median pickup", to: 0.9, format: "s1" as const, sub: "Voice agents" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                  {stat.label}
                </dt>
                <dd className="mt-2 flex items-baseline gap-2">
                  <span className="font-mono text-4xl font-medium tracking-tight text-white">
                    <CountUp to={stat.to} format={stat.format} />
                  </span>
                  <span className="text-xs text-white/55">{stat.sub}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="rounded-md border border-white/10 bg-[#070A12] p-5">
            <LineChart
              data={SERIES}
              xDataKey="date"
              aspectRatio="2 / 1"
              className="w-full text-white"
            >
              <Line dataKey="calls" stroke="#C7F36B" />
              <Line dataKey="runs" stroke="#6ED8E8" />
            </LineChart>
            <div className="mt-3 flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-3 rounded-sm bg-[#C7F36B]" /> Calls
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-3 rounded-sm bg-[#6ED8E8]" /> Runs
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}