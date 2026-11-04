"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X, Plus } from "lucide-react";
import { gallery } from "@/data/gallery";
import { images } from "@/data/images";
import { links, site } from "@/data/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { InstagramIcon } from "@/components/ui/Icons";
import { lockScroll } from "@/components/layout/SmoothScroll";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

const spanCls = {
  hero: "col-span-2 row-span-2 md:col-span-8 md:row-span-2",
  tall: "row-span-2 md:col-span-4 md:row-span-2",
  wide: "col-span-2 md:col-span-8",
  square: "md:col-span-4",
} as const;

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const [dir, setDir] = useState(1);

  const open = (i: number) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setDir(1);
    setIndex(i);
  };
  const close = useCallback(() => {
    setIndex(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback((d: number) => {
    setDir(d);
    setIndex((i) => (i === null ? i : (i + d + gallery.length) % gallery.length));
  }, []);

  useEffect(() => {
    if (index === null) return;
    lockScroll(true);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab") {
        // Simple focus trap within the dialog
        const nodes = document.querySelectorAll<HTMLElement>("#lightbox button");
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [index, close, step]);

  const current = index !== null ? images[gallery[index].image] : null;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative bg-ivory py-28 md:py-40">
      <div className="wrap">
        <div className="mb-16 grid gap-y-10 md:mb-24 md:grid-cols-12 md:gap-x-8">
          <Reveal className="md:col-span-3">
            <SectionLabel index="五" label="Gallery" jp="写真" />
          </Reveal>
          <div className="flex flex-col gap-8 md:col-span-9 lg:flex-row lg:items-end lg:justify-between">
            <h2 id="gallery-title" className="display text-[clamp(2.6rem,7vw,7rem)]">
              <RevealLines lines={["Timber, steam", <span key="b" className="display-italic text-matcha-deep">&amp; paper light.</span>]} />
            </h2>
            <Reveal delay={0.15}>
              <a
                href={links.instagram}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 text-sm font-medium lg:pb-4"
              >
                <InstagramIcon />
                <span className="link-underline">@{site.instagram}</span>
              </a>
            </Reveal>
          </div>
        </div>

        <ul className="grid auto-rows-[44vw] grid-flow-dense grid-cols-2 gap-3 md:auto-rows-[17vw] md:grid-cols-12 md:gap-5 2xl:auto-rows-[15rem]">
          {gallery.map((g, i) => {
            const entry = images[g.image];
            return (
              <Reveal as="li" key={g.image + i} delay={(i % 4) * 0.06} y={40} className={cn("relative", spanCls[g.span])}>
                <button
                  type="button"
                  onClick={() => open(i)}
                  className="group absolute inset-0 overflow-hidden bg-paper text-left"
                  aria-label={`View photo: ${entry.caption}`}
                >
                  <div className="absolute inset-0 transition-transform duration-[1.6s] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]">
                    <Photo id={g.image} sizes={g.span === "hero" || g.span === "wide" ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"} />
                  </div>
                  <span className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/25" />
                  <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between p-4 text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:p-5">
                    <span>
                      <span className="block font-jp text-[0.65rem] tracking-[0.3em] opacity-80">{entry.jp}</span>
                      <span className="display text-xl md:text-2xl">{entry.caption}</span>
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-ivory/50">
                      <Plus className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ul>
      </div>

      <AnimatePresence>
        {index !== null && current && (
          <motion.div
            id="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Photo ${index + 1} of ${gallery.length}: ${current.caption}`}
            className="fixed inset-0 z-[70] flex flex-col bg-ink/96 text-ivory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div className="wrap flex h-16 items-center justify-between md:h-20">
              <span className="font-mono text-xs tracking-widest text-ivory/60">
                {String(index + 1).padStart(2, "0")} — {String(gallery.length).padStart(2, "0")}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="-mr-2 grid h-11 w-11 place-items-center"
                aria-label="Close gallery"
              >
                <X className="h-6 w-6" strokeWidth={1.25} />
              </button>
            </div>

            <div className="relative flex-1 overflow-hidden" onClick={(e) => e.target === e.currentTarget && close()}>
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div
                  key={index}
                  custom={dir}
                  className="absolute inset-x-[var(--gutter)] inset-y-2 md:inset-x-[12vw]"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -60 }}
                  transition={{ duration: 0.6, ease }}
                >
                  <Photo id={gallery[index].image} sizes="90vw" className="[&_img]:!object-contain" />
                </motion.div>
              </AnimatePresence>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-ivory/20 transition-colors hover:bg-ivory hover:text-ink md:left-8 md:grid"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-ivory/20 transition-colors hover:bg-ivory hover:text-ink md:right-8 md:grid"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="wrap flex items-end justify-between gap-6 py-6 md:py-8">
              <div>
                <p className="font-jp text-xs tracking-[0.3em] text-ivory/50">{current.jp}</p>
                <p className="display mt-1 text-2xl md:text-3xl">{current.caption}</p>
              </div>
              <div className="flex gap-2 md:hidden">
                <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20">
                  <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next photo" className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20">
                  <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
