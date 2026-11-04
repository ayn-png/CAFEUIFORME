import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-ivory pt-24">
      <div className="wrap grid items-end gap-10 md:grid-cols-12">
        <p aria-hidden className="font-jp text-[9rem] leading-none text-espresso/10 md:col-span-4 md:text-[14rem]">
          迷
        </p>
        <div className="md:col-span-8">
          <p className="eyebrow text-terracotta">404 · Lost between pages</p>
          <h1 className="display mt-4 text-[clamp(2.8rem,7vw,6rem)]">This page slipped out of the book.</h1>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/">Back to Shiori</Button>
            <Button href="/menu" variant="outline">See the menu</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
