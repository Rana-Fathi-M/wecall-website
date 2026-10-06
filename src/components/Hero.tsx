import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { photos } from "../media";
import { ClaimSeatCta } from "./ClaimSeatCta";
import { ThemePhoto } from "./ThemePhoto";
import { scheduleRefresh } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

function shotVars(sel: string, mobile: boolean, extra: gsap.TweenVars = {}): gsap.TweenVars {
  if (mobile) return extra;
  if (sel === ".hero-img-wood") return { xPercent: -50, yPercent: -50, ...extra };
  if (sel === ".hero-img-house") return { yPercent: -50, ...extra };
  return extra;
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const node = root.current;
    if (!node) return;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stage = node.querySelector<HTMLElement>(".hero-stage");

    const ctx = gsap.context(() => {
      if (mobile) {
        node.classList.add("is-ready");
        stage?.classList.add("is-ready");
        gsap.set(".hero-img-wood", { xPercent: -50, yPercent: -50, x: 0, y: 0 });
        gsap.set(".hero-img-house", { yPercent: -50, x: 0, y: 0 });
        gsap.set(".hero-copy", { opacity: 0, y: 24, xPercent: -50 });

        if (reduce) {
          gsap.set(".hero-copy", { opacity: 1, y: 0, xPercent: -50 });
          return;
        }

        const leave = { duration: 1, ease: "none" as const };
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: node,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });

        scrollTl
          .to(".hero-img-stairs", { ...leave, x: "-80vw", y: "-60vh" }, 0)
          .to(".hero-img-dome", { ...leave, x: "80vw", y: "-60vh" }, 0)
          .to(".hero-img-house", { ...leave, x: "-90vw", y: "10vh", yPercent: -50 }, 0)
          .to(".hero-img-wood", { ...leave, x: "0vw", y: "-90vh", xPercent: -50, yPercent: -50 }, 0)
          .to(".hero-img-lounge", { ...leave, x: "90vw", y: "50vh" }, 0)
          .to(".hero-img-courtyard", { ...leave, x: "70vw", y: "90vh" }, 0)
          .to(".hero-title", { y: "-16vh", duration: 0.32, ease: "none" }, 0.58)
          .to(".hero-copy", { y: 0, opacity: 1, xPercent: -50, duration: 0.32, ease: "none" }, "<");
        return;
      }
      gsap.set(".hero-title", { zIndex: 100, force3D: true });
      gsap.set(".hero-word", { opacity: 0, y: 45 });
      gsap.set(".hero-script", { opacity: 0, y: 30 });
      gsap.set(".hero-copy", { opacity: 0, y: 72, xPercent: -50, force3D: true });

      const assemble = [
        { sel: ".hero-img-stairs", x: -140, y: -110 },
        { sel: ".hero-img-dome", x: 150, y: -90 },
        { sel: ".hero-img-house", x: -170, y: 70 },
        { sel: ".hero-img-wood", x: 20, y: -150 },
        { sel: ".hero-img-lounge", x: 160, y: 90 },
        { sel: ".hero-img-courtyard", x: 110, y: 140 },
      ];

      assemble.forEach(({ sel, x, y }) => {
        gsap.set(
          sel,
          shotVars(sel, false, {
            x,
            y,
            opacity: 0,
            scale: reduce ? 1 : 1.12,
            rotation: reduce ? 0 : x > 0 ? 8 : -8,
            force3D: true,
          }),
        );
      });

      node.classList.add("is-ready");
      stage?.classList.add("is-ready");

      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      if (reduce) {
        intro.set(".hero-img, .hero-word, .hero-script, .hero-copy", { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0 });
        return;
      }

      assemble.forEach(({ sel }, i) => {
        intro.to(
          sel,
          shotVars(sel, false, {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
          }),
          i * 0.1,
        );
      });
      intro
        .to(".hero-word", { opacity: 1, y: 0, duration: 1.05 }, 0.9)
        .to(".hero-script", { opacity: 1, y: 0, duration: 0.95 }, 1.08);

      const leaveDur = 2.2;
      const leaveAt = 0.1;
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: node,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.16,
          invalidateOnRefresh: true,
        },
      });

      scrollTl.to({}, { duration: 0.08 });
      scrollTl.to(".hero-img-stairs", shotVars(".hero-img-stairs", false, { x: "-110vw", y: "-90vh", duration: leaveDur, ease: "none" }), leaveAt);
      scrollTl.to(".hero-img-dome", shotVars(".hero-img-dome", false, { x: "110vw", y: "-90vh", duration: leaveDur, ease: "none" }), leaveAt);
      scrollTl.to(".hero-img-house", shotVars(".hero-img-house", false, { x: "-120vw", y: "8vh", duration: leaveDur, ease: "none" }), leaveAt);
      scrollTl.to(".hero-img-wood", shotVars(".hero-img-wood", false, { x: "0vw", y: "-120vh", duration: leaveDur, ease: "none" }), leaveAt);
      scrollTl.to(".hero-img-lounge", shotVars(".hero-img-lounge", false, { x: "120vw", y: "70vh", duration: leaveDur, ease: "none" }), leaveAt);
      scrollTl.to(".hero-img-courtyard", shotVars(".hero-img-courtyard", false, { x: "90vw", y: "120vh", duration: leaveDur, ease: "none" }), leaveAt);
      scrollTl.to(".hero-title", { y: "-34vh", duration: 0.36, ease: "none" }, leaveAt + leaveDur * 0.68);
      scrollTl.to(".hero-copy", { y: 0, opacity: 1, xPercent: -50, duration: 0.36, ease: "none" }, "<");
      scheduleRefresh();
    }, root);

    return () => {
      node.classList.remove("is-ready");
      stage?.classList.remove("is-ready");
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className="hero-root relative">
      <div className="hero-pin">
      <div className="hero-stage relative w-full overflow-hidden">
        <div
          className="
            relative
            flex
            h-full
            w-full
            items-center
            justify-center
          "
        >
          {/* =====================================================
              COLLAGE
          ===================================================== */}

          <div
            className="
              hero-collage
              pointer-events-none
              absolute
              inset-0
              mx-auto
              h-full
              max-h-[697px]
              w-full
              max-w-[961px]
            "
          >
            {/* ===================================================
                LOUNGE
            =================================================== */}

            <HeroShot
              priority
              light={photos.nightDesk.light}
              dark={photos.nightDesk.dark}
              className="
                hero-img
                hero-img-lounge
                absolute
                right-0
                bottom-10
                z-[3]
                h-[18vw]
                w-[28vw]
                max-h-[241px]
                max-w-[385px]
                min-w-[150px]
              "
            />

            {/* ===================================================
                COURTYARD
            =================================================== */}

            <HeroShot
              light={photos.deals.light}
              dark={photos.deals.dark}
              className="
                hero-img
                hero-img-courtyard
                absolute
                right-[12%]
                bottom-0
                z-[2]
                h-[16vw]
                w-[30vw]
                max-h-[227px]
                max-w-[423px]
                min-w-[140px]
              "
            />

            {/* ===================================================
                WOOD
            =================================================== */}

            <HeroShot
              priority
              light={photos.desks.light}
              dark={photos.desks.dark}
              className="
                hero-img
                hero-img-wood
                absolute
                top-1/2
                left-1/2
                z-[1]
                h-[32vw]
                w-[18vw]
                max-h-[406px]
                max-w-[285px]
                min-h-[200px]
                -translate-x-1/2
                -translate-y-1/2
              "
            />

            {/* ===================================================
                HOUSE
            =================================================== */}

            <HeroShot
              light={photos.close.light}
              dark={photos.close.dark}
              className="
                hero-img
                hero-img-house
                absolute
                top-1/2
                left-0
                z-[4]
                mt-10
                h-[20vw]
                w-[28vw]
                max-h-[287px]
                max-w-[395px]
                min-w-[160px]
                -translate-y-1/2
              "
            />

            {/* ===================================================
                DOME
            =================================================== */}

            <HeroShot
              light={photos.brrr.light}
              dark={photos.brrr.dark}
              className="
                hero-img
                hero-img-dome
                absolute
                top-[18%]
                right-[6%]
                z-0
                h-[18vw]
                w-[26vw]
                max-h-[242px]
                max-w-[363px]
                min-w-[140px]
              "
            />

            {/* ===================================================
                STAIRS
            =================================================== */}

            <HeroShot
              light={photos.seats.light}
              dark={photos.seats.dark}
              className="
                hero-img
                hero-img-stairs
                absolute
                top-[7.5rem]
                left-[16%]
                z-0
                h-[12vw]
                w-[18vw]
                max-h-[152px]
                max-w-[242px]
                min-w-[110px]
              "
            />
          </div>

          {/* =====================================================
              MAIN TITLE
              
              THIS IS ABOVE ALL IMAGES.
              
              It remains centered while images leave.
              Only AFTER the images are gone does it move up.
          ===================================================== */}

          <div
            className="
              hero-title
              pointer-events-none
              absolute
              inset-0
              z-[100]
              flex
              flex-col
              items-center
              justify-center
              text-center
            "
          >
            <h1
              className="
                hero-word
                font-nohemi
                text-[16vw]
                leading-[0.9]
                font-extralight
                tracking-[-0.02em]
                text-gold
                md:text-[12vw]
                lg:text-[200px]
              "
            >
              WeCall
            </h1>

            <p
              className="
                hero-script
                font-priestacy
                -mt-[0.18em]
                text-[10vw]
                leading-none
                text-white
                md:text-[100px]
                lg:text-[118px]
              "
            >
              Investments
            </p>
          </div>
        </div>
      </div>

          <div
            className="
              hero-copy
              z-[110]
              w-[calc(100%-1.5rem)]
              max-w-[720px]
              text-center
              md:w-[calc(100%-3rem)]
            "
          >
            <h2
              className="
                mx-auto
                max-w-[700px]
                font-nohemi
                text-[15px]
                leading-[1.08]
                font-light
                text-gold
                sm:text-[22px]
                md:text-[34px]
              "
            >
              Exclusive Cold Calling & Full-Funnel Real Estate
              Asset Deployment for High-Volume Investors.
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-[680px]
                font-manrope
                text-[13px]
                leading-[1.4]
                font-normal
                text-brown
                md:mt-6
                md:text-[18px]
                md:leading-[1.5]
              "
            >
              Tailored deal sourcing and lead generation built
              specifically for{" "}
              <strong className="font-semibold">
                Wholesalers, Fix & Flippers, Buy-and-Hold Rental
                Investors, and Portfolio Scalers
              </strong>
              . We deploy dedicated Egyptian cold calling assets,
              lead managers, and acquisition managers trained to
              deliver pre-vetted, highly motivated seller leads.
            </p>

            <div className="hero-cta-slot mt-5 md:mt-8">
              <div className="flex w-full max-w-[420px] flex-col items-stretch justify-center gap-3 sm:max-w-[520px] md:w-auto md:max-w-none md:flex-row md:items-center">
                <ClaimSeatCta />
                <Link to="/pricing" className="hero-cta-ghost">
                  Build Your Custom Desk
                </Link>
              </div>
            </div>
          </div>
      </div>
      <div className="hero-gap" aria-hidden />
    </section>
  );
}

/* =============================================================
   HERO IMAGE
   ============================================================= */

function HeroShot({
  light,
  dark,
  className,
  priority,
}: {
  light: string;
  dark: string;
  className: string;
  priority?: boolean;
}) {
  return (
    <div className={className}>
      <div className="relative h-full w-full overflow-hidden">
        <ThemePhoto light={light} dark={dark} eager={priority} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#c49e7b]/18 light:bg-cream/10" />
      </div>
    </div>
  );
}