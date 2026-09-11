import emailjs from "@emailjs/browser";

export const BOOKING_INBOX = "abdelrahmanreda303@gmail.com";

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

function requiredEnv(name: "VITE_EMAILJS_SERVICE_ID" | "VITE_EMAILJS_TEMPLATE_ID" | "VITE_EMAILJS_PUBLIC_KEY") {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Missing ${name}. Add it to your .env file to send bookings.`);
  }
  return value;
}

export async function sendBookingEmail(data: BookingPayload) {
  return emailjs.send(
    requiredEnv("VITE_EMAILJS_SERVICE_ID"),
    requiredEnv("VITE_EMAILJS_TEMPLATE_ID"),
    {
      to_email: BOOKING_INBOX,
      name: data.name,
      email: data.email,
      phone: data.phone,
      start_date: data.startDate,
      market: data.market,
      bottleneck: data.bottleneck,
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
    },
    { publicKey: requiredEnv("VITE_EMAILJS_PUBLIC_KEY") },
  );
}
