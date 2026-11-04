import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { ParallaxPhoto } from "@/components/ui/ParallaxPhoto";

const principles = [
  {
    kanji: "淹",
    title: "Slow coffee",
    text: "Every cup poured by hand, at the speed it deserves. No rush, no shortcuts.",
  },
  {
    kanji: "静",
    title: "Quiet pages",
    text: "Soft light, low music and a library wall. Read a volume or simply sit.",
  },
  {
    kanji: "縁",
    title: "Shared stories",
    text: "The films and series that raised us, enjoyed together on Friday nights.",
  },
];

export function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="relative overflow-hidden py-28 md:py-44">
      <div className="wrap">
        <div className="grid gap-y-14 md:grid-cols-12 md:gap-x-8">
          <Reveal className="md:col-span-3">
            <SectionLabel index="一" label="Our Story" jp="物語" />
          </Reveal>

          <h2 id="story-title" className="display text-[clamp(2.4rem,5.6vw,5.75rem)] md:col-span-9">
            <RevealLines
              stagger={0.08}
              lines={[
                <>
                  We called it <span className="display-italic text-terracotta">Shiori</span> —
                </>,
                "the ribbon you leave",
                "between pages, so you",
                "can come back to where",
                "you left off.",
              ]}
            />
          </h2>
        </div>

        {/* Images + body: asymmetric */}
        <div className="mt-20 grid gap-y-16 md:mt-32 md:grid-cols-12 md:gap-x-8">
          <ParallaxPhoto
            id="storyPour"
            sizes="(min-width: 768px) 42vw, 100vw"
            className="aspect-[4/5] md:col-span-5"
            caption={
              <>
                <span className="font-jp">手淹れ</span>
                <span aria-hidden className="h-px w-6 bg-current opacity-40" />
                Nel drip, poured by hand
              </>
            }
          />

          <div className="flex flex-col justify-between gap-16 md:col-span-6 md:col-start-7">
            <Reveal className="max-w-md space-y-6 text-[1.0625rem] leading-[1.75] text-charcoal/85 md:pt-24">
              <p>
                <span className="display float-left mr-3 mt-1 text-[4.2rem] leading-[0.8] text-espresso">S</span>
                hiori began in a tiny Tokyo kissaten — a dim room of walnut and old jazz, where a stranger&apos;s
                manga sat open beside a perfect cup of coffee. Nobody hurried. Nobody looked at their phone.
              </p>
              <p>
                We wanted that feeling at home in Nagpur: a little piece of Japan, and a little escape from the
                ordinary. A place where the anime that shaped us is treated with the same care as the coffee.
              </p>
              <p className="font-jp text-sm tracking-[0.2em] text-muted">一期一会 — one time, one meeting.</p>
            </Reveal>

            <div className="grid grid-cols-12 gap-4">
              <ParallaxPhoto
                id="storyShelf"
                strength={14}
                sizes="(min-width: 768px) 25vw, 60vw"
                className="col-span-7 aspect-[3/4]"
              />
              <ParallaxPhoto
                id="storyMatcha"
                strength={6}
                sizes="(min-width: 768px) 18vw, 40vw"
                className="col-span-5 mt-24 aspect-square self-start"
              />
            </div>
          </div>
        </div>

        {/* Principles */}
        <ol className="mt-24 grid border-t border-espresso/15 md:mt-36 md:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={i * 0.12}
              className="group relative flex gap-6 border-b border-espresso/15 py-10 md:border-b-0 md:border-r md:px-8 md:py-14 md:first:pl-0 md:last:border-r-0"
            >
              <span className="font-jp text-5xl leading-none text-espresso/80 transition-colors duration-500 group-hover:text-terracotta">
                {p.kanji}
              </span>
              <div>
                <h3 className="display text-2xl md:text-[1.75rem]">{p.title}</h3>
                <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
