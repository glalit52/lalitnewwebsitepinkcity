import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Honours } from "@/components/home/Honours";
import { LifeSection } from "@/components/home/LifeSection";
import { SpeakingTeaser } from "@/components/home/SpeakingTeaser";
import { StatsBand } from "@/components/home/StatsBand";
import { VenturesTeaser } from "@/components/home/VenturesTeaser";
import { VisasSection } from "@/components/home/VisasSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CtaBand } from "@/components/ui/CtaBand";
import { bookCallHref, person, ventures } from "@/content/site";
import { getSocialLinks, siteUrl } from "@/lib/links";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

function StructuredDataJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: person.name,
        description: person.tagline,
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: person.name,
        email: `mailto:${person.email}`,
        url: siteUrl,
        description: person.tagline,
        jobTitle: "Founder & CEO, SenseGrass",
        worksFor: {
          "@type": "Organization",
          name: "SenseGrass",
          url: "https://sensegrass.com",
        },
        // Ventures without a website yet (e.g. Anvita) are listed by name only.
        founder: ventures.map((v) => ({
          "@type": "Organization",
          name: v.name,
          ...(v.url ? { url: v.url } : {}),
        })),
        award: [
          "French Tech Ticket",
          "Forbes 30 Under 30 Europe",
          "Forbes 30 Under 30 India",
          "MIT 35 Under 35",
        ],
        knowsAbout: [
          "Artificial Intelligence",
          "Internet of Things",
          "Precision Agriculture",
          "Startup Mentorship",
          "CleanTech",
        ],
        sameAs: getSocialLinks()
          .filter((s) => s.id !== "email")
          .map((s) => s.url),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped is safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <StructuredDataJsonLd />
      <Hero />
      <StatsBand />
      <VenturesTeaser />
      <VisasSection />
      <Honours />
      <SpeakingTeaser />
      <CtaBand
        eyebrow="Mentorship"
        title="Let’s sit down for chai"
        body={
          <>
            <span className="md:hidden">Strategy, fundraising, scaling, startup visas and more.</span>
            <span className="hidden md:inline">
              Strategy, fundraising, scaling, going international, startup visas, public speaking — one founder to
              another.
            </span>
          </>
        }
        href={bookCallHref}
        cta="See call options"
      />
      <LifeSection />
      <SiteFooter />
    </>
  );
}
