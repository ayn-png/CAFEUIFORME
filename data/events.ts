/**
 * Upcoming events — PLACEHOLDER dates. Replace with your real calendar.
 * Dates are ISO (local time, Asia/Kolkata).
 */
import type { ImageKey } from "./images";

export type CafeEvent = {
  id: string;
  title: string;
  jp: string;
  start: string; // ISO local datetime
  end: string;
  description: string;
  cover: ImageKey;
  price?: number; // ₹ per guest; undefined = free entry
  seats?: number;
  kind: string;
};

export const events: CafeEvent[] = [
  {
    id: "movie-night-nov",
    title: "Anime Movie Night",
    jp: "映画の夜",
    kind: "Screening",
    start: "2026-11-14T19:30",
    end: "2026-11-14T22:30",
    description:
      "A beloved hand-drawn feature on the big wall, lights down, cushions out. Includes a themed drink and a bowl of furikake popcorn.",
    cover: "evMovie",
    price: 499,
    seats: 28,
  },
  {
    id: "manga-matcha",
    title: "Manga & Matcha Evening",
    jp: "漫画と抹茶",
    kind: "Slow evening",
    start: "2026-11-20T18:00",
    end: "2026-11-20T21:00",
    description:
      "Phones in the basket, a bowl of usucha in hand. Three quiet hours with the library — plus a staff-picks table for first-time readers.",
    cover: "evMatcha",
    price: 399,
    seats: 20,
  },
  {
    id: "culture-weekend",
    title: "Japanese Culture Weekend",
    jp: "日本文化の週末",
    kind: "Workshops",
    start: "2026-11-28T11:00",
    end: "2026-11-29T18:00",
    description:
      "Shodō calligraphy, origami, a tea-whisking demo and a mini market of local Japanese-inspired makers from Nagpur.",
    cover: "evCulture",
    seats: 60,
  },
  {
    id: "community-meetup",
    title: "Anime Community Meetup",
    jp: "ファンの集い",
    kind: "Meetup",
    start: "2026-12-06T16:00",
    end: "2026-12-06T19:00",
    description:
      "Nagpur's friendliest anime circle. Season recaps, a fan-art wall, trivia, and new friends who get the references.",
    cover: "evMeetup",
  },
  {
    id: "winter-menu",
    title: "Winter Kissa Specials",
    jp: "冬の限定",
    kind: "Seasonal menu",
    start: "2026-12-15T08:00",
    end: "2027-01-31T22:30",
    description:
      "Yuzu hot chocolate, kokuto hojicha and strawberry daifuku — a small seasonal menu for the cool Nagpur evenings.",
    cover: "evSeasonal",
  },
];
