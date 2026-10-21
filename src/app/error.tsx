"use client";

import { useEffect } from "react";
import Link from "next/link";
import { JaipurSkyline } from "@/components/brand/JaipurSkyline";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error captured by error boundary:", error);
  }, [error]);

  return (
    <section className="lattice overflow-hidden pt-16 md:pt-24" aria-labelledby="error-title">
      <div className="wrap flex flex-col items-center gap-5 pb-10 text-center">
        <p className="m-0 rounded-full bg-ivory px-5 py-2 text-[13px] font-semibold tracking-[0.22em] text-maroon">
          SOMETHING WENT WRONG
        </p>
        <h1
          id="error-title"
          className="m-0 font-display text-[40px] font-normal leading-none text-indigo md:text-[64px]"
        >
          An unexpected detour
        </h1>
        <p className="m-0 max-w-[560px] text-[18px] font-medium text-ink">
          We encountered an error loading this view. You can retry or head back home.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="btn bg-indigo text-ivory hover:text-ivory"
          >
            Try again
          </button>
          <Link
            href="/"
            className="btn border-2 border-indigo bg-ivory text-indigo hover:bg-white hover:text-indigo"
          >
            Back to home
          </Link>
        </div>
      </div>
      <JaipurSkyline />
    </section>
  );
}
