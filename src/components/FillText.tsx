import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemePhoto } from "./ThemePhoto";
import { photos } from "../media";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  ["Capped", "seats"],
  ["keep", "lead"],
  ["quality", "high,"],
  ["deals", "close"],
];

export function FillText() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".fill-word");
      gsap.set(words, { color: "rgba(255,255,255,0.12)" });
      gsap.set(".fill-curve", { yPercent: 72 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=110%",
          scrub: 0.45,
          pin: true,
        },
      });

      tl.to(words, {
        color: "#ffffff",
        stagger: 0.12,
        ease: "none",
        duration: 1,
      }).to(
        ".fill-curve",
        {
          yPercent: 0,
          ease: "none",
          duration: 0.85,
        },
        0.2,
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative z-[2] overflow-hidden bg-ink">
      <div className="relative flex h-screen items-center justify-center">
        <ThemePhoto
          light={photos.seats.light}
          dark={photos.seats.dark}
          className="absolute inset-0 h-full w-full scale-[1.04] object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(25,29,35,0.28)_0%,rgba(25,29,35,0.62)_58%,rgba(25,29,35,0.88)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-transparent to-ink/70" />

        <div className="relative z-[2] -mt-16 px-6 text-center">
          {lines.map((line) => (
            <p
              key={line.join("-")}
              className="font-nohemi text-[9.5vw] leading-[0.95] font-light tracking-[-0.01em] sm:text-[11vw] md:text-[72px] lg:text-[96px]"
            >
              {line.map((word) => (
                <span key={word} className="fill-word inline-block px-[0.18em]">
                  {word}
                </span>
              ))}
            </p>
          ))}
        </div>

        <div className="fill-curve pointer-events-none absolute right-0 bottom-0 left-0 z-[4] w-full text-[#343434]">
          <svg
            className="curve-rise"
            viewBox="0 0 1440 220"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0 220 C 240 220 360 8 720 8 C 1080 8 1200 220 1440 220 L 1440 220 L 0 220 Z"
              fill="currentColor"
            />
          </svg>
          <div className="h-16 w-full bg-[#343434]" />
        </div>
      </div>
    </section>
  );
}
