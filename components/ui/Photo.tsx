import Image from "next/image";
import { images, type ImageKey, type Tone } from "@/data/images";
import { cn } from "@/lib/cn";

const toneBg: Record<Tone, string> = {
  espresso: "bg-[#3a281e] text-[#d9cbb4]",
  charcoal: "bg-[#34312e] text-[#cfc5b6]",
  beige: "bg-[#cdbb9f] text-[#3d2b21]",
  matcha: "bg-[#8a9670] text-[#e9dcc8]",
  terracotta: "bg-[#a9644a] text-[#e9dcc8]",
  paper: "bg-[#d8c6aa] text-[#3d2b21]",
};

type Props = {
  id: ImageKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Override the registry's object-position */
  focus?: string;
  imgClassName?: string;
};

/**
 * Art-directed image. Fills its (relative) parent.
 * Falls back to a tonal plate with caption when no file is set in data/images.ts.
 */
export function Photo({ id, className, sizes = "100vw", priority, focus, imgClassName }: Props) {
  const entry = images[id];
  const src = (entry as { src?: string }).src;
  if (src) {
    return (
      <div className={cn("absolute inset-0 overflow-hidden", className)}>
        <Image
          src={src}
          alt={entry.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
          style={{ objectPosition: focus ?? (entry as { focus?: string }).focus ?? "center" }}
        />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={entry.alt}
      className={cn("absolute inset-0 overflow-hidden", toneBg[entry.tone], className)}
    >
      <div className={cn("absolute inset-0", imgClassName)}>
        <span
          aria-hidden
          className="absolute right-[6%] top-1/2 -translate-y-1/2 font-jp text-[min(38vw,22rem)] leading-none opacity-[0.09] select-none"
        >
          {entry.jp.slice(0, 1)}
        </span>
        <div aria-hidden className="absolute inset-[6%] border border-current opacity-15" />
        <div aria-hidden className="absolute bottom-[8%] left-[8%] flex items-end gap-3 opacity-70">
          <span className="vertical-jp text-xs">{entry.jp}</span>
          <span className="eyebrow !tracking-[0.18em] !text-[0.625rem]">{entry.caption}</span>
        </div>
      </div>
    </div>
  );
}
