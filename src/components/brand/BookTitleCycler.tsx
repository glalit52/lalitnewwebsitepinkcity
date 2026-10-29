"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const REDUCE = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(REDUCE);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getReduced = () => window.matchMedia(REDUCE).matches;
const getServerReduced = () => false;

type Props = {
  titles: string[];
  /** Typography for the title shown one at a time. */
  className?: string;
  /** Typography for each title when they are stacked (reduced motion). */
  stackedClassName?: string;
  /** Milliseconds each title stays up. */
  interval?: number;
};

/**
 * Book-window titles, scrolled up one by one like a reel. Purely visual: the
 * cover lists every title for screen readers, so nothing here is announced.
 * Hovering pauses the reel and a small toggle pauses it for keyboard and touch
 * users. Under reduced motion the titles are stacked instead; a single title
 * is static.
 */
export function BookTitleCycler({ titles, className = "", stackedClassName = "", interval = 3200 }: Props) {
  const reduced = useSyncExternalStore(subscribe, getReduced, getServerReduced);
  // `step` runs 0…titles.length; the last step shows a copy of the first title,
  // after which the reel snaps back to 0 without a transition (seamless loop).
  const [step, setStep] = useState(0);
  const [snapping, setSnapping] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const cycling = titles.length > 1 && !reduced;

  useEffect(() => {
    if (!cycling || hovered || stopped) return;
    const id = window.setInterval(() => setStep((s) => Math.min(s + 1, titles.length)), interval);
    return () => window.clearInterval(id);
  }, [cycling, hovered, stopped, titles.length, interval]);

  // Re-enable the transition on the frame after a snap back to the start.
  useEffect(() => {
    if (!snapping) return;
    const id = window.requestAnimationFrame(() => setSnapping(false));
    return () => window.cancelAnimationFrame(id);
  }, [snapping]);

  if (titles.length === 0) return null;

  if (titles.length === 1) {
    return (
      <span aria-hidden="true" className={className}>
        {titles[0]}
      </span>
    );
  }

  if (!cycling) {
    return (
      <span aria-hidden="true" className="flex flex-col items-center gap-3">
        {titles.map((t, i) => (
          <span key={t} className="contents">
            {i > 0 ? <span className="size-1.5 rounded-full bg-marigold" /> : null}
            <span className={stackedClassName}>{t}</span>
          </span>
        ))}
      </span>
    );
  }

  const current = step % titles.length;
  const reel = [...titles, titles[0]];
  return (
    <>
      {/* Every title sits invisibly in one grid cell so the window takes the
          height of the longest; the reel inside moves one window-height per step. */}
      <span
        aria-hidden="true"
        className={`relative grid w-full overflow-hidden py-3 [mask-image:linear-gradient(to_bottom,transparent,#000_22%,#000_78%,transparent)] ${className}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {titles.map((t, i) => (
          <span key={`size-${i}`} className="invisible [grid-area:1/1]">
            {t}
          </span>
        ))}
        <span className="absolute inset-x-0 inset-y-3">
          <span
            className={`flex h-full flex-col ${snapping ? "" : "transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"}`}
            style={{ transform: `translateY(-${step * 100}%)` }}
            onTransitionEnd={() => {
              if (step === titles.length) {
                setSnapping(true);
                setStep(0);
              }
            }}
          >
            {reel.map((t, i) => (
              <span
                key={`reel-${i}`}
                className={`flex h-full flex-none items-center justify-center transition-opacity duration-700 ${
                  i === step ? "opacity-100" : "opacity-30"
                }`}
              >
                {t}
              </span>
            ))}
          </span>
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-3">
        <span aria-hidden="true" className="flex items-center gap-1.5">
          {titles.map((t, i) => (
            <span
              key={`dot-${t}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-5 bg-marigold" : "w-1.5 bg-ivory/45"}`}
            />
          ))}
        </span>
        <button
          type="button"
          onClick={() => setStopped((s) => !s)}
          aria-label={stopped ? "Play book titles" : "Pause book titles"}
          className="inline-flex min-h-6 items-center gap-1.5 rounded-full px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-marigold hover:text-ivory"
        >
          <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            {stopped ? <path d="M2 1l7 4-7 4z" /> : <path d="M2 1h2v8H2zM6 1h2v8H6z" />}
          </svg>
          {stopped ? "Play" : "Pause"}
        </button>
      </span>
    </>
  );
}
