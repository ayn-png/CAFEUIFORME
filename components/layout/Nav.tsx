"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nav, site, links } from "@/data/site";
import { Wordmark } from "@/components/ui/Seal";
import { InstagramIcon } from "@/components/ui/Icons";
import { lockScroll } from "@/components/layout/SmoothScroll";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function Nav() {
  const pathname = usePathname();
  const overHero = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 600 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    lockScroll(open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || !overHero;
  const light = !solid && !open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,box-shadow] duration-700 ease-[var(--ease-out-soft)]",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          solid && !open ? "bg-ivory/92 text-espresso shadow-[0_1px_0_rgba(43,29,22,0.08)] backdrop-blur-md" : "",
          light ? "text-ivory" : "text-espresso",
        )}
      >
        <div
          className={cn(
            "wrap flex items-center justify-between transition-[height] duration-700 ease-[var(--ease-out-soft)]",
            solid ? "h-16" : "h-20 md:h-24",
          )}
        >
          <Link href="/" aria-label={`${site.name} — home`} className="relative z-10">
            <Wordmark compact={solid} />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group relative block py-2 text-[0.8125rem] tracking-[0.02em]">
                    <span className="link-underline">{item.label}</span>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 font-jp text-[0.625rem] tracking-[0.3em] opacity-0 transition-all duration-500 group-hover:translate-y-0.5 group-hover:opacity-60"
                    >
                      {item.jp}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <Link
              href="/#reserve"
              className={cn(
                "hidden sm:inline-flex items-center gap-2 border px-5 py-2.5 text-[0.75rem] font-medium tracking-[0.08em] uppercase transition-colors duration-500",
                light
                  ? "border-ivory/40 hover:bg-ivory hover:text-espresso"
                  : "border-espresso bg-espresso text-ivory hover:bg-ink",
              )}
            >
              Reserve
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative -mr-2 grid h-11 w-11 place-items-center lg:hidden"
            >
              <span className="relative block h-3 w-6">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-500",
                    open && "translate-y-1.5 rotate-[20deg]",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 right-0 h-px bg-current transition-all duration-500",
                    open ? "w-6 -translate-y-1.5 -rotate-[20deg]" : "w-4",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col bg-ivory pt-24 text-espresso lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease }}
          >
            <span aria-hidden className="vertical-jp pointer-events-none absolute right-5 top-28 text-6xl text-espresso/[0.06]">
              栞の間
            </span>
            <nav aria-label="Mobile" className="wrap flex-1">
              <ul className="border-t border-espresso/10">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    className="border-b border-espresso/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.7, ease }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4"
                    >
                      <span className="display text-[2.4rem] xs:text-5xl">{item.label}</span>
                      <span className="font-jp text-sm tracking-[0.3em] text-espresso/50">{item.jp}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="wrap flex items-center justify-between gap-4 pb-8 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link
                href="/#reserve"
                onClick={() => setOpen(false)}
                className="flex-1 bg-espresso px-6 py-4 text-center text-sm font-medium tracking-[0.08em] text-ivory uppercase"
              >
                Reserve a table
              </Link>
              <a
                href={links.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-[3.25rem] w-[3.25rem] place-items-center border border-espresso/20"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
