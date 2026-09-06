import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { photos } from "../media";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /*
       * =========================================================
       * INITIAL STATES
       * =========================================================
       */

      // ---------------------------------------------------------
      // Main title
      // ---------------------------------------------------------
      gsap.set(".hero-title", {
        zIndex: 100,
      });

      gsap.set(".hero-word", {
        opacity: 0,
        y: 45,
      });

      gsap.set(".hero-script", {
        opacity: 0,
        y: 30,
      });

      // ---------------------------------------------------------
      // Secondary content
      //
      // IMPORTANT:
      // It starts BELOW the viewport so it can never overlap
      // the main title during the first part of the animation.
      // ---------------------------------------------------------
      gsap.set(".hero-copy", {
        opacity: 0,
        y: 36,
      });

      /*
       * Refresh assemble — each card slides in from its own side
       * and settles into the collage (WHOLEDESIGN opening).
       */
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const assemble = mobile
        ? [
            { sel: ".hero-img-stairs", x: -36, y: -40, rest: -5 },
            { sel: ".hero-img-dome", x: 48, y: -36, rest: 6 },
            { sel: ".hero-img-house", x: -52, y: 24, rest: -7 },
            { sel: ".hero-img-wood", x: 8, y: -44, rest: 3 },
            { sel: ".hero-img-lounge", x: 44, y: 32, rest: 5 },
            { sel: ".hero-img-courtyard", x: -28, y: 40, rest: -4 },
          ]
        : [
            { sel: ".hero-img-stairs", x: -140, y: -110, rest: 0 },
            { sel: ".hero-img-dome", x: 150, y: -90, rest: 0 },
            { sel: ".hero-img-house", x: -170, y: 70, rest: 0 },
            { sel: ".hero-img-wood", x: 20, y: -150, rest: 0 },
            { sel: ".hero-img-lounge", x: 160, y: 90, rest: 0 },
            { sel: ".hero-img-courtyard", x: 110, y: 140, rest: 0 },
          ];

      assemble.forEach(({ sel, x, y }) => {
        gsap.set(sel, {
          x,
          y,
          opacity: 0,
          scale: mobile ? 1.06 : 1.12,
          rotation: x > 0 ? 8 : -8,
        });
      });

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      assemble.forEach(({ sel, rest }, i) => {
        intro.to(
          sel,
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: rest,
            duration: 1.35,
          },
          i * 0.13,
        );
      });

      intro
        .to(
          ".hero-word",
          {
            opacity: 1,
            y: 0,
            duration: 1.15,
            ease: "power3.out",
          },
          1.05,
        )
        .to(
          ".hero-script",
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: "power3.out",
          },
          1.28,
        );

      /*
       * =========================================================
       * SCROLL TIMELINE
       * =========================================================
       *
       * SECTION:
       *
       * 1. Hold complete composition
       * 2. Images move out
       * 3. Title stays alone
       * 4. Title moves UP
       * 5. H2/content comes UP from below
       * 6. Hold content
       * 7. Next section
       * =========================================================
       */

      const leave = {
        scale: 1,
        ease: "power1.in" as const,
        duration: mobile ? 1.35 : 9,
      };

      const stage = root.current?.querySelector(".hero-stage");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: mobile ? "+=42%" : "+=340%",
          pin: true,
          scrub: mobile ? 0.45 : 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
       * Images leave slowly. Copy snaps in as soon as they are gone.
       */
      scrollTl.to({}, { duration: mobile ? 0.05 : 0.35 });

      const leaveAt = mobile ? 0.06 : 0.4;

      scrollTl.to(
        ".hero-img-stairs",
        { ...leave, x: "-110vw", y: "-90vh" },
        leaveAt,
      );
      scrollTl.to(
        ".hero-img-dome",
        { ...leave, x: "110vw", y: "-90vh" },
        leaveAt,
      );
      scrollTl.to(
        ".hero-img-house",
        { ...leave, x: "-120vw", y: "8vh" },
        leaveAt,
      );
      scrollTl.to(
        ".hero-img-wood",
        { ...leave, x: "0vw", y: "-120vh" },
        leaveAt,
      );
      scrollTl.to(
        ".hero-img-lounge",
        { ...leave, x: "120vw", y: "70vh" },
        leaveAt,
      );
      scrollTl.to(
        ".hero-img-courtyard",
        { ...leave, x: "90vw", y: "120vh" },
        leaveAt,
      );

      scrollTl.to(".hero-title", {
        y: mobile ? "-18vh" : "-34vh",
        duration: mobile ? 0.4 : 0.7,
        ease: "power3.inOut",
      });

      scrollTl.to(
        ".hero-copy",
        {
          y: 0,
          opacity: 1,
          duration: mobile ? 0.32 : 0.85,
          ease: "power3.out",
        },
        "<0.08",
      );

      scrollTl.to({}, { duration: mobile ? 0 : 0.95 });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className="relative">
      <div className="hero-stage relative h-screen w-full overflow-hidden">
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
                top-0
                left-[16%]
                z-0
                h-[12vw]
                w-[18vw]
                max-h-[152px]
                max-w-[242px]
                min-w-[110px]
                max-md:hidden
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
                text-[18vw]
                leading-[0.9]
                font-extralight
                tracking-[-0.02em]
                text-gold
                md:text-[14.375vw]
                lg:text-[230px]
              "
            >
              Exclusive
            </h1>

            <p
              className="
                hero-script
                font-mariyam
                -mt-[0.38em]
                text-[18vw]
                leading-none
                text-white
                md:text-[170px]
              "
            >
              WeCall
            </p>
          </div>

          {/* =====================================================
              SECONDARY CONTENT
              
              Starts BELOW the viewport.
              
              It does NOT sit behind/on top of the title.
              
              It enters only after the title has moved upward.
          ===================================================== */}

          <div
            className="
              hero-copy
              absolute
              left-1/2
              top-auto
              bottom-8
              z-[110]
              w-[calc(100%-1.5rem)]
              max-w-[720px]
              -translate-x-1/2
              pb-0
              text-center
              md:top-[40%]
              md:bottom-auto
              md:w-[calc(100%-3rem)]
              md:pb-10
              lg:top-[48%]
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

            <div
              className="
                mt-5
                flex
                flex-col
                items-center
                justify-center
                gap-3
                md:mt-10
                md:gap-5
              "
            >
              <div className="flex w-full max-w-[520px] items-stretch justify-center gap-2 sm:w-auto sm:items-center sm:gap-3">
                <Link to="/apply" className="hero-cta-primary">
                  <span className="hero-cta-shine" />
                  Claim Your Investor Seat
                  <em>2 cohort seats left</em>
                </Link>
                <Link to="/pricing" className="hero-cta-ghost">
                  Build My Custom Desk
                </Link>
              </div>
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
}: {
  light: string;
  dark: string;
  className: string;
}) {
  return (
    <div className={className}>
      <div className="relative h-full w-full overflow-hidden">
        <img src={dark} alt="" className="block h-full w-full object-cover light:hidden" />
        <img src={light} alt="" className="hidden h-full w-full object-cover light:block" />
        <div className="absolute inset-0 bg-[#c49e7b]/18 light:bg-cream/10" />
      </div>
    </div>
  );
}