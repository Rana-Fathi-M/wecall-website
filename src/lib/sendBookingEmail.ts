import emailjs from "@emailjs/browser";

export const BOOKING_INBOX = "admin@wecall247.com";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_fc370iu";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_q1oycof";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "7Gbb_t6HWGYegJa4G";

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

function sendOne(data: BookingPayload, copy: MailCopy) {
  ensureClient();
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    ...briefParams(data),
    to_email: copy.toEmail,
    to_name: copy.toName,
    title: copy.title,
    headline: copy.headline,
    intro: copy.intro,
    reply_to: copy.replyTo,
  });
}

function pause(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function sendAdminBrief(data: BookingPayload) {
  return sendOne(data, {
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
  return sendOne(data, {
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
