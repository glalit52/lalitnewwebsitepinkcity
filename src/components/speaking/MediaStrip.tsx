"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { MediaItem } from "@/content/site";

type Props = { items: MediaItem[] };

/** Milliseconds between automatic steps. */
const AUTO_MS = 4500;
/** How long auto-advance stays off after the visitor scrolls, drags or clicks an arrow. */
const IDLE_RESUME_MS = 9000;

const REDUCE = "(prefers-reduced-motion: reduce)";
function subscribe(onChange: () => void) {
  const mq = window.matchMedia(REDUCE);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getReduced = () => window.matchMedia(REDUCE).matches;
const getServerReduced = () => false;

function MediaCard({ item }: { item: MediaItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
      className="group flex h-full flex-col overflow-hidden rounded-[18px] border-2 border-pink bg-ivory text-ink no-underline transition-all duration-300 hover:border-terracotta hover:text-ink hover:shadow-[0_16px_32px_-10px_rgba(142,59,44,0.35)] hover:-translate-y-1"
    >
      <span className="relative block aspect-[16/9] w-full overflow-hidden border-b-2 border-pink bg-indigo">
        {item.image ? (
          <Image
            src={item.image}
            alt=""
            fill
            sizes="300px"
            // Small thumbnails: load them all so cards never scroll in blank.
            loading="eager"
            draggable={false}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <span aria-hidden="true" className="blockprint absolute inset-0 flex items-center justify-center px-5">
            <span className="text-center font-display text-[30px] leading-[1.1] text-marigold">{item.outlet}</span>
          </span>
        )}
      </span>
      <span className="flex flex-1 flex-col gap-2 p-5">
        <span className="flex flex-wrap items-baseline gap-x-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-maroon">
          <span>{item.outlet}</span>
          {item.date ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{item.date}</span>
            </>
          ) : null}
        </span>
        <span className="line-clamp-3 font-display text-[20px] leading-[1.25] text-indigo transition-colors duration-200 group-hover:text-indigo-deep">{item.title}</span>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[15px] font-semibold text-indigo">
          {item.cta ?? "Read the story"} <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </span>
      </span>
    </a>
  );
}

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous stories" : "Next stories"}
      className="flex size-10 flex-none items-center justify-center rounded-full border-2 border-indigo bg-ivory text-indigo shadow-[0_6px_16px_-4px_rgba(18,27,69,0.35)] transition-all duration-200 hover:bg-indigo hover:text-ivory hover:scale-105 active:scale-95 sm:size-12"
    >
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {dir === "prev" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
      </svg>
    </button>
  );
}

/**
 * Press carousel: arrow · scroll-snap track · arrow, inside the page column so
 * both arrows sit symmetrically outside the cards. The track always shows
 * whole cards (1 / 2 / 3 / 4 by width; scrollbar hidden). Also: swipe on touch,
 * click-and-drag with a mouse, and a swipe on touch, click-and-drag with a mouse, and a
 * gentle auto-advance. Auto-advance pauses on hover, keyboard focus, after
 * any manual scroll, while the tab is hidden, with the Pause toggle, and never
 * runs under reduced motion. Arrows wrap around at either end.
 */
export function MediaStrip({ items }: Props) {
  const scroller = useRef<HTMLUListElement>(null);
  const reduced = useSyncExternalStore(subscribe, getReduced, getServerReduced);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [idleUntil, setIdleUntil] = useState(0);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const step = useCallback((dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector("li");
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const width = (card?.getBoundingClientRect().width ?? 300) + gap;
    const max = el.scrollWidth - el.clientWidth;
    let target = el.scrollLeft + dir * width;
    if (dir === 1 && el.scrollLeft >= max - 4) target = 0;
    else if (dir === -1 && el.scrollLeft <= 4) target = max;
    el.scrollTo({ left: target, behavior: reduced ? "auto" : "smooth" });
  }, [reduced]);

  const manual = (fn?: () => void) => {
    setIdleUntil(Date.now() + IDLE_RESUME_MS);
    fn?.();
  };

  const autoplay = !reduced && !paused && !hovered && !focused && items.length > 1;
  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => {
      if (document.hidden || Date.now() < idleUntil) return;
      step(1);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [autoplay, idleUntil, step]);

  if (!items.length) return null;

  return (
    <div className="flex w-full min-w-0 flex-col gap-5 overflow-x-clip">
      <div
        className="wrap grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:gap-4"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
        }}
      >
        <Arrow dir="prev" onClick={() => manual(() => step(-1))} />
        <ul
          ref={scroller}
          role="list"
          aria-label="Stories and press"
          className="relative m-0 grid w-full min-w-0 list-none auto-cols-[100%] grid-flow-col gap-5 overflow-x-auto scroll-smooth p-0 py-2 [scrollbar-width:none] snap-x snap-mandatory sm:auto-cols-[calc((100%-20px)/2)] lg:auto-cols-[calc((100%-40px)/3)] xl:auto-cols-[calc((100%-60px)/4)] data-[dragging=true]:cursor-grabbing data-[dragging=true]:snap-none data-[dragging=true]:scroll-auto md:cursor-grab [&::-webkit-scrollbar]:hidden"
          onWheel={() => manual()}
          onTouchStart={() => manual()}
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse" || e.button !== 0 || !scroller.current) return;
            drag.current = { x: e.clientX, left: scroller.current.scrollLeft, moved: false };
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            const el = scroller.current;
            if (!d || !el) return;
            const dx = e.clientX - d.x;
            if (!d.moved && Math.abs(dx) > 5) {
              d.moved = true;
              el.setPointerCapture(e.pointerId);
              el.dataset.dragging = "true";
              manual();
            }
            if (d.moved) el.scrollLeft = d.left - dx;
          }}
          onPointerUp={(e) => {
            const d = drag.current;
            const el = scroller.current;
            drag.current = null;
            if (!el || !d?.moved) return;
            el.releasePointerCapture(e.pointerId);
            delete el.dataset.dragging;
            // Swallow the click that ends a drag so it doesn't open the card.
            el.addEventListener("click", (ev) => ev.preventDefault(), { capture: true, once: true });
          }}
        >
          {items.map((item) => (
            <li key={item.url} className="relative min-w-0 snap-start">
              <MediaCard item={item} />
            </li>
          ))}
        </ul>
        <Arrow dir="next" onClick={() => manual(() => step(1))} />
      </div>
      {reduced ? null : (
        <div className="wrap flex justify-center">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-indigo px-4 text-[15px] font-semibold text-indigo transition-colors hover:bg-ivory"
          >
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 10 10" fill="currentColor">
              {paused ? <path d="M2 1l7 4-7 4z" /> : <path d="M2 1h2v8H2zM6 1h2v8H6z" />}
            </svg>
            {paused ? "Play" : "Pause"}
            <span className="sr-only"> auto-scrolling stories</span>
          </button>
        </div>
      )}
    </div>
  );
}
