import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const chips = ["Confidentiality", "Identity rights", "Active NDAs"];

export function AudioPolicy() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ap-kicker, .ap-rule, .ap-title, .ap-copy, .ap-chip, .ap-wave, .ap-cta", {
        y: 32,
        opacity: 0,
        stagger: 0.07,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      gsap.utils.toArray<HTMLElement>(".ap-bar").forEach((bar, i) => {
        gsap.to(bar, {
          scaleY: gsap.utils.random(0.28, 1),
          duration: 0.38 + (i % 5) * 0.05,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.04,
          transformOrigin: "center center",
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="ap-sec relative overflow-hidden bg-ink px-3 py-16 md:px-6 md:py-28">
      <div className="ap-glow" />

      <div className="relative z-[2] mx-auto max-w-3xl text-center">
        <p className="ap-kicker font-mariyam text-[36px] leading-none text-gold md:text-[64px]">
          private
        </p>
        <span className="ap-rule mx-auto mt-3 block h-px w-14 bg-gold/50" />
        <h2 className="ap-title mt-4 font-nohemi text-[26px] leading-[0.95] font-light md:mt-6 md:text-[64px]">
          Audition Our Elite Caller Roster
          <span className="mt-1 block text-gold">(Private Review)</span>
        </h2>
        <p className="ap-copy mx-auto mt-4 max-w-2xl font-manrope text-[13px] leading-relaxed text-white/75 md:mt-8 md:text-[16px]">
          To protect client confidentiality, protect caller identity rights, and preserve the
          non-disclosure agreements of active campaigns, live call recordings and caller voice
          audits are provided exclusively during private strategic consults.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 md:mt-8">
          {chips.map((chip) => (
            <span key={chip} className="ap-chip">
              {chip}
            </span>
          ))}
        </div>

        <div className="ap-wave" aria-hidden>
          {Array.from({ length: 22 }).map((_, i) => (
            <span key={i} className="ap-bar" />
          ))}
        </div>

        <Link to="/apply" className="ap-cta hero-cta-primary mt-8 inline-flex md:mt-10">
          <span className="hero-cta-shine" />
          Schedule Private Voice Audit
          <em>&amp; strategy call</em>
        </Link>
      </div>
    </section>
  );
}
