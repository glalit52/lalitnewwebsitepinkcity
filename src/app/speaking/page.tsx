import type { Metadata } from "next";
import { BookCover } from "@/components/brand/BookCover";
import { SpeakingInviteForm } from "@/components/forms/SpeakingInviteForm";
import { PageHero } from "@/components/layout/PageHero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { book, person, topics, unTalk } from "@/content/site";
import { externalLinks, siteUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "Speaking & book",
  description:
    "100+ talks at universities, summits and the United Nations in Geneva — plus the book “How to Win the Hardest Marathon”. Invite Lalit Gautam to speak.",
  alternates: { canonical: "/speaking" },
};

function SpeakingJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: {
      "@type": "Person",
      name: person.name,
      url: siteUrl,
    },
    inLanguage: "en",
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
    externalLinks.book && { href: externalLinks.book, label: "Get the book", primary: true },
    externalLinks.bookSample && { href: externalLinks.bookSample, label: "Read a sample", primary: false },
  ].filter(Boolean) as Array<{ href: string; label: string; primary: boolean }>;

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
                className="flex flex-col items-center gap-3.5 rounded-[160px_160px_18px_18px] border-2 border-pink bg-blush px-6 pb-[30px] pt-14 text-center"
              >
                <span
                  aria-hidden="true"
                  className="flex size-16 items-center justify-center rounded-full border-4 border-ivory bg-indigo font-display text-[28px] text-marigold shadow-[0_0_0_2px_#22306B]"
                >
                  {i + 1}
                </span>
                <h3 className="m-0 font-display text-[24px] font-normal leading-[1.2] text-indigo md:text-[26px]">{t}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-surface="dark" className="blockprint py-16 text-ivory md:py-[88px]" aria-labelledby="un-title">
        <div className="wrap grid items-center gap-10 md:gap-12 lg:grid-cols-2">
          <PhotoFrame
            src={unTalk.image}
            alt="Lalit Gautam speaking at the United Nations in Geneva"
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-[16/10] w-full rounded-[18px] border-4 border-ivory bg-indigo-soft"
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

      <section id="book" className="scroll-mt-24 py-16 md:py-[104px]" aria-labelledby="book-title">
        <div className="wrap grid items-center gap-12 md:gap-16 lg:grid-cols-2">
          <BookCover variant="feature" />
          <div className="flex flex-col gap-4">
            <SectionHeading id="book-title" eyebrow="The book" title={book.title} />
            {book.summary ? <p className="m-0 text-ink-soft">{book.summary}</p> : null}
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
                        ? "btn bg-indigo text-ivory hover:text-ivory"
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

      <section id="invite" className="lattice scroll-mt-24 py-16 md:py-24">
        <div className="wrap flex justify-center">
          <SpeakingInviteForm />
        </div>
      </section>

      <SiteFooter variant="simple" tone="indigo" />
    </>
  );
}
