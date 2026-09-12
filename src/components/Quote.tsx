import { useCallback, useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sendBookingEmail } from "../lib/sendBookingEmail";
import { CALENDLY_URL } from "../lib/calendly";
import { CalendlyEmbed } from "./CalendlyEmbed";
import { ClaimSeatCta } from "./ClaimSeatCta";

gsap.registerPlugin(ScrollTrigger);

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
  const [includeData, setIncludeData] = useState(true);

  const agentRate = includeData ? 1500 : 1300;
  const price = callers * agentRate + (leadManager ? 1700 : 0) + (acq ? 2000 : 0);
  const records = callers * 10000;
  const leads = Math.round(callers * 45);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(max-width: 767px)").matches) return;

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
      if (window.matchMedia("(max-width: 767px)").matches) {
        el.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
        el.dataset.val = String(value);
        return;
      }
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

    tween(priceRef.current, price, "$");
    tween(recordsRef.current, records);
    tween(leadsRef.current, leads, "~");
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
            className="relative mt-4 font-nohemi text-[32px] leading-[0.92] font-semibold sm:text-[56px] md:mt-6 md:text-[84px]"
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
          <p className="qt-lede relative mx-auto mt-4 max-w-2xl font-manrope text-[16px] leading-relaxed font-medium text-[color:var(--qt-muted)] md:mt-6 md:text-[20px]">
            Dial in the desk, send the brief, then lock a live Calendly hour. Booked times stay
            taken. Canceled meetings open again. We review every application within 24 hours.
          </p>
        </header>

        <div className="qt-build mt-10 lg:mt-14">
          <div className="qt-ticket qt-frame grid min-w-0 overflow-hidden lg:grid-cols-[minmax(0,1fr)_40px_minmax(0,0.9fr)]">
            <div className="qt-config min-w-0 space-y-3 p-4 md:space-y-4 md:p-8">
              <p className="font-manrope text-[13px] font-bold tracking-[0.28em] text-gold uppercase">
                Live Desk Configuration
              </p>

              <div className="qt-panel min-w-0 rounded-2xl p-4 md:p-6">
                <div className="flex items-center justify-between gap-3">
                  <label className="min-w-0 font-manrope text-[11px] font-semibold tracking-[0.12em] text-[color:var(--qt-muted)] uppercase md:text-[14px] md:tracking-[0.16em]">
                    Dedicated Acquisition Agents
                  </label>
                  <div className="flex shrink-0 items-center gap-2 md:gap-3">
                    <button type="button" className="qt-stepper" onClick={() => setCallers((n) => Math.max(1, n - 1))}>
                      −
                    </button>
                    <span className="qt-count min-w-[2ch] text-center font-nohemi text-[28px] leading-none text-gold md:text-[52px]">
                      {callers}
                    </span>
                    <button type="button" className="qt-stepper" onClick={() => setCallers((n) => Math.min(10, n + 1))}>
                      +
                    </button>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-10 gap-1 md:mt-5 md:gap-1.5">
                  {Array.from({ length: 10 }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCallers(i + 1)}
                      className={`h-1.5 rounded-full md:h-2 ${i < callers ? "bg-gold" : "opacity-20"}`}
                      style={i < callers ? undefined : { background: "var(--qt-fg)" }}
                      aria-label={`${i + 1} agents`}
                    />
                  ))}
                </div>
              </div>

              <div className="qt-mods grid grid-cols-2 gap-2 md:gap-3">
                <ToggleModule
                  label="Dedicated Lead Manager"
                  subtext="CRM + dialer included · $1,700"
                  checked={leadManager}
                  onChange={setLeadManager}
                />
                <ToggleModule
                  label="Senior Acquisition Closer"
                  subtext="CRM included · $2,000"
                  checked={acq}
                  onChange={setAcq}
                />
              </div>

              <div className="qt-mods grid grid-cols-2 gap-2 md:gap-3">
                <ToggleModule
                  label="Data included"
                  subtext="Skip-traced records · $1,500 / agent"
                  checked={includeData}
                  onChange={setIncludeData}
                />
                <ToggleModule
                  label="Exclude data"
                  subtext="−$200 / agent · $1,300 total"
                  checked={!includeData}
                  onChange={(on) => setIncludeData(!on)}
                />
              </div>

              <div className="qt-panel qt-sms-panel min-w-0 rounded-2xl p-4 md:p-6">
                <p className="font-manrope text-[14px] font-semibold md:text-[17px]">Omnichannel SMS Suite</p>
                <p className="qt-sms-copy mt-1 font-manrope text-[12px] text-[color:var(--qt-muted)] md:text-[14px]">
                  Automated multi-touch sequences.
                </p>
                <div className="qt-sms mt-3 grid grid-cols-2 gap-2 md:mt-4">
                  <button
                    type="button"
                    onClick={() => setSms("discuss")}
                    className={`min-h-[40px] rounded-xl px-2 py-2 font-manrope text-[11px] font-medium leading-snug md:min-h-[48px] md:px-3 md:py-3 md:text-[14px] ${
                      sms === "discuss" ? "bg-gold text-ink" : "border border-[color:var(--qt-line)]"
                    }`}
                  >
                    Discuss on Consult
                  </button>
                  <button
                    type="button"
                    onClick={() => setSms("yes")}
                    className={`min-h-[40px] rounded-xl px-2 py-2 font-manrope text-[11px] font-medium leading-snug md:min-h-[48px] md:px-3 md:py-3 md:text-[14px] ${
                      sms === "yes" ? "bg-gold text-ink" : "border border-[color:var(--qt-line)]"
                    }`}
                  >
                    Inject into Build
                  </button>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="qt-perforation absolute inset-y-8 left-1/2 w-2.5 -translate-x-1/2" />
            </div>

            <aside className="qt-hud qt-hud-panel relative m-3 min-w-0 overflow-hidden lg:m-5 lg:ml-0">
              <span className="qt-hud-step">02</span>
              <p className="font-manrope text-[11px] font-bold tracking-[0.18em] text-gold uppercase md:text-[13px] md:tracking-[0.22em]">
                Your Projected Arsenal
              </p>
              <p className="qt-hud-lede mt-2 font-manrope text-[15px] leading-relaxed text-[color:var(--qt-muted)]">
                This is the desk your competitors wish they booked first.
              </p>
              <div className="qt-hud-price">
                <p className="font-manrope text-[10px] tracking-[0.18em] uppercase opacity-45 md:text-[11px] md:tracking-[0.2em]">
                  Operating Capital
                </p>
                <p className="qt-price mt-1 flex min-w-0 flex-wrap items-end gap-1.5 md:mt-2">
                  <span ref={priceRef} data-val="1500" className="font-nohemi leading-none font-semibold">
                    $1,500
                  </span>
                  <span className="mb-1 font-manrope text-[12px] text-[color:var(--qt-muted)] md:text-[13px]">/mo</span>
                </p>
              </div>
              <div className="qt-hud-stats mt-3 grid grid-cols-2 gap-2 md:mt-5 md:grid-cols-1 md:gap-2.5">
                <HudRow label="Proprietary data" hint="Skip-traced records" valueRef={recordsRef} fallback="10,000" val="10000" />
                <HudRow label="Warm lead flow" hint="Projected / month" valueRef={leadsRef} fallback="~45" val="45" />
                <div className="qt-stat qt-stat-wide">
                  <div className="min-w-0">
                    <p className="qt-stat-label">90-day benchmark</p>
                    <p className="qt-stat-hint">Conversion target</p>
                  </div>
                  <p className="qt-stat-value">5 deals</p>
                </div>
              </div>
              <p className="mt-3 flex items-start gap-2 font-manrope text-[10px] leading-snug tracking-[0.1em] text-gold uppercase md:mt-5 md:text-[11px] md:tracking-[0.12em]">
                <span className="seat-pulse mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-gold" />
                2 of 10 seats left — reviewed in 24 hours
              </p>
            </aside>
          </div>
        </div>

        <BoardroomBooking
          callers={callers}
          leadManager={leadManager}
          acq={acq}
          sms={sms}
          price={price}
          includeData={includeData}
        />
      </div>
    </section>
  );
}

type Brief = {
  name: string;
  email: string;
  phone: string;
  market: string;
  bottleneck: string;
};

function BoardroomBooking({
  callers,
  leadManager,
  acq,
  sms,
  price,
  includeData,
}: {
  callers: number;
  leadManager: boolean;
  acq: boolean;
  sms: "yes" | "discuss";
  price: number;
  includeData: boolean;
}) {
  const [view, setView] = useState(1);
  const [brief, setBrief] = useState<Brief | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const locked = useRef(false);

  const goTo = (n: number) => {
    if (n === 1 || (n === 2 && brief)) setView(n);
  };

  const continueToCalendar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const next: Brief = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      market: String(form.get("market") || ""),
      bottleneck: String(form.get("bottleneck") || ""),
    };

    if (!isName(next.name) || !isEmail(next.email) || !isPhone(next.phone)) {
      setError("Name, email, and phone are required before a time can lock.");
      return;
    }

    setError("");
    setBrief(next);
    setView(2);
  };

  const onScheduled = useCallback(async () => {
    if (!brief || locked.current) return;
    locked.current = true;
    setStatus("sending");
    try {
      await sendBookingEmail({
        name: brief.name,
        email: brief.email,
        phone: brief.phone,
        startDate: "Locked in Calendly",
        market: brief.market,
        bottleneck: brief.bottleneck,
        meetingDate: "Confirmed in Calendly",
        meetingTime: "See Calendly confirmation email",
        timezone: "Invitee timezone in Calendly",
        ownerTimezone: "Africa/Cairo",
        ownerTime: "Shown on the admin Calendly calendar",
        callers,
        leadManager,
        closer: acq,
        sms: sms === "yes" ? "Inject into Build" : "Discuss on Consult",
        price,
        dataIncluded: includeData,
      });
    } catch {
      /* Slot is already locked in Calendly — still confirm on-site. */
    }
    setStatus("sent");
  }, [acq, brief, callers, includeData, leadManager, price, sms]);

  return (
    <div id="boardroom" className="qt-book qt-ticket qt-frame relative mt-4 overflow-x-clip p-4 md:mt-8 md:p-10 lg:p-12">
      <span className="qt-step-mark">0{view}</span>
      <p className="relative mb-2 flex items-center gap-2 font-manrope text-[11px] font-bold tracking-[0.22em] text-gold uppercase">
        <span className="seat-pulse inline-block h-2 w-2 rounded-full bg-gold" />
        2 of 10 seats left — reviewed in 24 hours
      </p>
      <h3 className="relative font-nohemi text-[28px] leading-[0.95] font-semibold md:text-[48px]">
        Secure Your Boardroom Session
      </h3>
      <span className="relative mt-4 block h-px w-14 bg-gold/50" />
      <p className="relative mt-4 max-w-2xl font-manrope text-[16px] leading-relaxed font-medium text-[color:var(--qt-muted)] md:text-[19px]">
        The admin sets open hours in Calendly. When you take a slot it locks for everyone. If the
        meeting is canceled, that hour shows again on this page.
      </p>

      <ol className="qt-book-steps qt-book-steps-2 relative mt-8">
        {[
          ["01", "Details"],
          ["02", "Schedule"],
        ].map(([n, label], i) => {
          const index = i + 1;
          const current = view === index;
          const done = index === 1 ? !!brief : status === "sent";
          return (
            <li key={label} className={`${current ? "is-active is-current" : ""} ${done ? "is-done" : ""}`}>
              <button type="button" disabled={index === 2 && !brief} onClick={() => goTo(index)}>
                <span>{done && !current ? "✓" : n}</span>
                {label}
              </button>
            </li>
          );
        })}
      </ol>

      {status === "sent" ? (
        <div className="lock-burst relative mt-10 rounded-2xl border border-gold/40 bg-gold/10 px-6 py-16 text-center">
          <p className="font-mariyam text-[56px] leading-none text-gold md:text-[80px]">locked</p>
          <p className="mt-4 font-nohemi text-[28px] font-semibold md:text-[40px]">Time reserved</p>
          <p className="mt-2 font-manrope text-[16px] font-medium text-gold">
            Calendly emailed the invite. That hour is blocked until it is canceled.
          </p>
          <p className="mx-auto mt-5 max-w-md font-manrope text-[13px] text-[color:var(--qt-muted)]">
            Your boardroom brief is in the inbox. Cancel in Calendly and the slot reopens here for
            the next investor.
          </p>
        </div>
      ) : (
        <div className="qt-wizard relative mt-8">
          {view === 1 ? (
            <form className="qt-form qt-wizard-pane mx-auto max-w-3xl space-y-4 md:space-y-7" onSubmit={continueToCalendar}>
              <p className="font-manrope text-[13px] font-bold tracking-[0.22em] text-gold uppercase">
                Step 01 · Send the brief
              </p>
              <p className="font-manrope text-[15px] text-[color:var(--qt-muted)]">
                Name, email, and phone first. Then Calendly shows only hours the admin left open.
              </p>

              <div className="qt-form-fields grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-8">
                <Field label="Name" name="name" autoComplete="name" validate={isName} />
                <Field label="Email" name="email" type="email" autoComplete="email" validate={isEmail} />
                <Field label="Phone Number" name="phone" type="tel" autoComplete="tel" validate={isPhone} />
              </div>

              <Field label="Target Market & Buy-Box (optional)" name="market" as="textarea" required={false} validate={() => true} />
              <Field label="Core Operational Bottleneck (optional)" name="bottleneck" as="textarea" required={false} validate={() => true} />

              {error ? <p className="font-manrope text-[13px] text-red-400">{error}</p> : null}

              <div className="qt-submit-bar">
                <ClaimSeatCta type="submit" wide busyLabel="Continue to live times" />
              </div>
            </form>
          ) : null}

          {view === 2 && brief ? (
            <div className="qt-wizard-pane mx-auto max-w-3xl">
              <p className="font-manrope text-[13px] font-bold tracking-[0.22em] text-gold uppercase">
                Step 02 · Lock a live hour
              </p>
              <p className="mt-2 mb-5 font-manrope text-[15px] text-[color:var(--qt-muted)]">
                These times come from the admin calendar. Taken hours stay hidden. Canceled hours
                return automatically.
              </p>

              {CALENDLY_URL ? (
                <CalendlyEmbed
                  url={CALENDLY_URL}
                  name={brief.name}
                  email={brief.email}
                  onScheduled={onScheduled}
                />
              ) : (
                <div className="rounded-2xl border border-gold/35 bg-gold/10 px-5 py-10 text-center">
                  <p className="font-nohemi text-[22px] font-semibold">Calendar not connected yet</p>
                  <p className="mx-auto mt-3 max-w-md font-manrope text-[14px] text-[color:var(--qt-muted)]">
                    Add the admin Calendly event link as <span className="text-gold">VITE_CALENDLY_URL</span>{" "}
                    so live availability can lock and reopen on this page.
                  </p>
                </div>
              )}

              <div className="qt-wizard-nav">
                <button type="button" className="qt-back" onClick={() => goTo(1)}>
                  Back
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function HudRow({
  label,
  hint,
  valueRef,
  fallback,
  val,
}: {
  label: string;
  hint: string;
  valueRef: RefObject<HTMLSpanElement | null>;
  fallback: string;
  val: string;
}) {
  return (
    <div className="qt-stat">
      <div className="min-w-0">
        <p className="qt-stat-label">{label}</p>
        <p className="qt-stat-hint">{hint}</p>
      </div>
      <span ref={valueRef} data-val={val} className="qt-stat-value">
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
      className={`qt-mod flex min-h-0 w-full min-w-0 items-center justify-between gap-3 rounded-2xl border p-3 text-left md:min-h-[72px] md:gap-4 md:p-5 ${
        checked
          ? "border-gold/60 bg-gold/10"
          : "border-[color:var(--qt-line)] bg-[color:var(--qt-panel)]"
      }`}
    >
      <div className="min-w-0">
        <p className="font-manrope text-[12px] leading-snug font-semibold md:text-[17px]">{label}</p>
        <p className="qt-mod-copy mt-1 hidden font-manrope text-[13px] leading-snug text-[color:var(--qt-muted)] md:block">{subtext}</p>
      </div>
      <span className={`qt-switch ${checked ? "is-on" : ""}`} aria-hidden>
        <span className="qt-switch-knob" />
      </span>
    </button>
  );
}

const isName = (v: string) => v.trim().length >= 2;
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isPhone = (v: string) => v.replace(/\D/g, "").length >= 10;

function Field({
  label,
  name,
  type = "text",
  as,
  autoComplete,
  validate,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  as?: "textarea";
  autoComplete?: string;
  validate: (value: string) => boolean;
  required?: boolean;
}) {
  const [valid, setValid] = useState(false);

  return (
    <label className={`qt-field qt-float group ${valid ? "is-valid" : ""} ${type === "date" ? "is-date" : ""}`}>
      {as === "textarea" ? (
        <textarea
          name={name}
          rows={4}
          required={required}
          placeholder=" "
          className="qt-input qt-float-input"
          onInput={(e) => setValid(validate((e.target as HTMLTextAreaElement).value))}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
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
