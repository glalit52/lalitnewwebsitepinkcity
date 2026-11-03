import { stats } from "@/content/site";

export function StatsBand() {
  return (
    <section aria-label="At a glance" data-surface="dark" className="bg-indigo text-ivory">
      <dl className="wrap my-0 grid grid-cols-2 gap-x-3 gap-y-[22px] pb-9 pt-3 text-center md:grid-cols-4 md:gap-5 md:pb-16 md:pt-7">
        {stats.map((s) => (
          <div key={s.label} className="group flex flex-col-reverse py-2 px-1 rounded-xl transition-all duration-300 hover:bg-white/[0.05] md:border-l md:border-marigold/35 md:py-3 md:px-2">
            <dt className="mt-1.5 text-[12px] uppercase tracking-[0.16em] text-ivory/85 group-hover:text-ivory transition-colors md:mt-2.5 md:text-[14px] md:tracking-[0.18em]">
              {s.label}
            </dt>
            <dd className="m-0 font-display text-[38px] leading-none text-marigold drop-shadow-[0_2px_12px_rgba(242,179,61,0.3)] transition-transform duration-300 group-hover:scale-105 md:text-[46px] lg:text-[58px]">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
