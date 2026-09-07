import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../data";
import { ThemePhoto } from "./ThemePhoto";

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".svc-kicker, .svc-title, .svc-copy", {
        y: 48,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      gsap.from(".svc-card", {
        y: 80,
        opacity: 0,
        stagger: 0.14,
        duration: 1,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: ".svc-grid", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="services" className="relative overflow-hidden bg-ink py-14 md:py-24">
      <img
        src="/media/wire-building.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
      />

      <div className="relative z-[2] mb-6 px-3 text-center md:mb-12 md:px-6">
        <p className="svc-kicker font-mariyam text-[42px] leading-none text-gold md:text-[120px]">
          services
        </p>
        <h2 className="svc-title mt-1 font-nohemi text-[28px] leading-none font-light text-white uppercase md:text-[80px]">
          services
        </h2>
        <p className="svc-copy mx-auto mt-3 max-w-xl font-manrope text-[13px] leading-relaxed text-white/70 md:mt-6 md:text-sm">
          Turnkey Egyptian cold calling desks, lead managers, and acquisition managers trained in
          U.S. real estate acquisitions — pre-vetted motivated seller leads, zero management
          overhead.
        </p>
      </div>

      <div className="svc-grid relative z-[2] grid grid-cols-2 gap-2 px-3 pb-2 md:gap-5 md:px-8 lg:flex lg:justify-center lg:overflow-visible">
        {services.map((s) => (
          <Link
            key={s.n}
            to="/apply"
            data-cursor
            className="svc-card keep-dark relative h-[250px] w-full min-w-0 overflow-hidden px-3 py-5 text-white md:h-[520px] md:px-8 md:py-10 lg:h-[740px] lg:w-[380px] lg:max-w-[420px] lg:shrink-0"
          >
            <ThemePhoto
              light={s.photo.light}
              dark={s.photo.dark}
              alt={s.title}
              className="svc-card-img absolute inset-0 h-full w-full object-cover"
            />
            <span className="svc-card-veil" />
            <span className="svc-card-shine" />
            <div className="relative z-[2] flex h-full flex-col items-center justify-center text-center">
              <span className="svc-card-num">
                {s.n.padStart(2, "0")}
              </span>
              <h3 className="svc-card-title mt-3 font-nohemi text-[14px] leading-tight font-light md:mt-6 md:text-[28px]">
                {s.title}
              </h3>
              <p className="svc-card-copy mt-2 max-w-[320px] font-manrope text-[11px] leading-[1.3] font-medium md:mt-5 md:text-[14px] md:leading-[1.35]">
                {s.copy}
              </p>
              <span className="svc-card-cta">
                Apply now
                <i />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="relative z-[2] mt-10 text-center">
        <Link to="/apply" className="hero-cta-primary inline-flex">
          <span className="hero-cta-shine" />
          Schedule Private Voice Audit
        </Link>
      </div>
    </section>
  );
}
