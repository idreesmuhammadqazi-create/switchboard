import { Reveal, RevealChild } from "@/components/switchboard/reveal";
import { ParallaxHeadline } from "@/components/switchboard/parallax";

type Service = {
  id: string;
  name: string;
  tag: string;
  body: string;
  bullets: string[];
  featured?: boolean;
  visual: React.ReactNode;
};

const SERVICES: Service[] = [
  {
    id: "n8n",
    name: "n8n automations",
    tag: "Core",
    featured: true,
    body: "Production workflows in n8n — wired, tested, monitored. You own the graph.",
    bullets: [
      "Multi-step pipelines across SaaS, DB, and AI",
      "Error handling, retries, alerting",
      "Hosted or self-hosted — your call",
    ],
    visual: <PipelineVisual />,
  },
  {
    id: "voice",
    name: "Voice agents",
    tag: "Service",
    body: "Inbound and outbound agents that sound human, route intent, and book.",
    bullets: ["Sub-second pickup", "Live transfer with context", "Post-call CRM write-back"],
    visual: <WaveformVisual />,
  },
  {
    id: "chatbots",
    name: "Chatbots",
    tag: "Service",
    body: "On-brand assistants for your site, inbox, and product.",
    bullets: ["Trained on your docs", "Hands off to humans cleanly", "Cost controls baked in"],
    visual: <ChatVisual />,
  },
  {
    id: "data",
    name: "Data pipelines",
    tag: "Service",
    body: "Sync, transform, and warehouse — without the Airflow bill.",
    bullets: ["Sync to BigQuery / Snowflake / Postgres", "Schema drift detection", "Backfills & replay"],
    visual: <DataVisual />,
  },
  {
    id: "integrations",
    name: "Integrations",
    tag: "Service",
    body: "Bridge systems that don't talk. CRM ↔ billing ↔ ops.",
    bullets: ["REST, GraphQL, webhooks", "Custom connectors", "Bi-directional sync"],
    visual: <IntegrationsVisual />,
  },
  {
    id: "custom",
    name: "Custom AI workflows",
    tag: "Service",
    body: "Anything that doesn't fit a template. We design and ship.",
    bullets: ["Discovery → prototype → ship", "Eval harness included", "You get the source"],
    visual: <CustomVisual />,
  },
];

export function ServiceCatalog() {
  return (
    <section id="services" className="bg-[#070A12] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ParallaxHeadline className="max-w-2xl" amount={18}>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
            Services
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            One agency. Six services. All production-grade.
          </h2>
          <p className="mt-4 max-w-xl text-base text-white/55">
            n8n is the engine. We do the wiring, the eval, and the on-call.
          </p>
        </ParallaxHeadline>

        <Reveal mode="stagger-children" className="mt-14 grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <RevealChild key={s.id} className="group bg-[#070A12] p-8 transition-colors hover:bg-[#0E1422]">
              <ServiceCard service={s} />
            </RevealChild>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
            service.featured ? "text-[#C7F36B]" : "text-white/40"
          }`}
        >
          {service.tag}
        </span>
        {service.featured ? (
          <span className="rounded-full border border-[#C7F36B]/40 bg-[#C7F36B]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#C7F36B]">
            Featured
          </span>
        ) : null}
      </div>

      <div className="mt-6 h-28 w-full overflow-hidden rounded-md border border-white/5 bg-[#0B0F1A]">
        {service.visual}
      </div>

      <h3 className="mt-6 text-xl font-medium text-white">{service.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{service.body}</p>

      <ul className="mt-4 space-y-1.5">
        {service.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-white/55">
            <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/30" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Per-service visuals ---

function PipelineVisual() {
  return (
    <svg viewBox="0 0 320 96" className="h-full w-full">
      <defs>
        <linearGradient id="n8n-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C7F36B" />
          <stop offset="100%" stopColor="#6ED8E8" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#n8n-line)" strokeWidth="1.5">
        <path d="M16 48 H80 L96 32 H160 L176 64 H240 L256 48 H304" />
      </g>
      {[
        [16, 48],
        [96, 32],
        [176, 64],
        [256, 48],
        [304, 48],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6" fill="#070A12" stroke="#C7F36B" strokeWidth="1.5" />
          <circle cx={x} cy={y} r="2" fill="#C7F36B" />
        </g>
      ))}
    </svg>
  );
}

function WaveformVisual() {
  const bars = Array.from({ length: 28 }, (_, i) => 8 + Math.abs(Math.sin(i / 1.7)) * 36);
  return (
    <svg viewBox="0 0 320 96" className="h-full w-full">
      {bars.map((h, i) => {
        const x = 16 + i * 11;
        const y = 48 - h / 2;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="6"
            height={h}
            rx="1"
            fill="#C7F36B"
            opacity={0.55 + (i % 3) * 0.15}
          />
        );
      })}
    </svg>
  );
}

function ChatVisual() {
  return (
    <svg viewBox="0 0 320 96" className="h-full w-full">
      <rect x="16" y="20" width="180" height="22" rx="11" fill="#151D2E" stroke="#1F2937" />
      <text x="28" y="35" fill="#9AA8BA" fontSize="11" fontFamily="ui-monospace">
        What&apos;s the return policy?
      </text>
      <rect x="124" y="50" width="180" height="22" rx="11" fill="#C7F36B" opacity="0.85" />
      <text x="136" y="65" fill="#070A12" fontSize="11" fontFamily="ui-monospace">
        30 days, no questions.
      </text>
    </svg>
  );
}

function DataVisual() {
  return (
    <svg viewBox="0 0 320 96" className="h-full w-full">
      <g stroke="#6ED8E8" strokeWidth="1" fill="none">
        {Array.from({ length: 6 }, (_, i) => (
          <line key={i} x1="0" x2="320" y1={20 + i * 14} y2={20 + i * 14} stroke="#1F2937" />
        ))}
      </g>
      <g fill="#6ED8E8">
        {Array.from({ length: 8 }, (_, i) => (
          <rect
            key={i}
            x={20 + i * 36}
            y={70 - (i * 7) % 50}
            width="20"
            height={(i * 7) % 50}
            opacity={0.5 + (i % 3) * 0.15}
          />
        ))}
      </g>
      <path
        d="M16 70 L48 60 L84 50 L120 52 L156 40 L192 36 L228 30 L264 22 L300 18"
        stroke="#C7F36B"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

function IntegrationsVisual() {
  const nodes = [
    [40, 30],
    [120, 50],
    [200, 30],
    [280, 50],
    [80, 70],
    [240, 70],
  ];
  return (
    <svg viewBox="0 0 320 96" className="h-full w-full">
      <g stroke="#6ED8E8" strokeWidth="1" opacity="0.5">
        {nodes.flatMap(([x1, y1], i) =>
          nodes.slice(i + 1).map(([x2, y2]) => (
            <line key={`${i}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))
        )}
      </g>
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#C7F36B" />
      ))}
    </svg>
  );
}

function CustomVisual() {
  return (
    <svg viewBox="0 0 320 96" className="h-full w-full">
      <g fontFamily="ui-monospace" fontSize="9">
        <text x="16" y="22" fill="#9AA8BA">
          <tspan fill="#C7F36B">const</tspan> agent = <tspan fill="#9AA8BA">await</tspan> switchboard.
        </text>
        <text x="16" y="40" fill="#9AA8BA">
          <tspan fill="#6ED8E8">  build</tspan>({`{`}
        </text>
        <text x="16" y="58" fill="#9AA8BA">
          {"    "}model: &quot;claude-opus&quot;,
        </text>
        <text x="16" y="76" fill="#9AA8BA">
          {"    "}tools: [crm, calendar, slack],
        </text>
        <text x="16" y="92" fill="#9AA8BA">
          {"  }"}).
        </text>
      </g>
    </svg>
  );
}