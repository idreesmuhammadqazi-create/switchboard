import { Nav } from "@/components/switchboard/nav";
import { Hero } from "@/components/switchboard/hero";
import { LogoStrip } from "@/components/switchboard/logo-strip";
import { ServiceCatalog } from "@/components/switchboard/service-catalog";
import { UseCaseOutcomes } from "@/components/switchboard/use-case-outcomes";
import { PinnedScroll } from "@/components/switchboard/pinned-scroll";
import { SignalTicker } from "@/components/switchboard/signal-ticker";
import { HowItWorks } from "@/components/switchboard/how-it-works";
import { StatsBand } from "@/components/switchboard/stats-band";
import { CapabilityGrid } from "@/components/switchboard/capability-grid";
import { CtaCard } from "@/components/switchboard/cta-card";
import { Footer } from "@/components/switchboard/footer";
import { AmbientLayer } from "@/components/switchboard/ambient-layer";
import { PrewarmHeavy } from "@/components/switchboard/prewarm";
import { CursorHalo } from "@/components/switchboard/cursor-halo";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#070A12] text-white">
      <AmbientLayer />
      <CursorHalo />
      <PrewarmHeavy />
      <Nav />
      <Hero />
      <LogoStrip />
      <ServiceCatalog />
      <UseCaseOutcomes />
      <PinnedScroll />
      <SignalTicker />
      <HowItWorks />
      <StatsBand />
      <CapabilityGrid />
      <CtaCard />
      <Footer />
    </main>
  );
}