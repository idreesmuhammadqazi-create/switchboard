import { Marquee } from "@/components/ui/marquee";

// Inline brand glyphs (no asset dependency). Each is a 24x24 mark paired with
// the brand name in a uniform chip.
const LOGOS: ReadonlyArray<{ name: string; mark: React.ReactNode }> = [
  {
    name: "n8n",
    mark: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M12 2 4 7v10l8 5 8-5V7l-8-5Zm0 2.3 5.7 3.5v8.4L12 19.7 6.3 16.2V7.8L12 4.3Zm-1 4v3H8v2h3v3h2v-3h3v-2h-3V8h-2Z" />
      </svg>
    ),
  },
  {
    name: "OpenAI",
    mark: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M12 2c1.6 0 3 .8 3.9 2 1.7-.5 3.6.2 4.6 1.7 1 1.5.9 3.5-.2 4.9 1.1 1.4 1.2 3.4.2 4.9-1 1.5-2.9 2.2-4.6 1.7-.9 1.2-2.3 2-3.9 2s-3-.8-3.9-2c-1.7.5-3.6-.2-4.6-1.7-1-1.5-.9-3.5.2-4.9-1.1-1.4-1.2-3.4-.2-4.9 1-1.5 2.9-2.2 4.6-1.7C9 2.8 10.4 2 12 2Z" />
      </svg>
    ),
  },
  {
    name: "Anthropic",
    mark: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M12 2 4 22h4l1.4-4h5.2l1.4 4h4L12 2Zm0 6 2 6h-4l2-6Z" />
      </svg>
    ),
  },
  {
    name: "Stripe",
    mark: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M5 6h11a3 3 0 0 1 3 3v1h-2V9a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-1h2v1a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3Z" />
      </svg>
    ),
  },
  {
    name: "Slack",
    mark: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M5 9h2v2H5a2 2 0 1 1 0-4h2v2H5Zm4 0h6V7H9a2 2 0 0 0 0 4h2V9H9Zm4 6h-2v2a2 2 0 1 1-2 0v-2h4a2 2 0 0 0 0-4h-2v2h2a1 1 0 0 1 0 2Zm-4-2h2v2H9a2 2 0 0 0 0-4H7v2h2a1 1 0 0 1 0 2Zm6-4h2v2h2a2 2 0 1 1 0 4h-2v-2h2a1 1 0 0 0 0-2h-2V9Z" />
      </svg>
    ),
  },
  {
    name: "HubSpot",
    mark: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 4v5M12 19v-4M19 12h-4M9 12H4M16.5 7.5l-3 3M10.5 13.5l-3 3M16.5 16.5l-3-3M10.5 10.5l-3-3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "Notion",
    mark: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M4 4h16v16H4V4Zm2 2v12h12V6H6Zm2 2h2l4 6V8h2v8h-2l-4-6v6H8V8Z" />
      </svg>
    ),
  },
  {
    name: "Airtable",
    mark: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M3 5l9-3 9 3v10l-9 3-9-3V5Zm2 .8v9.4l7 2.3V8.1L5 5.8Zm9 11.7 7-2.3V5.8l-7 2.3v9.4Z" />
      </svg>
    ),
  },
];

export function LogoStrip() {
  return (
    <section
      aria-label="Integrations"
      className="border-y border-white/5 bg-[#0B0F1A] py-10"
    >
      <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
        Wired into the stack you already run
      </p>
      <Marquee pauseOnHover className="[--duration:32s] [--gap:3rem]">
        {LOGOS.map((logo) => (
          <div
            key={logo.name}
            className="flex items-center gap-2 text-white/55 transition-colors hover:text-white/85"
          >
            <span className="opacity-80">{logo.mark}</span>
            <span className="font-mono text-sm tracking-tight">{logo.name}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}