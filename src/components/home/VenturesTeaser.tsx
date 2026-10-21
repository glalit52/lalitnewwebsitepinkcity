import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ventures, type Venture } from "@/content/site";

function VentureCard({ v }: { v: Venture }) {
  return (
    <article className="flex items-center gap-3.5 rounded-[18px] border-2 border-pink bg-blush p-3.5 md:flex-col md:items-stretch md:gap-3 md:rounded-[200px_200px_18px_18px] md:p-[26px]">
      <div
        aria-hidden="true"
        className="flex h-[78px] w-16 flex-none items-center justify-center rounded-[32px_32px_6px_6px] border-[3px] border-ivory font-display text-[28px] text-ivory md:h-[190px] md:w-auto md:rounded-[200px_200px_0_0] md:border-4 md:text-[48px]"
        style={{ background: v.tint, boxShadow: `0 0 0 2px ${v.tint}` }}
      >
        {v.initial}
      </div>
      <div className="flex min-w-0 flex-col md:gap-3">
        <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-maroon md:pt-1.5 md:text-[13px] md:tracking-[0.16em]">
          {v.years}
          {v.acquired ? " · Acquired" : ""}
        </p>
        <h3 className="m-0 font-display text-[23px] font-normal leading-[1.1] text-indigo md:text-[34px]">{v.name}</h3>
        <p className="m-0 hidden font-semibold md:block">{v.role}</p>
        <p className="m-0 text-[15px] text-ink-muted md:text-[19px]">
          <span className="md:hidden">{v.short}</span>
          <span className="hidden md:inline">{v.summary}</span>
        </p>
      </div>
    </article>
  );
}

export function VenturesTeaser() {
  return (
    <section className="py-14 md:py-28" aria-labelledby="ventures-teaser">
      <div className="wrap flex flex-col gap-[18px] md:gap-11">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionHeading id="ventures-teaser" eyebrow="Ventures" title="Three doors I’ve opened" />
          <Link href="/ventures" className="hidden font-semibold md:inline">
            All ventures <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="grid gap-[18px] md:grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] md:gap-7">
          {ventures.map((v) => (
            <VentureCard key={v.slug} v={v} />
          ))}
        </div>
        <Link href="/ventures" className="self-start py-2.5 font-semibold md:hidden">
          All ventures <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
