import Link from "next/link";
import { BookCover } from "@/components/brand/BookCover";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SpeakingTeaser() {
  return (
    <section className="py-14 md:py-28" aria-labelledby="speaking-teaser">
      <div className="wrap grid items-center gap-10 md:gap-14 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <SectionHeading id="speaking-teaser" eyebrow="Speaking & writing" title="100+ talks, including the UN in Geneva" />
          <p className="m-0 text-ink-soft">
            On the SDGs, civic education, sustainable startup models, and human intelligence in the age of AI — plus a
            book on the long race of building.
          </p>
          <Link href="/speaking" className="self-start py-1 font-semibold">
            Talks &amp; the book <span aria-hidden="true">→</span>
          </Link>
        </div>
        <BookCover />
      </div>
    </section>
  );
}
