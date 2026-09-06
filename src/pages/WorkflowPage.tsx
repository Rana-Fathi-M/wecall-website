import { Link } from "react-router-dom";
import { steps } from "../data";
import { Workflow } from "../components/Workflow";
import { ThemePhoto } from "../components/ThemePhoto";
import { photos } from "../media";

export function WorkflowPage() {
  return (
    <main>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink px-3 pb-12 pt-28 text-white md:min-h-[80vh] md:px-12 md:pb-20 md:pt-40">
        <ThemePhoto
          light={photos.desks.light}
          dark={photos.desks.dark}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="keep-dark relative z-[2] text-white">
          <p className="font-manrope text-[12px] tracking-[0.3em] text-gold uppercase">
            Operational Workflow
          </p>
          <h1 className="mt-3 font-nohemi text-[36px] leading-[0.85] font-extralight md:mt-4 md:text-[120px]">
            How It Works
          </h1>
          <p className="mt-4 max-w-xl font-manrope text-[14px] text-white/75 md:mt-6 md:text-[16px]">
            A 4-step process from buy-box alignment to motivated leads and offers delivered in your
            CRM.
          </p>
        </div>
      </section>

      <Workflow />

      <section className="bg-ink px-3 py-14 text-white md:px-12 md:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:gap-10">
          {steps.map((s) => (
            <article key={s.n} className="min-w-0 border-t border-white/20 pt-5 md:pt-8">
              <p className="font-nohemi text-[32px] text-gold md:text-[48px]">{s.n}</p>
              <h2 className="mt-2 font-nohemi text-[15px] leading-tight font-light md:mt-4 md:text-[32px]">
                Step {s.n.replace("0", "")}: {s.title}
              </h2>
              <p className="mt-2 font-manrope text-[12px] leading-snug text-white/70 md:mt-4 md:text-[16px] md:leading-relaxed">{s.copy}</p>
            </article>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link
            to="/apply"
            className="inline-flex rounded-full bg-brown px-8 py-3 font-manrope text-[12px] tracking-wide uppercase"
          >
            Apply for Strategic Call
          </Link>
        </div>
      </section>
    </main>
  );
}
