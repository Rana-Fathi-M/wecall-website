import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const focuses = [
  "Wholesaling",
  "Fix & Flip",
  "Buy & Hold (BRRRR)",
  "Creative Finance (Sub-To)",
];

const titleA = ["Secure", "Your", "Market", "Monopoly."];
const titleB = ["Build", "Your", "Acquisition", "Desk."];

export function Quote() {
  const root = useRef<HTMLElement>(null);
  const priceRef = useRef<HTMLParagraphElement>(null);
  const recordsRef = useRef<HTMLSpanElement>(null);
  const leadsRef = useRef<HTMLSpanElement>(null);
  const [callers, setCallers] = useState(1);
  const [leadManager, setLeadManager] = useState(false);
  const [acq, setAcq] = useState(false);
  const [sms, setSms] = useState<"yes" | "discuss">("discuss");

  const price = callers * 1500 + (leadManager ? 1200 : 0) + (acq ? 1800 : 0);
  const records = callers * 10000;
  const leads = Math.round(callers * 45);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".qt-word", {
        y: 90,
        opacity: 0,
        rotateX: 40,
        stagger: 0.05,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".qt-head", start: "top 80%" },
      });

      gsap.from(".qt-kicker, .qt-lede", {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".qt-head", start: "top 82%" },
      });

      gsap.fromTo(
        ".qt-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 40%",
            scrub: 0.6,
          },
        },
      );

      gsap.from(".qt-ticket", {
        y: 100,
        rotate: 2,
        opacity: 0,
        stagger: 0.16,
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: { trigger: ".qt-build", start: "top 84%" },
      });

      gsap.from(".qt-field", {
        y: 28,
        opacity: 0,
        stagger: 0.06,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: { trigger: ".qt-form", start: "top 82%" },
      });

      gsap.from(".qt-day, .qt-slot", {
        y: 24,
        opacity: 0,
        stagger: 0.04,
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: { trigger: ".qt-cal", start: "top 86%" },
      });

      gsap.to(".qt-watermark", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const tween = (el: HTMLElement | null, value: number, prefix = "", suffix = "") => {
      if (!el) return;
      const current = Number(el.dataset.val || 0);
      const state = { n: current };
      gsap.to(state, {
        n: value,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(state.n).toLocaleString()}${suffix}`;
        },
      });
      el.dataset.val = String(value);
    };

    tween(priceRef.current, price, "$", "/mo");
    tween(recordsRef.current, records, "", " records");
    tween(leadsRef.current, leads, "~", " leads/mo");
  }, [price, records, leads]);

  return (
    <section ref={root} id="apply" className="qt-section relative overflow-hidden py-12 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold/30" />
      <div className="qt-progress pointer-events-none absolute top-0 left-0 z-20 h-[3px] w-full bg-gold" />
      <p className="qt-watermark font-mariyam pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 text-[26vw] leading-none text-[color:var(--qt-fg)] opacity-[0.05] md:text-[200px]">
        allocate
      </p>

      <div className="relative z-10 mx-auto max-w-[1280px] px-3 md:px-8">
        <header className="qt-head relative mx-auto max-w-5xl pb-3 text-center md:pb-8">
          <span className="qt-kicker qt-stamp">Application Only • Strictly Confidential</span>
          <h2
            className="relative mt-4 font-nohemi text-[26px] leading-[0.92] font-light sm:text-[48px] md:mt-6 md:text-[72px]"
            style={{ perspective: "900px" }}
          >
            <span className="block">
              {titleA.map((w) => (
                <span key={w} className="qt-word mr-[0.22em] inline-block origin-bottom">
                  {w}
                </span>
              ))}
            </span>
            <span className="mt-2 block text-gold">
              {titleB.map((w) => (
                <span key={w} className="qt-word mr-[0.22em] inline-block origin-bottom">
                  {w}
                </span>
              ))}
            </span>
          </h2>
          <p className="qt-lede relative mx-auto mt-4 max-w-2xl font-manrope text-[13px] leading-relaxed text-[color:var(--qt-muted)] md:mt-6 md:text-[17px]">
            This is not a sales call. This is an integration mapping session. Dial in your target
            operational volume below so our engineers can pre-configure your market data prior to
            our boardroom session.
          </p>
        </header>

        <div className="qt-build mt-10 lg:mt-14">
          <div className="qt-ticket qt-frame grid overflow-hidden lg:grid-cols-12">
            <div className="space-y-3 p-4 md:space-y-4 md:p-8 lg:col-span-7">
              <p className="font-manrope text-[11px] font-bold tracking-[0.28em] text-gold uppercase">
                Live Desk Configuration
              </p>

              <div className="qt-panel rounded-2xl p-5 md:p-6">
                <div className="flex items-center justify-between gap-4">
                  <label className="font-manrope text-[12px] tracking-[0.16em] uppercase opacity-70">
                    Dedicated Acquisition Agents
                  </label>
                  <div className="flex items-center gap-3">
                    <button type="button" className="qt-stepper" onClick={() => setCallers((n) => Math.max(1, n - 1))}>
                      −
                    </button>
                    <span className="min-w-[2ch] text-center font-nohemi text-[36px] leading-none text-gold md:text-[56px]">
                      {callers}
                    </span>
                    <button type="button" className="qt-stepper" onClick={() => setCallers((n) => Math.min(10, n + 1))}>
                      +
                    </button>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-10 gap-1.5">
                  {Array.from({ length: 10 }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCallers(i + 1)}
                      className={`h-2 rounded-full ${i < callers ? "bg-gold" : "opacity-20"}`}
                      style={i < callers ? undefined : { background: "var(--qt-fg)" }}
                      aria-label={`${i + 1} agents`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-4">
                <ToggleModule
                  label="Dedicated Lead Manager"
                  subtext="Filters the noise, warms the leads."
                  checked={leadManager}
                  onChange={setLeadManager}
                />
                <ToggleModule
                  label="Senior Acquisition Closer"
                  subtext="Locks up contracts while you sleep."
                  checked={acq}
                  onChange={setAcq}
                />
              </div>

              <div className="qt-panel rounded-2xl p-5 md:p-6">
                <p className="font-manrope text-[15px] font-medium">Omnichannel SMS Suite</p>
                <p className="mt-1 font-manrope text-[12px] text-[color:var(--qt-muted)]">
                  Automated multi-touch sequences.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSms("discuss")}
                    className={`rounded-xl px-4 py-3 font-manrope text-[12px] ${
                      sms === "discuss" ? "bg-gold text-ink" : "border border-[color:var(--qt-line)]"
                    }`}
                  >
                    Discuss on Consult
                  </button>
                  <button
                    type="button"
                    onClick={() => setSms("yes")}
                    className={`rounded-xl px-4 py-3 font-manrope text-[12px] ${
                      sms === "yes" ? "bg-gold text-ink" : "border border-[color:var(--qt-line)]"
                    }`}
                  >
                    Inject into Build
                  </button>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block lg:col-span-1">
              <div className="qt-perforation absolute inset-y-6 left-1/2 w-3 -translate-x-1/2" />
            </div>

            <aside className="qt-hud qt-hud-panel m-4 lg:col-span-4 lg:m-5">
              <p className="font-manrope text-[11px] font-bold tracking-[0.28em] text-gold uppercase">
                Your Projected Arsenal
              </p>
              <p className="mt-3 font-manrope text-[13px] text-[color:var(--qt-muted)]">
                This is the desk your competitors wish they booked first.
              </p>
              <p className="mt-8 font-manrope text-[11px] tracking-[0.2em] uppercase opacity-40">
                Operating Capital:
              </p>
              <p ref={priceRef} data-val="1500" className="mt-1 font-nohemi text-[36px] leading-none font-extralight md:text-[64px]">
                $1,500/mo
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2 md:mt-8 md:grid-cols-1 md:gap-3">
                <HudRow label="Proprietary Data (Skip-Traced):" valueRef={recordsRef} fallback="10,000 records" val="10000" />
                <HudRow label="Guaranteed Warm Lead Flow:" valueRef={leadsRef} fallback="~45 leads/mo" val="45" />
                <div className="qt-panel col-span-2 rounded-xl px-4 py-4 md:col-span-1">
                  <p className="font-manrope text-[11px] tracking-widest uppercase opacity-45">
                    90-Day Conversion Benchmark:
                  </p>
                  <p className="mt-2 font-nohemi text-[22px] text-gold">5 Closed Deals</p>
                </div>
              </div>
              <p className="mt-6 flex items-center gap-2 font-manrope text-[11px] tracking-[0.16em] text-gold uppercase">
                <span className="seat-pulse inline-block h-2 w-2 rounded-full bg-gold" />
                2 cohort seats left — reviewed in 24 hours
              </p>
            </aside>
          </div>
        </div>

        <div className="qt-form qt-ticket qt-frame relative mt-4 overflow-hidden p-4 md:mt-8 md:p-10 lg:p-14">
          <span className="qt-step-mark">01</span>
          <p className="relative mb-2 flex items-center gap-2 font-manrope text-[11px] font-bold tracking-[0.22em] text-gold uppercase">
            <span className="seat-pulse inline-block h-2 w-2 rounded-full bg-gold" />
            2 cohort seats left — reviewed in 24 hours
          </p>
          <h3 className="relative mb-6 font-nohemi text-[22px] font-light md:mb-10 md:text-[42px]">
            Step 1: Strategic Alignment
          </h3>
          <form
            className="relative space-y-4 md:space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById("boardroom")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="qt-form-fields grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-8">
              <Field label="Full Name" name="name" autoComplete="name" validate={isName} />
              <Field label="Direct Email" name="email" type="email" autoComplete="email" validate={isEmail} />
              <Field label="Direct Phone" name="phone" type="tel" autoComplete="tel" validate={isPhone} />
              <Field label="Target Deployment Date" name="start" validate={isFilled} />
            </div>

            <fieldset className="qt-field">
              <legend className="mb-3 font-manrope text-[11px] font-bold tracking-widest uppercase opacity-45">
                Primary Investment Mechanism
              </legend>
              <div className="grid grid-cols-2 gap-2 font-manrope text-[13px] md:gap-3 md:text-[14px]">
                {focuses.map((f, i) => (
                  <label
                    key={f}
                    className="qt-chip flex min-h-[50px] cursor-pointer items-center gap-2 rounded-2xl border border-[color:var(--qt-line)] bg-[color:var(--qt-panel)] px-3 py-3 has-[:checked]:border-gold has-[:checked]:bg-gold/15 has-[:checked]:text-gold md:gap-3 md:px-5 md:py-4"
                  >
                    <input type="checkbox" name="focus" value={f} className="sr-only" />
                    <span className="font-nohemi text-[13px] text-gold/70">0{i + 1}</span>
                    <span>{f}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <Field
              label="Target Market & Buy-Box"
              name="market"
              as="textarea"
              validate={isLong}
            />
            <Field
              label="Core Operational Bottleneck"
              name="bottleneck"
              as="textarea"
              validate={isLong}
            />

            <input type="hidden" name="callers" value={callers} />
            <input type="hidden" name="leadManager" value={String(leadManager)} />
            <input type="hidden" name="acquisitionManager" value={String(acq)} />
            <input type="hidden" name="sms" value={sms} />
            <input type="hidden" name="price" value={String(price)} />

            <div className="qt-submit-bar">
              <button type="submit" className="hero-cta-primary w-full max-w-none">
                <span className="hero-cta-shine" />
                Submit Blueprint & Proceed to Calendar
              </button>
            </div>
          </form>
        </div>

        <BoardroomCalendar />
      </div>
    </section>
  );
}

function HudRow({
  label,
  valueRef,
  fallback,
  val,
}: {
  label: string;
  valueRef: RefObject<HTMLSpanElement | null>;
  fallback: string;
  val: string;
}) {
  return (
    <div className="qt-panel flex min-w-0 flex-col justify-between gap-2 rounded-xl px-3 py-3 md:flex-row md:items-end md:gap-4 md:px-4 md:py-4">
      <p className="font-manrope text-[10px] text-[color:var(--qt-muted)] md:text-[12px]">{label}</p>
      <span ref={valueRef} data-val={val} className="font-nohemi text-[14px] text-gold md:text-[22px]">
        {fallback}
      </span>
    </div>
  );
}

function ToggleModule({
  label,
  subtext,
  checked,
  onChange,
}: {
  label: string;
  subtext: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex min-h-[50px] w-full items-center justify-between gap-2 rounded-2xl border p-3 text-left md:gap-4 md:p-6 ${
        checked
          ? "border-gold/60 bg-gold/10"
          : "border-[color:var(--qt-line)] bg-[color:var(--qt-panel)]"
      }`}
    >
      <div>
        <p className="font-manrope text-[12px] leading-snug font-medium md:text-[15px]">{label}</p>
        <p className="mt-1 font-manrope text-[10px] leading-snug text-[color:var(--qt-muted)] md:text-[12px]">{subtext}</p>
      </div>
      <span className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full ${checked ? "bg-gold" : "opacity-25"}`} style={checked ? undefined : { background: "var(--qt-fg)" }}>
        <span className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
      </span>
    </button>
  );
}

const isName = (v: string) => v.trim().length >= 2;
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isPhone = (v: string) => v.replace(/\D/g, "").length >= 10;
const isFilled = (v: string) => v.trim().length >= 3;
const isLong = (v: string) => v.trim().length >= 12;

function Field({
  label,
  name,
  type = "text",
  as,
  autoComplete,
  validate,
}: {
  label: string;
  name: string;
  type?: string;
  as?: "textarea";
  autoComplete?: string;
  validate: (value: string) => boolean;
}) {
  const [valid, setValid] = useState(false);

  return (
    <label className={`qt-field qt-float group ${valid ? "is-valid" : ""}`}>
      {as === "textarea" ? (
        <textarea
          name={name}
          rows={4}
          placeholder=" "
          className="qt-input qt-float-input"
          onInput={(e) => setValid(validate((e.target as HTMLTextAreaElement).value))}
        />
      ) : (
        <input
          name={name}
          type={type}
          autoComplete={autoComplete}
          placeholder=" "
          className="qt-input qt-float-input"
          onInput={(e) => setValid(validate((e.target as HTMLInputElement).value))}
        />
      )}
      <span className="qt-float-label">{label}</span>
      <span className="qt-float-check" aria-hidden>
        ✓
      </span>
    </label>
  );
}

const slots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

function nextWeekdays(count = 8) {
  const days: Date[] = [];
  const d = new Date();
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) days.push(new Date(d));
  }
  return days;
}

function BoardroomCalendar() {
  const embed = (import.meta.env.VITE_CALENDLY_URL as string | undefined) || "";
  const days = nextWeekdays();
  const [day, setDay] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  const chosen = days[day];
  const label = chosen.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div id="boardroom" className="qt-cal qt-ticket qt-frame relative mt-4 overflow-hidden p-4 md:mt-8 md:p-10 lg:p-14">
      <span className="qt-step-mark">02</span>
      <h3 className="relative font-nohemi text-[22px] font-light md:text-[44px]">
        Step 2: Secure Your Boardroom Session
      </h3>
      <p className="relative mt-4 max-w-2xl font-manrope text-[14px] leading-relaxed text-[color:var(--qt-muted)] md:text-[16px]">
        Booking below triggers a secure webhook payload of your exact calculator build and
        operational bottlenecks directly to our engineering team.
      </p>

      {embed ? (
        <iframe title="Boardroom calendar" src={embed} className="relative mt-10 h-[640px] w-full rounded-xl border bg-white" />
      ) : locked && time ? (
        <div className="lock-burst relative mt-10 rounded-2xl border border-gold/40 bg-gold/10 px-6 py-16 text-center">
          <p className="font-mariyam text-[56px] leading-none text-gold md:text-[80px]">locked</p>
          <p className="mt-4 font-nohemi text-[28px] font-light md:text-[40px]">{label}</p>
          <p className="mt-2 font-manrope text-[18px] text-gold">{time}</p>
          <p className="mx-auto mt-5 max-w-md font-manrope text-[13px] text-[color:var(--qt-muted)]">
            Locked — {label} at {time}
          </p>
        </div>
      ) : (
        <div className="relative mt-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-4 font-manrope text-[11px] tracking-[0.22em] text-gold uppercase">
              Select a strategy slot
            </p>
            <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-8 sm:gap-2">
              {days.map((d, i) => (
                <button
                  key={d.toISOString()}
                  type="button"
                  onClick={() => {
                    setDay(i);
                    setTime(null);
                    setLocked(false);
                  }}
                  className={`qt-day rounded-2xl px-2 py-4 text-center ${
                    i === day ? "bg-gold text-ink" : "qt-panel"
                  }`}
                >
                  <span className="block font-manrope text-[10px] tracking-widest uppercase">
                    {d.toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                  <span className="mt-1 block font-nohemi text-[26px] leading-none">{d.getDate()}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 lg:col-span-5 lg:grid-cols-1">
            {slots.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setTime(s);
                  setLocked(false);
                }}
                className={`qt-slot min-h-[50px] rounded-2xl px-3 py-3 text-left font-manrope text-[13px] md:px-5 md:py-4 md:text-[14px] ${
                  time === s ? "bg-gold text-ink" : "qt-panel"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="qt-submit-bar lg:col-span-12">
            <button
              type="button"
              disabled={!time}
              onClick={() => setLocked(true)}
              className="hero-cta-primary w-full max-w-none disabled:opacity-40"
            >
              <span className="hero-cta-shine" />
              {time ? `Confirm ${label} · ${time}` : "Choose a time to lock your session"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
