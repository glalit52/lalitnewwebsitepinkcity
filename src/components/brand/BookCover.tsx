import { book, person } from "@/content/site";

type Props = { variant?: "teaser" | "feature" };

/** Arched indigo book cover set on a lattice panel. */
export function BookCover({ variant = "teaser" }: Props) {
  const feature = variant === "feature";
  return (
    <div className={`lattice flex justify-center rounded-3xl ${feature ? "p-8 md:p-12" : "p-7 md:p-10"}`}>
      <div
        role="img"
        aria-label={`Cover of “${book.title}” by ${person.name}`}
        className={`flex w-full flex-col items-center justify-center gap-3.5 rounded-t-[150px] rounded-b-lg border-[6px] border-ivory bg-indigo p-8 text-center text-ivory box-border ${
          feature
            ? "aspect-[3/4.3] max-w-[320px] shadow-[0_0_0_2px_#22306B,16px_16px_0_#8E3B2C]"
            : "aspect-[3/4.2] max-w-[240px] md:max-w-[300px] shadow-[0_0_0_2px_#22306B]"
        }`}
      >
        <span className="text-xs font-semibold tracking-[0.24em] text-marigold">{feature ? "A BOOK BY" : "THE BOOK"}</span>
        {feature ? <span className="text-base text-rosewood">{person.name}</span> : null}
        <span className={`font-display leading-[1.15] ${feature ? "text-[30px] md:text-[34px]" : "text-[26px] md:text-[30px]"}`}>
          {book.title}
        </span>
        {feature ? null : <span className="text-[15px] text-rosewood">{person.name}</span>}
      </div>
    </div>
  );
}
