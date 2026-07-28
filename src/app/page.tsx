import { Nav } from "@/components/brimeo/nav";
import { Hero } from "@/components/brimeo/hero";
import { LogoStrip } from "@/components/brimeo/logo-strip";
import { ServiceCatalog } from "@/components/brimeo/service-catalog";
import { UseCaseOutcomes } from "@/components/brimeo/use-case-outcomes";
import { PinnedScroll } from "@/components/brimeo/pinned-scroll";
import { SignalTicker } from "@/components/brimeo/signal-ticker";
import { HowItWorks } from "@/components/brimeo/how-it-works";
import { StatsBand } from "@/components/brimeo/stats-band";
import { CapabilityGrid } from "@/components/brimeo/capability-grid";
import { CtaCard } from "@/components/brimeo/cta-card";
import { Footer } from "@/components/brimeo/footer";
import { AmbientLayer } from "@/components/brimeo/ambient-layer";
import { PrewarmHeavy } from "@/components/brimeo/prewarm";
import { CursorHalo } from "@/components/brimeo/cursor-halo";

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