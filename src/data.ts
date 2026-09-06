import { photos } from "./media";

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Investment Strategies", href: "/strategies" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
];

export const strategies = [
  {
    slug: "wholesale",
    title: "Wholesale Deals",
    copy: "Deeply discounted off-market properties with heavy equity, ideal for quick assignments and cash buyer assignment margins.",
    photo: photos.deals,
    label: "Strategy",
  },
  {
    slug: "fix-flip",
    title: "Fix & Flip Projects",
    copy: "Properties requiring medium-to-heavy rehab, priced to hit target After Repair Value (ARV) and ROI metrics for flippers.",
    photo: photos.flip,
    label: "Strategy",
  },
  {
    slug: "brrrr",
    title: "Turnkey & BRRRR Rentals",
    copy: "Cash-flowing single-family and multi-family units in stable markets suited for long-term rental portfolios and wealth building.",
    photo: photos.brrr,
    label: "Strategy",
  },
  {
    slug: "creative",
    title: "Creative Finance Opportunities",
    copy: "Motivated sellers open to Subject-To, Seller Financing, or Lease Options when traditional cash offers don't fit.",
    photo: photos.creative,
    label: "Strategy",
  },
];

export const wecallValues = [
  "Carrier-Verified Data",
  "Predictive Dialing",
  "Daily QA Coaching",
  "Custom Buy-Box Scripts",
  "CRM-Ready Leads",
];

export const steps = [
  {
    n: "01",
    title: "Onboarding & Buy-Box Alignment",
    copy: "We define your target market, buy box parameters, custom scripting, and CRM setup within 48 hours.",
  },
  {
    n: "02",
    title: "Data Stacking & Dialer Deployment",
    copy: "We pull, clean, stack, and skip-trace high-intent data, loading it directly into multi-line predictive dialers.",
  },
  {
    n: "03",
    title: "Live Calling, QA, & Real-Time Coaching",
    copy: "Agents make thousands of dials daily. Every lead is audited in real-time against the 4 Pillars of Motivation by internal QA managers.",
  },
  {
    n: "04",
    title: "Motivated Leads & Offers Delivered",
    copy: "Verified leads with recordings, detailed property notes, and comps arrive directly in your CRM for your team (or assigned Acquisition Manager) to close.",
  },
];

export const services = [
  {
    n: "1",
    slug: "cold-calling",
    title: "Turnkey Cold Calling & Lead Generation",
    copy: "Includes data, skip tracing, QA, and follow-ups. Dedicated Egyptian cold calling assets trained to deliver pre-vetted, highly motivated seller leads with zero management overhead.",
    photo: photos.closings,
  },
  {
    n: "2",
    slug: "strategy-sourcing",
    title: "Strategy Sourcing",
    copy: "Wholesale, Fix & Flip, Rentals/BRRRR, and Creative Finance campaigns built around your buy box, market, and assignment math.",
    photo: photos.deals,
  },
  {
    n: "3",
    slug: "full-funnel",
    title: "Full-Funnel Real Estate VAs",
    copy: "Lead Managers and Acquisition Managers trained in U.S. real estate acquisitions — triaging, comps, verbal offers, and contract lockup.",
    photo: photos.close,
  },
];

export const stacks = [
  "Readymode",
  "CallTools",
  "GoHighLevel",
  "REsimpli",
  "Podio",
  "REISift",
  "BatchData",
];

export const pricingRows = [
  ["Target Strategy", "Wholesale / Flips / Rentals", "High-Yield Market Domination", "Tailored Scaled Operations"],
  ["Dedicated Cold Calling Assets", "1 Agent (160 hrs/mo)", "3 Dedicated Cold Callers", "1 to 10+ Custom Agents"],
  ["Dedicated Lead Manager VA", "—", "1 Dedicated Lead Manager", "Optional / Add-on"],
  ["Dedicated Acquisition Manager VA", "—", "1 Dedicated Acquisition Manager (5+ Closed Deals Experience)", "Optional / Add-on"],
  ["Proven Track Record Guarantee", "Vetted Specialists", "Battle-Tested Acquisition Lead (5+ Contracts Minimum Closed)", "Custom Vetting"],
  ["Custom Buy-Box Scripts", "Included", "Custom Scripts Tailored to Buy Box, Market & Company", "Included"],
  ["Performance Benchmark & Math", "10,000 Calls = 45 Leads Baseline", "Proven Average: 5 Closed Deals Every 90 Days", "Dynamic Math"],
  ["Measurable KPI Enhancements", "Daily KPI Reporting", "Measurable KPIs Real-Time Monitoring & Continuous Optimization", "Custom KPIs"],
  ["SMS Lead Generation Engine", "Optional Add-on (To Be Discussed)", "INCLUDED (Full Multi-Touch SMS Campaign Suite)", "Optional Add-on"],
  ["Free 30-Day Acquisition Replacement", "—", "Included (Zero-Risk Guarantee)", "Optional Add-on"],
  ["Support & Daily Coaching", "Standard Support", "24/7 Dedicated Support, Daily Coaching & 24/7 Follow-ups", "24/7 Support"],
  ["Monthly Stacked & Skip-Traced Data", "10,000 Records", "40,000 Stacked Records", "Dynamic (10k per agent)"],
  ["Multi-Line Predictive Dialer License", "Included", "Included", "Included"],
  ["4-Pillars QA Lead Verification", "Real-Time Monitoring", "Real-Time QA Voice Monitoring & Daily Coaching", "Included"],
  ["CRM Integration & Follow-up Workflows", "Included", "Included", "Included"],
  ["Allocations Available", "Limited", "2 Cohort Seats Left", "Open"],
];

export const tiers = [
  {
    name: "Starter",
    price: "$1,500",
    period: "/ month",
    tag: "The Engine for Solo Scalers & Lean Operators",
    cta: "Claim Starter Seat",
    seats: "Limited",
    featured: false,
    headline: "Starter Allocation",
    intro:
      "Stop wasting 20+ hours a week managing entry-level freelancers who burn your expensive data. The Starter tier deploys a fully managed, turn-key cold calling asset trained in U.S. real estate acquisitions directly into your pipeline.",
    points: [
      "1 Dedicated Full-Time Cold Calling Specialist (160 hrs/mo)",
      "10,000 fresh stacked & skip-traced records",
      "Custom scripts tailored to your buy box, market, and company identity",
      "Predictive dialer included, continuous recruitment, daily QA, daily lead flow, KPI reports",
      "The Math: 10,000 calls yields ~45 motivated leads",
      "Add-on: SMS Lead Generation Engine (discussed on your strategy call)",
    ],
  },
  {
    name: "Upcoming Millionaire",
    price: "$5,500",
    period: "/ month",
    tag: "Limited-time offer — regularly $6,000/mo",
    cta: "Lock In $5,500 Discount",
    seats: "2 Cohort Seats Left",
    featured: true,
    headline: "The Complete Acquisition Desk",
    intro:
      "3 Callers + 1 Lead Manager + 1 Acquisition Manager. Built for wholesalers, flippers, and buy-and-hold investors who want a hands-off deal sourcing machine.",
    points: [
      "Acquisition Manager with a verified track record of closing a minimum of 5 real estate contracts",
      "3 Dedicated Cold Calling Agents generating non-stop conversations",
      "1 Dedicated Lead Manager VA triaging calls, running preliminary comps, and qualifying sellers",
      "1 Dedicated Acquisition Specialist negotiating spreads, making verbal offers, and locking contracts",
      "Proven average of 5 closed contracts every 90 days",
      "45:1 Ratio: 10,000 Calls → ~45 Motivated Leads → 45 Cash Offers → 1–2 Closed Contracts",
      "Real-time QA voice auditing and daily agent coaching",
      "INCLUDED SMS Lead Generation Engine + 30-day free AM replacement + 24/7 support",
    ],
  },
  {
    name: "Custom & Scaler Engine",
    price: "Dynamic",
    period: "",
    tag: "Tailored Scaled Operations",
    cta: "Calculate Custom Desk",
    seats: "Open",
    featured: false,
    headline: "1 to 10+ Custom Agents",
    intro:
      "A custom-built offshore acquisition desk sized to your volume, markets, and close-rate math.",
    points: [
      "1 to 10+ custom agents",
      "Optional Lead Manager and Acquisition Manager add-ons",
      "Custom vetting and custom KPIs",
      "Dynamic stacked data — 10,000 records per agent",
      "Dialer, 4-Pillars QA, and CRM integration included",
    ],
  },
];

export const timeline = [
  {
    year: "7 yrs",
    title: "High-ticket sales leadership",
    copy: "WeCall was founded on over 7 years of high-ticket sales leadership — not a generic BPO or outsourcing middleman.",
    photo: photos.nightDesk,
  },
  {
    year: "3 yrs",
    title: "Inside U.S. acquisitions",
    copy: "Three dedicated years operating directly inside U.S. real estate acquisitions, dispositions, and real estate project management.",
    photo: photos.office,
  },
  {
    year: "Desk",
    title: "Egyptian calling desks",
    copy: "Turnkey offshore desks for wholesalers, flippers, and rental investors who need clean data and real seller motivation.",
    photo: photos.desks,
  },
  {
    year: "Now",
    title: "Capped investor seats",
    copy: "WeCall limits client intake to a capped number of active investor seats per quarter to protect lead quality and compliance.",
    photo: photos.seats,
  },
];

export const aboutCards = [
  {
    label: "Why investors choose us",
    title: "High-yield desk",
    copy: "Instead of managing entry-level freelancers, burning expensive lists, or dealing with unvetted data, WeCall operates as a high-yield extension of your acquisitions desk.",
  },
  {
    label: "Bundled execution",
    title: "Before it hits you",
    copy: "Every caller is paired with carrier-verified data, predictive dialing, daily QA, continuous coaching, custom buy-box scripting, and CRM integration before a lead touches your desk.",
  },
  {
    label: "Real-world QA",
    title: "4 Pillars",
    copy: "We know a tire-kicker who just wants to hear an offer from a truly distressed seller who needs to liquidate. Every script and QA checklist is built from real acquisition experience.",
  },
];
