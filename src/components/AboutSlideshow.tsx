import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { photos } from "../media";
import { ThemePhoto } from "./ThemePhoto";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    badge: "Leadership & Founder Story",
    title: "Built by Sales & Real Estate Acquisition Veterans.",
    copy: "WeCall wasn't built by a generic BPO agency or outsourcing middleman. It was founded on over 7 years of high-ticket sales leadership, with 3 dedicated years operating directly inside U.S. real estate acquisitions.",
    metricLabel: "Years in sales leadership",
    metric: "07",
    photo: photos.closings,
    cta: "Apply for Client Allocation",
    href: "/apply",
  },
  {
    badge: "Why investors choose us",
    title: "High-yield desk",
    copy: "Instead of managing entry-level freelancers, burning expensive lists, or dealing with unvetted data, WeCall operates as a high-yield extension of your acquisitions desk.",
    metricLabel: "Years inside U.S. acquisitions",
    metric: "03",
    photo: photos.nightDesk,
    cta: "See Services",
    href: "/services",
  },
  {
    badge: "Bundled execution",
    title: "Before it hits you",
    copy: "Every caller is paired with carrier-verified data, predictive dialing, daily QA, continuous coaching, custom buy-box scripting, and CRM integration before a lead touches your desk.",
    metricLabel: "Records per caller",
    metric: "10k",
    photo: photos.desks,
    cta: "How It Works",
    href: "/how-it-works",
  },
  {
    badge: "Real-world QA",
    title: "4 Pillars",
    copy: "We know a tire-kicker who just wants to hear an offer from a truly distressed seller who needs to liquidate. Every script and QA checklist is built from real acquisition experience.",
    metricLabel: "QA pillars",
    metric: "04",
    photo: photos.deals,
    cta: "View Strategies",
    href: "/strategies",
  },
  {
    badge: "Capped investor seats",
    title: "Allocations are first-come.",
    copy: "WeCall limits client intake to a capped number of active investor seats per quarter to protect lead quality, strict compliance, and dedicated management oversight.",
    metricLabel: "Cohort seats left",
    metric: "02",
    photo: photos.seats,
    cta: "Lock a Boardroom Session",
    href: "/apply",
  },
];

export function AboutSlideshow() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>(".ab-panel");
      if (els.length < 2) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${(els.length - 1) * 100}%`,
          scrub: 0.4,
          pin: true,
          snap: 1 / (els.length - 1),
          anticipatePin: 1,
        },
      });

      els.forEach((panel, i) => {
        if (i === 0) return;
        tl.fromTo(panel, { yPercent: 100 }, { yPercent: 0, ease: "none" });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative h-screen w-full overflow-hidden bg-ink">
      {panels.map((p, index) => (
        <section
          key={p.title}
          className="ab-panel keep-dark absolute inset-0 flex h-full w-full flex-col justify-end text-white"
          style={{ zIndex: index + 1 }}
        >
          <div className="absolute inset-0">
            <ThemePhoto light={p.photo.light} dark={p.photo.dark} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/40" />
          </div>

          <div className="absolute top-20 left-3 z-10 md:top-28 md:left-10">
            <span className="border border-gold/40 bg-ink/30 px-4 py-1.5 font-manrope text-[10px] font-bold tracking-[0.22em] text-gold uppercase backdrop-blur-md">
              {p.badge}
            </span>
          </div>

          <div className="relative z-10 grid w-full grid-cols-2 items-end gap-3 px-3 pb-10 md:flex md:flex-row md:justify-between md:gap-8 md:px-10 md:pb-20">
            <div className="min-w-0 md:max-w-xl">
              <h2 className="font-nohemi text-[22px] leading-[0.95] font-medium md:text-[64px]">{p.title}</h2>
              <p className="mt-2 font-manrope text-[12px] leading-snug text-white/70 md:mt-4 md:text-[16px] md:leading-relaxed">
                {p.copy}
              </p>
              <div className="mt-4 flex gap-2 md:mt-8 md:gap-3">
                <Link
                  to={p.href}
                  className="min-h-[44px] flex-1 rounded-full bg-gold px-2 py-2 text-center font-manrope text-[8px] font-bold tracking-widest text-ink uppercase md:min-h-0 md:flex-none md:px-7 md:py-3 md:text-[10px]"
                >
                  {p.cta}
                </Link>
                <Link
                  to="/pricing"
                  className="min-h-[44px] flex-1 rounded-full border border-white/25 bg-white/10 px-2 py-2 text-center font-manrope text-[8px] font-bold tracking-widest text-white uppercase backdrop-blur-md md:min-h-0 md:flex-none md:px-7 md:py-3 md:text-[10px]"
                >
                  Build Your Custom Desk
                </Link>
              </div>
            </div>
            <div className="min-w-0 text-right">
              <p className="font-manrope text-[9px] tracking-[0.18em] text-white/40 uppercase md:text-[10px]">
                {p.metricLabel}
              </p>
              <p className="mt-1 font-nohemi text-[28px] leading-none text-gold md:text-[72px]">{p.metric}</p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
