import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asset } from "../media";

gsap.registerPlugin(ScrollTrigger);

export function Moving3D() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(max-width: 767px)").matches) return;

      gsap.fromTo(
        ".move3d-video",
        { scale: 1.06 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 90%",
            end: "bottom top",
            scrub: 0.5,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="keep-dark relative z-[2] overflow-hidden bg-[#343434]">
      <video
        className="move3d-video block h-[78vw] w-full object-cover object-[center_46%] md:h-[86vh] md:object-[center_82%]"
        src={asset("assets/videos/moving-3d.mp4")}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </section>
  );
}
