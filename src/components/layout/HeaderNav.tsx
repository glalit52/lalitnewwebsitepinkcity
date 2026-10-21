"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { bookCallHref, navItems } from "@/content/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const bookActive = isActive(pathname, bookCallHref);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  // While open: Escape closes, a click outside closes, and widening past the
  // desktop breakpoint closes (the inline nav takes over).
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close(true);
        return;
      }
      if (e.key === "Tab" && panelRef.current && buttonRef.current) {
        const focusables = [
          buttonRef.current,
          ...Array.from(panelRef.current.querySelectorAll<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])')),
        ].filter((el): el is HTMLElement => Boolean(el));
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) close(false);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && close(false);

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  return (
    <>
      {/* Desktop */}
      <nav
        aria-label="Primary"
        className="hidden items-center gap-7 text-[15px] font-medium uppercase tracking-[0.1em] lg:flex"
      >
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`border-b-2 py-2.5 text-ivory no-underline transition-colors hover:text-marigold ${
                active ? "border-marigold" : "border-transparent"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          href={bookCallHref}
          aria-current={bookActive ? "page" : undefined}
          className={`btn min-h-0 bg-marigold px-[22px] py-3 text-indigo hover:text-indigo ${
            bookActive ? "shadow-[0_0_0_2px_#FFF6EA]" : ""
          }`}
        >
          Book a call
        </Link>
      </nav>

      {/* Mobile */}
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="flex size-11 items-center justify-center rounded-xl border border-ivory/40 bg-transparent text-ivory transition-colors hover:bg-ivory/10 lg:hidden"
      >
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      <div
        ref={panelRef}
        id={menuId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b-4 border-marigold bg-indigo shadow-[0_18px_30px_-18px_rgb(18_27_69/0.6)] lg:hidden"
      >
        <nav aria-label="Mobile" className="wrap flex flex-col gap-1 py-4">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => close(false)}
                className={`flex min-h-12 items-center rounded-xl px-3 text-[17px] font-medium uppercase tracking-[0.1em] text-ivory no-underline hover:bg-ivory/10 hover:text-marigold ${
                  active ? "bg-ivory/10 text-marigold" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={bookCallHref}
            aria-current={bookActive ? "page" : undefined}
            onClick={() => close(false)}
            className="btn mt-2 w-full bg-marigold text-indigo hover:text-indigo"
          >
            Book a call
          </Link>
        </nav>
      </div>
    </>
  );
}
