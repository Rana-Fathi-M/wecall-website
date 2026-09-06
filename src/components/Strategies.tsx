import { strategies } from "../data";
import { Moving3D } from "./Moving3D";
import { ThemePhoto } from "./ThemePhoto";

export function Strategies() {
  return (
    <section id="strategies" className="st-band relative z-[3]">
      <div className="st-marquee keep-dark relative">
        <div className="overflow-hidden py-7 md:py-10">
          <div className="marquee-track flex w-max font-nohemi text-[12vw] leading-none font-light text-white/40 md:text-[15vw]">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="px-8 whitespace-nowrap">
                WeCall Acquisition
              </span>
            ))}
          </div>
        </div>
      </div>

      <Moving3D />

      <div className="bg-ink py-10 md:py-24">
        <div className="overflow-hidden border-y border-white/15 py-4">
          <div className="marquee-track flex w-max font-nohemi text-[28px] font-light text-white uppercase md:text-[88px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="px-4">
                Investment Strategies /
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2 px-3 pb-2 md:mt-16 md:gap-4 md:px-8 lg:grid-cols-4 lg:overflow-visible">
          {strategies.map((s) => (
            <article
              key={s.title}
              data-cursor
              className="group relative min-w-0 overflow-hidden bg-cream p-3 md:p-6"
            >
              <div className="mb-3 flex gap-2 md:mb-6">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/70 md:h-9 md:w-9">
                  <img src="/media/cube.svg" alt="" className="h-3.5 w-3.5" />
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/70 md:h-9 md:w-9">
                  <img src="/media/building.svg" alt="" className="h-4 w-3" />
                </span>
              </div>
              <ThemePhoto light={s.photo.light} dark={s.photo.dark} className="mx-auto h-24 w-full object-cover md:h-56" />
              <div className="mt-3 md:mt-6">
                <p className="font-manrope text-[10px] text-ink/50 md:text-[12px]">{s.label}</p>
                <h3 className="mt-1 font-nohemi text-[16px] leading-none font-light text-ink md:text-[34px]">
                  {s.title}
                </h3>
                <p className="mt-2 font-manrope text-[11px] leading-snug text-ink/70 md:mt-3 md:text-[13px] md:leading-relaxed">{s.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
