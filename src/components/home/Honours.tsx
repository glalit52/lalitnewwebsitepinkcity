import { SectionHeading } from "@/components/ui/SectionHeading";
import { honours } from "@/content/site";

/** Vertical timeline on phones, horizontal rail from tablet up. */
export function Honours() {
  return (
    <section className="bg-blush py-[52px] md:py-28" aria-labelledby="honours-title">
      <div className="wrap flex flex-col gap-4 md:gap-12">
        <SectionHeading
          id="honours-title"
          eyebrow="80+ awards"
          title={
            <>
              Milestones<span className="hidden md:inline"> along the way</span>
            </>
          }
        />
        <ol className="m-0 flex list-none flex-col gap-[18px] border-l-[3px] border-terracotta py-0 pl-[22px] pr-0 md:grid md:grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] md:gap-7 md:border-l-0 md:border-t-[3px] md:pl-0">
          {honours.map((h) => (
            <li key={h.title} className="relative flex flex-col gap-1 md:gap-2 md:pt-7">
              <span
                aria-hidden="true"
                className="absolute -left-8 top-1.5 size-3.5 rotate-45 border-2 border-terracotta bg-marigold md:-top-[13px] md:left-0 md:size-5 md:border-[3px]"
              />
              <p className="m-0 font-display text-[22px] leading-[1.1] text-maroon md:text-4xl md:leading-none">{h.marker}</p>
              <h3 className="m-0 text-[17px] font-semibold text-indigo md:text-[21px]">{h.title}</h3>
              <p className="m-0 text-[15px] text-ink-muted md:text-[19px]">{h.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
