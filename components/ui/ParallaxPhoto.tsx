"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Photo } from "./Photo";
import type { ImageKey } from "@/data/images";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

/** Image in a frame that drifts slightly against scroll and unveils with a clip-path wipe. */
export function ParallaxPhoto({
  id,
  className,
  sizes,
  strength = 10,
  caption,
}: {
  id: ImageKey;
  className?: string;
  sizes?: string;
  strength?: number;
  caption?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : [`-${strength}%`, `${strength}%`]);
  return (
    <figure className={cn("relative", className)}>
      <motion.div
        ref={ref}
        className="relative h-full w-full overflow-hidden"
        initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)" }}
        whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)" }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.4, ease }}
      >
        <motion.div className="absolute -inset-y-[12%] inset-x-0" style={{ y }}>
          <Photo id={id} sizes={sizes} />
        </motion.div>
      </motion.div>
      {caption && <figcaption className="mt-3 flex items-center gap-3 text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}
