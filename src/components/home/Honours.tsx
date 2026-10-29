import { SectionHeading } from "@/components/ui/SectionHeading";
import { honours } from "@/content/site";

/**
 * Vertical timeline on phones; a horizontal rail from tablet up — three per
 * row until xl, then all five in one row. Each item is a row subgrid so the
 * titles line up even when a marker ("French Tech Ticket") wraps.
 */
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
        <ol className="m-0 flex list-none flex-col gap-[18px] border-l-[3px] border-terracotta py-0 pl-[22px] pr-0 md:grid md:grid-cols-6 md:gap-x-0 md:gap-y-14 md:border-l-0 md:pl-0 xl:grid-cols-5">
          {honours.map((h) => (
            <li
              key={h.marker}
              className="relative flex flex-col gap-1 md:col-span-2 md:row-span-3 md:grid md:grid-rows-subgrid md:gap-2 md:border-t-[3px] md:border-terracotta md:pr-7 md:pt-7 xl:col-span-1 xl:pr-6"
            >
              <span
                aria-hidden="true"
                className="absolute -left-8 top-1.5 size-3.5 rotate-45 border-2 border-terracotta bg-marigold md:-top-[13px] md:left-0 md:size-5 md:border-[3px]"
              />
              <p className="m-0 text-balance font-display text-[22px] leading-[1.1] text-maroon md:text-[30px] md:leading-[1.05] xl:text-[28px]">
                {h.marker}
              </p>
              <h3 className="m-0 text-[17px] font-semibold text-indigo md:text-[20px]">{h.title}</h3>
              <p className="m-0 text-[15px] text-ink-muted md:text-[18px]">{h.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
