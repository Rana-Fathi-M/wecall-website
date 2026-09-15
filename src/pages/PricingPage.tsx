import { Pricing } from "../components/Pricing";
import { Quote } from "../components/Quote";

export function PricingPage() {
  return (
    <main>
      <section className="bg-ink px-3 pt-28 pb-6 text-center text-white md:px-6 md:pt-40 md:pb-10">
        <p className="font-manrope text-[12px] tracking-[0.3em] text-gold uppercase">
          Pricing & Allocation
        </p>
        <h1 className="mx-auto mt-3 max-w-5xl font-nohemi text-[28px] leading-[0.95] font-extralight md:mt-4 md:text-[80px]">
          Stop Buying Leads.
        </h1>
        <p className="mt-2 px-2 font-mariyam text-[34px] leading-[1.05] text-gold md:mt-3 md:text-[76px]">
          Start Closing Escrows.
        </p>
      </section>
      <Pricing />
      <Quote />
    </main>
  );
}
