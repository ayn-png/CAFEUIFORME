"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { menu, type MenuCategory } from "@/data/menu";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { CategoryBlock } from "./menu/CategoryBlock";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function MenuSection() {
  const [active, setActive] = useState(menu[0].id);
  const reduce = useReducedMotion();
  const category = menu.find((c) => c.id === active) as MenuCategory;

  return (
    <section id="menu" aria-labelledby="menu-title" className="relative bg-ivory py-28 md:py-40">
      <div className="wrap">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-8">
          <Reveal className="md:col-span-3">
            <SectionLabel index="二" label="The Menu" jp="お品書き" />
          </Reveal>
          <div className="md:col-span-9">
            <h2 id="menu-title" className="display text-[clamp(2.6rem,7vw,7rem)]">
              <RevealLines
                lines={[
                  <>
                    Small menu,
                  </>,
                  <>
                    <span className="display-italic text-matcha-deep">long</span> afternoons.
                  </>,
                ]}
              />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-lg text-[1.0625rem] leading-relaxed text-charcoal/80">
                Coffee from Indian estates, matcha from Uji, and sweets baked each morning. Everything is
                vegetarian unless marked — and nearly everything pairs well with a good volume.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Category rail */}
        <LayoutGroup id="menu-tabs">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="no-scrollbar -mx-[var(--gutter)] mt-16 flex snap-x overflow-x-auto border-y border-espresso/15 px-[var(--gutter)] md:mt-24"
          >
            {menu.map((c, i) => {
              const selected = c.id === active;
              return (
                <button
                  key={c.id}
                  role="tab"
                  id={`tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls="menu-panel"
                  onClick={() => setActive(c.id)}
                  className={cn(
                    "group relative flex shrink-0 snap-start items-baseline gap-3 px-5 py-5 text-left transition-colors duration-300 first:pl-0 lg:flex-1 lg:px-6",
                    selected ? "text-espresso" : "text-espresso/45 hover:text-espresso/80",
                  )}
                >
                  <span className="font-mono text-[0.6875rem] tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
                  <span className="whitespace-nowrap text-[0.9375rem] font-medium">{c.name}</span>
                  <span className="whitespace-nowrap font-jp text-xs opacity-60">{c.jp}</span>
                  {selected && (
                    <motion.span
                      layoutId="menu-tab-line"
                      className="absolute inset-x-0 -bottom-px h-[2px] bg-terracotta group-first:left-0"
                      transition={{ duration: 0.6, ease }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-14 md:mt-20">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease }}
            >
              <CategoryBlock category={category} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-espresso/15 pt-8 sm:flex-row sm:items-center">
          <p className="max-w-md text-sm text-muted">
            Prices in ₹, inclusive of GST. Please tell us about any allergies — our kitchen is happy to adjust.
          </p>
          <Link href="/menu" className="group inline-flex items-center gap-3 text-sm font-medium">
            <span className="link-underline">See the complete menu</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
