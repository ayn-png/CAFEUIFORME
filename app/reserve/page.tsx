import type { Metadata } from "next";
import { Reservation } from "@/components/sections/Reservation";

export const metadata: Metadata = {
  title: "Reserve a table",
  description: "Request a table at Shiori, the Japanese kissaten and manga library in Nandanvan, Nagpur.",
  alternates: { canonical: "/reserve" },
};

export default function ReservePage() {
  return <Reservation standalone />;
}
