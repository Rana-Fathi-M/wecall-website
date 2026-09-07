import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemePhoto } from "./ThemePhoto";
import { photos } from "../media";

gsap.registerPlugin(ScrollTrigger);

const titleWords = ["Built", "by", "Sales", "&", "Real", "Estate", "Acquisition", "Veterans."];

const pillars = [
  "clean data",
  "clear seller motivation",
  "realistic price expectations",
  "immediate follow-up",
];

export function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ab-kicker", {
        y: 18,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

      gsap.from(".ab-word", {
        y: 90,
        opacity: 0,
        rotateX: 55,
        stagger: 0.055,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ab-title", start: "top 82%" },
      });

      const seven = { n: 0 };
      const three = { n: 0 };
      const sevenEl = root.current?.querySelector(".ab-n7");
      const threeEl = root.current?.querySelector(".ab-n3");

      gsap.to(seven, {
        n: 7,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: ".ab-stats", start: "top 82%" },
        onUpdate: () => {
          if (sevenEl) sevenEl.textContent = String(Math.round(seven.n)).padStart(2, "0");
        },
      });

      gsap.to(three, {
        n: 3,
        duration: 1.2,
        delay: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: ".ab-stats", start: "top 82%" },
        onUpdate: () => {
          if (threeEl) threeEl.textContent = String(Math.round(three.n)).padStart(2, "0");
        },
      });

      gsap.from(".ab-stat", {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ab-stats", start: "top 84%" },
      });

      gsap.from(".ab-shot", {
        x: 80,
        opacity: 0,
        scale: 1.08,
        duration: 1.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ab-stats", start: "top 84%" },
      });

      gsap.from(".ab-story", {
        y: 48,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ab-story", start: "top 86%" },
      });

      gsap.from(".ab-pill", {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ab-pills", start: "top 92%" },
      });
    }, root);

    const card = root.current?.querySelector<HTMLElement>(".ab-story-card");
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const inward = window.matchMedia("(min-width: 768px)").matches ? 22 : 12;
    const play = () => hoverTl?.play();
    const reverse = () => hoverTl?.reverse();
    let hoverTl: gsap.core.Timeline | undefined;

    if (card && canHover) {
      hoverTl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.55, ease: "power3.out" },
      });
      hoverTl
        .to(card, { y: -8 }, 0)
        .to(card.querySelector(".ab-c-tl"), { x: inward, y: inward }, 0)
        .to(card.querySelector(".ab-c-tr"), { x: -inward, y: inward }, 0)
        .to(card.querySelector(".ab-c-bl"), { x: inward, y: -inward }, 0)
        .to(card.querySelector(".ab-c-br"), { x: -inward, y: -inward }, 0)
        .to(card.querySelector(".ab-story-frame"), { opacity: 1 }, 0)
        .fromTo(
          card.querySelector(".ab-story-shine"),
          { x: "-40%", opacity: 0 },
          { x: "120%", opacity: 1, duration: 0.7 },
          0,
        );

      card.addEventListener("pointerenter", play);
      card.addEventListener("pointerleave", reverse);
      card.addEventListener("focusin", play);
      card.addEventListener("focusout", reverse);
    }

    return () => {
      if (card) {
        card.removeEventListener("pointerenter", play);
        card.removeEventListener("pointerleave", reverse);
        card.removeEventListener("focusin", play);
        card.removeEventListener("focusout", reverse);
      }
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      id="about"
      className="keep-dark relative overflow-hidden bg-brown px-3 py-14 text-white md:px-12 md:py-32"
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[80vw] max-w-[900px] -translate-x-1/2 rounded-full bg-white/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 translate-x-1/4 rounded-full bg-ink/20 blur-[90px]" />

      <p className="ab-kicker text-center font-manrope text-[12px] tracking-[0.32em] text-white/70 uppercase">
        Leadership & Founder Story
      </p>

      <h2
        className="ab-title mx-auto mt-3 max-w-5xl text-center font-nohemi text-[24px] leading-[0.95] font-light md:mt-5 md:text-[76px]"
        style={{ perspective: "900px" }}
      >
        {titleWords.map((word) => (
          <span key={word} className="ab-word mr-[0.22em] inline-block origin-bottom">
            {word}
          </span>
        ))}
      </h2>

      <div className="ab-stats relative z-10 mx-auto mt-8 grid max-w-6xl items-center gap-4 md:mt-20 md:grid-cols-12 md:gap-8">
        <div className="grid grid-cols-2 gap-4 md:col-span-5">
          <article className="ab-stat rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm md:p-8">
            <p className="ab-n7 font-nohemi text-[42px] leading-none font-extralight text-white md:text-[88px]">
              00
            </p>
            <p className="mt-3 font-manrope text-[11px] tracking-[0.2em] text-white/55 uppercase">
              Years
            </p>
            <p className="mt-2 font-manrope text-[14px] leading-snug text-white/90 md:text-[16px]">
              High-ticket sales leadership
            </p>
          </article>
          <article className="ab-stat rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm md:p-8">
            <p className="ab-n3 font-nohemi text-[42px] leading-none font-extralight text-white md:text-[88px]">
              00
            </p>
            <p className="mt-3 font-manrope text-[11px] tracking-[0.2em] text-white/55 uppercase">
              Years
            </p>
            <p className="mt-2 font-manrope text-[14px] leading-snug text-white/90 md:text-[16px]">
              Inside U.S. acquisitions
            </p>
          </article>
        </div>

        <div className="ab-shot relative overflow-hidden rounded-2xl md:col-span-7">
          <ThemePhoto
            light={photos.office.light}
            dark={photos.office.dark}
            className="h-[240px] w-full object-cover md:h-[360px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 font-mariyam text-[28px] text-white md:text-[40px]">
            veterans
          </p>
        </div>
      </div>

      <div className="ab-copy ab-story relative z-10 mx-auto mt-8 max-w-4xl md:mt-16">
        <article className="ab-story-card" tabIndex={0}>
          <span className="ab-corner ab-c-tl" aria-hidden />
          <span className="ab-corner ab-c-tr" aria-hidden />
          <span className="ab-corner ab-c-bl" aria-hidden />
          <span className="ab-corner ab-c-br" aria-hidden />
          <span className="ab-story-frame" aria-hidden />
          <span className="ab-story-shine" aria-hidden />

          <div className="ab-story-body">
            <div className="mb-4 flex items-center gap-3 md:mb-7">
              <span className="h-px flex-1 bg-gold/40" />
              <p className="font-manrope text-[10px] tracking-[0.28em] text-gold uppercase md:text-[11px]">
                From the founder&apos;s desk
              </p>
              <span className="h-px flex-1 bg-gold/40" />
            </div>

            <p className="font-mariyam text-[26px] leading-none text-gold md:text-[48px]">
              not a BPO
            </p>

            <div className="mt-4 space-y-3 font-manrope text-[13px] leading-[1.55] text-white/88 md:mt-6 md:space-y-5 md:text-[18px] md:leading-[1.65]">
              <p>
                WeCall wasn&apos;t built by a generic BPO agency or outsourcing middleman. It was founded on
                over 7 years of high-ticket sales leadership, with 3 dedicated years operating directly
                inside U.S. real estate acquisitions, dispositions, and real estate project management.
              </p>
              <p>
                Having managed deals across wholesaling, fix-and-flips, and rental acquisitions from list
                generation to closed escrow, our founder understands what acquisition managers actually
                need:{" "}
                <strong className="font-semibold text-white">
                  clean data, clear seller motivation, realistic price expectations, and immediate
                  follow-up
                </strong>
                . We know the difference between a tire-kicker who just wants to hear an offer and a truly
                distressed seller who needs to liquidate. Every process, script, and QA checklist at
                WeCall is built from real-world acquisition experience.
              </p>
            </div>

            <div className="ab-pills mt-5 grid grid-cols-2 gap-2 md:mt-8 md:gap-3">
              {pillars.map((p, i) => (
                <div key={p} className="ab-pill ab-pillar">
                  <span className="ab-pillar-num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
