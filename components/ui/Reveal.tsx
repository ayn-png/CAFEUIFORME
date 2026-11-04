"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { ease } from "@/lib/motion";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number; as?: "div" | "li" | "span" };

/** Fades + lifts content into view once. */
export function Reveal({ children, delay = 0, y = 28, as = "div", ...rest }: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: reduce ? 0.3 : 1.1, ease, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Line-by-line mask reveal for display headlines. Pass lines as array. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  animateOnMount = false,
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  animateOnMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const trigger = animateOnMount
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <motion.span
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={lineClassName ?? "block"}
            variants={{
              hidden: reduce ? { opacity: 0 } : { y: "105%" },
              show: reduce ? { opacity: 1 } : { y: "0%" },
            }}
            transition={{ duration: reduce ? 0.3 : 1.2, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
