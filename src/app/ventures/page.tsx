import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CtaBand } from "@/components/ui/CtaBand";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { advocacy, affiliations, bookCallHref, ventures, type Venture } from "@/content/site";

export const metadata: Metadata = {
  title: "Ventures",
  description:
    "SenseGrass, HandsCart, ConnectBorder and Anvita — one exit and $5.5M+ raised, building where technology meets real-world impact.",
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
        // Not every venture has a website yet — leave the property out rather than emit `undefined`.
        ...(v.url ? { url: v.url } : {}),
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
      id={v.slug}
      aria-labelledby={`venture-${v.slug}`}
      className="grid scroll-mt-28 items-center gap-10 md:gap-14 lg:grid-cols-2"
    >
      <div className={`flex justify-center ${flip ? "lg:order-2" : ""}`}>
        <PhotoFrame
          src={v.image}
          alt={`${v.name} product`}
          sizes="(min-width: 1024px) 440px, 90vw"
          className="aspect-[4/4.4] w-[calc(100%-21px)] max-w-[440px] rounded-[240px_240px_18px_18px] border-8 border-ivory transition-transform duration-300 hover:scale-[1.02]"
          style={{ background: v.tint, boxShadow: `0 0 0 3px ${v.tint}, 18px 18px 0 #E7A08C` }}
          fallback={<span className="font-display text-[72px] leading-none text-ivory md:text-[96px]">{v.initial}</span>}
        />
      </div>
      <div className="flex flex-col gap-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <p className="eyebrow m-0 !tracking-[0.18em]">
            {v.years} · {v.role}
          </p>
          {v.acquired ? (
            <span className="inline-flex items-center rounded-full bg-terracotta/15 px-2.5 py-0.5 text-[11px] font-semibold text-terracotta border border-terracotta/30">
              Acquired · First exit
            </span>
          ) : null}
        </div>
        <h2
          id={`venture-${v.slug}`}
          className="m-0 font-display text-[38px] font-normal leading-[1.05] text-indigo md:text-[56px]"
        >
          {v.name}
        </h2>
        <p className="m-0 text-[19px] font-medium md:text-[22px]">{v.lede}</p>
        {v.points.length > 0 && (
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {v.points.map((p) => (
              <li key={p} className="flex items-baseline gap-3.5">
                <span aria-hidden="true" className="size-2.5 flex-none rotate-45 bg-terracotta" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        )}
        {/* Hidden until the venture has a website — never render a dead link. */}
        {v.url && (
          <a
            href={v.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-2 self-start bg-indigo text-ivory hover:text-ivory shadow-[0_4px_14px_-2px_rgba(34,48,107,0.3)] md:px-[26px] md:py-3.5"
          >
            Visit {v.domain ?? v.name}
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
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
        title="From soil to marketplaces to AI"
        intro="One exit and $5.5M+ raised — building where technology meets real-world impact."
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
          <div className="flex flex-col gap-3 rounded-3xl bg-ivory border border-pink/50 p-7 shadow-[0_6px_24px_rgba(142,59,44,0.08)] transition-transform duration-300 hover:-translate-y-1 md:p-11">
            <SectionHeading eyebrow="Advocating" title="Speaking up for what matters" size="md" />
            <p className="m-0">{advocacy}</p>
          </div>
          <div className="flex flex-col gap-3 rounded-3xl bg-ivory border border-pink/50 p-7 shadow-[0_6px_24px_rgba(142,59,44,0.08)] transition-transform duration-300 hover:-translate-y-1 md:p-11">
            <SectionHeading eyebrow="Supporting" title="Mentoring founders to go global" size="md" />
            <p className="m-0">With a focus on the SDGs and SaaS, alongside:</p>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {affiliations.map((a) => (
                <li key={a} className="rounded-full bg-indigo px-4 py-1.5 text-[15px] text-ivory shadow-sm transition-colors hover:bg-indigo-soft md:text-base">
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
      <SiteFooter />
    </>
  );
}
