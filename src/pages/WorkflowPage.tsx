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

      <Workflow hideHeading />
    </main>
  );
}
