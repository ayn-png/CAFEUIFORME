import { cn } from "@/lib/cn";

/** e.g.  一 ── Our Story  ·  物語 */
export function SectionLabel({
  index,
  label,
  jp,
  className,
}: {
  index: string;
  label: string;
  jp?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="font-jp text-lg leading-none text-terracotta">{index}</span>
      <span aria-hidden className="h-px w-10 bg-current opacity-30" />
      <span className="eyebrow">{label}</span>
      {jp && <span className="font-jp text-xs tracking-[0.3em] opacity-50">{jp}</span>}
    </div>
  );
}
