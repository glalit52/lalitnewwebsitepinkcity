import type { ReactNode } from "react";

type Props = { eyebrow: string; title: ReactNode; intro: ReactNode };

/** Lattice title band with a scalloped lower edge, used on inner pages. */
export function PageHero({ eyebrow, title, intro }: Props) {
  return (
    <>
      <section className="lattice pb-14 pt-14 md:pb-[72px] md:pt-20">
        <div className="wrap flex flex-col items-center gap-4 text-center">
          <p className="m-0 rounded-full bg-ivory px-5 py-2 text-[12px] font-semibold tracking-[0.22em] text-maroon md:text-[13px]">
            {eyebrow}
          </p>
          <h1 className="m-0 font-display text-[44px] font-normal leading-none text-indigo min-[480px]:text-[52px] md:text-[64px] lg:text-[88px]">
            {title}
          </h1>
          <p className="m-0 max-w-[700px] text-[18px] font-medium md:text-[22px]">{intro}</p>
        </div>
      </section>
      <div className="scallop" aria-hidden="true" />
    </>
  );
}
