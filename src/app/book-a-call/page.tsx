import type { Metadata } from "next";
import { RequestCallButton } from "@/components/forms/CallRequestDialog";
import { PageHero } from "@/components/layout/PageHero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { adviceAreas, callServices, howItWorks, person, type CallService } from "@/content/site";
import { externalLinks, siteUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "One-on-one video calls with Lalit Gautam on strategy, fundraising, scaling, internationalization, startup visas and public speaking.",
  alternates: { canonical: "/book-a-call" },
};

function BookACallJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mentorship & Advisory Sessions with Lalit Gautam",
    itemListElement: callServices.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        description: s.desc,
        provider: {
          "@type": "Person",
          name: person.name,
          url: siteUrl,
        },
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

const serviceOptions = callServices.map(({ id, name, tag }) => ({ id, name, tag }));

function ServiceCard({ s }: { s: CallService }) {
  const f = s.featured;
  const btn = `btn mt-auto w-full py-4 ${f ? "bg-marigold text-indigo hover:text-indigo" : "bg-indigo text-ivory hover:text-ivory"}`;
  return (
    <li
      data-surface={f ? "dark" : undefined}
      className={`flex flex-col gap-3 rounded-[200px_200px_22px_22px] border-[3px] px-7 pb-9 pt-[72px] text-center md:px-8 ${
        f ? "border-indigo bg-indigo text-ivory" : "border-pink bg-ivory text-ink"
      }`}
    >
      <p className={`m-0 text-[13px] font-semibold uppercase tracking-[0.2em] ${f ? "text-marigold" : "text-maroon"}`}>{s.tag}</p>
      <h2 className="m-0 font-display text-[34px] font-normal leading-[1.1] md:text-[40px]">{s.name}</h2>
      <p className="m-0">{s.desc}</p>
      {s.price ? <p className="m-0 py-2 font-display text-[30px]">{s.price}</p> : <div className="h-3" aria-hidden="true" />}
      {externalLinks.topmate ? (
        <a href={externalLinks.topmate} target="_blank" rel="noopener noreferrer" className={btn}>
          Book on Topmate
          <span className="sr-only"> — {s.name} (opens in a new tab)</span>
        </a>
      ) : (
        <RequestCallButton services={serviceOptions} service={{ id: s.id, name: s.name, tag: s.tag }} className={btn} />
      )}
    </li>
  );
}

export default function BookACallPage() {
  return (
    <>
      <BookACallJsonLd />
      <PageHero
        eyebrow="MENTORSHIP"
        title="Let’s sit down for chai"
        intro="One-on-one video calls for founders and professionals — advice from someone who has built, raised, exited and moved across borders."
      />

      <section className="py-16 md:py-24" aria-label="Call options">
        <ul className="wrap my-0 grid list-none items-stretch gap-7 md:grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))]">
          {callServices.map((s) => (
            <ServiceCard key={s.id} s={s} />
          ))}
        </ul>
      </section>

      <section className="bg-blush py-16 md:py-24" aria-labelledby="areas-title">
        <div className="wrap flex flex-col gap-10">
          <SectionHeading id="areas-title" eyebrow="What we can talk about" title="Nine areas of advice" />
          <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
            {adviceAreas.map((a, i) => (
              <li key={a.title} className="flex items-start gap-4 rounded-2xl border-2 border-blush-line bg-ivory px-6 py-[22px]">
                <span
                  aria-hidden="true"
                  className="box-border flex h-12 w-10 flex-none items-center justify-center rounded-[20px_20px_4px_4px] bg-indigo pt-1.5 font-display text-lg text-marigold"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="m-0 text-[19px] font-semibold text-indigo md:text-xl">{a.title}</h3>
                  <p className="m-0 mt-0.5 text-[16px] text-ink-muted md:text-[17px]">{a.line}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="how-title">
        <div className="wrap flex flex-col gap-10">
          <SectionHeading id="how-title" title="How it works" align="center" />
          <ol className="m-0 grid list-none gap-10 p-0 md:grid-cols-3 md:gap-7">
            {howItWorks.map((st, i) => (
              <li key={st.title} className="flex flex-col items-center gap-3 text-center">
                <span
                  aria-hidden="true"
                  className="flex size-[76px] items-center justify-center rounded-full border-4 border-ivory bg-pink font-display text-[32px] text-indigo shadow-[0_0_0_3px_#22306B]"
                >
                  {i + 1}
                </span>
                <h3 className="m-0 text-[22px] font-semibold text-indigo">
                  <span className="sr-only">Step {i + 1}: </span>
                  {st.title}
                </h3>
                <p className="m-0 max-w-[320px] text-ink-muted">{st.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <SiteFooter variant="connect" heading="Prefer to just say hello?" />
    </>
  );
}
