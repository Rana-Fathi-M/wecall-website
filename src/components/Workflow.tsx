import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { steps } from "../data";
import { ClaimSeatCta } from "./ClaimSeatCta";

gsap.registerPlugin(ScrollTrigger);

export function Workflow({ hideHeading = false }: { hideHeading?: boolean }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!hideHeading) {
        gsap.from(".wf-head", {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
      }

      gsap.from(".wf-step", {
        y: 90,
        opacity: 0,
        stagger: 0.18,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".wf-grid", start: "top 78%" },
      });

      gsap.fromTo(
        ".wf-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ".wf-grid", start: "top 80%", end: "top 30%", scrub: true },
        },
      );

    }, root);
    return () => ctx.revert();
  }, [hideHeading]);

  return (
    <section
      ref={root}
      id="workflow"
      className={`wf-sec relative overflow-hidden bg-ink px-3 text-white md:px-12 ${
        hideHeading ? "py-10 md:py-16" : "py-14 md:py-28"
      }`}
    >
      {hideHeading ? null : (
        <>
          <p className="wf-head text-center font-manrope text-[11px] tracking-[0.28em] text-gold uppercase md:text-[12px]">
            Operational Workflow
          </p>
          <h2 className="wf-head mt-2 text-center font-nohemi text-[28px] leading-none font-light text-white md:mt-3 md:text-[72px]">
            How It Works
          </h2>
          <p className="wf-head mx-auto mt-3 max-w-xl text-center font-manrope text-[13px] leading-relaxed text-white/70 md:mt-5 md:text-[15px]">
            Four steps from buy-box to contracts. No freelancers. No wasted lists. A desk that starts
            producing in 48 hours.
          </p>
        </>
      )}

      <div className={`wf-grid relative mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-10 ${
        hideHeading ? "mt-0 md:mt-4" : "mt-8 md:mt-20"
      }`}>
        <div className="wf-line pointer-events-none absolute top-7 right-[8%] left-[8%] hidden h-px origin-left bg-gold/50 md:block" />
        {steps.map((s) => (
          <article key={s.n} className="wf-step relative min-w-0 border-t border-gold/35 pt-4 md:border-t-0 md:pt-0">
            <p className="font-nohemi text-[36px] leading-none text-gold md:text-[64px]">
              {s.n}
            </p>
            <h3 className="mt-3 font-nohemi text-[15px] leading-tight font-light text-white md:mt-5 md:text-[26px]">
              {s.title}
            </h3>
            <p className="mt-2 font-manrope text-[12px] leading-snug text-white/70 md:mt-4 md:text-[14px] md:leading-relaxed">{s.copy}</p>
          </article>
        ))}
      </div>

      <div className="mt-16 text-center">
        <ClaimSeatCta />
      </div>
    </section>
  );
}
