import { Rosette } from "@/components/brand/Logo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { visas } from "@/content/site";

export function VisasSection() {
  return (
    <section className="lattice py-12 md:py-28" aria-labelledby="visas-title">
      <div className="wrap flex flex-col gap-4 md:gap-10">
        <div className="flex max-w-[760px] flex-col gap-1.5 rounded-[18px] bg-ivory p-[22px] md:gap-2.5 md:rounded-3xl md:p-10">
          <SectionHeading
            id="visas-title"
            eyebrow={
              <>
                Startup visas<span className="hidden md:inline"> &amp; relocation</span>
              </>
            }
            title="Eight countries, one passport"
          />
          <p className="m-0 text-[15px] text-ink-soft md:text-[19px]">
            <span className="md:hidden">The only Indian with startup visas from France, Italy and Spain.</span>
            <span className="hidden md:inline">
              Based mostly in Europe — and the only Indian to secure startup visas from France, Italy and Spain.
            </span>
          </p>
        </div>
        <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] md:gap-4">
          {visas.map((c) => (
            <li
              key={c.name}
              data-surface="dark"
              className="blockprint flex items-center gap-4 rounded-xl border-2 border-ivory p-3.5 text-ivory md:rounded-2xl md:border-[3px] md:p-[22px]"
            >
              <span className="hidden md:block">
                <Rosette />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-marigold md:text-xs md:tracking-[0.18em]">
                  {c.kind}
                </span>
                <span className="block font-display text-[18px] leading-[1.15] md:text-2xl">{c.name}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
