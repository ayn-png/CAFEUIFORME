"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { events, type CafeEvent } from "@/data/events";
import { formatINR } from "@/data/menu";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { ease } from "@/lib/motion";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parts(iso: string) {
  const [d, t] = iso.split("T");
  const [y, m, day] = d.split("-").map(Number);
  const [hh, mm] = t.split(":").map(Number);
  const date = new Date(y, m - 1, day);
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return {
    day: String(day).padStart(2, "0"),
    month: months[m - 1],
    weekday: days[date.getDay()],
    time: `${h12}${mm ? ":" + String(mm).padStart(2, "0") : ""}${hh >= 12 ? "pm" : "am"}`,
    ymd: d,
  };
}

function dateLine(e: CafeEvent) {
  const s = parts(e.start);
  const en = parts(e.end);
  if (s.ymd === en.ymd) return `${s.weekday}, ${s.day} ${s.month} · ${s.time} – ${en.time}`;
  return `${s.day} ${s.month} – ${en.day} ${en.month} · from ${s.time}`;
}

/** Dispatches a custom event so the reservation form can pre-fill. */
function reserveFor(e: CafeEvent) {
  window.dispatchEvent(new CustomEvent("shiori:reserve", { detail: { event: e.title, date: e.start.slice(0, 10) } }));
}

export function Events() {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 28, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 28, mass: 0.6 });
  const current = events.find((e) => e.id === hovered);

  return (
    <section id="events" aria-labelledby="events-title" className="relative bg-paper py-28 md:py-40">
      <div className="wrap">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-8">
          <Reveal className="md:col-span-3">
            <SectionLabel index="四" label="Gatherings" jp="催し" />
          </Reveal>
          <div className="flex flex-col justify-between gap-8 md:col-span-9 lg:flex-row lg:items-end">
            <h2 id="events-title" className="display text-[clamp(2.6rem,7vw,7rem)]">
              <RevealLines lines={["What’s on", <span key="b" className="display-italic text-terracotta">at Shiori.</span>]} />
            </h2>
            <Reveal delay={0.15} className="max-w-xs text-[0.9375rem] leading-relaxed text-muted lg:pb-4">
              Small, seated, unhurried. Most evenings have limited places — reserve early, bring a friend.
            </Reveal>
          </div>
        </div>

        <ul
          className="relative mt-16 border-t border-espresso/20 md:mt-24"
          onMouseMove={(ev) => {
            mx.set(ev.clientX);
            my.set(ev.clientY);
          }}
          onMouseLeave={() => setHovered(null)}
        >
          {events.map((e, i) => {
            const s = parts(e.start);
            return (
              <Reveal
                as="li"
                key={e.id}
                delay={i * 0.05}
                className="group relative border-b border-espresso/20"
              >
                <div
                  onMouseEnter={() => setHovered(e.id)}
                  className="grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-5 py-8 md:grid-cols-12 md:items-center md:gap-x-8 md:py-10"
                >
                  {/* Date */}
                  <div className="flex items-baseline gap-2 md:col-span-2">
                    <span className="display text-[3.4rem] leading-none tabular-nums transition-colors duration-500 group-hover:text-terracotta md:text-[4.5rem]">
                      {s.day}
                    </span>
                    <span className="flex flex-col">
                      <span className="eyebrow">{s.month}</span>
                      <span className="text-xs text-muted">{s.weekday}</span>
                    </span>
                  </div>

                  {/* Title + description */}
                  <div className="md:col-span-6">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="display text-[1.75rem] leading-tight transition-transform duration-700 ease-[var(--ease-out-soft)] md:text-[2.4rem] md:group-hover:translate-x-2">
                        {e.title}
                      </h3>
                      <span className="font-jp text-xs tracking-[0.2em] text-muted">{e.jp}</span>
                    </div>
                    <p className="mt-2 text-sm text-espresso/70">{dateLine(e)}</p>
                    <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-charcoal/75">{e.description}</p>
                  </div>

                  {/* Mobile cover */}
                  <div className="relative col-span-2 aspect-[16/9] overflow-hidden md:hidden">
                    <Photo id={e.cover} sizes="100vw" />
                  </div>

                  {/* Meta + CTA */}
                  <div className="col-span-2 flex items-center justify-between gap-6 md:col-span-4 md:justify-end">
                    <div className="text-left md:text-right">
                      <p className="eyebrow text-muted">{e.kind}</p>
                      <p className="mt-1 text-sm">
                        {e.price ? `${formatINR(e.price)} per guest` : "Free entry"}
                        {e.seats ? <span className="text-muted"> · {e.seats} places</span> : null}
                      </p>
                    </div>
                    <a
                      href="#reserve"
                      onClick={() => reserveFor(e)}
                      aria-label={`Reserve a spot for ${e.title}`}
                      className="group/btn relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border border-espresso/30 transition-colors duration-500 hover:border-espresso hover:bg-espresso hover:text-ivory"
                    >
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover/btn:rotate-45" strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>

        {/* Cursor-following cover (desktop pointer only) */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-30 hidden [@media(hover:hover)_and_(min-width:768px)]:block"
            style={{ x: sx, y: sy }}
          >
            <AnimatePresence>
              {current && (
                <motion.div
                  key="cover"
                  className="relative -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                  style={{ width: 300, height: 380 }}
                  initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={current.id}
                      className="absolute inset-0"
                      initial={{ clipPath: "inset(100% 0 0 0)" }}
                      animate={{ clipPath: "inset(0% 0 0 0)" }}
                      transition={{ duration: 0.6, ease }}
                    >
                      <Photo id={current.cover} sizes="300px" />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        <p className="mt-10 text-sm text-muted">
          Dates are indicative and may change — follow us on Instagram for the latest calendar.
        </p>
      </div>
    </section>
  );
}
