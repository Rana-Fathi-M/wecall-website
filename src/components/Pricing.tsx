import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pricingRows, stacks, tiers } from "../data";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

type Cycle = "monthly" | "annual";

const monthly = [1500, 5500] as const;
const annual = [16500, 60500] as const;

export function Pricing() {
  const root = useRef<HTMLElement>(null);
  const [cycle, setCycle] = useState<Cycle>("monthly");

  useEffect(() => {
    const node = root.current;
    if (!node) return;

    const ctx = gsap.context(() => {
      gsap.from(".pr-kicker", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

      gsap.from(".pr-line", {
        y: 80,
        opacity: 0,
        rotateX: 28,
        stagger: 0.12,
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pr-title", start: "top 80%" },
      });

      gsap.from(".pr-sub", {
        y: 30,
        opacity: 0,
        duration: 0.85,
        scrollTrigger: { trigger: ".pr-title", start: "top 80%" },
      });

      const joined = { n: 0 };
      const joinedEl = node.querySelector(".pr-joined");
      gsap.to(joined, {
        n: 23,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ".pr-hook", start: "top 85%" },
        onUpdate: () => {
          if (joinedEl) joinedEl.textContent = String(Math.round(joined.n));
        },
      });

      gsap.from(".pr-alert", {
        y: 56,
        scale: 0.96,
        opacity: 0,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pr-alert", start: "top 86%" },
      });

      gsap.fromTo(
        ".pr-bar",
        { scaleX: 0 },
        {
          scaleX: 0.92,
          ease: "power2.out",
          scrollTrigger: { trigger: ".pr-alert", start: "top 80%" },
          duration: 1.6,
        },
      );

      const alloc = { n: 0 };
      const allocEl = node.querySelector(".pr-alloc-num");
      gsap.to(alloc, {
        n: 92,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".pr-alert", start: "top 80%" },
        onUpdate: () => {
          if (allocEl) allocEl.textContent = `${Math.round(alloc.n)}% allocated`;
        },
      });

      gsap.from(".pr-row", {
        x: -36,
        opacity: 0,
        stagger: 0.045,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".pr-table", start: "top 82%" },
      });

      gsap.from(".pr-card", {
        y: 120,
        rotateX: 12,
        opacity: 0,
        stagger: 0.14,
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pr-cards", start: "top 82%" },
      });

      gsap.from(".pr-urgency", {
        y: 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pr-cards", start: "top 70%" },
      });

      const launchArrow = (
        sel: string,
        trigger: string,
        rot: number,
        delay = 0,
      ) => {
        const wrap = node.querySelector<HTMLElement>(sel);
        if (!wrap) return;
        const path = wrap.querySelector<SVGPathElement>(".pr-curl-path");
        const glow = wrap.querySelector<SVGPathElement>(".pr-curl-glow");
        const head = wrap.querySelector<SVGPolygonElement>(".pr-curl-head");
        const spark = wrap.querySelector<SVGCircleElement>(".pr-curl-spark");
        const halo = wrap.querySelector<HTMLElement>(".pr-wow-halo");
        const label = wrap.querySelector<HTMLElement>(".pr-wow-label");
        if (!path) return;

        const len = path.getTotalLength();
        const tip = path.getPointAtLength(len);
        gsap.set(wrap, {
          autoAlpha: 0,
          scale: 0.2,
          rotation: rot - 28,
          y: 18,
          transformOrigin: "30% 70%",
        });
        gsap.set([path, glow].filter(Boolean), {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
        gsap.set(head, {
          autoAlpha: 0,
          scale: 0,
          svgOrigin: `${tip.x} ${tip.y}`,
        });
        gsap.set(spark, { autoAlpha: 0, scale: 0.3 });
        gsap.set(halo, { autoAlpha: 0, scale: 0.5 });
        gsap.set(label, { autoAlpha: 0, y: 10, rotation: -6 });

        const tl = gsap.timeline({
          delay,
          scrollTrigger: { trigger, start: "top 78%" },
        });

        tl.to(wrap, {
          autoAlpha: 1,
          scale: 1,
          rotation: rot,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        })
          .to(halo, { autoAlpha: 0.85, scale: 1, duration: 0.5, ease: "power2.out" }, 0)
          .to(
            [path, glow].filter(Boolean),
            { strokeDashoffset: 0, duration: 1.15, ease: "power2.inOut" },
            0.08,
          )
          .to(
            head,
            { autoAlpha: 1, scale: 1, duration: 0.38, ease: "back.out(2.2)" },
            "-=0.18",
          )
          .to(
            label,
            { autoAlpha: 1, y: 0, rotation: -8, duration: 0.45, ease: "power3.out" },
            "-=0.55",
          );

        if (spark) {
          tl.set(spark, { autoAlpha: 1, scale: 1 }, 0.08);
          tl.to(
            spark,
            {
              motionPath: {
                path,
                align: path,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
              },
              duration: 1.15,
              ease: "power2.inOut",
            },
            0.08,
          );
          tl.to(spark, { autoAlpha: 0, scale: 0.2, duration: 0.28, ease: "power2.out" });
        }

        tl.to(
          wrap,
          {
            y: 7,
            rotation: rot + 4,
            duration: 2.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          },
          "+=0.05",
        );

        if (halo) {
          tl.to(
            halo,
            {
              scale: 1.18,
              autoAlpha: 0.45,
              duration: 1.8,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            },
            "<",
          );
        }
      };

      launchArrow(".pr-arrow-escrow", ".pr-title", 18, 0.42);
      launchArrow(".pr-arrow-seats", ".pr-hook", -34, 0.12);
      launchArrow(".pr-arrow-roi", ".pr-featured", 16, 0.38);
    }, root);

    const onMove = (e: MouseEvent) => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      node.querySelectorAll<HTMLElement>(".pr-card").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const inside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        gsap.to(el, {
          rotateY: inside ? x * 10 : 0,
          rotateX: inside ? -y * 8 : 0,
          y: inside && el.classList.contains("pr-featured") ? -8 : 0,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    const reset = () => {
      node.querySelectorAll<HTMLElement>(".pr-card").forEach((el) => {
        gsap.to(el, { rotateX: 0, rotateY: 0, y: 0, duration: 0.7, ease: "power3.out" });
      });
    };

    const onCardEnter = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      gsap.fromTo(
        card.querySelectorAll(".pr-feat"),
        { y: 16, opacity: 0.35 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.35, ease: "power2.out", overwrite: true },
      );
    };

    node.querySelectorAll(".pr-card").forEach((el) => {
      el.addEventListener("mouseenter", onCardEnter);
    });
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", reset);

    return () => {
      node.querySelectorAll(".pr-card").forEach((el) => {
        el.removeEventListener("mouseenter", onCardEnter);
      });
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", reset);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      id="pricing"
      className="pr-section relative overflow-x-clip px-3 pb-20 pt-14 md:px-6 md:pb-32 md:pt-28"
    >
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[520px] w-[92vw] max-w-[1200px] -translate-x-1/2 rounded-full bg-gold/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl text-center" style={{ perspective: "800px" }}>
        <span className="pr-kicker mb-4 inline-block rounded-full border border-gold bg-gold px-5 py-1.5 font-manrope text-[11px] font-extrabold tracking-[0.22em] text-ink uppercase md:text-[13px]">
          The End of Dead Leads
        </span>
        <h2 className="pr-title relative mt-4 font-nohemi text-[30px] leading-[0.9] font-medium tracking-tight text-white sm:text-[52px] md:text-[84px]">
          <span className="pr-line block">Stop Buying Leads.</span>
          <span className="pr-line pr-escrow relative mt-2 inline-block">
            Start Buying Closed Escrows.
          </span>
          <WowArrow className="pr-arrow-escrow" label="the money" />
        </h2>
        <p className="pr-sub mx-auto mt-5 max-w-3xl px-1 font-manrope text-[14px] leading-relaxed text-white/80 md:mt-8 md:text-[20px]">
          You don&apos;t need another list of recycled phone numbers. You need a ruthless, fully
          managed offshore acquisition desk engineered to lock up off-market deals while you sleep.
        </p>
      </div>

      <div className="pr-hook relative mx-auto mt-8 flex max-w-2xl flex-col items-center justify-center gap-1 overflow-visible rounded-3xl border-2 border-gold bg-gold/15 px-4 py-5 text-center shadow-[0_0_60px_rgba(196,158,123,0.28)] md:mt-12 md:gap-2 md:px-8 md:py-7">
        <WowArrow className="pr-arrow-seats" label="almost gone" />
        <p className="font-manrope text-[11px] font-extrabold tracking-[0.24em] text-gold uppercase md:text-[13px]">
          Investor desks locked this quarter
        </p>
        <p className="flex items-end justify-center gap-2">
          <span className="pr-joined font-nohemi text-[56px] leading-none text-gold md:text-[96px]">0</span>
          <span className="mb-2 font-nohemi text-[18px] text-white md:mb-3 md:text-[28px]">/ 25</span>
        </p>
        <p className="font-manrope text-[12px] font-semibold tracking-[0.12em] text-gold uppercase">seat cap</p>
        <p className="mt-1 font-manrope text-[13px] text-white/70 md:text-[15px]">
          92% allocated · first-come, first-served · prices rise as capacity drops
        </p>
      </div>

      <div className="pr-alert keep-dark relative mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-gold/45 bg-[#3d302d] p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:mt-10 md:p-7">
        <div className="relative flex items-start gap-3 md:gap-4">
          <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/20">
            <div className="seat-pulse h-2.5 w-2.5 rounded-full bg-gold" />
          </div>
          <div>
            <h4 className="font-nohemi text-[14px] font-medium tracking-wider text-gold uppercase md:text-[16px]">
              Allocation Critical
            </h4>
            <p className="mt-1 font-manrope text-[13px] leading-relaxed text-white/85 md:text-[14px]">
              To guarantee uncompromising lead quality and strict management oversight, WeCall
              operates on a hard seat-cap protocol.{" "}
              <strong>Current cohorts are 92% full.</strong> Allocations are filled on a strict
              first-come, first-served basis and are subject to algorithmic price increases as
              capacity drops.
            </p>
          </div>
        </div>
        <div className="relative mt-5 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="pr-bar h-full origin-left rounded-full bg-gradient-to-r from-brown to-gold" />
        </div>
        <p className="pr-alloc-num relative mt-2 text-right font-manrope text-[11px] tracking-widest text-gold uppercase">
          0% allocated
        </p>
      </div>

      <div className="mx-auto mt-10 flex justify-center md:mt-12">
        <div className="relative flex rounded-full border border-gold/35 bg-white/5 p-1">
          <span
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-gold transition-transform duration-300 ${
              cycle === "annual" ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
            }`}
          />
          <button
            type="button"
            onClick={() => setCycle("monthly")}
            className={`relative z-[1] min-w-[108px] rounded-full px-3 py-2 font-manrope text-[10px] font-bold tracking-widest uppercase md:min-w-[132px] md:px-5 md:py-2.5 md:text-[11px] ${
              cycle === "monthly" ? "text-ink" : "text-white/60"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setCycle("annual")}
            className={`relative z-[1] min-w-[108px] rounded-full px-3 py-2 font-manrope text-[10px] font-bold tracking-widest uppercase md:min-w-[132px] md:px-5 md:py-2.5 md:text-[11px] ${
              cycle === "annual" ? "text-ink" : "text-white/60"
            }`}
          >
            Annual lock
          </button>
        </div>
      </div>
      <p className="mt-3 text-center font-manrope text-[12px] text-white/45">
        {cycle === "annual"
          ? "Pay 11 months · operate 12. One month complimentary on Starter and Upcoming Millionaire."
          : "Month-to-month allocation. Lock annual to hold today’s rate before the next price lift."}
      </p>

      <div className="pr-table keep-dark relative z-10 mx-auto mt-12 hidden max-w-6xl overflow-x-auto rounded-2xl border border-white/10 bg-[#14181d] p-5 text-white shadow-2xl lg:mt-16 lg:block lg:p-8">
        <table className="w-full min-w-[920px] border-collapse text-left font-manrope text-[14px]">
          <thead>
            <tr className="border-b-2 border-white/10">
              <th className="py-6 pr-4 text-[11px] font-medium tracking-widest text-white/50 uppercase">
                Architectural Breakdown
              </th>
              <th className="px-6 py-6 font-nohemi text-[20px] font-light text-white">
                Starter Desk
                <span className="mt-1 block font-manrope text-[13px] font-semibold text-gold/80">
                  $1,500/mo
                </span>
              </th>
              <th className="relative border-x border-t border-gold/40 bg-chocolate/50 px-6 py-6 font-nohemi text-[22px] font-medium text-white">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-0.5 text-[10px] font-bold tracking-widest text-ink uppercase">
                  Best ROI
                </span>
                Upcoming Millionaire
                <span className="mt-1 block font-manrope text-[13px] font-semibold text-gold">
                  $5,500/mo
                </span>
              </th>
              <th className="px-6 py-6 font-nohemi text-[20px] font-light text-white">
                Scaler Engine
                <span className="mt-1 block font-manrope text-[13px] font-semibold text-gold/80">
                  Dynamic Pricing
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {pricingRows.map((row) => (
              <tr key={row[0]} className="pr-row group transition-colors hover:bg-white/5">
                <td className="py-4 pr-4 font-medium text-gold/90">{row[0]}</td>
                <td className="px-6 py-4 text-white/70">{row[1]}</td>
                <td className="border-x border-gold/15 bg-chocolate/25 px-6 py-4 font-medium text-white">
                  {row[2]}
                </td>
                <td className="px-6 py-4 text-white/70">{row[3]}</td>
              </tr>
            ))}
            <tr>
              <td className="py-8 pr-4 text-[11px] font-medium tracking-widest text-white/50 uppercase">
                Final Decision
              </td>
              <td className="px-6 py-8">
                <a href="#apply" className="pr-liquid inline-block rounded-full px-6 py-2.5 text-[12px] font-bold tracking-widest uppercase">
                  Claim Starter
                </a>
              </td>
              <td className="border-x border-b border-gold/40 bg-chocolate/50 px-6 py-8">
                <a href="#apply" className="pr-liquid pr-heartbeat inline-block w-full rounded-full px-6 py-3 text-center text-[12px] font-bold tracking-widest uppercase">
                  Lock In $5,500 Edge
                </a>
              </td>
              <td className="px-6 py-8">
                <a href="#apply" className="pr-liquid inline-block rounded-full px-6 py-2.5 text-[12px] font-bold tracking-widest uppercase">
                  Scale Custom
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        className="pr-cards relative z-10 mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-2 overflow-visible md:mt-16 md:gap-6 lg:grid-cols-3"
        style={{ perspective: "1400px" }}
      >
        {tiers.map((t, i) => (
          <article
            key={t.name}
            className={`pr-card pr-card-surface keep-dark flex min-w-0 flex-col justify-between rounded-xl px-2.5 py-4 md:rounded-2xl md:px-8 md:py-10 ${
              t.featured
                ? "pr-featured pr-glow-pulse relative border-2 border-gold bg-gradient-to-b from-[#56423f] to-[#14181d] text-white lg:-mt-8"
                : "border border-white/10 bg-[#22262c] text-white"
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <p className={`font-manrope text-[10px] font-bold tracking-[0.2em] uppercase md:text-[11px] ${t.featured ? "text-gold" : "text-white/50"}`}>
                  {t.tag}
                </p>
                {t.featured && (
                  <span className="relative overflow-visible">
                    <WowArrow className="pr-arrow-roi" label="lock this" />
                    <span className="pr-badge-float">Best ROI</span>
                  </span>
                )}
              </div>
              <h3 className="mt-2 font-nohemi text-[15px] leading-[1.1] font-medium break-words text-white md:mt-4 md:text-[34px]">
                {t.name}
              </h3>
              <div className="mt-3 border-b border-white/10 pb-3 md:mt-5 md:pb-6">
                {i < 2 ? (
                  <FlipPrice
                    value={cycle === "monthly" ? monthly[i] : annual[i]}
                    suffix={cycle === "monthly" ? "/ month" : "/ year"}
                    featured={t.featured}
                  />
                ) : (
                  <p className="font-nohemi text-[22px] leading-none text-gold md:text-[56px]">
                    Dynamic
                  </p>
                )}
                <p className="mt-2 flex items-center gap-2 font-manrope text-[10px] font-semibold text-gold/80 md:mt-3 md:text-[13px]">
                  {t.featured && <span className="seat-pulse inline-block h-2 w-2 rounded-full bg-gold" />}
                  {t.seats}
                </p>
              </div>
              <p className="mt-3 font-manrope text-[11px] leading-snug text-white/80 md:mt-6 md:text-[15px] md:leading-relaxed">
                {t.intro}
              </p>
              <ul className="mt-4 space-y-2 font-manrope text-[11px] text-white/70 md:mt-8 md:space-y-4 md:text-[14px]">
                {t.points.map((p) => (
                  <li key={p} className="pr-feat flex items-start">
                    <span className={`pr-feat-icon mt-1 mr-3 ${t.featured ? "text-gold" : "text-white/30"}`}>
                      ✓
                    </span>
                    <span className="leading-snug">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#apply"
              className={`pr-liquid mt-5 inline-flex w-full items-center justify-center rounded-full px-2 py-2.5 text-center font-manrope text-[9px] font-bold tracking-widest uppercase md:mt-10 md:px-6 md:py-4 md:text-[13px] ${
                t.featured ? "pr-heartbeat" : ""
              }`}
            >
              {t.cta}
            </a>
          </article>
        ))}
      </div>

      <div className="relative z-10 mx-auto mt-14 max-w-6xl overflow-hidden">
        <p className="mb-4 text-center font-manrope text-[11px] tracking-[0.28em] text-gold uppercase">
          Dialer, CRM & data stack we deploy
        </p>
        <div className="marquee-track flex w-max items-center font-manrope text-[16px] font-medium tracking-[0.16em] text-white/55 uppercase md:text-[22px]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center">
              {stacks.map((s) => (
                <span key={`${i}-${s}`} className="px-6">
                  {s}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="pr-urgency keep-dark sticky bottom-2 z-30 mx-auto mt-8 flex max-w-3xl items-center justify-between gap-2 rounded-full border border-gold/50 bg-[#3d302d] px-3 py-2 text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)] md:bottom-5 md:mt-10 md:gap-4 md:px-7 md:py-3">
        <p className="min-w-0 font-manrope text-[10px] leading-snug font-bold tracking-wide md:text-[13px]">
          Only 2 Upcoming Millionaire seats left at $5,500
        </p>
        <a href="#apply" className="shrink-0 rounded-full bg-gold px-4 py-2 font-manrope text-[10px] font-bold tracking-widest text-ink uppercase">
          Lock In
        </a>
      </div>
    </section>
  );
}

const ARROW_PATH = "M 18 122 C 58 22, 152 18, 214 76";
const ARROW_HEAD = "214,76 188.3,68.4 204.7,50.8";

function WowArrow({ className = "", label }: { className?: string; label?: string }) {
  const raw = useId();
  const uid = raw.replace(/:/g, "");

  return (
    <span className={`pr-wow-arrow ${className}`} aria-hidden>
      <span className="pr-wow-halo" />
      {label ? <span className="pr-wow-label font-mariyam">{label}</span> : null}
      <svg className="pr-curl" viewBox="0 0 230 140" fill="none">
        <defs>
          <linearGradient id={`${uid}-stroke`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#a78463" />
            <stop offset="55%" stopColor="#e3c4a0" />
            <stop offset="100%" stopColor="#fff3e2" />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          className="pr-curl-glow"
          d={ARROW_PATH}
          stroke="#c49e7b"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.28"
          filter={`url(#${uid}-glow)`}
        />
        <path
          className="pr-curl-path"
          d={ARROW_PATH}
          stroke={`url(#${uid}-stroke)`}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <polygon
          className="pr-curl-head"
          points={ARROW_HEAD}
          fill="#f0c89a"
          filter={`url(#${uid}-glow)`}
        />
        <circle className="pr-curl-spark" r="3.5" cx="18" cy="122" fill="#fff8ee" />
      </svg>
    </span>
  );
}

function FlipPrice({
  value,
  suffix,
  featured,
}: {
  value: number;
  suffix: string;
  featured?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const current = Number(el.dataset.val || 0);
    const state = { n: current || value };
    gsap.to(state, {
      n: value,
      duration: 0.7,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = `$${Math.round(state.n).toLocaleString()}`;
      },
    });
    el.dataset.val = String(value);
  }, [value]);

  return (
    <p className={`font-nohemi text-[22px] leading-none md:text-[56px] ${featured ? "text-white" : "text-gold"}`}>
      <span ref={ref} data-val={String(value)}>
        ${value.toLocaleString()}
      </span>
      <span className="ml-0.5 block font-manrope text-[10px] font-medium text-white/50 md:ml-1 md:inline md:text-[16px]">{suffix}</span>
    </p>
  );
}
