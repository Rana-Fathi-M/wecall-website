import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToTop(smooth = true) {
  if (lenis) {
    lenis.scrollTo(0, { immediate: !smooth, duration: 1.15 });
  }
  window.scrollTo({ top: 0, left: 0, behavior: smooth ? "smooth" : "auto" });
}

export function scrollToTarget(target: string | HTMLElement, smooth = true) {
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el) {
    scrollToTop(smooth);
    return;
  }
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, {
      offset: -72,
      duration: 1.2,
      immediate: !smooth,
    });
    return;
  }
  el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
}
