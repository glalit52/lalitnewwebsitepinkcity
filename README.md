# lalitgautam.com — Jaipur Pink City

Next.js 16 (App Router, Cache Components) + TypeScript + Tailwind CSS v4, built from the
"lalitgautam.com — Jaipur Pink City" Design canvas.

| Route          | Artboard                      |
| -------------- | ----------------------------- |
| `/`            | Home + Home — mobile          |
| `/ventures`    | Ventures                      |
| `/speaking`    | Speaking & Book               |
| `/book-a-call` | Book a call                   |

All routes prerender as static HTML; the only client JS is the header menu and the two forms.

## Scripts

```bash
npm install
cp .env.example .env.local   # fill in what you have
npm run dev        # http://localhost:3000
npm run lint       # ESLint (flat config)
npm run typecheck  # tsc --noEmit
npm test           # Vitest — form validation, schemas, delivery, rate limit, URL safety
npm run build && npm start
```

## Structure

```
src/
  app/                 routes, metadata, sitemap/robots, Server Actions (actions.ts)
  components/
    layout/            SiteHeader (+ HeaderNav client island), PageHero, SiteFooter
    home/              Home sections
    forms/             Field primitives, useInquiryForm hook, SpeakingInviteForm, CallRequestDialog
    brand/             Lotus mark, rosette, Jaipur skyline, portrait arch, book cover
    ui/                SectionHeading, PhotoFrame, CtaBand
  content/site.ts      all copy and data — edit here
  lib/
    links.ts           env-driven external links (unset → hidden)
    inquiry/           zod schemas, processInquiry, webhook delivery, rate limiter
  fonts/               self-hosted woff2 (SIL OFL, via Fontsource)
```

## Forms

`Invite me to speak` (/speaking) and `Request this call` (/book-a-call, shown when no Topmate
link is set) are Server Actions with `useActionState`:

- Instant client-side validation (native constraints, inline accessible messages), re-validated
  on the server with zod. Honeypot field + per-IP rate limit (in-memory, per instance).
- Delivery: POST JSON to `INQUIRY_WEBHOOK_URL` (Zapier/Make/Slack/CRM/your API). In development
  without a webhook, submissions are logged and the success message says so; in production
  without one, the form shows an honest "not available" error.

## Content still to supply

The design marked these as placeholders; the UI omits or substitutes them cleanly until set:

- Photos: portrait (`person.portrait`), venture product images, UN Geneva photo, three "Life"
  photos — put files in `public/images/` and set the paths in `src/content/site.ts`.
- Call prices (`callServices[].price`), book summary, UN talk description, MIT 35 Under 35 year.
- Topmate, book/sample and social profile URLs (`.env`).
