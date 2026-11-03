import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ventures, type Venture } from "@/content/site";

/**
 * Whole card links to the venture's row on /ventures: the heading link is
 * stretched over the card (after:inset-0), so there is one tab stop and no
 * nested interactive elements. The card draws the focus ring for it.
 */
function VentureCard({ v }: { v: Venture }) {
  return (
    <article className="group relative flex items-center gap-3.5 rounded-[18px] border-2 border-pink bg-blush p-3.5 transition-all duration-300 hover:border-terracotta hover:shadow-[0_20px_35px_-12px_rgba(142,59,44,0.35)] has-[a:focus-visible]:border-terracotta has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-indigo motion-safe:hover:-translate-y-1.5 md:flex-col md:items-stretch md:gap-3 md:rounded-[200px_200px_18px_18px] md:p-[26px]">
      <div
        aria-hidden="true"
        className="flex h-[78px] w-16 flex-none items-center justify-center rounded-[32px_32px_6px_6px] border-[3px] border-ivory font-display text-[28px] text-ivory shadow-md transition-transform duration-300 group-hover:scale-[1.02] md:h-[190px] md:w-auto md:rounded-[200px_200px_0_0] md:border-4 md:text-[48px]"
        style={{ background: v.tint, boxShadow: `0 0 0 2px ${v.tint}, 0 6px 16px -4px rgba(0,0,0,0.2)` }}
      >
        {v.initial}
      </div>
      <div className="flex min-w-0 flex-col md:gap-3">
        <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-maroon md:pt-1.5 md:text-[13px] md:tracking-[0.16em]">
          {v.teaserYears}
          {v.acquired ? " · Acquired" : ""}
        </p>
        <h3 className="m-0 font-display text-[23px] font-normal leading-[1.1] text-indigo md:text-[34px]">
          <Link
            href={`/ventures#${v.slug}`}
            className="text-indigo no-underline decoration-2 underline-offset-4 focus-visible:outline-hidden after:absolute after:inset-0 after:rounded-[inherit] after:content-[''] group-hover:underline hover:text-indigo"
          >
            {v.name}
          </Link>
        </h3>
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
  const teaser = ventures.filter((v) => v.onHome);
  return (
    <section className="py-14 md:py-28" aria-labelledby="ventures-teaser">
      <div className="wrap flex flex-col gap-[18px] md:gap-11">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionHeading id="ventures-teaser" eyebrow="Ventures" title="Three doors I’ve opened" />
          <Link href="/ventures" className="group/link hidden items-center gap-1.5 font-semibold text-indigo hover:text-indigo-deep md:inline-flex">
            All ventures <span aria-hidden="true" className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
          </Link>
        </div>
        <div className="grid gap-[18px] md:grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] md:gap-7">
          {teaser.map((v) => (
            <VentureCard key={v.slug} v={v} />
          ))}
        </div>
        <Link href="/ventures" className="group/link flex min-h-11 items-center gap-1.5 self-start font-semibold text-indigo hover:text-indigo-deep md:hidden">
          All ventures <span aria-hidden="true" className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
