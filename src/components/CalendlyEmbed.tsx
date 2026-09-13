import { useEffect, useRef } from "react";
import { calendlyWidgetUrl } from "../lib/calendly";
import { calendlyEventName } from "../lib/calendlyEvent";
import { useTheme } from "../context/ThemeContext";

type Props = {
  url: string;
  name?: string;
  email?: string;
  onScheduled: () => void;
};

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
        prefill?: { name?: string; email?: string };
      }) => void;
    };
  }
}

const SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

function loadScript() {
  const existing = document.querySelector<HTMLScriptElement>("script[data-calendly]");
  if (existing) {
    return existing.dataset.ready === "true"
      ? Promise.resolve()
      : new Promise<void>((resolve) => existing.addEventListener("load", () => resolve(), { once: true }));
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT;
    script.async = true;
    script.dataset.calendly = "true";
    script.onload = () => {
      script.dataset.ready = "true";
      resolve();
    };
    script.onerror = () => reject(new Error("Could not load Calendly."));
    document.body.appendChild(script);
  });
}

export function CalendlyEmbed({ url, name, email, onScheduled }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const onScheduledRef = useRef(onScheduled);
  const sent = useRef(false);
  const { theme } = useTheme();
  onScheduledRef.current = onScheduled;

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    let gone = false;
    node.innerHTML = "";
    sent.current = false;

    loadScript()
      .then(() => {
        if (gone || !host.current || !window.Calendly) return;
        window.Calendly.initInlineWidget({
          url: calendlyWidgetUrl(url, { name, email }, theme),
          parentElement: host.current,
          prefill: { name, email },
        });
      })
      .catch(() => undefined);

    const onMessage = (event: MessageEvent) => {
      const origin = String(event.origin || "");
      if (origin && !origin.includes("calendly.com")) return;
      if (calendlyEventName(event.data) !== "calendly.event_scheduled") return;
      if (sent.current) return;
      sent.current = true;
      onScheduledRef.current();
    };

    window.addEventListener("message", onMessage);

    return () => {
      gone = true;
      window.removeEventListener("message", onMessage);
      node.innerHTML = "";
    };
  }, [url, name, email, theme]);

  return <div ref={host} className="qt-calendly" />;
}
