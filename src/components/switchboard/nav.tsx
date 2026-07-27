import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#070A12]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span
            aria-hidden
            className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#C7F36B]/40 bg-[#C7F36B]/10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#C7F36B]" />
          </span>
          <span className="font-mono text-sm font-medium tracking-tight text-white">
            Switchboard
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          <a
            href="#services"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            Services
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            How it works
          </a>
          <a
            href="#capabilities"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            Capabilities
          </a>
        </nav>

        <Link
          href="/book-demo"
          className="inline-flex h-9 items-center justify-center rounded-full bg-[#C7F36B] px-4 text-sm font-medium text-[#070A12] transition-colors hover:bg-[#C7F36B]/90"
        >
          Book a demo
        </Link>
      </div>
    </header>
  );
}