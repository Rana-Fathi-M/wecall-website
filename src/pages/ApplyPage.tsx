import { Quote } from "../components/Quote";

export function ApplyPage() {
  return (
    <main>
      <section className="bg-ink px-3 pt-28 pb-6 text-center text-white md:px-6 md:pt-40 md:pb-8">
        <h1 className="font-nohemi text-[32px] leading-[0.85] font-extralight md:text-[90px]">
          Private Strategy Session
        </h1>
        <p className="font-mariyam mt-2 text-[42px] text-gold md:text-[72px]">allocate</p>
      </section>
      <Quote />
    </main>
  );
}
