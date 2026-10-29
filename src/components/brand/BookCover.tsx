import { BookTitleCycler } from "@/components/brand/BookTitleCycler";
import { books, person } from "@/content/site";

type Props = { variant?: "teaser" | "feature" };

/**
 * Arched indigo book cover set on a lattice panel. The window cycles through
 * the titles in `books`; screen readers get the full list instead.
 */
export function BookCover({ variant = "teaser" }: Props) {
  const feature = variant === "feature";
  const titles = books.map((b) => b.title);
  const many = titles.length > 1;
  return (
    <div className={`lattice flex justify-center rounded-3xl ${feature ? "p-8 md:p-12" : "p-7 md:p-10"}`}>
      <div className="sr-only">
        <p>
          {many ? "Books" : "Book"} by {person.name}:
        </p>
        <ul>
          {titles.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <div
        data-surface="dark"
        className={`relative flex w-full flex-col items-center justify-center gap-3.5 rounded-t-[150px] rounded-b-lg border-[6px] border-ivory bg-indigo p-8 text-center text-ivory box-border ${
          feature
            ? "aspect-[3/4.3] max-w-[320px] shadow-[0_0_0_2px_#22306B,16px_16px_0_#8E3B2C]"
            : "aspect-[3/4.2] max-w-[240px] md:max-w-[300px] shadow-[0_0_0_2px_#22306B]"
        }`}
      >
        <span aria-hidden="true" className="text-xs font-semibold tracking-[0.24em] text-marigold">
          {feature ? (many ? "BOOKS BY" : "A BOOK BY") : many ? "THE BOOKS" : "THE BOOK"}
        </span>
        {feature ? (
          <span aria-hidden="true" className="text-base text-rosewood">
            {person.name}
          </span>
        ) : null}
        <BookTitleCycler
          titles={titles}
          className={`font-display leading-[1.15] ${feature ? "text-[30px] md:text-[34px]" : "text-[26px] md:text-[30px]"}`}
          stackedClassName={`font-display leading-[1.15] ${feature ? "text-[22px] md:text-[24px]" : "text-[19px] md:text-[22px]"}`}
        />
        {feature ? null : (
          <span aria-hidden="true" className="text-[15px] text-rosewood">
            {person.name}
          </span>
        )}
      </div>
    </div>
  );
}
