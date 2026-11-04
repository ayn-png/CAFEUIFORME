import type { ImageKey } from "./images";

/**
 * Order and layout of the gallery. `span` controls the editorial grid cell.
 * The order is composed so the 12-column grid packs without holes:
 *   [hero ×2 rows | tall]  [sq | tall | sq / sq | · | sq]  [wide | sq]  [tall | wide / · | sq | sq]
 */
export type GalleryItem = { image: ImageKey; span: "tall" | "wide" | "square" | "hero" };

export const gallery: GalleryItem[] = [
  { image: "gInterior", span: "hero" },
  { image: "gBar", span: "tall" },
  { image: "gDessert", span: "square" },
  { image: "gDecor", span: "tall" },
  { image: "storyShelf", span: "square" },
  { image: "gCeramics", span: "square" },
  { image: "gPlant", span: "square" },
  { image: "gCorner", span: "wide" },
  { image: "gStreet", span: "square" },
  { image: "storyMatcha", span: "tall" },
  { image: "gEvent", span: "wide" },
  { image: "gSeating", span: "square" },
  { image: "menuPourover", span: "square" },
];
