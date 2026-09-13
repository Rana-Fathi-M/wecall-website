export type CalendlySchedule = {
  startTime?: string;
  timeZone?: string;
  eventUri?: string;
  inviteeUri?: string;
};

function walk(value: unknown, visit: (key: string, val: unknown) => void) {
  if (!value || typeof value !== "object") return;
  for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
    visit(key, val);
    if (val && typeof val === "object") walk(val, visit);
  }
}

export function parseCalendlyPayload(raw: unknown): CalendlySchedule {
  let data = raw;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      return {};
    }
  }

  const found: CalendlySchedule = {};
  walk(data, (key, val) => {
    if (typeof val !== "string" || !val.trim()) return;
    const name = key.toLowerCase().replace(/[_-]/g, "");
    if (!found.startTime && (name === "starttime" || name === "start" || name === "datetime") && !Number.isNaN(Date.parse(val))) {
      found.startTime = val;
    }
    if (!found.timeZone && (name === "timezone" || name === "tz")) found.timeZone = val;
    if (!found.eventUri && name === "uri" && val.includes("/scheduled_events/") && !val.includes("/invitees/")) {
      found.eventUri = val;
    }
    if (!found.inviteeUri && name === "uri" && val.includes("/invitees/")) found.inviteeUri = val;
  });
  return found;
}

function formatStamp(iso: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone,
    timeZoneName: "short",
  }).format(new Date(iso));
}

export function formatCalendlyTimes(schedule: CalendlySchedule) {
  const zone = schedule.timeZone || "America/New_York";
  if (!schedule.startTime || Number.isNaN(Date.parse(schedule.startTime))) {
    return {
      meetingDate: "Locked in Calendly",
      meetingTime: "See the Calendly confirmation email for the exact hour",
      timezone: zone,
      ownerTime: "Shown on the admin Calendly calendar",
      ownerTimezone: "Africa/Cairo",
    };
  }

  return {
    meetingDate: formatStamp(schedule.startTime, zone),
    meetingTime: formatStamp(schedule.startTime, zone),
    timezone: zone,
    ownerTime: formatStamp(schedule.startTime, "Africa/Cairo"),
    ownerTimezone: "Africa/Cairo",
  };
}
