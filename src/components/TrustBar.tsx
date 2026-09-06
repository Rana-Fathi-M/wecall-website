import { stacks } from "../data";

export function TrustBar() {
  return (
    <section className="overflow-hidden border-y border-white/10 bg-ink py-4 md:py-6">
      <p className="mb-4 text-center font-manrope text-[11px] tracking-[0.28em] text-gold uppercase">
        Supported stack
      </p>
      <div className="marquee-track flex w-max items-center font-manrope text-[18px] font-medium tracking-[0.18em] text-white/70 uppercase md:text-[28px]">
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
    </section>
  );
}
