import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { photos } from "../media";
import { ThemePhoto } from "../components/ThemePhoto";

gsap.registerPlugin(ScrollTrigger);

const updated = "September 7, 2026";

const sections = [
  {
    n: "01",
    title: "Who these terms cover",
    body: [
      "These Terms & Conditions (“Terms”) govern access to WeCall.com and any application, strategy session, or turnkey offshore acquisition desk we discuss or deliver.",
      "By using this site, submitting a booking, or starting a desk engagement, you agree to these Terms. If you do not agree, do not use the site or send an application.",
    ],
  },
  {
    n: "02",
    title: "What WeCall is — and is not",
    body: [
      "WeCall builds and operates offshore acquisition desks for U.S. real estate investors: callers, lead management, closers, data, and related operating support as scoped in writing.",
      "WeCall is not a licensed real-estate brokerage, law firm, lender, or investment adviser. Nothing on this site or on a consult is legal, tax, or investment advice. You remain responsible for your deals, compliance, and licensed professionals in your markets.",
    ],
  },
  {
    n: "03",
    title: "Applications and strategy sessions",
    body: [
      "A calendar booking is a request for a private strategy / integration mapping session. It is not a signed service contract and does not reserve a seat until we confirm in writing.",
      "Live times come from our Google Calendar / Calendly integration. A booked hour is locked for other visitors. If you or WeCall cancel that meeting in the calendar system, the hour becomes available on the site again.",
      "You agree that the information you submit (name, contact details, market, buy-box, bottleneck, and desk configuration) is accurate. After you lock a Calendly hour, Calendly emails you and WeCall with the booked time.",
    ],
  },
  {
    n: "04",
    title: "Fees, seats, and changes",
    body: [
      "Published prices and seat caps are current estimates and may change as capacity fills. Annual and monthly figures on the site are invitations to treat, not a binding quote, until confirmed in an order or agreement.",
      "If a paid engagement starts, the scope, term, payment schedule, and cancellation rules in that written agreement control over marketing copy on this site.",
    ],
  },
  {
    n: "05",
    title: "Your responsibilities",
    body: [
      "You must be legally able to contract (typically 18+) and authorized to share the markets, lists, and operational details you send us.",
      "You will not use the desk or any data we provide for harassment, unlawful calling, or activity that violates U.S. or local telemarketing, privacy, or real-estate rules. You own compliance for your campaigns.",
    ],
  },
  {
    n: "06",
    title: "Confidentiality",
    body: [
      "Applications are treated as confidential. We use your brief to prepare the session and, if engaged, to configure your desk. We do not sell your application to third-party lead buyers.",
      "You will treat our playbooks, scripts, data sources, and pricing as confidential and not share them with competitors.",
    ],
  },
  {
    n: "07",
    title: "No guarantees",
    body: [
      "Projected records, warm-lead flow, conversion targets, and “deals” figures on the site are illustrations, not promises. Markets, scripts, your follow-up, and regulations all affect results.",
      "Past performance of other desks is not a guarantee of your results.",
    ],
  },
  {
    n: "08",
    title: "Site use",
    body: [
      "You may not scrape, copy, or reverse-engineer the site except as allowed by law. Trademarks, copy, and design remain WeCall’s property.",
      "The site is provided “as is.” We may update pages, pricing, or these Terms at any time. The “Last updated” date at the top indicates the current version.",
    ],
  },
  {
    n: "09",
    title: "Contact & governing law",
    body: [
      "Questions about these Terms or a booking: admin@wecall247.com",
      "Governing law: The laws applicable to WeCall’s operating entity, without regard to conflict-of-law rules. Courts of competent jurisdiction there have exclusive venue, unless a consumer statute requires otherwise.",
      "Contact Email: admin@wecall247.com",
      "Website: https://wecall.com",
      "Service: Lead generation and turnkey offshore acquisition desks for U.S. real estate investors",
    ],
  },
];

export function TermsPage() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tm-kicker, .tm-title, .tm-lede", {
        y: 36,
        opacity: 0,
        stagger: 0.1,
        duration: 0.85,
        ease: "power3.out",
      });

      gsap.from(".tm-card", {
        y: 48,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".tm-list", start: "top 84%" },
      });

      gsap.to(".tm-photo-a", {
        y: 80,
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      gsap.to(".tm-orb", {
        y: -40,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.2 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="tm-page relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="tm-photo-a absolute inset-0 scale-110">
          <ThemePhoto
            light={photos.desks.light}
            dark={photos.nightDesk.dark}
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className="tm-photo-b absolute right-[-8%] bottom-[-6%] h-[55%] w-[55%] opacity-50">
          <ThemePhoto
            light={photos.office.light}
            dark={photos.close.dark}
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className="tm-veil absolute inset-0" />
        <div className="tm-grid absolute inset-0" />
        <div className="tm-grain absolute inset-0" />
        <span className="tm-orb tm-orb-a" />
        <span className="tm-orb tm-orb-b" />
        <span className="tm-orb tm-orb-c" />
      </div>

      <p className="tm-watermark font-mariyam pointer-events-none absolute top-24 left-1/2 -translate-x-1/2">
        terms
      </p>

      <section className="relative z-10 px-4 pt-28 pb-10 md:px-8 md:pt-40 md:pb-16">
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="tm-kicker font-manrope text-[12px] font-bold tracking-[0.28em] text-gold uppercase">
            Legal · Last updated {updated}
          </p>
          <h1 className="tm-title mt-4 font-nohemi text-[36px] leading-[0.9] font-semibold md:text-[72px]">
            Terms & Conditions
          </h1>
          <p className="tm-lede mx-auto mt-5 max-w-xl font-manrope text-[16px] leading-relaxed md:text-[18px]">
            The rules for using WeCall, booking a strategy session, and engaging a turnkey
            acquisition desk.
          </p>
        </div>
      </section>

      <section className="tm-list relative z-10 px-4 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto max-w-3xl space-y-4">
          {sections.map((s) => (
            <article key={s.n} className="tm-card p-5 md:p-8">
              <p className="font-manrope text-[12px] font-bold tracking-[0.22em] text-gold uppercase">
                {s.n}
              </p>
              <h2 className="mt-2 font-nohemi text-[22px] leading-tight font-semibold md:text-[28px]">
                {s.title}
              </h2>
              <div className="mt-4 space-y-3">
                {s.body.map((p) => (
                  <p key={p} className="tm-copy font-manrope text-[15px] leading-relaxed md:text-[16px]">
                    {p}
                  </p>
                ))}
              </div>
            </article>
          ))}
          <p className="pt-4 text-center font-manrope text-[13px] text-white/50">
            © 2026 WeCall.com. All Rights Reserved.
          </p>
        </div>
      </section>
    </main>
  );
}
