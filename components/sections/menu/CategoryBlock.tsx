"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatINR, tagLabel, type MenuCategory } from "@/data/menu";
import type { ImageKey } from "@/data/images";
import { Photo } from "@/components/ui/Photo";
import { DietMark } from "@/components/ui/DietMark";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** Editorial menu spread: sticky changing photograph + priced list. */
export function CategoryBlock({ category, headingLevel = "h3" }: { category: MenuCategory; headingLevel?: "h2" | "h3" }) {
  const [hoverImage, setHoverImage] = useState<ImageKey | null>(null);
  const shown = hoverImage ?? category.cover;
  const H = headingLevel;

  return (
    <div className="grid gap-12 md:grid-cols-12 md:gap-x-8">
      {/* Visual column */}
      <div className="md:col-span-5">
        <div className="md:sticky md:top-24">
          <div className="relative aspect-[5/4] overflow-hidden bg-paper md:aspect-[4/5]">
            <AnimatePresence initial={false}>
              <motion.div
                key={shown}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease }}
              >
                <Photo id={shown} sizes="(min-width: 768px) 40vw, 100vw" />
              </motion.div>
            </AnimatePresence>
            <span
              aria-hidden
              className="vertical-jp absolute right-4 top-4 bg-ivory/90 px-1.5 py-3 text-xs text-espresso"
            >
              {category.jp}
            </span>
          </div>
          <div className="mt-6 flex items-start gap-5">
            <span aria-hidden className="font-jp text-5xl leading-none text-terracotta">
              {category.kanji}
            </span>
            <div>
              <H className="display text-3xl md:text-4xl">{category.name}</H>
              <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-muted">{category.blurb}</p>
            </div>
          </div>
        </div>
      </div>

      {/* List column */}
      <ul className="md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
        {category.items.map((item) => (
          <li
            key={item.id}
            onMouseEnter={() => item.image && setHoverImage(item.image)}
            onMouseLeave={() => setHoverImage(null)}
            className="group relative border-b border-espresso/12 py-6 first:pt-0 md:py-7"
          >
            <div className="flex gap-4">
              {item.image && (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden md:hidden">
                  <Photo id={item.image} sizes="64px" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-3">
                  <h4 className="flex min-w-0 items-baseline gap-2.5">
                    <DietMark diet={item.diet} className="translate-y-[-1px] self-center" />
                    <span className="display text-[1.45rem] leading-tight transition-colors duration-300 group-hover:text-terracotta md:text-[1.7rem]">
                      {item.name}
                    </span>
                  </h4>
                  {item.jp && (
                    <span className="hidden font-jp text-xs tracking-[0.15em] text-muted sm:inline">{item.jp}</span>
                  )}
                  <span aria-hidden className="mb-1.5 hidden flex-1 border-b border-dotted border-espresso/25 sm:block" />
                  <span className="ml-auto shrink-0 font-mono text-[0.95rem] tabular-nums tracking-tight sm:ml-0">
                    {formatINR(item.price)}
                  </span>
                </div>
                <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-charcoal/75">{item.description}</p>
                {(item.tags?.length || item.note) && (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {item.tags?.map((t) => (
                      <span
                        key={t}
                        className={cn(
                          "eyebrow !text-[0.6rem] border px-2 py-1",
                          t === "signature"
                            ? "border-terracotta/40 text-terracotta"
                            : t === "bestseller"
                              ? "border-espresso/30 bg-espresso text-ivory"
                              : "border-matcha/50 text-matcha-deep",
                        )}
                      >
                        {tagLabel[t]}
                      </span>
                    ))}
                    {item.note && <span className="text-xs italic text-muted">{item.note}</span>}
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
