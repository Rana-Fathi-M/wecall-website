import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pricingRows, stacks, tiers } from "../data";
import { ClaimSeatCta } from "./ClaimSeatCta";

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

      const launchTitleArrow = () => {
        const wrap = node.querySelector<HTMLElement>(".pr-arrow-escrow");
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
          rotation: -10,
          y: 18,
          transformOrigin: "30% 70%",
        });
        gsap.set([path, glow].filter(Boolean), {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
        gsap.set(head, { autoAlpha: 0, scale: 0, svgOrigin: `${tip.x} ${tip.y}` });
        gsap.set(spark, { autoAlpha: 0, scale: 0.3 });
        gsap.set(halo, { autoAlpha: 0, scale: 0.5 });
        gsap.set(label, { autoAlpha: 0, y: 10, rotation: -6 });

        const tl = gsap.timeline({
          delay: 0.42,
          scrollTrigger: { trigger: ".pr-title", start: "top 78%" },
        });

        tl.to(wrap, {
          autoAlpha: 1,
          scale: 1,
          rotation: 18,
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
          .to(head, { autoAlpha: 1, scale: 1, duration: 0.38, ease: "back.out(2.2)" }, "-=0.18")
          .to(label, { autoAlpha: 1, y: 0, rotation: -8, duration: 0.45, ease: "power3.out" }, "-=0.55");

        if (spark) {
          tl.set(spark, { autoAlpha: 1, scale: 1 }, 0.08);
          tl.to(
            spark,
            {
              motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true },
              duration: 1.15,
              ease: "power2.inOut",
            },
            0.08,
          );
          tl.to(spark, { autoAlpha: 0, scale: 0.2, duration: 0.28, ease: "power2.out" });
        }
      };

      launchTitleArrow();

      const joined = { n: 0 };
      const joinedEl = node.querySelector(".pr-joined");
      gsap.to(joined, {
        n: 23,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".pr-alloc", start: "top 85%" },
        onUpdate: () => {
          if (joinedEl) joinedEl.textContent = String(Math.round(joined.n));
        },
      });

      gsap.fromTo(
        ".pr-bar",
        { scaleX: 0 },
        {
          scaleX: 0.92,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: ".pr-alloc", start: "top 85%" },
        },
      );

      gsap.from(".pr-card", {
        y: 48,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: ".pr-cards", start: "top 82%" },
      });

      gsap.from(".pr-row", {
        y: 16,
        opacity: 0,
        stagger: 0.03,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: { trigger: ".pr-table", start: "top 84%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="pricing" className="pr-section relative overflow-x-clip px-3 pb-24 pt-14 md:px-6 md:pb-32 md:pt-28">
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[420px] w-[90vw] max-w-[980px] -translate-x-1/2 rounded-full bg-gold/12 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl text-center" style={{ perspective: "800px" }}>
        <span className="pr-kicker mb-4 inline-block rounded-full border border-gold bg-gold px-5 py-1.5 font-manrope text-[13px] font-extrabold tracking-[0.22em] text-ink uppercase md:text-[15px]">
          The End of Dead Leads
        </span>
        <h2 className="pr-title relative mt-4 font-nohemi text-[36px] leading-[0.9] font-semibold tracking-tight text-white sm:text-[60px] md:text-[92px]">
          <span className="pr-line block">Stop Buying Leads.</span>
          <span className="pr-line pr-escrow relative mt-2 inline-block">
            Start Buying Closed Escrows.
          </span>
          <WowArrow className="pr-arrow-escrow" label="the money" />
        </h2>
        <p className="pr-sub mx-auto mt-5 max-w-3xl px-1 font-manrope text-[17px] leading-relaxed font-medium text-white/90 md:mt-8 md:text-[22px]">
          You don&apos;t need another list of recycled phone numbers. You need a ruthless, fully
          managed offshore acquisition desk engineered to lock up off-market deals while you sleep.
        </p>
      </div>

      <div className="pr-alloc keep-dark relative mx-auto mt-10 max-w-3xl rounded-2xl border border-gold/30 bg-[#1f2329] p-5 text-white md:mt-14 md:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-manrope text-[11px] tracking-[0.22em] text-gold uppercase">
              This quarter
            </p>
            <p className="mt-2 flex items-end gap-2">
              <span className="pr-joined font-nohemi text-[48px] leading-none text-gold md:text-[64px]">0</span>
              <span className="mb-1 font-nohemi text-[18px] text-white/50 md:text-[24px]">/ 25 seats</span>
            </p>
          </div>
          <p className="max-w-xs font-manrope text-[13px] leading-relaxed text-white/65">
            Hard seat-cap. First-come, first-served. Rates rise as capacity drops.
          </p>
        </div>
        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="pr-bar h-full origin-left rounded-full bg-gradient-to-r from-brown to-gold" />
        </div>
        <p className="mt-2 font-manrope text-[11px] tracking-widest text-gold/80 uppercase">
          92% allocated
        </p>
      </div>

      <div className="mx-auto mt-10 flex justify-center md:mt-12">
        <div className="relative flex rounded-full border border-gold/30 bg-white/5 p-1">
          <span
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-gold transition-transform duration-300 ${
              cycle === "annual" ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
            }`}
          />
          <button
            type="button"
            onClick={() => setCycle("monthly")}
            className={`relative z-[1] min-w-[120px] rounded-full px-4 py-2.5 font-manrope text-[11px] font-bold tracking-widest uppercase ${
              cycle === "monthly" ? "text-ink" : "text-white/55"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setCycle("annual")}
            className={`relative z-[1] min-w-[120px] rounded-full px-4 py-2.5 font-manrope text-[11px] font-bold tracking-widest uppercase ${
              cycle === "annual" ? "text-ink" : "text-white/55"
            }`}
          >
            Annual
          </button>
        </div>
      </div>
      <p className="mt-3 text-center font-manrope text-[12px] text-white/45">
        {cycle === "annual"
          ? "Pay 11 months, operate 12. One month complimentary on Starter and Upcoming Millionaire."
          : "Month-to-month. Switch to annual to hold today’s rate."}
      </p>

      <div className="pr-cards relative z-10 mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
        {tiers.map((t, i) => (
          <article
            key={t.name}
            className={`pr-card keep-dark flex h-full min-w-0 flex-col rounded-2xl border p-5 text-white md:p-7 ${
              t.featured
                ? "pr-featured border-gold bg-gradient-to-b from-[#56423f] to-[#191d23]"
                : "border-white/10 bg-[#1f2329]"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className={`font-manrope text-[12px] font-bold tracking-[0.18em] uppercase ${t.featured ? "text-gold" : "text-white/60"}`}>
                {t.tag}
              </p>
              {t.featured && <span className="pr-badge-float">Most chosen</span>}
            </div>

            <h3 className="mt-4 font-nohemi text-[30px] leading-[1.05] font-semibold md:text-[38px]">
              {t.name}
            </h3>

            <div className="mt-4 border-b border-white/10 pb-5">
              {i < 2 ? (
                <FlipPrice
                  value={cycle === "monthly" ? monthly[i] : annual[i]}
                  suffix={cycle === "monthly" ? "/ month" : "/ year"}
                  featured={t.featured}
                />
              ) : (
                <p className="pr-price font-nohemi text-[36px] leading-none text-gold md:text-[44px]">Dynamic</p>
              )}
              <p className="mt-2 font-manrope text-[12px] text-gold/80">{t.seats}</p>
            </div>

            <p className="pr-intro mt-5 font-manrope text-[15px] leading-relaxed font-medium text-white/85">{t.intro}</p>

            <ul className="pr-points mt-5 flex-1 space-y-3 font-manrope text-[15px] font-medium text-white/80">
              {t.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-gold">✓</span>
                  <span className="leading-snug">{p}</span>
                </li>
              ))}
            </ul>

            <ClaimSeatCta wide className="mt-7" />
          </article>
        ))}
      </div>

      <div className="relative z-10 mx-auto mt-14 max-w-6xl overflow-hidden">
        <p className="mb-4 text-center font-manrope text-[11px] tracking-[0.28em] text-gold uppercase">
          Dialer, CRM & data stack
        </p>
        <div className="marquee-track flex w-max items-center font-manrope text-[16px] font-medium tracking-[0.16em] text-white/50 uppercase md:text-[20px]">
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

      <div className="pr-urgency keep-dark sticky bottom-3 z-30 mx-auto mt-10 flex max-w-2xl items-center justify-between gap-3 rounded-full border border-gold/40 bg-[#1f2329] px-4 py-2.5 text-white md:bottom-5 md:px-6">
        <p className="min-w-0 font-manrope text-[11px] leading-snug md:text-[13px]">
          2 Upcoming Millionaire seats left at $5,500
        </p>
        <ClaimSeatCta compact className="shrink-0" />
      </div>
    </section>
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
    <p className={`pr-price font-nohemi text-[48px] leading-none font-semibold md:text-[58px] ${featured ? "text-white" : "text-gold"}`}>
      <span ref={ref} data-val={String(value)}>
        ${value.toLocaleString()}
      </span>
      <span className="ml-1 block font-manrope text-[12px] font-medium text-white/45 md:inline md:text-[15px]">
        {suffix}
      </span>
    </p>
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