import type { ImageKey } from "./images";

export type Experience = {
  id: string;
  title: string;
  jp: string;
  kanji: string;
  description: string;
  detail: string;
  image: ImageKey;
};

export const experiences: Experience[] = [
  {
    id: "library",
    title: "The Manga Library",
    jp: "漫画図書室",
    kanji: "読",
    description:
      "Over 1,200 volumes — classics, cult favourites and this season's releases — free to read with any order.",
    detail: "English & Japanese editions",
    image: "expLibrary",
  },
  {
    id: "alcoves",
    title: "Themed Alcoves",
    jp: "座敷",
    kanji: "座",
    description:
      "Five small rooms, each styled after a feeling we love in anime: rainy stations, summer festivals, rooftop afternoons.",
    detail: "Bookable for 2–6 guests",
    image: "expSeating",
  },
  {
    id: "screenings",
    title: "Watch Parties",
    jp: "上映会",
    kanji: "映",
    description:
      "Licensed screenings and season-finale nights on a projector wall, with drinks written for the episode.",
    detail: "Every second Friday",
    image: "expScreening",
  },
  {
    id: "cosplay",
    title: "Cosplay Sundays",
    jp: "仮装の日",
    kanji: "装",
    description:
      "Come as your favourite character. A portrait corner with soft light, and a little something on the house.",
    detail: "Last Sunday of the month",
    image: "expCosplay",
  },
  {
    id: "shop",
    title: "The Little Shop",
    jp: "雑貨",
    kanji: "雑",
    description:
      "Japanese stationery, ceramics, art books and officially licensed collectibles — curated, never cluttered.",
    detail: "By the entrance",
    image: "expShelf",
  },
  {
    id: "drinks",
    title: "Episode Drinks",
    jp: "特製",
    kanji: "味",
    description:
      "A rotating card of drinks and desserts inspired by scenes we can't forget. Ask what's on this month.",
    detail: "Changes monthly",
    image: "expDrinks",
  },
];
