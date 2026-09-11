import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ClaimSeatCta } from "./ClaimSeatCta";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    tag: "Wholesale desks",
    title: "Motivated seller flow, not recycled lists",
    copy: "10,000 stacked records per caller. The proven baseline is ~45 high-converting leads a month — enough to put cash offers out immediately.",
  },
  {
    tag: "Flip & BRRRR campaigns",
    title: "Contracts, not conversations",
    copy: "Upcoming Millionaire desks run 3 callers + lead manager + closer. The published benchmark is 5 closed contracts every 90 days.",
  },
  {
    tag: "Hands-off operators",
    title: "Warm transfers to lockup",
    copy: "Callers qualify. Closers negotiate. You keep daily visibility on leads, data, and active deals — with 14-day onboarding and 100% data ownership.",
  },
];

export function TrackRecord() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tr-in", {
        y: 28,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

      gsap.fromTo(
        ".tr-arc",
        { strokeDashoffset: 553 },
        {
          strokeDashoffset: 55,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: ".tr-meter", start: "top 80%" },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="tr-sec relative overflow-hidden bg-ink px-3 py-8 text-white md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-5 lg:grid-cols-[1fr_320px] lg:gap-16">
        <div>
          <p className="tr-in font-mariyam text-[24px] leading-none text-gold md:text-[56px]">proof</p>
          <h2 className="tr-in mt-1 font-nohemi text-[22px] leading-[0.95] font-medium md:mt-3 md:text-[56px]">
            Proven Track Record & Client Success
          </h2>
          <p className="tr-in mt-2 max-w-xl font-manrope text-[13px] leading-snug text-white/75 md:mt-4 md:text-[17px] md:leading-relaxed">
            Same math we publish on the desk: lead volume, close-rate benchmarks, and white-glove
            ops. Capped at 10 active seats so every campaign stays managed.
          </p>

          <div className="mt-4 space-y-2 md:mt-10 md:space-y-4">
            {stories.map((s) => (
              <article key={s.tag} className="tr-in tr-story">
                <p className="font-manrope text-[9px] tracking-[0.18em] text-gold uppercase md:text-[11px] md:tracking-[0.22em]">
                  {s.tag}
                </p>
                <h3 className="mt-0.5 font-nohemi text-[15px] leading-tight md:mt-1 md:text-[24px]">{s.title}</h3>
                <p className="mt-1 font-manrope text-[12px] leading-snug text-white/75 md:mt-2 md:text-[15px] md:leading-relaxed">
                  {s.copy}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="tr-in tr-meter keep-dark mx-auto">
          <svg viewBox="0 0 200 200" aria-hidden>
            <circle className="tr-track" cx="100" cy="100" r="88" />
            <circle className="tr-arc" cx="100" cy="100" r="88" />
          </svg>
          <div className="tr-meter-copy">
            <p>90%+</p>
            <span>Overall customer satisfaction</span>
          </div>
        </div>
      </div>

      <div className="tr-in mt-6 flex justify-center md:mt-14">
        <ClaimSeatCta />
      </div>
    </section>
  );
}
