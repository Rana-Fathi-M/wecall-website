export function calendlyEventName(raw: unknown): string {
  let data = raw;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      return "";
    }
  }
  if (!data || typeof data !== "object") return "";
  const event = (data as { event?: unknown }).event;
  return typeof event === "string" ? event : "";
}
