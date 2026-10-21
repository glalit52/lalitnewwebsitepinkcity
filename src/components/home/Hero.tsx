import Link from "next/link";
import { JaipurSkyline } from "@/components/brand/JaipurSkyline";
import { PortraitArch } from "@/components/brand/PortraitArch";
import { bookCallHref, person } from "@/content/site";

/**
 * Phones & tablets: centred stack with the portrait first (mobile comp).
 * Desktop (≥1024px): copy left, portrait right (desktop comp).
 */
export function Hero() {
  return (
    <section className="lattice overflow-hidden pt-9 md:pt-16 lg:pt-20" aria-labelledby="hero-title">
      <div className="wrap grid items-center gap-3.5 text-center md:gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14 lg:text-left">
        <div className="contents lg:flex lg:flex-col lg:gap-[22px]">
          <p className="m-0 flex items-center gap-2 justify-self-center rounded-full bg-ivory py-1.5 pl-3 pr-4 md:gap-3 md:py-2 md:pl-3.5 md:pr-5 lg:self-start">
            <span lang="hi" className="font-hindi text-[17px] text-maroon md:text-xl">
              पधारो
            </span>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-maroon md:text-[13px] md:tracking-[0.22em]">
              WELCOME
            </span>
          </p>

          <h1
            id="hero-title"
            className="order-2 m-0 font-display text-[46px] font-normal leading-[0.95] text-indigo min-[360px]:text-[56px] md:text-[80px] lg:order-none lg:text-[104px]"
          >
            Lalit<span className="lg:hidden"> </span>
            <br className="hidden lg:block" />
            Gautam
          </h1>
          <p className="order-3 m-0 justify-self-center text-[19px] font-medium leading-[1.4] md:max-w-[540px] md:text-[24px] lg:order-none lg:text-[26px]">
            {person.tagline}
          </p>
          <p className="order-3 m-0 justify-self-center text-[15px] text-ink-soft md:max-w-[540px] md:text-[19px] lg:order-none">
            <span className="md:hidden">{person.introShort}</span>
            <span className="hidden md:inline">{person.intro}</span>
          </p>
          <div className="order-4 flex w-full flex-col gap-2.5 pt-1.5 md:flex-row md:flex-wrap md:justify-center md:gap-3.5 lg:order-none lg:justify-start">
            <Link href={bookCallHref} className="btn bg-indigo text-ivory hover:text-ivory md:px-8 md:py-[17px]">
              Book a 1:1 call
            </Link>
            <Link
              href="/ventures"
              className="btn border-2 border-indigo bg-ivory text-indigo hover:bg-white hover:text-indigo md:px-[30px] md:py-[15px]"
            >
              Explore my ventures
            </Link>
          </div>
        </div>

        <div className="order-1 mt-2 flex justify-center lg:order-none lg:mt-0 lg:pb-2">
          <PortraitArch src={person.portrait} alt={`Portrait of ${person.name}`} />
        </div>
      </div>
      <JaipurSkyline className="mt-7 md:mt-10" />
    </section>
  );
}
