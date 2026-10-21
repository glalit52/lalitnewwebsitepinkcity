import Link from "next/link";
import { JaipurSkyline } from "@/components/brand/JaipurSkyline";

export default function NotFound() {
  return (
    <section className="lattice overflow-hidden pt-16 md:pt-24">
      <div className="wrap flex flex-col items-center gap-5 pb-10 text-center">
        <p className="m-0 rounded-full bg-ivory px-5 py-2 text-[13px] font-semibold tracking-[0.22em] text-maroon">404</p>
        <h1 className="m-0 font-display text-[44px] font-normal leading-none text-indigo md:text-[72px]">
          This lane doesn’t lead anywhere
        </h1>
        <p className="m-0 max-w-[560px] text-[18px] font-medium">The page you’re looking for has moved or never existed.</p>
        <Link href="/" className="btn bg-indigo text-ivory hover:text-ivory">
          Back to home
        </Link>
      </div>
      <JaipurSkyline />
    </section>
  );
}
