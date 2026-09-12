export const CALENDLY_URL =
  (import.meta.env.VITE_CALENDLY_URL ?? "").trim() ||
  "https://calendly.com/rana-fathi-rana/30min";

const THEMES = {
  dark: {
    background_color: "191d23",
    text_color: "f7f0ec",
    primary_color: "c49e7b",
  },
  light: {
    background_color: "d9cfc3",
    text_color: "1a1613",
    primary_color: "6a4e34",
  },
} as const;

export function calendlyWidgetUrl(
  base: string,
  prefill?: { name?: string; email?: string },
  theme: "dark" | "light" = "dark",
) {
  const url = new URL(base);
  const colors = THEMES[theme];
  url.searchParams.set("hide_gdpr_banner", "1");
  url.searchParams.set("background_color", colors.background_color);
  url.searchParams.set("text_color", colors.text_color);
  url.searchParams.set("primary_color", colors.primary_color);
  if (prefill?.name) url.searchParams.set("name", prefill.name);
  if (prefill?.email) url.searchParams.set("email", prefill.email);
  return url.toString();
}
