import Link from "next/link";
import { FooterMascot } from "@/components/switchboard/footer-mascot";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#070A12] py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <span
              aria-hidden
              className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#C7F36B]/40 bg-[#C7F36B]/10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#C7F36B]" />
            </span>
            <span className="font-mono text-sm font-medium text-white">
              Switchboard
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-white/55">
            Built for teams that automate.
          </p>
        </div>

        <FooterCol
          title="Services"
          links={[
            ["n8n automations", "#services"],
            ["Voice agents", "#services"],
            ["Chatbots", "#services"],
            ["Custom AI", "#services"],
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            ["Book a demo", "/book-demo"],
            ["Contact", "mailto:hello@switchboard.ai"],
          ]}
        />
        <FooterCol
          title="Legal"
          links={[
            ["Privacy", "/privacy"],
            ["Terms", "/terms"],
          ]}
        />
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-white/5 px-6 pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} Switchboard AI Ops</span>
        <span>v0.2 · Powered by n8n, motion, and an actual agent</span>
      </div>

      <div className="pointer-events-none fixed bottom-6 right-6 z-30 hidden h-24 w-24 sm:block">
        <FooterMascot />
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<readonly [string, string]>;
}) {
  return (
    <div>
      <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
        {title}
      </h3>
      <ul className="mt-4 space-y-2">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-white/65 transition-colors hover:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}