import { Link } from "react-router-dom";
import { services } from "../data";
import { Workflow } from "../components/Workflow";
import { AudioPolicy } from "../components/AudioPolicy";
import { ThemePhoto } from "../components/ThemePhoto";
import { photos } from "../media";

export function ServicesPage() {
  return (
    <main>
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <ThemePhoto light={photos.nightDesk.light} dark={photos.nightDesk.dark} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="keep-dark relative z-[2] w-full px-3 pb-12 pt-28 text-white md:px-12 md:pb-20 md:pt-40">
          <p className="font-manrope text-[12px] tracking-[0.3em] text-gold uppercase">Services</p>
          <h1 className="mt-3 font-nohemi text-[36px] leading-[0.85] font-extralight md:mt-4 md:text-[120px]">
            Discover our
            <span className="block">services</span>
          </h1>
          <p className="mt-4 max-w-xl font-manrope text-[14px] leading-relaxed text-white/75 md:mt-6 md:text-[16px]">
            Turnkey Cold Calling & Lead Generation, Strategy Sourcing, and Full-Funnel Real Estate
            VAs — Egyptian desks trained in U.S. real estate acquisitions.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-14 text-white md:py-28">
        <img
          src="/assets/images/wire-building.png"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="relative z-[2] mx-auto grid max-w-6xl grid-cols-2 gap-2 px-3 lg:flex lg:flex-row lg:gap-8 lg:px-6">
          {services.map((s) => (
            <article
              key={s.slug}
              className="keep-dark relative min-h-[240px] min-w-0 flex-1 overflow-hidden px-3 py-5 md:min-h-[520px] md:px-8 md:py-10"
            >
              <ThemePhoto light={s.photo.light} dark={s.photo.dark} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative z-[2] flex h-full flex-col justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 font-nohemi text-[12px] text-gold">
                  {s.n}
                </span>
                <div>
                  <h2 className="font-nohemi text-[15px] leading-tight font-light md:text-[32px]">{s.title}</h2>
                  <p className="mt-2 font-manrope text-[11px] leading-snug text-white/80 md:mt-4 md:text-[14px] md:leading-relaxed">
                    {s.copy}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="relative z-[2] mt-14 text-center">
          <Link
            to="/apply"
            className="inline-flex rounded-full bg-brown px-7 py-3 font-manrope text-[12px] tracking-wide text-white uppercase"
          >
            Apply for Strategic Call
          </Link>
        </div>
      </section>

      <Workflow />
      <AudioPolicy />
    </main>
  );
}
