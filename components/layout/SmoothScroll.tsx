"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Lenis smooth scrolling + smooth in-page anchor navigation. Off for reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: { offset: -56 } });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}

export function lockScroll(lock: boolean) {
  const l = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (l) {
    if (lock) l.stop();
    else l.start();
  }
  document.documentElement.style.overflow = lock ? "hidden" : "";
}
