import { SocialIcon } from "@/components/brand/SocialIcon";
import { person } from "@/content/site";
import {
  contactEmail,
  externalLinks,
  getSocialLinks,
  type SocialId,
} from "@/lib/links";

const year = 2026;

const iconClass =
  "flex size-12 items-center justify-center rounded-full bg-ivory text-indigo shadow-xs transition-all duration-200 md:size-14";

/** The brief's order after email. URLs come from env vars; unset ones render as plain logos. */
const footerSocials = [
  { id: "facebook", name: "Facebook", url: externalLinks.facebook },
  { id: "x", name: "X (Twitter)", url: externalLinks.x },
  { id: "whatsapp", name: "WhatsApp", url: externalLinks.whatsapp },
  { id: "instagram", name: "Instagram", url: externalLinks.instagram },
  { id: "youtube", name: "YouTube", url: externalLinks.youtube },
] as const;

/**
 * The one footer used on every page: Khamma Ghani, a heading, the email as a
 * pill, then the Facebook, X, WhatsApp, Instagram and YouTube logos (plus
 * LinkedIn/Topmate when configured). A logo becomes a link once its env var is set.
 */
export function SiteFooter({
  heading = "Let’s connect",
}: {
  heading?: string;
}) {
  const extras = getSocialLinks().filter(
    (s) => s.id === "linkedin" || s.id === "topmate",
  );
  const socials: Array<{ id: SocialId; name: string; url: string | null }> = [
    ...footerSocials,
    ...extras,
  ];
  return (
    <footer className="lattice border-t-[5px] border-indigo pb-11 pt-11 md:border-t-[6px] md:pb-12 md:pt-[88px]">
      <div className="wrap flex flex-col items-center gap-3.5 text-center md:gap-[22px]">
        <p
          lang="hi"
          className="m-0 font-hindi text-[22px] text-indigo md:text-[28px]"
        >
          खम्मा घणी
          <span className="sr-only" lang="en">
            {" "}
            (Khamma ghani — a Rajasthani greeting)
          </span>
        </p>
        <h2 className="m-0 font-display text-[34px] font-normal leading-[1.05] text-indigo md:text-[58px] lg:text-[62px]">
          {heading}
        </h2>
        <nav
          aria-label="Email and social media"
          className="flex max-w-full flex-wrap items-center justify-center gap-2.5 md:gap-3"
        >
          <a
            href={externalLinks.email}
            className="btn min-h-12 max-w-full bg-ivory px-[22px] py-3 text-[15px] tracking-[0.02em] text-indigo shadow-md hover:bg-white hover:text-indigo md:min-h-14 md:px-7 md:text-[19px]"
          >
            <SocialIcon id="email" className="size-5 md:size-6" />
            <span className="sr-only">Email </span>
            <span className="min-w-0 [overflow-wrap:anywhere]">
              {contactEmail}
            </span>
          </a>
          <ul className="m-0 flex list-none flex-wrap justify-center gap-2.5 p-0 md:gap-3">
            {socials.map((s) =>
              s.url ? (
                <li key={s.id}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.name} (opens in a new tab)`}
                    title={s.name}
                    className={`${iconClass} hover:bg-white hover:text-indigo-deep hover:shadow-md hover:-translate-y-1 active:scale-95`}
                  >
                    <SocialIcon id={s.id} className="size-[22px] md:size-6" />
                  </a>
                </li>
              ) : (
                // No URL configured yet: show the logo, but not as a dead link.
                <li
                  key={s.id}
                  aria-hidden="true"
                  title={`${s.name} — coming soon`}
                  className={iconClass}
                >
                  <SocialIcon id={s.id} className="size-[22px] md:size-6" />
                </li>
              ),
            )}
          </ul>
        </nav>
        <p className="m-0 text-[13px] font-medium md:text-[15px]">
          © {year} {person.name}
          <span className="hidden md:inline"> · {person.domain}</span>
        </p>
      </div>
    </footer>
  );
}
