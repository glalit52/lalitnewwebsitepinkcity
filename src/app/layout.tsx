import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { person } from "@/content/site";
import { siteUrl } from "@/lib/links";
import "./globals.css";

// Self-hosted (SIL OFL fonts from Fontsource) — no build-time or runtime call to Google.
const yeseva = localFont({
  variable: "--font-yeseva",
  src: "../fonts/yeseva-one-latin-400-normal.woff2",
  weight: "400",
  display: "swap",
  fallback: ["Georgia", "serif"],
});
const jost = localFont({
  variable: "--font-jost",
  src: [
    { path: "../fonts/jost-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/jost-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/jost-latin-600-normal.woff2", weight: "600" },
  ],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
const tiro = localFont({
  variable: "--font-tiro",
  src: "../fonts/tiro-devanagari-hindi-devanagari-400-normal.woff2",
  weight: "400",
  display: "swap",
  preload: false,
  fallback: ["serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${person.name} — Entrepreneur, speaker & mentor`, template: `%s · ${person.name}` },
  description: `${person.tagline} Founder of SenseGrass, Forbes 30 Under 30, MIT 35 Under 35.`,
  applicationName: person.name,
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  publisher: person.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: person.name,
    locale: "en_US",
    url: siteUrl,
    title: `${person.name} — Entrepreneur, speaker & mentor`,
    description: `${person.tagline} Founder of SenseGrass, Forbes 30 Under 30, MIT 35 Under 35.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name} — Entrepreneur, speaker & mentor`,
    description: `${person.tagline} Founder of SenseGrass, Forbes 30 Under 30, MIT 35 Under 35.`,
    creator: "@lalitgautam",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#22306B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${yeseva.variable} ${jost.variable} ${tiro.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-marigold focus:px-5 focus:py-3 focus:font-semibold focus:text-indigo"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
      </body>
    </html>
  );
}
