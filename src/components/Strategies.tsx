import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { strategies } from "../data";
import { Moving3D } from "./Moving3D";
import { ThemePhoto } from "./ThemePhoto";
import { ClaimSeatCta } from "./ClaimSeatCta";
import { asset } from "../media";

gsap.registerPlugin(ScrollTrigger);

export function Strategies() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".st-heading", {
        y: 46,
        opacity: 0,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: { trigger: ".st-grid-wrap", start: "top 80%" },
      });

      gsap.from(".st-grid", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".st-grid", start: "top 84%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="strategies" className="st-band relative z-[3]">
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

      <div className="st-grid-wrap relative overflow-x-clip py-10 md:py-24">
        <div className="overflow-hidden border-y border-white/15 py-4">
          <div className="marquee-track flex w-max font-nohemi text-[28px] font-light text-white uppercase md:text-[88px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="px-4">
                Investment Strategies <span className="text-gold">/</span>
              </span>
            ))}
          </div>
        </div>

        <div className="st-heading relative mx-auto mt-8 max-w-2xl px-4 text-center md:mt-14">
          <p className="font-mariyam text-[34px] leading-none text-gold md:text-[56px]">strategies</p>
          <p className="mt-2 font-manrope text-[11px] tracking-[0.28em] text-gold/80 uppercase">
            Four buy-boxes. One desk.
          </p>
        </div>

        <div className="st-grid mt-8 grid grid-cols-4 items-stretch gap-2 px-3 pb-6 md:mt-14 md:gap-4 md:px-8 md:pb-8">
          {strategies.map((s, i) => (
            <article
              key={s.title}
              data-cursor
              className="st-card group relative flex h-full min-w-0 flex-col p-2.5 sm:p-3 md:p-6"
            >
              <div className="mb-3 flex items-center justify-between md:mb-5">
                <span className="st-card-num font-manrope text-[10px] tracking-[0.22em] uppercase md:text-[11px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex gap-1.5 md:gap-2">
                  <span className="st-card-icon">
                    <img src={asset("assets/icons/cube.svg")} alt="" className="h-3.5 w-3.5" />
                  </span>
                  <span className="st-card-icon">
                    <img src={asset("assets/icons/building.svg")} alt="" className="h-4 w-3" />
                  </span>
                </span>
              </div>

              <div className="st-card-media overflow-hidden">
                <ThemePhoto
                  light={s.photo.light}
                  dark={s.photo.dark}
                  alt={s.title}
                  className="st-card-img h-20 w-full object-cover sm:h-28 md:h-52"
                />
              </div>

              <div className="mt-3 flex flex-1 flex-col md:mt-6">
                <p className="font-manrope text-[10px] tracking-[0.16em] uppercase md:text-[12px]">
                  {s.label}
                </p>
                <h3 className="st-card-title mt-1 font-nohemi text-[14px] leading-[1.05] font-light md:text-[28px] lg:text-[32px]">
                  {s.title}
                </h3>
                <p className="st-card-copy mt-2 font-manrope text-[10px] leading-snug md:mt-3 md:text-[13px] md:leading-relaxed">
                  {s.copy}
                </p>
                <span className="st-card-line mt-auto" />
              </div>
            </article>
          ))}
        </div>

        <div className="hero-cta-slot px-3">
          <ClaimSeatCta />
        </div>
      </div>
    </section>
  );
}
