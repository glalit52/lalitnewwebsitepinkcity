import Link from "next/link";
import { bookCallHref, person } from "@/content/site";
import { getSocialLinks } from "@/lib/links";

const year = 2026;

function Greeting({ className = "" }: { className?: string }) {
  return (
    <p lang="hi" className={`m-0 font-hindi ${className}`}>
      खम्मा घणी
      <span className="sr-only" lang="en">
        {" "}
        (Khamma ghani — a Rajasthani greeting)
      </span>
    </p>
  );
}

type ConnectProps = { variant: "connect"; heading: string };
type SimpleProps = { variant: "simple"; tone: "lattice" | "indigo" };

export function SiteFooter(props: ConnectProps | SimpleProps) {
  if (props.variant === "simple") {
    const indigo = props.tone === "indigo";
    return (
      <footer
        data-surface={indigo ? "dark" : undefined}
        className={indigo ? "bg-indigo py-12 text-ivory" : "lattice border-t-[6px] border-indigo py-12 md:py-14"}
      >
        <div className="wrap flex flex-wrap items-center justify-between gap-4">
          <Greeting className={`text-2xl ${indigo ? "text-marigold" : "text-indigo"}`} />
          <p className={`m-0 text-[15px] ${indigo ? "" : "font-medium"}`}>
            © {year} {person.name} · {person.domain}
          </p>
        </div>
      </footer>
    );
  }

  const socials = getSocialLinks();
  return (
    <footer className="lattice border-t-[5px] border-indigo pb-11 pt-11 md:border-t-[6px] md:pb-12 md:pt-[88px]">
      <div className="wrap flex flex-col items-center gap-3.5 text-center md:gap-[22px]">
        <Greeting className="text-[22px] text-indigo md:text-[28px]" />
        <h2 className="m-0 font-display text-[34px] font-normal leading-[1.05] text-indigo md:text-[58px] lg:text-[62px]">
          {props.heading}
        </h2>
        <nav
          aria-label="Social"
          className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:justify-center sm:gap-2.5"
        >
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn min-h-11 bg-ivory px-[22px] py-3 text-[15px] text-indigo hover:bg-white hover:text-indigo md:text-[19px]"
            >
              {s.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
          {socials.length === 0 ? (
            <Link href={bookCallHref} className="btn col-span-2 min-h-11 bg-ivory text-indigo hover:bg-white hover:text-indigo">
              Book a call
            </Link>
          ) : null}
        </nav>
        <p className="m-0 text-[13px] font-medium md:text-[15px]">
          © {year} {person.name}
          <span className="hidden md:inline"> · {person.domain}</span>
        </p>
      </div>
    </footer>
  );
}
