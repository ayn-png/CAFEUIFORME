"use client";

import { useEffect, useState } from "react";
import { site, formatTime } from "@/data/site";
import { nowInIndia } from "@/lib/hours";
import { cn } from "@/lib/cn";

/** Week starting Monday; today is highlighted after hydration. */
export function HoursTable({ className, dark = false }: { className?: string; dark?: boolean }) {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(nowInIndia().getDay()), []);
  const order = [1, 2, 3, 4, 5, 6, 0];
  return (
    <table className={cn("w-full text-sm", className)}>
      <caption className="sr-only">Opening hours</caption>
      <tbody>
        {order.map((d) => {
          const h = site.hours[d];
          const isToday = d === today;
          return (
            <tr
              key={h.day}
              className={cn(
                "border-b",
                dark ? "border-ivory/10" : "border-espresso/10",
                isToday && (dark ? "text-ivory" : "text-espresso"),
                !isToday && (dark ? "text-ivory/60" : "text-charcoal/70"),
              )}
            >
              <th scope="row" className="py-2.5 text-left font-normal">
                <span className="flex items-center gap-2">
                  {h.day}
                  {isToday && <span className="eyebrow !text-[0.55rem] text-terracotta">Today</span>}
                </span>
              </th>
              <td className="py-2.5 text-right tabular-nums">
                {h.open && h.close ? `${formatTime(h.open)} – ${formatTime(h.close)}` : <span className="italic">Closed — resting</span>}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
