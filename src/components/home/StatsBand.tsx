import { stats } from "@/content/site";

export function StatsBand() {
  return (
    <section aria-label="At a glance" data-surface="dark" className="bg-indigo text-ivory">
      <dl className="wrap my-0 grid grid-cols-2 gap-x-3 gap-y-[22px] pb-9 pt-3 text-center md:grid-cols-4 md:gap-5 md:pb-16 md:pt-7">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse py-0 md:border-l md:border-marigold/35 md:py-2">
            <dt className="mt-1.5 text-[12px] uppercase tracking-[0.16em] md:mt-2.5 md:text-[14px] md:tracking-[0.18em]">
              {s.label}
            </dt>
            <dd className="m-0 font-display text-[38px] leading-none text-marigold md:text-[44px] lg:text-[56px]">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
