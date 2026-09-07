import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlusCircle } from "./PlusCircle";
import { ThemePhoto } from "./ThemePhoto";
import { photos } from "../media";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    photo: photos.desks,
    size: "h-[280px] w-[380px] md:h-[600px] md:w-[830px]",
    label: "01 — Cold Calling",
    title: "Turnkey Egyptian Desks",
    copy: "Data, skip tracing, QA, and follow-ups. Dedicated callers trained in U.S. acquisitions — pre-vetted motivated seller leads, zero management overhead.",
  },
  {
    photo: photos.deals,
    size: "h-[320px] w-[280px] md:h-[700px] md:w-[590px]",
    label: "02 — Strategy Sourcing",
    title: "Wholesale · Flip · BRRRR",
    copy: "Campaigns built for Wholesalers, Fix & Flippers, Buy-and-Hold / BRRRR, and Creative Finance when cash offers don't fit.",
  },
  {
    photo: photos.close,
    size: "h-[260px] w-[360px] md:h-[600px] md:w-[830px]",
    label: "03 — Full-Funnel VAs",
    title: "Lead & Acquisition Managers",
    copy: "Lead managers triage and qualify. Acquisition managers — 5+ closed deals — negotiate spreads, make verbal offers, and lock contracts.",
  },
  {
    photo: photos.seats,
    size: "h-[280px] w-[380px] md:h-[600px] md:w-[720px]",
    label: "04 — The Seat Cap",
    title: "Capped Investor Seats",
    copy: "WeCall limits client intake per quarter to protect lead quality, strict compliance, and dedicated management oversight.",
  },
];

export function Intro() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = root.current?.querySelector(".intro-track") as HTMLElement | null;
      if (!track) return;
      const mobile = window.matchMedia("(max-width: 767px)").matches;

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + (mobile ? 24 : 80)),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top center",
          end: "top top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-ink">
      <div className="intro-frame">
        <div className="intro-track flex items-center gap-6 px-4 md:gap-20 md:px-16">
          {panels.map((p) => (
            <div key={p.title} className={`keep-dark intro-card relative max-w-[86vw] shrink-0 overflow-hidden ${p.size}`}>
              <ThemePhoto light={p.photo.light} dark={p.photo.dark} alt={p.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-10">
                <p className="font-manrope text-[11px] tracking-[0.22em] text-gold uppercase">
                  {p.label}
                </p>
                <h3 className="mt-2 font-nohemi text-[22px] leading-[0.95] font-light text-white md:text-[44px]">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-md font-manrope text-[13px] leading-relaxed text-white/80 md:mt-3 md:text-[15px]">
                  {p.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="intro-script pointer-events-none absolute top-1/2 left-1/2 z-[4] w-full -translate-x-1/2 -translate-y-1/2 px-3 text-center font-mariyam text-[14vw] leading-none md:top-[18%] md:w-auto md:translate-y-0 md:text-[110px]">
          apply today
        </p>
        <PlusCircle
          to="/apply"
          label="Apply today"
          className="plus-circle-lg absolute left-1/2 z-[6] -translate-x-1/2 "
        />
      </div>
    </section>
  );
}
