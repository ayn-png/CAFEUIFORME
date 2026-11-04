import type { Diet } from "@/data/menu";
import { cn } from "@/lib/cn";

const label: Record<Diet, string> = { veg: "Vegetarian", egg: "Contains egg", nonveg: "Non-vegetarian" };
const color: Record<Diet, string> = { veg: "#3f7d3a", egg: "#c28a1e", nonveg: "#8a3324" };

/** FSSAI-style square-dot mark, drawn small and quiet. */
export function DietMark({ diet, className }: { diet: Diet; className?: string }) {
  return (
    <span
      title={label[diet]}
      className={cn("inline-grid h-3 w-3 shrink-0 place-items-center border", className)}
      style={{ borderColor: color[diet] }}
    >
      {diet === "nonveg" ? (
        <span
          className="block h-0 w-0 border-x-[3px] border-b-[5px] border-x-transparent"
          style={{ borderBottomColor: color[diet] }}
        />
      ) : (
        <span className="block h-[5px] w-[5px] rounded-full" style={{ background: color[diet] }} />
      )}
      <span className="sr-only">{label[diet]}</span>
    </span>
  );
}
