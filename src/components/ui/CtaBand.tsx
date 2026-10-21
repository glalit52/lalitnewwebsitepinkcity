import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  body: ReactNode;
  href: string;
  cta: string;
};

/** Indigo block-print call-to-action band. */
export function CtaBand({ eyebrow, title, body, href, cta }: Props) {
  return (
    <section data-surface="dark" className="blockprint py-[52px] text-ivory md:py-[104px]">
      <div className="wrap flex flex-col items-center gap-3.5 text-center md:gap-[22px]">
        {eyebrow ? <p className="eyebrow m-0 !text-marigold">{eyebrow}</p> : null}
        <h2 className="m-0 font-display text-[36px] font-normal leading-[1.06] md:text-[54px] lg:text-[60px]">{title}</h2>
        <p className="m-0 max-w-[640px] text-[15px] text-mist md:text-[19px]">{body}</p>
        <Link
          href={href}
          className="btn w-full bg-marigold text-indigo hover:text-indigo md:w-auto md:px-[34px] md:py-[17px]"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
}
