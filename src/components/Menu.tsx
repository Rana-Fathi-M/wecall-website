import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { BrandLogo } from "./BrandLogo";

const items = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Investment Strategies", href: "/strategies" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
  { label: "Apply for Client Allocation", href: "/apply" },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export function Menu({ open, onClose }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    document.body.style.overflow = open ? "hidden" : "";

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (open) {
      tl.to(el, { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 0)
        .fromTo(".mn-glass", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
        .fromTo(
          ".mn-panel",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          0.08,
        )
        .fromTo(
          ".mn-item",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.045, duration: 0.58 },
          0.16,
        )
        .fromTo(
          ".mn-close",
          { opacity: 0, scale: 0.86 },
          { opacity: 1, scale: 1, duration: 0.5 },
          0.2,
        );
    } else {
      tl.to(el, { autoAlpha: 0, duration: 0.38, ease: "power2.inOut" });
    }

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      ref={root}
      className={`mn-root fixed inset-0 z-[80] overflow-hidden ${open ? "is-open" : ""}`}
      aria-hidden={!open}
    >
      <button type="button" className="mn-glass" aria-label="Close menu" onClick={onClose} />

      <div className="mn-panel relative flex h-full w-full flex-col px-5 pt-5 pb-4 md:px-10 md:pt-8 md:pb-6">
        <div className="flex w-full items-center justify-between pr-14 md:pr-16">
          <Link to="/" onClick={onClose}>
            <BrandLogo className="h-9 w-auto md:h-14" />
          </Link>
          <button type="button" onClick={onClose} className="mn-close" aria-label="Close menu">
            <span />
            <span />
          </button>
        </div>

        <div className="relative mt-4 flex min-h-0 flex-1 flex-col md:mt-10">
          <p className="mn-kicker mb-1 font-manrope text-[11px] tracking-[0.32em] text-gold uppercase md:mb-4">
            Menu
          </p>
          <nav className="mn-nav">
            {items.map((item, i) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                onMouseEnter={() => setActive(i)}
                className={`mn-item overflow-hidden font-nohemi font-medium tracking-[-0.02em] uppercase ${
                  i === active ? "text-gold" : ""
                }`}
              >
                <span className="block transition-transform duration-500 hover:translate-x-3">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gold/20 pt-4 font-manrope md:mt-6 md:gap-6 md:pt-5">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Desks</p>
            <p className="mt-2 text-[13px] leading-relaxed opacity-70">
              Cold callers · Lead managers · Acquisition VAs
            </p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Boardroom</p>
            <a href="mailto:hello@wecall.com" className="mt-2 block text-[13px] opacity-70">
              hello@wecall.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
