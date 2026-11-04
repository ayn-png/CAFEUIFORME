import { cn } from "@/lib/cn";

/** Hanko-style seal with 栞. Hand-drawn feel via slightly irregular rounded square. */
export function Seal({ className, label = "栞" }: { className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("h-10 w-10", className)} aria-hidden>
      <path
        d="M9 7.5c9-1.6 36.6-1.9 46.4-.2 1.8.3 2.3 1.4 2.4 3 .7 11.3.8 32.4-.3 43.3-.2 1.7-1 2.6-2.8 2.8-11 1-35.9 1.1-45.6.1-1.6-.2-2.6-1-2.7-2.6C5.6 43.3 5.5 21.6 6.6 10.5 6.8 8.8 7.6 7.8 9 7.5Z"
        fill="currentColor"
      />
      <text
        x="32"
        y="44"
        textAnchor="middle"
        fontSize="34"
        fill="var(--color-ivory)"
        style={{ fontFamily: "var(--font-jp)", fontWeight: 700 }}
      >
        {label}
      </text>
    </svg>
  );
}

/** Wordmark: seal + SHIORI set in the serif. */
export function Wordmark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Seal className={cn("text-terracotta transition-all duration-500", compact ? "h-8 w-8" : "h-9 w-9")} />
      <span className="flex flex-col leading-none">
        <span className="display !leading-none text-[1.65rem] tracking-[-0.02em]">Shiori</span>
        <span className="eyebrow mt-1 !text-[0.55rem] !tracking-[0.3em] opacity-70">Kissaten · Nagpur</span>
      </span>
    </span>
  );
}
