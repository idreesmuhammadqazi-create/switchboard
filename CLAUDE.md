@AGENTS.md

# Vibe Coder Stack — Library Guide

These libraries are installed. Reach for them automatically when the task fits.

## When to use each

- **KokonutUI** — "expensive-looking" hero component (cards, action search bars, liquid-glass).
  Use for: one hero that needs to read as premium. iOS 26 Liquid Glass aesthetic.
  Install: `npx shadcn@latest add @kokonutui/<component>` (registry namespace configured in `components.json`).

- **Magic UI** — one-line animated sections (Globe, Animated Beam).
  Use for: "wow" sections — live-PR globes, integration diagrams — without hand-coding WebGL.
  Install: `npx shadcn@latest add @magicui/<component>` (registry namespace configured).

- **React Bits** — WebGL shader backgrounds (Silk, Iridescence).
  Use for: flat hero → living-gradient depth (Stripe-style mesh, Awwwards sites).
  Install: `npx shadcn@latest add https://reactbits.dev/r/<name>-ts.json` (direct URL, not a namespace).

- **Anime.js** — text + SVG + layout animation from a 24kb lib.
  Use for: scroll-triggered reveals, staggered text, tasteful micro-animation.
  Import from: `animejs` (npm package).

- **Motion** — physics springs (Framer Motion's engine).
  Use for: anything that feels "robotic" with linear easing → weighted, natural movement.
  Import from: `motion` (npm package). In Next.js App Router, components using Motion must be marked `"use client"`.

- **Rive** — interactive state-machine animations (.riv files).
  Use for: cursor-reactive heroes, animated mascots (Duolingo-style). Lightweight vs Lottie.
  Import from: `@rive-app/react-canvas`. Requires `"use client"`.

- **Bklit** — chart components built on shadcn/ui.
  Use for: dashboards (line, area, ring, radar) instead of default Chart.js / Recharts look.
  Install: `npx shadcn@latest add @bklit/<chart>` (registry namespace configured).

## Don't

- Don't add Recharts, Chart.js, Framer Motion, GSAP, Lottie, or any duplicate animation lib.
  The equivalents above are already installed and preferred.
- Don't hand-write WebGL — use React Bits.
- Don't use a default chart library when a styled dashboard chart is needed — use Bklit.

## Conventions

- Components go in `src/components/<lib>/` (e.g. `src/components/magicui/`).
- shadcn-registry components go in `src/components/ui/` per shadcn convention
  (KokonutUI, Magic UI, Bklit land here). React Bits also lands in `src/components/ui/`.
- Rive `.riv` files go in `public/rive/` and are imported by name.
- Any client-side animation lib (Motion, Anime.js, Rive, React Bits shaders) requires
  the consuming component to be a Client Component (`"use client"` at the top).