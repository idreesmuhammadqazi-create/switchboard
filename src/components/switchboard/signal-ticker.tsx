import { Marquee } from "@/components/ui/marquee";

/**
 * SignalTicker — a second marquee-style band between sections.
 * Shows fake-live signals (queue depth, latency, status) that scroll forever.
 * The data is static but the rendering makes the page feel continuously live.
 */

const SIGNALS = [
  { label: "queue depth", value: "0", tone: "ok" },
  { label: "voice latency p50", value: "812ms", tone: "ok" },
  { label: "n8n runs / min", value: "1,247", tone: "ok" },
  { label: "incidents", value: "0", tone: "ok" },
  { label: "active agents", value: "14", tone: "ok" },
  { label: "calls handled today", value: "3,419", tone: "ok" },
  { label: "customer handoff rate", value: "11%", tone: "ok" },
  { label: "calendar booked", value: "182", tone: "ok" },
];

const TONE_COLOR: Record<string, string> = {
  ok: "text-[#C7F36B]",
  warn: "text-[#F4D03F]",
  err: "text-[#FF6B6B]",
};

export function SignalTicker() {
  return (
    <section
      aria-label="Live signals"
      className="border-y border-white/5 bg-[#070A12] py-5"
    >
      <Marquee
        pauseOnHover
        className="[--duration:48s] [--gap:3rem] font-mono"
      >
        {SIGNALS.map((s) => (
          <span
            key={s.label}
            className="flex items-center gap-3 whitespace-nowrap text-xs uppercase tracking-[0.18em]"
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#C7F36B]" />
            <span className="text-white/45">{s.label}</span>
            <span className={`font-medium ${TONE_COLOR[s.tone] ?? "text-white"}`}>
              {s.value}
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}