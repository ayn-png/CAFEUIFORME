/**
 * Single source of truth for business details.
 * Everything marked PLACEHOLDER should be replaced before launch.
 */

export const site = {
  name: "Shiori",
  nameJp: "栞",
  descriptor: "Kissaten & Manga Library",
  tagline: "A bookmark in the middle of your day.",
  description:
    "Shiori is a Japanese kissaten and manga library in Nandanvan, Nagpur — slow-brewed specialty coffee, ceremonial matcha, quiet corners and anime evenings.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shiori.cafe",

  address: {
    // PLACEHOLDER — replace with the real street address
    line1: "Plot 14, Ground Floor, Shanti Vihar",
    line2: "Near KDK College Road, Nandanvan",
    city: "Nagpur",
    state: "Maharashtra",
    postalCode: "440009",
    country: "IN",
  },

  // Approximate centre of Nandanvan — replace with the café's exact pin
  geo: { lat: 21.1363, lng: 79.1311 },

  // PLACEHOLDERS
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsapp: "919876543210", // digits only, with country code
  email: "hello@shiori.cafe",
  instagram: "shiori.nagpur",

  /** 0 = Sunday … 6 = Saturday. Times are 24h "HH:MM". null = closed. */
  hours: [
    { day: "Sunday", open: "09:00", close: "23:00" },
    { day: "Monday", open: null, close: null },
    { day: "Tuesday", open: "08:00", close: "22:30" },
    { day: "Wednesday", open: "08:00", close: "22:30" },
    { day: "Thursday", open: "08:00", close: "22:30" },
    { day: "Friday", open: "08:00", close: "23:30" },
    { day: "Saturday", open: "09:00", close: "23:30" },
  ] as { day: string; open: string | null; close: string | null }[],
} as const;

export const nav = [
  { label: "Our Story", href: "/#story", jp: "物語" },
  { label: "Menu", href: "/#menu", jp: "品書" },
  { label: "Experience", href: "/#experience", jp: "体験" },
  { label: "Events", href: "/#events", jp: "催し" },
  { label: "Gallery", href: "/#gallery", jp: "写真" },
  { label: "Visit", href: "/#visit", jp: "訪問" },
];

export const links = {
  instagram: `https://instagram.com/${site.instagram}`,
  whatsapp: (text?: string) =>
    `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat},${site.geo.lng}`,
  mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(
    "Nandanvan, Nagpur, Maharashtra",
  )}&z=15&output=embed`,
};

export const fullAddress = `${site.address.line1}, ${site.address.line2}, ${site.address.city}, ${site.address.state} ${site.address.postalCode}`;

export function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hh}${suffix}` : `${hh}:${String(m).padStart(2, "0")}${suffix}`;
}
