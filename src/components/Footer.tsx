import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { BrandLogo } from "./BrandLogo";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate mail with a 3D tilt and glow
      gsap.from(".ft-mail", {
        y: 120,
        opacity: 0,
        rotationX: 20,
        duration: 1.4,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate each copy line with a stagger and a subtle skew
      gsap.from(".ft-copy", {
        y: 40,
        opacity: 0,
        skewX: 5,
        stagger: 0.1,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate social icons with a bounce and rotate
      gsap.from(".ft-social", {
        scale: 0,
        rotation: 360,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate the bottom legal line with a slide and fade
      gsap.from(".ft-legal", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className="bg-ink px-4 py-12 text-center text-white md:px-6 md:py-24">
      <BrandLogo className="ft-copy mx-auto h-14 w-auto drop-shadow-[0_0_30px_rgba(196,158,123,0.3)] md:h-20" />
      <a
        href="mailto:hello@wecall.com"
        className="ft-mail mt-6 block font-nohemi text-[clamp(32px,8.4vw,108px)] leading-[0.95] font-extralight tracking-tight break-all text-gold drop-shadow-[0_0_40px_rgba(196,158,123,0.25)] transition-colors hover:text-white md:mt-10"
      >
        hello@wecall.com
      </a>
      <p className="ft-copy mt-4 font-manrope text-[12px] text-white/70 md:mt-6 md:text-sm">
        Turnkey offshore acquisition desks
      </p>
      <p className="ft-copy font-manrope text-[12px] text-white/70 md:text-sm">
        For U.S. real estate investors
      </p>

      <div className="ft-copy mt-8 flex justify-center gap-5 md:mt-12 md:gap-6">
        <Social href="#" src="/media/linkedin.svg" label="LinkedIn" />
        <Social href="#" src="/media/facebook.svg" label="Facebook" />
        <Social href="#" src="/media/instagram.svg" label="Instagram" />
      </div>

      <div className="ft-legal mx-auto mt-8 grid max-w-5xl grid-cols-2 items-center gap-3 border-t border-white/10 pt-5 font-manrope text-[10px] tracking-widest text-white/40 uppercase md:mt-16 md:flex md:justify-between md:pt-6 md:text-[11px]">
        <span className="text-left">© {new Date().getFullYear()} WeCall.com</span>
        <Link
          to="/terms"
          className="text-right transition-colors hover:text-gold"
        >
          Terms & conditions
        </Link>
      </div>
    </footer>
  );
}

function Social({ href, src, label }: { href: string; src: string; label: string }) {
  return (
    <a href={href} aria-label={label} className="ft-social">
      <svg className="ft-social-ring" viewBox="0 0 64 64" aria-hidden>
        <circle className="ft-social-track" cx="32" cy="32" r="30" />
        <circle className="ft-social-draw" cx="32" cy="32" r="30" />
      </svg>
      <img src={src} alt="" className="invert-on-light ft-social-icon" />
    </a>
  );
}