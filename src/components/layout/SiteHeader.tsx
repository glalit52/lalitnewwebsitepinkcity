import Link from "next/link";
import { LotusMark } from "@/components/brand/Logo";
import { person } from "@/content/site";
import { HeaderNav } from "./HeaderNav";

export function SiteHeader() {
  return (
    <header data-surface="dark" className="relative z-30 border-b-[3px] border-marigold bg-indigo text-ivory md:border-b-4">
      <div className="wrap flex items-center justify-between gap-4 py-2.5 lg:gap-7 lg:py-3.5">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2.5 text-ivory no-underline hover:text-ivory lg:gap-3"
        >
          <span className="lg:hidden">
            <LotusMark size={32} />
          </span>
          <span className="hidden lg:inline">
            <LotusMark size={40} />
          </span>
          <span className="font-display text-[21px] leading-none lg:text-[26px]">{person.name}</span>
        </Link>
        <HeaderNav />
      </div>
    </header>
  );
}
