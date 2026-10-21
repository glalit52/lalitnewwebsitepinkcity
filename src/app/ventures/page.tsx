import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CtaBand } from "@/components/ui/CtaBand";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { affiliations, bookCallHref, ventures, type Venture } from "@/content/site";

export const metadata: Metadata = {
  title: "Ventures",
  description:
    "SenseGrass, HandsCart and ConnectBorder — four awarded startups, one exit and $4.5M+ raised, building where technology meets real-world impact.",
  alternates: { canonical: "/ventures" },
};

function VenturesJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ventures founded and co-founded by Lalit Gautam",
    itemListElement: ventures.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Organization",
        name: v.name,
        url: v.url,
        description: v.summary,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

function VentureRow({ v, flip }: { v: Venture; flip: boolean }) {
  return (
    <article
      aria-labelledby={`venture-${v.slug}`}
      className="grid items-center gap-10 md:gap-14 lg:grid-cols-2"
    >
      <div className={`flex justify-center ${flip ? "lg:order-2" : ""}`}>
        <PhotoFrame
          src={v.image}
          alt={`${v.name} product`}
          sizes="(min-width: 1024px) 440px, 90vw"
          className="aspect-[4/4.4] w-[calc(100%-21px)] max-w-[440px] rounded-[240px_240px_18px_18px] border-8 border-ivory"
          style={{ background: v.tint, boxShadow: `0 0 0 3px ${v.tint}, 18px 18px 0 #E7A08C` }}
          fallback={<span className="font-display text-[72px] leading-none text-ivory md:text-[96px]">{v.initial}</span>}
        />
      </div>
      <div className="flex flex-col gap-3.5">
        <p className="eyebrow m-0 !tracking-[0.18em]">
          {v.years} · {v.role}
        </p>
        <h2
          id={`venture-${v.slug}`}
          className="m-0 font-display text-[38px] font-normal leading-[1.05] text-indigo md:text-[56px]"
        >
          {v.name}
        </h2>
        <p className="m-0 text-[19px] font-medium md:text-[22px]">{v.lede}</p>
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
          {v.points.map((p) => (
            <li key={p} className="flex items-baseline gap-3.5">
              <span aria-hidden="true" className="size-2.5 flex-none rotate-45 bg-terracotta" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <a
          href={v.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn mt-2 self-start bg-indigo text-ivory hover:text-ivory md:px-[26px] md:py-3.5"
        >
          Visit {v.domain}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}

export default function VenturesPage() {
  return (
    <>
      <VenturesJsonLd />
      <PageHero
        eyebrow="VENTURES"
        title="From soil to marketplaces"
        intro="Four awarded startups, one exit and $4.5M+ raised — building where technology meets real-world impact."
      />

      <section className="py-16 md:py-24" aria-label="Ventures">
        <div className="wrap flex flex-col gap-20 md:gap-24">
          {ventures.map((v, i) => (
            <VentureRow key={v.slug} v={v} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      <section className="lattice py-16 md:py-24">
        <div className="wrap grid gap-5 md:gap-7 lg:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-3xl bg-ivory p-7 md:p-11">
            <SectionHeading eyebrow="Advocating" title="Speaking up for what matters" size="md" />
            <p className="m-0">
              Promoting social justice, environmental sustainability and individual rights — on stage and off it.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-3xl bg-ivory p-7 md:p-11">
            <SectionHeading eyebrow="Supporting" title="Mentoring founders to go global" size="md" />
            <p className="m-0">With a focus on the SDGs and SaaS, alongside:</p>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {affiliations.map((a) => (
                <li key={a} className="rounded-full bg-indigo px-3.5 py-1.5 text-[15px] text-ivory md:text-base">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand
        title="Building something of your own?"
        body="I mentor founders on fundraising, scaling and going international."
        href={bookCallHref}
        cta="Book a call"
      />
      <SiteFooter variant="simple" tone="lattice" />
    </>
  );
}
