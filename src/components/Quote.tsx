import { useEffect, useMemo, useRef, useState, type FormEvent, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { sendBookingEmail } from "../lib/sendBookingEmail";

gsap.registerPlugin(ScrollTrigger);

const titleA = ["Secure", "Your", "Market", "Monopoly."];
const titleB = ["Build", "Your", "Acquisition", "Desk."];

const TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
];

const TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Phoenix",
  "America/Toronto",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Africa/Cairo",
  "Asia/Dubai",
  "Asia/Riyadh",
  "Asia/Karachi",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Australia/Sydney",
];

function detectedTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York";
  } catch {
    return "America/New_York";
  }
}

function timezoneLabel(zone: string) {
  try {
    const now = new Date();
    const offset =
      new Intl.DateTimeFormat("en-US", {
        timeZone: zone,
        timeZoneName: "shortOffset",
      })
        .formatToParts(now)
        .find((part) => part.type === "timeZoneName")?.value ?? "";
    const city = zone.split("/").pop()?.replace(/_/g, " ") ?? zone;
    return `${city} · ${offset}`;
  } catch {
    return zone;
  }
}

function formatDay(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

const OWNER_TIMEZONE = "Africa/Cairo";

function parseSlot(slot: string) {
  const match = slot.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return { hour: 9, minute: 0 };
  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const mer = match[3].toUpperCase();
  if (mer === "AM" && hour === 12) hour = 0;
  if (mer === "PM" && hour !== 12) hour += 12;
  return { hour, minute };
}

function zoneOffsetMs(utcMs: number, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(utcMs));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return asUtc - utcMs;
}

function wallTimeToDate(day: Date, slot: string, timeZone: string) {
  const { hour, minute } = parseSlot(slot);
  const utcGuess = Date.UTC(day.getFullYear(), day.getMonth(), day.getDate(), hour, minute);
  const instant = utcGuess - zoneOffsetMs(utcGuess, timeZone);
  return new Date(utcGuess - zoneOffsetMs(instant, timeZone));
}

function formatInZone(date: Date, timeZone: string) {
  return {
    date: date.toLocaleDateString("en-US", {
      timeZone,
      weekday: "long",
      month: "long",
      day: "numeric",
    }),
    time: date.toLocaleTimeString("en-US", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    zone: timezoneLabel(timeZone),
  };
}

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
            Dial in the desk, lock a boardroom day, confirm your timezone and time, then send the
            brief. We review every application within 24 hours.
          </p>
        </header>

        <div className="qt-build mt-10 lg:mt-14">
          <div className="qt-ticket qt-frame grid min-w-0 overflow-hidden lg:grid-cols-[minmax(0,1fr)_40px_minmax(0,0.9fr)]">
            <div className="min-w-0 space-y-3 p-4 md:space-y-4 md:p-8">
              <p className="font-manrope text-[13px] font-bold tracking-[0.28em] text-gold uppercase">
                Live Desk Configuration
              </p>

              <div className="qt-panel min-w-0 rounded-2xl p-4 md:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <label className="min-w-0 font-manrope text-[13px] font-semibold tracking-[0.16em] text-[color:var(--qt-muted)] uppercase md:text-[14px]">
                    Dedicated Acquisition Agents
                  </label>
                  <div className="flex shrink-0 items-center gap-3">
                    <button type="button" className="qt-stepper" onClick={() => setCallers((n) => Math.max(1, n - 1))}>
                      −
                    </button>
                    <span className="min-w-[2ch] text-center font-nohemi text-[40px] leading-none text-gold md:text-[52px]">
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

              <div className="grid grid-cols-1 gap-3">
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

              <div className="qt-panel min-w-0 rounded-2xl p-4 md:p-6">
                <p className="font-manrope text-[17px] font-semibold">Omnichannel SMS Suite</p>
                <p className="mt-1 font-manrope text-[14px] text-[color:var(--qt-muted)]">
                  Automated multi-touch sequences.
                </p>
                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setSms("discuss")}
                    className={`min-h-[48px] rounded-xl px-3 py-3 font-manrope text-[14px] font-medium leading-snug ${
                      sms === "discuss" ? "bg-gold text-ink" : "border border-[color:var(--qt-line)]"
                    }`}
                  >
                    Discuss on Consult
                  </button>
                  <button
                    type="button"
                    onClick={() => setSms("yes")}
                    className={`min-h-[48px] rounded-xl px-3 py-3 font-manrope text-[14px] font-medium leading-snug ${
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
              <p className="font-manrope text-[13px] font-bold tracking-[0.22em] text-gold uppercase">
                Your Projected Arsenal
              </p>
              <p className="mt-2 font-manrope text-[15px] leading-relaxed text-[color:var(--qt-muted)]">
                This is the desk your competitors wish they booked first.
              </p>
              <div className="qt-hud-price">
                <p className="font-manrope text-[11px] tracking-[0.2em] uppercase opacity-45">
                  Operating Capital
                </p>
                <p className="qt-price mt-2 flex min-w-0 flex-wrap items-end gap-1.5">
                  <span ref={priceRef} data-val="1500" className="font-nohemi leading-none font-semibold">
                    $1,500
                  </span>
                  <span className="mb-1 font-manrope text-[13px] text-[color:var(--qt-muted)]">/mo</span>
                </p>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-2.5">
                <HudRow label="Proprietary data" hint="Skip-traced records" valueRef={recordsRef} fallback="10,000" val="10000" />
                <HudRow label="Warm lead flow" hint="Projected / month" valueRef={leadsRef} fallback="~45" val="45" />
                <div className="qt-stat">
                  <div className="min-w-0">
                    <p className="qt-stat-label">90-day benchmark</p>
                    <p className="qt-stat-hint">Conversion target</p>
                  </div>
                  <p className="qt-stat-value">5 deals</p>
                </div>
              </div>
              <p className="mt-5 flex items-start gap-2 font-manrope text-[11px] leading-snug tracking-[0.12em] text-gold uppercase">
                <span className="seat-pulse mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-gold" />
                2 cohort seats left — reviewed in 24 hours
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
        />
      </div>
    </section>
  );
}

function BoardroomBooking({
  callers,
  leadManager,
  acq,
  sms,
  price,
}: {
  callers: number;
  leadManager: boolean;
  acq: boolean;
  sms: "yes" | "discuss";
  price: number;
}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const zones = useMemo(() => {
    const local = detectedTimezone();
    return [local, ...TIMEZONES.filter((z) => z !== local)];
  }, []);

  const [day, setDay] = useState<Date | undefined>();
  const [timezone, setTimezone] = useState("");
  const [time, setTime] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const conversion = useMemo(() => {
    if (!day || !timezone || !time) return null;
    const instant = wallTimeToDate(day, time, timezone);
    return {
      guest: formatInZone(instant, timezone),
      owner: formatInZone(instant, OWNER_TIMEZONE),
    };
  }, [day, timezone, time]);

  const step = !day ? 1 : !timezone ? 2 : !time ? 3 : 4;

  const onPickDay = (next?: Date) => {
    setDay(next);
    setTimezone("");
    setTime(null);
    setStatus("idle");
    setError("");
  };

  const onPickZone = (zone: string) => {
    setTimezone(zone);
    setTime(null);
    setStatus("idle");
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!day || !timezone || !time) return;

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    const startDate = String(form.get("start") || "");
    const market = String(form.get("market") || "");
    const bottleneck = String(form.get("bottleneck") || "");

    if (!isName(name) || !isEmail(email) || !isPhone(phone) || !isFilled(startDate) || !isLong(market) || !isLong(bottleneck)) {
      setError("Complete every field before locking the session.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      await sendBookingEmail({
        name,
        email,
        phone,
        startDate,
        market,
        bottleneck,
        meetingDate: formatDay(day),
        meetingTime: time,
        timezone: timezoneLabel(timezone),
        ownerTimezone: timezoneLabel(OWNER_TIMEZONE),
        ownerTime: conversion
          ? `${conversion.owner.date} at ${conversion.owner.time}`
          : "",
        callers,
        leadManager,
        closer: acq,
        sms: sms === "yes" ? "Inject into Build" : "Discuss on Consult",
        price,
      });
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send the booking. Try again.");
    }
  };

  return (
    <div id="boardroom" className="qt-book qt-ticket qt-frame relative mt-4 overflow-hidden p-4 md:mt-8 md:p-10 lg:p-12">
      <span className="qt-step-mark">0{step}</span>
      <p className="relative mb-2 flex items-center gap-2 font-manrope text-[11px] font-bold tracking-[0.22em] text-gold uppercase">
        <span className="seat-pulse inline-block h-2 w-2 rounded-full bg-gold" />
        2 cohort seats left — reviewed in 24 hours
      </p>
      <h3 className="relative font-nohemi text-[28px] leading-[0.95] font-semibold md:text-[48px]">
        Secure Your Boardroom Session
      </h3>
      <span className="relative mt-4 block h-px w-14 bg-gold/50" />
      <p className="relative mt-4 max-w-2xl font-manrope text-[16px] leading-relaxed font-medium text-[color:var(--qt-muted)] md:text-[19px]">
        Pick a weekday, confirm the timezone, lock a time, then send the brief. The full desk build
        travels with the booking.
      </p>

      <ol className="qt-book-steps relative mt-8">
        {[
          ["01", "Day"],
          ["02", "Timezone"],
          ["03", "Time"],
          ["04", "Details"],
        ].map(([n, label], i) => (
          <li key={label} className={step >= i + 1 ? "is-active" : ""}>
            <span>{n}</span>
            {label}
          </li>
        ))}
      </ol>

      {status === "sent" ? (
        <div className="lock-burst relative mt-10 rounded-2xl border border-gold/40 bg-gold/10 px-6 py-16 text-center">
          <p className="font-mariyam text-[56px] leading-none text-gold md:text-[80px]">locked</p>
          <p className="mt-4 font-nohemi text-[28px] font-semibold md:text-[40px]">{day ? formatDay(day) : ""}</p>
          <p className="mt-2 font-manrope text-[18px] font-medium text-gold">
            {conversion ? `${conversion.guest.time} · ${conversion.guest.zone}` : time}
          </p>
          {conversion ? (
            <p className="mt-2 font-manrope text-[15px] text-[color:var(--qt-muted)]">
              WeCall time: {conversion.owner.time} · {conversion.owner.zone}
            </p>
          ) : null}
          <p className="mx-auto mt-5 max-w-md font-manrope text-[13px] text-[color:var(--qt-muted)]">
            Your boardroom brief is in the inbox. We review applications within 24 hours.
          </p>
        </div>
      ) : (
        <div className="relative mt-10 grid gap-8 lg:grid-cols-12">
          <div className="qt-panel rounded-2xl p-4 md:p-6 lg:col-span-7">
            <p className="mb-4 font-manrope text-[13px] font-bold tracking-[0.22em] text-gold uppercase">
              01 · Select a day
            </p>
            <DayPicker
              mode="single"
              selected={day}
              onSelect={onPickDay}
              disabled={[{ before: today }, { dayOfWeek: [0, 6] }]}
              startMonth={today}
              className="qt-picker"
              animate
            />
          </div>

          <div className="min-w-0 space-y-5 lg:col-span-5">
            <div className={`qt-panel rounded-2xl p-4 md:p-6 ${day ? "" : "pointer-events-none opacity-40"}`}>
              <p className="mb-3 font-manrope text-[13px] font-bold tracking-[0.22em] text-gold uppercase">
                02 · Timezone
              </p>
              <label className="block">
                <span className="sr-only">Timezone</span>
                <select
                  className="qt-input qt-zone"
                  value={timezone}
                  disabled={!day}
                  onChange={(e) => onPickZone(e.target.value)}
                >
                  <option value="">Select your timezone</option>
                  {zones.map((zone) => (
                    <option key={zone} value={zone}>
                      {timezoneLabel(zone)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className={`qt-panel rounded-2xl p-4 md:p-6 ${timezone ? "" : "pointer-events-none opacity-40"}`}>
              <p className="mb-3 font-manrope text-[13px] font-bold tracking-[0.22em] text-gold uppercase">
                03 · Meeting time
              </p>
              <div className="grid grid-cols-2 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    disabled={!timezone}
                    onClick={() => {
                      setTime(slot);
                      setStatus("idle");
                    }}
                    className={`qt-slot min-h-[50px] rounded-xl px-3 py-3 text-left font-manrope text-[15px] font-medium ${
                      time === slot ? "bg-gold text-ink" : "border border-[color:var(--qt-line)]"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {conversion ? <TimeConversionCard guest={conversion.guest} owner={conversion.owner} /> : null}
            </div>
          </div>

          {time && day && timezone ? (
            <form className="qt-form relative space-y-4 lg:col-span-12 md:space-y-8" onSubmit={submit}>
              <div>
                <p className="font-manrope text-[13px] font-bold tracking-[0.22em] text-gold uppercase">
                  04 · Your details
                </p>
                <TimeConversionCard guest={conversion!.guest} owner={conversion!.owner} />
              </div>

              <div className="qt-form-fields grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-8">
                <Field label="Name" name="name" autoComplete="name" validate={isName} />
                <Field label="Email" name="email" type="email" autoComplete="email" validate={isEmail} />
                <Field label="Phone Number" name="phone" type="tel" autoComplete="tel" validate={isPhone} />
                <Field label="Target Start Date" name="start" type="date" validate={isFilled} />
              </div>

              <Field label="Target Market & Buy-Box" name="market" as="textarea" validate={isLong} />
              <Field label="Core Operational Bottleneck" name="bottleneck" as="textarea" validate={isLong} />

              {error ? (
                <p className="font-manrope text-[13px] text-red-400">{error}</p>
              ) : null}

              <div className="qt-submit-bar">
                <button type="submit" disabled={status === "sending"} className="hero-cta-primary w-full max-w-none disabled:opacity-40">
                  <span className="hero-cta-shine" />
                  {status === "sending" ? "Sending brief…" : "Submit Boardroom Brief"}
                </button>
              </div>
            </form>
          ) : null}
        </div>
      )}
    </div>
  );
}

function TimeConversionCard({
  guest,
  owner,
}: {
  guest: { date: string; time: string; zone: string };
  owner: { date: string; time: string; zone: string };
}) {
  return (
    <div className="mt-4 grid gap-2 rounded-2xl border border-gold/35 bg-gold/10 p-4">
      <div>
        <p className="font-manrope text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
          Your timezone
        </p>
        <p className="mt-1 font-manrope text-[16px] font-semibold leading-snug">
          {guest.time} · {guest.zone}
        </p>
        <p className="mt-0.5 font-manrope text-[13px] text-[color:var(--qt-muted)]">{guest.date}</p>
      </div>
      <div className="border-t border-gold/20 pt-3">
        <p className="font-manrope text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
          WeCall time · Cairo
        </p>
        <p className="mt-1 font-manrope text-[16px] font-semibold leading-snug">
          {owner.time} · {owner.zone}
        </p>
        <p className="mt-0.5 font-manrope text-[13px] text-[color:var(--qt-muted)]">{owner.date}</p>
      </div>
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
      className={`flex min-h-[72px] w-full min-w-0 items-center justify-between gap-4 rounded-2xl border p-4 text-left md:p-5 ${
        checked
          ? "border-gold/60 bg-gold/10"
          : "border-[color:var(--qt-line)] bg-[color:var(--qt-panel)]"
      }`}
    >
      <div className="min-w-0">
        <p className="font-manrope text-[15px] leading-snug font-semibold md:text-[17px]">{label}</p>
        <p className="mt-1 font-manrope text-[13px] leading-snug text-[color:var(--qt-muted)]">{subtext}</p>
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
    <label className={`qt-field qt-float group ${valid ? "is-valid" : ""} ${type === "date" ? "is-date" : ""}`}>
      {as === "textarea" ? (
        <textarea
          name={name}
          rows={4}
          required
          placeholder=" "
          className="qt-input qt-float-input"
          onInput={(e) => setValid(validate((e.target as HTMLTextAreaElement).value))}
        />
      ) : (
        <input
          name={name}
          type={type}
          required
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
