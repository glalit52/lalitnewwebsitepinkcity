import type { Metadata } from "next";
import { BookCover } from "@/components/brand/BookCover";
import { SpeakingInviteForm } from "@/components/forms/SpeakingInviteForm";
import { PageHero } from "@/components/layout/PageHero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MediaStrip } from "@/components/speaking/MediaStrip";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { books, featuredBook, media, person, tedxTalk, topics, unTalk } from "@/content/site";
import { externalLinks, siteUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "Speaking & book",
  description: `100+ talks at universities, summits, TEDx and the United Nations in Geneva — plus ${
    books.length > 1 ? "books including" : "the book"
  } “${featuredBook.title}”. Invite Lalit Gautam to speak.`,
  alternates: { canonical: "/speaking" },
};

function SpeakingJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": books.map((b) => ({
      "@type": "Book",
      name: b.title,
      ...(b.summary ? { description: b.summary } : {}),
      author: {
        "@type": "Person",
        name: person.name,
        url: siteUrl,
      },
      inLanguage: "en",
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function SpeakingPage() {
  const bookLinks = [
    (externalLinks.book ?? featuredBook.url) && {
      href: (externalLinks.book ?? featuredBook.url) as string,
      label: "Get the book",
      primary: true,
    },
    externalLinks.bookSample && { href: externalLinks.bookSample, label: "Read a sample", primary: false },
  ].filter(Boolean) as Array<{ href: string; label: string; primary: boolean }>;
  // "TEDxTajNagri · Agra · 2022" → "TEDxTajNagri"
  const tedxEventName = tedxTalk.event.split(" · ")[0];

  return (
    <>
      <SpeakingJsonLd />
      <PageHero
        eyebrow="SPEAKING & WRITING"
        title="100+ talks, one big idea"
        intro="Technology should serve people and the planet. I’ve made that case at universities, summits and the United Nations in Geneva."
      />

      <section className="py-16 md:py-24" aria-labelledby="topics-title">
        <div className="wrap flex flex-col gap-10 md:gap-11">
          <SectionHeading id="topics-title" eyebrow="Signature topics" title="What I speak about" />
          <ol className="m-0 grid list-none gap-[22px] p-0 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((t, i) => (
              <li
                key={t}
                className="group flex flex-col items-center gap-3.5 rounded-[160px_160px_18px_18px] border-2 border-pink bg-blush px-6 pb-[30px] pt-14 text-center transition-all duration-300 hover:border-terracotta hover:shadow-[0_16px_32px_-10px_rgba(142,59,44,0.3)] hover:-translate-y-1.5"
              >
                <span
                  aria-hidden="true"
                  className="flex size-16 items-center justify-center rounded-full border-4 border-ivory bg-indigo font-display text-[28px] text-marigold shadow-[0_0_0_2px_#22306B] transition-transform duration-300 group-hover:scale-110"
                >
                  {i + 1}
                </span>
                <h3 className="m-0 text-balance font-display text-[24px] font-normal leading-[1.2] text-indigo md:text-[26px] lg:text-[22px] xl:text-[24px]">
                  {t}
                </h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-surface="dark" className="blockprint py-16 text-ivory md:py-[88px]" aria-labelledby="un-title">
        <div className="wrap grid items-center gap-10 md:gap-12 lg:grid-cols-2">
          <PhotoFrame
            src={unTalk.image}
            alt="Lalit Gautam at the United Nations, Geneva — High-Level Dialogue on Innovation for Sustainable Development, 2020: poster and white paper"
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-[3/2] w-full rounded-[18px] border-4 border-ivory bg-indigo-soft shadow-lg transition-transform duration-300 hover:scale-[1.01]"
            fallback={
              <span className="flex flex-col items-center gap-3 text-center">
                <svg aria-hidden="true" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#F2B33D" strokeWidth="1.4">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3z" />
                </svg>
                <span className="text-sm font-semibold tracking-[0.2em] text-ivory">UN · GENEVA</span>
              </span>
            }
          />
          <div className="flex flex-col gap-3.5">
            <SectionHeading id="un-title" eyebrow="On stage" title={unTalk.title} tone="inverse" size="md" />
            {unTalk.description ? <p className="m-0 text-mist">{unTalk.description}</p> : null}
          </div>
        </div>
      </section>

      <section className="bg-blush py-16 md:py-[88px]" aria-labelledby="tedx-title">
        <div className="wrap grid items-center gap-10 md:gap-12 lg:grid-cols-2">
          <PhotoFrame
            src={tedxTalk.image}
            alt={`Lalit Gautam giving his talk “${tedxTalk.title}” on stage at ${tedxEventName}`}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-video w-full rounded-[18px] border-4 border-ivory bg-ink shadow-[0_0_0_2px_#22306B,0_12px_30px_-10px_rgba(0,0,0,0.45)] lg:order-last transition-transform duration-300 hover:scale-[1.01]"
            fallback={
              <span className="flex flex-col items-center gap-2 px-6 text-center">
                <span className="font-sans text-[64px] font-extrabold leading-none tracking-[-0.04em] text-[#e62b1e] md:text-[88px]">
                  TED<span className="text-[0.9em]">x</span>
                </span>
                <span className="text-xs font-semibold tracking-[0.12em] text-ivory md:text-sm">{tedxTalk.event}</span>
              </span>
            }
          />
          <div className="flex flex-col gap-3.5">
            <SectionHeading id="tedx-title" eyebrow={<span className="normal-case">{tedxTalk.eyebrow}</span>} title={tedxTalk.title} size="md" />
            <p className="m-0 text-[15px] font-semibold tracking-[0.04em] text-maroon md:text-base">{tedxTalk.event}</p>
            {tedxTalk.description ? <p className="m-0 text-ink-soft">{tedxTalk.description}</p> : null}
            <div className="flex flex-wrap gap-3 pt-1.5">
              {tedxTalk.watchUrl ? (
                <a
                  href={tedxTalk.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-indigo text-ivory hover:text-ivory shadow-[0_4px_14px_-2px_rgba(34,48,107,0.3)]"
                >
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M3 1.5l9.5 5.5L3 12.5z" />
                  </svg>
                  Watch the talk
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
              <a
                href={tedxTalk.eventUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border-2 border-indigo bg-transparent text-indigo hover:bg-indigo hover:text-ivory"
              >
                {tedxEventName} event page
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="book" className="scroll-mt-28 py-16 md:py-[104px]" aria-labelledby="book-title">
        <div className="wrap grid items-center gap-12 md:gap-16 lg:grid-cols-2">
          <BookCover variant="feature" />
          <div className="flex flex-col gap-4">
            <SectionHeading
              id="book-title"
              eyebrow={books.length > 1 ? "Featured book" : "The book"}
              title={featuredBook.title}
            />
            {featuredBook.summary ? <p className="m-0 text-ink-soft">{featuredBook.summary}</p> : null}
            {bookLinks.length ? (
              <div className="flex flex-wrap gap-3 pt-1.5">
                {bookLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      l.primary
                        ? "btn bg-indigo text-ivory hover:text-ivory shadow-[0_4px_14px_-2px_rgba(34,48,107,0.3)]"
                        : "btn border-2 border-indigo bg-transparent text-indigo hover:bg-blush"
                    }
                  >
                    {l.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="pt-1.5">
                <a href="#invite" className="btn border-2 border-indigo bg-transparent text-indigo hover:bg-blush">
                  Invite me to talk about it
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {media.length ? (
        <section id="media" className="scroll-mt-28 bg-blush py-16 md:py-24" aria-labelledby="media-title">
          <div className="flex flex-col gap-10 md:gap-11">
            <div className="wrap">
              <SectionHeading id="media-title" eyebrow="In the media" title="Stories & press" />
            </div>
            <MediaStrip items={media} />
          </div>
        </section>
      ) : null}

      <section id="invite" className="lattice scroll-mt-28 py-16 md:py-24">
        <div className="wrap flex justify-center">
          <SpeakingInviteForm />
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
