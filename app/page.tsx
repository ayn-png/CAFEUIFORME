import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Marquee } from "@/components/sections/Marquee";
import { MenuSection } from "@/components/sections/MenuSection";
import { Experience } from "@/components/sections/Experience";
import { Events } from "@/components/sections/Events";
import { Gallery } from "@/components/sections/Gallery";
import { Reservation } from "@/components/sections/Reservation";
import { Visit } from "@/components/sections/Visit";

export default function Home() {
  return (
    <>
      <Hero />
      <Story />
      <Marquee />
      <MenuSection />
      <Experience />
      <Events />
      <Gallery />
      <Reservation />
      <Visit />
    </>
  );
}
