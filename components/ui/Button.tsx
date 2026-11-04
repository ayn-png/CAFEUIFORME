import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "ghost" | "light" | "outline-light";

const styles: Record<Variant, string> = {
  solid: "bg-espresso text-ivory hover:bg-ink",
  outline: "border border-espresso/30 text-espresso hover:border-espresso",
  ghost: "text-espresso",
  light: "bg-ivory text-espresso hover:bg-paper",
  "outline-light": "border border-ivory/40 text-ivory hover:border-ivory",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  icon?: boolean;
  external?: boolean;
  onClick?: () => void;
};

/** Pill-free, quietly confident button: text slides up and is replaced on hover. */
export function Button({ href, children, variant = "solid", className, icon = true, external, onClick }: Props) {
  const content = (
    <>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      {icon && (
        <ArrowUpRight
          aria-hidden
          strokeWidth={1.5}
          className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );
  const cls = cn(
    "group inline-flex items-center justify-between gap-4 px-6 py-4 text-[0.8125rem] font-medium tracking-[0.04em] transition-colors duration-300",
    styles[variant],
    className,
  );
  if (external || /^(https?:|tel:|mailto:)/.test(href)) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onClick}>
      {content}
    </Link>
  );
}
