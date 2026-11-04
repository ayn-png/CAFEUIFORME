"use client";

import { useEffect, useState } from "react";
import { openStatus } from "@/lib/hours";
import { cn } from "@/lib/cn";

export function OpenStatus({ className }: { className?: string }) {
  const [s, setS] = useState<{ open: boolean; label: string } | null>(null);
  useEffect(() => {
    const tick = () => setS(openStatus());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={cn("inline-flex items-center gap-2.5 eyebrow transition-opacity duration-700", s ? "opacity-100" : "opacity-0", className)}>
      <span className="relative flex h-1.5 w-1.5">
        {s?.open && <span className="absolute inset-0 animate-ping rounded-full bg-matcha opacity-60" />}
        <span className={cn("relative h-1.5 w-1.5 rounded-full", s?.open ? "bg-matcha" : "bg-terracotta")} />
      </span>
      {s?.label ?? " "}
    </span>
  );
}
