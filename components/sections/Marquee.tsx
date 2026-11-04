const words = [
  ["Pour-over", "手淹れ"],
  ["Usucha", "薄茶"],
  ["Kissa purin", "プリン"],
  ["Hojicha", "ほうじ茶"],
  ["Dorayaki", "どら焼き"],
  ["Cold drip", "水出し"],
  ["Tamago sando", "卵サンド"],
  ["Daifuku", "大福"],
];

/** Slow typographic band between sections. Decorative — hidden from assistive tech. */
export function Marquee({ tone = "paper" }: { tone?: "paper" | "dark" }) {
  const row = (
    <div className="flex shrink-0 items-center">
      {words.map(([en, jp]) => (
        <span key={en} className="flex items-center gap-6 px-6 md:gap-10 md:px-10">
          <span className="display-italic text-[clamp(2rem,4.5vw,4rem)] leading-none">{en}</span>
          <span className="font-jp text-sm tracking-[0.3em] opacity-60">{jp}</span>
          <span className="ml-6 h-1.5 w-1.5 rotate-45 bg-terracotta md:ml-10" />
        </span>
      ))}
    </div>
  );
  return (
    <div
      aria-hidden
      className={
        "relative overflow-hidden border-y py-7 md:py-10 " +
        (tone === "dark" ? "border-ivory/10 bg-espresso text-ivory" : "border-espresso/10 bg-paper text-espresso")
      }
    >
      <div className="flex w-max animate-[marquee_60s_linear_infinite] motion-reduce:animate-none">
        {row}
        {row}
      </div>
    </div>
  );
}
