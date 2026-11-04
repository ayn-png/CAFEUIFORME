"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { experiences } from "@/data/experiences";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";

function Card({ e, i }: { e: (typeof experiences)[number]; i: number }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-roast">
        <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-out-soft)] group-hover:scale-[1.05]">
          <Photo id={e.image} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 90vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
        <span
          aria-hidden
          className="absolute left-5 top-5 font-mono text-[0.6875rem] tracking-widest text-ivory/80"
        >
          {String(i + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
        </span>
        <span
          aria-hidden
          className="absolute bottom-4 right-5 font-jp text-[5.5rem] leading-none text-ivory/85 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-2"
        >
          {e.kanji}
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="display text-[1.9rem] leading-tight">{e.title}</h3>
          <span className="font-jp text-xs tracking-[0.2em] text-ivory/50">{e.jp}</span>
        </div>
        <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ivory/70">{e.description}</p>
        <p className="eyebrow mt-auto pt-5 text-beige/80">{e.detail}</p>
      </div>
    </article>
  );
}

export function Experience() {
  const track = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [travel, setTravel] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (!row.current) return;
      setTravel(Math.max(0, row.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (row.current) ro.observe(row.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  // Horizontal travel: the row slides left by exactly (row width − viewport) while the section is pinned.
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" aria-labelledby="exp-title" className="relative bg-espresso text-ivory">
      <div className="wrap pb-16 pt-28 md:pt-40">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-8">
          <Reveal className="md:col-span-3">
            <SectionLabel index="三" label="Beyond Coffee" jp="体験" />
          </Reveal>
          <div className="md:col-span-9">
            <h2 id="exp-title" className="display text-[clamp(2.6rem,7vw,7rem)]">
              <RevealLines
                lines={[
                  "Stay for",
                  <>
                    the <span className="display-italic text-beige">next chapter.</span>
                  </>,
                ]}
              />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-lg text-[1.0625rem] leading-relaxed text-ivory/70">
                Anime isn&apos;t a theme here; it&apos;s the reason we gather. A reading room, small themed alcoves,
                screenings and community nights — designed with the same restraint as the coffee bar.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Desktop: pinned horizontal scroll */}
      <div
        ref={track}
        className={reduce ? "hidden" : "relative hidden lg:block"}
        style={{ height: `calc(100vh + ${travel}px)` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <motion.div ref={row} style={{ x }} className="flex w-max gap-8 pl-[var(--gutter)] pr-[var(--gutter)] will-change-transform">
            {experiences.map((e, i) => (
              <div key={e.id} className="w-[28vw] min-w-[22rem] max-w-[30rem] shrink-0">
                <Card e={e} i={i} />
              </div>
            ))}
          </motion.div>
          <div className="wrap mt-12 flex items-center gap-6">
            <span className="eyebrow text-ivory/50">Scroll</span>
            <div className="relative h-px flex-1 bg-ivory/15">
              <motion.div className="absolute inset-y-0 left-0 bg-beige" style={{ width: progress }} />
            </div>
            <span className="font-jp text-xs tracking-[0.3em] text-ivory/50">六つの体験</span>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: native swipe carousel */}
      <div className={reduce ? "pb-28" : "pb-28 lg:hidden"}>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] scroll-px-[var(--gutter)]">
          {experiences.map((e, i) => (
            <div key={e.id} className="w-[82vw] max-w-[24rem] shrink-0 snap-start">
              <Card e={e} i={i} />
            </div>
          ))}
          <div aria-hidden className="w-1 shrink-0" />
        </div>
        <p className="wrap eyebrow mt-8 text-ivory/40">Swipe →</p>
      </div>
    </section>
  );
}
