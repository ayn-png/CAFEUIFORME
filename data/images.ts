/**
 * Image registry — every photograph on the site is referenced by key.
 *
 * To add / replace a photo:
 *   1. Drop the file in /public/images/ (JPG or WebP, ~2400px on the long edge for full-bleed shots)
 *   2. Set `src` below, e.g. src: "/images/hero.jpg"
 *   3. Add the photographer to `credit` if the licence asks for it
 *
 * When `src` is empty, <Photo> renders a quiet tonal plate with the shot's caption,
 * so the layout still reads correctly while photography is being finalised.
 */

export type Tone = "espresso" | "charcoal" | "beige" | "matcha" | "terracotta" | "paper";

export type ImageEntry = {
  src?: string;
  alt: string;
  /** Short caption used on the placeholder plate and in the gallery */
  caption: string;
  jp: string;
  tone: Tone;
  credit?: string;
  /** CSS object-position for art-directed crops */
  focus?: string;
};

const img = <T extends Record<string, ImageEntry>>(t: T) => t;

export const images = img({
  /* ── Hero & story ─────────────────────────────── */
  hero: {
    alt: "Warm evening light falling across a quiet wooden café counter",
    caption: "The counter at dusk",
    jp: "夕暮れ",
    tone: "espresso",
  },
  heroMobile: {
    alt: "A barista pouring coffee by hand in warm low light",
    caption: "The first pour",
    jp: "一杯",
    tone: "espresso",
  },
  storyPour: {
    alt: "Hands slowly pouring water over a cloth coffee filter",
    caption: "Nel drip, by hand",
    jp: "手淹れ",
    tone: "charcoal",
  },
  storyShelf: {
    alt: "Rows of well-thumbed manga volumes on a wooden shelf",
    caption: "The library wall",
    jp: "本棚",
    tone: "beige",
  },
  storyMatcha: {
    alt: "A bamboo whisk resting beside a bowl of frothy matcha",
    caption: "Chasen & chawan",
    jp: "茶筅",
    tone: "matcha",
  },

  /* ── Menu ─────────────────────────────────────── */
  menuCoffee: { alt: "A cup of black coffee on a dark wooden table", caption: "House pour-over", jp: "珈琲", tone: "espresso" },
  menuPourover: { alt: "Coffee dripping through a pour-over dripper into a glass server", caption: "Kissa pour-over", jp: "ドリップ", tone: "charcoal" },
  menuLatte: { alt: "A flat white with latte art in a ceramic cup", caption: "Flat white", jp: "ラテ", tone: "beige" },
  menuColdBrew: { alt: "Iced coffee in a tall glass with a single clear ice block", caption: "Kyoto cold drip", jp: "水出し", tone: "charcoal" },
  menuMatcha: { alt: "An iced matcha latte with layers of green and white", caption: "Matcha latte", jp: "抹茶", tone: "matcha" },
  menuMatchaWhisk: { alt: "Ceremonial matcha being whisked in a ceramic bowl", caption: "Usucha", jp: "薄茶", tone: "matcha" },
  menuSignature: { alt: "A dark layered coffee tonic in a glass at night", caption: "Last Train Home", jp: "終電", tone: "espresso" },
  menuSakura: { alt: "A pale pink drink topped with cold foam and petals", caption: "Sakura Cloud", jp: "桜", tone: "terracotta" },
  menuCheesecake: { alt: "A tall, soft Japanese soufflé cheesecake on a plate", caption: "Soufflé cheesecake", jp: "スフレ", tone: "beige" },
  menuTiramisu: { alt: "A square of matcha tiramisu dusted with green powder", caption: "Matcha tiramisu", jp: "ティラミス", tone: "matcha" },
  menuPancakes: { alt: "A stack of fluffy soufflé pancakes with berries", caption: "Soufflé pancakes", jp: "パンケーキ", tone: "paper" },
  menuMochi: { alt: "Three soft daifuku mochi on a ceramic plate", caption: "Daifuku trio", jp: "大福", tone: "paper" },
  menuSando: { alt: "A neatly cut egg sandwich on soft milk bread", caption: "Tamago sando", jp: "サンド", tone: "beige" },
  menuOnigiri: { alt: "Two rice balls wrapped in nori with pickles", caption: "Onigiri set", jp: "おにぎり", tone: "charcoal" },

  /* ── Experience ───────────────────────────────── */
  expLibrary: { alt: "A reading nook with floor cushions and shelves of books", caption: "The manga library", jp: "図書", tone: "beige" },
  expSeating: { alt: "Low tables and tatami-style seating under paper lanterns", caption: "Alcove seating", jp: "座敷", tone: "terracotta" },
  expScreening: { alt: "A darkened room lit by the glow of a projector screen", caption: "Screening room", jp: "上映", tone: "charcoal" },
  expCosplay: { alt: "Paper lanterns glowing above a narrow lane at night", caption: "Cosplay Sundays", jp: "仮装", tone: "terracotta" },
  expShelf: { alt: "A curated shelf of Japanese stationery and small collectibles", caption: "The little shop", jp: "雑貨", tone: "paper" },
  expDrinks: { alt: "A row of colourful seasonal drinks on a counter", caption: "Episode drinks", jp: "特製", tone: "matcha" },

  /* ── Events ───────────────────────────────────── */
  evMovie: { alt: "Silhouettes of people watching a film projected on a wall", caption: "Movie night", jp: "映画", tone: "charcoal" },
  evMatcha: { alt: "A bowl of matcha beside an open book", caption: "Manga & matcha", jp: "抹茶", tone: "matcha" },
  evCulture: { alt: "Hands practising calligraphy with an ink brush", caption: "Culture weekend", jp: "文化", tone: "paper" },
  evMeetup: { alt: "Friends laughing together around a café table", caption: "Community meetup", jp: "集い", tone: "terracotta" },
  evSeasonal: { alt: "Cherry blossom branches against a pale sky", caption: "Sakura season", jp: "季節", tone: "terracotta" },

  /* ── Gallery ──────────────────────────────────── */
  gInterior: { alt: "Café interior with timber slats and soft pendant light", caption: "Timber & light", jp: "空間", tone: "espresso" },
  gBar: { alt: "Barista at the espresso machine, steam rising", caption: "Morning bar", jp: "朝", tone: "charcoal" },
  gDessert: { alt: "A plated Japanese dessert with careful garnish", caption: "Kissa purin", jp: "甘味", tone: "beige" },
  gDecor: { alt: "A noren curtain hanging in a doorway", caption: "Noren at the door", jp: "暖簾", tone: "terracotta" },
  gCorner: { alt: "A person reading quietly by a window", caption: "Window seat", jp: "窓辺", tone: "paper" },
  gSeating: { alt: "A row of wooden stools along a long counter", caption: "The long counter", jp: "席", tone: "espresso" },
  gEvent: { alt: "A small crowd gathered under warm string lights", caption: "Friday screening", jp: "夜", tone: "charcoal" },
  gCeramics: { alt: "Handmade ceramic cups stacked on a shelf", caption: "Our cups", jp: "器", tone: "beige" },
  gPlant: { alt: "Morning light through a window on a small plant", caption: "Komorebi", jp: "木漏れ日", tone: "matcha" },
  gStreet: { alt: "A quiet lane at blue hour with warm windows", caption: "Blue hour", jp: "黄昏", tone: "charcoal" },

  /* ── Reservation ──────────────────────────────── */
  reserve: { alt: "A table set for two by a window in soft evening light", caption: "Your table", jp: "予約", tone: "espresso" },
});

export type ImageKey = keyof typeof images;
