import type { Metadata } from "next";
import Link from "next/link";
import { menu } from "@/data/menu";
import { CategoryBlock } from "@/components/sections/menu/CategoryBlock";
import { RevealLines, Reveal } from "@/components/ui/Reveal";
import { DietMark } from "@/components/ui/DietMark";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Specialty coffee, Uji matcha, signature drinks, Japanese desserts and snacks at Shiori, Nandanvan, Nagpur. Prices in ₹.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <div className="bg-ivory pb-28 pt-32 md:pb-40 md:pt-44">
      <div className="wrap">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-3">
            <p className="font-jp text-sm tracking-[0.3em] text-terracotta">お品書き</p>
          </div>
          <div className="md:col-span-9">
            <h1 className="display text-[clamp(3.4rem,10vw,10rem)]">
              <RevealLines animateOnMount lines={["The", <span key="m" className="display-italic text-matcha-deep">Menu.</span>]} />
            </h1>
            <Reveal delay={0.3}>
              <p className="mt-8 max-w-lg text-[1.0625rem] leading-relaxed text-charcoal/80">
                Prices in ₹, inclusive of GST. Ask us about oat, almond and soy milk, and tell us about allergies —
                our kitchen is happy to adjust.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
                <li className="flex items-center gap-2"><DietMark diet="veg" /> Vegetarian</li>
                <li className="flex items-center gap-2"><DietMark diet="egg" /> Contains egg</li>
                <li className="flex items-center gap-2"><DietMark diet="nonveg" /> Non-vegetarian</li>
              </ul>
            </Reveal>
          </div>
        </div>

        {/* Jump nav */}
        <nav aria-label="Menu categories" className="sticky top-16 z-20 -mx-[var(--gutter)] mt-16 border-y border-espresso/15 bg-ivory/95 px-[var(--gutter)] backdrop-blur md:mt-24">
          <ul className="no-scrollbar flex gap-8 overflow-x-auto py-4">
            {menu.map((c, i) => (
              <li key={c.id} className="shrink-0">
                <a href={`#${c.id}`} className="flex items-baseline gap-2 text-sm text-espresso/70 transition-colors hover:text-espresso">
                  <span className="font-mono text-[0.65rem] opacity-60">{String(i + 1).padStart(2, "0")}</span>
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-16 space-y-28 md:mt-24 md:space-y-40">
          {menu.map((c) => (
            <section key={c.id} id={c.id} aria-label={c.name} className="scroll-mt-36">
              <CategoryBlock category={c} headingLevel="h2" />
            </section>
          ))}
        </div>

        <div className="mt-28 flex flex-col items-start justify-between gap-8 border-t border-espresso/15 pt-12 md:flex-row md:items-end">
          <p className="display max-w-xl text-4xl md:text-5xl">
            Hungry for a slow afternoon? <span className="display-italic text-terracotta">Save a seat.</span>
          </p>
          <div className="flex gap-3">
            <Button href="/#reserve">Reserve a table</Button>
            <Link href="/" className="inline-flex items-center px-4 text-sm text-muted hover:text-espresso">
              Back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
