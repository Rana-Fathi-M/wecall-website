import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3.out" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3.out" });
    const dotX = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };

    const enter = () => {
      gsap.to(ring.current, {
        scale: 1.7,
        backgroundColor: "rgba(196,158,123,0.18)",
        borderColor: "#c49e7b",
        duration: 0.35,
      });
      gsap.to(dot.current, { scale: 0.45, duration: 0.3 });
    };
    const leave = () => {
      gsap.to(ring.current, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(196,158,123,0.9)",
        duration: 0.35,
      });
      gsap.to(dot.current, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed top-0 left-0 z-[90] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold mix-blend-difference md:block"
      />
      <div
        ref={dot}
        className="pointer-events-none fixed top-0 left-0 z-[91] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold md:block"
      />
    </>
  );
}
