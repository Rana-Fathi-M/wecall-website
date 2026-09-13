import emailjs from "@emailjs/browser";

export const BOOKING_INBOX = "admin@wecall247.com";

function envOr(name: keyof ImportMetaEnv, fallback: string) {
  const value = String(import.meta.env[name] ?? "").trim();
  return !value || value === "undefined" ? fallback : value;
}

const SERVICE_ID = envOr("VITE_EMAILJS_SERVICE_ID", "service_fc370iu");
const TEMPLATE_ID = envOr("VITE_EMAILJS_TEMPLATE_ID", "template_8m45r9j");
const PUBLIC_KEY = envOr("VITE_EMAILJS_PUBLIC_KEY", "7Gbb_t6HWGYegJa4G");

export type BookingPayload = {
  name: string;
  email: string;
  phone: string;
  startDate: string;
  market: string;
  bottleneck: string;
  meetingDate: string;
  meetingTime: string;
  timezone: string;
  ownerTimezone: string;
  ownerTime: string;
  callers: number;
  leadManager: boolean;
  closer: boolean;
  sms: string;
  price: number;
  dataIncluded: boolean;
};

type MailCopy = {
  toEmail: string;
  toName: string;
  title: string;
  headline: string;
  intro: string;
  replyTo: string;
};

let ready = false;

function ensureClient() {
  if (ready) return;
  emailjs.init({ publicKey: PUBLIC_KEY });
  ready = true;
}

function briefParams(data: BookingPayload) {
  return {
    name: data.name,
    email: data.email,
    phone: data.phone,
    start_date: data.startDate,
    market: data.market.trim() || "Not specified",
    bottleneck: data.bottleneck.trim() || "Not specified",
    meeting_date: data.meetingDate,
    meeting_time: data.meetingTime,
    timezone: data.timezone,
    owner_timezone: data.ownerTimezone,
    owner_time: data.ownerTime,
    callers: String(data.callers),
    lead_manager: data.leadManager ? "Yes" : "No",
    closer: data.closer ? "Yes" : "No",
    sms: data.sms,
    data_included: data.dataIncluded ? "Included" : "Excluded (−$200 / agent)",
    price: `$${data.price.toLocaleString()}/mo`,
  };
}

export function describeEmailError(err: unknown): string {
  if (err && typeof err === "object") {
    const rec = err as { text?: unknown; status?: unknown; message?: unknown };
    const text = typeof rec.text === "string" ? rec.text.trim() : "";
    const status = rec.status != null ? String(rec.status) : "";
    if (text && status) return `${status}: ${text}`;
    if (text) return text;
    if (typeof rec.message === "string" && rec.message.trim()) return rec.message;
  }
  return "EmailJS rejected the send.";
}

function sendOne(data: BookingPayload, copy: MailCopy, serviceId = SERVICE_ID) {
  ensureClient();
  return emailjs.send(
    serviceId,
    TEMPLATE_ID,
    {
      ...briefParams(data),
      to_email: copy.toEmail,
      to_name: copy.toName,
      title: copy.title,
      headline: copy.headline,
      intro: copy.intro,
      reply_to: copy.replyTo,
    },
    { publicKey: PUBLIC_KEY },
  );
}

async function sendWithFallback(data: BookingPayload, copy: MailCopy) {
  try {
    return await sendOne(data, copy);
  } catch (first) {
    if (SERVICE_ID === "default_service") throw first;
    return sendOne(data, copy, "default_service");
  }
}

function pause(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function sendAdminBrief(data: BookingPayload) {
  return sendWithFallback(data, {
    toEmail: BOOKING_INBOX,
    toName: "WeCall Admin",
    title: "New boardroom brief",
    headline: "session locked.",
    intro: "A new acquisition desk submitted a boardroom brief. Review it before the call.",
    replyTo: data.email.trim(),
  });
}

export function sendGuestConfirmation(data: BookingPayload) {
  const guest = data.email.trim();
  return sendWithFallback(data, {
    toEmail: guest,
    toName: data.name,
    title: "Your boardroom session is scheduled",
    headline: "session scheduled.",
    intro: "Your mapping session is locked. Keep this email for the details. WeCall will review the brief before the call.",
    replyTo: BOOKING_INBOX,
  });
}

export async function sendBookingEmail(data: BookingPayload) {
  await sendAdminBrief(data);
  await pause(1200);
  await sendGuestConfirmation(data);
}
