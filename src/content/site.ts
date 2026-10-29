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
    "Serial entrepreneur · TEDx speaker · Forbes 30 Under 30 · MIT 35 Under 35. Founded 2 ventures, one exit, $5.5M+ raised — and a mentor to founders going global.",
  introShort: "Serial entrepreneur · TEDx speaker · Forbes 30 Under 30 · MIT 35 Under 35 · 1 exit · $5.5M+ raised",
  /** Path under /public, e.g. "/images/portrait.jpg". */
  portrait: undefined as string | undefined,
};

/**
 * The hero's jharokha window. Photo: "East facade of the Hawa Mahal" by Dudva,
 * Wikimedia Commons, CC0 (public domain) — cropped to the arch.
 */
export const heroWindow = {
  image: "/images/hawa-mahal.jpg",
  alt: "The honeycomb facade of Hawa Mahal, the Palace of Winds, in Jaipur",
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/ventures", label: "Ventures" },
  { href: "/speaking", label: "Speaking" },
] as const;

export const bookCallHref = "/book-a-call";

export type Stat = { value: string; label: string };
export const stats: Stat[] = [
  { value: "70+", label: "Countries travelled" },
  { value: "100+", label: "Lectures given" },
  { value: "80+", label: "Awards" },
  { value: "$5.5M+", label: "Capital raised" },
];

export type Venture = {
  slug: string;
  initial: string;
  tint: string;
  /** Eyebrow on the Ventures page. */
  years: string;
  /** Eyebrow on the home page cards (the brief dates these differently). */
  teaserYears: string;
  acquired?: boolean;
  /** Shown in the home page "Three doors" teaser. */
  onHome: boolean;
  name: string;
  role: string;
  /** Card copy on the home page. */
  summary: string;
  /** Shorter card copy for phones. */
  short: string;
  /** Lead paragraph on the Ventures page. */
  lede: string;
  points: string[];
  /** Website — not yet provided for every venture; the "Visit" button is hidden without it. */
  url?: string;
  domain?: string;
  image?: string;
};

export const ventures: Venture[] = [
  {
    slug: "sensegrass",
    initial: "S",
    tint: "#1E4D4A",
    years: "Since 2021",
    teaserYears: "Since 2021",
    onHome: true,
    name: "SenseGrass",
    role: "Founder & CEO",
    summary:
      "SenseGrass is the AI-powered platform transforming underground signals into climate intelligence for enterprises — for a better planet.",
    short: "AI turning underground signals into climate intelligence.",
    lede: "An artificial intelligence platform for a sustainable planet.",
    points: [
      "Combines sensors, drones, AI and IoT to raise agricultural productivity",
      "Built around a patented NPK soil sensor",
      "Helps farmers cut excess fertilizer in the soil",
      "By 2030: $3.7M+ raised and in use across 8 countries",
    ],
    url: "https://sensegrass.com",
    domain: "sensegrass.com",
  },
  {
    slug: "handscart",
    initial: "H",
    tint: "#C2604C",
    years: "2015 – 2019",
    teaserYears: "2015 – 2020",
    acquired: true,
    onHome: true,
    name: "HandsCart",
    role: "Founder & CEO",
    summary: "A blockchain-based social marketplace for sustainable designer products.",
    short: "Blockchain social marketplace for sustainable designer goods.",
    lede: "A blockchain-based social startup for e-commerce of sustainable designer products.",
    points: [
      "Connected makers of handmade designer goods with buyers",
      "Social commerce built on blockchain",
      "Acquired in 2020 — my first exit",
    ],
    url: "https://handscart.com",
    domain: "handscart.com",
  },
  {
    slug: "connectborder",
    initial: "C",
    tint: "#22306B",
    years: "Since 2019",
    teaserYears: "Since 2020",
    onHome: true,
    name: "ConnectBorder",
    role: "Founding Member",
    summary:
      "A nonprofit connecting global entrepreneurs and supporting international expansion.",
    short: "Nonprofit helping founders expand internationally.",
    lede: "A platform to connect global entrepreneurs and support their international expansion.",
    points: ["Links founders across borders", "Supports startups expanding into new countries"],
    url: "https://connectborder.com",
    domain: "connectborder.com",
  },
  {
    slug: "anvita",
    initial: "A",
    tint: "#4A68B0",
    years: "Since 2026",
    teaserYears: "Since 2026",
    onHome: false,
    name: "Anvita",
    role: "Founder",
    summary: "A control plane for autonomous agents for enterprises.",
    short: "A control plane for enterprise AI agents.",
    lede: "A control plane for autonomous agents for enterprises.",
    points: [],
    url: "https://anvita.ai",
    domain: "anvita.ai",
  },
];

export type Visa = { name: string; kind: string };
export const visas: Visa[] = [
  { name: "United States", kind: "O-1A & EB-1A" },
  { name: "Canada", kind: "Impact startup PR" },
  { name: "United Kingdom", kind: "Global Innovator visa" },
  { name: "Chile", kind: "Startup visa" },
  { name: "France", kind: "Passeport Talent" },
  { name: "Finland", kind: "Startup visa" },
  { name: "Italy", kind: "Innovator startup visa" },
  { name: "Singapore", kind: "Startup visa" },
  { name: "Spain", kind: "Startup visa" },
  { name: "Australia", kind: "National Innovation visa" },
];

/** `marker` is the big display line — a title, not a year. */
export type Honour = { marker: string; title: string; desc: string };
export const honours: Honour[] = [
  {
    marker: "French Tech Ticket",
    title: "HandsCart",
    desc: "Awarded the Passeport Talent, SOCAP and the Ashoka – Robert Bosch fellowship.",
  },
  {
    marker: "Forbes 30 Under 30",
    title: "Secured a place on the Europe and India lists",
    desc: "SenseGrass: $3.7M+ raised, used in 8 countries.",
  },
  { marker: "MIT", title: "MIT 35 Under 35", desc: "Among young innovators shaping technology." },
  {
    marker: "Nasdaq",
    title: "Published at the Nasdaq center, New York",
    desc: "Recognised as Impactful Leader of the Year, and SenseGrass as a Top 100 impact company.",
  },
  {
    marker: "TEDx",
    title: "Presented a TEDx talk",
    desc: "After turning down two invitations, I gave my first TEDx talk in Taj Nagari (Agra).",
  },
];

export type LifeMoment = { caption: string; image?: string };
/**
 * Stand-in photos until Lalit's own are supplied — CC0 (public domain) Unsplash
 * images via Wikimedia Commons: "Businessman working and writing notes in office",
 * "Cheering concertgoers" and "A Firework Bouquet". Replace the files in
 * /public/images/life/ (3:4 portrait) to swap them.
 */
export const life: LifeMoment[] = [
  { caption: "Work smart", image: "/images/life/work-smart.jpg" },
  { caption: "Party smarter", image: "/images/life/party-smarter.jpg" },
  { caption: "Celebrate the wins", image: "/images/life/celebrate-the-wins.jpg" },
];

export const affiliations = [
  "Startup India",
  "Santa Clara University",
  "Singularity University",
  "Solar Impulse Foundation",
  "Bridge to Billions",
  "Start-Up Chile",
  "Global Enterprise Network",
];

export const advocacy =
  "Promoting social impact, environmental sustainability, individual rights and AI — on stage and off it.";

export const topics = [
  "The future of AI in impact",
  "GTM and scaling methodology in sales",
  "Unsustainable business models in startups — and errors in product–market fit",
  "Human intelligence vs. artificial intelligence",
];

export type Book = { title: string; summary?: string; /** Where to buy or read about it. */ url?: string };

/**
 * Titles scroll one by one in the book window; `featuredBook` (the AI book)
 * heads the book section text. Sources: lalitgautam.com "Publications",
 * Notion Press (Jun 2025) and White Falcon Publishing (Jul 2026).
 */
export const books: Book[] = [
  {
    title: "Before We Became Optional",
    summary:
      "How humans created their most powerful competitor — and what happens to humanity when intelligence becomes abundant.",
    url: "https://store.whitefalconpublishing.com/products/before-we-became-optional-how-humans-created-their-most-powerful-competitor",
  },
  { title: "Founders at the Edge" },
  { title: "How to Win the Hardest Marathon" },
];
export const featuredBook: Book = books[0];

export const unTalk = {
  title: "United Nations, Geneva",
  description:
    "Spoke at the High-Level Dialogue on Innovation for Sustainable Development (2020), presenting “Harnessing Soil Intelligence for a Resilient and Regenerative Food System”.",
  image: "/images/un-geneva-2020.jpg" as string | undefined,
};

export const tedxTalk = {
  eyebrow: "TEDx",
  title: "Power of Being Alone",
  /** TEDxTajNagri, Agra, 16 January 2022 (published by TEDx Talks, Dec 2022). */
  event: "TEDxTajNagri · Agra · 2022",
  description: "After turning down two invitations, I took the TEDx stage for the first time in Taj Nagari — on the power of being alone.",
  /** Still from the official TEDx Talks video. */
  image: "/images/tedx-tajnagri.jpg" as string | undefined,
  watchUrl: "https://www.youtube.com/watch?v=zjSQV-ay-kM" as string | undefined,
  eventUrl: "https://www.ted.com/tedx/events/44663",
};

export type MediaItem = {
  outlet: string;
  title: string;
  url: string;
  date?: string;
  /** Path under /public; cards without one show the outlet name instead. */
  image?: string;
  /** Link label; defaults to "Read the story". */
  cta?: string;
};

/**
 * "In the media" strip on the Speaking page. Add articles here. Every link was
 * checked to load and to be about Lalit / SenseGrass; images are each article's
 * own preview (og:image), saved under /public/images/media.
 */
export const media: MediaItem[] = [
  {
    outlet: "Forbes",
    title: "Forbes 30 Under 30 Europe 2020 — Manufacturing & Industry: Sensegrass",
    url: "https://www.forbes.com/profile/sensegrass/",
    date: "Mar 2020",
    image: "/images/media/forbes-30u30-europe.jpg",
    cta: "View the profile",
  },
  {
    outlet: "MIT Technology Review",
    title: "Lalit Gautam — Innovators Under 35",
    url: "https://www.innovatorsunder35.com/the-list/lalit-gautam/",
    date: "2020",
    image: "/images/media/mit-innovators-under-35.jpg",
    cta: "View the profile",
  },
  {
    outlet: "TEDx Talks",
    title: "Power Of Being Alone | Dr. Lalit Gautam | TEDxTajNagri",
    url: "https://www.youtube.com/watch?v=zjSQV-ay-kM",
    date: "Dec 2022",
    image: "/images/tedx-tajnagri.jpg",
    cta: "Watch the talk",
  },
  {
    outlet: "Forbes India",
    title: "Forbes India 30 Under 30: The ones we had to mention",
    url: "https://www.forbesindia.com/article/30-under-30-2021/forbes-india-30-under-30-the-ones-we-had-to-mention/66317/1",
    date: "Feb 2021",
  },
  {
    outlet: "Cisco",
    title: "Meet Sensegrass: India Impact Grand Prize Winner for the Cisco Global Problem Solver Challenge 2020",
    url: "https://blogs.cisco.com/csr/meet-sensegrass-india-impact-grand-prize-winner-for-the-cisco-global-problem-solver-challenge-2020dtidpblgblg001473oidpstoth022645",
    date: "Aug 2020",
    image: "/images/media/cisco-gpsc-2020.jpg",
  },
  {
    outlet: "YourStory",
    title: "How Cisco LaunchPad portfolio startup Sensegrass is creating 360-degree smart farming solutions",
    url: "https://yourstory.com/2021/06/cisco-launchpad-portfolio-startup-sensegrass-creates-360-degree-smart-farming-solutions",
    date: "Jun 2021",
    image: "/images/media/yourstory-cisco-launchpad.jpg",
  },
  {
    outlet: "MWC Barcelona",
    title: "Lalit Gautam — Sensegrass: speaker at MWC Barcelona / 4YFN 2026",
    url: "https://www.mwcbarcelona.com/agenda/speakers/17079-lalit-gautam",
    date: "Mar 2026",
    image: "/images/media/mwc-barcelona-2026.jpg",
    cta: "View the speaker page",
  },
  {
    outlet: "Render Capital",
    title: "Q&A With the Render Competition Winners, SenseGrass",
    url: "https://www.render.capital/journal/q-a-with-the-render-competition-winners-sensegrass",
    date: "Apr 2023",
    image: "/images/media/render-capital-2023.jpg",
  },
  {
    outlet: "CIOL",
    title: "Startup Circle: How did AgriTech Sensegrass turn traditional farming into Smart Farming?",
    url: "https://www.ciol.com/startup-circle-agritech-sensegrass-turn-traditional-farming-smart-farming/",
    date: "Jul 2020",
    image: "/images/media/ciol-startup-circle.jpg",
  },
  {
    outlet: "YourStory",
    title: "Meet the 12 startups from QDIC 2020 — including Sensegrass’s soil intelligence system",
    url: "https://yourstory.com/2020/07/12-startups-qdic-raising-innovation",
    date: "Jul 2020",
    image: "/images/media/yourstory-qdic-2020.jpg",
  },
  {
    outlet: "PCDN Global",
    title: "Social Change Career Profile: Lalit Gautam — networking & social capital matter more than financial capital",
    url: "https://pcdn.global/profilelalitgautam/",
    date: "Dec 2019",
    image: "/images/media/pcdn-profile-2019.jpg",
  },
  {
    outlet: "deutschland.de",
    title: "Handscart, India",
    url: "https://www.deutschland.de/en/handscart-india",
    date: "May 2017",
    image: "/images/media/deutschland-handscart.jpg",
  },
];

export type CallService = {
  id: "mini" | "standard" | "deep-dive";
  tag: string;
  name: string;
  desc: string;
  featured?: boolean;
  /** Display price, e.g. "₹3,500" or "Price on request". */
  price?: string;
  /** Numeric INR amount for structured data; omit when priced on request. */
  priceInr?: number;
};

export const callServices: CallService[] = [
  {
    id: "mini",
    tag: "Discovery call",
    name: "Mini Call",
    desc: "A short first conversation to see where I can help.",
    price: "₹3,500",
    priceInr: 3500,
  },
  {
    id: "standard",
    tag: "30 min · Video",
    name: "1:1 Call",
    desc: "Focused advice on one decision, pitch or challenge.",
    featured: true,
    price: "₹6,500",
    priceInr: 6500,
  },
  {
    id: "deep-dive",
    tag: "60 min · Video",
    name: "1:1 Deep Dive",
    desc: "Strategy, fundraising or international expansion, in depth.",
    price: "Price on request",
  },
];

export const adviceAreas = [
  { title: "Strategy & refining GTM", line: "Sharpen direction, positioning and priorities." },
  {
    title: "Fundraising",
    line: "Pitch, investor targeting, and pre-seed to Series A. Crack the toughest accelerators and grants.",
  },
  {
    title: "Investment & personal finance",
    line: "I reached FIRE at 36, building my wealth from zero to the top 0.1% by trusting my own research over bankers. Get commercial or personal finance advice.",
  },
  {
    title: "Scaling — sales & marketing expansion",
    line: "Grow the team and operations without breaking. Build your sales playbook.",
  },
  { title: "Internationalization", line: "Enter new markets, set up abroad and find clients in international markets." },
  {
    title: "Exponential tech & product development",
    line: "AI, IoT and deep tech — where they actually help build the right product for the right PMF.",
  },
  { title: "Immigration & startup visas", line: "Navigate startup visas and relocation — and sometimes visit visas too." },
  { title: "Public speaking", line: "Craft and deliver talks that land, and unlock conferences." },
  { title: "Investment analysis & VC support", line: "Evaluate startups and deals with clear eyes." },
  {
    title: "Mentoring, consulting & life coaching",
    line: "Avoid costly early mistakes as a founder — or learn to keep anxiety out of your life.",
  },
];

export const howItWorks = [
  { title: "Pick a call", line: "Choose the format that fits your question." },
  { title: "Book a slot", line: "Reserve a time that suits you — pay after booking." },
  { title: "Meet on video call", line: "We talk it through and you leave with next steps." },
];
