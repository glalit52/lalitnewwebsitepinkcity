import { Rosette } from "@/components/brand/Logo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { visas } from "@/content/site";

/** Ten tiles: two columns up to tablet, two rows of five from lg. */
export function VisasSection() {
  return (
    <section className="lattice py-12 md:py-28" aria-labelledby="visas-title">
      <div className="wrap flex flex-col gap-4 md:gap-10">
        <div className="flex max-w-[760px] flex-col gap-1.5 rounded-[18px] bg-ivory border border-pink/50 p-[22px] shadow-[0_6px_20px_rgba(142,59,44,0.08)] md:gap-2.5 md:rounded-3xl md:p-10">
          <SectionHeading
            id="visas-title"
            eyebrow={
              <>
                Startup visas<span className="hidden md:inline"> &amp; relocation</span>
              </>
            }
            title="Ten countries, one passport"
          />
          <p className="m-0 text-[15px] text-ink-soft md:text-[19px]">
            The only entrepreneur in the world awarded 10+ startup residencies and permits.
          </p>
        </div>
        <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 md:gap-4 lg:grid-cols-5">
          {visas.map((c) => (
            <li
              key={c.name}
              data-surface="dark"
              className="blockprint group flex items-center gap-3.5 rounded-xl border-2 border-ivory/85 p-3.5 text-ivory transition-all duration-300 hover:border-marigold hover:shadow-[0_12px_28px_-6px_rgba(242,179,61,0.35)] hover:-translate-y-1.5 md:rounded-2xl md:border-[3px] md:p-[22px] lg:flex-col lg:items-start lg:gap-3 lg:p-5"
            >
              <span className="hidden md:block transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                <Rosette />
              </span>
              <span className="min-w-0 break-words">
                <span className="block text-[10px] font-semibold leading-[1.35] uppercase tracking-[0.16em] text-marigold md:text-xs md:tracking-[0.18em] lg:tracking-[0.14em]">
                  {c.kind}
                </span>
                <span className="mt-0.5 block font-display text-[18px] leading-[1.15] md:mt-1 md:text-2xl lg:text-[22px] xl:text-2xl">{c.name}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
