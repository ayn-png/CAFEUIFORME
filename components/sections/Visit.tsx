import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { site, links, fullAddress } from "@/data/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { HoursTable } from "@/components/ui/HoursTable";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";

const actions = [
  { label: "Get directions", sub: "Google Maps", href: links.directions, icon: MapPin },
  { label: "WhatsApp us", sub: "Usually replies in an hour", href: links.whatsapp("Hello Shiori!"), icon: WhatsAppIcon },
  { label: "Call the café", sub: site.phone, href: site.phoneHref, icon: Phone },
  { label: "Instagram", sub: `@${site.instagram}`, href: links.instagram, icon: InstagramIcon },
];

export function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="relative bg-paper py-28 md:py-40">
      <div className="wrap">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-8">
          <Reveal className="md:col-span-3">
            <SectionLabel index="七" label="Visit Us" jp="訪問" />
          </Reveal>
          <h2 id="visit-title" className="display text-[clamp(2.6rem,7vw,7rem)] md:col-span-9">
            <RevealLines
              lines={[
                "Find us in",
                <span key="b">
                  <span className="display-italic text-terracotta">Nandanvan</span>, Nagpur.
                </span>,
              ]}
            />
          </h2>
        </div>

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-8">
          {/* Map */}
          <Reveal className="relative lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden border border-espresso/15 bg-beige md:aspect-[16/11]">
              <iframe
                title="Map showing Shiori café in Nandanvan, Nagpur"
                src={links.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full [filter:grayscale(1)_sepia(0.35)_contrast(0.95)_brightness(1.02)]"
              />
              <div className="pointer-events-none absolute left-4 top-4 bg-ivory px-4 py-3 shadow-[0_1px_0_rgba(0,0,0,0.05)]">
                <p className="font-jp text-xs tracking-[0.3em] text-terracotta">栞 喫茶</p>
                <p className="mt-1 text-sm font-medium">Shiori · Nandanvan</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted">Map pin is approximate until the exact location is published.</p>
          </Reveal>

          {/* Details */}
          <div className="flex flex-col gap-12 lg:col-span-5 lg:pl-8">
            <Reveal>
              <p className="eyebrow text-muted">Address</p>
              <address className="mt-3 not-italic">
                <p className="display text-[1.9rem] leading-tight">{site.address.line1}</p>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-charcoal/80">
                  {site.address.line2}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.postalCode}
                </p>
              </address>
              <p className="sr-only">{fullAddress}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex items-baseline justify-between">
                <p className="eyebrow text-muted">Hours</p>
                <OpenStatus className="!text-[0.6rem] text-espresso" />
              </div>
              <HoursTable className="mt-3" />
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="grid grid-cols-1 border-t border-espresso/15 xs:grid-cols-2">
                {actions.map((a) => {
                  const Icon = a.icon;
                  const external = a.href.startsWith("http");
                  return (
                    <li key={a.label} className="border-b border-espresso/15 xs:odd:border-r xs:odd:pr-4 xs:even:pl-4">
                      <a
                        href={a.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                        className="group flex items-start justify-between gap-3 py-5"
                      >
                        <span className="flex gap-3">
                          <Icon className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
                          <span>
                            <span className="block text-[0.9375rem] font-medium">{a.label}</span>
                            <span className="mt-0.5 block text-xs text-muted">{a.sub}</span>
                          </span>
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 text-muted transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-terracotta"
                          strokeWidth={1.5}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
