type PageMeta = { title: string; description: string };

const HOME: PageMeta = {
  title: "Real Estate Cold Calling Desks for Investors | WeCall",
  description:
    "Managed offshore cold callers, lead managers and acquisition VAs for U.S. wholesalers and flippers. Skip-traced data, CRM-ready leads, 48-hour launch.",
};

const PAGES: Record<string, PageMeta> = {
  "/pricing": {
    title: "Cold Calling Desk Pricing From $1,500/mo | WeCall",
    description:
      "Starter Desk $1,500/mo with 10,000 skip-traced records. Full 5-person desk $5,500/mo. Dialer, data and daily QA included. 10 desks per quarter.",
  },
  "/services": {
    title: "Offshore Real Estate VAs & Cold Calling | WeCall",
    description:
      "Cold callers, lead managers and acquisition managers trained in U.S. real estate. Wholesale, flip, BRRRR and creative finance campaigns.",
  },
  "/apply": {
    title: "Apply for an Acquisition Desk | WeCall",
    description:
      "Configure your desk, see projected leads and monthly cost, then book a strategy session. Every application is reviewed within 24 hours.",
  },
};

export function applyPageMeta(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const meta = PAGES[path] ?? HOME;
  document.title = meta.title;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", meta.description);
}
