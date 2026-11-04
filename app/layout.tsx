import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight, Shippori_Mincho } from "next/font/google";
import "./globals.css";
import { site, links } from "@/data/site";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const shippori = Shippori_Mincho({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-shippori",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} ${site.nameJp} — ${site.descriptor}, Nagpur`,
    template: `%s · ${site.name} ${site.nameJp}`,
  },
  description: site.description,
  keywords: [
    "anime cafe Nagpur",
    "Japanese cafe Nagpur",
    "matcha Nagpur",
    "specialty coffee Nagpur",
    "manga cafe",
    "kissaten",
    "Nandanvan cafe",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: `${site.name} ${site.nameJp}`,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.tagline}`, description: site.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f4efe6",
  width: "device-width",
  initialScale: 1,
};

const dayCode = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: `${site.name} ${site.nameJp}`,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  servesCuisine: ["Coffee", "Japanese", "Desserts"],
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  openingHours: site.hours.flatMap((h, i) => (h.open ? [`${dayCode[i]} ${h.open}-${h.close}`] : [])),
  sameAs: [links.instagram],
  hasMap: links.directions,
  acceptsReservations: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${inter.variable} ${shippori.variable}`}>
      <body className="grain">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-espresso focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
