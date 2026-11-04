"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Photo } from "@/components/ui/Photo";
import { RevealLines } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { ease } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      aria-label="Welcome to Shiori"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-espresso text-ivory"
    >
      {/* Photograph */}
      <motion.div className="absolute inset-0 -z-10" style={{ y }}>
        <div className="absolute inset-0 animate-[slow-zoom_14s_var(--ease-out-soft)_both]">
          <Photo id="hero" priority sizes="100vw" className="hidden sm:block" />
          <Photo id="heroMobile" priority sizes="100vw" className="sm:hidden" />
        </div>
        {/* Vignette for legibility — weighted to the bottom-left where type sits */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,22,20,0.55)_0%,rgba(26,22,20,0)_28%,rgba(26,22,20,0)_45%,rgba(26,22,20,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_90%,rgba(26,22,20,0.55),transparent_60%)]" />
      </motion.div>

      {/* Vertical definition — desktop margin note */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1.4 }}
        className="absolute right-[var(--gutter)] top-32 hidden items-start gap-5 md:flex"
      >
        <span className="vertical-jp text-[0.7rem] text-ivory/60">しおり ― 本の間に挟む印</span>
        <span className="vertical-jp text-5xl leading-none text-ivory/90 xl:text-6xl">栞</span>
      </motion.div>

      <motion.div style={{ opacity: fade }} className="wrap relative flex flex-1 flex-col pb-8 pt-28 md:pb-10 md:pt-36">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease }}
          className="eyebrow flex items-center gap-4 text-ivory/80"
        >
          <span className="font-jp text-sm tracking-[0.2em] text-ivory">喫茶 栞</span>
          <span aria-hidden className="h-px w-8 bg-ivory/40" />
          Nandanvan, Nagpur
        </motion.p>

        <div className="mt-auto grid items-end gap-10 md:grid-cols-12">
          <h1 className="display text-[clamp(3.4rem,11.5vw,11.5rem)] md:col-span-9">
            <RevealLines
              animateOnMount
              delay={0.45}
              stagger={0.12}
              lines={[
                "A bookmark",
                <>
                  in the <span className="display-italic text-beige">middle</span>
                </>,
                "of your day.",
              ]}
            />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 1.1, ease }}
            className="max-w-sm md:col-span-3 md:pb-4"
          >
            <p className="text-[0.95rem] leading-relaxed text-ivory/80">
              Slow coffee, ceremonial matcha and a library of 1,200 manga. A quiet Japanese kissaten for the
              pages of your day you want to keep.
            </p>
            <div className="mt-7 flex flex-col gap-2 xs:flex-row md:flex-col">
              <Button href="#story" variant="light" className="xs:flex-1">
                Explore the Café
              </Button>
              <Button href="#menu" variant="outline-light" className="xs:flex-1">
                Discover Our Menu
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-10 flex items-center justify-between gap-6 border-t border-ivory/20 pt-5 text-ivory/75"
        >
          <OpenStatus />
          <a href="#story" className="group hidden items-center gap-3 eyebrow sm:flex" aria-label="Scroll to our story">
            Scroll
            <span className="relative block h-8 w-px overflow-hidden bg-ivory/25">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-ivory motion-safe:animate-[scrollcue_2.2s_var(--ease-out-soft)_infinite]" />
            </span>
          </a>
          <span className="hidden eyebrow md:block">21.13° N — 79.13° E</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
