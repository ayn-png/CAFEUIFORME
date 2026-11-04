/**
 * Menu — edit names, descriptions and prices here.
 * Prices are in Indian Rupees (₹), inclusive of taxes unless noted on site.
 * `image` refers to a key in data/images.ts.
 */
import type { ImageKey } from "./images";

export type Diet = "veg" | "egg" | "nonveg";

export type MenuTag = "signature" | "bestseller" | "new" | "seasonal";

export type MenuItem = {
  id: string;
  name: string;
  jp?: string;
  description: string;
  price: number;
  /** veg = green mark, egg = contains egg, nonveg = meat */
  diet: Diet;
  tags?: MenuTag[];
  image?: ImageKey;
  /** Short note shown beside the price, e.g. "hot / iced" */
  note?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  jp: string;
  kanji: string;
  blurb: string;
  cover: ImageKey;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "coffee",
    name: "Specialty Coffee",
    jp: "珈琲",
    kanji: "珈",
    blurb:
      "Single-origin beans from Chikmagalur and Araku, roasted light and brewed slowly — one cup at a time.",
    cover: "menuCoffee",
    items: [
      {
        id: "kissa-pourover",
        name: "Kissa Pour-Over",
        jp: "ハンドドリップ",
        description:
          "Hand-poured through a cloth filter, kissaten-style. Ask for today's single origin.",
        price: 320,
        diet: "veg",
        tags: ["signature"],
        image: "menuPourover",
      },
      {
        id: "espresso",
        name: "Espresso",
        description: "A double ristretto of our house Araku blend. Cocoa, jaggery, stone fruit.",
        price: 180,
        diet: "veg",
      },
      {
        id: "flat-white",
        name: "Flat White",
        description: "Velvet-textured milk over a short double shot.",
        price: 240,
        diet: "veg",
        tags: ["bestseller"],
        image: "menuLatte",
      },
      {
        id: "kyoto-cold-drip",
        name: "Kyoto Cold Drip",
        jp: "水出し",
        description:
          "Drip-by-drip over twelve hours through a glass tower. Served over a single hand-cut ice block.",
        price: 340,
        diet: "veg",
        tags: ["signature"],
        image: "menuColdBrew",
      },
      {
        id: "cortado",
        name: "Cortado",
        description: "Equal parts espresso and warm milk. Small, honest, strong.",
        price: 210,
        diet: "veg",
      },
      {
        id: "black-sesame-latte",
        name: "Black Sesame Latte",
        jp: "黒胡麻",
        description: "Roasted kuro-goma paste, espresso and steamed milk. Nutty, smoky, quietly sweet.",
        price: 290,
        diet: "veg",
        note: "hot / iced",
      },
    ],
  },
  {
    id: "matcha",
    name: "Matcha & Japanese Tea",
    jp: "抹茶",
    kanji: "茶",
    blurb:
      "Ceremonial-grade matcha from Uji, whisked to order with a bamboo chasen. Plus roasted hojicha and genmaicha.",
    cover: "menuMatcha",
    items: [
      {
        id: "usucha",
        name: "Usucha",
        jp: "薄茶",
        description:
          "Thin ceremonial matcha, whisked at the table. Served with a small wagashi.",
        price: 360,
        diet: "veg",
        tags: ["signature"],
        image: "menuMatchaWhisk",
      },
      {
        id: "matcha-latte",
        name: "Matcha Latte",
        description: "Uji matcha over milk of your choice — oat, almond or whole.",
        price: 290,
        diet: "veg",
        tags: ["bestseller"],
        image: "menuMatcha",
        note: "hot / iced",
      },
      {
        id: "hojicha-latte",
        name: "Hojicha Latte",
        jp: "ほうじ茶",
        description: "Roasted green tea with caramel-and-toast warmth. Low caffeine, high comfort.",
        price: 270,
        diet: "veg",
      },
      {
        id: "genmaicha",
        name: "Genmaicha Pot",
        jp: "玄米茶",
        description: "Green tea with toasted brown rice, in a cast-iron pot for two.",
        price: 260,
        diet: "veg",
      },
      {
        id: "yuzu-sencha",
        name: "Iced Yuzu Sencha",
        description: "Cold-steeped sencha, yuzu and a little honey.",
        price: 250,
        diet: "veg",
        tags: ["new"],
      },
    ],
  },
  {
    id: "signature",
    name: "Signature Drinks",
    jp: "特製",
    kanji: "特",
    blurb:
      "Drinks written like short stories — each one inspired by a season, a scene or a late-night episode.",
    cover: "menuSignature",
    items: [
      {
        id: "last-train",
        name: "Last Train Home",
        jp: "終電",
        description:
          "Cold brew, dark cherry and tonic over smoked ice. For the walk after the credits roll.",
        price: 360,
        diet: "veg",
        tags: ["signature", "bestseller"],
        image: "menuSignature",
      },
      {
        id: "sakura-cloud",
        name: "Sakura Cloud",
        jp: "桜",
        description: "Cherry-blossom milk, white chocolate and a salted sakura cold foam.",
        price: 330,
        diet: "veg",
        tags: ["seasonal"],
        image: "menuSakura",
      },
      {
        id: "summer-festival",
        name: "Summer Festival",
        jp: "夏祭り",
        description: "Sparkling matcha, calamansi and mint — like fireworks over a riverbank.",
        price: 320,
        diet: "veg",
      },
      {
        id: "rainy-day-hojicha",
        name: "Rainy Day",
        jp: "雨の日",
        description: "Hojicha, brown-butter milk and a slow drizzle of kokuto syrup.",
        price: 310,
        diet: "veg",
        tags: ["signature"],
      },
      {
        id: "ramune-soda",
        name: "Ramune Float",
        description: "Classic Japanese marble soda with a scoop of vanilla soft serve.",
        price: 280,
        diet: "veg",
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    jp: "甘味",
    kanji: "甘",
    blurb: "Baked every morning in our open kitchen. Gently sweet, the Japanese way.",
    cover: "menuCheesecake",
    items: [
      {
        id: "jiggly-cheesecake",
        name: "Soufflé Cheesecake",
        jp: "スフレ",
        description: "Japanese cotton cheesecake — barely there, wobbles on the plate.",
        price: 320,
        diet: "egg",
        tags: ["bestseller"],
        image: "menuCheesecake",
      },
      {
        id: "matcha-tiramisu",
        name: "Matcha Tiramisu",
        description: "Layers of mascarpone and matcha-soaked sponge, finished at the table.",
        price: 340,
        diet: "veg",
        tags: ["signature"],
        image: "menuTiramisu",
      },
      {
        id: "souffle-pancakes",
        name: "Soufflé Pancakes",
        description: "Three tall, trembling pancakes with whipped cream, berries and maple.",
        price: 390,
        diet: "egg",
        image: "menuPancakes",
        note: "allow 20 min",
      },
      {
        id: "purin",
        name: "Kissa Purin",
        jp: "プリン",
        description: "The old-school kissaten custard pudding with bitter caramel and a cherry.",
        price: 240,
        diet: "egg",
        tags: ["signature"],
      },
    ],
  },
  {
    id: "treats",
    name: "Japanese-Inspired Treats",
    jp: "和菓子",
    kanji: "和",
    blurb: "Small, beautiful things to have with tea — wagashi, mochi and stories.",
    cover: "menuMochi",
    items: [
      {
        id: "mochi-trio",
        name: "Daifuku Trio",
        jp: "大福",
        description: "Hand-rolled mochi with red bean, matcha cream and strawberry.",
        price: 280,
        diet: "veg",
        tags: ["bestseller"],
        image: "menuMochi",
      },
      {
        id: "dorayaki",
        name: "Dorayaki",
        jp: "どら焼き",
        description: "Honey pancakes sandwiching sweet azuki bean. A comic-book classic.",
        price: 190,
        diet: "egg",
      },
      {
        id: "taiyaki",
        name: "Taiyaki",
        jp: "たい焼き",
        description: "Fish-shaped waffle filled with custard or red bean, crisp from the iron.",
        price: 210,
        diet: "veg",
        tags: ["new"],
      },
      {
        id: "dango",
        name: "Mitarashi Dango",
        jp: "団子",
        description: "Grilled rice dumplings on a skewer, glazed in sweet soy.",
        price: 180,
        diet: "veg",
      },
    ],
  },
  {
    id: "snacks",
    name: "Snacks",
    jp: "軽食",
    kanji: "軽",
    blurb: "Something savoury for long afternoons and longer reading sessions.",
    cover: "menuSando",
    items: [
      {
        id: "tamago-sando",
        name: "Tamago Sando",
        jp: "卵サンド",
        description: "Fluffy milk bread, creamy Japanese egg salad, edges trimmed.",
        price: 290,
        diet: "egg",
        tags: ["bestseller"],
        image: "menuSando",
      },
      {
        id: "paneer-katsu-sando",
        name: "Paneer Katsu Sando",
        description: "Panko-crusted paneer, tonkatsu sauce and shredded cabbage on shokupan.",
        price: 320,
        diet: "veg",
        tags: ["signature"],
      },
      {
        id: "chicken-karaage",
        name: "Chicken Karaage",
        jp: "唐揚げ",
        description: "Ginger-soy marinated fried chicken with yuzu kewpie.",
        price: 340,
        diet: "nonveg",
      },
      {
        id: "onigiri",
        name: "Onigiri Set",
        jp: "おにぎり",
        description: "Two rice balls — spicy mushroom and ume-sesame — with pickles.",
        price: 260,
        diet: "veg",
        image: "menuOnigiri",
      },
      {
        id: "truffle-fries",
        name: "Furikake Fries",
        description: "Crisp fries, nori-sesame furikake and a black garlic mayo.",
        price: 220,
        diet: "veg",
      },
    ],
  },
];

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const tagLabel: Record<MenuTag, string> = {
  signature: "Signature",
  bestseller: "Bestseller",
  new: "New",
  seasonal: "Seasonal",
};
