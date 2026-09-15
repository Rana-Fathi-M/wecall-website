import { Difference } from "../components/Difference";
import { Strategies } from "../components/Strategies";
import { ThemePhoto } from "../components/ThemePhoto";
import { photos } from "../media";

export function StrategiesPage() {
  return (
    <main>
      <section className="relative min-h-screen md:flex">
        <div className="flex w-full flex-col justify-between bg-chocolate px-4 pt-28 pb-10 text-white md:w-1/2 md:px-14 md:pt-36 md:pb-16">
          <h1 className="max-w-[460px] font-manrope text-[24px] leading-[1.05] font-normal md:text-[45px]">
            Specialized Real Estate Investment Strategies for High-Volume Investors.
          </h1>
          <div className="mt-16 flex items-center gap-3 font-manrope text-[12px] tracking-[0.2em] uppercase">
            <span className="flex h-7 w-5 items-center justify-center rounded-full border border-brown">
              <span className="h-3 w-px bg-white" />
            </span>
            Scroll
          </div>
        </div>
        <div className="relative min-h-[50vh] w-full md:min-h-screen md:w-1/2">
          <ThemePhoto light={photos.deals.light} dark={photos.deals.dark} className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <article className="absolute top-1/2 left-1/2 z-[3] hidden w-[280px] -translate-x-1/2 -translate-y-1/2 bg-brown lg:block">
          <ThemePhoto light={photos.deals.light} dark={photos.deals.dark} className="h-44 w-full object-cover" />
          <div className="keep-dark px-6 py-8 text-white">
            <p className="font-manrope text-[11px] tracking-[0.25em] uppercase">Strategies</p>
            <h2 className="mt-2 font-nohemi text-[28px] font-light">WeCall</h2>
            <p className="mt-3 font-manrope text-[13px] leading-relaxed text-white/85">
              Wholesale, Fix & Flip, Turnkey & BRRRR, and Creative Finance — sourced by Egyptian
              desks trained in U.S. acquisitions.
            </p>
          </div>
        </article>
      </section>

      <Strategies />

      <Difference />
    </main>
  );
}
