import Link from "next/link";
import { nav, site, links, fullAddress, formatTime } from "@/data/site";
import { Seal } from "@/components/ui/Seal";
import { InstagramIcon } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();
  const weekday = site.hours[2];
  const weekend = site.hours[6];
  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      {/* Closing statement */}
      <div className="wrap border-b border-ivory/10 pb-16 pt-28 md:pb-24 md:pt-40">
        <div className="flex items-start justify-between gap-8">
          <p className="display text-[clamp(3rem,10vw,10rem)]">
            Leave a bookmark.
            <br />
            <span className="display-italic text-beige">Come back soon.</span>
          </p>
          <span aria-hidden className="vertical-jp hidden pt-4 text-sm text-ivory/40 md:block">
            また来てね
          </span>
        </div>
        <div className="mt-14 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/#reserve"
            className="inline-flex items-center justify-center bg-ivory px-8 py-4 text-sm font-medium tracking-[0.06em] text-espresso transition-colors hover:bg-beige"
          >
            Reserve a table
          </Link>
          <a
            href={links.directions}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center border border-ivory/30 px-8 py-4 text-sm font-medium tracking-[0.06em] transition-colors hover:border-ivory"
          >
            Get directions
          </a>
        </div>
      </div>

      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <div className="flex items-center gap-4">
            <Seal className="h-12 w-12 text-terracotta" />
            <div>
              <p className="display text-3xl leading-none">Shiori</p>
              <p className="eyebrow mt-1.5 text-ivory/50">Kissaten & manga library</p>
            </div>
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/60">
            Specialty coffee, Uji matcha and a quiet room full of stories — a little piece of Japan in Nandanvan,
            Nagpur.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <p className="eyebrow text-ivory/40">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="link-underline text-ivory/80 hover:text-ivory">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/menu" className="link-underline text-ivory/80 hover:text-ivory">
                Full menu
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="eyebrow text-ivory/40">Visit</p>
          <address className="mt-4 text-sm not-italic leading-relaxed text-ivory/80">{fullAddress}</address>
          <p className="mt-5 text-sm leading-relaxed text-ivory/80">
            Tue–Fri {formatTime(weekday.open!)} – {formatTime(weekday.close!)}
            <br />
            Sat–Sun {formatTime(weekend.open!)} – late
            <br />
            <span className="text-ivory/50">Closed Mondays</span>
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-ivory/40">Say hello</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={site.phoneHref} className="link-underline text-ivory/80 hover:text-ivory">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link-underline text-ivory/80 hover:text-ivory">
                {site.email}
              </a>
            </li>
            <li>
              <a href={links.whatsapp("Hello Shiori!")} target="_blank" rel="noreferrer" className="link-underline text-ivory/80 hover:text-ivory">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={links.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-ivory/80 hover:text-ivory">
                <InstagramIcon /> <span className="link-underline">@{site.instagram}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Giant wordmark */}
      <div aria-hidden className="pointer-events-none relative select-none overflow-hidden">
        <p className="display translate-y-[18%] text-center text-[27vw] leading-[0.8] text-ivory/[0.045]">Shiori</p>
      </div>

      <div className="wrap flex flex-col justify-between gap-3 border-t border-ivory/10 py-6 text-xs text-ivory/40 sm:flex-row">
        <p>© {year} Shiori Kissaten. All rights reserved.</p>
        <p className="font-jp tracking-[0.2em]">一杯の珈琲、一冊の物語。</p>
        <p>Made slowly in Nagpur.</p>
      </div>
    </footer>
  );
}
