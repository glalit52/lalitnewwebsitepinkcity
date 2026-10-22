/**
 * Site content, taken from the Design canvas. Pages render from this data —
 * edit copy here rather than in components.
 *
 * Optional fields (`image`, `summary`, `price`, …) are facts the design marks
 * as still missing; leave them undefined and the UI omits them cleanly.
 */

export const person = {
  name: "Lalit Gautam",
  email: "lalit@sensegrass.com",
  domain: "lalitgautam.com",
  tagline: "A global citizen building startups and inspiring change worldwide.",
  intro:
    "Serial entrepreneur · Forbes 30 Under 30 · MIT 35 Under 35. Four awarded startups, one exit, $4.5M+ raised — and a mentor to founders going global.",
  introShort: "Forbes 30 Under 30 · MIT 35 Under 35 · 4 awarded startups · 1 exit",
  /** Path under /public, e.g. "/images/portrait.jpg". */
  portrait: undefined as string | undefined,
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/ventures", label: "Ventures" },
  { href: "/speaking", label: "Speaking" },
] as const;

export const bookCallHref = "/book-a-call";

export type Stat = { value: string; label: string };
export const stats: Stat[] = [
  { value: "45+", label: "Countries travelled" },
  { value: "100+", label: "Lectures given" },
  { value: "80+", label: "Awards" },
  { value: "$4.5M+", label: "Capital raised" },
];

export type Venture = {
  slug: string;
  initial: string;
  tint: string;
  years: string;
  acquired?: boolean;
  name: string;
  role: string;
  /** Card copy on the home page. */
  summary: string;
  /** Shorter card copy for phones. */
  short: string;
  /** Lead paragraph on the Ventures page. */
  lede: string;
  points: string[];
  url: string;
  domain: string;
  image?: string;
};

export const ventures: Venture[] = [
  {
    slug: "sensegrass",
    initial: "S",
    tint: "#1E4D4A",
    years: "Since 2018",
    name: "SenseGrass",
    role: "Founder & CEO",
    summary:
      "AI + IoT soil intelligence for precision farming — higher yields with less excess fertilizer.",
    short: "AI + IoT soil intelligence for precision farming.",
    lede: "An AI and IoT soil intelligence platform for precision farming and higher yields.",
    points: [
      "Combines sensors, drones, AI and IoT to raise agricultural productivity",
      "Built around a patented NPK soil sensor",
      "Helps farmers cut excess fertilizer in the soil",
      "By 2020: $3.7M+ raised and in use across 8 countries",
    ],
    url: "https://sensegrass.com",
    domain: "sensegrass.com",
  },
  {
    slug: "handscart",
    initial: "H",
    tint: "#C2604C",
    years: "2016 – 2018",
    acquired: true,
    name: "HandsCart",
    role: "Founder & CEO",
    summary: "A blockchain-based social marketplace for handmade designer products.",
    short: "Blockchain social commerce for handmade designer goods.",
    lede: "A blockchain-based social startup for e-commerce of handmade designer products.",
    points: [
      "Connected makers of handmade designer goods with buyers",
      "Social commerce built on blockchain",
      "Acquired in 2018 — my first exit",
    ],
    url: "https://handscart.com",
    domain: "handscart.com",
  },
  {
    slug: "connectborder",
    initial: "C",
    tint: "#22306B",
    years: "Since 2019",
    name: "ConnectBorder",
    role: "Founding Member",
    summary:
      "A nonprofit connecting global entrepreneurs and supporting international expansion.",
    short: "Nonprofit helping founders expand internationally.",
    lede: "A nonprofit connecting global entrepreneurs and supporting their international expansion.",
    points: ["Links founders across borders", "Supports startups expanding into new countries"],
    url: "https://connectborder.com",
    domain: "connectborder.com",
  },
];

export type Visa = { name: string; kind: string };
export const visas: Visa[] = [
  { name: "France", kind: "Startup visa" },
  { name: "Italy", kind: "Startup visa" },
  { name: "Spain", kind: "Startup visa" },
  { name: "United Kingdom", kind: "Visa" },
  { name: "United States", kind: "Visa" },
  { name: "Chile", kind: "Startup visa" },
  { name: "Finland", kind: "Residency" },
  { name: "Canada", kind: "Impact visa" },
];

export type Honour = { marker: string; title: string; desc: string };
export const honours: Honour[] = [
  { marker: "2017", title: "Forbes India 30 Under 30", desc: "For SenseGrass and its patented NPK sensor." },
  { marker: "2020", title: "Forbes 30 Under 30 Europe", desc: "SenseGrass: $3.7M+ raised, used in 8 countries." },
  // The design leaves this year blank ([YEAR]); "MIT" stands in until it is confirmed.
  { marker: "MIT", title: "MIT 35 Under 35", desc: "Among young innovators shaping technology." },
  { marker: "AI", title: "AI & Robotics Recognition", desc: "Sensors, drones, AI and IoT for farm productivity." },
];

export type LifeMoment = { caption: string; image?: string };
export const life: LifeMoment[] = [
  { caption: "Work smart" },
  { caption: "Party smarter" },
  { caption: "Celebrate the wins" },
];

export const affiliations = [
  "Santa Clara University",
  "Singularity University",
  "Solar Impulse Foundation",
  "Bridge to Billions",
  "Start-Up Chile",
  "Global Enterprise Network",
];

export const topics = [
  "The future of the SDGs",
  "Civic education in the Arab world",
  "Unsustainable business models in startups",
  "Human intelligence vs. artificial intelligence",
];

export const book = {
  title: "How to Win the Hardest Marathon",
  /** Two-line summary — not yet provided. */
  summary: undefined as string | undefined,
};

export const unTalk = {
  title: "United Nations headquarters, Geneva",
  /** Event name, year and a line about the talk — not yet provided. */
  description: undefined as string | undefined,
  image: undefined as string | undefined,
};

export type CallService = {
  id: "mini" | "standard" | "deep-dive";
  tag: string;
  name: string;
  desc: string;
  featured?: boolean;
  /** e.g. "₹2,500" — not yet provided. */
  price?: string;
};

export const callServices: CallService[] = [
  { id: "mini", tag: "Discovery call", name: "Mini Call", desc: "A short first conversation to see where I can help." },
  { id: "standard", tag: "30 min · Video", name: "1:1 Call", desc: "Focused advice on one decision, pitch or challenge.", featured: true },
  { id: "deep-dive", tag: "60 min · Video", name: "1:1 Deep Dive", desc: "Strategy, fundraising or international expansion, in depth." },
];

export const adviceAreas = [
  { title: "Strategy", line: "Sharpen direction, positioning and priorities." },
  { title: "Fundraising", line: "Pitch, investor targeting and seed to Series A." },
  { title: "Scaling", line: "Grow the team and operations without breaking." },
  { title: "Internationalization", line: "Enter new markets and set up abroad." },
  { title: "Exponential tech", line: "AI, IoT and deep tech — where it actually helps." },
  { title: "Immigration & startup visas", line: "Navigate startup visas and relocation." },
  { title: "Public speaking", line: "Craft and deliver talks that land." },
  { title: "Investment analysis", line: "Evaluate startups and deals with clear eyes." },
  { title: "Startup mentoring", line: "Avoid costly early mistakes." },
];

export const howItWorks = [
  { title: "Pick a call", line: "Choose the format that fits your question." },
  { title: "Book a slot", line: "Reserve a time and share some context." },
  { title: "Meet on video", line: "We talk it through and you leave with next steps." },
];
